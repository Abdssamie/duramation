export interface SimplifiedMetrics {
  workflowRunsThisMonth: {
    total: number;
    trend: number;
  };
  totalAutomationsExecuted: number;
  averageExecutionTime: number; // in seconds
  estimatedSavings: {
    timeHours: number;
    costUSD: number;
  };
  workflowSuccessRate: number; // percentage
  workflowFailureRate: number; // percentage
  activeWorkflows: {
    total: number;
    scheduled: number; // cron-based
    direct: number; // manually triggered
  };
  inactiveWorkflows: number;
  salesCalls: {
    scheduled: number;
    completed: number;
  };
  newWorkflowsThisMonth: number;
}

export interface ChartDataPoint {
  date: string; // ISO date string
  runs: number;
  trendValue?: number; // For trendline calculation
  movingAverage?: number; // For moving average
}

export interface WorkflowOption {
  id: string;
  name: string;
}

export type TimeRange = '7d' | '30d' | '90d';

export interface ChartFilters {
  timeRange: TimeRange;
  workflowId?: string;
  showTrendline?: boolean;
  showMovingAverage?: boolean;
}

export interface ChartDataResponse {
  data: ChartDataPoint[];
  availableWorkflows: WorkflowOption[];
  totalRuns: number;
  averageRuns: number;
  trendPercentage: number; // Overall trend for the period
}

export interface ServiceRequest {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requestedBy: string;
  assignedTo?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  description: string;
  category: 'automation' | 'integration' | 'support' | 'consultation';
  estimatedHours?: number;
}

export interface ServiceRequestsResponse {
  requests: ServiceRequest[];
  totalCount: number;
  pendingCount: number;
  inProgressCount: number;
  completedThisMonth: number;
}