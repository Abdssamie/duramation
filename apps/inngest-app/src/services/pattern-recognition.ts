import { prisma } from '@duramation/db';
import { OpportunityCategory, OpportunityStatus } from '@duramation/db/types';
import { WorkflowRun, Workflow } from '@duramation/db/types';

export interface WorkflowPattern {
    workflowId: string;
    workflowName: string;
    pattern: {
        frequency: number; // runs per day
        successRate: number;
        avgDuration: number;
        errorPatterns: string[];
        timePatterns: {
            hour: number;
            count: number;
        }[];
    };
    bottlenecks: {
        type: 'performance' | 'reliability' | 'frequency';
        severity: number; // 1-10
        description: string;
    }[];
    repetitiveProcesses: {
        type: 'data_entry' | 'communication' | 'reporting' | 'integration';
        confidence: number; // 0-1
        description: string;
    }[];
}

export interface OpportunityPattern {
    category: OpportunityCategory;
    title: string;
    description: string;
    impactScore: number;
    difficultyScore: number;
    requiredIntegrations: string[];
    confidence: number;
}

export class PatternRecognitionEngine {
    /**
     * Analyzes workflow execution patterns to identify automation opportunities
     */
    async analyzeWorkflowPatterns(userId: string, timeframeDays: number = 30): Promise<WorkflowPattern[]> {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - timeframeDays);

        // Get workflows with their recent runs
        const workflows = await prisma.workflow.findMany({
            where: {
                userId,
                available: true,
            },
            include: {
                workflowRuns: {
                    where: {
                        startedAt: {
                            gte: cutoffDate,
                        },
                    },
                    orderBy: {
                        startedAt: 'desc',
                    },
                },
            },
        });

        const patterns: WorkflowPattern[] = [];

        for (const workflow of workflows) {
            const pattern = await this.analyzeWorkflowPattern(workflow);
            if (pattern) {
                patterns.push(pattern);
            }
        }

        return patterns;
    }

    /**
     * Analyzes a single workflow's execution pattern
     */
    private async analyzeWorkflowPattern(workflow: Workflow & { workflowRuns: WorkflowRun[] }): Promise<WorkflowPattern | null> {
        const runs = workflow.workflowRuns;

        if (runs.length === 0) {
            return null;
        }

        // Calculate basic metrics
        const successfulRuns = runs.filter(run => run.status === 'COMPLETED');
        const failedRuns = runs.filter(run => run.status === 'FAILED');
        const successRate = runs.length > 0 ? successfulRuns.length / runs.length : 0;

        // Calculate average duration for completed runs
        const completedRuns = runs.filter(run => run.completedAt && run.startedAt);
        const avgDuration = completedRuns.length > 0
            ? completedRuns.reduce((sum, run) => {
                const duration = new Date(run.completedAt!).getTime() - new Date(run.startedAt).getTime();
                return sum + duration;
            }, 0) / completedRuns.length
            : 0;

        // Analyze time patterns
        const timePatterns = this.analyzeTimePatterns(runs);

        // Identify error patterns
        const errorPatterns = this.identifyErrorPatterns(failedRuns);

        // Identify bottlenecks
        const bottlenecks = this.identifyBottlenecks(workflow, runs, successRate, avgDuration);

        // Identify repetitive processes
        const repetitiveProcesses = this.identifyRepetitiveProcesses(workflow, runs);

        // Calculate frequency (runs per day)
        const lastRun = runs[runs.length - 1];
        const daysSinceFirstRun = runs.length > 0 && lastRun
            ? Math.max(1, Math.ceil((Date.now() - new Date(lastRun.startedAt).getTime()) / (1000 * 60 * 60 * 24)))
            : 1;
        const frequency = runs.length / daysSinceFirstRun;

        return {
            workflowId: workflow.id,
            workflowName: workflow.name,
            pattern: {
                frequency,
                successRate,
                avgDuration,
                errorPatterns,
                timePatterns,
            },
            bottlenecks,
            repetitiveProcesses,
        };
    }

    /**
     * Analyzes time patterns in workflow executions
     */
    private analyzeTimePatterns(runs: WorkflowRun[]): { hour: number; count: number }[] {
        const hourCounts: Record<number, number> = {};

        runs.forEach(run => {
            const hour = new Date(run.startedAt).getHours();
            hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        });

        return Object.entries(hourCounts)
            .map(([hour, count]) => ({ hour: parseInt(hour), count }))
            .sort((a, b) => b.count - a.count);
    }

    /**
     * Identifies common error patterns from failed runs
     */
    private identifyErrorPatterns(failedRuns: WorkflowRun[]): string[] {
        const errorMessages = failedRuns
            .map(run => run.error)
            .filter(Boolean) as string[];

        // Group similar errors (simplified pattern matching)
        const errorGroups: Record<string, number> = {};

        errorMessages.forEach(error => {
            // Extract key error patterns
            const patterns = [
                /timeout/i,
                /rate limit/i,
                /authentication/i,
                /network/i,
                /permission/i,
                /not found/i,
                /invalid/i,
            ];

            let categorized = false;
            for (const pattern of patterns) {
                if (pattern.test(error)) {
                    const category = pattern.source.replace(/[^a-zA-Z]/g, '');
                    errorGroups[category] = (errorGroups[category] || 0) + 1;
                    categorized = true;
                    break;
                }
            }

            if (!categorized) {
                errorGroups['other'] = (errorGroups['other'] || 0) + 1;
            }
        });

        // Return top error patterns
        return Object.entries(errorGroups)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([pattern]) => pattern);
    }

    /**
     * Identifies bottlenecks in workflow execution
     */
    private identifyBottlenecks(
        workflow: Workflow,
        runs: WorkflowRun[],
        successRate: number,
        avgDuration: number
    ): WorkflowPattern['bottlenecks'] {
        const bottlenecks: WorkflowPattern['bottlenecks'] = [];

        // Performance bottleneck - slow execution
        if (avgDuration > 300000) { // 5 minutes
            bottlenecks.push({
                type: 'performance',
                severity: Math.min(10, Math.floor(avgDuration / 60000)), // severity based on minutes
                description: `Workflow takes an average of ${Math.round(avgDuration / 60000)} minutes to complete`,
            });
        }

        // Reliability bottleneck - high failure rate
        if (successRate < 0.8 && runs.length > 5) {
            bottlenecks.push({
                type: 'reliability',
                severity: Math.floor((1 - successRate) * 10),
                description: `Workflow has a ${Math.round((1 - successRate) * 100)}% failure rate`,
            });
        }

        // Frequency bottleneck - manual triggering patterns
        const manualRuns = runs.filter(run => !workflow.cronExpressions.length);
        if (manualRuns.length > runs.length * 0.8 && runs.length > 10) {
            bottlenecks.push({
                type: 'frequency',
                severity: 6,
                description: 'Workflow is frequently triggered manually, suggesting it could benefit from automation',
            });
        }

        return bottlenecks;
    }

    /**
     * Identifies repetitive processes that could be automated
     */
    private identifyRepetitiveProcesses(
        workflow: Workflow,
        runs: WorkflowRun[]
    ): WorkflowPattern['repetitiveProcesses'] {
        const processes: WorkflowPattern['repetitiveProcesses'] = [];

        // Analyze workflow name and description for patterns
        const workflowText = `${workflow.name} ${workflow.description || ''}`.toLowerCase();

        // Data entry patterns
        if (/data|entry|input|form|update|create|add/.test(workflowText)) {
            processes.push({
                type: 'data_entry',
                confidence: 0.7,
                description: 'Workflow appears to involve data entry operations that could be streamlined',
            });
        }

        // Communication patterns
        if (/email|message|notify|alert|send|communication/.test(workflowText)) {
            processes.push({
                type: 'communication',
                confidence: 0.8,
                description: 'Workflow involves communication tasks that could be automated further',
            });
        }

        // Reporting patterns
        if (/report|summary|dashboard|analytics|metrics/.test(workflowText)) {
            processes.push({
                type: 'reporting',
                confidence: 0.9,
                description: 'Workflow generates reports that could be automated and scheduled',
            });
        }

        // Integration patterns - check required providers
        if (workflow.requiredProviders && workflow.requiredProviders.length > 1) {
            processes.push({
                type: 'integration',
                confidence: 0.6,
                description: 'Workflow integrates multiple services and could benefit from enhanced automation',
            });
        }

        return processes;
    }

    /**
     * Detects specific automation opportunities based on patterns
     */
    async detectOpportunities(userId: string): Promise<OpportunityPattern[]> {
        const patterns = await this.analyzeWorkflowPatterns(userId);
        const opportunities: OpportunityPattern[] = [];

        for (const pattern of patterns) {
            // Generate opportunities based on bottlenecks
            for (const bottleneck of pattern.bottlenecks) {
                const opportunity = this.generateOpportunityFromBottleneck(pattern, bottleneck);
                if (opportunity) {
                    opportunities.push(opportunity);
                }
            }

            // Generate opportunities based on repetitive processes
            for (const process of pattern.repetitiveProcesses) {
                const opportunity = this.generateOpportunityFromProcess(pattern, process);
                if (opportunity) {
                    opportunities.push(opportunity);
                }
            }

            // Generate opportunities based on usage patterns
            const usageOpportunity = this.generateOpportunityFromUsage(pattern);
            if (usageOpportunity) {
                opportunities.push(usageOpportunity);
            }
        }

        return opportunities;
    }

    /**
     * Generates opportunity from identified bottleneck
     */
    private generateOpportunityFromBottleneck(
        pattern: WorkflowPattern,
        bottleneck: WorkflowPattern['bottlenecks'][0]
    ): OpportunityPattern | null {
        switch (bottleneck.type) {
            case 'performance':
                return {
                    category: 'INTEGRATION' as OpportunityCategory,
                    title: `Optimize ${pattern.workflowName} Performance`,
                    description: `Improve workflow execution speed by optimizing integrations and reducing processing time`,
                    impactScore: Math.min(10, bottleneck.severity),
                    difficultyScore: 4,
                    requiredIntegrations: [],
                    confidence: 0.8,
                };

            case 'reliability':
                return {
                    category: 'INTEGRATION' as OpportunityCategory,
                    title: `Improve ${pattern.workflowName} Reliability`,
                    description: `Add error handling, retries, and monitoring to reduce failure rate`,
                    impactScore: Math.min(10, bottleneck.severity),
                    difficultyScore: 3,
                    requiredIntegrations: [],
                    confidence: 0.9,
                };

            case 'frequency':
                return {
                    category: 'REPORTING' as OpportunityCategory,
                    title: `Automate ${pattern.workflowName} Scheduling`,
                    description: `Set up automatic scheduling to reduce manual triggering`,
                    impactScore: 6,
                    difficultyScore: 2,
                    requiredIntegrations: [],
                    confidence: 0.7,
                };

            default:
                return null;
        }
    }

    /**
     * Generates opportunity from repetitive process
     */
    private generateOpportunityFromProcess(
        pattern: WorkflowPattern,
        process: WorkflowPattern['repetitiveProcesses'][0]
    ): OpportunityPattern | null {
        const baseImpact = Math.floor(process.confidence * 8);

        switch (process.type) {
            case 'data_entry':
                return {
                    category: 'DATA_ENTRY' as OpportunityCategory,
                    title: `Streamline Data Entry in ${pattern.workflowName}`,
                    description: `Automate data collection and entry processes to reduce manual work`,
                    impactScore: baseImpact,
                    difficultyScore: 3,
                    requiredIntegrations: ['forms', 'database'],
                    confidence: process.confidence,
                };

            case 'communication':
                return {
                    category: 'COMMUNICATION' as OpportunityCategory,
                    title: `Enhance Communication Automation in ${pattern.workflowName}`,
                    description: `Improve automated messaging and notification systems`,
                    impactScore: baseImpact,
                    difficultyScore: 2,
                    requiredIntegrations: ['email', 'slack'],
                    confidence: process.confidence,
                };

            case 'reporting':
                return {
                    category: 'REPORTING' as OpportunityCategory,
                    title: `Advanced Reporting for ${pattern.workflowName}`,
                    description: `Create automated dashboards and scheduled reports`,
                    impactScore: baseImpact,
                    difficultyScore: 4,
                    requiredIntegrations: ['analytics', 'dashboard'],
                    confidence: process.confidence,
                };

            case 'integration':
                return {
                    category: 'INTEGRATION' as OpportunityCategory,
                    title: `Expand Integration Capabilities for ${pattern.workflowName}`,
                    description: `Add more service integrations to reduce manual data transfer`,
                    impactScore: baseImpact,
                    difficultyScore: 5,
                    requiredIntegrations: ['api', 'webhooks'],
                    confidence: process.confidence,
                };

            default:
                return null;
        }
    }

    /**
     * Generates opportunity based on usage patterns
     */
    private generateOpportunityFromUsage(pattern: WorkflowPattern): OpportunityPattern | null {
        // High-frequency workflows could benefit from optimization
        if (pattern.pattern.frequency > 5) { // More than 5 runs per day
            return {
                category: 'INTEGRATION' as OpportunityCategory,
                title: `Scale ${pattern.workflowName} for High Volume`,
                description: `Optimize workflow for high-frequency usage with better performance and monitoring`,
                impactScore: 7,
                difficultyScore: 6,
                requiredIntegrations: ['monitoring', 'caching'],
                confidence: 0.6,
            };
        }

        // Workflows with specific time patterns could be better scheduled
        const topTimePattern = pattern.pattern.timePatterns[0];
        if (topTimePattern && topTimePattern.count > pattern.pattern.timePatterns.length * 0.5) {
            return {
                category: 'REPORTING' as OpportunityCategory,
                title: `Optimize Scheduling for ${pattern.workflowName}`,
                description: `Set up intelligent scheduling based on usage patterns`,
                impactScore: 5,
                difficultyScore: 2,
                requiredIntegrations: ['scheduler'],
                confidence: 0.7,
            };
        }

        return null;
    }
}

export const patternRecognitionEngine = new PatternRecognitionEngine();