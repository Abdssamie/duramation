import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@duramation/db';
import { startOfMonth, endOfMonth, subMonths, startOfDay } from 'date-fns';
import { getInternalUserId } from '@/lib/helpers/getInternalUserId';
import { ClerkUserId, InternalUserId } from "@/types/user";
import { SimplifiedMetrics } from '@duramation/shared';
import { Redis } from '@upstash/redis';

// Initialize Redis client for caching
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

const CACHE_TTL = 300; // 5 minutes in seconds
const CACHE_KEY_PREFIX = 'dashboard_metrics';

function getCacheKey(userId: string): string {
  return `${CACHE_KEY_PREFIX}:${userId}`;
}

function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

async function fetchMetricsFromDatabase(userId: InternalUserId): Promise<SimplifiedMetrics> {
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

  const workflowIds = userWorkflows.map(w => w.id);

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
  const newWorkflowsThisMonth = userWorkflows.filter(w => 
    w.createdAt >= currentMonthStart && w.createdAt <= currentMonthEnd
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

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get internal user ID
    const userId = await getInternalUserId(clerkId as ClerkUserId) as InternalUserId;
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const cacheKey = getCacheKey(userId);

    try {
      // Try to get cached data first
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return NextResponse.json(cachedData);
      }
    } catch (cacheError) {
      console.warn('Cache read error:', cacheError);
      // Continue without cache if Redis is unavailable
    }

    // Fetch fresh data from database
    const metrics = await fetchMetricsFromDatabase(userId);

    try {
      // Cache the result for 5 minutes
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(metrics));
    } catch (cacheError) {
      console.warn('Cache write error:', cacheError);
      // Continue without caching if Redis is unavailable
    }

    return NextResponse.json(metrics);

  } catch (error) {
    console.error('Error fetching simplified metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}