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

    const topWorkflows = await prisma.workflowRun.groupBy({
      by: 'workflowId',
      where: {
        userId: userId,
      },
      _count: {
        workflowId: true,
      },
      orderBy: {
        _count: {
          workflowId: 'desc',
        },
      },
      take: 5,
    });

    const workflowIds = topWorkflows.map(w => w.workflowId);

    const workflows = await prisma.workflow.findMany({
      where: {
        id: {
          in: workflowIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const workflowMap = workflows.reduce((acc, workflow) => {
      acc[workflow.id] = workflow.name;
      return acc;
    }, {} as Record<string, string>);

    const data = topWorkflows.map(w => ({
      name: workflowMap[w.workflowId],
      runs: w._count.workflowId,
    }));

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching top workflows:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}