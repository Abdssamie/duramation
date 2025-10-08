import { z } from 'zod';
import { 
  idSchema, 
  paginationParamsSchema, 
  nonEmptyStringSchema,
  positiveNumberSchema,
  nonNegativeNumberSchema,
  urlSchema 
} from './common.js';
import { apiResponseSchema, paginatedResponseSchema } from './api.js';
import { providerSchema } from './credentials.js';

/**
 * Marketplace validation schemas
 */

// Template installation status enum
export const templateInstallationStatusSchema = z.enum(['pending', 'completed', 'failed']);

// Sort options for marketplace
export const marketplaceSortBySchema = z.enum(['relevance', 'rating', 'downloads', 'updated', 'name']);

/**
 * Marketplace Template Schemas
 */
export const workflowTemplateSchema = z.object({
  id: idSchema,
  name: nonEmptyStringSchema,
  description: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  provider: providerSchema.optional(),
  requiredProviders: z.array(providerSchema).default([]),
  canBeScheduled: z.boolean().default(false),
  inputFields: z.array(z.object({
    key: nonEmptyStringSchema,
    label: nonEmptyStringSchema,
    type: z.enum(['string', 'number', 'boolean', 'date', 'select', 'multiselect', 'file']),
    required: z.boolean().default(false),
    defaultValue: z.any().optional(),
    options: z.array(z.string()).optional(),
  })).optional(),
  configuration: z.record(z.string(), z.any()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const marketplaceTemplateSchema = workflowTemplateSchema.extend({
  featured: z.boolean().default(false),
  downloadCount: nonNegativeNumberSchema.default(0),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: nonNegativeNumberSchema.default(0),
  author: z.string().optional(),
  lastUpdated: z.string().datetime().optional(),
  compatibilityTags: z.array(z.string()).default([]),
});

/**
 * Marketplace Query Request/Response Schemas
 */
export const marketplaceQuerySchema = paginationParamsSchema.extend({
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  provider: providerSchema.optional(),
  requiredProviders: z.array(providerSchema).optional(),
  canBeScheduled: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export const marketplaceResponseSchema = paginatedResponseSchema(marketplaceTemplateSchema);

/**
 * Template Installation Request/Response Schemas
 */
export const templateInstallationRequestSchema = z.object({
  templateId: idSchema,
  workflowName: nonEmptyStringSchema.optional(),
  configuration: z.record(z.string(), z.any()).optional(),
  inputFields: z.array(z.object({
    key: nonEmptyStringSchema,
    value: z.any(),
  })).optional(),
  isActive: z.boolean().default(true),
});

export const requiredCredentialSchema = z.object({
  provider: providerSchema,
  scopes: z.array(z.string()).optional(),
  isConfigured: z.boolean(),
});

export const configurationStepSchema = z.object({
  step: positiveNumberSchema,
  title: nonEmptyStringSchema,
  description: nonEmptyStringSchema,
  completed: z.boolean(),
});

export const templateInstallationDataSchema = z.object({
  workflowId: idSchema,
  templateId: idSchema,
  installationStatus: templateInstallationStatusSchema,
  requiredCredentials: z.array(requiredCredentialSchema).optional(),
  configurationSteps: z.array(configurationStepSchema).optional(),
});

export const templateInstallationResponseSchema = apiResponseSchema(templateInstallationDataSchema);

/**
 * Template Details Request/Response Schemas
 */
export const templateDetailsRequestSchema = z.object({
  templateId: idSchema,
  includeCompatibility: z.boolean().default(false),
  includeReviews: z.boolean().default(false),
});

export const templateChangelogSchema = z.object({
  version: nonEmptyStringSchema,
  date: z.string().datetime(),
  changes: z.array(z.string()),
});

export const templateCompatibilityInfoSchema = z.object({
  minVersion: z.string().optional(),
  supportedProviders: z.array(providerSchema),
  requiredFeatures: z.array(z.string()).optional(),
});

export const templateReviewSchema = z.object({
  id: idSchema,
  userId: idSchema,
  userName: nonEmptyStringSchema,
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  createdAt: z.string().datetime(),
});

export const templateDetailsSchema = marketplaceTemplateSchema.extend({
  longDescription: z.string().optional(),
  screenshots: z.array(urlSchema).optional(),
  documentation: z.string().optional(),
  changelog: z.array(templateChangelogSchema).optional(),
  compatibilityInfo: templateCompatibilityInfoSchema.optional(),
  reviews: z.array(templateReviewSchema).optional(),
});

export const templateDetailsResponseSchema = apiResponseSchema(templateDetailsSchema);

/**
 * Template Categories Request/Response Schemas
 */
export const templateCategoriesRequestSchema = z.object({
  includeCount: z.boolean().default(false),
});

export const templateCategorySchema = z.object({
  id: idSchema,
  name: nonEmptyStringSchema,
  description: z.string().optional(),
  icon: z.string().optional(),
  templateCount: nonNegativeNumberSchema.optional(),
  featured: z.boolean().default(false),
});

export const templateCategoriesResponseSchema = apiResponseSchema(z.array(templateCategorySchema));

/**
 * Template Search Request/Response Schemas
 */
export const templateSearchRequestSchema = paginationParamsSchema.extend({
  query: nonEmptyStringSchema,
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  provider: providerSchema.optional(),
  minRating: z.number().min(0).max(5).optional(),
  sortBy: marketplaceSortBySchema.default('relevance'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const templateSearchResponseSchema = paginatedResponseSchema(marketplaceTemplateSchema);

/**
 * Template Review Request/Response Schemas
 */
export const templateReviewRequestSchema = z.object({
  templateId: idSchema,
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export const templateReviewFullSchema = templateReviewSchema.extend({
  templateId: idSchema,
  updatedAt: z.string().datetime(),
});

export const templateReviewResponseSchema = apiResponseSchema(templateReviewFullSchema);

// Type inference helpers
export type TemplateInstallationStatus = z.infer<typeof templateInstallationStatusSchema>;
export type MarketplaceSortBy = z.infer<typeof marketplaceSortBySchema>;
export type WorkflowTemplate = z.infer<typeof workflowTemplateSchema>;
export type MarketplaceTemplate = z.infer<typeof marketplaceTemplateSchema>;
export type MarketplaceQuery = z.infer<typeof marketplaceQuerySchema>;
export type TemplateInstallationRequest = z.infer<typeof templateInstallationRequestSchema>;
export type RequiredCredential = z.infer<typeof requiredCredentialSchema>;
export type ConfigurationStep = z.infer<typeof configurationStepSchema>;
export type TemplateInstallationData = z.infer<typeof templateInstallationDataSchema>;
export type TemplateDetailsRequest = z.infer<typeof templateDetailsRequestSchema>;
export type TemplateChangelog = z.infer<typeof templateChangelogSchema>;
export type TemplateCompatibilityInfo = z.infer<typeof templateCompatibilityInfoSchema>;
export type TemplateReview = z.infer<typeof templateReviewSchema>;
export type TemplateDetails = z.infer<typeof templateDetailsSchema>;
export type TemplateCategoriesRequest = z.infer<typeof templateCategoriesRequestSchema>;
export type TemplateCategory = z.infer<typeof templateCategorySchema>;
export type TemplateSearchRequest = z.infer<typeof templateSearchRequestSchema>;
export type TemplateReviewRequest = z.infer<typeof templateReviewRequestSchema>;
export type TemplateReviewFull = z.infer<typeof templateReviewFullSchema>;