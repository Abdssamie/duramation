import { z } from 'zod';
import { WorkflowTemplateSchema } from '@duramation/workflows';

export class WorkflowValidationError extends Error {
  constructor(public errors: string[]) {
    super(`Workflow validation failed:\n${errors.join('\n')}`);
    this.name = 'WorkflowValidationError';
  }
}

export async function validateWorkflowMetadata(metadata: unknown): Promise<void> {
  const result = WorkflowTemplateSchema.safeParse(metadata);
  if (!result.success) {
    throw new WorkflowValidationError(
      result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
    );
  }
}

export async function validateWorkflowStructure(workflowPath: string): Promise<string[]> {
  const errors: string[] = [];
  const fs = await import('fs/promises');
  const path = await import('path');

  try {
    const functionPath = path.join(workflowPath, 'function.ts');
    const metadataPath = path.join(workflowPath, 'metadata.ts');

    const [functionExists, metadataExists] = await Promise.all([
      fs.access(functionPath).then(() => true).catch(() => false),
      fs.access(metadataPath).then(() => true).catch(() => false),
    ]);

    if (!functionExists) errors.push('Missing function.ts');
    if (!metadataExists) errors.push('Missing metadata.ts');

    if (functionExists) {
      const content = await fs.readFile(functionPath, 'utf-8');
      if (!content.includes('inngest.createFunction')) {
        errors.push('function.ts must export Inngest function');
      }
    }

    if (metadataExists) {
      const content = await fs.readFile(metadataPath, 'utf-8');
      if (!content.includes('WorkflowTemplate')) {
        errors.push('metadata.ts must export WorkflowTemplate');
      }
    }
  } catch (error) {
    errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }

  return errors;
}
