import { z } from 'zod';
import { paginationResponseSchema } from './common.js';

/**
 * Base API response validation schemas
 */

// Generic API response schema
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    error: z.string().optional(),
    code: z.string().optional(),
  });

// API error response schema
export const apiErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.array(z.string()).optional(),
  statusCode: z.number().int().min(400).max(599).optional(),
});

// Validation error schema for detailed field errors
export const validationErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
  code: z.string().optional(),
});

// Validation error response schema
export const validationErrorResponseSchema = z.object({
  error: z.literal('Validation failed'),
  code: z.literal('VALIDATION_ERROR'),
  details: z.array(validationErrorSchema),
  statusCode: z.literal(400),
});

// Paginated response schema
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.literal(true),
    data: z.array(itemSchema),
    pagination: paginationResponseSchema,
    message: z.string().optional(),
  });

// Success response schema (for operations that don't return data)
export const successResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

// Authentication error schema
export const authErrorSchema = z.object({
  error: z.string(),
  code: z.enum(['UNAUTHORIZED', 'FORBIDDEN', 'TOKEN_EXPIRED', 'INVALID_TOKEN']),
  statusCode: z.union([z.literal(401), z.literal(403)]),
});

// Not found error schema
export const notFoundErrorSchema = z.object({
  error: z.string(),
  code: z.literal('NOT_FOUND'),
  statusCode: z.literal(404),
});

// Conflict error schema
export const conflictErrorSchema = z.object({
  error: z.string(),
  code: z.literal('CONFLICT'),
  statusCode: z.literal(409),
});

// Internal server error schema
export const internalErrorSchema = z.object({
  error: z.string(),
  code: z.literal('INTERNAL_ERROR'),
  statusCode: z.literal(500),
});

// Union of all possible error responses
export const errorResponseSchema = z.union([
  apiErrorSchema,
  validationErrorResponseSchema,
  authErrorSchema,
  notFoundErrorSchema,
  conflictErrorSchema,
  internalErrorSchema,
]);

// Type inference helpers
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
};

export type ApiError = z.infer<typeof apiErrorSchema>;
export type ValidationError = z.infer<typeof validationErrorSchema>;
export type ValidationErrorResponse = z.infer<typeof validationErrorResponseSchema>;
export type PaginatedResponse<T> = {
  success: true;
  data: T[];
  pagination: z.infer<typeof paginationResponseSchema>;
  message?: string;
};
export type SuccessResponse = z.infer<typeof successResponseSchema>;
export type AuthError = z.infer<typeof authErrorSchema>;
export type NotFoundError = z.infer<typeof notFoundErrorSchema>;
export type ConflictError = z.infer<typeof conflictErrorSchema>;
export type InternalError = z.infer<typeof internalErrorSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;