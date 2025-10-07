import { inngest } from "@/inngest/client";
import { AutomationMetricsAggregator } from "@/services/automation-metrics-aggregator";

export const automationMetricsAggregation = inngest.createFunction(
  {
    id: "automation-metrics-aggregation",
    name: "Daily Automation Metrics Aggregation",
  },
  { cron: "0 1 * * *" }, // Run daily at 1 AM UTC
  async ({ step, logger }) => {
    logger.info("Starting daily automation metrics aggregation for all users");

    const aggregator = new AutomationMetricsAggregator();

    try {
      // Aggregate metrics for yesterday (completed day) for all users
      await step.run("aggregate-yesterday-metrics-all-users", async () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        logger.info(`Aggregating metrics for all users on ${yesterday.toISOString().split('T')[0]}`);
        await aggregator.aggregateMetricsForAllUsers(yesterday);
        
        return { date: yesterday.toISOString().split('T')[0], status: "completed" };
      });

      // Also backfill any missing metrics from the last 7 days for all users
      await step.run("backfill-recent-metrics-all-users", async () => {
        logger.info("Backfilling metrics for last 7 days for all users");
        await aggregator.aggregateMetricsForAllUsersLastDays(7);
        
        return { backfillDays: 7, status: "completed" };
      });

      // Log completion for monitoring
      await step.run("log-completion", async () => {
        logger.info("Metrics aggregation completed for all users, cache will be invalidated by middleware");
        return { status: "logged" };
      });

      logger.info("Daily automation metrics aggregation completed successfully for all users");
      
      return {
        success: true,
        timestamp: new Date().toISOString(),
        message: "Automation metrics aggregated successfully for all users"
      };

    } catch (error) {
      logger.error("Failed to aggregate automation metrics for all users:", error);
      
      throw new Error(`Automation metrics aggregation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

// Manual trigger function for on-demand aggregation
export const manualMetricsAggregation = inngest.createFunction(
  {
    id: "manual-metrics-aggregation",
    name: "Manual Automation Metrics Aggregation",
  },
  { event: "automation/metrics.aggregate" },
  async ({ event, step, logger }) => {
    logger.info("Starting manual automation metrics aggregation");

    const { startDate, endDate, days, user_id: userId } = event.data;

    const aggregator = new AutomationMetricsAggregator();

    try {
      if (startDate && endDate) {
        // Aggregate for specific date range
        await step.run("aggregate-date-range", async () => {
          const start = new Date(startDate);
          const end = new Date(endDate);
          
          if (userId) {
            logger.info(`Aggregating metrics from ${startDate} to ${endDate} for user ${userId}`);
            await aggregator.recalculateMetrics(start, end, userId);
          } else {
            logger.info(`Aggregating metrics from ${startDate} to ${endDate} for all users`);
            await aggregator.recalculateMetricsForAllUsers(start, end);
          }

          return { startDate, endDate, userId: userId || "all", status: "completed" };
        });
      } else {
        // Aggregate for last N days (default 7)
        const daysToAggregate = days || 7;
        
        await step.run("aggregate-last-days", async () => {
          if (userId) {
            logger.info(`Aggregating metrics for last ${daysToAggregate} days for user ${userId}`);
            await aggregator.aggregateMetricsForLastDays(daysToAggregate, userId);
          } else {
            logger.info(`Aggregating metrics for last ${daysToAggregate} days for all users`);
            await aggregator.aggregateMetricsForAllUsersLastDays(daysToAggregate);
          }
          
          return { days: daysToAggregate, userId: userId || "all", status: "completed" };
        });
      }

      logger.info("Manual automation metrics aggregation completed successfully");
      
      return {
        success: true,
        timestamp: new Date().toISOString(),
        message: "Manual metrics aggregation completed successfully",
        processedUsers: userId ? "single" : "all"
      };

    } catch (error) {
      logger.error("Failed to manually aggregate automation metrics:", error);
      
      throw new Error(`Manual metrics aggregation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);