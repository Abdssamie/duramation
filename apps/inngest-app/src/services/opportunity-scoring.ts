import { OpportunityPattern } from './pattern-recognition';

export interface ROICalculation {
  timeSavingsHours: number;
  costSavings: number;
  paybackPeriodMonths: number;
  annualSavings: number;
  implementationCost: number;
  confidenceLevel: number; // 0-1
}

export interface ScoredOpportunity extends OpportunityPattern {
  finalImpactScore: number; // Adjusted impact score (1-10)
  finalDifficultyScore: number; // Adjusted difficulty score (1-10)
  priorityRank: number; // Overall priority ranking
  roi: ROICalculation;
}

export interface ScoringFactors {
  // Business context factors
  companySize: 'small' | 'medium' | 'large';
  industry: string;
  automationMaturity: 'beginner' | 'intermediate' | 'advanced';
  
  // Technical factors
  existingIntegrations: string[];
  technicalCapability: 'low' | 'medium' | 'high';
  
  // Financial factors
  hourlyRate: number; // Average hourly cost of manual work
  implementationBudget: number;
}

export class OpportunityScoringEngine {
  private readonly defaultHourlyRate = 50; // Default hourly rate in USD
  private readonly defaultImplementationCosts = {
    DATA_ENTRY: 2000,
    COMMUNICATION: 1500,
    REPORTING: 3000,
    INTEGRATION: 4000,
  };

  /**
   * Scores and ranks opportunities with ROI calculations
   */
  async scoreOpportunities(
    opportunities: OpportunityPattern[],
    factors: Partial<ScoringFactors> = {}
  ): Promise<ScoredOpportunity[]> {
    const scoringFactors = this.getDefaultScoringFactors(factors);
    
    const scoredOpportunities = opportunities.map(opportunity => 
      this.scoreOpportunity(opportunity, scoringFactors)
    );

    // Rank opportunities by priority score
    return this.rankOpportunities(scoredOpportunities);
  }

  /**
   * Scores a single opportunity
   */
  private scoreOpportunity(
    opportunity: OpportunityPattern,
    factors: ScoringFactors
  ): ScoredOpportunity {
    // Calculate adjusted impact score
    const finalImpactScore = this.calculateAdjustedImpactScore(opportunity, factors);
    
    // Calculate adjusted difficulty score
    const finalDifficultyScore = this.calculateAdjustedDifficultyScore(opportunity, factors);
    
    // Calculate ROI
    const roi = this.calculateROI(opportunity, factors);
    
    // Calculate priority rank (will be set during ranking)
    const priorityRank = 0;

    return {
      ...opportunity,
      finalImpactScore,
      finalDifficultyScore,
      priorityRank,
      roi,
    };
  }

  /**
   * Calculates adjusted impact score based on business context
   */
  private calculateAdjustedImpactScore(
    opportunity: OpportunityPattern,
    factors: ScoringFactors
  ): number {
    let adjustedScore = opportunity.impactScore;

    // Company size adjustments
    switch (factors.companySize) {
      case 'small':
        // Small companies benefit more from simple automations
        if (opportunity.category === 'DATA_ENTRY' || opportunity.category === 'COMMUNICATION') {
          adjustedScore += 1;
        }
        break;
      case 'large':
        // Large companies benefit more from complex integrations
        if (opportunity.category === 'INTEGRATION' || opportunity.category === 'REPORTING') {
          adjustedScore += 1;
        }
        break;
    }

    // Automation maturity adjustments
    switch (factors.automationMaturity) {
      case 'beginner':
        // Beginners should start with simpler automations
        if (opportunity.difficultyScore <= 3) {
          adjustedScore += 1;
        }
        break;
      case 'advanced':
        // Advanced users can handle complex automations
        if (opportunity.difficultyScore >= 7) {
          adjustedScore += 1;
        }
        break;
    }

    // Existing integrations bonus
    const hasRequiredIntegrations = opportunity.requiredIntegrations.every(
      integration => factors.existingIntegrations.includes(integration)
    );
    if (hasRequiredIntegrations) {
      adjustedScore += 1;
    }

    // Confidence level adjustment
    adjustedScore *= opportunity.confidence;

    return Math.min(10, Math.max(1, Math.round(adjustedScore)));
  }

  /**
   * Calculates adjusted difficulty score based on technical context
   */
  private calculateAdjustedDifficultyScore(
    opportunity: OpportunityPattern,
    factors: ScoringFactors
  ): number {
    let adjustedScore = opportunity.difficultyScore;

    // Technical capability adjustments
    switch (factors.technicalCapability) {
      case 'low':
        // Low technical capability increases difficulty
        adjustedScore += 2;
        break;
      case 'high':
        // High technical capability reduces difficulty
        adjustedScore -= 1;
        break;
    }

    // Existing integrations reduce difficulty
    const missingIntegrations = opportunity.requiredIntegrations.filter(
      integration => !factors.existingIntegrations.includes(integration)
    );
    adjustedScore += missingIntegrations.length * 0.5;

    // Category-specific adjustments
    switch (opportunity.category) {
      case 'DATA_ENTRY':
        // Data entry is generally easier to automate
        adjustedScore -= 0.5;
        break;
      case 'INTEGRATION':
        // Integrations are more complex
        adjustedScore += 1;
        break;
    }

    return Math.min(10, Math.max(1, Math.round(adjustedScore)));
  }

  /**
   * Calculates ROI for an opportunity
   */
  private calculateROI(
    opportunity: OpportunityPattern,
    factors: ScoringFactors
  ): ROICalculation {
    // Estimate time savings based on impact score and category
    const timeSavingsHours = this.estimateTimeSavings(opportunity);
    
    // Calculate cost savings
    const costSavings = timeSavingsHours * factors.hourlyRate;
    const annualSavings = costSavings * 12; // Assuming monthly savings
    
    // Estimate implementation cost
    const implementationCost = this.estimateImplementationCost(opportunity, factors);
    
    // Calculate payback period
    const paybackPeriodMonths = annualSavings > 0 
      ? Math.ceil((implementationCost / annualSavings) * 12)
      : 999; // Very long payback if no savings
    
    // Calculate confidence level
    const confidenceLevel = this.calculateROIConfidence(opportunity, factors);

    return {
      timeSavingsHours,
      costSavings,
      paybackPeriodMonths,
      annualSavings,
      implementationCost,
      confidenceLevel,
    };
  }

  /**
   * Estimates time savings based on opportunity characteristics
   */
  private estimateTimeSavings(opportunity: OpportunityPattern): number {
    const baseHours = {
      DATA_ENTRY: 20,
      COMMUNICATION: 15,
      REPORTING: 25,
      INTEGRATION: 30,
    };

    const categoryHours = baseHours[opportunity.category] || 20;
    
    // Scale by impact score
    const scaledHours = categoryHours * (opportunity.impactScore / 10);
    
    // Apply confidence factor
    return scaledHours * opportunity.confidence;
  }

  /**
   * Estimates implementation cost
   */
  private estimateImplementationCost(
    opportunity: OpportunityPattern,
    factors: ScoringFactors
  ): number {
    const baseCost = this.defaultImplementationCosts[opportunity.category] || 2500;
    
    // Scale by difficulty
    const difficultyCost = baseCost * (opportunity.difficultyScore / 5);
    
    // Add cost for missing integrations
    const missingIntegrations = opportunity.requiredIntegrations.filter(
      integration => !factors.existingIntegrations.includes(integration)
    );
    const integrationCost = missingIntegrations.length * 500;
    
    // Technical capability adjustment
    const capabilityMultiplier = {
      low: 1.5,
      medium: 1.0,
      high: 0.8,
    }[factors.technicalCapability];
    
    return Math.round((difficultyCost + integrationCost) * capabilityMultiplier);
  }

  /**
   * Calculates confidence level for ROI estimates
   */
  private calculateROIConfidence(
    opportunity: OpportunityPattern,
    factors: ScoringFactors
  ): number {
    let confidence = opportunity.confidence;
    
    // Reduce confidence for complex opportunities
    if (opportunity.difficultyScore > 7) {
      confidence *= 0.8;
    }
    
    // Reduce confidence for missing integrations
    const missingIntegrations = opportunity.requiredIntegrations.filter(
      integration => !factors.existingIntegrations.includes(integration)
    );
    confidence *= Math.max(0.5, 1 - (missingIntegrations.length * 0.1));
    
    // Adjust for automation maturity
    const maturityMultiplier = {
      beginner: 0.7,
      intermediate: 1.0,
      advanced: 1.1,
    }[factors.automationMaturity];
    
    confidence *= maturityMultiplier;
    
    return Math.min(1, Math.max(0.1, confidence));
  }

  /**
   * Ranks opportunities by priority score
   */
  private rankOpportunities(opportunities: ScoredOpportunity[]): ScoredOpportunity[] {
    // Calculate priority score for each opportunity
    const opportunitiesWithPriority = opportunities.map(opportunity => ({
      ...opportunity,
      priorityScore: this.calculatePriorityScore(opportunity),
    }));

    // Sort by priority score (higher is better)
    opportunitiesWithPriority.sort((a, b) => b.priorityScore - a.priorityScore);

    // Assign priority ranks
    return opportunitiesWithPriority.map((opportunity, index) => ({
      ...opportunity,
      priorityRank: index + 1,
    }));
  }

  /**
   * Calculates overall priority score
   */
  private calculatePriorityScore(opportunity: ScoredOpportunity): number {
    // Weight factors for priority calculation
    const impactWeight = 0.4;
    const roiWeight = 0.3;
    const difficultyWeight = 0.2; // Lower difficulty = higher priority
    const confidenceWeight = 0.1;

    // Normalize scores to 0-1 range
    const normalizedImpact = opportunity.finalImpactScore / 10;
    const normalizedROI = Math.min(1, opportunity.roi.annualSavings / 50000); // Cap at $50k annual savings
    const normalizedDifficulty = 1 - (opportunity.finalDifficultyScore / 10); // Invert difficulty
    const normalizedConfidence = opportunity.roi.confidenceLevel;

    // Calculate weighted priority score
    const priorityScore = 
      (normalizedImpact * impactWeight) +
      (normalizedROI * roiWeight) +
      (normalizedDifficulty * difficultyWeight) +
      (normalizedConfidence * confidenceWeight);

    return Math.round(priorityScore * 100); // Scale to 0-100
  }

  /**
   * Gets default scoring factors with user overrides
   */
  private getDefaultScoringFactors(overrides: Partial<ScoringFactors>): ScoringFactors {
    return {
      companySize: 'medium',
      industry: 'general',
      automationMaturity: 'intermediate',
      existingIntegrations: [],
      technicalCapability: 'medium',
      hourlyRate: this.defaultHourlyRate,
      implementationBudget: 10000,
      ...overrides,
    };
  }

  /**
   * Filters opportunities by budget constraints
   */
  filterByBudget(opportunities: ScoredOpportunity[], maxBudget: number): ScoredOpportunity[] {
    return opportunities.filter(opportunity => 
      opportunity.roi.implementationCost <= maxBudget
    );
  }

  /**
   * Filters opportunities by payback period
   */
  filterByPaybackPeriod(opportunities: ScoredOpportunity[], maxMonths: number): ScoredOpportunity[] {
    return opportunities.filter(opportunity => 
      opportunity.roi.paybackPeriodMonths <= maxMonths
    );
  }

  /**
   * Gets top opportunities by priority
   */
  getTopOpportunities(opportunities: ScoredOpportunity[], count: number = 5): ScoredOpportunity[] {
    return opportunities
      .sort((a, b) => a.priorityRank - b.priorityRank)
      .slice(0, count);
  }
}

export const opportunityScoringEngine = new OpportunityScoringEngine();