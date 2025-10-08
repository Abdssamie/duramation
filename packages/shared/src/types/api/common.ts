/**
 * Common API response types and interfaces
 */

/**
 * Standard API response wrapper for successful responses
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
}

/**
 * Standardized error response format
 */
export interface ApiError {
  error: string;
  code?: string;
  details?: string[];
  field?: string;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Pagination query parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * Common query parameters for filtering and sorting
 */
export interface QueryParams extends PaginationParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: Record<string, string | number | boolean>;
}

/**
 * Standard success response helper type
 */
export type SuccessResponse<T = unknown> = ApiResponse<T> & {
  success: true;
  data: T;
};

/**
 * Standard error response helper type
 */
export type ErrorResponse = ApiResponse<never> & {
  success: false;
  error: string;
};