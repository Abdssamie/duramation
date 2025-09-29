# Design Document

## Overview

This design outlines the modifications needed to restructure credential management in the frontend automation dashboard. The key change is moving credential creation from the credentials tab to the workflows tab, making credential management more contextual and workflow-centric.

## Architecture

### Current Architecture
- **Credentials Tab**: Contains both listing and creation functionality
- **Workflows Tab**: Focuses only on workflow management
- **Credential Manager Component**: Handles both CRUD operations

### New Architecture
- **Credentials Tab**: Read-only listing and management of existing credentials
- **Workflows Tab**: Enhanced with credential creation capabilities
- **Workflow Credential Manager**: New component for workflow-context credential management
- **Shared Credential Services**: Common credential operations used by both tabs

## Components and Interfaces

### Modified Components

#### 1. CredentialsTab Component
**Location**: `apps/frontend/src/features/automation/components/CredentialsTab.tsx`

**Changes**:
- Remove "Connect Google" button and similar add credential actions
- Remove credential creation dialogs and forms
- Focus on displaying existing credentials in cards
- Update empty state to direct users to workflows tab
- Maintain edit/delete functionality for existing credentials

**New Props**:
```typescript
interface CredentialsTabProps {
  readOnly?: boolean; // Default true for this context
  showAddActions?: boolean; // Default false
}
```

#### 2. WorkflowsTab Component
**Location**: `apps/frontend/src/features/automation/components/WorkflowsTab.tsx`

**Changes**:
- Add credential management section or button
- Integrate credential creation flows
- Show credential requirements for workflows
- Display credential status in workflow cards

**New Features**:
- "Add Credentials" button in header
- Credential requirement indicators on workflow cards
- Quick credential setup for workflow needs

#### 3. WorkflowDetailWidget Component
**Location**: `apps/frontend/src/features/automation/components/WorkflowDetailWidget.tsx`

**Changes**:
- Add credentials section showing required vs available credentials
- Add "Add Missing Credentials" functionality
- Show credential status and health for the workflow

### New Components

#### 1. WorkflowCredentialManager Component
**Location**: `apps/frontend/src/features/automation/components/WorkflowCredentialManager.tsx`

**Purpose**: Handle credential creation and management in workflow context

**Features**:
- Integration selection (Google, Slack, HubSpot, etc.)
- OAuth flow initiation
- API key input forms
- Credential association with workflows

**Interface**:
```typescript
interface WorkflowCredentialManagerProps {
  workflowId?: string;
  requiredProviders?: Provider[];
  onCredentialAdded?: (credential: Credential) => void;
  onClose?: () => void;
}
```

#### 2. CredentialRequirementIndicator Component
**Location**: `apps/frontend/src/features/automation/components/CredentialRequirementIndicator.tsx`

**Purpose**: Show credential status for workflows

**Features**:
- Visual indicators for missing/available credentials
- Quick add actions for missing credentials
- Credential health status

#### 3. IntegrationSelector Component
**Location**: `apps/frontend/src/components/integrations/IntegrationSelector.tsx`

**Purpose**: Reusable component for selecting integration types

**Features**:
- Grid of available integrations
- Provider-specific setup flows
- Integration descriptions and capabilities

## Data Models

### Enhanced Workflow Model
```typescript
interface WorkflowWithCredentials {
  // ... existing fields
  requiredCredentials?: {
    provider: Provider;
    scopes?: string[];
    required: boolean;
  }[];
  availableCredentials?: Credential[];
  credentialStatus?: 'complete' | 'partial' | 'missing';
}
```

### Credential Context Model
```typescript
interface CredentialContext {
  source: 'workflow' | 'manual';
  workflowId?: string;
  requiredScopes?: string[];
  autoAssociate?: boolean;
}
```

## Error Handling

### Credential Creation Errors
- OAuth flow failures: Show retry options and troubleshooting
- API key validation errors: Provide clear feedback and correction guidance
- Network errors: Implement retry mechanisms with exponential backoff

### Workflow Integration Errors
- Missing credentials: Clear indicators and quick resolution paths
- Credential permission issues: Detailed error messages with resolution steps
- Credential expiration: Proactive warnings and refresh options

## Testing Strategy

### Unit Tests
- Component rendering with different credential states
- Credential creation flow handling
- Error state management
- Props validation and default behaviors

### Integration Tests
- End-to-end credential creation from workflows tab
- Credential association with workflows
- OAuth flow completion
- API key validation flows

### User Experience Tests
- Navigation between tabs maintains state
- Credential creation doesn't lose workflow context
- Error messages are clear and actionable
- Loading states provide appropriate feedback

## Migration Strategy

### Phase 1: Component Preparation
1. Create new WorkflowCredentialManager component
2. Create IntegrationSelector component
3. Add credential context to workflow models

### Phase 2: Workflows Tab Enhancement
1. Integrate credential management into WorkflowsTab
2. Add credential requirements to WorkflowDetailWidget
3. Implement credential status indicators

### Phase 3: Credentials Tab Simplification
1. Remove add credential functionality from CredentialsTab
2. Update empty states and messaging
3. Ensure edit/delete functionality remains intact

### Phase 4: Testing and Refinement
1. Test all credential flows from workflows context
2. Verify credentials tab read-only functionality
3. Validate user experience across both tabs

## Security Considerations

### Credential Storage
- Maintain existing encryption for stored credentials
- Ensure OAuth tokens are properly secured
- Implement proper credential masking in UI

### Authentication Flows
- Validate OAuth state parameters
- Implement CSRF protection for credential creation
- Ensure proper session management during flows

### Access Control
- Maintain user-scoped credential access
- Validate workflow-credential associations
- Implement proper authorization checks

## Performance Considerations

### Component Loading
- Lazy load credential creation components
- Implement proper loading states
- Cache credential lists appropriately

### API Optimization
- Batch credential status checks
- Implement efficient credential-workflow association queries
- Use proper pagination for credential lists

## User Experience Flow

### Adding Credentials from Workflows
1. User navigates to Workflows tab
2. User clicks "Add Credentials" or sees missing credential indicator
3. System shows integration selector
4. User selects integration type (Google, Slack, etc.)
5. System initiates appropriate auth flow
6. User completes authentication
7. System returns to workflows with new credential available
8. User can immediately use credential in workflow

### Managing Existing Credentials
1. User navigates to Credentials tab
2. User sees read-only list of existing credentials
3. User can edit/delete credentials as needed
4. System shows which workflows use each credential
5. User gets warnings before deleting credentials in use