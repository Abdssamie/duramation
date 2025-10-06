import { prisma } from '@duramation/db';
import type { BusinessOutcomeType, Workflow } from '@duramation/db/types';
import type { BusinessOutcomeRequest, BusinessImpactMetrics } from '@duramation/shared/types';

export class BusinessOutcomeService {
    /**
     * Create a new business outcome record
     */
    static async createBusinessOutcome(data: BusinessOutcomeRequest): Promise<{
        id: string;
        workflowId: string;
        outcomeType: BusinessOutcomeType;
        value: number;
        timestamp: Date;
        metadata: any;
        createdAt: Date;
        updatedAt: Date;
        workflow: {
            id: string;
            name: string;
            description: string | null;
        };
    }> {
        return await prisma.businessOutcome.create({
            data: {
                workflowId: data.workflowId,
                outcomeType: data.outcomeType,
                value: data.value,
                metadata: data.metadata || {},
            },
            include: {
                workflow: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            }
        }) as {
            id: string;
            workflowId: string;
            outcomeType: BusinessOutcomeType;
            value: number;
            timestamp: Date;
            metadata: any;
            createdAt: Date;
            updatedAt: Date;
            workflow: {
                id: string;
                name: string;
                description: string | null;
            };
        };
    }

    /**
     * Get business outcomes for a specific workflow
     */
    static async getWorkflowOutcomes(workflowId: string, limit?: number) {
        return await prisma.businessOutcome.findMany({
            where: { workflowId },
            orderBy: { timestamp: 'desc' },
            take: limit,
            include: {
                workflow: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            }
        }) as Array<{
            id: string;
            workflowId: string;
            outcomeType: BusinessOutcomeType;
            value: number;
            timestamp: Date;
            metadata: any;
            createdAt: Date;
            updatedAt: Date;
            workflow: {
                id: string;
                name: string;
                description: string | null;
            };
        }>;
    }

    /**
     * Get business outcomes for a user's workflows within a date range
     */
    static async getUserBusinessOutcomes(
        userId: string,
        startDate?: Date,
        endDate?: Date,
        outcomeTypes?: BusinessOutcomeType[]
    ) {
        const where: any = {
            workflow: {
                userId: userId
            }
        };

        if (startDate || endDate) {
            where.timestamp = {};
            if (startDate) where.timestamp.gte = startDate;
            if (endDate) where.timestamp.lte = endDate;
        }

        if (outcomeTypes && outcomeTypes.length > 0) {
            where.outcomeType = { in: outcomeTypes };
        }

        return await prisma.businessOutcome.findMany({
            where,
            orderBy: { timestamp: 'desc' },
            include: {
                workflow: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            }
        }) as Array<{
            id: string;
            workflowId: string;
            outcomeType: BusinessOutcomeType;
            value: number;
            timestamp: Date;
            metadata: any;
            createdAt: Date;
            updatedAt: Date;
            workflow: {
                id: string;
                name: string;
                description: string | null;
            };
        }>;
    }

    /**
     * Calculate business impact metrics for a user
     */
    static async calculateBusinessImpactMetrics(
        userId: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<BusinessImpactMetrics> {
        const outcomes = await this.getUserBusinessOutcomes(userId, startDate, endDate);

        // Calculate total outcomes
        const totalOutcomes = outcomes.length;

        // Group outcomes by type
        const outcomesByType: Record<string, number> = {};
        outcomes.forEach(outcome => {
            const type = outcome.outcomeType;
            outcomesByType[type] = (outcomesByType[type] || 0) + outcome.value;
        });

        // Calculate trends over time (group by month)
        const trendsMap = new Map<string, number>();
        outcomes.forEach(outcome => {
            const monthKey = outcome.timestamp.toISOString().substring(0, 7); // YYYY-MM
            trendsMap.set(monthKey, (trendsMap.get(monthKey) || 0) + outcome.value);
        });

        const trendsOverTime = Array.from(trendsMap.entries())
            .map(([period, value]) => ({ period, value }))
            .sort((a, b) => a.period.localeCompare(b.period));

        // Calculate outcome per automation
        const uniqueWorkflows = new Set(outcomes.map(o => o.workflowId));
        const outcomePerAutomation = uniqueWorkflows.size > 0
            ? totalOutcomes / uniqueWorkflows.size
            : 0;

        return {
            totalOutcomes,
            outcomesByType,
            trendsOverTime,
            outcomePerAutomation
        };
    }

    /**
     * Attribute business outcomes to workflow executions
     * This method links workflow runs to business outcomes based on timing and metadata
     */
    static async attributeOutcomeToWorkflowRun(
        workflowRunId: string,
        outcomeType: BusinessOutcomeType,
        value: number,
        metadata?: Record<string, any>
    ): Promise<{
        workflow: {
            id: string;
            name: string;
            description: string | null;
        };
        id: string;
        workflowId: string;
        outcomeType: BusinessOutcomeType;
        value: number;
        timestamp: Date;
        metadata: any;
        createdAt: Date;
        updatedAt: Date;
    }> {
        // Get the workflow run to find the workflow ID
        const workflowRun = await prisma.workflowRun.findUnique({
            where: { id: workflowRunId },
            select: { workflowId: true, completedAt: true }
        });

        if (!workflowRun) {
            throw new Error('Workflow run not found');
        }

        // Create business outcome with attribution metadata
        const attributionMetadata = {
            ...metadata,
            attributedToRun: workflowRunId,
            attributedAt: new Date().toISOString()
        };

        return await this.createBusinessOutcome({
            workflowId: workflowRun.workflowId,
            outcomeType,
            value,
            metadata: attributionMetadata
        });
    }

    /**
     * Get business outcomes with attribution to specific workflow runs
     */
    static async getAttributedOutcomes(workflowId: string) {
        return await prisma.businessOutcome.findMany({
            where: {
                workflowId,
                metadata: {
                    path: ['attributedToRun'],
                    not: undefined
                }
            },
            orderBy: { timestamp: 'desc' },
            include: {
                workflow: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            }
        }) as Array<{
            id: string;
            workflowId: string;
            outcomeType: BusinessOutcomeType;
            value: number;
            timestamp: Date;
            metadata: any;
            createdAt: Date;
            updatedAt: Date;
            workflow: {
                id: string;
                name: string;
                description: string | null;
            };
        }>;
    }

    /**
     * Update a business outcome
     */
    static async updateBusinessOutcome(
        outcomeId: string,
        data: Partial<BusinessOutcomeRequest>
    ) {
        return await prisma.businessOutcome.update({
            where: { id: outcomeId },
            data: {
                ...(data.outcomeType && { outcomeType: data.outcomeType }),
                ...(data.value !== undefined && { value: data.value }),
                ...(data.metadata && { metadata: data.metadata }),
            },
            include: {
                workflow: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            }
        }) as {
            id: string;
            workflowId: string;
            outcomeType: BusinessOutcomeType;
            value: number;
            timestamp: Date;
            metadata: any;
            createdAt: Date;
            updatedAt: Date;
            workflow: {
                id: string;
                name: string;
                description: string | null;
            };
        };
    }

    /**
     * Delete a business outcome
     */
    static async deleteBusinessOutcome(outcomeId: string) {
        return await prisma.businessOutcome.delete({
            where: { id: outcomeId }
        }) as {
            id: string;
            workflowId: string;
            outcomeType: BusinessOutcomeType;
            value: number;
            timestamp: Date;
            metadata: any;
            createdAt: Date;
            updatedAt: Date;
        };
    }

    /**
     * Get business outcome statistics for a workflow
     */
    static async getWorkflowOutcomeStats(workflowId: string, days: number = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const outcomes = await prisma.businessOutcome.findMany({
            where: {
                workflowId,
                timestamp: { gte: startDate }
            }
        });

        const totalValue = outcomes.reduce((sum, outcome) => sum + outcome.value, 0);
        const averageValue = outcomes.length > 0 ? totalValue / outcomes.length : 0;

        const outcomesByType = outcomes.reduce((acc, outcome) => {
            acc[outcome.outcomeType] = (acc[outcome.outcomeType] || 0) + outcome.value;
            return acc;
        }, {} as Record<string, number>);

        return {
            totalOutcomes: outcomes.length,
            totalValue,
            averageValue,
            outcomesByType,
            period: `${days} days`
        };
    }
}