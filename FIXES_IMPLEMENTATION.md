# Fixes Implementation Summary

## ✅ Fix 1: Token Refresh (COMPLETED)

**Location:** `packages/integrations/src/services/providers/base-service.ts`

**Implementation:**
- Created `BaseProviderService` class with `refreshAccessToken()` and `executeWithRefresh()` methods
- Services extend this base class
- On 401 error, automatically refreshes token and retries request
- Updates credentials in memory after refresh

**Updated Services:**
- ✅ SlackService
- ⏳ GoogleService (needs update)
- ⏳ MicrosoftService (needs update)
- ⏳ FirecrawlService (needs update)

**Pattern:**
```typescript
export class MyService extends BaseProviderService {
  constructor(credentials: CredentialSecret) {
    super('PROVIDER_NAME', credentials);
  }

  protected createClient(): ApiClient {
    return new ApiClient(providerClients.myprovider(this.credentials));
  }

  async someMethod() {
    return this.executeWithRefresh(() => this.client.get('endpoint'));
  }
}
```

---

## ⏳ Fix 2: Auto Template Sync

**Location:** `apps/inngest-app/src/inngest/functions/index.ts`

**Implementation Needed:**
```typescript
import { syncTemplates } from '../scripts/sync-templates';

// Auto-sync in development
if (process.env.NODE_ENV === 'development') {
  syncTemplates().catch(console.error);
}

export const workflowFunctions = [...]
```

**Create:** `apps/inngest-app/src/scripts/sync-templates.ts`
```typescript
import prisma from "@/lib/prisma";
import { addWorkflowTemplatesIfNotExist } from "@duramation/shared";
import * as templates from "@/inngest/functions";

export async function syncTemplates() {
  const allTemplates = Object.values(templates)
    .filter(t => t && typeof t === 'object' && 'eventName' in t);
  
  await addWorkflowTemplatesIfNotExist(prisma, allTemplates);
  console.log(`✅ Synced ${allTemplates.length} workflow templates`);
}
```

---

## ⏳ Fix 3: Credential Caching

**Location:** `packages/integrations/src/services/credential-store.ts`

**Implementation Needed:**
```typescript
import { Redis } from '@upstash/redis';

export class CredentialStore {
  private cache?: Redis;

  constructor() {
    if (process.env.UPSTASH_REDIS_REST_URL) {
      this.cache = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN
      });
    }
  }

  async getWorkflowCredentials(workflowId: string, userId: string) {
    const cacheKey = `creds:${workflowId}:${userId}`;
    
    // Try cache first
    if (this.cache) {
      const cached = await this.cache.get(cacheKey);
      if (cached) return JSON.parse(cached as string);
    }

    // Fetch from DB
    const credentials = await this.fetchFromDB(workflowId, userId);

    // Cache for 5 minutes
    if (this.cache && credentials.length > 0) {
      await this.cache.setex(cacheKey, 300, JSON.stringify(credentials));
    }

    return credentials;
  }

  private async fetchFromDB(workflowId: string, userId: string) {
    // Existing DB fetch logic
  }
}
```

---

## ⏳ Fix 4: Error Standardization

**Location:** `packages/integrations/src/services/errors.ts`

**Create Standard Error Types:**
```typescript
export class ProviderError extends Error {
  constructor(
    public provider: string,
    public code: string,
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}

export class AuthenticationError extends ProviderError {
  constructor(provider: string, message: string) {
    super(provider, 'AUTH_ERROR', message, 401);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends ProviderError {
  constructor(provider: string, retryAfter?: number) {
    super(provider, 'RATE_LIMIT', 'Rate limit exceeded', 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
  retryAfter?: number;
}

export class NotFoundError extends ProviderError {
  constructor(provider: string, resource: string) {
    super(provider, 'NOT_FOUND', `Resource not found: ${resource}`, 404);
    this.name = 'NotFoundError';
  }
}
```

**Update Services:**
```typescript
async someMethod() {
  try {
    return await this.client.get('endpoint');
  } catch (error: any) {
    if (error.response?.statusCode === 404) {
      throw new NotFoundError(this.provider, 'resource');
    }
    if (error.response?.statusCode === 429) {
      throw new RateLimitError(this.provider, error.response.headers['retry-after']);
    }
    throw new ProviderError(this.provider, 'API_ERROR', error.message, error.response?.statusCode);
  }
}
```

---

## Next Steps

1. **Complete Fix 1:** Update remaining services (Google, Microsoft, Firecrawl) to extend BaseProviderService
2. **Implement Fix 2:** Add auto template sync on dev server start
3. **Implement Fix 3:** Add Redis caching to credential store
4. **Implement Fix 4:** Create standard error types and update all services

## Testing

```bash
# Test token refresh
# 1. Get a credential with expired token
# 2. Trigger workflow
# 3. Verify it refreshes and succeeds

# Test auto sync
# 1. Modify a workflow template
# 2. Restart dev server
# 3. Check DB for updated template

# Test caching
# 1. Trigger workflow twice
# 2. Check Redis for cached credentials
# 3. Verify second call doesn't hit DB
```
