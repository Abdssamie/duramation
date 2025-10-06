import { prisma } from '@duramation/db';
import { OpportunityStatus, OpportunityCategory, AutomationOpportunity } from '@duramation/db/types';
import { OpportunityPattern, patternRecognitionEngine } from './pattern-recognition';
import { ScoredOpportunity, opportunityScoringEngine } from './opportunity-scoring';

export interface OpportunityDismissalReason {
  reason: 'not_relevant' | 'already_implemented' | 'too_complex' | 'low_priority' | 'other';
  feedback?: string;
  category?: OpportunityCategory;
}

export interface OpportunityRequestData {
  notes?: string;
  priority: 'low' | 'medium' | 'high';
  expectedTimeline?: string;
}

export interface OpportunityLearning {
  userId: string;
  dismissedCategories: OpportunityCategory[];
  preferredCategories: OpportunityCategory[];
  complexityPreference: 'simple' | 'moderate' | 'complex';
  roiThreshold: number;
  implementationSpeedPreference: 'fast' | 'moderate' | 'thorough';
}

export class OpportunityManagementSystem {
  /**
   * Creates or updates automation opportunities from detected patterns
   */
  async syncOpportunities(userId: string): Promise<void> {
    // Get detected opportunities from pattern recognition
    const detectedOpportunities = await patternRecognitionEngine.detectOpportunities(userId);
    
    // Score the opportunities
    const scoredOpportunities = await opportunityScoringEngine.scoreOpportunities(
      detectedOpportunities,
      await this.getUserScoringFactors(userId)
    );

    // Apply learning preferences to filter and adjust opportunities
    const filteredOpportunities = await this.applyLearningFilters(userId, scoredOpportunities);

    // Sync with database
    await this.syncOpportunitiesWithDatabase(userId, filteredOpportunities);
  }

  /**
   * Gets all opportunities for a user with optional filtering
   */
  async getOpportunities(
    userId: string,
    filters?: {
      status?: OpportunityStatus[];
      category?: OpportunityCategory[];
      minImpactScore?: number;
      maxDifficultyScore?: number;
    }
  ): Promise<AutomationOpportunity[]> {
    const whereClause: any = { userId };

    if (filters?.status) {
      whereClause.status = { in: filters.status };
    }

    if (filters?.category) {
      whereClause.category = { in: filters.category };
    }

    if (filters?.minImpactScore) {
      whereClause.impactScore = { gte: filters.minImpactScore };
    }

    if (filters?.maxDifficultyScore) {
      whereClause.difficultyScore = { lte: filters.maxDifficultyScore };
    }

    return await prisma.automationOpportunity.findMany({
      where: whereClause,
      orderBy: [
        { impactScore: 'desc' },
        { identifiedAt: 'desc' }
      ]
    });
  }

  /**
   * Dismisses an opportunity and learns from the dismissal
   */
  async dismissOpportunity(
    userId: string,
    opportunityId: string,
    dismissalData: OpportunityDismissalReason
  ): Promise<void> {
    // Update opportunity status
    const opportunity = await prisma.automationOpportunity.update({
      where: { 
        id: opportunityId,
        userId // Ensure user owns this opportunity
      },
      data: {
        status: 'DISMISSED',
        dismissalReason: dismissalData.reason
      }
    });

    // Learn from the dismissal
    await this.learnFromDismissal(userId, opportunity, dismissalData);
  }

  /**
   * Marks an opportunity as requested for implementation
   */
  async requestOpportunityImplementation(
    userId: string,
    opportunityId: string,
    requestData: OpportunityRequestData
  ): Promise<void> {
    // Update opportunity status
    const opportunity = await prisma.automationOpportunity.update({
      where: { 
        id: opportunityId,
        userId // Ensure user owns this opportunity
      },
      data: {
        status: 'REQUESTED'
      }
    });

    // Learn from the request (positive signal)
    await this.learnFromRequest(userId, opportunity, requestData);
  }

  /**
   * Marks an opportunity as implemented and tracks effectiveness
   */
  async markOpportunityImplemented(
    userId: string,
    opportunityId: string,
    implementationNotes?: string
  ): Promise<void> {
    await prisma.automationOpportunity.update({
      where: { 
        id: opportunityId,
        userId
      },
      data: {
        status: 'IMPLEMENTED',
        implementationNotes
      }
    });

    // This is a strong positive signal for learning
    await this.learnFromImplementation(userId, opportunityId);
  }

  /**
   * Gets user learning preferences
   */
  async getUserLearning(userId: string): Promise<OpportunityLearning | null> {
    // This would typically be stored in a separate table
    // For now, we'll derive it from opportunity history
    return await this.deriveUserLearning(userId);
  }

  /**
   * Updates user learning preferences based on feedback
   */
  async updateUserLearning(userId: string, learning: Partial<OpportunityLearning>): Promise<void> {
    // In a full implementation, this would update a user_learning table
    // For now, we'll store it as metadata or derive it from patterns
    console.log(`Learning updated for user ${userId}:`, learning);
  }

  /**
   * Gets opportunities that are likely to be implemented based on learning
   */
  async getRecommendedOpportunities(userId: string, limit: number = 5): Promise<(AutomationOpportunity & { learningScore: number })[]> {
    const learning = await this.getUserLearning(userId);
    const allOpportunities = await this.getOpportunities(userId, {
      status: ['IDENTIFIED']
    });

    // Score opportunities based on learning preferences
    const scoredByLearning = allOpportunities.map(opportunity => ({
      ...opportunity,
      learningScore: this.calculateLearningScore(opportunity, learning)
    }));

    // Sort by learning score and return top recommendations
    return scoredByLearning
      .sort((a, b) => b.learningScore - a.learningScore)
      .slice(0, limit);
  }

  /**
   * Syncs detected opportunities with the database
   */
  private async syncOpportunitiesWithDatabase(
    userId: string,
    opportunities: ScoredOpportunity[]
  ): Promise<void> {
    for (const opportunity of opportunities) {
      // Check if similar opportunity already exists
      const existing = await prisma.automationOpportunity.findFirst({
        where: {
          userId,
          title: opportunity.title,
          category: opportunity.category,
          status: { in: ['IDENTIFIED', 'REQUESTED'] }
        }
      });

      if (!existing) {
        // Create new opportunity
        await prisma.automationOpportunity.create({
          data: {
            userId,
            title: opportunity.title,
            description: opportunity.description,
            category: opportunity.category,
            impactScore: opportunity.finalImpactScore,
            difficultyScore: opportunity.finalDifficultyScore,
            timeSavingsHours: opportunity.roi.timeSavingsHours,
            costSavings: opportunity.roi.costSavings,
            paybackPeriodMonths: opportunity.roi.paybackPeriodMonths,
            requiredIntegrations: opportunity.requiredIntegrations,
            status: 'IDENTIFIED'
          }
        });
      } else {
        // Update existing opportunity with new scores
        await prisma.automationOpportunity.update({
          where: { id: existing.id },
          data: {
            impactScore: opportunity.finalImpactScore,
            difficultyScore: opportunity.finalDifficultyScore,
            timeSavingsHours: opportunity.roi.timeSavingsHours,
            costSavings: opportunity.roi.costSavings,
            paybackPeriodMonths: opportunity.roi.paybackPeriodMonths
          }
        });
      }
    }
  }

  /**
   * Applies learning-based filters to opportunities
   */
  private async applyLearningFilters(
    userId: string,
    opportunities: ScoredOpportunity[]
  ): Promise<ScoredOpportunity[]> {
    const learning = await this.getUserLearning(userId);
    
    if (!learning) {
      return opportunities; // No learning data yet
    }

    return opportunities.filter(opportunity => {
      // Filter out dismissed categories
      if (learning.dismissedCategories.includes(opportunity.category)) {
        return false;
      }

      // Filter by ROI threshold
      if (opportunity.roi.annualSavings < learning.roiThreshold) {
        return false;
      }

      // Filter by complexity preference
      const complexityMatch = this.matchesComplexityPreference(
        opportunity.finalDifficultyScore,
        learning.complexityPreference
      );

      return complexityMatch;
    });
  }

  /**
   * Derives user learning from opportunity history
   */
  private async deriveUserLearning(userId: string): Promise<OpportunityLearning> {
    const opportunities: AutomationOpportunity[] = await prisma.automationOpportunity.findMany({
      where: { userId },
      orderBy: { identifiedAt: 'desc' }
    });

    const dismissed = opportunities.filter(o => o.status === 'DISMISSED');
    const requested = opportunities.filter(o => o.status === 'REQUESTED');
    const implemented = opportunities.filter(o => o.status === 'IMPLEMENTED');

    // Analyze dismissed categories
    const dismissedCategories = [...new Set(
      dismissed.map(o => o.category)
    )] as OpportunityCategory[];

    // Analyze preferred categories (requested + implemented)
    const preferredCategories = [...new Set(
      [...requested, ...implemented].map(o => o.category)
    )] as OpportunityCategory[];

    // Analyze complexity preference
    const implementedDifficulties = implemented.map(o => o.difficultyScore);
    const avgImplementedDifficulty = implementedDifficulties.length > 0
      ? implementedDifficulties.reduce((sum, d) => sum + d, 0) / implementedDifficulties.length
      : 5;

    const complexityPreference: 'simple' | 'moderate' | 'complex' = 
      avgImplementedDifficulty <= 3 ? 'simple' :
      avgImplementedDifficulty <= 7 ? 'moderate' : 'complex';

    // Analyze ROI threshold
    const implementedROIs = implemented
      .filter(o => o.costSavings)
      .map(o => Number(o.costSavings!) * 12); // Annual savings
    const minImplementedROI = implementedROIs.length > 0 
      ? Math.min(...implementedROIs)
      : 1000; // Default threshold

    return {
      userId,
      dismissedCategories,
      preferredCategories,
      complexityPreference,
      roiThreshold: minImplementedROI,
      implementationSpeedPreference: 'moderate' // Default, could be derived from timeline preferences
    };
  }

  /**
   * Learns from opportunity dismissal
   */
  private async learnFromDismissal(
    userId: string,
    opportunity: any,
    dismissalData: OpportunityDismissalReason
  ): Promise<void> {
    // In a full implementation, this would update learning weights
    // For now, we'll log the learning signal
    console.log(`Learning from dismissal: User ${userId} dismissed ${opportunity.category} opportunity for reason: ${dismissalData.reason}`);
    
    // Could implement:
    // - Reduce weight for this category
    // - Adjust difficulty preference based on "too_complex" feedback
    // - Update ROI thresholds based on "low_priority" feedback
  }

  /**
   * Learns from opportunity request
   */
  private async learnFromRequest(
    userId: string,
    opportunity: any,
    requestData: OpportunityRequestData
  ): Promise<void> {
    console.log(`Learning from request: User ${userId} requested ${opportunity.category} opportunity with priority: ${requestData.priority}`);
    
    // Could implement:
    // - Increase weight for this category
    // - Adjust timeline preferences
    // - Update priority scoring based on request priority
  }

  /**
   * Learns from opportunity implementation
   */
  private async learnFromImplementation(userId: string, opportunityId: string): Promise<void> {
    const opportunity = await prisma.automationOpportunity.findUnique({
      where: { id: opportunityId }
    });

    if (opportunity) {
      console.log(`Learning from implementation: User ${userId} implemented ${opportunity.category} opportunity`);
      
      // This is the strongest positive signal
      // Could implement:
      // - Significantly increase weight for this category
      // - Adjust difficulty and ROI preferences based on implemented opportunity characteristics
      // - Use this as a template for similar opportunities
    }
  }

  /**
   * Gets user scoring factors for opportunity scoring
   */
  private async getUserScoringFactors(userId: string) {
    const learning = await this.getUserLearning(userId);
    
    // Convert learning preferences to scoring factors
    return {
      automationMaturity: learning?.complexityPreference === 'simple' ? 'beginner' as const :
                         learning?.complexityPreference === 'complex' ? 'advanced' as const :
                         'intermediate' as const,
      // Could add more factors based on user history and preferences
    };
  }

  /**
   * Checks if opportunity matches user's complexity preference
   */
  private matchesComplexityPreference(
    difficultyScore: number,
    preference: 'simple' | 'moderate' | 'complex'
  ): boolean {
    switch (preference) {
      case 'simple':
        return difficultyScore <= 4;
      case 'moderate':
        return difficultyScore >= 3 && difficultyScore <= 7;
      case 'complex':
        return difficultyScore >= 6;
      default:
        return true;
    }
  }

  /**
   * Calculates learning-based score for opportunity recommendation
   */
  private calculateLearningScore(opportunity: any, learning: OpportunityLearning | null): number {
    if (!learning) return opportunity.priorityRank || 50;

    let score = 50; // Base score

    // Boost preferred categories
    if (learning.preferredCategories.includes(opportunity.category)) {
      score += 20;
    }

    // Penalize dismissed categories
    if (learning.dismissedCategories.includes(opportunity.category)) {
      score -= 30;
    }

    // Adjust for complexity preference
    const complexityMatch = this.matchesComplexityPreference(
      opportunity.difficultyScore,
      learning.complexityPreference
    );
    if (complexityMatch) {
      score += 10;
    } else {
      score -= 15;
    }

    // Adjust for ROI threshold
    const annualSavings = opportunity.estimatedCostSavings * 12;
    if (annualSavings >= learning.roiThreshold) {
      score += 15;
    } else {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }
}

export const opportunityManagementSystem = new OpportunityManagementSystem();