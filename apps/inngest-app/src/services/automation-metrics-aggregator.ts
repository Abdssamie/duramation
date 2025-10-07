import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { InternalUserId } from "@/types/user";

interface DailyMetrics {
  workflowId: string;
  date: Date;
  runsCount: number;
  successCount: number;
  failureCount: number;
  avgDuration: number | null;
  timeSavedMinutes: number | null;
  errorsPrevented: number | null;
  costSavings: Decimal | null;
}

interface WorkflowRunAggregation {
  workflowId: string;
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  avgDurationMs: number | null;
}

export class AutomationMetricsAggregator {
  private static readonly ESTIMATED_MANUAL_TIME_MINUTES = 30; // Default manual time per task
  private static readonly HOURLY_RATE_USD = 50; // Default hourly rate for cost calculations
  private static readonly ERROR_PREVENTION_RATE = 0.15; // 15% error rate prevented by automation

  /**
   * Aggregates workflow run data for a specific date
   */
  async aggregateMetricsForDate(date: Date, userId: InternalUserId): Promise<void> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    console.log(`Aggregating metrics for date: ${date.toISOString().split('T')[0]}`);

    try {
      // Get all workflow runs for the specified date
      const workflowRuns = await prisma.workflowRun.findMany({
        where: {
          startedAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
          status: {
            in: ['COMPLETED', 'FAILED'],
          },
          userId: userId
        },
        select: {
          workflowId: true,
          status: true,
          startedAt: true,
          completedAt: true,
        },
      });

      if (workflowRuns.length === 0) {
        console.log(`No completed workflow runs found for ${date.toISOString().split('T')[0]}`);
        return;
      }

      // Group runs by workflow and calculate aggregations
      const workflowAggregations = this.calculateWorkflowAggregations(workflowRuns);

      // Create or update AutomationMetrics records
      for (const aggregation of workflowAggregations) {
        const metrics = this.calculateROIMetrics(aggregation);
        await this.upsertAutomationMetrics(aggregation.workflowId, date, metrics);
      }

      console.log(`Successfully aggregated metrics for ${workflowAggregations.length} workflows on ${date.toISOString().split('T')[0]}`);
    } catch (error) {
      console.error(`Failed to aggregate metrics for date ${date.toISOString().split('T')[0]}:`, error);
      throw error;
    }
  }

  /**
   * Aggregates metrics for the last N days
   */
  async aggregateMetricsForLastDays(days: number = 7, userId: InternalUserId): Promise<void> {
    const promises: Promise<void>[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      promises.push(this.aggregateMetricsForDate(date, userId));
    }

    await Promise.all(promises);
  }

  /**
   * Gets all active users from the database
   */
  async getAllUsers(): Promise<InternalUserId[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
      },
    });

    return users.map(user => user.id as InternalUserId);
  }

  /**
   * Aggregates metrics for all users for a specific date
   */
  async aggregateMetricsForAllUsers(date: Date): Promise<void> {
    console.log(`Aggregating metrics for all users on ${date.toISOString().split('T')[0]}`);

    const userIds = await this.getAllUsers();
    
    if (userIds.length === 0) {
      console.log('No users found in the database');
      return;
    }

    console.log(`Found ${userIds.length} users to process`);

    const promises: Promise<void>[] = [];
    
    for (const userId of userIds) {
      promises.push(this.aggregateMetricsForDate(date, userId));
    }

    await Promise.all(promises);
    console.log(`Completed metrics aggregation for all ${userIds.length} users`);
  }

  /**
   * Aggregates metrics for all users for the last N days
   */
  async aggregateMetricsForAllUsersLastDays(days: number = 7): Promise<void> {
    console.log(`Aggregating metrics for all users for the last ${days} days`);

    const promises: Promise<void>[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      promises.push(this.aggregateMetricsForAllUsers(date));
    }

    await Promise.all(promises);
    console.log(`Completed metrics aggregation for all users for the last ${days} days`);
  }

  /**
   * Groups workflow runs by workflow ID and calculates basic aggregations
   */
  private calculateWorkflowAggregations(workflowRuns: any[]): WorkflowRunAggregation[] {
    const workflowGroups = new Map<string, any[]>();

    // Group runs by workflow ID
    for (const run of workflowRuns) {
      if (!workflowGroups.has(run.workflowId)) {
        workflowGroups.set(run.workflowId, []);
      }
      workflowGroups.get(run.workflowId)!.push(run);
    }

    // Calculate aggregations for each workflow
    const aggregations: WorkflowRunAggregation[] = [];

    for (const [workflowId, runs] of workflowGroups) {
      const totalRuns = runs.length;
      const successfulRuns = runs.filter(run => run.status === 'COMPLETED').length;
      const failedRuns = runs.filter(run => run.status === 'FAILED').length;

      // Calculate average duration for completed runs
      const completedRuns = runs.filter(run => 
        run.status === 'COMPLETED' && 
        run.startedAt && 
        run.completedAt
      );

      let avgDurationMs: number | null = null;
      if (completedRuns.length > 0) {
        const totalDuration = completedRuns.reduce((sum, run) => {
          const duration = new Date(run.completedAt).getTime() - new Date(run.startedAt).getTime();
          return sum + duration;
        }, 0);
        avgDurationMs = Math.round(totalDuration / completedRuns.length);
      }

      aggregations.push({
        workflowId,
        totalRuns,
        successfulRuns,
        failedRuns,
        avgDurationMs,
      });
    }

    return aggregations;
  }

  /**
   * Calculates ROI metrics based on workflow aggregation data
   */
  private calculateROIMetrics(aggregation: WorkflowRunAggregation): DailyMetrics {
    const { workflowId, totalRuns, successfulRuns, failedRuns, avgDurationMs } = aggregation;

    // Calculate time saved (successful runs only)
    const timeSavedMinutes = successfulRuns > 0 
      ? successfulRuns * AutomationMetricsAggregator.ESTIMATED_MANUAL_TIME_MINUTES
      : null;

    // Calculate errors prevented (based on successful runs and error prevention rate)
    const errorsPrevented = successfulRuns > 0
      ? Math.round(successfulRuns * AutomationMetricsAggregator.ERROR_PREVENTION_RATE)
      : null;

    // Calculate cost savings based on time saved
    const costSavings = timeSavedMinutes 
      ? new Decimal((timeSavedMinutes / 60) * AutomationMetricsAggregator.HOURLY_RATE_USD)
      : null;

    return {
      workflowId,
      date: new Date(), // Will be set properly in upsert
      runsCount: totalRuns,
      successCount: successfulRuns,
      failureCount: failedRuns,
      avgDuration: avgDurationMs,
      timeSavedMinutes,
      errorsPrevented,
      costSavings,
    };
  }

  /**
   * Creates or updates AutomationMetrics record for a workflow and date
   */
  private async upsertAutomationMetrics(
    workflowId: string, 
    date: Date, 
    metrics: DailyMetrics
  ): Promise<void> {
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    try {
      await prisma.automationMetrics.upsert({
        where: {
          workflowId_date: {
            workflowId,
            date: dateOnly,
          },
        },
        update: {
          runsCount: metrics.runsCount,
          successCount: metrics.successCount,
          failureCount: metrics.failureCount,
          avgDuration: metrics.avgDuration,
          timeSavedMinutes: metrics.timeSavedMinutes,
          errorsPrevented: metrics.errorsPrevented,
          costSavings: metrics.costSavings,
        },
        create: {
          workflowId,
          date: dateOnly,
          runsCount: metrics.runsCount,
          successCount: metrics.successCount,
          failureCount: metrics.failureCount,
          avgDuration: metrics.avgDuration,
          timeSavedMinutes: metrics.timeSavedMinutes,
          errorsPrevented: metrics.errorsPrevented,
          costSavings: metrics.costSavings,
        },
      });

      console.log(`Upserted metrics for workflow ${workflowId} on ${dateOnly.toISOString().split('T')[0]}`);
    } catch (error) {
      console.error(`Failed to upsert metrics for workflow ${workflowId}:`, error);
      throw error;
    }
  }

  /**
   * Recalculates metrics for all workflows for a specific date range
   */
  async recalculateMetrics(startDate: Date, endDate: Date, userId: InternalUserId): Promise<void> {
    console.log(`Recalculating metrics from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]} for user ${userId}`);

    const currentDate = new Date(startDate);
    const promises: Promise<void>[] = [];

    while (currentDate <= endDate) {
      promises.push(this.aggregateMetricsForDate(new Date(currentDate), userId));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    await Promise.all(promises);
    console.log(`Metrics recalculation completed for user ${userId}`);
  }

  /**
   * Recalculates metrics for all users for a specific date range
   */
  async recalculateMetricsForAllUsers(startDate: Date, endDate: Date): Promise<void> {
    console.log(`Recalculating metrics for all users from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);

    const userIds = await this.getAllUsers();
    
    if (userIds.length === 0) {
      console.log('No users found in the database');
      return;
    }

    console.log(`Found ${userIds.length} users to process`);

    const promises: Promise<void>[] = [];

    for (const userId of userIds) {
      promises.push(this.recalculateMetrics(startDate, endDate, userId));
    }

    await Promise.all(promises);
    console.log(`Metrics recalculation completed for all ${userIds.length} users`);
  }

  /**
   * Gets aggregated metrics for a workflow over a date range
   */
  async getWorkflowMetrics(
    workflowId: string, 
    startDate: Date, 
    endDate: Date,
  ): Promise<DailyMetrics[]> {
    const metrics = await prisma.automationMetrics.findMany({
      where: {
        workflowId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    return metrics.map(metric => ({
      workflowId: metric.workflowId,
      date: metric.date,
      runsCount: metric.runsCount,
      successCount: metric.successCount,
      failureCount: metric.failureCount,
      avgDuration: metric.avgDuration,
      timeSavedMinutes: metric.timeSavedMinutes,
      errorsPrevented: metric.errorsPrevented,
      costSavings: metric.costSavings,
    }));
  }
}