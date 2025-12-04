import { inngest } from "@/inngest/client";
import { AutomationMetricsAggregator } from "@/services/automation-metrics-aggregator";

/**
 * @function automationMetricsAggregation
 * @description Inngest function to aggregate daily automation metrics for all users.
 * This function runs automatically via a cron schedule to collect and process
 * usage data, ensuring up-to-date analytics for the platform. It aggregates
 * metrics for the previous day and also backfills any missing data from the last 7 days.
 * @cron "0 1 * * *" - Runs daily at 1 AM UTC.
 */
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
      // Step 1: Aggregate metrics for yesterday (completed day) for all users
      await step.run("aggregate-yesterday-metrics-all-users", async () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // Get yesterday's date
        
        logger.info(`Aggregating metrics for all users on ${yesterday.toISOString().split('T')[0]}`);
        await aggregator.aggregateMetricsForAllUsers(yesterday);
        
        return { date: yesterday.toISOString().split('T')[0], status: "completed" };
      });

      // Step 2: Also backfill any missing metrics from the last 7 days for all users
      // This ensures data consistency in case of any transient failures or delays.
      await step.run("backfill-recent-metrics-all-users", async () => {
        logger.info("Backfilling metrics for last 7 days for all users");
        await aggregator.aggregateMetricsForAllUsersLastDays(7);
        
        return { backfillDays: 7, status: "completed" };
      });

      // Step 3: Log completion for monitoring and trigger cache invalidation
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
      
      // Re-throw the error to indicate failure in Inngest and trigger retries if configured
      throw new Error(`Automation metrics aggregation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

/**
 * @function manualMetricsAggregation
 * @description Inngest function for on-demand, manual automation metrics aggregation.
 * This function can be triggered via an event to aggregate metrics for a specific
 * date range or for a specified number of recent days, optionally for a single user or all users.
 * @event "automation/metrics.aggregate" - Triggered by an explicit event.
 * @param {object} event.data - Contains parameters for aggregation:
 *   - `startDate`: Optional. Start date for aggregation (ISO string).
 *   - `endDate`: Optional. End date for aggregation (ISO string).
 *   - `days`: Optional. Number of recent days to aggregate if `startDate`/`endDate` are not provided (defaults to 7).
 *   - `user_id`: Optional. Specific user ID for whom to aggregate metrics. If not provided, aggregates for all users.
 */
export const manualMetricsAggregation = inngest.createFunction(
  {
    id: "manual-metrics-aggregation",
    name: "Manual Automation Metrics Aggregation",
  },
  { event: "automation/metrics.aggregate" },
  async ({ event, step, logger }) => {
    logger.info("Starting manual automation metrics aggregation");

    // Destructure aggregation parameters from the event data
    const { startDate, endDate, days, user_id: userId } = event.data;

    const aggregator = new AutomationMetricsAggregator();

    try {
      if (startDate && endDate) {
        // Case 1: Aggregate for a specific date range
        await step.run("aggregate-date-range", async () => {
          const start = new Date(startDate);
          const end = new Date(endDate);
          
          if (userId) {
            // Aggregate for a specific user within the date range
            logger.info(`Aggregating metrics from ${startDate} to ${endDate} for user ${userId}`);
            await aggregator.recalculateMetrics(start, end, userId);
          } else {
            // Aggregate for all users within the date range
            logger.info(`Aggregating metrics from ${startDate} to ${endDate} for all users`);
            await aggregator.recalculateMetricsForAllUsers(start, end);
          }

          return { startDate, endDate, userId: userId || "all", status: "completed" };
        });
      } else {
        // Case 2: Aggregate for the last N days (defaulting to 7 if 'days' is not specified)
        const daysToAggregate = days || 7;
        
        await step.run("aggregate-last-days", async () => {
          if (userId) {
            // Aggregate for a specific user for the last N days
            logger.info(`Aggregating metrics for last ${daysToAggregate} days for user ${userId}`);
            await aggregator.aggregateMetricsForLastDays(daysToAggregate, userId);
          } else {
            // Aggregate for all users for the last N days
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
      
      // Re-throw the error to indicate failure in Inngest
      throw new Error(`Manual metrics aggregation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);