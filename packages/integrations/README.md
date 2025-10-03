# @duramation/integrations

Centralized integration package for managing third-party service connections.

## Structure

```
src/
├── providers/              # Provider-specific implementations
│   ├── google/
│   │   ├── config.ts      # Metadata, scopes, UI configuration
│   │   ├── auth.ts        # OAuth flow handlers
│   │   ├── services/      # Runtime service classes
│   │   │   ├── base.ts    # Base Google service with token refresh
│   │   │   └── sheets.ts  # Google Sheets specific methods
│   │   └── index.ts       # Public exports
│   ├── slack/
│   │   ├── config.ts
│   │   ├── auth.ts
│   │   ├── services/
│   │   │   └── slack.ts
│   │   └── index.ts
│   ├── firecrawl/
│   │   ├── config.ts
│   │   ├── auth.ts
│   │   ├── services/
│   │   │   └── firecrawl.ts
│   │   └── index.ts
│   └── registry.ts        # Central provider registry
├── middleware/            # Inngest middleware
│   └── inngest-middleware.ts
├── services/              # Core services
│   └── credential-store.ts
├── types/                 # Shared types
│   └── providers.ts
└── index.ts              # Public API

```

## Architecture

### Two-Layer Design

**Layer 1: Frontend (UI)**
- Workflow shows required credentials
- UI renders provider-specific setup forms
- Credentials registered to database

**Layer 2: Runtime (Inngest)**
- Middleware automatically retrieves credentials
- Functions use credentials to initialize services
- Services handle token refresh automatically

### Adding a New Provider

1. **Create provider directory**: `src/providers/your-provider/`

2. **Define configuration** (`config.ts`):
```typescript
export const YOUR_PROVIDER_CONFIG = {
  provider: 'YOUR_PROVIDER',
  name: 'Your Provider',
  description: '...',
  authType: 'oauth' | 'API_KEY',
  oauth: { ... } // or apiKey: { ... }
  ui: { ... }
};
```

3. **Implement auth handler** (`auth.ts`):
```typescript
export class YourProviderAuthHandler {
  static generateAuthUrl(scopes: string[], state: string): string { ... }
  static async handleCallback(code: string): Promise<YourProviderSecret> { ... }
}
```

4. **Create service classes** (`services/your-service.ts`):
```typescript
export class YourProviderService {
  constructor(credentialPayload: YourProviderSecret) { ... }
  async someMethod() { ... }
}
```

5. **Register in registry** (`providers/registry.ts`):
```typescript
export const PROVIDER_REGISTRY: Record<Provider, ProviderRegistryEntry> = {
  YOUR_PROVIDER: {
    config: YourProvider.YOUR_PROVIDER_CONFIG,
    authHandler: YourProvider.YourProviderAuthHandler,
    serviceClasses: {
      main: YourProvider.YourProviderService,
    },
  },
  // ...
};
```

## Usage

### Frontend: Setup Credentials

```typescript
import { getProviderRegistryConfig, getAuthHandler } from '@duramation/integrations';

// Get provider metadata for UI
const config = getProviderRegistryConfig('GOOGLE');

// Generate OAuth URL
const authHandler = getAuthHandler('GOOGLE');
const authUrl = authHandler.generateAuthUrl(config.oauth.defaultScopes, state);

// Handle callback
const secret = await authHandler.handleCallback(code);
// Save to database...
```

### Runtime: Use in Inngest Functions

```typescript
import { integrationMiddleware, Google } from '@duramation/integrations';

export const myWorkflow = inngest.createFunction(
  { id: "my-workflow" },
  { event: "my/event" },
  async ({ event, credentials }) => {
    // Find the credential you need
    const googleCred = credentials.find(c => c.provider === 'GOOGLE');
    
    // Initialize service
    const sheets = new Google.GoogleSheetsService(
      event.user.id,
      googleCred.id,
      googleCred.secret
    );
    
    // Use service (token refresh handled automatically)
    const data = await sheets.getSheetData(spreadsheetId, 'Sheet1!A1:Z100');
    
    return { data };
  }
);
```

## Available Providers

- **Google**: OAuth, Gmail, Sheets, Calendar, Drive
- **Slack**: OAuth, messaging, channels, users
- **Firecrawl**: API Key, web scraping, crawling
- **HubSpot**: Coming soon
- **Custom**: API Key, custom integrations

## Key Features

- ✅ Automatic OAuth token refresh
- ✅ Type-safe service classes
- ✅ Centralized provider registry
- ✅ UI metadata for frontend rendering
- ✅ Database-backed credential storage
- ✅ Inngest middleware integration
- ✅ Extensible architecture
