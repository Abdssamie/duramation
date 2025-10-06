import { prisma } from '@duramation/db';
import { EfficiencyMetricRequest, EfficiencyComparison } from '@duramation/shared/types';
import { startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, subMonths, subQuarters } from 'date-fns';

export interface EfficiencyTrend {
  period: string;
  timeReduction: number;
  errorReduction: number;
  throughputIncrease: number;
  overallEfficiencyScore: number;
}

export interface EfficiencyAnalysis {
  workflowId: string;
  workflowName: string;
  currentPeriod: EfficiencyComparison;
  trends: EfficiencyTrend[];
  projectedSavings: {
    annualTimeSavingHours: number;
    annualCostSavings: number;
    annualErrorReduction: number;
  };
  benchmarks: {
    industryAverage?: number;
    topPerformer?: number;
    userAverage: number;
  };
}

export class EfficiencyCalculatorService {
  /**
   * Create or update efficiency metrics for a workflow
   */
  static async createOrUpdateEfficiencyMetric(data: EfficiencyMetricRequest) {
    // Calculate improvements
    const improvements = this.calculateImprovements(
      data.beforeMetrics,
      data.afterMetrics
    );

    return await prisma.efficiencyMetric.upsert({
      where: {
        workflowId_period: {
          workflowId: data.workflowId,
          period: data.period
        }
      },
      update: {
        beforeTimeSpent: data.beforeMetrics.timeSpent,
        beforeErrorRate: data.beforeMetrics.errorRate,
        beforeThroughput: data.beforeMetrics.throughput,
        afterTimeSpent: data.afterMetrics.timeSpent,
        afterErrorRate: data.afterMetrics.errorRate,
        afterThroughput: data.afterMetrics.throughput,
        timeReduction: improvements.timeReduction,
        errorReduction: improvements.errorReduction,
        throughputIncrease: improvements.throughputIncrease,
      },
      create: {
        workflowId: data.workflowId,
        period: data.period,
        beforeTimeSpent: data.beforeMetrics.timeSpent,
        beforeErrorRate: data.beforeMetrics.errorRate,
        beforeThroughput: data.beforeMetrics.throughput,
        afterTimeSpent: data.afterMetrics.timeSpent,
        afterErrorRate: data.afterMetrics.errorRate,
        afterThroughput: data.afterMetrics.throughput,
        timeReduction: improvements.timeReduction,
        errorReduction: improvements.errorReduction,
        throughputIncrease: improvements.throughputIncrease,
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
    });
  }

  /**
   * Calculate improvement percentages from before/after metrics
   */
  private static calculateImprovements(
    beforeMetrics: { timeSpent?: number; errorRate?: number; throughput?: number },
    afterMetrics: { timeSpent?: number; errorRate?: number; throughput?: number }
  ) {
    const improvements = {
      timeReduction: 0,
      errorReduction: 0,
      throughputIncrease: 0
    };

    // Calculate time reduction percentage
    if (beforeMetrics.timeSpent && afterMetrics.timeSpent && beforeMetrics.timeSpent > 0) {
      improvements.timeReduction = 
        ((beforeMetrics.timeSpent - afterMetrics.timeSpent) / beforeMetrics.timeSpent) * 100;
    }

    // Calculate error reduction percentage
    if (beforeMetrics.errorRate !== undefined && afterMetrics.errorRate !== undefined && beforeMetrics.errorRate > 0) {
      improvements.errorReduction = 
        ((beforeMetrics.errorRate - afterMetrics.errorRate) / beforeMetrics.errorRate) * 100;
    }

    // Calculate throughput increase percentage
    if (beforeMetrics.throughput && afterMetrics.throughput && beforeMetrics.throughput > 0) {
      improvements.throughputIncrease = 
        ((afterMetrics.throughput - beforeMetrics.throughput) / beforeMetrics.throughput) * 100;
    }

    return improvements;
  }

  /**
   * Get efficiency comparisons for a user's workflows
   */
  static async getUserEfficiencyComparisons(
    userId: string,
    periodType: 'month' | 'quarter' = 'month',
    limit?: number
  ): Promise<EfficiencyComparison[]> {
    // Get user's workflows
    const userWorkflows = await prisma.workflow.findMany({
      where: { userId },
      select: { id: true, name: true }
    });

    const workflowIds = userWorkflows.map(w => w.id);
    
    if (workflowIds.length === 0) {
      return [];
    }

    // Get current period identifier
    const currentPeriod = this.getCurrentPeriodIdentifier(periodType);

    // Get efficiency metrics for current period
    const efficiencyMetrics = await prisma.efficiencyMetric.findMany({
      where: {
        workflowId: { in: workflowIds },
        period: currentPeriod
      },
      include: {
        workflow: {
          select: {
            id: true,
            name: true,
            description: true,
          }
        }
      },
      orderBy: {
        timeReduction: 'desc'
      },
      take: limit
    });

    return efficiencyMetrics.map(metric => ({
      workflowId: metric.workflowId,
      workflowName: metric.workflow.name,
      period: metric.period,
      improvements: {
        timeReduction: metric.timeReduction || 0,
        errorReduction: metric.errorReduction || 0,
        throughputIncrease: metric.throughputIncrease || 0,
      },
      beforeMetrics: {
        timeSpent: metric.beforeTimeSpent || 0,
        errorRate: metric.beforeErrorRate || 0,
        throughput: metric.beforeThroughput || 0,
      },
      afterMetrics: {
        timeSpent: metric.afterTimeSpent || 0,
        errorRate: metric.afterErrorRate || 0,
        throughput: metric.afterThroughput || 0,
      }
    }));
  }

  /**
   * Calculate efficiency trends over time for a workflow
   */
  static async calculateEfficiencyTrends(
    workflowId: string,
    periodType: 'month' | 'quarter' = 'month',
    periodsBack: number = 6
  ): Promise<EfficiencyTrend[]> {
    const periods = this.generatePeriodIdentifiers(periodType, periodsBack);
    
    const metrics = await prisma.efficiencyMetric.findMany({
      where: {
        workflowId,
        period: { in: periods }
      },
      orderBy: { period: 'asc' }
    });

    return metrics.map(metric => ({
      period: metric.period,
      timeReduction: metric.timeReduction || 0,
      errorReduction: metric.errorReduction || 0,
      throughputIncrease: metric.throughputIncrease || 0,
      overallEfficiencyScore: this.calculateOverallEfficiencyScore(
        metric.timeReduction || 0,
        metric.errorReduction || 0,
        metric.throughputIncrease || 0
      )
    }));
  }

  /**
   * Calculate overall efficiency score (0-100)
   */
  private static calculateOverallEfficiencyScore(
    timeReduction: number,
    errorReduction: number,
    throughputIncrease: number
  ): number {
    // Weighted average of improvements (time reduction weighted highest)
    const timeWeight = 0.5;
    const errorWeight = 0.3;
    const throughputWeight = 0.2;

    // Normalize negative values to 0 and cap positive values at 100
    const normalizedTime = Math.max(0, Math.min(100, timeReduction));
    const normalizedError = Math.max(0, Math.min(100, errorReduction));
    const normalizedThroughput = Math.max(0, Math.min(100, throughputIncrease));

    return (
      normalizedTime * timeWeight +
      normalizedError * errorWeight +
      normalizedThroughput * throughputWeight
    );
  }

  /**
   * Get comprehensive efficiency analysis for a workflow
   */
  static async getWorkflowEfficiencyAnalysis(workflowId: string): Promise<EfficiencyAnalysis> {
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
      select: { id: true, name: true, userId: true }
    });

    if (!workflow) {
      throw new Error('Workflow not found');
    }

    // Get current period efficiency
    const currentPeriod = this.getCurrentPeriodIdentifier('month');
    const currentMetric = await prisma.efficiencyMetric.findUnique({
      where: {
        workflowId_period: {
          workflowId,
          period: currentPeriod
        }
      },
      include: {
        workflow: {
          select: { name: true }
        }
      }
    });

    const currentPeriodComparison: EfficiencyComparison = currentMetric ? {
      workflowId: currentMetric.workflowId,
      workflowName: currentMetric.workflow.name,
      period: currentMetric.period,
      improvements: {
        timeReduction: currentMetric.timeReduction || 0,
        errorReduction: currentMetric.errorReduction || 0,
        throughputIncrease: currentMetric.throughputIncrease || 0,
      },
      beforeMetrics: {
        timeSpent: currentMetric.beforeTimeSpent || 0,
        errorRate: currentMetric.beforeErrorRate || 0,
        throughput: currentMetric.beforeThroughput || 0,
      },
      afterMetrics: {
        timeSpent: currentMetric.afterTimeSpent || 0,
        errorRate: currentMetric.afterErrorRate || 0,
        throughput: currentMetric.afterThroughput || 0,
      }
    } : {
      workflowId,
      workflowName: workflow.name,
      period: currentPeriod,
      improvements: { timeReduction: 0, errorReduction: 0, throughputIncrease: 0 },
      beforeMetrics: { timeSpent: 0, errorRate: 0, throughput: 0 },
      afterMetrics: { timeSpent: 0, errorRate: 0, throughput: 0 }
    };

    // Get trends
    const trends = await this.calculateEfficiencyTrends(workflowId, 'month', 6);

    // Calculate projected savings
    const projectedSavings = await this.calculateProjectedSavings(workflowId);

    // Calculate benchmarks
    const benchmarks = await this.calculateBenchmarks(workflow.userId, workflowId);

    return {
      workflowId,
      workflowName: workflow.name,
      currentPeriod: currentPeriodComparison,
      trends,
      projectedSavings,
      benchmarks
    };
  }

  /**
   * Calculate projected annual savings based on current efficiency metrics
   */
  private static async calculateProjectedSavings(workflowId: string) {
    // Get recent efficiency metrics
    const recentMetrics = await prisma.efficiencyMetric.findMany({
      where: { workflowId },
      orderBy: { period: 'desc' },
      take: 3
    });

    if (recentMetrics.length === 0) {
      return {
        annualTimeSavingHours: 0,
        annualCostSavings: 0,
        annualErrorReduction: 0
      };
    }

    // Calculate averages from recent metrics
    const avgTimeReduction = recentMetrics.reduce((sum, m) => sum + (m.timeReduction || 0), 0) / recentMetrics.length;
    const avgErrorReduction = recentMetrics.reduce((sum, m) => sum + (m.errorReduction || 0), 0) / recentMetrics.length;
    const avgTimeSaved = recentMetrics.reduce((sum, m) => {
      const before = m.beforeTimeSpent || 0;
      const after = m.afterTimeSpent || 0;
      return sum + (before - after);
    }, 0) / recentMetrics.length;

    // Get workflow execution frequency from recent runs
    const recentRuns = await prisma.workflowRun.count({
      where: {
        workflowId,
        startedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }
    });

    const monthlyExecutions = recentRuns;
    const annualExecutions = monthlyExecutions * 12;

    // Project annual savings
    const annualTimeSavingHours = (avgTimeSaved * annualExecutions);
    const annualCostSavings = annualTimeSavingHours * 50; // Assume $50/hour cost
    const annualErrorReduction = (avgErrorReduction / 100) * annualExecutions;

    return {
      annualTimeSavingHours: Math.max(0, annualTimeSavingHours),
      annualCostSavings: Math.max(0, annualCostSavings),
      annualErrorReduction: Math.max(0, annualErrorReduction)
    };
  }

  /**
   * Calculate benchmarks for comparison
   */
  private static async calculateBenchmarks(userId: string, workflowId: string) {
    // Get user's average efficiency across all workflows
    const userMetrics = await prisma.efficiencyMetric.findMany({
      where: {
        workflow: { userId }
      }
    });

    const userAverage = userMetrics.length > 0 
      ? userMetrics.reduce((sum, m) => sum + this.calculateOverallEfficiencyScore(
          m.timeReduction || 0,
          m.errorReduction || 0,
          m.throughputIncrease || 0
        ), 0) / userMetrics.length
      : 0;

    // For now, use placeholder values for industry benchmarks
    // In a real implementation, these would come from industry data
    return {
      industryAverage: 65, // Placeholder
      topPerformer: 85,    // Placeholder
      userAverage
    };
  }

  /**
   * Generate period identifiers for trend analysis
   */
  private static generatePeriodIdentifiers(
    periodType: 'month' | 'quarter',
    periodsBack: number
  ): string[] {
    const periods: string[] = [];
    const now = new Date();

    for (let i = 0; i < periodsBack; i++) {
      if (periodType === 'month') {
        const date = subMonths(now, i);
        periods.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
      } else {
        const date = subQuarters(now, i);
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        periods.push(`${date.getFullYear()}-Q${quarter}`);
      }
    }

    return periods.reverse(); // Return in chronological order
  }

  /**
   * Get current period identifier
   */
  private static getCurrentPeriodIdentifier(periodType: 'month' | 'quarter'): string {
    const now = new Date();
    
    if (periodType === 'month') {
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    } else {
      const quarter = Math.floor(now.getMonth() / 3) + 1;
      return `${now.getFullYear()}-Q${quarter}`;
    }
  }

  /**
   * Aggregate efficiency metrics for multiple workflows
   */
  static async aggregateUserEfficiencyMetrics(userId: string, period?: string) {
    const where: any = {
      workflow: { userId }
    };

    if (period) {
      where.period = period;
    }

    const metrics = await prisma.efficiencyMetric.findMany({
      where,
      include: {
        workflow: {
          select: { name: true }
        }
      }
    });

    if (metrics.length === 0) {
      return {
        totalWorkflows: 0,
        averageTimeReduction: 0,
        averageErrorReduction: 0,
        averageThroughputIncrease: 0,
        totalTimeSavedHours: 0,
        overallEfficiencyScore: 0
      };
    }

    const totalWorkflows = metrics.length;
    const averageTimeReduction = metrics.reduce((sum, m) => sum + (m.timeReduction || 0), 0) / totalWorkflows;
    const averageErrorReduction = metrics.reduce((sum, m) => sum + (m.errorReduction || 0), 0) / totalWorkflows;
    const averageThroughputIncrease = metrics.reduce((sum, m) => sum + (m.throughputIncrease || 0), 0) / totalWorkflows;
    
    const totalTimeSavedHours = metrics.reduce((sum, m) => {
      const before = m.beforeTimeSpent || 0;
      const after = m.afterTimeSpent || 0;
      return sum + (before - after);
    }, 0);

    const overallEfficiencyScore = this.calculateOverallEfficiencyScore(
      averageTimeReduction,
      averageErrorReduction,
      averageThroughputIncrease
    );

    return {
      totalWorkflows,
      averageTimeReduction,
      averageErrorReduction,
      averageThroughputIncrease,
      totalTimeSavedHours,
      overallEfficiencyScore
    };
  }

  /**
   * Cache efficiency calculations for performance
   */
  static async cacheEfficiencyCalculations(userId: string) {
    // This would implement caching logic for expensive calculations
    // For now, we'll just return the current calculations
    const currentPeriod = this.getCurrentPeriodIdentifier('month');
    return await this.aggregateUserEfficiencyMetrics(userId, currentPeriod);
  }
}