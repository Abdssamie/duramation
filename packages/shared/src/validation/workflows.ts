import { z } from 'zod';
import { 
  idSchema, 
  paginationParamsSchema, 
  nonEmptyStringSchema, 
  optionalDateStringSchema 
} from './common.js';
import { apiResponseSchema, paginatedResponseSchema } from './api.js';

/**
 * Workflow validation schemas
 */

// Workflow input field schema
export const workflowInputFieldSchema = z.object({
  key: nonEmptyStringSchema,
  label: nonEmptyStringSchema,
  type: z.enum(['text', 'textarea', 'number', 'boolean', 'json', 'credential', 'email', 'url', 'date', 'time', 'file', 'select', 'multiselect', 'list']),
  required: z.boolean().default(false),
  defaultValue: z.any().optional(),
  options: z.array(z.string()).optional(), // For select/multiselect types
  validation: z.object({
    required: z.boolean().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
    options: z.array(z.string()).optional(),
    message: z.string().optional(),
  }).optional(),
});

// Workflow status enum
export const workflowStatusSchema = z.enum(['active', 'inactive', 'draft', 'archived']);

// Workflow run status enum
export const workflowRunStatusSchema = z.enum(['pending', 'running', 'completed', 'failed', 'cancelled']);

/**
 * Workflow List Request/Response Schemas
 */
export const workflowListRequestSchema = paginationParamsSchema.extend({
  status: workflowStatusSchema.optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const workflowSchema = z.object({
  id: idSchema,
  name: nonEmptyStringSchema,
  description: z.string().optional(),
  status: workflowStatusSchema,
  templateId: idSchema.optional(),
  configuration: z.record(z.string(), z.any()).optional(),
  inputFields: z.array(workflowInputFieldSchema).optional(),
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: idSchema,
  version: z.string().optional(),
  requiredScopes: z.array(z.string()).optional(),
});

export const workflowListResponseSchema = paginatedResponseSchema(workflowSchema);

/**
 * Workflow Create Request/Response Schemas
 */
export const workflowCreateRequestSchema = z.object({
  name: nonEmptyStringSchema,
  description: z.string().optional(),
  templateId: idSchema.optional(),
  configuration: z.record(z.string(), z.any()).optional(),
  inputFields: z.array(workflowInputFieldSchema).optional(),
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

export const workflowCreateResponseSchema = apiResponseSchema(workflowSchema);

/**
 * Workflow Update Request/Response Schemas
 */
export const workflowUpdateRequestSchema = z.object({
  name: nonEmptyStringSchema.optional(),
  description: z.string().optional(),
  configuration: z.record(z.string(), z.any()).optional(),
  input: z.record(z.string(), z.any()).optional(),
  inputFields: z.array(workflowInputFieldSchema).optional(),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export const workflowUpdateResponseSchema = apiResponseSchema(workflowSchema);

/**
 * Workflow Run Request/Response Schemas
 */
export const workflowRunRequestSchema = z.object({
  input: z.record(z.string(), z.any()).optional(),
  scheduledRun: z.boolean().default(false),
  cronExpression: z.string().optional(),
  timezone: z.string().default('UTC'),
  metadata: z.record(z.string(), z.any()).optional(),
}).refine(
  (data) => {
    // If scheduledRun is true, cronExpression is required
    if (data.scheduledRun && !data.cronExpression) {
      return false;
    }
    return true;
  },
  {
    message: 'cronExpression is required when scheduledRun is true',
    path: ['cronExpression'],
  }
);

export const workflowRunDataSchema = z.object({
  runId: idSchema,
  workflowId: idSchema,
  status: workflowRunStatusSchema,
  startedAt: z.string().datetime(),
  completedAt: optionalDateStringSchema,
  input: z.record(z.string(), z.any()).optional(),
  output: z.record(z.string(), z.any()).optional(),
  error: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const workflowRunResponseSchema = apiResponseSchema(workflowRunDataSchema);

/**
 * Workflow Get Request/Response Schemas
 */
export const workflowGetRequestSchema = z.object({
  id: idSchema,
  includeRuns: z.boolean().default(false),
  includeTemplate: z.boolean().default(false),
});

export const workflowWithExtrasSchema = workflowSchema.extend({
  runs: z.array(workflowRunDataSchema).optional(),
  template: z.object({
    id: idSchema,
    name: nonEmptyStringSchema,
    description: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }).optional(),
});

export const workflowGetResponseSchema = apiResponseSchema(workflowWithExtrasSchema);

/**
 * Workflow Delete Request/Response Schemas
 */
export const workflowDeleteRequestSchema = z.object({
  id: idSchema,
});

export const workflowDeleteResponseSchema = apiResponseSchema(z.object({
  deleted: z.boolean(),
}));

// Type inference helpers
export type WorkflowInputField = z.infer<typeof workflowInputFieldSchema>;
export type WorkflowStatus = z.infer<typeof workflowStatusSchema>;
export type WorkflowRunStatus = z.infer<typeof workflowRunStatusSchema>;
export type WorkflowListRequest = z.infer<typeof workflowListRequestSchema>;
export type WorkflowCreateRequest = z.infer<typeof workflowCreateRequestSchema>;
export type WorkflowUpdateRequest = z.infer<typeof workflowUpdateRequestSchema>;
export type WorkflowRunRequest = z.infer<typeof workflowRunRequestSchema>;
export type WorkflowRunData = z.infer<typeof workflowRunDataSchema>;
export type WorkflowGetRequest = z.infer<typeof workflowGetRequestSchema>;
export type WorkflowDeleteRequest = z.infer<typeof workflowDeleteRequestSchema>;