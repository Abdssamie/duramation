import { z } from "zod";
import { Prisma, Provider } from '@duramation/db';
import {
  WorkflowInputFieldDefinition,
  WorkflowTemplate,
} from '@duramation/shared';

type JsonValue = Prisma.JsonValue;

// Field definitions for Scrape Website template
export const ScrapeWebsiteFields: WorkflowInputFieldDefinition[] = [
  {
    key: 'url',
    label: 'Website URL',
    description: 'The URL of the website to scrape',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
  {
    key: 'formats',
    label: 'Output Formats',
    description: 'Choose which formats to extract',
    type: 'multiselect',
    defaultValue: ['markdown'],
    validation: {
      options: ['markdown', 'html', 'links', 'screenshot'],
      required: true,
      min: 1,
    },
  },
];

// Scrape Website template definition
export const ScrapeWebsiteTemplate: WorkflowTemplate = {
  id: 'scrape-website',
  name: 'Scrape Website',
  description: 'Extract content from any website using Firecrawl',
  eventName: 'workflow/scrape.website',
  canBeScheduled: true,
  requiredProviders: [Provider.FIRECRAWL],
  requiredScopes: {},
  restrictedToUsers: ['*'],
  fields: ScrapeWebsiteFields as unknown as JsonValue,
  tags: ['firecrawl', 'scraping', 'automation', 'web'],
  version: '1.0.0',
};

// Input schema & type for ScrapeWebsite
export const WorkflowScrapeWebsiteInputSchema = z.object({
  url: z.string().url(),
  formats: z.array(z.enum(['markdown', 'html', 'links', 'screenshot'])).min(1),
});
export type WorkflowScrapeWebsiteInput = z.infer<typeof WorkflowScrapeWebsiteInputSchema>;

// Event schema & type for workflow/scrape.website event
export const WorkflowScrapeWebsiteEventSchema = z.object({
  input: WorkflowScrapeWebsiteInputSchema,
  scheduledRun: z.boolean().optional(),
  workflowId: z.string(),
  cronExpression: z.string().nullable().optional(),
  tz: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string(),
});
export type WorkflowScrapeWebsiteEvent = z.infer<typeof WorkflowScrapeWebsiteEventSchema>;
