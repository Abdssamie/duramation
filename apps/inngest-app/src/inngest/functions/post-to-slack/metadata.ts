import { z } from "zod";
import { Prisma, Provider } from '@duramation/db';
import {
  WorkflowInputFieldDefinition,
  WorkflowTemplate,
} from '@duramation/shared';

type JsonValue = Prisma.JsonValue;

// Field definitions for Post to Slack template
export const PostToSlackFields: WorkflowInputFieldDefinition[] = [
  {
    key: 'channel',
    label: 'Slack Channel',
    description: 'The channel to post to (e.g., #general or channel ID)',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
  {
    key: 'message',
    label: 'Message',
    description: 'The message to post to Slack',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
];

// Post to Slack template definition
export const PostToSlackTemplate: WorkflowTemplate = {
  id: 'post-to-slack',
  name: 'Post to Slack',
  description: 'Send messages to Slack channels automatically',
  eventName: 'workflow/slack.post',
  canBeScheduled: true,
  requiredProviders: [Provider.slack],
  requiredScopes: {
    [Provider.slack]: [
      'chat:write',
      'channels:read',
    ],
  },
  restrictedToUsers: ['*'],
  fields: PostToSlackFields as unknown as JsonValue,
  tags: ['slack', 'messaging', 'automation', 'notifications'],
  version: '1.0.0',
};

// Input schema & type for PostToSlack
export const WorkflowPostToSlackInputSchema = z.object({
  channel: z.string().min(1),
  message: z.string().min(1),
});
export type WorkflowPostToSlackInput = z.infer<typeof WorkflowPostToSlackInputSchema>;

// Event schema & type for workflow/slack.post event
export const WorkflowPostToSlackEventSchema = z.object({
  input: WorkflowPostToSlackInputSchema,
  scheduledRun: z.boolean().optional(),
  workflowId: z.string(),
  cronExpression: z.string().nullable().optional(),
  tz: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string(),
});
export type WorkflowPostToSlackEvent = z.infer<typeof WorkflowPostToSlackEventSchema>;
