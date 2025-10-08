/**
 * Authentication related types and interfaces
 */

import { ApiError } from './common.js';

/**
 * Base interface for authenticated requests
 */
export interface AuthenticatedRequest {
  userId: string;
  organizationId?: string;
  sessionId?: string;
}

/**
 * Authentication error types
 */
export interface AuthError extends ApiError {
  code: 'UNAUTHORIZED' | 'FORBIDDEN' | 'TOKEN_EXPIRED' | 'INVALID_TOKEN' | 'MISSING_TOKEN';
}

/**
 * User authentication context
 */
export interface AuthContext {
  userId: string;
  email?: string;
  organizationId?: string;
  roles?: string[];
  permissions?: string[];
}

/**
 * Token validation result
 */
export interface TokenValidationResult {
  valid: boolean;
  context?: AuthContext;
  error?: AuthError;
}

/**
 * OAuth authentication state
 */
export interface OAuthState {
  provider: string;
  redirectUrl?: string;
  state: string;
  codeVerifier?: string;
}

/**
 * Authentication session data
 */
export interface AuthSession {
  userId: string;
  sessionId: string;
  expiresAt: Date;
  organizationId?: string;
}