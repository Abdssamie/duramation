import { z } from "zod";
import { Prisma, Provider } from '@duramation/db';
import {
  WorkflowInputFieldDefinition,
  WorkflowTemplate,
} from '@duramation/shared';

type JsonValue = Prisma.JsonValue;

export const TestExampleFields: WorkflowInputFieldDefinition[] = [
  {
    key: 'exampleField',
    label: 'Example Field',
    description: 'Description of the field',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
];

export const TestExampleTemplate: WorkflowTemplate = {
  id: 'test-example',
  name: 'Test Example',
  description: 'TODO: Add workflow description',
  eventName: 'workflow/test-example',
  canBeScheduled: true,
  requiredProviders: [], // TODO: Add required providers (e.g., [Provider.SLACK])
  requiredScopes: {},
  restrictedToUsers: ['*'],
  fields: TestExampleFields as unknown as JsonValue,
  tags: ['automation'], // TODO: Add relevant tags
  version: '1.0.0',
};

export const WorkflowTestExampleInputSchema = z.object({
  exampleField: z.string().min(1),
  // TODO: Add more fields
});
export type WorkflowTestExampleInput = z.infer<typeof WorkflowTestExampleInputSchema>;

export const WorkflowTestExampleEventSchema = z.object({
  input: WorkflowTestExampleInputSchema,
  scheduledRun: z.boolean().optional(),
  workflowId: z.string(),
  cronExpression: z.string().nullable().optional(),
  tz: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string(),
});
export type WorkflowTestExampleEvent = z.infer<typeof WorkflowTestExampleEventSchema>;
