import { z } from 'zod';
import { 
  idSchema, 
  paginationParamsSchema, 
  nonEmptyStringSchema, 
  optionalDateStringSchema,
  urlSchema,
} from './common.js';
import { apiResponseSchema, paginatedResponseSchema } from './api.js';

/**
 * Credential validation schemas
 */

// Provider enum (should match the database enum)
export const providerSchema = z.enum([
  'google',
  'slack',
  'hubspot',
  'firecrawl',
  'openai',
  'anthropic',
  'custom'
]);

// Credential type enum
export const credentialTypeSchema = z.enum([
  'oauth2',
  'api_key',
  'basic_auth',
  'bearer_token',
  'custom'
]);

// Safe credential schema (without secrets)
export const safeCredentialSchema = z.object({
  id: idSchema,
  name: nonEmptyStringSchema,
  provider: providerSchema,
  type: credentialTypeSchema,
  isValid: z.boolean(),
  expiresAt: optionalDateStringSchema,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  userId: idSchema,
  scopes: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

/**
 * Credential List Request/Response Schemas
 */
export const credentialListRequestSchema = paginationParamsSchema.extend({
  provider: providerSchema.optional(),
  type: credentialTypeSchema.optional(),
  isValid: z.boolean().optional(),
  expiringBefore: z.iso.datetime().optional(),
});

export const credentialListResponseSchema = paginatedResponseSchema(safeCredentialSchema);

/**
 * Credential Create Request/Response Schemas
 */
export const credentialCreateRequestSchema = z.object({
  name: nonEmptyStringSchema,
  provider: providerSchema,
  type: credentialTypeSchema,
  secrets: z.record(z.string(), z.any()),
  scopes: z.array(z.string()).optional(),
  expiresAt: optionalDateStringSchema,
  metadata: z.record(z.string(), z.any()).optional(),
}).refine(
  (data) => {
    // Validate required secrets based on credential type
    if (data.type === 'api_key' && !data.secrets.apiKey) {
      return false;
    }
    if (data.type === 'basic_auth' && (!data.secrets.username || !data.secrets.password)) {
      return false;
    }
    if (data.type === 'bearer_token' && !data.secrets.token) {
      return false;
    }
    return !(data.type === 'oauth2' && (!data.secrets.accessToken || !data.secrets.refreshToken));

  },
  {
    message: 'Required secrets are missing for the specified credential type',
    path: ['secrets'],
  }
);

export const credentialCreateResponseSchema = apiResponseSchema(safeCredentialSchema);

/**
 * Credential Update Request/Response Schemas
 */
export const credentialUpdateRequestSchema = z.object({
  name: nonEmptyStringSchema.optional(),
  secrets: z.record(z.string(), z.any()).optional(),
  scopes: z.array(z.string()).optional(),
  expiresAt: optionalDateStringSchema,
  metadata: z.record(z.string(), z.any()).optional(),
});

export const credentialUpdateResponseSchema = apiResponseSchema(safeCredentialSchema);

/**
 * Credential Get Request/Response Schemas
 */
export const credentialGetRequestSchema = z.object({
  id: idSchema,
  includeSecret: z.boolean().default(false),
});

export const credentialGetResponseSchema = apiResponseSchema(safeCredentialSchema);

/**
 * Credential Delete Request/Response Schemas
 */
export const credentialDeleteRequestSchema = z.object({
  id: idSchema,
});

export const credentialDeleteResponseSchema = apiResponseSchema(z.object({
  deleted: z.boolean(),
}));

/**
 * Credential Validation Request/Response Schemas
 */
export const credentialValidateRequestSchema = z.object({
  id: idSchema,
});

export const credentialValidationResultSchema = z.object({
  isValid: z.boolean(),
  validatedAt: z.iso.datetime(),
  error: z.string().optional(),
  expiresAt: optionalDateStringSchema,
});

export const credentialValidateResponseSchema = apiResponseSchema(credentialValidationResultSchema);

/**
 * OAuth Authorization Request/Response Schemas
 */
export const oauthAuthorizationRequestSchema = z.object({
  provider: providerSchema,
  scopes: z.array(z.string()).optional(),
  redirectUri: urlSchema.optional(),
  state: z.string().optional(),
});

export const oauthAuthorizationDataSchema = z.object({
  authorizationUrl: urlSchema,
  state: nonEmptyStringSchema,
  codeVerifier: z.string().optional(), // For PKCE
});

export const oauthAuthorizationResponseSchema = apiResponseSchema(oauthAuthorizationDataSchema);

/**
 * OAuth Callback Request/Response Schemas
 */
export const oauthCallbackRequestSchema = z.object({
  code: nonEmptyStringSchema,
  state: nonEmptyStringSchema,
  provider: providerSchema,
  codeVerifier: z.string().optional(), // For PKCE
});

export const oauthCallbackResponseSchema = apiResponseSchema(safeCredentialSchema);

// Type inference helpers
export type Provider = z.infer<typeof providerSchema>;
export type CredentialType = z.infer<typeof credentialTypeSchema>;
export type SafeCredential = z.infer<typeof safeCredentialSchema>;
export type CredentialListRequest = z.infer<typeof credentialListRequestSchema>;
export type CredentialCreateRequest = z.infer<typeof credentialCreateRequestSchema>;
export type CredentialUpdateRequest = z.infer<typeof credentialUpdateRequestSchema>;
export type CredentialGetRequest = z.infer<typeof credentialGetRequestSchema>;
export type CredentialDeleteRequest = z.infer<typeof credentialDeleteRequestSchema>;
export type CredentialValidateRequest = z.infer<typeof credentialValidateRequestSchema>;
export type CredentialValidationResult = z.infer<typeof credentialValidationResultSchema>;
export type OAuthAuthorizationRequest = z.infer<typeof oauthAuthorizationRequestSchema>;
export type OAuthAuthorizationData = z.infer<typeof oauthAuthorizationDataSchema>;
export type OAuthCallbackRequest = z.infer<typeof oauthCallbackRequestSchema>;