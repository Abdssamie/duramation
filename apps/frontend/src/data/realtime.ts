import { Realtime, channel, topic } from '@inngest/realtime';
import z from 'zod';
import { InngestSubscription } from '@inngest/realtime/hooks';

export const WorkflowUpdateSchema = z.object({
  type: z.enum(['status', 'progress', 'log', 'result']),
  message: z.string(),
  timestamp: z.date().optional(),
  data: z.any().optional()
});

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

// select only the first type for updates, where the parameter type is "updates "
export type Update = InngestSubscription<WorkflowToken>['data'][number] & {
  topic: 'updates';
};
