import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { BusinessOutcomeService } from '@/services/business-outcomes';
import { getInternalUserId } from '@/lib/helpers/getInternalUserId';
import { ClerkUserId, InternalUserId } from '@/types/user';
import { BusinessOutcomeType } from '@duramation/db/types';
import { z } from 'zod';

// Validation schemas
const BusinessOutcomeQuerySchema = z.object({
  workflowId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  outcomeTypes: z.string().optional(), // Comma-separated list
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined)
});

const BusinessOutcomeCreateSchema = z.object({
  workflowId: z.string(),
  outcomeType: z.enum(['LEADS_GENERATED', 'ORDERS_PROCESSED', 'TICKETS_RESOLVED', 'CUSTOM']),
  value: z.number().positive(),
  metadata: z.record(z.string(), z.any()).optional()
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
    
    const validatedParams = BusinessOutcomeQuerySchema.parse(queryParams);

    // Parse date parameters
    const startDate = validatedParams.startDate ? new Date(validatedParams.startDate) : undefined;
    const endDate = validatedParams.endDate ? new Date(validatedParams.endDate) : undefined;

    // Parse outcome types
    const outcomeTypes = validatedParams.outcomeTypes 
      ? validatedParams.outcomeTypes.split(',').map(type => type.trim() as BusinessOutcomeType)
      : undefined;

    // If workflowId is specified, get outcomes for that workflow
    if (validatedParams.workflowId) {
      const outcomes = await BusinessOutcomeService.getWorkflowOutcomes(
        validatedParams.workflowId,
        validatedParams.limit
      );

      // Verify the workflow belongs to the user
      if (outcomes.length > 0) {
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
      }

      return NextResponse.json({
        outcomes,
        total: outcomes.length,
        workflowId: validatedParams.workflowId
      });
    }

    // Get all business outcomes for the user
    const outcomes = await BusinessOutcomeService.getUserBusinessOutcomes(
      userId,
      startDate,
      endDate,
      outcomeTypes
    );

    // Calculate business impact metrics
    const businessImpactMetrics = await BusinessOutcomeService.calculateBusinessImpactMetrics(
      userId,
      startDate,
      endDate
    );

    return NextResponse.json({
      outcomes: validatedParams.limit ? outcomes.slice(0, validatedParams.limit) : outcomes,
      total: outcomes.length,
      businessImpactMetrics,
      filters: {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        outcomeTypes
      }
    });

  } catch (error) {
    console.error('Error fetching business outcomes:', error);
    
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
    const validatedData = BusinessOutcomeCreateSchema.parse(body);

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

    // Create the business outcome
    const outcome = await BusinessOutcomeService.createBusinessOutcome(validatedData);

    return NextResponse.json({
      outcome,
      message: 'Business outcome created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating business outcome:', error);
    
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

export async function PUT(request: NextRequest) {
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
    const { outcomeId, ...updateData } = body;

    if (!outcomeId) {
      return NextResponse.json(
        { error: 'Outcome ID is required' },
        { status: 400 }
      );
    }

    // Verify the outcome belongs to a workflow owned by the user
    const { prisma } = await import('@duramation/db');
    const existingOutcome = await prisma.businessOutcome.findFirst({
      where: {
        id: outcomeId,
        workflow: {
          userId: userId
        }
      }
    });

    if (!existingOutcome) {
      return NextResponse.json(
        { error: 'Business outcome not found or access denied' },
        { status: 404 }
      );
    }

    // Update the business outcome
    const updatedOutcome = await BusinessOutcomeService.updateBusinessOutcome(
      outcomeId,
      updateData
    );

    return NextResponse.json({
      outcome: updatedOutcome,
      message: 'Business outcome updated successfully'
    });

  } catch (error) {
    console.error('Error updating business outcome:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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
    const outcomeId = searchParams.get('outcomeId');

    if (!outcomeId) {
      return NextResponse.json(
        { error: 'Outcome ID is required' },
        { status: 400 }
      );
    }

    // Verify the outcome belongs to a workflow owned by the user
    const { prisma } = await import('@duramation/db');
    const existingOutcome = await prisma.businessOutcome.findFirst({
      where: {
        id: outcomeId,
        workflow: {
          userId: userId
        }
      }
    });

    if (!existingOutcome) {
      return NextResponse.json(
        { error: 'Business outcome not found or access denied' },
        { status: 404 }
      );
    }

    // Delete the business outcome
    await BusinessOutcomeService.deleteBusinessOutcome(outcomeId);

    return NextResponse.json({
      message: 'Business outcome deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting business outcome:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}