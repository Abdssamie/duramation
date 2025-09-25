import { WorkflowInputFieldDefinition } from "../types/index.js";
import { WorkflowTemplate, Prisma } from "@duramation/db";
import { type ExtendedPrismaClient as PrismaClient } from "../lib/prisma.js"; // Import the type

type InputJsonValue = Prisma.InputJsonValue;

export async function getWorkflowTemplate(prisma: PrismaClient, id: string): Promise<WorkflowTemplate> {
  const template = await prisma.workflowTemplate.findFirst({
    where: {
      id: id
    }
  });

  if (!template) {
    throw new Error(`Workflow template with id ${id} not found`);
  }

  return template;
}

export async function getAvailableTemplatesForUser(prisma: PrismaClient, userId: string): Promise<WorkflowTemplate[]> {
  const allWorkflowTemplates: WorkflowTemplate[] = await prisma.workflowTemplate.findMany();


  return Object.values(allWorkflowTemplates).filter(template => {
    // chech if there is a * in the restrictedToUsers array
    if (template.restrictedToUsers?.includes("*")) {
      return true;
    }

    return template.restrictedToUsers?.includes(userId) || false;
  });
}


export async function validateWorkflowInput(prisma: PrismaClient, templateId: string, input: Record<string, any>): Promise<{
  valid: boolean;
  errors: string[];
}> {
  const template = await getWorkflowTemplate(prisma, templateId);
  if (!template) {
    return { valid: false, errors: [`Template '${templateId}' not found`] };
  }

  const errors: string[] = [];

  // Validate each field based on its validation rules
  for (const field of (template.fields as unknown as WorkflowInputFieldDefinition[])) {
    const value = input[field.key];

    // Check required validation
    if (field.validation?.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field.label} is required`);
      continue;
    }

    // Skip further validation if value is empty and not required
    if (value === undefined || value === null || value === '') {
      continue;
    }

    // Type-specific validation
    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
        if (typeof value !== 'string') {
          errors.push(`${field.label} must be a string`);
        } else {
          if (field.validation?.min && value.length < field.validation.min) {
            errors.push(`${field.label} must be at least ${field.validation.min} characters`);
          }
          if (field.validation?.max && value.length > field.validation.max) {
            errors.push(`${field.label} must be at most ${field.validation.max} characters`);
          }
          if (field.validation?.pattern && !new RegExp(field.validation.pattern).test(value)) {
            errors.push(`${field.label} format is invalid`);
          }
        }
        break;

      case 'number':
        if (typeof value !== 'number' && isNaN(Number(value))) {
          errors.push(`${field.label} must be a number`);
        } else {
          const numValue = Number(value);
          if (field.validation?.min !== undefined && numValue < field.validation.min) {
            errors.push(`${field.label} must be at least ${field.validation.min}`);
          }
          if (field.validation?.max !== undefined && numValue > field.validation.max) {
            errors.push(`${field.label} must be at most ${field.validation.max}`);
          }
        }
        break;

      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push(`${field.label} must be true or false`);
        }
        break;

      case 'select':
        if (field.validation?.options && !field.validation.options.includes(value)) {
          errors.push(`${field.label} must be oneno there shouldn't  of: ${field.validation.options.join(', ')}`);
        }
        break;

      case 'multiselect':
        if (!Array.isArray(value)) {
          errors.push(`${field.label} must be an array`);
        } else {
          if (field.validation?.min && value.length < field.validation.min) {
            errors.push(`${field.label} must have at least ${field.validation.min} items`);
          }
          if (field.validation?.max && value.length > field.validation.max) {
            errors.push(`${field.label} must have at most ${field.validation.max} items`);
          }
        }
        break;
    }
  }

  return { valid: errors.length === 0, errors };
}


export async function getRequiredFields(prisma: PrismaClient, templateId: string): Promise<WorkflowInputFieldDefinition[]> {
  const template = await getWorkflowTemplate(prisma, templateId);
  if (!template) return [];

  return (template.fields as unknown as WorkflowInputFieldDefinition[]).filter(field => field.validation?.required === true);
}


export async function getTemplateFields(prisma: PrismaClient, templateId: string): Promise<WorkflowInputFieldDefinition[]> {
  const template = await getWorkflowTemplate(prisma, templateId);
  if (!template) return [];

  return template.fields as unknown as WorkflowInputFieldDefinition[];
}


export async function hasRequiredFields(prisma: PrismaClient, templateId: string): Promise<boolean> {
  const requiredFields = await getRequiredFields(prisma, templateId);
  return requiredFields.length > 0;
}


export async function queryWorkflowTemplates(prisma: PrismaClient, userId: string): Promise<WorkflowTemplate[]> {
  return await getAvailableTemplatesForUser(prisma, userId);
}


export function generateZodSchemaString(fields: WorkflowInputFieldDefinition[]) {
  const schemaParts: string[] = [];

  fields.forEach(field => {
    let zodTypeString: string;
    const isOptional = !field.validation?.required;

    switch (field.type) {
      case 'text':
        zodTypeString = 'z.string()';
        if (field.validation?.min) {
          zodTypeString += `.min(${field.validation.min})`;
        }
        if (field.validation?.max) {
          zodTypeString += `.max(${field.validation.max})`;
        }
        break;
      case 'number':
        zodTypeString = 'z.number()';
        if (field.validation?.min) {
          zodTypeString += `.min(${field.validation.min})`;
        }
        if (field.validation?.max) {
          zodTypeString += `.max(${field.validation.max})`;
        }
        break;
      case 'boolean':
        zodTypeString = 'z.boolean()';
        break;
      case 'select':
        if (field.validation?.options && field.validation.options.length > 0) {
          zodTypeString = `z.enum([${field.validation.options.map(opt => `'${opt}'`).join(', ')}])`;
        } else {
          zodTypeString = 'z.string()';
        }
        break;
      case 'multiselect':
        zodTypeString = 'z.array(z.string())';
        if (field.validation?.min) {
          zodTypeString += `.min(${field.validation.min})`;
        }
        break;
      case 'json':
        zodTypeString = 'z.record(z.string(), z.any())';
        break;
      case 'credential':
      case 'email':
      case 'url':
      case 'date':
      case 'time':
      case 'file':
      case 'list':
        zodTypeString = 'z.any()'; // Fallback for types not explicitly handled
        break;
      default:
        zodTypeString = 'z.any()';
    }

    if (isOptional) {
      zodTypeString += '.optional()';
    }

    schemaParts.push(`${field.key}: ${zodTypeString}`);
  });

  return `z.object({\n    ${schemaParts.join(',\n    ')}\n  })`;
}

export async function addWorkflowTemplatesIfNotExist(prisma: PrismaClient, templates: WorkflowTemplate | WorkflowTemplate[]) : Promise<WorkflowTemplate[]> {
  const templateArray = Array.isArray(templates) ? templates : [templates];

  const createdOrUpdatedTemplates: WorkflowTemplate[] = [];

  for (const templateData of templateArray) {
    const template = await prisma.workflowTemplate.upsert({
      where: { eventName: templateData.eventName },
      create: {
        id: templateData.id,
        name: templateData.name,
        description: templateData.description,
        eventName: templateData.eventName,
        canBeScheduled: templateData.canBeScheduled,
        version: templateData.version,
        requiredProviders: templateData.requiredProviders,
        requiredScopes: templateData.requiredScopes as InputJsonValue,
        fields: templateData.fields as InputJsonValue,
        restrictedToUsers: templateData.restrictedToUsers ?? [],
        tags: templateData.tags ?? [],
      },
      update: {
        name: templateData.name,
        description: templateData.description,
        canBeScheduled: templateData.canBeScheduled,
        version: templateData.version,
        requiredProviders: templateData.requiredProviders,
        requiredScopes: templateData.requiredScopes as InputJsonValue,
        fields: templateData.fields as InputJsonValue,
        restrictedToUsers: templateData.restrictedToUsers ?? [],
        tags: templateData.tags ?? [],
      },
    });
    createdOrUpdatedTemplates.push(template);
  }

  return createdOrUpdatedTemplates;
}
