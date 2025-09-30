import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@duramation/db';
import { subDays, startOfDay, endOfDay, format, eachDayOfInterval, eachWeekOfInterval, startOfWeek } from 'date-fns';
import { getInternalUserId } from '@/lib/helpers/getInternalUserId';
import { ClerkUserId, InternalUserId } from "@/types/user";

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get internal user ID
    const userId = await getInternalUserId(clerkId  as ClerkUserId) as InternalUserId;
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const granularity = searchParams.get('granularity') || 'daily';
    
    // Default to last 30 days if no date range provided
    const to = toParam ? new Date(toParam) : new Date();
    const from = fromParam ? new Date(fromParam) : subDays(to, 30);

    // Get user's workflows
    const userWorkflows = await prisma.workflow.findMany({
      where: { userId },
      select: { id: true }
    });

    const workflowIds = userWorkflows.map(w => w.id);

    if (workflowIds.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch metrics data
    const metricsData = await prisma.automationMetrics.findMany({
      where: {
        workflowId: { in: workflowIds },
        date: {
          gte: startOfDay(from),
          lte: endOfDay(to)
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    // Create date intervals based on granularity
    const intervals = granularity === 'weekly' 
      ? eachWeekOfInterval({ start: from, end: to }, { weekStartsOn: 1 })
      : eachDayOfInterval({ start: from, end: to });

    // Group metrics by date/week
    const groupedData = intervals.map(intervalDate => {
      const dateKey = granularity === 'weekly' 
        ? format(startOfWeek(intervalDate, { weekStartsOn: 1 }), 'yyyy-MM-dd')
        : format(intervalDate, 'yyyy-MM-dd');

      // Filter metrics for this interval
      const intervalMetrics = metricsData.filter(metric => {
        const metricDate = format(metric.date, 'yyyy-MM-dd');
        
        if (granularity === 'weekly') {
          const weekStart = startOfWeek(intervalDate, { weekStartsOn: 1 });
          const weekEnd = endOfDay(subDays(weekStart, -6));
          const metricDateTime = new Date(metric.date);
          return metricDateTime >= weekStart && metricDateTime <= weekEnd;
        } else {
          return metricDate === dateKey;
        }
      });

      // Aggregate metrics for this interval
      const runs = intervalMetrics.reduce((sum, m) => sum + (m.runsCount || 0), 0);
      const successCount = intervalMetrics.reduce((sum, m) => sum + (m.successCount || 0), 0);
      const failureCount = intervalMetrics.reduce((sum, m) => sum + (m.failureCount || 0), 0);
      const totalDuration = intervalMetrics.reduce((sum, m) => sum + (m.avgDuration || 0), 0);
      const avgDuration = intervalMetrics.length > 0 ? totalDuration / intervalMetrics.length : 0;
      const timeSaved = intervalMetrics.reduce((sum, m) => sum + (m.timeSavedMinutes || 0), 0);

      return {
        date: dateKey,
        runs,
        successCount,
        failureCount,
        successRate: runs > 0 ? (successCount / runs) * 100 : 0,
        avgDuration: Math.round(avgDuration),
        timeSaved
      };
    });

    return NextResponse.json(groupedData);

  } catch (error) {
    console.error('Error fetching chart data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}