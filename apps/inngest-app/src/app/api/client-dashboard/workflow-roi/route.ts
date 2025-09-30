import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@duramation/db';
import { getInternalUserId } from '@/lib/helpers/getInternalUserId';
import { ClerkUserId, InternalUserId } from "@/types/user";

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = await getInternalUserId(clerkId as ClerkUserId) as InternalUserId;
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const workflows = await prisma.workflow.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        automationMetrics: {
          select: {
            timeSavedMinutes: true,
            costSavings: true,
          }
        }
      }
    });

    const workflowRoiData = workflows.map(workflow => {
      const totalMinutesSaved = workflow.automationMetrics.reduce((sum, metric) => sum + (metric.timeSavedMinutes || 0), 0);
      const totalCostSavings = workflow.automationMetrics.reduce((sum, metric) => sum + Number(metric.costSavings || 0), 0);

      return {
        name: workflow.name,
        timeSaved: totalMinutesSaved / 60, // Convert to hours
        moneySaved: totalCostSavings,
      };
    });

    return NextResponse.json(workflowRoiData);

  } catch (error) {
    console.error('Error fetching workflow ROI data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}