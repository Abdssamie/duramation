/**
 * Credential endpoint types and interfaces
 */

import type { 
  SafeCredential, 
  CredentialCreateRequest as BaseCredentialCreateRequest,
  CredentialUpdateRequest as BaseCredentialUpdateRequest 
} from '../credentials.js';
import type { ApiResponse, PaginatedResponse, QueryParams } from './common.js';
import type { Provider, CredentialType } from '@duramation/db/types';

/**
 * Credential List Request/Response Types
 */
export interface CredentialListRequest extends QueryParams {
  provider?: Provider;
  type?: CredentialType;
  isValid?: boolean;
  expiringBefore?: string; // ISO date string
}

export type CredentialListResponse = PaginatedResponse<SafeCredential>;

/**
 * Credential Create Request/Response Types
 * Re-export and extend the existing type from credentials.ts
 */
export interface CredentialCreateApiRequest extends BaseCredentialCreateRequest {
  // Additional API-specific fields can be added here if needed
}

export type CredentialCreateApiResponse = ApiResponse<SafeCredential>;

/**
 * Credential Update Request/Response Types
 * Re-export and extend the existing type from credentials.ts
 */
export interface CredentialUpdateApiRequest extends BaseCredentialUpdateRequest {
  // Additional API-specific fields can be added here if needed
}

export type CredentialUpdateApiResponse = ApiResponse<SafeCredential>;

/**
 * Credential Get Request/Response Types
 */
export interface CredentialGetRequest {
  id: string;
  includeSecret?: boolean; // Only for authorized requests
}

export type CredentialGetResponse = ApiResponse<SafeCredential>;

/**
 * Credential Delete Request/Response Types
 */
export interface CredentialDeleteRequest {
  id: string;
}

export type CredentialDeleteResponse = ApiResponse<{ deleted: boolean }>;

/**
 * Credential Validation Request/Response Types
 */
export interface CredentialValidateRequest {
  id: string;
}

export interface CredentialValidationResult {
  isValid: boolean;
  validatedAt: string;
  error?: string;
  expiresAt?: string;
}

export type CredentialValidateResponse = ApiResponse<CredentialValidationResult>;

/**
 * OAuth Authorization Request/Response Types
 */
export interface OAuthAuthorizationRequest {
  provider: Provider;
  scopes?: string[];
  redirectUri?: string;
  state?: string;
}

export interface OAuthAuthorizationData {
  authorizationUrl: string;
  state: string;
  codeVerifier?: string; // For PKCE
}

export type OAuthAuthorizationResponse = ApiResponse<OAuthAuthorizationData>;

/**
 * OAuth Callback Request/Response Types
 */
export interface OAuthCallbackRequest {
  code: string;
  state: string;
  provider: Provider;
  codeVerifier?: string; // For PKCE
}

export type OAuthCallbackResponse = ApiResponse<SafeCredential>;