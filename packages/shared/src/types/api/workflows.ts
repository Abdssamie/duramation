/**
 * Workflow endpoint types and interfaces
 */

import type { Workflow, WorkflowTemplate } from '../workflow.js';
import type { ApiResponse, PaginatedResponse, QueryParams } from './common.js';

/**
 * Workflow List Request/Response Types
 */
export interface WorkflowListRequest extends QueryParams {
  status?: 'active' | 'inactive' | 'draft';
  category?: string;
  tags?: string[];
}

export type WorkflowListResponse = PaginatedResponse<Workflow>;

/**
 * Workflow Create Request/Response Types
 */
export interface WorkflowCreateRequest {
  name: string;
  description?: string;
  templateId?: string;
  configuration?: Record<string, any>;
  inputFields?: Array<{
    key: string;
    label: string;
    type: string;
    required?: boolean;
    defaultValue?: any;
  }>;
  tags?: string[];
  isActive?: boolean;
}

export type WorkflowCreateResponse = ApiResponse<Workflow>;

/**
 * Workflow Update Request/Response Types
 */
export interface WorkflowUpdateRequest {
  name?: string;
  description?: string;
  configuration?: Record<string, any>;
  input?: Record<string, any>;
  inputFields?: Array<{
    key: string;
    label: string;
    type: string;
    required?: boolean;
    defaultValue?: any;
  }>;
  tags?: string[];
  isActive?: boolean;
}

export type WorkflowUpdateResponse = ApiResponse<Workflow>;

/**
 * Workflow Run Request/Response Types
 */
export interface WorkflowRunRequest {
  input?: Record<string, any>;
  scheduledRun?: boolean;
  cronExpression?: string;
  timezone?: string;
  metadata?: Record<string, any>;
}

export interface WorkflowRunData {
  runId: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  startedAt: string;
  completedAt?: string;
  input?: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  metadata?: Record<string, any>;
}

export type WorkflowRunResponse = ApiResponse<WorkflowRunData>;

/**
 * Workflow Get Request/Response Types
 */
export interface WorkflowGetRequest {
  id: string;
  includeRuns?: boolean;
  includeTemplate?: boolean;
}

export type WorkflowGetResponse = ApiResponse<Workflow & {
  runs?: WorkflowRunData[];
  template?: WorkflowTemplate;
}>;

/**
 * Workflow Delete Request/Response Types
 */
export interface WorkflowDeleteRequest {
  id: string;
}

export type WorkflowDeleteResponse = ApiResponse<{ deleted: boolean }>;