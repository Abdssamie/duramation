# Design Document

## Overview

This design consolidates the fragmented credential handling system into a unified architecture centered around the shared package. Currently, credential types, interfaces, and utilities are scattered across frontend and backend with inconsistent patterns, duplicate code, and complex maintenance overhead. The new architecture establishes `packages/shared` as the single source of truth for all credential-related functionality, providing consistent types, utilities, and patterns across the entire application.

## Architecture

### Current Architecture Problems
- **Type Duplication**: Credential interfaces defined separately in frontend (`apps/frontend/src/types/workflow.ts`) and backend (`apps/inngest-app/src/types/credentials/`)
- **Inconsistent Provider Handling**: Provider enums redefined in multiple places (frontend components, backend services)
- **Scattered Utilities**: Credential validation, status calculation, and provider management spread across different packages
- **Complex Import Paths**: Developers need to know where each credential utility lives
- **Maintenance Overhead**: Changes require updates in multiple locations

### New Unified Architecture
- **Single Source of Truth**: All credential types, interfaces, and utilities in `packages/shared/src/types/credentials.ts` and `packages/shared/src/utils/credentials.ts`
- **Consistent Imports**: All credential functionality imported from `@duramation/shared`
- **Extensible Patterns**: Provider configuration and credential types easily extensible through shared configuration
- **Type Safety**: Full TypeScript support with consistent types across frontend and backend
- **Simplified Maintenance**: Single location for all credential-related updates

## Components and Interfaces

### Core Credential Types

#### 1. Unified Credential Interfaces
**Location**: `packages/shared/src/types/credentials.ts`

```typescript
// Base credential interface aligned with database schema
export interface BaseCredential {
  id: string;
  name: string;
  type: CredentialType;
  provider: Provider;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Safe credential response (no secrets)
export interface SafeCredential extends BaseCredential {
  config?: Record<string, any>;
  isValid?: boolean;
  lastValidated?: Date;
}

// Credential with decrypted secret (backend only)
export interface CredentialWithSecret extends BaseCredential {
  secret: CredentialSecret;
  config?: Record<string, any>;
}

// Credential creation request
export interface CredentialCreateRequest {
  name: string;
  type: CredentialType;
  provider: Provider;
  secret: CredentialSecret;
  config?: Record<string, any>;
}

// Credential update request
export interface CredentialUpdateRequest {
  name?: string;
  secret?: CredUSEentialSecret;
  config?: Record<string, any>;
}
```

#### 2. Provider Configuration System
**Location**: `packages/shared/src/types/providers.ts`

```typescript
// Provider configuration interface
export interface ProviderConfig {
  name: string;
  displayName: string;
  type: CredentialType;
  icon: string;
  authType: 'oauth' | 'api_key' | 'custom';
  scopes?: string[];
  endpoints?: {
    auth?: string;
    token?: string;
    validate?: string;
  };
  fields?: ProviderField[];
}

// Provider field definition for custom forms
export interface ProviderField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'url' | 'select';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

// Centralized provider configuration
export const PROVIDER_CONFIGS: Record<Provider, ProviderConfig> = {
  GOOGLE: {
    name: 'google',
    displayName: 'Google',
    type: 'OAUTH',
    icon: 'google',
    authType: 'oauth',
    scopes: ['profile', 'email'],
    endpoints: {
      auth: 'https://accounts.google.com/oauth/authorize',
      token: 'https://oauth2.googleapis.com/token'
    }
  },
  // ... other providers
};
```

#### 3. Credential Secret Types
**Location**: `packages/shared/src/types/credential-secrets.ts`

```typescript
// OAuth secret structure
export interface OAuthSecret {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresAt?: Date;
  scope?: string;
}

// API Key secret structure
export interface ApiKeySecret {
  apiKey: string;
  apiUrl?: string;
  headers?: Record<string, string>;
}

// Custom secret structure
export interface CustomSecret {
  [key: string]: any;
}

// Union type for all credential secrets
export type CredentialSecret = OAuthSecret | ApiKeySecret | CustomSecret;
```

### Credential Utilities

#### 1. Credential Validation Utilities
**Location**: `packages/shared/src/utils/credential-validation.ts`

```typescript
// Validate credential secret based on provider and type
export function validateCredentialSecret(
  provider: Provider,
  type: CredentialType,
  secret: any
): ValidationResult {
  const config = PROVIDER_CONFIGS[provider];
  // Implementation based on provider configuration
}

// Validate credential completeness
export function validateCredentialCompleteness(
  credential: Partial<CredentialCreateRequest>
): ValidationResult {
  // Implementation for form validation
}

// Check if credential needs refresh (for OAuth)
export function needsRefresh(credential: CredentialWithSecret): boolean {
  // Implementation for OAuth token refresh checking
}
```

#### 2. Provider Management Utilities
**Location**: `packages/shared/src/utils/provider-utils.ts`

```typescript
// Get provider configuration
export function getProviderConfig(provider: Provider): ProviderConfig {
  return PROVIDER_CONFIGS[provider];
}

// Get provider display name
export function getProviderDisplayName(provider: Provider): string {
  return PROVIDER_CONFIGS[provider].displayName;
}

// Get provider icon component name
export function getProviderIcon(provider: Provider): string {
  return PROVIDER_CONFIGS[provider].icon;
}

// Get required scopes for provider
export function getProviderScopes(provider: Provider): string[] {
  return PROVIDER_CONFIGS[provider].scopes || [];
}

// Check if provider supports OAuth
export function isOAuthProvider(provider: Provider): boolean {
  return PROVIDER_CONFIGS[provider].authType === 'oauth';
}
```

#### 3. Workflow-Credential Integration Utilities
**Location**: `packages/shared/src/utils/workflow-credentials.ts`

```typescript
// Enhanced workflow type with credential relationships
export interface WorkflowWithCredentials {
  id: string;
  name: string;
  templateId: string;
  requiredProviders: Provider[];
  requiredScopes?: Record<string, string[]>;
  workflowCredentials: Array<{
    credential: SafeCredential;
  }>;
  // ... other workflow fields
}

// Calculate credential status for workflow
export function calculateWorkflowCredentialStatus(
  workflow: WorkflowWithCredentials
): CredentialStatusResult {
  const requiredProviders = workflow.requiredProviders;
  const availableProviders = workflow.workflowCredentials.map(
    wc => wc.credential.provider
  );
  
  return calculateCredentialStatus(requiredProviders, availableProviders);
}

// Get missing credentials for workflow
export function getMissingWorkflowCredentials(
  workflow: WorkflowWithCredentials
): Provider[] {
  const requiredProviders = workflow.requiredProviders;
  const availableProviders = workflow.workflowCredentials.map(
    wc => wc.credential.provider
  );
  
  return getMissingProviders(requiredProviders, availableProviders);
}

// Check if workflow can run (has all required credentials)
export function canWorkflowRun(workflow: WorkflowWithCredentials): boolean {
  const status = calculateWorkflowCredentialStatus(workflow);
  return status.status === 'complete';
}
```

### Authentication Flow Utilities

#### 1. OAuth Flow Management
**Location**: `packages/shared/src/utils/oauth-flows.ts`

```typescript
// OAuth configuration for providers
export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  authUrl: string;
  tokenUrl: string;
}

// Generate OAuth authorization URL
export function generateOAuthUrl(
  provider: Provider,
  config: OAuthConfig,
  state?: string
): string {
  const providerConfig = getProviderConfig(provider);
  // Implementation for OAuth URL generation
}

// Parse OAuth callback response
export function parseOAuthCallback(
  provider: Provider,
  callbackData: Record<string, any>
): OAuthCallbackResult {
  // Implementation for parsing OAuth responses
}

// Refresh OAuth token
export async function refreshOAuthToken(
  provider: Provider,
  refreshToken: string,
  config: OAuthConfig
): Promise<OAuthSecret> {
  // Implementation for token refresh
}
```

#### 2. API Key Management
**Location**: `packages/shared/src/utils/api-key-management.ts`

```typescript
// Validate API key format
export function validateApiKeyFormat(
  provider: Provider,
  apiKey: string
): boolean {
  const config = getProviderConfig(provider);
  // Implementation based on provider requirements
}

// Test API key validity
export async function testApiKey(
  provider: Provider,
  apiKey: string,
  apiUrl?: string
): Promise<ApiKeyTestResult> {
  // Implementation for API key testing
}

// Generate API key configuration
export function generateApiKeyConfig(
  provider: Provider,
  apiKey: string,
  apiUrl?: string
): ApiKeySecret {
  // Implementation for API key configuration
}
```

## Data Models

### Enhanced Type Definitions

#### 1. Credential Status Types
```typescript
export interface CredentialStatusResult {
  total: number;
  available: number;
  missing: number;
  status: 'complete' | 'partial' | 'missing';
  missingProviders: Provider[];
  availableProviders: Provider[];
}

export interface CredentialRequirement {
  provider: Provider;
  scopes?: string[];
  required: boolean;
  available: boolean;
}
```

#### 2. Validation Result Types
```typescript
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

export interface ApiKeyTestResult {
  isValid: boolean;
  error?: string;
  metadata?: Record<string, any>;
}

export interface OAuthCallbackResult {
  success: boolean;
  secret?: OAuthSecret;
  error?: string;
}
```

## Error Handling

### Standardized Error Types
```typescript
export class CredentialError extends Error {
  constructor(
    message: string,
    public code: string,
    public provider?: Provider,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'CredentialError';
  }
}

export class ValidationError extends CredentialError {
  constructor(message: string, provider?: Provider, details?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', provider, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends CredentialError {
  constructor(message: string, provider?: Provider, details?: Record<string, any>) {
    super(message, 'AUTHENTICATION_ERROR', provider, details);
    this.name = 'AuthenticationError';
  }
}
```

### Error Handling Utilities
```typescript
// Handle credential operation errors
export function handleCredentialError(error: unknown): CredentialError {
  if (error instanceof CredentialError) {
    return error;
  }
  
  return new CredentialError(
    error instanceof Error ? error.message : 'Unknown error',
    'UNKNOWN_ERROR'
  );
}

// Get user-friendly error message
export function getErrorMessage(error: CredentialError): string {
  switch (error.code) {
    case 'VALIDATION_ERROR':
      return `Validation failed: ${error.message}`;
    case 'AUTHENTICATION_ERROR':
      return `Authentication failed for ${error.provider}: ${error.message}`;
    default:
      return error.message;
  }
}
```

## Testing Strategy

### Unit Tests Structure
```
packages/shared/src/__tests__/
├── types/
│   ├── credentials.test.ts
│   ├── providers.test.ts
│   └── credential-secrets.test.ts
├── utils/
│   ├── credential-validation.test.ts
│   ├── provider-utils.test.ts
│   ├── workflow-credentials.test.ts
│   ├── oauth-flows.test.ts
│   └── api-key-management.test.ts
└── integration/
    ├── credential-flows.test.ts
    └── provider-integration.test.ts
```

### Test Coverage Requirements
- **Type Validation**: Test all credential type validations
- **Provider Configuration**: Test provider config retrieval and validation
- **Workflow Integration**: Test workflow-credential relationship utilities
- **OAuth Flows**: Test OAuth URL generation and callback parsing
- **API Key Management**: Test API key validation and testing
- **Error Handling**: Test all error scenarios and error message generation

## Migration Strategy

### Phase 1: Create Shared Foundation
1. Create unified credential types in shared package
2. Create provider configuration system
3. Create credential validation utilities
4. Create workflow-credential integration utilities

### Phase 2: Update Backend Services
1. Update backend credential services to use shared types
2. Replace backend credential validation with shared utilities
3. Update API endpoints to use shared interfaces
4. Update database operations to use shared types

### Phase 3: Update Frontend Components
1. Update frontend credential components to use shared types
2. Replace frontend credential utilities with shared utilities
3. Update provider handling to use shared configuration
4. Update workflow-credential integration to use shared utilities

### Phase 4: Remove Duplicated Code
1. Remove duplicate credential types from frontend and backend
2. Remove duplicate provider configurations
3. Remove duplicate validation logic
4. Update import statements across the codebase

### Phase 5: Testing and Validation
1. Run comprehensive test suite
2. Validate all credential flows work correctly
3. Test provider integrations
4. Validate workflow-credential relationships

## Security Considerations

### Credential Secret Handling
- **Type Safety**: Ensure credential secrets are properly typed
- **Encryption**: Maintain existing encryption patterns for stored secrets
- **Access Control**: Ensure proper access control for credential operations
- **Validation**: Validate all credential inputs before processing

### Provider Security
- **OAuth Security**: Implement proper OAuth state validation
- **API Key Security**: Validate API key formats and test safely
- **Token Management**: Handle OAuth token refresh securely
- **Error Handling**: Avoid exposing sensitive information in error messages

## Performance Considerations

### Import Optimization
- **Tree Shaking**: Ensure shared package supports tree shaking
- **Lazy Loading**: Implement lazy loading for provider configurations
- **Caching**: Cache provider configurations and validation results
- **Bundle Size**: Monitor shared package bundle size impact

### Runtime Performance
- **Validation Caching**: Cache validation results where appropriate
- **Provider Config Caching**: Cache provider configurations
- **Efficient Lookups**: Use efficient data structures for provider lookups
- **Memory Management**: Ensure proper cleanup of credential data

## Developer Experience

### Simplified Import Patterns
```typescript
// Before (scattered imports)
import { Provider } from '@duramation/db';
import { calculateCredentialStatus } from '../utils/credential-status';
import { CredentialCreateRequest } from '../types/credentials';

// After (unified imports)
import {
  Provider,
  CredentialCreateRequest,
  calculateCredentialStatus,
  getProviderConfig,
  validateCredentialSecret
} from '@duramation/shared';
```

### Consistent API Patterns
- **Standardized Functions**: All credential utilities follow consistent naming and parameter patterns
- **Type Safety**: Full TypeScript support with proper type inference
- **Documentation**: Comprehensive JSDoc documentation for all utilities
- **Examples**: Code examples for common credential operations

### Extensibility Patterns
- **Provider Addition**: Clear pattern for adding new providers
- **Credential Types**: Extensible system for new credential types
- **Validation Rules**: Configurable validation rules per provider
- **Custom Fields**: Support for provider-specific custom fields