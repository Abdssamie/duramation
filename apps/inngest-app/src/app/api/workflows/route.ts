import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";


export async function GET() {
    const user = await auth();

    if (!user || !user.userId) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }
    
    const id = await getInternalUserId(user.userId as ClerkUserId);

    if (!id) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error: User not found. This error comes from us. We'll fix it asap." },
            { status: 505 }
        );
    }

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
