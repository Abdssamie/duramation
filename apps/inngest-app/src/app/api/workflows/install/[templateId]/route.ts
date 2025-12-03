import { NextRequest, NextResponse } from "next/server";
import { isAuthError, authenticateUser } from "@/lib/utils/auth";
import { getWorkflowTemplate } from "@duramation/shared";
import prisma from "@/lib/prisma";
import { Prisma } from "@duramation/db";
import { InputJsonValue } from "@prisma/client/runtime/library";
import type { TemplateInstallationRequest, TemplateInstallationResponse } from "@duramation/shared";
import { z } from "zod";
import { CacheInvalidationService } from "@/services/cache-invalidation";


export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ templateId: string }> }
) {
    const authResult = await authenticateUser();

    if (isAuthError(authResult)) {
        return authResult;
    }

    const { userId } = authResult;

    const { templateId } = await params;

    if (!userId) {
        return NextResponse.json(
            { success: false, message: "User not found" },
            { status: 404 }
        );
    }

    try {
        const body = await req.json();
        
        // Validate request body against shared types
        const installRequestSchema = z.object({
            templateId: z.string(),
            workflowName: z.string().optional(),
            configuration: z.record(z.string(), z.any()).optional(),
            inputFields: z.array(z.object({
                key: z.string(),
                value: z.any(),
            })).optional(),
            isActive: z.boolean().optional(),
            // Legacy fields for backward compatibility
            name: z.string().optional(),
            update: z.boolean().optional(),
        }) satisfies z.ZodType<TemplateInstallationRequest & { name?: string; update?: boolean }>;

        const validationResult = installRequestSchema.safeParse({ ...body, templateId });
        if (!validationResult.success) {
            const errorResponse: TemplateInstallationResponse = {
                success: false,
                error: "Invalid request body",
                code: "VALIDATION_ERROR",
            };
            return NextResponse.json(errorResponse, { status: 400 });
        }

        const { workflowName, configuration, isActive, name, update } = validationResult.data;
        const finalName = workflowName || name;

        // Get the template definition
        const template = await getWorkflowTemplate(prisma, templateId);

        if (!template) {
            const errorResponse: TemplateInstallationResponse = {
                success: false,
                error: "Workflow template not found",
                code: "NOT_FOUND",
            };
            return NextResponse.json(errorResponse, { status: 404 });
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
                        name: finalName || template.name,
                        description: template.description,
                        canBeScheduled: template.canBeScheduled,
                        fields: template.fields as unknown as Prisma.InputJsonValue,
                        eventName: template.eventName,
                        requiredProviders: template.requiredProviders,
                        requiredScopes: template.requiredScopes as unknown as InputJsonValue,
                        version: template.version, // Update the version
                        available: isActive !== undefined ? isActive : true,
                        input: configuration || {},
                        config: {
                            ...existingWorkflow.config as object, // Keep existing config
                            version: template.version,
                            updatedAt: new Date().toISOString(),
                        }
                    },
                });

                // Invalidate cache after workflow update
                try {
                    const cacheService = new CacheInvalidationService();
                    await cacheService.invalidateDashboardMetricsCache(userId);
                    await cacheService.invalidateAutomationMetricsCache(userId, updatedWorkflow.id);
                } catch (cacheError) {
                    console.error("Failed to invalidate cache after workflow update:", cacheError);
                    // Don't fail the request if cache invalidation fails
                }

                const response: TemplateInstallationResponse = {
                    success: true,
                    data: {
                        workflowId: updatedWorkflow.id,
                        templateId: template.id,
                        installationStatus: 'completed',
                        requiredCredentials: template.requiredProviders?.map(provider => ({
                            provider,
                            scopes: [],
                            isConfigured: false,
                        })) || [],
                        configurationSteps: [],
                    },
                    message: `Workflow template '${template.name}' updated successfully to version ${template.version}`,
                };

                return NextResponse.json(response);
            } else {
                // Workflow is already installed and up-to-date or no update requested
                const errorResponse: TemplateInstallationResponse = {
                    success: false,
                    error: "This workflow template is already installed and up-to-date",
                    code: "CONFLICT",
                };
                return NextResponse.json(errorResponse, { status: 409 });
            }
        }

        // Install the workflow (create instance)
        const workflow = await prisma.workflow.create({
            data: {
                userId: userId as string,
                templateId: template.id,
                name: finalName || template.name,
                description: template.description,
                available: isActive !== undefined ? isActive : true,
                status: 'IDLE', // Not running by default
                canBeScheduled: template.canBeScheduled,
                timezone: "UTC",
                input: configuration || {},
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

        // Invalidate cache after workflow installation
        try {
            const cacheService = new CacheInvalidationService();
            await cacheService.invalidateDashboardMetricsCache(userId);
            await cacheService.invalidateAutomationMetricsCache(userId);
        } catch (cacheError) {
            console.error("Failed to invalidate cache after workflow installation:", cacheError);
            // Don't fail the request if cache invalidation fails
        }

        const response: TemplateInstallationResponse = {
            success: true,
            data: {
                workflowId: workflow.id,
                templateId: template.id,
                installationStatus: 'completed',
                requiredCredentials: template.requiredProviders?.map(provider => ({
                    provider,
                    scopes: [],
                    isConfigured: false,
                })) || [],
                configurationSteps: [],
            },
            message: `Workflow template '${template.name}' installed successfully`,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('Error installing workflow template:', error);

        const errorResponse: TemplateInstallationResponse = {
            success: false,
            error: 'Error installing workflow template',
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}
