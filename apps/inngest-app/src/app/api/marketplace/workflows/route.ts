import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import { withErrorHandler, AppError } from "@/lib/utils/error-handler";
import { validateQueryParams, CommonSchemas } from "@/lib/utils/validation";
import { queryWorkflowTemplates } from "@duramation/shared";
import prisma from "@/lib/prisma";
import { z } from "zod";


export async function GET(req: NextRequest) {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;

    try {
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const url = new URL(req.url);

        // Parse query parameters
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 50);


        // Filter templates based on query parameters
        const filteredTemplates = await queryWorkflowTemplates(prisma, userId);

        // Check which templates user has already installed
        const userWorkflows = await prisma.workflow.findMany({
            where: { userId },
            select: { templateId: true, version: true } // Select version as well
        });

        const installedWorkflowsMap = new Map(userWorkflows.map(w => [w.templateId, w.version]));

        // Apply pagination
        const totalTemplates = filteredTemplates.length;
        const totalPages = Math.ceil(totalTemplates / limit);
        const skip = (page - 1) * limit;
        const paginatedTemplates = filteredTemplates.slice(skip, skip + limit);

        // Enrich with installation status and version information
        const enrichedTemplates = paginatedTemplates.map(template => {
            const isInstalled = installedWorkflowsMap.has(template.id);
            const installedVersion = isInstalled ? installedWorkflowsMap.get(template.id) : undefined;
            const hasNewVersion = isInstalled && installedVersion !== template.version;

            return {
                ...template,
                isInstalled: isInstalled,
                canInstall: !isInstalled,
                hasNewVersion: hasNewVersion,
                installedVersion: installedVersion,
            };
        });

        return NextResponse.json({
            success: true,
            data: {
                items: enrichedTemplates,
                pagination: {
                    page,
                    limit,
                    total: totalTemplates,
                    totalPages,
                    hasNext: page < totalPages,
                    hasPrev: page > 1,
                },
            },
            message: `Found ${totalTemplates} workflow templates`,
        });
    } catch (error) {
        console.error("Error getting workflow templates:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
