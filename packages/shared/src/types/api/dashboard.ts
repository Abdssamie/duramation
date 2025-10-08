/**
 * Dashboard endpoint types and interfaces
 */

import type { 
  SimplifiedMetrics, 
  ChartDataResponse, 
  ChartFilters,
  ServiceRequest,
  ServiceRequestsResponse,
  TimeRange 
} from '../dashboard-metrics.js';
import type { ApiResponse, QueryParams } from './common.js';

/**
 * Metrics Request/Response Types
 */
export interface MetricsRequest {
  timeRange?: TimeRange;
  workflowId?: string;
  includeProjections?: boolean;
}

export type MetricsResponse = ApiResponse<SimplifiedMetrics>;

/**
 * Chart Data Request/Response Types
 */
export interface ChartDataRequest extends ChartFilters {
  // Inherits all properties from ChartFilters
}

export type ChartDataApiResponse = ApiResponse<ChartDataResponse>;

/**
 * Service Request Create Request/Response Types
 */
export interface ServiceRequestCreateRequest {
  title: string;
  description: string;
  category: 'automation' | 'integration' | 'support' | 'consultation';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  estimatedHours?: number;
  assignedTo?: string;
}

export type ServiceRequestCreateResponse = ApiResponse<ServiceRequest>;

/**
 * Service Request List Request/Response Types
 */
export interface ServiceRequestListRequest extends QueryParams {
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  category?: 'automation' | 'integration' | 'support' | 'consultation';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  requestedBy?: string;
  createdAfter?: string; // ISO date string
  createdBefore?: string; // ISO date string
}

export type ServiceRequestListResponse = ApiResponse<ServiceRequestsResponse>;

/**
 * Service Request Update Request/Response Types
 */
export interface ServiceRequestUpdateRequest {
  title?: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  estimatedHours?: number;
}

export type ServiceRequestUpdateResponse = ApiResponse<ServiceRequest>;

/**
 * Service Request Get Request/Response Types
 */
export interface ServiceRequestGetRequest {
  id: string;
}

export type ServiceRequestGetResponse = ApiResponse<ServiceRequest>;

/**
 * Service Request Delete Request/Response Types
 */
export interface ServiceRequestDeleteRequest {
  id: string;
}

export type ServiceRequestDeleteResponse = ApiResponse<{ deleted: boolean }>;

/**
 * Dashboard Summary Request/Response Types
 */
export interface DashboardSummaryRequest {
  timeRange?: TimeRange;
  includeChartData?: boolean;
  includeServiceRequests?: boolean;
}

export interface DashboardSummaryData {
  metrics: SimplifiedMetrics;
  chartData?: ChartDataResponse;
  serviceRequests?: ServiceRequestsResponse;
}

export type DashboardSummaryResponse = ApiResponse<DashboardSummaryData>;