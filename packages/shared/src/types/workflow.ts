import z from "zod";
import { Prisma } from "@duramation/db";
import { Provider as PrismaProvider } from "@duramation/db";

type JsonValue = Prisma.JsonValue;

// Base workflow input type - can be any object structure depending on the workflow
export type WorkflowInput = Record<string, any>;

export type WorkflowTemplate = {
      id: string
      name: string
      description: string
      eventName: string
      canBeScheduled: boolean
      requiredProviders: PrismaProvider[]
      requiredScopes: JsonValue | null
      fields: JsonValue | null
      restrictedToUsers: string[]
      tags: string[]
      version: string
    };

// Context provided to workflow execution functions
export interface WorkflowExecutionContext {
  workflowId: string;
  userId: string;
  scheduledRun: boolean;
  cronExpression?: string;
  timezone?: string;
  metadata?: Record<string, any>;
}


// Result returned from workflow execution
export interface WorkflowResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
  executionTime?: number;
  nextRunAt?: Date;
}


// Workflow input field definition with typed validation
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


// Schema for validating workflow input fields
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

// Base schema for workflow execution requests
export const WorkflowExecutionRequestSchema = z.object({
  input: WorkflowInputFieldSchema,
  scheduledRun: z.boolean().default(false),
  cronExpression: z.string().optional(),
  timezone: z.string().default("UTC"),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type WorkflowExecutionRequest = z.infer<typeof WorkflowExecutionRequestSchema>;


// Workflow interface for frontend consumption
export interface Workflow {
  id: string;
  name: string;
  templateId: string;
  description?: string;
  status: string;
  available: boolean;
  canBeScheduled: boolean;
  eventName?: string;
  cronExpressions: string[];
  timezone?: string;
  nextRunAt?: string;
  lastRunAt?: string;
  credentials: any[];
  input?: Record<string, any>; // Input values, not field definitions
}

export const Provider = PrismaProvider;
