import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateApiKey } from '@/lib/utils/api-key';

/**
 * Public API endpoint to get a specific workflow run's details
 * GET /api/v1/workflows/:workflowId/runs/:runId
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { workflowId: string; runId: string } }
) {
  try {
    // Extract API key from Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid Authorization header',
        },
        { status: 401 }
      );
    }

    const apiKey = authHeader.substring(7);
    const userId = await authenticateApiKey(apiKey);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired API key',
        },
        { status: 401 }
      );
    }

    const { workflowId, runId } = params;

    // Get the workflow run
    const run = await prisma.workflowRun.findFirst({
      where: {
        id: runId,
        workflowId,
        userId,
      },
      select: {
        id: true,
        inngestRunId: true,
        status: true,
        startedAt: true,
        completedAt: true,
        input: true,
        output: true,
        error: true,
        version: true,
        realtimeData: true,
        workflow: {
          select: {
            id: true,
            name: true,
            eventName: true,
          },
        },
      },
    });

    if (!run) {
      return NextResponse.json(
        {
          success: false,
          error: 'Workflow run not found',
        },
        { status: 404 }
      );
    }

    // Calculate duration if completed
    let duration = null;
    if (run.completedAt) {
      duration = run.completedAt.getTime() - run.startedAt.getTime();
    }

    return NextResponse.json({
      success: true,
      data: {
        ...run,
        duration,
      },
    });
  } catch (error) {
    console.error('Error fetching workflow run:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
