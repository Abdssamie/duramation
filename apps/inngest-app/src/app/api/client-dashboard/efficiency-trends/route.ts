import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { EfficiencyCalculatorService } from '@/services/efficiency-calculator';
import { EfficiencyCacheService } from '@/services/efficiency-cache';
import { getInternalUserId } from '@/lib/helpers/getInternalUserId';
import { ClerkUserId, InternalUserId } from '@/types/user';
import { z } from 'zod';

// Validation schemas
const EfficiencyTrendsQuerySchema = z.object({
  workflowId: z.string().optional(),
  periodType: z.enum(['month', 'quarter']).default('month'),
  periodsBack: z.string().optional().transform(val => val ? parseInt(val) : 6),
  includeProjections: z.string().optional().transform(val => val === 'true'),
  includeBenchmarks: z.string().optional().transform(val => val === 'true'),
  useCache: z.string().optional().transform(val => val !== 'false') // Default to true
});

const EfficiencyMetricCreateSchema = z.object({
  workflowId: z.string(),
  period: z.string(),
  beforeMetrics: z.object({
    timeSpent: z.number().optional(),
    errorRate: z.number().min(0).max(100).optional(),
    throughput: z.number().positive().optional()
  }),
  afterMetrics: z.object({
    timeSpent: z.number().optional(),
    errorRate: z.number().min(0).max(100).optional(),
    throughput: z.number().positive().optional()
  })
});

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

    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    
    const validatedParams = EfficiencyTrendsQuerySchema.parse(queryParams);

    // If workflowId is specified, get trends for that specific workflow
    if (validatedParams.workflowId) {
      // Verify the workflow belongs to the user
      const { prisma } = await import('@duramation/db');
      const workflow = await prisma.workflow.findFirst({
        where: {
          id: validatedParams.workflowId,
          userId: userId
        }
      });

      if (!workflow) {
        return NextResponse.json(
          { error: 'Workflow not found or access denied' },
          { status: 404 }
        );
      }

      // Get efficiency trends for the specific workflow
      const trends = validatedParams.useCache
        ? await EfficiencyCacheService.getCachedEfficiencyTrends(
            validatedParams.workflowId,
            validatedParams.periodType
          )
        : await EfficiencyCalculatorService.calculateEfficiencyTrends(
            validatedParams.workflowId,
            validatedParams.periodType,
            validatedParams.periodsBack
          );

      let analysis = null;
      if (validatedParams.includeProjections || validatedParams.includeBenchmarks) {
        analysis = await EfficiencyCalculatorService.getWorkflowEfficiencyAnalysis(
          validatedParams.workflowId
        );
      }

      return NextResponse.json({
        workflowId: validatedParams.workflowId,
        workflowName: workflow.name,
        trends,
        analysis: analysis ? {
          ...(validatedParams.includeProjections && { projectedSavings: analysis.projectedSavings }),
          ...(validatedParams.includeBenchmarks && { benchmarks: analysis.benchmarks })
        } : null,
        metadata: {
          periodType: validatedParams.periodType,
          periodsBack: validatedParams.periodsBack,
          cached: validatedParams.useCache
        }
      });
    }

    // Get efficiency comparisons for all user workflows
    const efficiencyComparisons = await EfficiencyCalculatorService.getUserEfficiencyComparisons(
      userId,
      validatedParams.periodType
    );

    // Get aggregated metrics
    const aggregatedMetrics = validatedParams.useCache
      ? await EfficiencyCacheService.getCachedEfficiencyData(userId)
      : await EfficiencyCalculatorService.aggregateUserEfficiencyMetrics(userId);

    return NextResponse.json({
      efficiencyComparisons,
      aggregatedMetrics,
      metadata: {
        periodType: validatedParams.periodType,
        totalWorkflows: efficiencyComparisons.length,
        cached: validatedParams.useCache
      }
    });

  } catch (error) {
    console.error('Error fetching efficiency trends:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    // Parse and validate request body
    const body = await request.json();
    const validatedData = EfficiencyMetricCreateSchema.parse(body);

    // Verify the workflow belongs to the user
    const { prisma } = await import('@duramation/db');
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: validatedData.workflowId,
        userId: userId
      }
    });

    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow not found or access denied' },
        { status: 404 }
      );
    }

    // Create or update the efficiency metric
    const efficiencyMetric = await EfficiencyCalculatorService.createOrUpdateEfficiencyMetric(
      validatedData
    );

    // Invalidate cache for this user
    await EfficiencyCacheService.invalidateUserCache(userId);
    await EfficiencyCacheService.invalidateWorkflowCache(validatedData.workflowId);

    return NextResponse.json({
      efficiencyMetric,
      message: 'Efficiency metric created/updated successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating efficiency metric:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Additional endpoint for bulk efficiency metric updates
export async function PATCH(request: NextRequest) {
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

    const body = await request.json();
    const { action, workflowIds } = body;

    if (action === 'recalculate') {
      // Recalculate efficiency metrics for specified workflows
      const results = [];
      
      for (const workflowId of workflowIds || []) {
        try {
          // Verify workflow ownership
          const { prisma } = await import('@duramation/db');
          const workflow = await prisma.workflow.findFirst({
            where: {
              id: workflowId,
              userId: userId
            }
          });

          if (workflow) {
            const analysis = await EfficiencyCalculatorService.getWorkflowEfficiencyAnalysis(workflowId);
            results.push({
              workflowId,
              success: true,
              analysis
            });
          } else {
            results.push({
              workflowId,
              success: false,
              error: 'Workflow not found or access denied'
            });
          }
        } catch (error) {
          results.push({
            workflowId,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      // Invalidate cache
      await EfficiencyCacheService.invalidateUserCache(userId);

      return NextResponse.json({
        results,
        message: 'Efficiency metrics recalculated'
      });
    }

    if (action === 'warm_cache') {
      // Warm up cache for user
      await EfficiencyCacheService.warmUpUserCache(userId);
      
      return NextResponse.json({
        message: 'Cache warmed up successfully'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error in bulk efficiency operation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}