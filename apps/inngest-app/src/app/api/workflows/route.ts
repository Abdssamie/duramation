import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";


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
                cronExpressions: true,
                timezone: true,
                lastRunAt: true,
                nextRunAt: true,
                input: true,
                requiredProviders: true,
                requiredScopes: true,
                createdAt: true,
                updatedAt: true,
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

        // Keep workflowCredentials structure for frontend compatibility
        const userWorkflows = workflows.map(workflow => ({
            ...workflow,
            // Keep the original workflowCredentials structure
            workflowCredentials: workflow.workflowCredentials,
            // Also provide legacy credentials field for backward compatibility
            credentials: workflow.workflowCredentials.map(wc => wc.credential),
        }));

        return NextResponse.json({
            success: true,
            data: userWorkflows,
            message: `Found ${workflows.length} workflows`,
        });
    } catch (error) {
        console.error('Error getting workflows:', error);
        return NextResponse.json(
            { success: false, message: 'Error getting workflows' },
            { status: 500 }
        );
    }
}
