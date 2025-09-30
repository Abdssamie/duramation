import {channel, topic}  from "@inngest/realtime";
import { z } from "zod";

// Schema for workflow update messages
const WorkflowUpdateSchema = z.object({
  type: z.enum(['status', 'progress', 'log', 'result']),
  message: z.string(),
  timestamp: z.date().optional(),
  data: z.any().optional(),
});

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

// Type exports for use in components
export type WorkflowUpdate = z.infer<typeof WorkflowUpdateSchema>;
export type AIStream = z.infer<typeof AIStreamSchema>;

// Helper function to create workflow update messages
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
  };
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
