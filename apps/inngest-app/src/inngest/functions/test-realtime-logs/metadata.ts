import { z } from "zod";
import { Prisma } from '@duramation/db';
import {
  WorkflowInputFieldDefinition,
  WorkflowTemplate,
} from '@duramation/shared';

type JsonValue = Prisma.JsonValue;

// Field definitions for Test Realtime Logs template
export const TestRealtimeLogsFields: WorkflowInputFieldDefinition[] = [
  {
    key: 'message',
    label: 'Test Message',
    description: 'Optional custom message to include in the test logs',
    type: 'text',
    defaultValue: 'Testing realtime logs functionality',
    validation: {
      max: 200,
    },
  },
];

// Test Realtime Logs template definition
export const TestRealtimeLogsTemplate: WorkflowTemplate = {
  id: 'test-realtime-logs',
  name: 'Test Realtime Logs',
  description:
    'A comprehensive test workflow that demonstrates all realtime logging capabilities including status updates, progress tracking, regular logs, AI streaming, and completion notifications. Perfect for testing and debugging realtime log functionality.',
  eventName: 'workflow/test.realtime.logs',
  canBeScheduled: false, // This is a test workflow, typically not scheduled
  requiredProviders: [],
  restrictedToUsers: ['*'], // Available to all users for testing
  requiredScopes: {},
  fields: TestRealtimeLogsFields as unknown as JsonValue,
  tags: ['testing', 'realtime', 'logs', 'debugging', 'monitoring', 'ai-streaming'],
  version: '1.0.0',
};

// Input schema & type for Test Realtime Logs
export const WorkflowTestRealtimeLogsInputSchema = z.object({
  message: z.string().max(200).default('Testing realtime logs functionality').optional(),
});
export type WorkflowTestRealtimeLogsInput = z.infer<typeof WorkflowTestRealtimeLogsInputSchema>;

// Event schema & type for workflow/test.realtime.logs event
export const WorkflowTestRealtimeLogsEventSchema = z.object({
  input: WorkflowTestRealtimeLogsInputSchema,
  scheduledRun: z.boolean().optional(),
  workflowId: z.string(),
  cronExpression: z.string().nullable().optional(),
  tz: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string(),
});
export type WorkflowTestRealtimeLogsEvent = z.infer<typeof WorkflowTestRealtimeLogsEventSchema>;