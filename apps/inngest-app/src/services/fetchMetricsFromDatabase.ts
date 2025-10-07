import { calculateTrend } from '@/app/api/dashboard/metrics/route';
import { InternalUserId } from '@/types/user';
import { prisma } from '@duramation/db';
import { SimplifiedMetrics } from '@duramation/shared';
import { startOfMonth, endOfMonth, subMonths, startOfDay } from 'date-fns';

export async function fetchMetricsFromDatabase(userId: InternalUserId): Promise<SimplifiedMetrics> {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);
  const previousMonthStart = startOfMonth(subMonths(now, 1));
  const previousMonthEnd = endOfMonth(subMonths(now, 1));

  // Get user's workflows
  const userWorkflows = await prisma.workflow.findMany({
    where: { userId },
    select: {
      id: true,
      canBeScheduled: true,
      available: true,
      createdAt: true,
      cronExpressions: true
    }
  });

  // 1. Workflow runs this month and trend
  const [currentMonthRuns, previousMonthRuns] = await Promise.all([
    prisma.workflowRun.count({
      where: {
        userId,
        startedAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd
        }
      }
    }),
    prisma.workflowRun.count({
      where: {
        userId,
        startedAt: {
          gte: previousMonthStart,
          lte: previousMonthEnd
        }
      }
    })
  ]);

  // 2. Total automations executed (lifetime)
  const totalAutomationsExecuted = await prisma.workflowRun.count({
    where: { userId }
  });

  // 3. Average execution time (last 30 days)
  const last30Days = startOfDay(subMonths(now, 1));
  const completedRuns = await prisma.workflowRun.findMany({
    where: {
      userId,
      status: 'COMPLETED',
      startedAt: { gte: last30Days },
      completedAt: { not: null }
    },
    select: {
      startedAt: true,
      completedAt: true
    }
  });

  const executionTimes = completedRuns
    .filter(run => run.completedAt)
    .map(run => (run.completedAt!.getTime() - run.startedAt.getTime()) / 1000);

  const averageExecutionTime = executionTimes.length > 0
    ? executionTimes.reduce((sum, time) => sum + time, 0) / executionTimes.length
    : 0;

  // 4. Success and failure rates (last 30 days)
  const [successfulRuns, failedRuns, totalRecentRuns] = await Promise.all([
    prisma.workflowRun.count({
      where: {
        userId,
        status: 'COMPLETED',
        startedAt: { gte: last30Days }
      }
    }),
    prisma.workflowRun.count({
      where: {
        userId,
        status: 'FAILED',
        startedAt: { gte: last30Days }
      }
    }),
    prisma.workflowRun.count({
      where: {
        userId,
        startedAt: { gte: last30Days }
      }
    })
  ]);

  const workflowSuccessRate = totalRecentRuns > 0 ? (successfulRuns / totalRecentRuns) * 100 : 0;
  const workflowFailureRate = totalRecentRuns > 0 ? (failedRuns / totalRecentRuns) * 100 : 0;

  // 5. Active/Inactive workflows
  const activeWorkflows = userWorkflows.filter(w => w.available);
  const scheduledWorkflows = activeWorkflows.filter(w => w.canBeScheduled && w.cronExpressions.length > 0);
  const directWorkflows = activeWorkflows.filter(w => !w.canBeScheduled || w.cronExpressions.length === 0);
  const inactiveWorkflows = userWorkflows.filter(w => !w.available).length;

  // 6. New workflows this month
  const newWorkflowsThisMonth = userWorkflows.filter(w => w.createdAt >= currentMonthStart && w.createdAt <= currentMonthEnd
  ).length;

  // 7. Sales calls (from service requests)
  const [scheduledCalls, completedCalls] = await Promise.all([
    prisma.serviceRequest.count({
      where: {
        userId,
        meetingScheduled: true,
        meetingDate: {
          gte: currentMonthStart,
          lte: currentMonthEnd
        }
      }
    }),
    prisma.serviceRequest.count({
      where: {
        userId,
        status: 'COMPLETED',
        updatedAt: {
          gte: currentMonthStart,
          lte: currentMonthEnd
        }
      }
    })
  ]);

  // 8. Estimated savings calculation
  // Assume average manual time is 30 minutes per automation
  const estimatedManualTimePerRun = 30 * 60; // 30 minutes in seconds
  const totalTimeSavedSeconds = totalAutomationsExecuted * (estimatedManualTimePerRun - averageExecutionTime);
  const timeHours = Math.max(0, totalTimeSavedSeconds / 3600);

  // Assume $50/hour cost savings
  const hourlyRate = 50;
  const costUSD = timeHours * hourlyRate;

  return {
    workflowRunsThisMonth: {
      total: currentMonthRuns,
      trend: calculateTrend(currentMonthRuns, previousMonthRuns)
    },
    totalAutomationsExecuted,
    averageExecutionTime: Math.round(averageExecutionTime * 100) / 100, // Round to 2 decimal places
    estimatedSavings: {
      timeHours: Math.round(timeHours * 100) / 100,
      costUSD: Math.round(costUSD * 100) / 100
    },
    workflowSuccessRate: Math.round(workflowSuccessRate * 100) / 100,
    workflowFailureRate: Math.round(workflowFailureRate * 100) / 100,
    activeWorkflows: {
      total: activeWorkflows.length,
      scheduled: scheduledWorkflows.length,
      direct: directWorkflows.length
    },
    inactiveWorkflows,
    salesCalls: {
      scheduled: scheduledCalls,
      completed: completedCalls
    },
    newWorkflowsThisMonth
  };
}
