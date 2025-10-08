# Implementation Plan

- [x] 1. Create shared API type definitions
  - Create common API response types (ApiResponse, ApiError, PaginatedResponse)
  - Create authentication types (AuthenticatedRequest, AuthError)
  - Create pagination and query parameter types
  - _Requirements: 1.1, 2.1, 3.1_

- [ ] 2. Create endpoint-specific type definitions
  - [x] 2.1 Create workflow endpoint types
    - Define WorkflowListRequest/Response types
    - Define WorkflowCreateRequest/Response types
    - Define WorkflowUpdateRequest/Response types
    - Define WorkflowRunRequest/Response types
    - _Requirements: 1.1, 3.2_

  - [x] 2.2 Create credential endpoint types
    - Define CredentialListRequest/Response types
    - Update existing CredentialCreateRequest type
    - Define CredentialUpdateRequest/Response types
    - _Requirements: 1.1, 3.2_

  - [x] 2.3 Create dashboard endpoint types
    - Define MetricsRequest/Response types
    - Define ChartDataRequest/Response types
    - Define ServiceRequestCreateRequest/Response types
    - _Requirements: 1.1, 3.2_

  - [x] 2.4 Create marketplace endpoint types
    - Define MarketplaceQuery and MarketplaceResponse types
    - Define template installation types
    - _Requirements: 1.1, 3.2_

- [ ] 3. Create validation schemas with Zod
  - [x] 3.1 Create common validation schemas
    - Create ID validation schema
    - Create pagination validation schema
    - Create date/time validation schemas
    - _Requirements: 2.2, 4.3_

  - [x] 3.2 Create endpoint-specific validation schemas
    - Create workflow validation schemas
    - Create credential validation schemas
    - Create dashboard validation schemas
    - _Requirements: 2.2, 4.3_

- [x] 4. Update backend endpoints to use shared types
  - [x] 4.1 Update workflow endpoints
    - Update /api/workflows route to use shared types
    - Update /api/workflows/[id] route to use shared types
    - Update /api/workflows/run/[id] route to use shared types
    - Update /api/workflows/install/[templateId] route to use shared types
    - _Requirements: 1.2, 4.1_

  - [x] 4.2 Update credential endpoints
    - Update /api/credentials route to use shared types
    - Update /api/credentials/[id] route to use shared types
    - Update OAuth endpoints to use shared types
    - _Requirements: 1.2, 4.1_

  - [x] 4.3 Update dashboard endpoints
    - Update /api/dashboard/metrics route to use shared types
    - Update /api/dashboard/chart-data route to use shared types
    - Update /api/dashboard/service-requests route to use shared types
    - _Requirements: 1.2, 4.1_

  - [x] 4.4 Update marketplace endpoints
    - Update /api/marketplace/workflows route to use shared types
    - _Requirements: 1.2, 4.1_

- [-] 5. Update frontend API client to use shared types
  - [x] 5.1 Remove duplicate type definitions from api-client.ts
    - Remove local interface definitions that now exist in shared
    - Import all types from @duramation/shared
    - _Requirements: 1.2, 4.2_

  - [x] 5.2 Update API method signatures
    - Update all API methods to use shared request/response types
    - Ensure type safety across all API calls
    - _Requirements: 1.2, 4.2_

- [ ] 6. Add error handling standardization
  - [ ] 6.1 Create standardized error response utilities
    - Create error response helper functions
    - Create error code constants
    - _Requirements: 2.1, 2.2_

  - [ ] 6.2 Update all endpoints to use standardized error handling
    - Apply consistent error responses across all endpoints
    - Use shared error types and codes
    - _Requirements: 2.1, 2.3, 4.1_

- [ ] 7. Validate and test type consistency
  - [ ] 7.1 Verify all endpoints use shared types
    - Check that no endpoints use local type definitions
    - Ensure all imports come from @duramation/shared
    - _Requirements: 4.1, 4.2_

  - [ ] 7.2 Test API type safety
    - Verify frontend/backend type compatibility
    - Test error response consistency
    - _Requirements: 4.1, 4.2, 4.3_