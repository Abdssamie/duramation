import { z } from "zod";
import { Prisma, Provider } from '@duramation/db';
import {
  WorkflowInputFieldDefinition,
  WorkflowTemplate,
} from '@duramation/shared';

type JsonValue = Prisma.JsonValue;

// Field definitions for Send Outlook Email template
export const SendOutlookEmailFields: WorkflowInputFieldDefinition[] = [
  {
    key: 'to',
    label: 'To',
    description: 'Recipient email addresses (comma-separated)',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
  {
    key: 'subject',
    label: 'Subject',
    description: 'Email subject line',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
  {
    key: 'body',
    label: 'Message',
    description: 'Email body content',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
  {
    key: 'isHtml',
    label: 'HTML Format',
    description: 'Send as HTML email',
    type: 'boolean',
    validation: {
      required: false,
    },
  },
];

// Send Outlook Email template definition
export const SendOutlookEmailTemplate: WorkflowTemplate = {
  id: 'send-outlook-email',
  name: 'Send Outlook Email',
  description: 'Send emails via Microsoft Outlook automatically',
  eventName: 'workflow/microsoft.send-email',
  canBeScheduled: true,
  requiredProviders: [Provider.MICROSOFT],
  requiredScopes: {
    [Provider.MICROSOFT]: [
      'https://graph.microsoft.com/Mail.Send',
      'https://graph.microsoft.com/User.Read',
    ],
  },
  restrictedToUsers: ['cmgpkyfzd00035bfltwavm684'],
  fields: SendOutlookEmailFields as unknown as JsonValue,
  tags: ['microsoft', 'outlook', 'email', 'automation', 'notifications'],
  version: '3.0.0',
};

// Input schema & type for SendOutlookEmail
export const WorkflowSendOutlookEmailInputSchema = z.object({
  to: z.string().min(1),
  subject: z.string().min(1),
  body: z.string().min(1),
  isHtml: z.boolean().optional().default(false),
});
export type WorkflowSendOutlookEmailInput = z.infer<typeof WorkflowSendOutlookEmailInputSchema>;

// Event schema & type for workflow/microsoft.send-email event
export const WorkflowSendOutlookEmailEventSchema = z.object({
  input: WorkflowSendOutlookEmailInputSchema,
  scheduledRun: z.boolean().optional(),
  workflowId: z.string(),
  cronExpression: z.string().nullable().optional(),
  tz: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string(),
});
export type WorkflowSendOutlookEmailEvent = z.infer<typeof WorkflowSendOutlookEmailEventSchema>;
