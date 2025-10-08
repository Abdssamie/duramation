import { z } from 'zod';
import { 
  idSchema, 
  paginationParamsSchema, 
  nonEmptyStringSchema, 
  optionalDateStringSchema,
  positiveNumberSchema,
  nonNegativeNumberSchema,
  dateRangeSchema 
} from './common.js';
import { apiResponseSchema, paginatedResponseSchema } from './api.js';

/**
 * Dashboard validation schemas
 */

// Time range enum
export const timeRangeSchema = z.enum(['1h', '24h', '7d', '30d', '90d', 'custom']);

// Service request category enum
export const serviceRequestCategorySchema = z.enum(['automation', 'integration', 'support', 'consultation']);

// Service request priority enum
export const serviceRequestPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);

// Service request status enum
export const serviceRequestStatusSchema = z.enum(['pending', 'in_progress', 'completed', 'cancelled']);

/**
 * Metrics Request/Response Schemas
 */
export const metricsRequestSchema = z.object({
  timeRange: timeRangeSchema.optional(),
  workflowId: idSchema.optional(),
  includeProjections: z.boolean().default(false),
});

export const simplifiedMetricsSchema = z.object({
  totalWorkflows: nonNegativeNumberSchema,
  activeWorkflows: nonNegativeNumberSchema,
  totalRuns: nonNegativeNumberSchema,
  successfulRuns: nonNegativeNumberSchema,
  failedRuns: nonNegativeNumberSchema,
  successRate: z.number().min(0).max(100),
  avgExecutionTime: nonNegativeNumberSchema,
  totalCredentials: nonNegativeNumberSchema,
  validCredentials: nonNegativeNumberSchema,
  expiredCredentials: nonNegativeNumberSchema,
  pendingServiceRequests: nonNegativeNumberSchema,
  completedServiceRequests: nonNegativeNumberSchema,
  projections: z.object({
    expectedRuns: nonNegativeNumberSchema,
    estimatedSuccessRate: z.number().min(0).max(100),
    resourceUtilization: z.number().min(0).max(100),
  }).optional(),
});

export const metricsResponseSchema = apiResponseSchema(simplifiedMetricsSchema);

/**
 * Chart Data Request/Response Schemas
 */
export const chartFiltersSchema = z.object({
  timeRange: timeRangeSchema.optional(),
  workflowId: idSchema.optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  granularity: z.enum(['hour', 'day', 'week', 'month']).default('day'),
}).refine(
  (data) => {
    // If timeRange is custom, startDate and endDate are required
    if (data.timeRange === 'custom' && (!data.startDate || !data.endDate)) {
      return false;
    }
    // If startDate and endDate are provided, validate the range
    if (data.startDate && data.endDate && new Date(data.startDate) >= new Date(data.endDate)) {
      return false;
    }
    return true;
  },
  {
    message: 'Invalid date range: startDate and endDate are required for custom time range, and startDate must be before endDate',
    path: ['endDate'],
  }
);

export const chartDataPointSchema = z.object({
  timestamp: z.iso.datetime(),
  value: z.number(),
  label: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const chartDataResponseSchema = z.object({
  workflowRuns: z.array(chartDataPointSchema),
  successRate: z.array(chartDataPointSchema),
  executionTime: z.array(chartDataPointSchema),
  errorRate: z.array(chartDataPointSchema),
  credentialHealth: z.array(chartDataPointSchema),
});

export const chartDataApiResponseSchema = apiResponseSchema(chartDataResponseSchema);

/**
 * Service Request Schemas
 */
export const serviceRequestSchema = z.object({
  id: idSchema,
  title: nonEmptyStringSchema,
  description: nonEmptyStringSchema,
  category: serviceRequestCategorySchema,
  priority: serviceRequestPrioritySchema.default('medium'),
  status: serviceRequestStatusSchema.default('pending'),
  estimatedHours: positiveNumberSchema.optional(),
  actualHours: nonNegativeNumberSchema.optional(),
  assignedTo: idSchema.optional(),
  requestedBy: idSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  completedAt: optionalDateStringSchema,
  metadata: z.record(z.string(), z.any()).optional(),
});

/**
 * Service Request Create Request/Response Schemas
 */
export const serviceRequestCreateRequestSchema = z.object({
  title: nonEmptyStringSchema,
  description: nonEmptyStringSchema,
  category: serviceRequestCategorySchema,
  priority: serviceRequestPrioritySchema.default('medium'),
  estimatedHours: positiveNumberSchema.optional(),
  assignedTo: idSchema.optional(),
  businessProcess: nonEmptyStringSchema,
  desiredOutcome: nonEmptyStringSchema,
  preferredMeetingDate: z.string().optional(),
  availabilityNotes: z.string().optional(),
});

export const serviceRequestCreateResponseSchema = apiResponseSchema(serviceRequestSchema);

/**
 * Service Request List Request/Response Schemas
 */
export const serviceRequestListRequestSchema = paginationParamsSchema.extend({
  status: serviceRequestStatusSchema.optional(),
  category: serviceRequestCategorySchema.optional(),
  priority: serviceRequestPrioritySchema.optional(),
  assignedTo: idSchema.optional(),
  requestedBy: idSchema.optional(),
  createdAfter: z.iso.datetime().optional(),
  createdBefore: z.iso.datetime().optional(),
});

export const serviceRequestsResponseSchema = z.object({
  requests: z.array(serviceRequestSchema),
  summary: z.object({
    total: nonNegativeNumberSchema,
    pending: nonNegativeNumberSchema,
    inProgress: nonNegativeNumberSchema,
    completed: nonNegativeNumberSchema,
    cancelled: nonNegativeNumberSchema,
  }),
});

export const serviceRequestListResponseSchema = apiResponseSchema(serviceRequestsResponseSchema);

/**
 * Service Request Update Request/Response Schemas
 */
export const serviceRequestUpdateRequestSchema = z.object({
  title: nonEmptyStringSchema.optional(),
  description: nonEmptyStringSchema.optional(),
  status: serviceRequestStatusSchema.optional(),
  priority: serviceRequestPrioritySchema.optional(),
  assignedTo: idSchema.optional(),
  estimatedHours: positiveNumberSchema.optional(),
  actualHours: nonNegativeNumberSchema.optional(),
});

export const serviceRequestUpdateResponseSchema = apiResponseSchema(serviceRequestSchema);

/**
 * Service Request Get Request/Response Schemas
 */
export const serviceRequestGetRequestSchema = z.object({
  id: idSchema,
});

export const serviceRequestGetResponseSchema = apiResponseSchema(serviceRequestSchema);

/**
 * Service Request Delete Request/Response Schemas
 */
export const serviceRequestDeleteRequestSchema = z.object({
  id: idSchema,
});

export const serviceRequestDeleteResponseSchema = apiResponseSchema(z.object({
  deleted: z.boolean(),
}));

/**
 * Dashboard Summary Request/Response Schemas
 */
export const dashboardSummaryRequestSchema = z.object({
  timeRange: timeRangeSchema.optional(),
  includeChartData: z.boolean().default(false),
  includeServiceRequests: z.boolean().default(false),
});

export const dashboardSummaryDataSchema = z.object({
  metrics: simplifiedMetricsSchema,
  chartData: chartDataResponseSchema.optional(),
  serviceRequests: serviceRequestsResponseSchema.optional(),
});

export const dashboardSummaryResponseSchema = apiResponseSchema(dashboardSummaryDataSchema);

// Type inference helpers
export type TimeRange = z.infer<typeof timeRangeSchema>;
export type ServiceRequestCategory = z.infer<typeof serviceRequestCategorySchema>;
export type ServiceRequestPriority = z.infer<typeof serviceRequestPrioritySchema>;
export type ServiceRequestStatus = z.infer<typeof serviceRequestStatusSchema>;
export type MetricsRequest = z.infer<typeof metricsRequestSchema>;
export type SimplifiedMetrics = z.infer<typeof simplifiedMetricsSchema>;
export type ChartFilters = z.infer<typeof chartFiltersSchema>;
export type ChartDataPoint = z.infer<typeof chartDataPointSchema>;
export type ChartDataResponse = z.infer<typeof chartDataResponseSchema>;
export type ServiceRequest = z.infer<typeof serviceRequestSchema>;
export type ServiceRequestCreateRequest = z.infer<typeof serviceRequestCreateRequestSchema>;
export type ServiceRequestListRequest = z.infer<typeof serviceRequestListRequestSchema>;
export type ServiceRequestsResponse = z.infer<typeof serviceRequestsResponseSchema>;
export type ServiceRequestUpdateRequest = z.infer<typeof serviceRequestUpdateRequestSchema>;
export type ServiceRequestGetRequest = z.infer<typeof serviceRequestGetRequestSchema>;
export type ServiceRequestDeleteRequest = z.infer<typeof serviceRequestDeleteRequestSchema>;
export type DashboardSummaryRequest = z.infer<typeof dashboardSummaryRequestSchema>;
export type DashboardSummaryData = z.infer<typeof dashboardSummaryDataSchema>;