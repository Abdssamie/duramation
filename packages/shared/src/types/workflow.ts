import z from "zod";

export { type WorkflowTemplate } from "@duramation/db/types"

export { type Workflow }  from "@duramation/db/types";

export type WorkflowInput = Record<string, any>;

export interface WorkflowInputFieldDefinition {
  key: string;
  label: string;
  description?: string;
  type: 'text' | 'number' | 'boolean' | 'json' | 'credential' | 'email' | 'url' | 'date' | 'time' | 'file' | 'select' | 'multiselect' | 'list';
  defaultValue?: any;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    options?: string[];
  };
}

export const WorkflowInputFieldSchema = z.object({
  key: z.string().min(1, "Field key is required"),
  label: z.string().min(1, "Field label is required"),
  description: z.string().optional(),
  type: z.enum(['text', 'number', 'boolean', 'json', 'credential', 'email', 'url', 'date', 'time', 'file', 'select', 'multiselect', 'list']),
  defaultValue: z.any().optional(),
  validation: z.object({
    required: z.boolean().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
    options: z.array(z.string()).optional(),
  }).optional(),
});

export type WorkflowInputField = z.infer<typeof WorkflowInputFieldSchema>;

export const WorkflowExecutionRequestSchema = z.object({
  input: WorkflowInputFieldSchema,
  scheduledRun: z.boolean().default(false),
  cronExpression: z.string().optional(),
  timezone: z.string().default("UTC"),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type WorkflowExecutionRequest = z.infer<typeof WorkflowExecutionRequestSchema>;
