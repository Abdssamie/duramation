import { z } from 'zod';

/**
 * Common validation schemas used across all API endpoints
 */

// ID validation schema - accepts MongoDB ObjectId format
export const idSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ID format. Must be a valid MongoDB ObjectId.',
});

// UUID validation schema for alternative ID formats
export const uuidSchema = z.string().uuid({
  message: 'Invalid UUID format.',
});

// Pagination validation schemas
export const paginationParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const paginationResponseSchema = z.object({
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

// Date/time validation schemas
export const dateStringSchema = z.string().datetime({
  message: 'Invalid date format. Must be a valid ISO 8601 datetime string.',
});

export const dateSchema = z.date();

export const timestampSchema = z.number().int().positive({
  message: 'Invalid timestamp. Must be a positive integer.',
});

// Optional date fields
export const optionalDateStringSchema = dateStringSchema.optional();
export const optionalDateSchema = dateSchema.optional();
export const optionalTimestampSchema = timestampSchema.optional();

// Date range validation
export const dateRangeSchema = z.object({
  startDate: dateStringSchema,
  endDate: dateStringSchema,
}).refine(
  (data) => new Date(data.startDate) <= new Date(data.endDate),
  {
    message: 'Start date must be before or equal to end date',
    path: ['endDate'],
  }
);

// Common string validations
export const nonEmptyStringSchema = z.string().min(1, {
  message: 'String cannot be empty.',
});

export const emailSchema = z.string().email({
  message: 'Invalid email format.',
});

export const urlSchema = z.string().url({
  message: 'Invalid URL format.',
});

// Common number validations
export const positiveNumberSchema = z.number().positive({
  message: 'Number must be positive.',
});

export const nonNegativeNumberSchema = z.number().min(0, {
  message: 'Number must be non-negative.',
});

// Status validation schemas
export const statusSchema = z.enum(['active', 'inactive', 'pending', 'archived']);

// Search and filter schemas
export const searchQuerySchema = z.object({
  q: z.string().optional(),
  filter: z.record(z.string(), z.any()).optional(),
});

// Type inference helpers
export type IdSchema = z.infer<typeof idSchema>;
export type UuidSchema = z.infer<typeof uuidSchema>;
export type PaginationParams = z.infer<typeof paginationParamsSchema>;
export type PaginationResponse = z.infer<typeof paginationResponseSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type Status = z.infer<typeof statusSchema>;