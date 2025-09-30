import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getInternalUser } from "@/lib/helpers/getInternalUser";

import logger from "@/services/logging";

import { validateWorkflowInput } from "@duramation/shared";
import { isEventKey, Events, inngest, WorkflowTriggerPayload, ScheduleStopPayload } from "@/inngest/client";
import { z } from "zod";
import { ClerkUserId, InternalUserId } from "@/types/user";

// Schema for validating workflow run requests
const WorkflowRunRequestSchema = z.object({
    input: z.record(z.string(), z.any()),
    metadata: z.record(z.string(), z.any()).optional(),
});


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
                { message: "Invalid JSON in request body" },
                { status: 400 }
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

        const { input, metadata } = validationResult.data;

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

        if (!isEventKey(workflow.eventName)) {
            return NextResponse.json(
                { message: "Invalid workflow event name" },
                { status: 500 }
            );
        }

        logger.info(`Running workflow ${workflow.id} for user ${internalUser.id}`);
        logger.info(`idempotency_key: ${workflow.idempotencyKey}`);

        // Send an event to Inngest to trigger the workflow
        await inngest.send({
            name: workflow.eventName as any,  // This is safe because we checked it above
            user: internalUser,
            data: {
                user_id: internalUser.id as InternalUserId,
                input: input || workflow.input,
                scheduledRun: false,
                workflowId: workflow.id,
                cronExpression: null,
                tz: workflow.timezone,
                metadata: metadata,
                // Use the client-sent (or server-generated) idempotency key per run
                idempotency_key: workflow.idempotencyKey as string
            },
        } satisfies WorkflowTriggerPayload & { name: keyof Events });

        return NextResponse.json(
            { message: "Workflow run successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error running workflow:", error);
        return NextResponse.json(
            { message: "Error running workflow" },
            { status: 500 }
        );
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

