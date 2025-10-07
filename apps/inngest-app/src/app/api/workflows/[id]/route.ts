import { auth } from "@clerk/nextjs/server";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateWorkflowInput } from "@duramation/shared";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";
import { Prisma } from "@duramation/db";

type WorkflowWithCredentials = Prisma.WorkflowGetPayload<{
    include: {
        workflowCredentials: {
            include: {
                credential: {
                    select: {
                        id: true;
                        name: true;
                        type: true;
                        config: true;
                    };
                };
            };
        };
    };
}>;

// Schema for validating workflow update requests
// Note: Only input values, name, description, available, and credentials can be updated
// Input field definitions are fixed by the template and should not be updatable
const WorkflowUpdateRequestSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().optional(),
    available: z.boolean().optional(),
    input: z.record(z.string(), z.any()).optional(), // Input values keyed by field key
    credentials: z.array(z.object({
        credentialId: z.string()
    })).optional(),
});


export async function GET({ params }: { params: Promise<{ id: string }> }) {
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
                name: true,
                description: true,
                available: true,
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
                                config: true
                            },
                        },
                    },
                },
            },
        });

        if (!workflow) {
            return new Response('Workflow not found', { status: 404 });
        }

        return new Response(JSON.stringify(workflow), { status: 200 });
    } catch (error) {
        console.error('Error getting workflow:', error);
        return new Response('Error getting workflow', { status: 500 });
    }
}



export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const user = await auth();
    const { id } = await params;
    const workflowId = id;

    if (!user || !user.userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);
    if (!internalUserId) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    try {
        // Parse and validate request body
        const body = await req.json();
        const validationResult = WorkflowUpdateRequestSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    message: "Invalid request body",
                    errors: validationResult.error.issues.map(e => e.message)
                },
                { status: 400 }
            );
        }

        const { name, description, available, input, credentials } = validationResult.data;

        // Get existing workflow to validate ownership and input
        const existingWorkflow = await prisma.workflow.findUnique({
            where: {
                id: workflowId,
                userId: internalUserId,
            }
        });

        if (!existingWorkflow) {
            return NextResponse.json(
                { message: "Workflow not found" },
                { status: 404 }
            );
        }

        // Get workflow template to validate input if input is provided
        if (input !== undefined) {
            const templateId = existingWorkflow.templateId;

            // Validate workflow input values against template
            const validation = await validateWorkflowInput(prisma, templateId, input);
            if (!validation.valid) {
                return NextResponse.json(
                    { error: 'Invalid workflow input', details: validation.errors },
                    { status: 400 }
                );
            }
        }

        const updatedWorkflow: WorkflowWithCredentials = await prisma.workflow.update({
            where: {
                id: workflowId,
                userId: internalUserId,
            },
            data: {
                ...(name !== undefined && { name }),
                ...(description !== undefined && { description }),
                ...(available !== undefined && { available }),
                ...(input !== undefined && { input }),
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

        return NextResponse.json(updatedWorkflow, { status: 200 });
    } catch (error) {
        console.error('Error updating workflow:', error);
        return NextResponse.json(
            { message: 'Error updating workflow' },
            { status: 500 }
        );
    }
}



export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const user = await auth();
    const { id } = await params;
    const workflowId = id;

    if (!user || !user.userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);
    if (!internalUserId) {
        return new Response('User not found', { status: 404 });
    }

    try {
        await prisma.workflow.delete({
            where: {
                id: workflowId,
                userId: internalUserId,
            },
        });
        return new Response('Workflow deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error deleting workflow:', error);
        return new Response('Error deleting workflow', { status: 500 });
    }
}
