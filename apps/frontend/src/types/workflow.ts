// Frontend workflow types - browser-safe without Prisma imports

import { WorkflowStatus } from '@duramation/db/types';
import { Provider } from '@duramation/integrations';


// Note: requiredScopes is now stored as Json in the database schema (Record<Provider, string[]>)
export type {
  Workflow,
  WorkflowInputFieldDefinition,
  WorkflowInput,
  WorkflowInputField,
  WorkflowExecutionRequest
} from '@duramation/shared';

export {
  getRequiredFields,
  getTemplateFields,
  hasRequiredFields
} from '@duramation/shared';

// Enhanced workflow type with credential relationships - browser-safe
export interface WorkflowWithCredentials {
  id: string;
  version: string; // Add version field
  hasNewVersion?: boolean; // Add hasNewVersion field
  name: string;
  templateId: string;
  description: string | null;
  status: WorkflowStatus;
  available: boolean;
  canBeScheduled: boolean;
  eventName: string;
  timezone: string | null;
  nextRunAt: Date | null;
  lastRunAt: Date | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  fields: Record<string, unknown>;
  input: Record<string, unknown>;
  config: object;
  idempotencyKey: string | null;
  // Database schema fields for credential requirements
  requiredProviders: Provider[];
  requiredScopes: Record<string, string[]> | null;
  // Credential relationships from database
  workflowCredentials: Array<{
    workflowId: string;
    credentialId: string;
    credential: {
      id: string;
      name: string;
      type: string;
      provider: Provider;
      userId: string;
      secret: any;
      config: object;
      createdAt: Date;
      updatedAt: Date;
    };
  }>;
  // Optional computed fields
  credentialStatus?: 'complete' | 'partial' | 'missing';
  availableCredentials?: Array<{
    id: string;
    name: string;
    type: string;
    provider: Provider;
    userId: string;
    secret: any;
    config: object;
    createdAt: Date;
    updatedAt: Date;
  }>;
  missingProviders?: Provider[];
}

// Interface for tracking credential creation context
export interface CredentialContext {
  source: 'workflow' | 'manual';
  workflowId?: string;
  requiredScopes?: string[];
  autoAssociate?: boolean;
}

// Type for credential requirement display mapping
export interface CredentialRequirement {
  provider: Provider;
  scopes?: string[];
  required: boolean;
  available: boolean;
  credentialId?: string;
}

// Helper type for credential status calculation
export type CredentialStatusCalculation = {
  total: number;
  available: number;
  missing: number;
  status: 'complete' | 'partial' | 'missing';
};
