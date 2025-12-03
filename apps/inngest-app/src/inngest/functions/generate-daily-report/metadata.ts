import { z } from "zod";
import { Prisma, Provider } from '@duramation/db';
import {
  WorkflowInputFieldDefinition,
  WorkflowTemplate,
} from '@duramation/shared';

type JsonValue = Prisma.JsonValue;

// Field definitions for Daily Report template
export const DailyReportFields: WorkflowInputFieldDefinition[] = [
  {
    key: 'reportTitle',
    label: 'Report Title',
    description: 'The title for your daily report',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
  {
    key: 'sheetName',
    label: 'Spreadsheet ID or URL',
    description: 'The Google Sheets URL or spreadsheet ID (e.g., https://docs.google.com/spreadsheets/d/YOUR_ID/edit)',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
  {
    key: 'emailRecipients',
    label: 'Email Recipients',
    description: 'Email addresses to send the report to',
    type: 'multiselect',
    validation: {
      required: true,
      min: 1,
    },
  },
  {
    key: 'reportFormat',
    label: 'Report Format',
    description: 'Choose the format for your report',
    type: 'select',
    defaultValue: 'PDF',
    validation: {
      options: ['PDF', 'CSV', 'XLSX'],
      required: true
    },
  }
];

// Daily Report template definition
export const DailyReportTemplate: WorkflowTemplate = {
  id: 'daily-report',
  name: 'Generate Daily Report',
  description:
    'Automatically generate and send daily reports from Google Sheets data',
  eventName: 'workflow/report.requested',
  canBeScheduled: true,
  requiredProviders: [Provider.google_mail],
  requiredScopes: {
    [Provider.google_mail]: [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/gmail.send',
    ],
  },
  restrictedToUsers: ['*'],
  fields: DailyReportFields as unknown as JsonValue,
  tags: ['google-sheets', 'email', 'automation', 'reports'],
  version: '3.191.962',
};


// Input schema & type for DailyReport
export const WorkflowDailyReportInputSchema = z.object({
  reportTitle: z.string().min(1),
  sheetName: z.string().min(1),
  emailRecipients: z.array(z.string()).min(1),
  reportFormat: z.string().refine(val => ["'PDF'", "'CSV'", "'XLSX'"].includes(val), { message: "Invalid option" }).default("PDF"),
});
export type WorkflowDailyReportInput = z.infer<typeof WorkflowDailyReportInputSchema>;

// Event schema & type for workflow/dailyreport event
export const WorkflowDailyReportEventSchema = z.object({
  input: WorkflowDailyReportInputSchema,
  scheduledRun: z.boolean().optional(),
  workflowId: z.string(),
  cronExpression: z.string().nullable().optional(),
  tz: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string(),
});
export type WorkflowDailyReportEvent = z.infer<typeof WorkflowDailyReportEventSchema>;
