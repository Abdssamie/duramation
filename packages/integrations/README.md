# @duramation/integrations

A modular, type-safe integration system for connecting to third-party services.

## Overview

This package provides a clean, extensible architecture for managing integrations with various third-party services. It includes:

1. **Provider Configuration Registry** - Centralized configuration for all supported providers
2. **Integration Service Registry** - Standardized service interfaces for consistent API interactions
3. **Credential Management** - Secure storage and retrieval of API credentials
4. **OAuth Handling** - Built-in support for OAuth authentication flows
5. **Generic UI Renderer** - Auto-generated forms based on provider configurations
6. **Inngest Middleware** - Easy injection of integration services into workflow runs

## Installation

```bash
yarn add @duramation/integrations
```

## Usage

### 1. Provider Configuration

All providers are defined in the `PROVIDER_CONFIGS` registry:

```typescript
import { PROVIDER_CONFIGS, getProviderConfig } from '@duramation/integrations';

// Get configuration for a specific provider
const config = getProviderConfig('INSTAGRAM');
console.log(config.displayName); // "Instagram Business"
```

### 2. Adding New Providers

To add a new provider, simply add it to the `PROVIDER_CONFIGS` object in `src/types/providers.ts`:

```typescript
['MY_SERVICE']: {
  id: 'my-service',
  name: 'my-service',
  displayName: 'My Service',
  description: 'Connect to My Service API',
  type: 'OAUTH',
  icon: 'my-service',
  color: 'text-blue-600',
  bgColor: 'bg-blue-50',
  authType: 'oauth',
  category: 'development',
  requiresScopes: true,
  scopes: ['read', 'write'],
  endpoints: {
    authUrl: 'https://myservice.com/oauth/authorize',
    tokenUrl: 'https://myservice.com/oauth/token',
    callbackUrl: '/api/auth/my-service/callback',
    apiBaseUrl: 'https://api.myservice.com'
  }
}
```

### 3. Integration Service Registry

Register and use integration services:

```typescript
import { integrationServiceRegistry, GoogleService } from '@duramation/integrations';

// Create and register a service
const googleService = new GoogleService(userId, credentialId, credentialPayload);
integrationServiceRegistry.registerService('GOOGLE', googleService);

// Use the service
const service = integrationServiceRegistry.getService('GOOGLE');
```

### 4. Credential Management

Store and retrieve credentials securely:

```typescript
import { credentialStore } from '@duramation/integrations';

// Store a credential
const credential = await credentialStore.store({
  userId: 'user123',
  provider: 'GOOGLE',
  type: 'OAUTH',
  data: {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    expiresIn: 3600,
    scopes: ['read', 'write']
  }
});

// Retrieve a credential
const retrieved = await credentialStore.retrieve(credential.id, 'user123');
```

### 5. OAuth Handling

Generate OAuth URLs and handle callbacks:

```typescript
import { OAuthHandler } from '@duramation/integrations';

// Generate auth URL
const state = { provider: 'GOOGLE', userId: 'user123' };
const authUrl = OAuthHandler.generateAuthUrl('GOOGLE', state, 'https://yourapp.com/callback');

// Handle callback
const tokenData = await OAuthHandler.handleCallback('GOOGLE', code, state);
```

### 6. Inngest Middleware

Inject integration services into workflows:

```typescript
import { integrationMiddleware } from '@duramation/integrations';

export const myWorkflow = inngest.createFunction(
  { id: "my-workflow" },
  { event: "my/event" },
  [integrationMiddleware],
  async ({ event, step, integrations, credentials }) => {
    if (integrations.hasIntegration('GOOGLE')) {
      const gmail = integrations.getIntegration('GOOGLE');
      const email = await gmail.sendMail('user@example.com', 'Hello', 'This is a test email');
      // Process email...
    }
    
    // Access raw credentials
    const googleCreds = credentials.find(cred => cred.provider === 'GOOGLE');
    
    return { success: true };
  }
);
```

## Extensibility

Adding a new integration requires only two steps:

1. Add the provider configuration to `PROVIDER_CONFIGS`
2. Create a service implementation that extends `BaseIntegrationService`

No UI or route changes are needed - everything is automatically handled by the generic components.

## Development

### Building

```bash
yarn build
```

### Development Mode

```bash
yarn dev
```

## Supported Providers

- Google (Gmail, Sheets, Drive)
- Slack
- HubSpot
- Firecrawl
- Custom APIs
- Instagram Business (example implementation)

## License

MIT