import { prisma } from '@duramation/db';
import type { BusinessOutcomeType } from '@duramation/db/types';
import { BusinessOutcomeService } from './business-outcomes';

export interface AttributionRule {
  workflowId: string;
  outcomeType: BusinessOutcomeType;
  attributionMethod: 'direct' | 'time_based' | 'metadata_match';
  timeWindowMinutes?: number;
  metadataKeys?: string[];
  weight?: number; // For partial attribution
}

export class OutcomeAttributionService {
  /**
   * Set up attribution rules for a workflow
   */
  static async createAttributionRule(rule: AttributionRule) {
    // Store attribution rules in workflow metadata
    const workflow = await prisma.workflow.findUnique({
      where: { id: rule.workflowId }
    });

    if (!workflow) {
      throw new Error('Workflow not found');
    }

    const currentConfig = workflow.config as any || {};
    const attributionRules = currentConfig.attributionRules || [];
    
    attributionRules.push(rule);

    await prisma.workflow.update({
      where: { id: rule.workflowId },
      data: {
        config: {
          ...currentConfig,
          attributionRules
        }
      }
    });

    return rule;
  }

  /**
   * Automatically attribute business outcomes to workflow runs based on timing and context
   */
  static async attributeOutcomesToWorkflowRuns(
    workflowId: string,
    timeWindowHours: number = 24
  ) {
    // Get recent workflow runs
    const recentRuns = await prisma.workflowRun.findMany({
      where: {
        workflowId,
        status: 'COMPLETED',
        completedAt: {
          gte: new Date(Date.now() - timeWindowHours * 60 * 60 * 1000)
        }
      },
      orderBy: { completedAt: 'desc' }
    });

    // Get unattributed business outcomes for this workflow
    const unattributedOutcomes = await prisma.businessOutcome.findMany({
      where: {
        workflowId,
        metadata: {
          path: ['attributedToRun'],
          equals: null
        },
        timestamp: {
          gte: new Date(Date.now() - timeWindowHours * 60 * 60 * 1000)
        }
      },
      orderBy: { timestamp: 'asc' }
    });

    const attributions = [];

    // Attribute outcomes to runs based on timing
    for (const outcome of unattributedOutcomes) {
      const matchingRun = this.findBestMatchingRun(outcome, recentRuns);
      
      if (matchingRun) {
        // Update the outcome with attribution
        const updatedOutcome = await prisma.businessOutcome.update({
          where: { id: outcome.id },
          data: {
            metadata: {
              ...outcome.metadata as any,
              attributedToRun: matchingRun.id,
              attributedAt: new Date().toISOString(),
              attributionMethod: 'time_based',
              attributionConfidence: this.calculateAttributionConfidence(outcome, matchingRun)
            }
          }
        });

        attributions.push({
          outcomeId: outcome.id,
          runId: matchingRun.id,
          confidence: this.calculateAttributionConfidence(outcome, matchingRun)
        });
      }
    }

    return attributions;
  }

  /**
   * Find the best matching workflow run for a business outcome
   */
  private static findBestMatchingRun(outcome: any, runs: any[]) {
    if (runs.length === 0) return null;

    // Find runs that completed before the outcome was recorded
    const eligibleRuns = runs.filter(run => 
      run.completedAt && run.completedAt <= outcome.timestamp
    );

    if (eligibleRuns.length === 0) return null;

    // Return the most recent eligible run
    return eligibleRuns.reduce((latest, current) => 
      current.completedAt > latest.completedAt ? current : latest
    );
  }

  /**
   * Calculate confidence score for attribution (0-1)
   */
  private static calculateAttributionConfidence(outcome: any, run: any): number {
    if (!run.completedAt) return 0;

    const timeDiffMinutes = Math.abs(
      (outcome.timestamp.getTime() - run.completedAt.getTime()) / (1000 * 60)
    );

    // Higher confidence for outcomes closer in time to run completion
    if (timeDiffMinutes <= 5) return 0.95;
    if (timeDiffMinutes <= 15) return 0.85;
    if (timeDiffMinutes <= 60) return 0.70;
    if (timeDiffMinutes <= 240) return 0.50;
    if (timeDiffMinutes <= 1440) return 0.30; // 24 hours
    
    return 0.10;
  }

  /**
   * Attribute outcomes based on metadata matching
   */
  static async attributeByMetadata(
    workflowId: string,
    metadataKey: string,
    metadataValue: any
  ) {
    // Find workflow runs with matching metadata
    const matchingRuns = await prisma.workflowRun.findMany({
      where: {
        workflowId,
        status: 'COMPLETED',
        OR: [
          {
            input: {
              path: [metadataKey],
              equals: metadataValue
            }
          },
          {
            output: {
              path: [metadataKey],
              equals: metadataValue
            }
          }
        ]
      }
    });

    // Find outcomes with matching metadata
    const matchingOutcomes = await prisma.businessOutcome.findMany({
      where: {
        workflowId,
        metadata: {
          path: [metadataKey],
          equals: metadataValue
        }
      }
    });

    const attributions = [];

    // Attribute outcomes to runs with matching metadata
    for (const outcome of matchingOutcomes) {
      const bestRun = this.findBestMatchingRun(outcome, matchingRuns);
      
      if (bestRun) {
        await prisma.businessOutcome.update({
          where: { id: outcome.id },
          data: {
            metadata: {
              ...outcome.metadata as any,
              attributedToRun: bestRun.id,
              attributedAt: new Date().toISOString(),
              attributionMethod: 'metadata_match',
              attributionKey: metadataKey,
              attributionValue: metadataValue,
              attributionConfidence: 0.90
            }
          }
        });

        attributions.push({
          outcomeId: outcome.id,
          runId: bestRun.id,
          method: 'metadata_match',
          confidence: 0.90
        });
      }
    }

    return attributions;
  }

  /**
   * Get attribution statistics for a workflow
   */
  static async getAttributionStats(workflowId: string) {
    const totalOutcomes = await prisma.businessOutcome.count({
      where: { workflowId }
    });

    const attributedOutcomes = await prisma.businessOutcome.count({
      where: {
        workflowId,
        metadata: {
          path: ['attributedToRun'],
          not: null
        }
      }
    });

    const attributionsByMethod = await prisma.businessOutcome.groupBy({
      by: ['metadata'],
      where: {
        workflowId,
        metadata: {
          path: ['attributionMethod'],
          not: null
        }
      },
      _count: true
    });

    const attributionRate = totalOutcomes > 0 ? attributedOutcomes / totalOutcomes : 0;

    return {
      totalOutcomes,
      attributedOutcomes,
      unattributedOutcomes: totalOutcomes - attributedOutcomes,
      attributionRate,
      attributionsByMethod: attributionsByMethod.map(item => ({
        method: (item.metadata as any)?.attributionMethod || 'unknown',
        count: item._count
      }))
    };
  }

  /**
   * Get outcomes with their attribution details
   */
  static async getOutcomesWithAttribution(workflowId: string, limit: number = 50) {
    const outcomes = await prisma.businessOutcome.findMany({
      where: { workflowId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      include: {
        workflow: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    });

    // Enrich with attribution details
    const enrichedOutcomes = await Promise.all(
      outcomes.map(async (outcome) => {
        const metadata = outcome.metadata as any;
        let attributionDetails = null;

        if (metadata?.attributedToRun) {
          const workflowRun = await prisma.workflowRun.findUnique({
            where: { id: metadata.attributedToRun },
            select: {
              id: true,
              inngestRunId: true,
              startedAt: true,
              completedAt: true,
              status: true
            }
          });

          attributionDetails = {
            runId: metadata.attributedToRun,
            method: metadata.attributionMethod,
            confidence: metadata.attributionConfidence,
            attributedAt: metadata.attributedAt,
            workflowRun
          };
        }

        return {
          ...outcome,
          attribution: attributionDetails
        };
      })
    );

    return enrichedOutcomes;
  }

  /**
   * Remove attribution from an outcome
   */
  static async removeAttribution(outcomeId: string) {
    const outcome = await prisma.businessOutcome.findUnique({
      where: { id: outcomeId }
    });

    if (!outcome) {
      throw new Error('Outcome not found');
    }

    const metadata = outcome.metadata as any;
    if (metadata) {
      delete metadata.attributedToRun;
      delete metadata.attributedAt;
      delete metadata.attributionMethod;
      delete metadata.attributionConfidence;
      delete metadata.attributionKey;
      delete metadata.attributionValue;
    }

    return await prisma.businessOutcome.update({
      where: { id: outcomeId },
      data: { metadata }
    });
  }

  /**
   * Bulk attribution for multiple workflows
   */
  static async bulkAttributeOutcomes(workflowIds: string[], timeWindowHours: number = 24) {
    const results = [];

    for (const workflowId of workflowIds) {
      try {
        const attributions = await this.attributeOutcomesToWorkflowRuns(workflowId, timeWindowHours);
        results.push({
          workflowId,
          success: true,
          attributions: attributions.length,
          details: attributions
        });
      } catch (error) {
        results.push({
          workflowId,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }
}