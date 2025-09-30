import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getWorkflowTemplate, WorkflowTemplate } from "@duramation/shared";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import prisma from "@/lib/prisma";
import { ClerkUserId } from "@/types/user";
import { Prisma } from "@duramation/db";
import { InputJsonValue } from "@prisma/client/runtime/library";


export async function POST(
    req: NextRequest,
    {params}: { params: Promise<{ templateId: string }> }
) {
    const user = await auth();

    const { templateId } = await params;

    if (!user || !user.userId) {
        return NextResponse.json(
            {success: false, message: "Unauthorized"},
            {status: 401}
        );
    }

    const userId = await getInternalUserId(user.userId as ClerkUserId);

    if (!userId) {
        return NextResponse.json(
            {success: false, message: "User not found"},
            {status: 404}
        );
    }

    try {
        const body = await req.json();
        const { name, update } = body; // Added 'update' flag

        // Get the template definition
        const template = await getWorkflowTemplate(prisma, templateId);

        if (!template) {
            return NextResponse.json(
                {success: false, message: "Workflow template not found"},
                {status: 404}
            );
        }

        // Check if user already has this template installed
        const existingWorkflow = await prisma.workflow.findFirst({
            where: {
                userId: userId,
                templateId: templateId
            },
        });

        if (existingWorkflow) {
            // If update flag is true and a new version is available, update the workflow
            if (update && existingWorkflow.version !== template.version) {
                const updatedWorkflow = await prisma.workflow.update({
                    where: { id: existingWorkflow.id },
                    data: {
                        name: name || template.name,
                        description: template.description,
                        canBeScheduled: template.canBeScheduled,
                        fields: template.fields as unknown as Prisma.InputJsonValue,
                        eventName: template.eventName,
                        requiredProviders: template.requiredProviders,
                        requiredScopes: template.requiredScopes as unknown as InputJsonValue,
                        version: template.version, // Update the version
                        config: {
                            ...existingWorkflow.config as object, // Keep existing config
                            version: template.version,
                            updatedAt: new Date().toISOString(),
                        }
                    },
                });

                const response = {
                    ...updatedWorkflow,
                    template: template,
                };

                return NextResponse.json(
                    {
                        success: true,
                        data: response,
                        message: `Workflow template '${template.name}' updated successfully to version ${template.version}`,
                    },
                    {status: 200}
                );
            } else {
                // Workflow is already installed and up-to-date or no update requested
                return NextResponse.json(
                    {
                        success: false,
                        message: "This workflow template is already installed and up-to-date",
                        data: {existingWorkflowId: existingWorkflow.id}
                    },
                    {status: 409}
                );
            }
        }

        // Install the workflow (create instance)
        const workflow = await prisma.workflow.create({
            data: {
                userId: userId as string,
                templateId: template.id,
                name: name || template.name,
                description: template.description,
                available: true, // User can use this workflow
                status: 'IDLE', // Not running by default
                canBeScheduled: template.canBeScheduled,
                cronExpressions: [],
                timezone: "UTC",
                input: {},
                fields: template.fields as unknown as Prisma.InputJsonValue,
                eventName: template.eventName,
                requiredProviders: template.requiredProviders,
                requiredScopes: template.requiredScopes as unknown as InputJsonValue,
                version: template.version, // Set initial version
                config: {
                    templateId: templateId,
                    version: template.version,
                    installedAt: new Date().toISOString(),
                }
            },
        });

        const response = {
            ...workflow,
            template: template,
        };

        return NextResponse.json(
            {
                success: true,
                data: response,
                message: `Workflow template '${template.name}' installed successfully`,
            },
            {status: 201}
        );
    } catch (error) {
        console.error('Error installing workflow template:', error);

        return NextResponse.json(
            {success: false, message: 'Error installing workflow template'},
            {status: 500}
        );
    }
}
