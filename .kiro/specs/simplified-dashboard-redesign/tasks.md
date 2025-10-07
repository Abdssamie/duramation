# Implementation Plan

- [x] 1. Create simplified metrics API endpoint
  - Create new API route `/api/dashboard/metrics` that returns all essential KPIs in a single response
  - Implement database queries for workflow runs, execution times, success rates, and workflow counts
  - Add trend calculations comparing current month to previous month data
  - Implement caching strategy to ensure sub-2-second response times with upstash redis
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 4.1, 4.2, 4.4_

- [ ]* 1.1 Write unit tests for metrics calculations
  - Create tests for trend calculation functions
  - Test time savings estimation logic
  - Validate success/failure rate calculations
  - _Requirements: 1.1, 1.4, 1.5_

- [x] 2. Implement chart data endpoint for workflow runs over time
  - Create API endpoint for chart data with time range filtering (7d, 30d, 90d)
  - Add workflow-specific filtering capability
  - Implement data aggregation by day/week based on time range
  - Calculate trendline and moving average data points
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ]* 2.1 Write integration tests for chart API
  - Test different time range filters
  - Validate workflow-specific filtering
  - Test data aggregation accuracy
  - _Requirements: 2.4, 2.5_

- [x] 3. Update dashboard layout component with simplified metrics
  - Modify existing `OverViewLayout` component to use new simplified metrics API
  - Replace current complex metrics with 8 essential KPI cards
  - Update card content to show workflow runs, automations executed, execution time, savings, success rates, active/inactive workflows, sales calls, and new workflows
  - Maintain existing grid layout and styling classes
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 3.1, 3.3, 3.5_

- [x] 4. Create workflow runs chart component
  - Build new chart component using existing chart library
  - Implement line/area chart displaying workflow runs over time
  - Add time range filter controls (7d, 30d, 90d buttons)
  - Implement workflow-specific filtering dropdown
  - Add trendline overlay functionality
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ]* 4.1 Write component tests for chart functionality
  - Test chart rendering with different data sets
  - Validate filter interactions
  - Test responsive behavior
  - _Requirements: 2.4, 2.5_

- [x] 5. Replace existing chart slots with simplified chart
  - Update parallel route slots to use new workflow runs chart
  - Remove complex chart components that exceed MVP scope
  - Maintain existing 2-column grid layout for chart section
  - Ensure chart integrates seamlessly with current layout structure
  - _Requirements: 2.1, 3.2, 3.4_

- [x] 6. Add loading states and error handling
  - Implement skeleton loading components for KPI cards
  - Add loading states for chart data fetching
  - Create error boundaries for graceful error handling
  - Add retry functionality for failed API calls
  - Display appropriate messages when data is unavailable
  - _Requirements: 4.3, 4.5, 4.6_

- [ ]* 6.1 Write error handling tests
  - Test various error scenarios
  - Validate loading state transitions
  - Test retry functionality
  - _Requirements: 4.5, 4.6_

- [x] 7. Optimize performance and data freshness
  - Implement client-side caching for dashboard metrics
  - Add automatic data refresh every 5 minutes
  - Optimize chart rendering performance for large datasets
  - Ensure dashboard loads within 2-second requirement
  - Add performance monitoring and metrics collection
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ]* 7.1 Write performance tests
  - Test dashboard load times under various conditions
  - Validate memory usage optimization
  - Test chart performance with large datasets
  - _Requirements: 4.1, 4.3_

- [x] 8.
 Implement automated database model updates for dashboard metrics
  - Create WorkflowRun record creation middleware to ensure all workflow executions are tracked
  - Implement AutomationMetrics aggregation service to calculate daily performance metrics
  - Add database triggers or scheduled jobs to update AutomationMetrics when WorkflowRun records change
  - Create ServiceRequest status change handlers to update dashboard metrics in real-time
  - Implement cache invalidation strategy when underlying data models change
  - _Requirements: 4.2, 4.4, 4.6_

- [x] 8.1 Create WorkflowRun tracking middleware
  - Implement middleware to create WorkflowRun records when workflows start
  - Add proper error handling and retry logic for database operations
  - Ensure idempotency keys are properly managed for duplicate prevention
  - Add logging for workflow execution tracking
  - _Requirements: 4.2, 4.4_

- [x] 8.2 Implement AutomationMetrics aggregation service
  - Create scheduled job to calculate daily AutomationMetrics from WorkflowRun data
  - Implement aggregation logic for runs count, success/failure rates, and average duration
  - Add ROI calculations for time saved and cost savings metrics
  - Create upsert logic to handle existing metrics records
  - _Requirements: 1.4, 1.5, 4.2_

- [x] 8.3 Add real-time cache invalidation for dashboard data
  - Implement cache invalidation when WorkflowRun records are created or updated
  - Add cache invalidation for ServiceRequest status changes
  - Create webhook handlers to invalidate frontend cache when data changes
  - Implement Redis pub/sub for real-time dashboard updates
  - _Requirements: 4.2, 4.4, 4.6_

- [ ]* 8.4 Write integration tests for database model updates
  - Test WorkflowRun creation and update flows
  - Validate AutomationMetrics aggregation accuracy
  - Test cache invalidation scenarios
  - Verify real-time update mechanisms
  - _Requirements: 4.2, 4.4_