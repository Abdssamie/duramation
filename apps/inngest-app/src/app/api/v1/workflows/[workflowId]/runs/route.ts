import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateApiKey } from '@/lib/utils/api-key';
import { Workflow, WorkflowRun } from '@duramation/db';

/**
 * Public API endpoint to get workflow run history
 * GET /api/v1/workflows/:workflowId/runs
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { workflowId: string } }
): Promise<NextResponse> {
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

    const { workflowId } = params;

    // Verify the workflow exists and belongs to the user
    const workflow: Workflow | null = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId,
      },
    });

    if (!workflow) {
      return NextResponse.json(
        {
          success: false,
          error: 'Workflow not found',
        },
        { status: 404 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const status = searchParams.get('status');

    // Build where clause
    const where: any = {
      workflowId,
      userId,
    };

    if (status) {
      where.status = status.toUpperCase();
    }

    // Get total count
    const total = await prisma.workflowRun.count({ where });

    // Get paginated runs
    const runs: (Omit<WorkflowRun,'createdAt' | 'updatedAt' | 'idempotencyKey' | 'realtimeData' | 'workflowId' | 'userId'> | null)[] = await prisma.workflowRun.findMany({
      where,
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
      },
      orderBy: {
        startedAt: 'desc',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return NextResponse.json({
      success: true,
      data: runs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching workflow runs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
