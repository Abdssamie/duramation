# Implementation Plan

- [x] 1. Create new credential management components using database workflow schema
  - Create IntegrationSelector component that reads from workflow's requiredProviders field
  - Create WorkflowCredentialManager component that uses database requiredProviders and requiredScopes
  - Create CredentialRequirementIndicator component that shows status based on database requirements
  - Components should handle dynamic provider requirements from database workflow model
  - _Requirements: 2.1, 2.2, 3.1_

- [x] 2. Enhance workflow data models and types to use database schema
  - Update WorkflowWithCredentials type to use requiredProviders and requiredScopes from database schema
  - Create CredentialContext interface for tracking credential creation source
  - Add credential status calculation based on database requiredProviders field
  - Map database requiredScopes to frontend credential requirement display
  - Get rid of the schedule tab, clients should request from the beginning wether a workflow run is actually a cron or an event based worklfow or directly run with clicking the 'Run' button. Replace the schedule tabl with the credentials required to set for the workflow
  - _Requirements: 3.1, 3.3_

- [x] 3. Modify CredentialsTab to be read-only
  - Remove "Connect Google" button and credential creation actions
  - Remove credential creation dialogs and forms
  - Update empty state message to direct users to workflows tab
  - Maintain existing edit/delete functionality for credentials
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.2, 4.3_

- [x] 4. Enhance WorkflowsTab with database-driven credential management
  - Add "Add Credentials" button to workflows tab header
  - Integrate WorkflowCredentialManager component with database workflow requirements
  - Add credential status indicators to workflow cards based on requiredProviders field
  - Implement credential creation flow using workflow's database-defined requirements
  - Display missing credentials by comparing available credentials to requiredProviders
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 5. Update WorkflowDetailWidget with database-driven credential requirements
  - Read requiredProviders from workflow database model to show required credentials
  - Use requiredScopes field to display specific permission requirements
  - Implement "Add Missing Credentials" functionality based on database requirements
  - Show credential health status by comparing available credentials to requiredProviders
  - Add credential association logic using database workflow-credential relationships
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 6. Implement credential creation flows using database workflow requirements
  - Add OAuth flow initiation from workflows tab using workflow's requiredProviders field
  - Implement API key input forms with validation against workflow's requiredScopes
  - Add credential validation and error handling for database-defined requirements
  - Implement automatic credential-workflow association by updating database relationships
  - Update workflow's credential status in database after successful credential creation
  - _Requirements: 2.2, 2.3, 3.3_

- [ ] 7. Update credential services to work with database schema
  - Modify credential API calls to fetch workflow requiredProviders and requiredScopes
  - Add credential requirement checking logic using database workflow model
  - Implement credential status tracking by comparing available credentials to database requirements
  - Add API endpoints to update workflow requiredProviders when credentials are added
  - Add proper error handling for credential operations and database updates
  - _Requirements: 2.4, 3.2, 4.1_

- [ ] 8. Add comprehensive error handling and loading states
  - Implement error handling for OAuth flow failures
  - Add loading states for credential creation processes
  - Create user-friendly error messages for credential issues
  - Add retry mechanisms for failed credential operations
  - _Requirements: 2.2, 2.3, 2.4_

- [ ] 9. Create unit tests for new components
  - Write tests for IntegrationSelector component
  - Write tests for WorkflowCredentialManager component
  - Write tests for CredentialRequirementIndicator component
  - Write tests for modified CredentialsTab and WorkflowsTab components
  - _Requirements: 1.1, 2.1, 3.1, 4.1_

- [ ] 10. Create integration tests for credential flows
  - Test end-to-end credential creation from workflows tab
  - Test credential association with workflows
  - Test OAuth flow completion and error handling
  - Test API key validation and workflow integration
  - _Requirements: 2.2, 2.3, 2.4, 3.3_

- [ ] 11. Update styling and user experience
  - Style new credential management components consistently
  - Ensure responsive design for new workflow credential features
  - Add proper loading animations and transitions
  - Implement consistent error and success messaging
  - _Requirements: 1.3, 2.1, 3.1_

- [ ] 12. Final integration and testing
  - Test complete user flow from workflows to credential creation
  - Verify credentials tab read-only functionality works correctly
  - Test credential editing and deletion from credentials tab
  - Validate all credential requirements are properly displayed
  - _Requirements: 1.1, 1.4, 2.4, 3.2, 4.2, 4.3_