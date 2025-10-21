import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateApiKey } from '@/lib/utils/api-key';

/**
 * Public API endpoint to list all available workflows for the authenticated user
 * GET /api/v1/workflows
 */
export async function GET(request: NextRequest) {
  try {
    // Extract API key from Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid Authorization header. Use: Bearer <api_key>',
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

    // Get all available workflows for the user
    const workflows = await prisma.workflow.findMany({
      where: {
        userId,
        available: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        templateId: true,
        eventName: true,
        canBeScheduled: true,
        lastRunAt: true,
        nextRunAt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: workflows,
      pagination: {
        total: workflows.length,
        page: 1,
        limit: workflows.length,
        totalPages: 1,
      },
    });
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
