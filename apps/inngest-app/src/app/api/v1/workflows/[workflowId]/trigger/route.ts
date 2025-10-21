import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateApiKey } from '@/lib/utils/api-key';
import { getUserById } from "@/lib/helpers/getUserById";
import { InternalUserId } from "@/types/user";
import type { WorkflowRunRequest, WorkflowRunResponse } from "@duramation/shared";
import { v4 as uuidv4 } from "uuid";
import { validateWorkflowInput } from "@duramation/shared";
import { Events, inngest, WorkflowTriggerPayload } from "@/inngest/client";
import logger from "@/services/logging";
import { z } from "zod";

// Schema for validating workflow run requests
const WorkflowRunRequestSchema = z.object({
  input: z.record(z.string(), z.any()).optional(),
  scheduledRun: z.boolean().optional(),
  cronExpression: z.string().optional(),
  timezone: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
}) satisfies z.ZodType<WorkflowRunRequest>;

/**
 * Public API endpoint to trigger workflows using API key authentication
 * POST /api/v1/workflows/:workflowId/trigger
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
) {
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

    const apiKey = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Authenticate the API key
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

    const internalUser = await getUserById(userId as InternalUserId);

    if (!internalUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    const { workflowId } = await params;

    // Parse and validate request body
    let requestBody = {};
    try {
      const body = await request.text();
      if (body) {
        requestBody = JSON.parse(body);
      }
    } catch (parseError) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid JSON in request body: ${parseError}`
        },
        { status: 400 }
      );
    }

    // Validate request body structure
    const validationResult = WorkflowRunRequestSchema.safeParse(requestBody);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
          details: validationResult.error.issues.map(e => e.message)
        },
        { status: 400 }
      );
    }

    const { input, scheduledRun, cronExpression, timezone, metadata } = validationResult.data;

    // Verify the workflow exists and belongs to the user
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId,
        available: true,
      },
      select: {
        id: true,
        input: true,
        templateId: true,
        eventName: true,
        idempotencyKey: true,
        status: true,
        available: true,
        timezone: true,
      }
    });

    if (!workflow) {
      return NextResponse.json(
        {
          success: false,
          error: 'Workflow not found or not accessible',
        },
        { status: 404 }
      );
    }

    // Prevent triggering if workflow is already running
    if (workflow.status === 'RUNNING') {
      return NextResponse.json(
        {
          success: false,
          error: 'Workflow is already running. Please wait for the current execution to complete.',
        },
        { status: 409 } // 409 Conflict
      );
    }

    // Get workflow template to validate input if input is provided
    if (input !== undefined) {
      const templateId = workflow.templateId;

      // Validate workflow input values against template
      const validation = await validateWorkflowInput(prisma, templateId, input);
      if (!validation.valid) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid workflow input',
            details: validation.errors
          },
          { status: 400 }
        );
      }
    }

    // Generate a fresh idempotency key for each manual run
    const runIdempotencyKey = uuidv4();

    logger.info(`Running workflow ${workflow.id} for user ${internalUser.id} via API key`);
    logger.info(`idempotency_key: ${runIdempotencyKey}`);

    try {
      // Send an event to Inngest to trigger the workflow
      await inngest.send({
        name: workflow.eventName as any,
        user: internalUser,
        data: {
          user_id: internalUser.id as InternalUserId,
          input: input || workflow.input,
          scheduledRun: scheduledRun || false,
          workflowId: workflow.id,
          cronExpression: cronExpression || null,
          tz: timezone || workflow.timezone,
          metadata: metadata,
          idempotency_key: runIdempotencyKey
        },
      } satisfies WorkflowTriggerPayload & { name: keyof Events });

      // Generate a run ID for the response
      const runId = `run_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

      const response: WorkflowRunResponse = {
        success: true,
        data: {
          runId,
          workflowId: workflow.id,
          workflowName: workflow.eventName,
          status: 'pending',
          startedAt: new Date().toISOString(),
          input: input || (workflow.input as Record<string, any>) || undefined,
          metadata,
        },
        message: "Workflow triggered successfully",
      };

      return NextResponse.json(response);
    } catch (inngestError) {
      console.error('Error triggering workflow via Inngest:', inngestError);
      logger.error('Error triggering workflow via Inngest', { error: inngestError });

      const errorResponse: WorkflowRunResponse = {
        success: false,
        error: 'Failed to trigger workflow',
      };

      return NextResponse.json(errorResponse, { status: 500 });
    }
  } catch (error) {
    console.error('Error in workflow trigger API:', error);
    logger.error('Error in workflow trigger API', { error });

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check workflow status
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
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

    const { workflowId } = await params;

    // Get workflow details
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        available: true,
        lastRunAt: true,
        nextRunAt: true,
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

    return NextResponse.json({
      success: true,
      data: workflow,
    });
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
