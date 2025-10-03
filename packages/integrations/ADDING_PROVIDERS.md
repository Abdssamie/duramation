# Adding a New Provider

## Quick Checklist

When adding a new provider, you need to update **2 places**:

1. ✅ **Database Schema** - Add to `Provider` enum in `packages/db/schema.prisma`
2. ✅ **Provider Implementation** - Create provider folder in `packages/integrations/src/providers/`

That's it! The TypeScript types are auto-generated from Prisma.

## Step-by-Step Guide

### 1. Update Database Schema

**File**: `packages/db/schema.prisma`

```prisma
enum Provider {
  GOOGLE
  SLACK
  HUBSPOT
  FIRECRAWL
  INSTAGRAM
  CUSTOM
  YOUR_NEW_PROVIDER  // Add here
}
```

**Run migration**:
```bash
cd packages/db
npx prisma migrate dev --name add_your_provider
npx prisma generate
```

This will:
- Update the database
- Regenerate TypeScript types (including the `Provider` type)

### 2. Create Provider Implementation

**Create folder**: `packages/integrations/src/providers/your-provider/`

#### 2.1 Config (`config.ts`)

For **OAuth providers**:
```typescript
import { Provider } from '../../types/providers.js';
import type { ProviderUIConfig, OAuthProviderConfig } from '../types.js';

export const YOUR_PROVIDER_CONFIG = {
  provider: 'YOUR_PROVIDER' as Provider,
  name: 'Your Provider',
  description: 'Connect to Your Provider',
  icon: 'https://yourprovider.com/favicon.ico',
  authType: 'OAUTH' as const,
  
  oauth: {
    authUrl: 'https://yourprovider.com/oauth/authorize',
    tokenUrl: 'https://yourprovider.com/oauth/token',
    scopes: {
      basic: ['read', 'write'],
    },
    defaultScopes: ['read'],
  } satisfies OAuthProviderConfig,

  ui: {
    setupInstructions: 'Click to connect your account.',
    connectionTestAvailable: true,
  } satisfies ProviderUIConfig,
} as const;
```

For **API Key providers**:
```typescript
import { Provider } from '../../types/providers.js';
import type { ProviderUIConfig, ApiKeyProviderConfig } from '../types.js';

export const YOUR_PROVIDER_CONFIG = {
  provider: 'YOUR_PROVIDER' as Provider,
  name: 'Your Provider',
  description: 'Connect to Your Provider',
  icon: 'https://yourprovider.com/favicon.ico',
  authType: 'API_KEY' as const,
  
  apiKey: {
    baseUrl: 'https://api.yourprovider.com',
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    fields: [
      {
        name: 'apiKey',
        label: 'API Key',
        type: 'password',
        placeholder: 'your-api-key',
      },
    ],
  } satisfies ApiKeyProviderConfig,

  ui: {
    setupInstructions: 'Enter your API key.',
    connectionTestAvailable: true,
  } satisfies ProviderUIConfig,
} as const;
```

#### 2.2 Auth Handler (`auth.ts`)

For **OAuth**:
```typescript
export interface YourProviderOAuthSecret {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export class YourProviderAuthHandler {
  static generateAuthUrl(scopes: string[], state: string): string {
    // Generate OAuth URL
  }

  static async handleCallback(code: string): Promise<YourProviderOAuthSecret> {
    // Exchange code for tokens
  }
}
```

For **API Key**:
```typescript
export interface YourProviderApiKeySecret {
  apiKey: string;
}

export class YourProviderAuthHandler {
  static async validateApiKey(apiKey: string): Promise<boolean> {
    // Test the API key
  }

  static createCredential(apiKey: string): YourProviderApiKeySecret {
    return { apiKey };
  }
}
```

#### 2.3 Service Class (`services/your-service.ts`)

```typescript
export class YourProviderService {
  private apiKey: string;

  constructor(credentialPayload: YourProviderApiKeySecret) {
    this.apiKey = credentialPayload.apiKey;
  }

  async someMethod() {
    // Implement API calls
  }
}
```

#### 2.4 Index (`index.ts`)

```typescript
export { YOUR_PROVIDER_CONFIG } from './config.js';
export { YourProviderAuthHandler, type YourProviderOAuthSecret } from './auth.js';
export { YourProviderService } from './services/your-service.js';
```

### 3. Register in Registry

**File**: `packages/integrations/src/providers/registry.ts`

```typescript
import * as YourProvider from './your-provider/index.js';

export const PROVIDER_REGISTRY: Record<Provider, ProviderRegistryEntry> = {
  // ... existing providers
  YOUR_PROVIDER: {
    config: YourProvider.YOUR_PROVIDER_CONFIG,
    authHandler: YourProvider.YourProviderAuthHandler,
    serviceClasses: {
      main: YourProvider.YourProviderService,
    },
  },
};
```

### 4. Create API Routes (for OAuth only)

**Auth URL**: `apps/inngest-app/src/app/api/credentials/your-provider/auth-url/route.ts`
**Callback**: `apps/inngest-app/src/app/api/credentials/your-provider/callback/route.ts`

Copy from `slack` or `google` routes and replace provider name.

### 5. Environment Variables

Add to `.env`:
```env
# For OAuth
YOUR_PROVIDER_CLIENT_ID=xxx
YOUR_PROVIDER_CLIENT_SECRET=xxx
YOUR_PROVIDER_REDIRECT_URL=http://localhost:3000/api/credentials/your-provider/callback

# For API Key (if needed)
YOUR_PROVIDER_API_KEY=xxx
```

## Why This Approach?

### Single Source of Truth
- ✅ Database enum is the **only** place you define providers
- ✅ TypeScript types are **auto-generated** from Prisma
- ✅ No manual type syncing needed

### Type Safety
- ✅ If you add a provider to the database but forget the registry, TypeScript will error
- ✅ If you remove a provider, TypeScript will catch all usages

### Migration Safety
- ✅ Database migrations track provider changes
- ✅ Can't accidentally have mismatched types between DB and code

## Common Mistakes

❌ **Don't** manually define `Provider` type in TypeScript  
✅ **Do** import it from `@duramation/db/types`

❌ **Don't** forget to run `prisma generate` after schema changes  
✅ **Do** run it to regenerate types

❌ **Don't** use string literals like `'GOOGLE'` without casting  
✅ **Do** use `'GOOGLE' as Provider` or import from generated types

## Testing Your Provider

1. **Build integrations package**: `cd packages/integrations && npm run build`
2. **Test auth flow**: Visit auth URL route
3. **Test service**: Create a test Inngest function
4. **Verify credentials**: Check database for stored credentials

## Example: Adding Notion

```bash
# 1. Update schema
# Add NOTION to Provider enum in schema.prisma

# 2. Run migration
cd packages/db
npx prisma migrate dev --name add_notion_provider
npx prisma generate

# 3. Create provider
mkdir -p packages/integrations/src/providers/notion
# Create config.ts, auth.ts, services/notion.ts, index.ts

# 4. Register
# Add to PROVIDER_REGISTRY in registry.ts

# 5. Create routes (if OAuth)
mkdir -p apps/inngest-app/src/app/api/credentials/notion/{auth-url,callback}
# Create route.ts files

# 6. Add env vars
# Add NOTION_CLIENT_ID, NOTION_CLIENT_SECRET, etc.

# Done!
```
