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

    // Get user's workflows
    const userWorkflows = await prisma.workflow.findMany({
      where: { userId },
      select: { id: true }
    });

    const workflowIds = userWorkflows.map(w => w.id);

    if (workflowIds.length === 0) {
      return NextResponse.json({
        timeSavedHours: 0,
        errorsPrevented: 0,
        totalRuns: 0,
        successRate: 0,
        costSavings: 0,
        projectedAnnualSavings: 0
      });
    }

    // Fetch metrics for ROI calculation
    const metrics = await prisma.automationMetrics.aggregate({
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
      }
    });

    // Calculate values
    const totalRuns = metrics._sum.runsCount || 0;
    const successCount = metrics._sum.successCount || 0;
    const successRate = totalRuns > 0 ? (successCount / totalRuns) * 100 : 0;
    const timeSavedMinutes = metrics._sum.timeSavedMinutes || 0;
    const timeSavedHours = timeSavedMinutes / 60;
    const errorsPrevented = metrics._sum.errorsPrevented || 0;
    const costSavings = Number(metrics._sum.costSavings || 0);

    // Calculate projected annual savings (multiply monthly by 12)
    const projectedAnnualSavings = costSavings * 12;

    return NextResponse.json({
      timeSavedHours,
      errorsPrevented,
      totalRuns,
      successRate,
      costSavings,
      projectedAnnualSavings
    });

  } catch (error) {
    console.error('Error fetching ROI data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}