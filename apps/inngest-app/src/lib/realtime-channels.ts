import {channel, topic}  from "@inngest/realtime";
import { z } from "zod";

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

const ErrorDataSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  stepId: z.string().optional(),
  stepName: z.string().optional(),
  stack: z.string().optional(),
}).optional();

// Create discriminated union for type-safe data
const WorkflowUpdateSchema = z.discriminatedUnion('type', [
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
  metadata: z.record(z.string(), z.any()).optional(),
});

// Define channel for workflow realtime updates
// Channel per running workflow: user:{userId}:workflow:{workflowId}
export const workflowChannel = channel((userId: string, workflowId: string) =>
  `user:${userId}:workflow:${workflowId}`
)
  .addTopic(
    topic("updates").schema(WorkflowUpdateSchema)
  )
  .addTopic(
    topic("ai-stream").schema(AIStreamSchema)
  );

// Export inferred types for better TypeScript support
export type WorkflowUpdate = z.infer<typeof WorkflowUpdateSchema>;
export type AIStream = z.infer<typeof AIStreamSchema>;

export type StatusData = z.infer<typeof StatusDataSchema>;
export type ProgressData = z.infer<typeof ProgressDataSchema>;
export type LogData = z.infer<typeof LogDataSchema>;
export type ResultData = z.infer<typeof ResultDataSchema>;
export type ErrorData = z.infer<typeof ErrorDataSchema>;

// Utility types for specific update types
export type StatusUpdate = WorkflowUpdate & { type: 'status' };
export type ProgressUpdate = WorkflowUpdate & { type: 'progress' };
export type LogUpdate = WorkflowUpdate & { type: 'log' };
export type ResultUpdate = WorkflowUpdate & { type: 'result' };
export type ErrorUpdate = WorkflowUpdate & { type: 'error' };

// Helper functions to create typed updates
export const createStatusUpdate = (
  message: string, 
  data: StatusData,
  timestamp?: Date
): StatusUpdate => ({
  type: 'status',
  message,
  data,
  timestamp
});

export const createProgressUpdate = (
  message: string,
  data: ProgressData,
  timestamp?: Date
): ProgressUpdate => ({
  type: 'progress',
  message,
  data,
  timestamp
});

export const createLogUpdate = (
  message: string,
  data: LogData,
  timestamp?: Date
): LogUpdate => ({
  type: 'log',
  message,
  data,
  timestamp
});

export const createResultUpdate = (
  message: string,
  data: ResultData,
  timestamp?: Date
): ResultUpdate => ({
  type: 'result',
  message,
  data,
  timestamp
});

export const createErrorUpdate = (
  message: string,
  data: ErrorData,
  timestamp?: Date
): ErrorUpdate => ({
  type: 'error',
  message,
  data,
  timestamp
});

// Generic helper function for backward compatibility
export function createWorkflowUpdate(
  type: WorkflowUpdate['type'],
  message: string,
  data?: any
): WorkflowUpdate {
  return {
    type,
    message,
    timestamp: new Date(),
    data,
  } as WorkflowUpdate;
}

// Helper function to create AI stream messages
export function createAIStream(
  chunk: string,
  isComplete: boolean = false,
  metadata?: Record<string, any>
): AIStream {
  return {
    chunk,
    isComplete,
    metadata,
  };
}
