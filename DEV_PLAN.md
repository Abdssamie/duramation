# Development Plan - Safe Extension Points

## 🎯 Where to Add Code (Won't Break Anything)

### 1. Add New Workflow
**Location:** `apps/inngest-app/src/inngest/functions/`

```bash
cd apps/inngest-app
pnpm workflow:create my-new-workflow
```

**Edit 2 files:**
1. `my-new-workflow/metadata.ts` - Define fields
2. `my-new-workflow/function.ts` - Add logic

**Register:**
```typescript
// apps/inngest-app/src/inngest/functions/index.ts
import { myNewWorkflow } from "./my-new-workflow/function";

export const workflowFunctions = [
  // ... existing
  myNewWorkflow  // Add here
];
```

**Auto-syncs on dev server restart** ✅

---

### 2. Add New Integration Provider
**Location:** `packages/integrations/src/providers/`

**4 files to create:**

```
providers/notion/
├── config.ts      # OAuth/API config
├── auth.ts        # Token exchange
├── index.ts       # Exports
└── services/      # (optional)
```

**Steps:**
1. Add to DB enum:
```prisma
// packages/db/schema.prisma
enum Provider {
  NOTION  // Add here
}
```
```bash
cd packages/db && pnpm db:push
```

2. Create config:
```typescript
// providers/notion/config.ts
export const NOTION_CONFIG = {
  provider: 'NOTION',
  name: 'Notion',
  authType: 'OAUTH',
  oauth: {
    authUrl: 'https://api.notion.com/v1/oauth/authorize',
    tokenUrl: 'https://api.notion.com/v1/oauth/token',
    scopes: { default: ['read_content'] },
    defaultScopes: ['read_content']
  }
};
```

3. Register:
```typescript
// providers/registry.ts
import { NOTION_CONFIG } from './notion/index.js';

export const PROVIDER_REGISTRY = {
  // ... existing
  NOTION: NOTION_CONFIG
};
```

4. Add HTTP client:
```typescript
// services/http-client.ts
export const providerClients = {
  // ... existing
  notion: (creds) => createAuthenticatedHttpClient({
    provider: 'NOTION',
    credentials: creds,
    baseUrl: 'https://api.notion.com/v1'
  })
};
```

---

### 3. Add New Service Class
**Location:** `packages/integrations/src/services/providers/`

**Template:**
```typescript
// notion-service.ts
import { ApiClient, providerClients } from '../http-client.js';
import type { CredentialSecret } from '@duramation/shared/types';
import { BaseProviderService } from './base-service.js';

export class NotionService extends BaseProviderService {
  constructor(credentials: CredentialSecret) {
    super('NOTION', credentials);
  }

  protected createClient(): ApiClient {
    return new ApiClient(providerClients.notion(this.credentials));
  }

  async createPage(dbId: string, props: any) {
    return this.executeWithRefresh(() => 
      this.client.post('pages', { parent: { database_id: dbId }, properties: props })
    );
  }
}
```

**Export:**
```typescript
// services/providers/index.ts
export { NotionService } from './notion-service.js';
```

**Token refresh is automatic** ✅

---

### 4. Add API Endpoint
**Location:** `apps/inngest-app/src/app/api/`

**Create:** `api/my-endpoint/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Your logic here
  return NextResponse.json({ data: 'result' });
}
```

**Auto-discovered by Next.js** ✅

---

### 5. Add Frontend Component
**Location:** `apps/frontend/src/components/`

**Create:** `components/MyComponent.tsx`
```typescript
export function MyComponent() {
  return <div>My Component</div>;
}
```

**Import where needed:**
```typescript
import { MyComponent } from '@/components/MyComponent';
```

---

## 🚫 Don't Touch (Unless You Know What You're Doing)

### Critical Files:
- `packages/integrations/src/services/http-client.ts` - HTTP client core
- `packages/integrations/src/services/credential-store.ts` - Credential caching
- `packages/integrations/src/services/providers/base-service.ts` - Token refresh logic
- `packages/integrations/src/middleware/inngest-middleware.ts` - Credential injection
- `apps/inngest-app/src/inngest/client.ts` - Inngest setup
- `packages/db/schema.prisma` - Only add, never modify existing

### Safe to Modify:
- Workflow functions (add new ones)
- Service classes (add new methods)
- API routes (add new endpoints)
- UI components (add new features)

---

## 📋 Common Tasks

### Add Workflow Field
```typescript
// metadata.ts
export const MyWorkflowFields = [
  {
    key: 'newField',
    label: 'New Field',
    type: 'text',
    validation: { required: true }
  }
];
```

### Use Service in Workflow
```typescript
// function.ts
import { NotionService } from '@duramation/integrations/services/providers';

const cred = credentials.find(c => c.provider === 'NOTION');
const service = new NotionService(cred.secret);
const result = await service.createPage(dbId, props);
```

### Add Validation
```typescript
// metadata.ts
export const InputSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
  tags: z.array(z.string()).min(1)
});
```

### Send Realtime Update
```typescript
// In workflow
await publish(
  workflowChannel(user_id, workflowId).updates(
    createWorkflowUpdate("progress", "Processing step 2...")
  )
);
```

---

## 🔄 Development Workflow

### 1. Start Dev Server
```bash
pnpm dev
```
- Templates auto-sync ✅
- Hot reload enabled ✅
- Inngest dev UI: http://localhost:3001/api/inngest

### 2. Make Changes
- Add workflow → Auto-syncs on restart
- Add service → Build with `pnpm build:packages`
- Add API route → Auto-discovered
- Add component → Hot reloads

### 3. Test
```bash
# Trigger workflow
curl -X POST http://localhost:3001/api/v1/workflows/WORKFLOW_ID/trigger \
  -H "Authorization: Bearer API_KEY" \
  -d '{"input": {"field": "value"}}'

# Check Inngest UI
open http://localhost:3001/api/inngest
```

### 4. Build
```bash
pnpm build  # Builds everything
```

---

## 🎨 Architecture Patterns

### Workflow Pattern
```typescript
export const myWorkflow = inngest.createFunction(
  { id: "my-workflow" },
  { event: "workflow/my-workflow" },
  async ({ step, event, credentials }) => {
    const cred = credentials.find(c => c.provider === 'PROVIDER');
    
    return await step.run("do-work", async () => {
      const service = new MyService(cred.secret);
      return await service.doSomething();
    });
  }
);
```

### Service Pattern
```typescript
export class MyService extends BaseProviderService {
  constructor(credentials: CredentialSecret) {
    super('PROVIDER', credentials);
  }

  protected createClient(): ApiClient {
    return new ApiClient(providerClients.myprovider(this.credentials));
  }

  async method() {
    return this.executeWithRefresh(() => this.client.get('endpoint'));
  }
}
```

### Error Handling
```typescript
import { NotFoundError } from '@duramation/integrations/services';

try {
  return await service.getData();
} catch (error: any) {
  if (error.response?.statusCode === 404) {
    throw new NotFoundError('PROVIDER', 'resource');
  }
  throw error;
}
```

---

## 🚀 Quick Reference

| Task | Command | Location |
|------|---------|----------|
| New workflow | `pnpm workflow:create name` | `apps/inngest-app/src/inngest/functions/` |
| New provider | Manual | `packages/integrations/src/providers/` |
| New service | Manual | `packages/integrations/src/services/providers/` |
| New API route | Create file | `apps/inngest-app/src/app/api/` |
| New component | Create file | `apps/frontend/src/components/` |
| Build packages | `pnpm build:packages` | Root |
| Dev server | `pnpm dev` | Root |
| DB migration | `pnpm db:push` | `packages/db/` |

---

## ✅ What's Already Handled

- ✅ Token refresh (automatic on 401)
- ✅ Template sync (automatic on dev start)
- ✅ Credential caching (5min TTL)
- ✅ Error standardization (use standard types)
- ✅ Type safety (TypeScript everywhere)
- ✅ Hot reload (dev mode)
- ✅ Validation (Zod schemas)

**Just focus on your business logic!**
