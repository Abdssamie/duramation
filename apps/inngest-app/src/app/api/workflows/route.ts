import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import type { WorkflowListResponse } from "@duramation/shared";


export async function GET() {
    const authResult = await authenticateUser();

    if (isAuthError(authResult)) {
        return authResult;
    }

    const { userId: id } = authResult;

    try {
        const workflows = await prisma.workflow.findMany({
            where: {
                userId: id,
                available: true,
            },
            select: {
                id: true,
                name: true,
                templateId: true,
                version: true,
                description: true,
                available: true,
                status: true,
                fields: true,
                canBeScheduled: true,
                eventName: true,
                timezone: true,
                lastRunAt: true,
                nextRunAt: true,
                input: true,
                requiredProviders: true,
                requiredScopes: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                idempotencyKey: true,
                config: true,
                workflowCredentials: {
                    select: {
                        credential: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                                provider: true,
                                config: true,
                            }
                        }
                    }
                },
            }
        });

        // Transform the query result to match the expected Workflow type
        const userWorkflows = workflows.map(workflow => ({
            ...workflow,
            // Ensure all required fields are present
            idempotencyKey: workflow.idempotencyKey || null,
            config: workflow.config || {},
            // Keep the original workflowCredentials structure
            workflowCredentials: workflow.workflowCredentials,
            // Also provide legacy credentials field for backward compatibility
            credentials: workflow.workflowCredentials.map(wc => wc.credential),
        }));

        const response: WorkflowListResponse = {
            success: true,
            data: userWorkflows,
            message: `Found ${workflows.length} workflows`,
            pagination: {
                page: 1,
                limit: userWorkflows.length,
                total: userWorkflows.length,
                totalPages: 1,
                hasNext: false,
                hasPrev: false,
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error getting workflows:', error);
        const errorResponse = {
            success: false,
            error: 'Error getting workflows',
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}
