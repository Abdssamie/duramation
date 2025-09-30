import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@duramation/db';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import { getInternalUserId } from '@/lib/helpers/getInternalUserId';
import { ClerkUserId, InternalUserId } from "@/types/user";

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

    const { searchParams } = new URL(request.url);
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    
    // Default to last 30 days if no date range provided
    const to = toParam ? new Date(toParam) : new Date();
    const from = fromParam ? new Date(fromParam) : subDays(to, 30);
    
    // Calculate previous period for trend comparison
    const periodLength = Math.abs(to.getTime() - from.getTime());
    const previousFrom = new Date(from.getTime() - periodLength);
    const previousTo = from;

    // Get user's workflows
    const userWorkflows = await prisma.workflow.findMany({
      where: { userId },
      select: { id: true }
    });

    const workflowIds = userWorkflows.map(w => w.id);

    if (workflowIds.length === 0) {
      return NextResponse.json({
        totalRuns: 0,
        successRate: 0,
        avgDuration: 0,
        timeSavedHours: 0,
        costSavings: 0,
        errorsPrevented: 0,
        trend: {
          runs: 0,
          successRate: 0,
          timeSaved: 0,
          costSavings: 0
        }
      });
    }

    // Fetch current period metrics
    const currentMetrics = await prisma.automationMetrics.aggregate({
      where: {
        workflowId: { in: workflowIds },
        date: {
          gte: startOfDay(from),
          lte: endOfDay(to)
        }
      },
      _sum: {
        runsCount: true,
        successCount: true,
        failureCount: true,
        timeSavedMinutes: true,
        errorsPrevented: true,
        costSavings: true
      },
      _avg: {
        avgDuration: true
      }
    });

    // Fetch previous period metrics for trend calculation
    const previousMetrics = await prisma.automationMetrics.aggregate({
      where: {
        workflowId: { in: workflowIds },
        date: {
          gte: startOfDay(previousFrom),
          lte: endOfDay(previousTo)
        }
      },
      _sum: {
        runsCount: true,
        successCount: true,
        failureCount: true,
        timeSavedMinutes: true,
        costSavings: true
      }
    });

    // Calculate current period values
    const totalRuns = currentMetrics._sum.runsCount || 0;
    const successCount = currentMetrics._sum.successCount || 0;
    const failureCount = currentMetrics._sum.failureCount || 0;
    const successRate = totalRuns > 0 ? (successCount / totalRuns) * 100 : 0;
    const avgDuration = currentMetrics._avg.avgDuration || 0;
    const timeSavedMinutes = currentMetrics._sum.timeSavedMinutes || 0;
    const timeSavedHours = timeSavedMinutes / 60;
    const costSavings = Number(currentMetrics._sum.costSavings || 0);
    const errorsPrevented = currentMetrics._sum.errorsPrevented || 0;

    // Calculate previous period values for trends
    const previousTotalRuns = previousMetrics._sum.runsCount || 0;
    const previousSuccessCount = previousMetrics._sum.successCount || 0;
    const previousSuccessRate = previousTotalRuns > 0 ? (previousSuccessCount / previousTotalRuns) * 100 : 0;
    const previousTimeSavedMinutes = previousMetrics._sum.timeSavedMinutes || 0;
    const previousTimeSavedHours = previousTimeSavedMinutes / 60;
    const previousCostSavings = Number(previousMetrics._sum.costSavings || 0);

    // Calculate trends (percentage change)
    const calculateTrend = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const trend = {
      runs: calculateTrend(totalRuns, previousTotalRuns),
      successRate: successRate - previousSuccessRate, // Direct difference for percentage
      timeSaved: calculateTrend(timeSavedHours, previousTimeSavedHours),
      costSavings: calculateTrend(costSavings, previousCostSavings)
    };

    return NextResponse.json({
      totalRuns,
      successRate,
      avgDuration,
      timeSavedHours,
      costSavings,
      errorsPrevented,
      trend
    });

  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}