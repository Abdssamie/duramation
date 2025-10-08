import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import type { WorkflowHistoryResponse, WorkflowRunData } from "@duramation/shared";

export async function GET(request: NextRequest) {
    const authResult = await authenticateUser();

    if (isAuthError(authResult)) {
        return authResult;
    }

    const { userId } = authResult;
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const workflowId = searchParams.get('workflowId');
    const status = searchParams.get('status') as 'started' | 'running' | 'completed' | 'failed' | 'cancelled' | null;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'startedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    try {
        // Build where clause
        const where: any = {
            userId,
        };

        if (workflowId) {
            where.workflowId = workflowId;
        }

        if (status) {
            where.status = status.toUpperCase();
        }

        if (startDate || endDate) {
            where.startedAt = {};
            if (startDate) {
                where.startedAt.gte = new Date(startDate);
            }
            if (endDate) {
                where.startedAt.lte = new Date(endDate);
            }
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const total = await prisma.workflowRun.count({ where });

        // Fetch workflow runs with related data
        const workflowRuns = await prisma.workflowRun.findMany({
            where,
            include: {
                workflow: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        templateId: true,
                    }
                }
            },
            orderBy: {
                [sortBy]: sortOrder as 'asc' | 'desc',
            },
            skip,
            take: limit,
        });

        // Transform to API format
        const transformedRuns: WorkflowRunData[] = workflowRuns.map(run => ({
            runId: run.id,
            workflowId: run.workflowId,
            workflowName: run.workflow.name,
            status: run.status.toLowerCase() as 'pending' | 'running' | 'completed' | 'failed' | 'cancelled',
            startedAt: run.startedAt.toISOString(),
            completedAt: run.completedAt?.toISOString(),
            input: run.input as Record<string, any> || undefined,
            output: run.output as Record<string, any> || undefined,
            error: run.error || undefined,
            metadata: {
                workflowDescription: run.workflow.description,
                templateId: run.workflow.templateId,
                version: run.version,
                inngestRunId: run.inngestRunId,
                idempotencyKey: run.idempotencyKey,
            },
        }));

        // Calculate pagination info
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        const response: WorkflowHistoryResponse = {
            success: true,
            data: transformedRuns,
            message: `Found ${transformedRuns.length} workflow runs`,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext,
                hasPrev,
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error getting workflow history:', error);
        const errorResponse = {
            success: false,
            error: 'Error getting workflow history',
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}