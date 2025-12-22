import { auth } from "@clerk/nextjs/server";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import type {
  WorkflowDeleteResponse,
  WorkflowGetResponse,
  WorkflowUpdateRequest,
  WorkflowUpdateResponse,
} from "@duramation/shared";
import { validateWorkflowInput } from "@duramation/shared";
import { workflowUpdateRequestSchema } from "@duramation/shared/validation";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";
import { WorkflowWithCredentials } from "@/types/workflowWithCredentials";
import { CacheInvalidationService } from "@/services/cache-invalidation";

type ExtendedWorkflowUpdateRequest = WorkflowUpdateRequest & {
  available?: boolean;
  input?: Record<string, any>;
  credentials?: Array<{ credentialId: string }>;
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workflowId = id;

  const authResult = await authenticateUser();

  if (isAuthError(authResult)) {
    return authResult;
  }

  const { userId } = authResult;

  try {
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        version: true,
        name: true,
        fields: true,
        templateId: true,
        description: true,
        available: true,
        idempotencyKey: true,
        config: true,
        requiredScopes: true,
        input: true,
        status: true,
        requiredProviders: true,
        canBeScheduled: true,
        timezone: true,
        lastRunAt: true,
        cronExpressions: true,
        nextRunAt: true,
        eventName: true,
        createdAt: true,
        updatedAt: true,
        workflowCredentials: {
          select: {
            credential: {
              select: {
                id: true,
                name: true,
                type: true,
                config: true,
              },
            },
          },
        },
      },
    });

    if (!workflow) {
      const errorResponse: WorkflowGetResponse = {
        success: false,
        error: "Workflow not found",
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const response: WorkflowGetResponse = {
      success: true,
      data: workflow,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error getting workflow:", error);
    const errorResponse: WorkflowGetResponse = {
      success: false,
      error: "Error getting workflow",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await auth();
  const { id } = await params;
  const workflowId = id;

  if (!user || !user.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const internalUserId = await getInternalUserId(user.userId as ClerkUserId);
  if (!internalUserId) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const validationResult = workflowUpdateRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid request body",
          errors: validationResult.error.issues.map((e) => e.message),
        },
        { status: 400 },
      );
    }

    const {
      name,
      description,
      isActive,
      configuration,
      // Legacy fields
      available,
      input,
      credentials,
    } = validationResult.data as ExtendedWorkflowUpdateRequest;

    // Map new API fields to legacy database fields
    const finalAvailable = isActive !== undefined ? isActive : available;
    // Prioritize direct input parameter over configuration
    const finalInput = input !== undefined ? input : configuration;

    // Get existing workflow to validate ownership and input
    const existingWorkflow = await prisma.workflow.findUnique({
      where: {
        id: workflowId,
        userId: internalUserId,
      },
    });

    if (!existingWorkflow) {
      return NextResponse.json(
        { message: "Workflow not found" },
        { status: 404 },
      );
    }

    // Get workflow template to validate input if input is provided
    if (finalInput !== undefined) {
      const templateId = existingWorkflow.templateId;

      // Validate workflow input values against template
      const validation = await validateWorkflowInput(
        prisma,
        templateId,
        finalInput,
      );
      if (!validation.valid) {
        const errorResponse: WorkflowUpdateResponse = {
          success: false,
          error: "Invalid workflow input",
          code: "VALIDATION_ERROR",
        };
        return NextResponse.json(errorResponse, { status: 400 });
      }
    }

    const updatedWorkflow: WorkflowWithCredentials =
      await prisma.workflow.update({
        where: {
          id: workflowId,
          userId: internalUserId,
        },
        data: {
          ...(name !== undefined && { name }),
          ...(description !== undefined && { description }),
          ...(finalAvailable !== undefined && { available: finalAvailable }),
          ...(finalInput !== undefined && { input: finalInput }),
          ...(credentials && credentials.length > 0
            ? {
                workflowCredentials: {
                  deleteMany: {}, // remove old links
                  create: credentials.map((c) => ({
                    credential: { connect: { id: c.credentialId } },
                  })),
                },
              }
            : {}),
        },
        include: {
          workflowCredentials: {
            include: {
              credential: {
                select: {
                  id: true,
                  name: true,
                  type: true,
                  config: true,
                },
              },
            },
          },
        },
      });

    // Invalidate cache after workflow update
    try {
      const cacheService = new CacheInvalidationService();
      await cacheService.invalidateAutomationMetricsCache(internalUserId, workflowId);
      await cacheService.invalidateDashboardMetricsCache(internalUserId);
    } catch (cacheError) {
      console.error("Failed to invalidate cache after workflow update:", cacheError);
      // Don't fail the request if cache invalidation fails
    }

    const response: WorkflowUpdateResponse = {
      success: true,
      data: updatedWorkflow,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating workflow:", error);
    const errorResponse: WorkflowUpdateResponse = {
      success: false,
      error: "Error updating workflow",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await auth();
  const { id } = await params;
  const workflowId = id;

  if (!user || !user.userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const internalUserId = await getInternalUserId(user.userId as ClerkUserId);
  if (!internalUserId) {
    return new Response("User not found", { status: 404 });
  }

  try {
    await prisma.workflow.delete({
      where: {
        id: workflowId,
        userId: internalUserId,
      },
    });
    const response: WorkflowDeleteResponse = {
      success: true,
      data: { deleted: true },
      message: "Workflow deleted successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error deleting workflow:", error);
    const errorResponse: WorkflowDeleteResponse = {
      success: false,
      error: "Error deleting workflow",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
