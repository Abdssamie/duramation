import { z } from 'zod';
import type { Provider } from '../types/providers.js';

/**
 * OAuth credential schema
 */
export const oauthCredentialSchema = z.object({
  accessToken: z.string().min(1, 'Access token is required'),
  refreshToken: z.string().optional(),
  expiresIn: z.number().optional(),
  expiresAt: z.number().optional(),
  scopes: z.array(z.string()).optional(),
  tokenType: z.string().optional()
});

/**
 * API Key credential schema
 */
export const apiKeyCredentialSchema = z.object({
  apiKey: z.string().min(1, 'API key is required')
});

/**
 * Google OAuth credential schema - matches shared type
 */
export const googleCredentialSchema = z.object({
  accessToken: z.string().min(1, 'Google access token is required'),
  refreshToken: z.string().min(1, 'Refresh token is required'),
  expiresIn: z.number(),
  scopes: z.array(z.string()).min(1, 'At least one scope is required')
});

/**
 * Slack OAuth credential schema - matches shared type
 */
export const slackCredentialSchema = z.object({
  accessToken: z.string().regex(/^xox[abp]-/, 'Invalid Slack token format'),
  teamId: z.string().min(1, 'Team ID is required'),
  refreshToken: z.string().optional(),
  expiresIn: z.number().optional(),
  scopes: z.array(z.string()).optional(),
  teamName: z.string().optional(),
  tokenType: z.string().optional(),
  botUserId: z.string().optional()
});

/**
 * Microsoft OAuth credential schema - matches shared type
 */
export const microsoftCredentialSchema = z.object({
  accessToken: z.string().min(1, 'Microsoft access token is required'),
  refreshToken: z.string().optional(),
  expiresIn: z.number(),
  scopes: z.array(z.string())
});

/**
 * Firecrawl API Key credential schema - matches shared type
 */
export const firecrawlCredentialSchema = z.object({
  apiKey: z.string().regex(/^fc-/, 'Invalid Firecrawl API key format')
});

/**
 * HubSpot OAuth credential schema - matches shared type
 */
export const hubspotCredentialSchema = z.object({
  accessToken: z.string().min(1, 'HubSpot access token is required'),
  refreshToken: z.string().min(1, 'Refresh token is required'),
  hubId: z.string().min(1, 'Hub ID is required'),
  expiresIn: z.number().optional(),
  scopes: z.array(z.string()).optional()
});

/**
 * Provider-specific credential schemas
 */
export const credentialSchemas: Record<Provider, z.ZodSchema> = {
  GOOGLE: googleCredentialSchema,
  SLACK: slackCredentialSchema,
  MICROSOFT: microsoftCredentialSchema,
  FIRECRAWL: firecrawlCredentialSchema,
  HUBSPOT: hubspotCredentialSchema,
  INSTAGRAM: oauthCredentialSchema,
  CUSTOM: z.union([oauthCredentialSchema, apiKeyCredentialSchema])
};

/**
 * Validate credentials for a specific provider
 * @throws {z.ZodError} If validation fails
 */
export function validateCredentials(provider: Provider, credentials: unknown) {
  const schema = credentialSchemas[provider];
  return schema.parse(credentials);
}

/**
 * Safely validate credentials and return result
 */
export function safeValidateCredentials(provider: Provider, credentials: unknown) {
  const schema = credentialSchemas[provider];
  return schema.safeParse(credentials);
}

/**
 * Get validation errors as user-friendly messages
 */
export function getValidationErrors(provider: Provider, credentials: unknown): string[] {
  const result = safeValidateCredentials(provider, credentials);
  
  if (result.success) {
    return [];
  }
  
  return result.error.issues.map((err: any) => {
    const path = err.path.join('.');
    return `${path}: ${err.message}`;
  });
}
