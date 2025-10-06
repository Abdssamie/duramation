// Enhanced Dashboard Types

import { OpportunityStatus } from "@duramation/db/types";
import { BusinessOutcomeType } from "@duramation/db/types";
import { OpportunityCategory } from "@duramation/db/types";
import { HealthRecommendationType } from "@duramation/db/types";
import { HealthRecommendationPriority } from "@duramation/db/types";
import { ImplementationEffort } from "@duramation/db/types";

// Re-export database types for enhanced dashboard models
export type {
  BusinessOutcome,
  EfficiencyMetric,
  AutomationOpportunity,
  WorkflowHealth,
  HealthRecommendation,
  HealthAlert,
  ExecutiveReport
} from '@duramation/db/types';

// Additional interfaces for API responses and calculations

export interface BusinessImpactMetrics {
  totalOutcomes: number;
  outcomesByType: Record<string, number>;
  trendsOverTime: {
    period: string;
    value: number;
  }[];
  outcomePerAutomation: number;
}

export interface EfficiencyComparison {
  workflowId: string;
  workflowName: string;
  period: string;
  improvements: {
    timeReduction: number;
    errorReduction: number;
    throughputIncrease: number;
  };
  beforeMetrics: {
    timeSpent: number;
    errorRate: number;
    throughput: number;
  };
  afterMetrics: {
    timeSpent: number;
    errorRate: number;
    throughput: number;
  };
}

export interface OpportunityWithROI {
  id: string;
  title: string;
  description: string;
  category: OpportunityCategory;
  impactScore: number;
  difficultyScore: number;
  estimatedROI: {
    timeSavingsHours: number;
    costSavings: number;
    paybackPeriodMonths: number;
  };
  requiredIntegrations: string[];
  status: OpportunityStatus;
  identifiedAt: Date;
}

export interface WorkflowHealthWithDetails {
  workflowId: string;
  workflowName: string;
  healthScore: number;
  lastCalculated: Date;
  factors: {
    successRate: number;
    performanceTrend: number;
    errorPattern: number;
    businessImpact: number;
  };
  recommendations: HealthRecommendationWithTracking[];
  alerts: HealthAlertWithStatus[];
  trend: {
    period: string;
    score: number;
  }[];
}

export interface HealthRecommendationWithTracking {
  id: string;
  type: HealthRecommendationType;
  priority: HealthRecommendationPriority;
  title: string;
  description: string;
  estimatedImpact: string;
  implementationEffort: ImplementationEffort;
  isImplemented: boolean;
  implementedAt?: Date;
  effectivenessScore?: number;
}

export interface HealthAlertWithStatus {
  id: string;
  alertType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  threshold?: number;
  currentValue?: number;
  isAcknowledged: boolean;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  createdAt: Date;
}

export interface ReportSection {
  type: 'summary' | 'metrics' | 'opportunities' | 'health' | 'recommendations';
  title: string;
  content: any;
  visualizations?: ChartConfig[];
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  title: string;
  data: any[];
  xAxis?: string;
  yAxis?: string;
  colors?: string[];
}

export interface ExecutiveReportWithSections {
  id: string;
  title: string;
  period: {
    start: Date;
    end: Date;
  };
  sections: ReportSection[];
  branding: {
    companyName?: string;
    logoUrl?: string;
    primaryColor?: string;
  };
  format: 'pdf' | 'pptx' | 'web';
  generatedAt: Date;
  shareableLink?: string;
  linkExpiresAt?: Date;
  isPublic: boolean;
}

// API Request/Response types

export interface BusinessOutcomeRequest {
  workflowId: string;
  outcomeType: BusinessOutcomeType;
  value: number;
  metadata?: Record<string, any>;
}

export interface EfficiencyMetricRequest {
  workflowId: string;
  period: string;
  beforeMetrics: {
    timeSpent?: number;
    errorRate?: number;
    throughput?: number;
  };
  afterMetrics: {
    timeSpent?: number;
    errorRate?: number;
    throughput?: number;
  };
}

export interface OpportunityDismissalRequest {
  opportunityId: string;
  reason: string;
}

export interface OpportunityImplementationRequest {
  opportunityId: string;
  notes?: string;
}

export interface HealthAlertAcknowledgmentRequest {
  alertId: string;
  acknowledgedBy: string;
}

export interface ReportGenerationRequest {
  title: string;
  periodStart: Date;
  periodEnd: Date;
  format: 'pdf' | 'pptx' | 'web';
  sections: string[]; // Section types to include
  branding?: {
    companyName?: string;
    logoUrl?: string;
    primaryColor?: string;
  };
}

export interface ReportSharingRequest {
  reportId: string;
  isPublic: boolean;
  expirationDays?: number;
}

// Dashboard Analytics Types

export interface DashboardAnalytics {
  businessImpact: BusinessImpactMetrics;
  efficiencyComparisons: EfficiencyComparison[];
  opportunities: OpportunityWithROI[];
  workflowHealth: WorkflowHealthWithDetails[];
  recentAlerts: HealthAlertWithStatus[];
  topRecommendations: HealthRecommendationWithTracking[];
}

export interface AnalyticsFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  workflowIds?: string[];
  outcomeTypes?: BusinessOutcomeType[];
  opportunityCategories?: OpportunityCategory[];
  healthScoreRange?: {
    min: number;
    max: number;
  };
}