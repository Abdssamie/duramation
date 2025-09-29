# Requirements Document

## Introduction

This feature modifies the existing frontend automation dashboard to improve the user experience around credential management. Currently, users can add credentials through the credentials tab, but this creates a disconnect between workflow creation and credential setup. The new approach will make the credentials tab read-only for listing existing credentials, while moving the credential addition functionality to the workflows tab where users can add required credentials in context of their workflow needs.

## Requirements

### Requirement 1

**User Story:** As a user managing automation workflows, I want the credentials tab to only display my existing credentials, so that I can easily view and manage what I already have without clutter.

#### Acceptance Criteria

1. WHEN I navigate to the credentials tab THEN the system SHALL display only existing credentials in a read-only list format
2. WHEN I view the credentials tab THEN the system SHALL NOT display any "Add Credential" or "Connect" buttons
3. WHEN I view a credential card THEN the system SHALL show credential details, status, and management options (edit/delete)
4. WHEN there are no credentials THEN the system SHALL display an empty state message directing users to add credentials through workflows

### Requirement 2

**User Story:** As a user creating or managing workflows, I want to add required credentials directly from the workflows tab, so that I can set up integrations in the context of my workflow needs.

#### Acceptance Criteria

1. WHEN I am in the workflows tab THEN the system SHALL provide an option to add new credentials
2. WHEN I click to add credentials THEN the system SHALL display available integration options (Google, Slack, HubSpot, etc.)
3. WHEN I select an integration THEN the system SHALL initiate the appropriate authentication flow (OAuth or API key input)
4. WHEN credential setup is complete THEN the system SHALL return me to the workflows tab and show the new credential as available

### Requirement 3

**User Story:** As a user setting up a workflow, I want to see which credentials are required and easily add missing ones, so that I can complete my workflow configuration efficiently.

#### Acceptance Criteria

1. WHEN I view workflow details THEN the system SHALL display required credentials for that workflow
2. WHEN a required credential is missing THEN the system SHALL highlight this and provide an "Add Credential" action
3. WHEN I add a credential from workflow context THEN the system SHALL automatically associate it with the workflow if applicable
4. WHEN all required credentials are available THEN the system SHALL indicate the workflow is ready to run

### Requirement 4

**User Story:** As a user managing credentials, I want to maintain the same credential management capabilities, so that I can still edit, delete, and view credential details.

#### Acceptance Criteria

1. WHEN I view a credential in the credentials tab THEN the system SHALL provide edit and delete actions
2. WHEN I edit a credential THEN the system SHALL open the same edit dialog as before
3. WHEN I delete a credential THEN the system SHALL show appropriate warnings about workflow impacts
4. WHEN I manage credentials THEN the system SHALL maintain all existing security and encryption features