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

export interface SimplifiedMetricsResponse extends SimplifiedMetrics {}

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