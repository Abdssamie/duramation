/**
 * Realtime workflow updates with type-safe data structures
 * 
 * This module provides strongly typed schemas for workflow updates and AI streams,
 * preventing the use of 'any' types and enabling better type safety throughout the app.
 * 
 * Usage example:
 * ```typescript
 * const { logs, currentProgress, hasErrors, isComplete } = useWorkflowRealtime({
 *   workflowId: 'workflow-123',
 *   enabled: true,
 *   bufferInterval: 2000
 * });
 * 
 * // Type-safe data access
 * logs.forEach(log => {
 *   if (isProgressUpdate(log.data)) {
 *     console.log(`Progress: ${log.data.percentage}%`);
 *   }
 * });
 * ```
 */

import { Realtime, channel, topic } from '@inngest/realtime';
import z from 'zod';
import { InngestSubscription } from '@inngest/realtime/hooks';

// Define specific data schemas for different update types
const StatusDataSchema = z.object({
  status: z.enum(['started', 'running', 'completed', 'failed', 'cancelled']),
  stepId: z.string().optional(),
  stepName: z.string().optional(),
}).optional();

const ProgressDataSchema = z.object({
  current: z.number(),
  total: z.number(),
  percentage: z.number().min(0).max(100),
  stepId: z.string().optional(),
  stepName: z.string().optional(),
  estimatedTimeRemaining: z.number().optional(), // in milliseconds
}).optional();

const LogDataSchema = z.object({
  level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  stepId: z.string().optional(),
  stepName: z.string().optional(),
  context: z.record(z.string(), z.any()).optional(),
}).optional();

const ResultDataSchema = z.object({
  success: z.boolean(),
  output: z.any().optional(),
  error: z.string().optional(),
  stepId: z.string().optional(),
  stepName: z.string().optional(),
  executionTime: z.number().optional(), // in milliseconds
}).optional();

// Define error data schema
const ErrorDataSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  stepId: z.string().optional(),
  stepName: z.string().optional(),
  stack: z.string().optional(),
  attemptNumber: z.number().optional(),
  maxAttempts: z.number().optional(),
}).optional();

// Create discriminated union for type-safe data
export const WorkflowUpdateSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('status'),
    message: z.string(),
    timestamp: z.date().optional(),
    data: StatusDataSchema,
  }),
  z.object({
    type: z.literal('progress'),
    message: z.string(),
    timestamp: z.date().optional(),
    data: ProgressDataSchema,
  }),
  z.object({
    type: z.literal('log'),
    message: z.string(),
    timestamp: z.date().optional(),
    data: LogDataSchema,
  }),
  z.object({
    type: z.literal('result'),
    message: z.string(),
    timestamp: z.date().optional(),
    data: ResultDataSchema,
  }),
  z.object({
    type: z.literal('error'),
    message: z.string(),
    timestamp: z.date().optional(),
    data: ErrorDataSchema,
  }),
]);

// Schema for AI streaming messages
const AIStreamSchema = z.object({
  chunk: z.string(),
  isComplete: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional()
});

// Define channel for workflow realtime updates
// Channel per running workflow: user:{userId}:workflow:{workflowId}
export const workflowChannel = channel(
  (userId: string, workflowId: string) =>
    `user:${userId}:workflow:${workflowId}`
)
  .addTopic(topic('updates').schema(WorkflowUpdateSchema))
  .addTopic(topic('ai-stream').schema(AIStreamSchema));

export type WorkflowToken = Realtime.Token<
  typeof workflowChannel,
  ['updates', 'ai-stream']
>;

// Export inferred types for better TypeScript support
export type WorkflowUpdate = z.infer<typeof WorkflowUpdateSchema>;
// export type AIStream = z.infer<typeof AIStreamSchema>;

// Utility types for specific update types
export type StatusUpdate = WorkflowUpdate & { type: 'status' };
export type ProgressUpdate = WorkflowUpdate & { type: 'progress' };
export type LogUpdate = WorkflowUpdate & { type: 'log' };
export type ResultUpdate = WorkflowUpdate & { type: 'result' };
export type ErrorUpdate = WorkflowUpdate & { type: 'error' };

// select only the first type for updates, where the parameter type is "updates "
export type Update = InngestSubscription<WorkflowToken>['data'][number] & {
  topic: 'updates';
};

// Type guard functions for better type safety
export const isStatusUpdate = (update: WorkflowUpdate): update is StatusUpdate => {
  return update.type === 'status';
};

export const isProgressUpdate = (update: WorkflowUpdate): update is ProgressUpdate => {
  return update.type === 'progress';
};

export const isLogUpdate = (update: WorkflowUpdate): update is LogUpdate => {
  return update.type === 'log';
};

export const isResultUpdate = (update: WorkflowUpdate): update is ResultUpdate => {
  return update.type === 'result';
};

export const isErrorUpdate = (update: WorkflowUpdate): update is ErrorUpdate => {
  return update.type === 'error';
};

// Helper functions to create typed updates


export const isWorkflowComplete = (update: WorkflowUpdate): boolean => {
  if (isStatusUpdate(update)) {
    return update.data?.status === 'completed' || update.data?.status === 'failed' || update.data?.status === 'cancelled';
  }
  return !!isResultUpdate(update);
};

export const isWorkflowError = (update: WorkflowUpdate): boolean => {
  if (isErrorUpdate(update)) {
    return true;
  }
  if (isStatusUpdate(update)) {
    return update.data?.status === 'failed';
  }
  if (isLogUpdate(update)) {
    return update.data?.level === 'error';
  }
  if (isResultUpdate(update)) {
    return update.data?.success === false;
  }
  return false;
};

// Helper to format update messages with context
export const formatUpdateMessage = (update: WorkflowUpdate): string => {
  const stepInfo = (() => {
    if (isStatusUpdate(update) && update.data?.stepName) {
      return `[${update.data.stepName}] `;
    }
    if (isProgressUpdate(update) && update.data?.stepName) {
      return `[${update.data.stepName}] `;
    }
    if (isLogUpdate(update) && update.data?.stepName) {
      return `[${update.data.stepName}] `;
    }
    if (isResultUpdate(update) && update.data?.stepName) {
      return `[${update.data.stepName}] `;
    }
    return '';
  })();

  return `${stepInfo}${update.message}`;
};
