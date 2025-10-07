import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface CacheInvalidationPayload {
  type: 'cache_invalidation';
  event: {
    type: 'workflow_run' | 'service_request' | 'automation_metrics';
    userId: string;
    workflowId?: string;
    timestamp: string;
    action: 'created' | 'updated' | 'deleted';
  };
  cacheKeys: string[];
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const headersList = headers();
    const authorization = headersList.get('authorization');
    const expectedSecret = process.env.INNGEST_WEBHOOK_SECRET || '';
    
    if (!authorization || authorization !== `Bearer ${expectedSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload: CacheInvalidationPayload = await request.json();

    // Validate payload structure
    if (!payload.type || payload.type !== 'cache_invalidation') {
      return NextResponse.json(
        { error: 'Invalid payload type' },
        { status: 400 }
      );
    }

    const { event, cacheKeys } = payload;

    // Log cache invalidation event
    console.log(`Cache invalidation received:`, {
      type: event.type,
      userId: event.userId,
      workflowId: event.workflowId,
      action: event.action,
      cacheKeysCount: cacheKeys.length,
      timestamp: event.timestamp,
    });

    // Here you could implement additional logic such as:
    // 1. Notifying connected WebSocket clients
    // 2. Triggering frontend cache revalidation
    // 3. Updating real-time dashboard components
    // 4. Logging metrics for cache invalidation frequency

    // For now, we'll just acknowledge the webhook
    return NextResponse.json({
      success: true,
      message: 'Cache invalidation processed',
      event: {
        type: event.type,
        userId: event.userId,
        workflowId: event.workflowId,
        action: event.action,
      },
      invalidatedKeys: cacheKeys.length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Cache invalidation webhook error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}