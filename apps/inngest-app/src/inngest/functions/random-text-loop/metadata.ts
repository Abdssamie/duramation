import { z } from "zod";
import { Prisma } from '@duramation/db';
import {
  WorkflowInputFieldDefinition,
  WorkflowTemplate,
} from '@duramation/shared';

type JsonValue = Prisma.JsonValue;

// Field definitions for Random Text Loop template
export const RandomTextLoopFields: WorkflowInputFieldDefinition[] = [
  {
    key: 'iterations',
    label: 'Number of Iterations',
    description: 'How many times to run the loop',
    type: 'number',
    defaultValue: 10,
    validation: {
      min: 1,
      max: 100,
    },
  },
  {
    key: 'delaySeconds',
    label: 'Delay Between Iterations',
    description: 'Seconds to wait between each iteration',
    type: 'number',
    defaultValue: 5,
    validation: {
      min: 1,
      max: 300,
    },
  },
];

// Random Text Loop template definition
export const RandomTextLoopTemplate: WorkflowTemplate = {
  id: 'random-text-loop',
  name: 'Random Text Loop Generator',
  description:
    'Generate random lorem ipsum text in a loop with configurable iterations and delays. Perfect for testing realtime logging and workflow monitoring.',
  eventName: 'workflow/random.text.loop',
  canBeScheduled: true,
  requiredProviders: [],
  restrictedToUsers: ['*'],
  requiredScopes: {},
  fields: RandomTextLoopFields as unknown as JsonValue,
  tags: ['testing', 'random', 'text', 'loop', 'realtime', 'logging'],
  version: '1.0.48',
};

// Input type for RandomTextLoop
export const WorkflowRandomTextLoopInput = z.object({
  iterations: z.number().min(1).max(100).default(10).optional(),
  delaySeconds: z.number().min(1).max(300).default(5).optional(),
});


// Input schema & type for RandomTextLoop
export const WorkflowRandomTextLoopInputSchema = z.object({
  iterations: z.number().min(1).max(100).default(10).optional(),
  delaySeconds: z.number().min(1).max(300).default(5).optional(),
});
export type WorkflowRandomTextLoopInput = z.infer<typeof WorkflowRandomTextLoopInputSchema>;

// Event schema & type for workflow/randomtextloop event
export const WorkflowRandomTextLoopEventSchema = z.object({
  input: WorkflowRandomTextLoopInputSchema,
  scheduledRun: z.boolean().optional(),
  workflowId: z.string(),
  cronExpression: z.string().nullable().optional(),
  tz: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string(),
});
export type WorkflowRandomTextLoopEvent = z.infer<typeof WorkflowRandomTextLoopEventSchema>;
