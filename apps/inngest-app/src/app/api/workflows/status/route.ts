import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { RunStatus } from '@duramation/db/types';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerk_id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Get all workflows for the user
    const workflows = await prisma.workflow.findMany({
      where: { userId: user.id },
      include: {
        workflowRuns: {
          orderBy: { startedAt: 'desc' },
          take: 10,
        },
      },
    });

    // Calculate status for each workflow
    const workflowStatuses = workflows.map((workflow) => {
      const runs = workflow.workflowRuns;
      const totalRuns = runs.length;
      const successfulRuns = runs.filter(
        (run) => run.status === RunStatus.COMPLETED
      ).length;
      const failedRuns = runs.filter(
        (run) => run.status === RunStatus.FAILED
      ).length;
      const runningRuns = runs.filter(
        (run) => run.status === RunStatus.RUNNING || run.status === RunStatus.STARTED
      ).length;

      const successRate = totalRuns > 0 ? (successfulRuns / totalRuns) * 100 : 0;

      // Determine current status
      let status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'STARTED' = 'COMPLETED';
      if (runningRuns > 0) {
        status = 'RUNNING';
      } else if (runs.length > 0) {
        status = runs[0].status as 'RUNNING' | 'COMPLETED' | 'FAILED' | 'STARTED';
      }

      // Calculate trend (compare recent runs to older runs)
      const recentRuns = runs.slice(0, 3);
      const olderRuns = runs.slice(3, 6);
      const recentSuccessRate =
        recentRuns.length > 0
          ? (recentRuns.filter((r) => r.status === RunStatus.COMPLETED).length /
              recentRuns.length) *
            100
          : 0;
      const olderSuccessRate =
        olderRuns.length > 0
          ? (olderRuns.filter((r) => r.status === RunStatus.COMPLETED).length /
              olderRuns.length) *
            100
          : 0;

      let recentTrend: 'up' | 'down' | 'stable' = 'stable';
      if (recentSuccessRate > olderSuccessRate + 5) {
        recentTrend = 'up';
      } else if (recentSuccessRate < olderSuccessRate - 5) {
        recentTrend = 'down';
      }

      return {
        id: workflow.id,
        name: workflow.name,
        status,
        lastRunAt: workflow.lastRunAt,
        successRate: Math.round(successRate * 10) / 10,
        totalRuns,
        recentTrend,
      };
    });

    return NextResponse.json({
      success: true,
      data: workflowStatuses,
    });
  } catch (error) {
    console.error('Error fetching workflow statuses:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch workflow statuses',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}