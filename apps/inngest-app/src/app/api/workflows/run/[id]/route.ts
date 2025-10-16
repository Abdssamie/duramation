import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getInternalUser } from "@/lib/helpers/getInternalUser";

import logger from "@/services/logging";

import { validateWorkflowInput } from "@duramation/shared";
import { Events, inngest, WorkflowTriggerPayload, ScheduleStopPayload } from "@/inngest/client";
import { z } from "zod";
import { ClerkUserId, InternalUserId } from "@/types/user";
import type { WorkflowRunRequest, WorkflowRunResponse } from "@duramation/shared";
import { v4 as uuidv4 } from "uuid";

// Schema for validating workflow run requests
const WorkflowRunRequestSchema = z.object({
    input: z.record(z.string(), z.any()).optional(),
    scheduledRun: z.boolean().optional(),
    cronExpression: z.string().optional(),
    timezone: z.string().optional(),
    metadata: z.record(z.string(), z.any()).optional(),
}) satisfies z.ZodType<WorkflowRunRequest>;


export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await auth();
    const { id } = await params;
    const workflowId = id;

    if (!user || !user.userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const internalUser = await getInternalUser(user.userId as ClerkUserId);

    if (!internalUser) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    try {
        // Parse and validate request body
        let requestBody = {};
        try {
            const body = await req.text();
            if (body) {
                requestBody = JSON.parse(body);
            }
        } catch (parseError) {
            return NextResponse.json(
              { message: `Invalid JSON in request body: ${parseError}` },
              { status: 400 },
            );
        }

        // Validate request body structure
        const validationResult = WorkflowRunRequestSchema.safeParse(requestBody);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    message: "Invalid request body",
                    errors: validationResult.error.issues.map(e => e.message)
                },
                { status: 400 }
            );
        }

        const { input, scheduledRun, cronExpression, timezone, metadata } = validationResult.data;

        const workflow = await prisma.workflow.findUnique({
            where: {
                id: workflowId,
                userId: internalUser.id,
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
                { message: "Workflow not found" },
                { status: 404 }
            );
        }

        // Get workflow template to validate input
        const templateId = workflow.templateId;

        // Get workflow template to validate input if input is provided
        if (input !== undefined) {

            // Validate workflow input values against template
            const validation = await validateWorkflowInput(prisma, templateId, input);
            if (!validation.valid) {
                return NextResponse.json(
                    { error: 'Invalid workflow input', details: validation.errors },
                    { status: 400 }
                );
            }
        }

        // Generate a fresh idempotency key for each manual run
        const runIdempotencyKey = uuidv4();
        
        logger.info(`Running workflow ${workflow.id} for user ${internalUser.id}`);
        logger.info(`idempotency_key: ${runIdempotencyKey}`);

        // Send an event to Inngest to trigger the workflow
        await inngest.send({
            name: workflow.eventName as any,  // This is safe because we checked it above
            user: internalUser,
            data: {
                user_id: internalUser.id as InternalUserId,
                input: input || workflow.input,
                scheduledRun: scheduledRun || false,
                workflowId: workflow.id,
                cronExpression: cronExpression || null,
                tz: timezone || workflow.timezone,
                metadata: metadata,
                // Use a fresh idempotency key for each manual run
                idempotency_key: runIdempotencyKey
            },
        } satisfies WorkflowTriggerPayload & { name: keyof Events });

        // Generate a run ID for the response (in a real implementation, this would come from Inngest)
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
            message: "Workflow run successfully",
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error running workflow:", error);
        const errorResponse: WorkflowRunResponse = {
            success: false,
            error: "Error running workflow",
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}


export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const workflowId = id;

    const user = await auth();
    if (!user || !user.userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const internalUser = await getInternalUser(user.userId as ClerkUserId);
    if (!internalUser) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    try {
        const workflow = await prisma.workflow.findUnique({
            where: {
                id: workflowId,
                userId: internalUser.id,
            }
        });

        if (!workflow) {
            return NextResponse.json(
                { message: "Workflow not found" },
                { status: 404 }
            );
        }

        if (!workflow.available) {
            return NextResponse.json(
                { message: "Workflow is not available" },
                { status: 400 }
            );
        }

        // If a status gate is required here, we can prevent stopping when already terminal
        const terminalStates = ["COMPLETED", "FAILED", "CANCELLED", "IDLE"];
        if (terminalStates.includes(workflow.status)) {
            return NextResponse.json(
                { message: `Workflow cannot be stopped. Current status: ${workflow.status}` },
                { status: 400 }
            );
        }

        // Send an event to Inngest to stop the workflow
        await inngest.send({
            name: "workflow/stop",
            data: {
                user_id: internalUser.id as InternalUserId,
                workflowId: workflow.id,
            },
        } satisfies ScheduleStopPayload & { name: keyof Events });

        return NextResponse.json(
            { message: "Workflow stopped" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error stopping workflow:", error);
        return NextResponse.json(
            { message: "Error stopping workflow" },
            { status: 500 }
        );
    }
}

