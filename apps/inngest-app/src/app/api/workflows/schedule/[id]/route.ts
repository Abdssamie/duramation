import { Events, inngest, isEventKey, WorkflowTriggerPayload, ScheduleStopPayload } from "@/inngest/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getInternalUser } from "@/lib/helpers/getInternalUser";
import { z } from "zod";
import { validateWorkflowInput, WorkflowInput, WorkflowInputFieldSchema } from "@duramation/shared";
import { ClerkUserId, InternalUserId } from "@/types/user";

// Schema for validating workflow execution requests
const WorkflowExecutionRequestSchema = z.object({
    input: WorkflowInputFieldSchema,
    scheduledRun: z.boolean().default(false),
    cronExpression: z.string().optional(),
    timezone: z.string().default("UTC"),
    metadata: z.record(z.string(), z.any()).optional(),
});


export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await auth();
    const { id } = await params;

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
        const validationResult = WorkflowExecutionRequestSchema.safeParse(requestBody);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    message: "Invalid request body",
                    errors: validationResult.error.issues.map(e => e.message)
                },
                { status: 400 }
            );
        }

        const { input, cronExpression, timezone, metadata } = validationResult.data;

        const workflow = await prisma.workflow.findUnique({
            where: {
                id: id,
                userId: internalUser.id,
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

        // Update workflow with validated input and enable it
        const updatedWorkflow = await prisma.workflow.update({
            where: {
                id: id,
                userId: internalUser.id,
            },
            data: {
                available: true,
                input: input ? (input as any) : workflow.input,
                cronExpressions: cronExpression ? [cronExpression] : workflow.cronExpressions,
                timezone: timezone || workflow.timezone,
            }
        });

        if (!updatedWorkflow.canBeScheduled) {
            return NextResponse.json(
                { message: "This workflow cannot be scheduled" },
                { status: 400 }
            );
        }

        if (updatedWorkflow.cronExpressions.length === 0) {
            return NextResponse.json(
                { message: "No cron expressions found. Please provide a cronExpression or ensure the workflow has a default schedule." },
                { status: 400 }
            );
        }

        if (updatedWorkflow.cronExpressions.length > 1) {
            return NextResponse.json(
                { message: "Multiple cron expressions are not supported yet" },
                { status: 400 }
            );
        }

        if (!isEventKey(updatedWorkflow.eventName)) {
            return NextResponse.json(
                { message: "Invalid workflow event name" },
                { status: 500 }
            );
        }

        const finalCronExpression = updatedWorkflow.cronExpressions[0];

        // Send an event to Inngest to trigger the workflow
        await inngest.send({
            name: updatedWorkflow.eventName as any, // This is safe because we checked it above
            user: internalUser,
            data: {
                user_id: internalUser.id as InternalUserId,
                input: updatedWorkflow.input as WorkflowInput,
                scheduledRun: true,
                workflowId: updatedWorkflow.id,
                cronExpression: finalCronExpression,
                tz: updatedWorkflow.timezone,
                metadata: metadata,
                // Use the client-sent (or server-generated) idempotency key per schedule
                idempotency_key: workflow.idempotencyKey
            },
        } satisfies WorkflowTriggerPayload & { name: keyof Events });


        return NextResponse.json(
            { message: "Workflow scheduled successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error scheduling workflow:", error);
        return NextResponse.json(
            { message: "Error scheduling workflow" },
            { status: 500 }
        );
    }
}



export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const user = await auth();
    console.log("context.params:", context.params);
    const { id } = await context.params;

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
                id: id,
                userId: internalUser.id,
            }
        });

        if (!workflow) {
            return NextResponse.json(
                { message: "Workflow not found" },
                { status: 404 }
            );
        }

        // Optional: Check status if needed before stopping

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
