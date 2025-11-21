# Workflow Development Guide

## Create a Workflow

```bash
cd apps/inngest-app
pnpm workflow:create my-workflow
# Edit function.ts and metadata.ts
# Add to src/inngest/functions/index.ts
pnpm update-templates
```

## Add an Integration

**1. Database**
```prisma
// packages/db/schema.prisma
enum Provider {
  NOTION  // Add here
}
```
```bash
cd packages/db && pnpm db:push
```

**2. Config** → `packages/integrations/src/providers/notion/config.ts`
```typescript
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

**3. HTTP Client** → `packages/integrations/src/services/http-client.ts`
```typescript
export const providerClients = {
  notion: (creds) => createAuthenticatedHttpClient({
    provider: 'NOTION',
    credentials: creds,
    baseUrl: 'https://api.notion.com/v1'
  })
};
```

**4. Service** → `packages/integrations/src/services/providers/notion-service.ts`
```typescript
export class NotionService {
  private client: ApiClient;
  
  constructor(credentials: CredentialSecret) {
    this.client = new ApiClient(providerClients.notion(credentials));
  }
  
  async createPage(dbId: string, props: any) {
    return this.client.post('pages', { parent: { database_id: dbId }, properties: props });
  }
}
```

**5. Register** → `packages/integrations/src/providers/registry.ts`
```typescript
export const PROVIDER_REGISTRY = {
  NOTION: NOTION_CONFIG
};
```

## Workflow Template

```typescript
// metadata.ts
export const MyWorkflowTemplate = {
  id: 'my-workflow',
  name: 'My Workflow',
  eventName: 'workflow/my-workflow',
  requiredProviders: [Provider.NOTION],
  fields: [{ key: 'input', label: 'Input', type: 'text', validation: { required: true } }]
};

// function.ts
export const myWorkflow = inngest.createFunction(
  { id: "my-workflow" },
  { event: "workflow/my-workflow" },
  async ({ step, event, credentials }) => {
    const cred = credentials.find(c => c.provider === 'NOTION');
    
    return await step.run("do-work", async () => {
      const service = new NotionService(cred.secret);
      return await service.createPage(event.data.input.dbId, {});
    });
  }
);
```

## Common Patterns

**Get credentials:**
```typescript
const cred = credentials.find(c => c.provider === 'NOTION');
if (!cred) throw new NonRetriableError("Credentials required");
```

**Use service:**
```typescript
const service = new NotionService(cred.secret);
const result = await service.doSomething();
```

**Send updates:**
```typescript
await publish(
  workflowChannel(user_id, workflowId).updates(
    createWorkflowUpdate("progress", "Working...")
  )
);
```
