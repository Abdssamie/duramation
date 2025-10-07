import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { subDays, format, eachDayOfInterval, startOfDay, endOfDay } from 'date-fns';
import { authenticateUser, isAuthError } from "@/lib/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30d';
    
    // Parse time range
    const days = parseInt(timeRange.replace('d', '')) || 30;
    const endDate = new Date();
    const startDate = subDays(endDate, days - 1);

    // Get all workflow runs for the user in the date range
    const workflowRuns = await prisma.workflowRun.findMany({
      where: {
        userId,
        startedAt: {
          gte: startOfDay(startDate),
          lte: endOfDay(endDate),
        },
      },
      select: {
        startedAt: true,
        status: true,
      },
      orderBy: {
        startedAt: 'asc',
      },
    });

    // Create date intervals
    const dateIntervals = eachDayOfInterval({ start: startDate, end: endDate });
    
    // Group runs by date
    const chartData = dateIntervals.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const runsForDate = workflowRuns.filter(run => 
        format(run.startedAt, 'yyyy-MM-dd') === dateStr
      );

      const totalRuns = runsForDate.length;
      const successful = runsForDate.filter(run => run.status === 'COMPLETED').length;
      const failed = runsForDate.filter(run => run.status === 'FAILED').length;

      return {
        date: dateStr,
        runs: totalRuns,
        successful,
        failed,
      };
    });

    const totalRuns = chartData.reduce((sum, day) => sum + day.runs, 0);
    const totalSuccessful = chartData.reduce((sum, day) => sum + day.successful, 0);
    const totalFailed = chartData.reduce((sum, day) => sum + day.failed, 0);
    const averageRuns = chartData.length > 0 ? Math.round(totalRuns / chartData.length) : 0;

    // Calculate trend percentage (comparing first half vs second half of the period)
    const midPoint = Math.floor(chartData.length / 2);
    const firstHalf = chartData.slice(0, midPoint);
    const secondHalf = chartData.slice(midPoint);
    
    const firstHalfAvg = firstHalf.length > 0 ? firstHalf.reduce((sum, day) => sum + day.runs, 0) / firstHalf.length : 0;
    const secondHalfAvg = secondHalf.length > 0 ? secondHalf.reduce((sum, day) => sum + day.runs, 0) / secondHalf.length : 0;
    
    const trendPercentage = firstHalfAvg > 0 ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 : 0;

    // Get available workflows for the user
    const workflows = await prisma.workflow.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });

    // Transform data to match ChartDataPoint interface
    const transformedData = chartData.map(day => ({
      date: day.date,
      runs: day.runs,
    }));

    return NextResponse.json({
      data: transformedData,
      availableWorkflows: workflows,
      totalRuns,
      averageRuns,
      trendPercentage: Math.round(trendPercentage * 10) / 10, // Round to 1 decimal place
    });

  } catch (error) {
    console.error('Error fetching chart data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}