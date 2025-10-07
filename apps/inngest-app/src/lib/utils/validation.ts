import { z } from "zod";
import { AppError } from "./error-handler";

/**
 * Validates request body against a Zod schema
 */
export async function validateRequestBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error; // Will be handled by error handler
    }
    throw new AppError("Invalid JSON in request body", 400, "INVALID_JSON");
  }
}

/**
 * Validates query parameters against a Zod schema
 */
export function validateQueryParams<T>(
  searchParams: URLSearchParams,
  schema: z.ZodSchema<T>
): T {
  const params = Object.fromEntries(searchParams.entries());
  return schema.parse(params);
}

/**
 * Common validation schemas
 */
export const CommonSchemas = {
  id: z.string().min(1, "ID is required"),
  
  pagination: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
  }),
  
  timeRange: z.object({
    timeRange: z.string().regex(/^\d+d$/, "Time range must be in format '30d'").optional()
  })
};