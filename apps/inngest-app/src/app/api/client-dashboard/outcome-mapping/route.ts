import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { OutcomeAttributionService } from '@/services/outcome-attribution';
import { BusinessOutcomeService } from '@/services/business-outcomes';
import { getInternalUserId } from '@/lib/helpers/getInternalUserId';
import { ClerkUserId, InternalUserId } from '@/types/user';
import { BusinessOutcomeType } from '@duramation/db/types';
import { z } from 'zod';

// Validation schemas
const OutcomeMappingQuerySchema = z.object({
  workflowId: z.string().optional(),
  includeStats: z.string().optional().transform(val => val === 'true'),
  includeAttribution: z.string().optional().transform(val => val === 'true'),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 50)
});

const AttributionRuleSchema = z.object({
  workflowId: z.string(),
  outcomeType: z.enum(['LEADS_GENERATED', 'ORDERS_PROCESSED', 'TICKETS_RESOLVED', 'CUSTOM']),
  attributionMethod: z.enum(['direct', 'time_based', 'metadata_match']),
  timeWindowMinutes: z.number().positive().optional(),
  metadataKeys: z.array(z.string()).optional(),
  weight: z.number().min(0).max(1).optional()
});

const BulkAttributionSchema = z.object({
  workflowIds: z.array(z.string()),
  timeWindowHours: z.number().positive().default(24),
  method: z.enum(['time_based', 'metadata_match']).default('time_based'),
  metadataKey: z.string().optional(),
  metadataValue: z.any().optional()
});

const ManualAttributionSchema = z.object({
  outcomeId: z.string(),
  workflowRunId: z.string(),
  confidence: z.number().min(0).max(1).optional().default(1.0),
  notes: z.string().optional()
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
    
    const validatedParams = OutcomeMappingQuerySchema.parse(queryParams);

    // If workflowId is specified, get mapping for that specific workflow
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

      const response: any = {
        workflowId: validatedParams.workflowId,
        workflowName: workflow.name
      };

      // Get outcomes with attribution details
      if (validatedParams.includeAttribution) {
        response.outcomesWithAttribution = await OutcomeAttributionService.getOutcomesWithAttribution(
          validatedParams.workflowId,
          validatedParams.limit
        );
      }

      // Get attribution statistics
      if (validatedParams.includeStats) {
        response.attributionStats = await OutcomeAttributionService.getAttributionStats(
          validatedParams.workflowId
        );
      }

      // Get basic outcomes if attribution details not requested
      if (!validatedParams.includeAttribution) {
        response.outcomes = await BusinessOutcomeService.getWorkflowOutcomes(
          validatedParams.workflowId,
          validatedParams.limit
        );
      }

      return NextResponse.json(response);
    }

    // Get outcome mapping overview for all user workflows
    const { prisma } = await import('@duramation/db');
    const userWorkflows = await prisma.workflow.findMany({
      where: { userId },
      select: { id: true, name: true }
    });

    const workflowMappings = await Promise.all(
      userWorkflows.map(async (workflow) => {
        const stats = await OutcomeAttributionService.getAttributionStats(workflow.id);
        const recentOutcomes = await BusinessOutcomeService.getWorkflowOutcomes(workflow.id, 5);
        
        return {
          workflowId: workflow.id,
          workflowName: workflow.name,
          attributionStats: stats,
          recentOutcomes: recentOutcomes.length,
          lastOutcomeAt: recentOutcomes[0]?.timestamp || null
        };
      })
    );

    // Calculate overall attribution statistics
    const overallStats = {
      totalWorkflows: userWorkflows.length,
      totalOutcomes: workflowMappings.reduce((sum, w) => sum + w.attributionStats.totalOutcomes, 0),
      totalAttributed: workflowMappings.reduce((sum, w) => sum + w.attributionStats.attributedOutcomes, 0),
      overallAttributionRate: 0
    };

    overallStats.overallAttributionRate = overallStats.totalOutcomes > 0 
      ? overallStats.totalAttributed / overallStats.totalOutcomes 
      : 0;

    return NextResponse.json({
      workflowMappings,
      overallStats,
      metadata: {
        includeStats: validatedParams.includeStats,
        includeAttribution: validatedParams.includeAttribution
      }
    });

  } catch (error) {
    console.error('Error fetching outcome mapping:', error);
    
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

    const body = await request.json();
    const { action } = body;

    // Handle different types of outcome mapping operations
    switch (action) {
      case 'create_attribution_rule': {
        const validatedData = AttributionRuleSchema.parse(body.data);
        
        // Verify workflow ownership
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

        const rule = await OutcomeAttributionService.createAttributionRule(validatedData);
        
        return NextResponse.json({
          rule,
          message: 'Attribution rule created successfully'
        }, { status: 201 });
      }

      case 'bulk_attribute': {
        const validatedData = BulkAttributionSchema.parse(body.data);
        
        // Verify all workflows belong to the user
        const { prisma } = await import('@duramation/db');
        const userWorkflows = await prisma.workflow.findMany({
          where: {
            id: { in: validatedData.workflowIds },
            userId: userId
          },
          select: { id: true }
        });

        const verifiedWorkflowIds = userWorkflows.map(w => w.id);
        
        if (verifiedWorkflowIds.length !== validatedData.workflowIds.length) {
          return NextResponse.json(
            { error: 'Some workflows not found or access denied' },
            { status: 404 }
          );
        }

        let results;
        if (validatedData.method === 'time_based') {
          results = await OutcomeAttributionService.bulkAttributeOutcomes(
            verifiedWorkflowIds,
            validatedData.timeWindowHours
          );
        } else if (validatedData.method === 'metadata_match' && validatedData.metadataKey) {
          results = [];
          for (const workflowId of verifiedWorkflowIds) {
            const attributions = await OutcomeAttributionService.attributeByMetadata(
              workflowId,
              validatedData.metadataKey,
              validatedData.metadataValue
            );
            results.push({
              workflowId,
              success: true,
              attributions: attributions.length,
              details: attributions
            });
          }
        } else {
          return NextResponse.json(
            { error: 'Invalid attribution method or missing metadata key' },
            { status: 400 }
          );
        }

        return NextResponse.json({
          results,
          message: 'Bulk attribution completed'
        });
      }

      case 'manual_attribute': {
        const validatedData = ManualAttributionSchema.parse(body.data);
        
        // Verify the outcome and workflow run belong to the user
        const { prisma } = await import('@duramation/db');
        const outcome = await prisma.businessOutcome.findFirst({
          where: {
            id: validatedData.outcomeId,
            workflow: { userId: userId }
          }
        });

        const workflowRun = await prisma.workflowRun.findFirst({
          where: {
            id: validatedData.workflowRunId,
            userId: userId
          }
        });

        if (!outcome || !workflowRun) {
          return NextResponse.json(
            { error: 'Outcome or workflow run not found or access denied' },
            { status: 404 }
          );
        }

        // Update the outcome with manual attribution
        const updatedOutcome = await prisma.businessOutcome.update({
          where: { id: validatedData.outcomeId },
          data: {
            metadata: {
              ...outcome.metadata as any,
              attributedToRun: validatedData.workflowRunId,
              attributedAt: new Date().toISOString(),
              attributionMethod: 'manual',
              attributionConfidence: validatedData.confidence,
              attributionNotes: validatedData.notes
            }
          }
        });

        return NextResponse.json({
          outcome: updatedOutcome,
          message: 'Manual attribution completed'
        });
      }

      case 'remove_attribution': {
        const { outcomeId } = body.data;
        
        // Verify the outcome belongs to the user
        const { prisma } = await import('@duramation/db');
        const outcome = await prisma.businessOutcome.findFirst({
          where: {
            id: outcomeId,
            workflow: { userId: userId }
          }
        });

        if (!outcome) {
          return NextResponse.json(
            { error: 'Outcome not found or access denied' },
            { status: 404 }
          );
        }

        const updatedOutcome = await OutcomeAttributionService.removeAttribution(outcomeId);
        
        return NextResponse.json({
          outcome: updatedOutcome,
          message: 'Attribution removed successfully'
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in outcome mapping operation:', error);
    
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