# Implementation Plan

- [x] 1. Create unified credential type definitions in shared package
  - Create `packages/shared/src/types/credentials.ts` with BaseCredential, SafeCredential, CredentialWithSecret interfaces
  - Create `packages/shared/src/types/credential-secrets.ts` with OAuthSecret, ApiKeySecret, CustomSecret types
  - Create CredentialCreateRequest and CredentialUpdateRequest interfaces aligned with database schema
  - Export all credential types from `packages/shared/src/types/index.ts`
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2. Create provider configuration system in shared package
  - Create `packages/shared/src/types/providers.ts` with ProviderConfig and ProviderField interfaces
  - Implement PROVIDER_CONFIGS constant with configuration for all providers (GOOGLE, SLACK, HUBSPOT, FIRECRAWL, CUSTOM)
  - Create provider-specific configuration including auth types, scopes, endpoints, and form fields
  - Export provider types and configurations from shared package index
  - _Requirements: 1.1, 3.1, 3.2_

- [x] 3. Create credential validation utilities in shared package
  - Create `packages/shared/src/utils/credential-validation.ts` with validateCredentialSecret function
  - Implement validateCredentialCompleteness function for form validation
  - Create needsRefresh function for OAuth token validation
  - Add ValidationResult and related error handling types
  - Export validation utilities from `packages/shared/src/utils/index.ts`
  - _Requirements: 2.1, 2.2, 3.3_

- [x] 4. Create provider management utilities in shared package
  - Create `packages/shared/src/utils/provider-utils.ts` with getProviderConfig, getProviderDisplayName functions
  - Implement getProviderIcon, getProviderScopes, and isOAuthProvider utility functions
  - Create provider lookup and configuration retrieval functions
  - Add comprehensive provider utility functions for consistent provider handling
  - _Requirements: 2.1, 2.2, 3.1_

- [x] 5. Create workflow-credential integration utilities in shared package
  - Create `packages/shared/src/utils/workflow-credentials.ts` with WorkflowWithCredentials interface
  - Implement calculateWorkflowCredentialStatus function using existing credential status logic
  - Create getMissingWorkflowCredentials and canWorkflowRun utility functions
  - Add workflow-specific credential requirement checking and status calculation
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 6. Create OAuth flow management utilities in shared package
  - Create `packages/shared/src/utils/oauth-flows.ts` with OAuthConfig interface and OAuth utility functions
  - Implement generateOAuthUrl function for OAuth authorization URL generation
  - Create parseOAuthCallback function for handling OAuth responses
  - Add refreshOAuthToken function for token refresh operations
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 7. Create API key management utilities in shared package
  - Create `packages/shared/src/utils/api-key-management.ts` with API key validation functions
  - Implement validateApiKeyFormat function for provider-specific API key validation
  - Create testApiKey function for API key validity testing
  - Add generateApiKeyConfig function for API key configuration generation
  - _Requirements: 2.1, 2.2, 3.3_

- [ ] 8. Create standardized error handling system in shared package
  - Create `packages/shared/src/types/errors.ts` with CredentialError, ValidationError, AuthenticationError classes
  - Implement error handling utilities in `packages/shared/src/utils/error-handling.ts`
  - Create handleCredentialError and getErrorMessage utility functions
  - Add comprehensive error types and error handling patterns for credential operations
  - _Requirements: 2.1, 2.2, 3.3_

- [x] 9. Update backend services to use shared credential types
  - Update `apps/inngest-app/src/services/credentials-store.ts` to import types from shared package
  - Replace local credential interfaces with shared BaseCredential, CredentialWithSecret types
  - Update credential validation to use shared validateCredentialSecret function
  - Modify API endpoints to use shared CredentialCreateRequest and CredentialUpdateRequest types
  - _Requirements: 1.2, 1.3, 2.1_

- [x] 10. Update backend API endpoints to use shared interfaces
  - Update `apps/inngest-app/src/app/api/credentials/route.ts` to use shared CredentialCreateRequest type
  - Update `apps/inngest-app/src/app/api/credentials/[id]/route.ts` to use shared CredentialUpdateRequest type
  - Replace local credential type definitions with shared package imports
  - Update credential validation logic to use shared validation utilities
  - _Requirements: 1.2, 1.3, 2.1_

- [x] 11. Update frontend components to use shared credential types
  - Update `apps/frontend/src/features/automation/components/WorkflowCredentialManager.tsx` to use shared types
  - Replace local Provider enum and credential interfaces with shared package imports
  - Update `apps/frontend/src/components/integrations/IntegrationSelector.tsx` to use shared PROVIDER_CONFIGS
  - Modify credential-related components to use shared provider utilities
  - _Requirements: 1.2, 1.3, 2.1_

- [x] 12. Update frontend credential utilities to use shared package
  - These changes might alreay be applied, so check if they are and abort in that case
  - Update `apps/frontend/src/features/automation/components/CredentialRequirementIndicator.tsx` to use shared utilities
  - Replace local PROVIDER_CONFIG with shared PROVIDER_CONFIGS import
  - Update credential status calculation to use shared calculateCredentialStatus function
  - Modify provider display logic to use shared getProviderDisplayName utility
  - _Requirements: 2.1, 2.2, 4.1_

- [x] 13. Update workflow-credential integration across frontend
  - These changes might alreay be applied, so check if they are and abort in that case
  - Update `apps/frontend/src/features/automation/workflow-panel-tabs/WorkflowCredentialsTab.tsx` to use shared types
  - Replace WorkflowWithCredentials type with shared interface
  - Update credential requirement checking to use shared workflow-credential utilities
  - Modify credential status display to use shared status calculation functions
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 14. Remove duplicate credential types and utilities
  - Remove duplicate Provider enum from `apps/frontend/src/features/automation/components/CredentialsTab.tsx`
  - Remove local credential interfaces from `apps/frontend/src/types/workflow.ts`
  - Remove duplicate PROVIDER_CONFIG from frontend components
  - Clean up duplicate credential validation logic from backend services
  - _Requirements: 1.1, 1.2, 3.1_

- [ ] 15. Update import statements across the codebase
  - Update all credential-related imports to use `@duramation/shared` package
  - Replace scattered imports with unified shared package imports
  - Update import paths in all frontend components using credential functionality
  - Update import paths in all backend services using credential functionality
  - _Requirements: 1.2, 1.3, 2.1_

- [ ] 16. Create comprehensive unit tests for shared credential utilities
  - Create test files in `packages/shared/src/__tests__/` for all credential utilities
  - Write tests for credential validation, provider utilities, and workflow-credential integration
  - Create tests for OAuth flows, API key management, and error handling
  - Add integration tests for credential type validation and provider configuration
  - _Requirements: 2.1, 2.2, 3.3_

- [ ] 17. Update shared package build configuration and exports
  - Update `packages/shared/package.json` to include new credential dependencies
  - Configure TypeScript build to properly export all credential types and utilities
  - Update `packages/shared/src/index.ts` to export all credential functionality
  - Ensure proper tree-shaking support for credential utilities
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 18. Validate and test complete credential system integration
  - Test all credential creation flows using shared types and utilities
  - Validate OAuth flows work correctly with shared OAuth utilities
  - Test API key validation and management using shared utilities
  - Verify workflow-credential integration works with shared workflow utilities
  - _Requirements: 2.1, 4.1, 5.1_