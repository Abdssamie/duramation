# Design Document

## Overview

This design establishes a comprehensive type system for all API endpoints by centralizing types in the shared package. The approach focuses on creating reusable, strongly-typed interfaces that can be shared between frontend and backend, ensuring consistency and reducing maintenance overhead.

## Architecture

### Type Organization Structure
```
packages/shared/src/
├── types/
│   ├── api/
│   │   ├── common.ts          # Common API types (ApiResponse, ApiError, etc.)
│   │   ├── auth.ts            # Authentication related types
│   │   ├── workflows.ts       # Workflow endpoint types
│   │   ├── credentials.ts     # Credential endpoint types
│   │   ├── dashboard.ts       # Dashboard endpoint types
│   │   └── marketplace.ts     # Marketplace endpoint types
│   └── index.ts               # Re-export all types
```

## Components and Interfaces

### 1. Common API Types

**Base Response Types:**
- `ApiResponse<T>` - Standard success response wrapper
- `ApiError` - Standardized error response
- `PaginatedResponse<T>` - Paginated data responses
- `PaginationParams` - Query parameters for pagination

**Authentication Types:**
- `AuthenticatedRequest` - Base type for authenticated endpoints
- `AuthError` - Authentication error responses

### 2. Endpoint-Specific Types

**Workflows:**
- `WorkflowListRequest/Response`
- `WorkflowCreateRequest/Response`
- `WorkflowUpdateRequest/Response`
- `WorkflowRunRequest/Response`

**Credentials:**
- `CredentialListRequest/Response`
- `CredentialCreateRequest/Response` (already exists)
- `CredentialUpdateRequest/Response`

**Dashboard:**
- `MetricsRequest/Response`
- `ChartDataRequest/Response`
- `ServiceRequestCreateRequest/Response`

### 3. Validation Schemas

Using Zod schemas that can be shared between frontend and backend:
- Request validation schemas
- Response validation schemas
- Common field validation (IDs, dates, etc.)

## Data Models

### Core API Response Structure
```typescript
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: string;
}

interface ApiError {
  error: string;
  code?: string;
  details?: string[];
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

### Request/Response Pairs
Each endpoint will have clearly defined request and response types:
- Input validation through Zod schemas
- Output type safety through TypeScript interfaces
- Consistent error handling patterns

## Error Handling

### Standardized Error Responses
- HTTP status codes mapped to specific error types
- Structured error messages with codes
- Validation error details in consistent format
- Development vs production error message handling

### Error Categories
- `VALIDATION_ERROR` - Input validation failures
- `AUTHENTICATION_ERROR` - Auth failures
- `AUTHORIZATION_ERROR` - Permission failures
- `NOT_FOUND_ERROR` - Resource not found
- `CONFLICT_ERROR` - Resource conflicts
- `INTERNAL_ERROR` - Server errors

## Testing Strategy

### Type Safety Testing
- Compile-time type checking ensures API contracts
- Shared types prevent frontend/backend mismatches
- Zod schema validation provides runtime safety

### Integration Testing
- API endpoint tests use shared types
- Frontend API client tests use same types as backend
- Mock data generation using shared types

## Implementation Approach

### Phase 1: Create Shared Types
1. Define common API response structures
2. Create endpoint-specific request/response types
3. Add Zod validation schemas

### Phase 2: Update Backend Endpoints
1. Import types from shared package
2. Apply types to existing endpoints
3. Add validation using shared schemas

### Phase 3: Update Frontend API Client
1. Use shared types for API calls
2. Remove duplicate type definitions
3. Ensure type consistency across calls

### Phase 4: Validation & Testing
1. Verify all endpoints use shared types
2. Test type safety across frontend/backend
3. Validate error handling consistency