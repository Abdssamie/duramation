import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiError {
  error: string;
  details?: string[];
  code?: string;
}

export class AppError extends Error {
  public statusCode: number;
  public code?: string;
  public details?: string[];

  constructor(message: string, statusCode: number = 500, code?: string, details?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

/**
 * Centralized error handler for API routes
 */
export function handleApiError(error: unknown): NextResponse<ApiError> {
  console.error('API Error:', error);

  // Handle custom AppError
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        details: error.details
      },
      { status: error.statusCode }
    );
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: error.issues.map(err => `${err.path.join('.')}: ${err.message}`)
      },
      { status: 400 }
    );
  }

  // Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; message: string };
    
    switch (prismaError.code) {
      case 'P2002':
        return NextResponse.json(
          {
            error: "A record with this information already exists",
            code: "DUPLICATE_RECORD"
          },
          { status: 409 }
        );
      case 'P2025':
        return NextResponse.json(
          {
            error: "Record not found",
            code: "NOT_FOUND"
          },
          { status: 404 }
        );
      default:
        return NextResponse.json(
          {
            error: "Database operation failed",
            code: "DATABASE_ERROR"
          },
          { status: 500 }
        );
    }
  }

  // Handle generic errors
  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: process.env.NODE_ENV === 'development' 
          ? error.message 
          : "Internal server error",
        code: "INTERNAL_ERROR"
      },
      { status: 500 }
    );
  }

  // Fallback for unknown errors
  return NextResponse.json(
    {
      error: "An unexpected error occurred",
      code: "UNKNOWN_ERROR"
    },
    { status: 500 }
  );
}

/**
 * Common error responses
 */
export const ErrorResponses = {
  unauthorized: () => NextResponse.json(
    { error: "Unauthorized", code: "UNAUTHORIZED" },
    { status: 401 }
  ),
  
  forbidden: () => NextResponse.json(
    { error: "Forbidden", code: "FORBIDDEN" },
    { status: 403 }
  ),
  
  notFound: (resource: string = "Resource") => NextResponse.json(
    { error: `${resource} not found`, code: "NOT_FOUND" },
    { status: 404 }
  ),
  
  badRequest: (message: string = "Bad request") => NextResponse.json(
    { error: message, code: "BAD_REQUEST" },
    { status: 400 }
  ),
  
  conflict: (message: string = "Resource already exists") => NextResponse.json(
    { error: message, code: "CONFLICT" },
    { status: 409 }
  ),
  
  tooManyRequests: () => NextResponse.json(
    { error: "Too many requests", code: "RATE_LIMIT" },
    { status: 429 }
  )
};

/**
 * Wrapper for API route handlers with error handling
 */
export function withErrorHandler<T extends any[], R>(
  handler: (...args: T) => Promise<NextResponse | R>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      const result = await handler(...args);
      return result instanceof NextResponse ? result : NextResponse.json(result);
    } catch (error) {
      return handleApiError(error);
    }
  };
}