# Design Document

## Overview

The simplified dashboard redesign focuses on delivering essential KPIs through a clean, performant interface that maintains the existing layout structure. The design emphasizes immediate business value by displaying core workflow metrics, automation statistics, and trend visualization while reducing complexity from the current implementation.

## Architecture

### Component Structure
- **Layout Component**: Maintains existing `OverViewLayout` structure with parallel routes
- **KPI Cards**: Simplified metric cards focusing on 8 core KPIs
- **Chart Component**: Single workflow runs over time chart with filtering capabilities
- **Data Layer**: Streamlined API calls for essential metrics only

### Data Flow
1. Server-side data fetching in layout component using existing auth pattern
2. Single API endpoint for all dashboard metrics to reduce network calls
3. Client-side chart filtering and time range selection
4. Real-time data updates through optimized API calls

## Components and Interfaces

### Core Components

#### 1. SimplifiedMetricsCards
```typescript
interface SimplifiedMetrics {
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
```

#### 2. WorkflowRunsChart
```typescript
interface ChartData {
  date: string;
  runs: number;
}

interface ChartFilters {
  timeRange: '7d' | '30d' | '90d';
  workflowId?: string;
  showTrendline: boolean;
}

interface WorkflowOption {
  id: string;
  name: string;
}
```

### API Interfaces

#### Dashboard Metrics Endpoint
```typescript
// GET /api/dashboard/simplified-metrics
interface SimplifiedMetricsResponse {
  metrics: SimplifiedMetrics;
  chartData: ChartData[];
  availableWorkflows: WorkflowOption[];
}
```

## Data Models

### Database Queries Required

1. **Workflow Runs This Month**
   - Count of workflow executions in current month
   - Comparison with previous month for trend calculation

2. **Total Automations Executed**
   - Lifetime count of all workflow executions

3. **Average Execution Time**
   - Mean duration of workflow executions (last 30 days)

4. **Estimated Savings**
   - Time saved calculation based on workflow execution time vs manual time
   - Cost savings based on hourly rate assumptions

5. **Success/Failure Rates**
   - Percentage of successful vs failed workflow runs (last 30 days)

6. **Active/Inactive Workflows**
   - Count of workflows by status and trigger type (scheduled vs direct)

7. **Sales Calls**
   - Count of scheduled and completed sales calls (current month)

8. **New Workflows**
   - Count of workflows created in current month

9. **Chart Data**
   - Daily/weekly workflow run counts for selected time range

### Data Calculations

#### Trend Calculation
```typescript
const calculateTrend = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};
```

#### Time Savings Estimation
```typescript
const estimateTimeSavings = (
  totalRuns: number,
  avgExecutionTime: number,
  estimatedManualTime: number
): number => {
  const automationTimeHours = (totalRuns * avgExecutionTime) / 3600;
  const manualTimeHours = (totalRuns * estimatedManualTime) / 3600;
  return Math.max(0, manualTimeHours - automationTimeHours);
};
```

## Error Handling

### API Error Scenarios
1. **Authentication Failure**: Redirect to sign-in page
2. **Network Timeout**: Show cached data with stale indicator
3. **Data Unavailable**: Display skeleton loaders with retry option
4. **Partial Data**: Show available metrics, indicate missing data

### Chart Error Handling
1. **No Data**: Display empty state with helpful message
2. **Invalid Date Range**: Default to 30-day view
3. **Filtering Errors**: Reset to default filters

### Fallback Strategies
```typescript
const MetricCard = ({ value, isLoading, error }: MetricCardProps) => {
  if (error) return <ErrorState onRetry={refetch} />;
  if (isLoading) return <SkeletonCard />;
  return <MetricDisplay value={value} />;
};
```

## Testing Strategy

### Unit Tests
- Metric calculation functions
- Trend calculation accuracy
- Data formatting utilities
- Error handling scenarios

### Integration Tests
- API endpoint responses
- Database query performance
- Authentication flow
- Chart data transformation

### Component Tests
- KPI card rendering with various data states
- Chart filtering functionality
- Loading and error states
- Responsive layout behavior

### Performance Tests
- Dashboard load time under 2 seconds
- Chart rendering with large datasets
- Memory usage optimization
- API response time monitoring

## Implementation Approach

### Phase 1: Backend API Updates
1. Create simplified metrics endpoint
2. Optimize database queries for performance
3. Implement caching strategy for frequently accessed data
4. Add error handling and validation

### Phase 2: Frontend Component Updates
1. Update existing layout component to use new API
2. Simplify KPI cards to show only essential metrics
3. Replace complex charts with single workflow runs chart
4. Implement client-side filtering

### Phase 3: Performance Optimization
1. Add loading states and skeleton components
2. Implement error boundaries
3. Optimize chart rendering performance
4. Add data caching on frontend

### Migration Strategy
- Maintain existing API endpoints during transition
- Feature flag new dashboard for gradual rollout
- A/B test simplified vs complex dashboard
- Monitor performance metrics and user engagement