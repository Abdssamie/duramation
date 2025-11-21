# Workflow Development Guide

## Architecture Overview

Workflows are now separated into their own package for better scalability and maintainability.

```
packages/workflows/          # Workflow definitions
├── src/
│   ├── workflow-name/      # Each workflow in its own directory
│   │   ├── function.ts     # Inngest function
│   │   ├── metadata.ts     # Schemas & config
│   │   ├── index.ts        # Exports
│   │   └── README.md       # Documentation
│   └── index.ts            # Main exports
└── scripts/
    └── create-workflow.ts  # Generator script

apps/inngest-app/            # API & Inngest server only
├── src/
│   ├── app/api/            # REST API routes
│   ├── inngest/
│   │   ├── client.ts       # Inngest client config
│   │   ├── functions/
│   │   │   └── index.ts    # Import workflows from package
│   │   └── middleware/     # Inngest middleware
│   ├── services/           # Business logic
│   └── lib/                # Utilities
```

## Creating a Workflow

### Step 1: Generate Boilerplate

```bash
cd packages/workflows
pnpm create my-new-workflow
```

### Step 2: Define Metadata

Edit `src/my-new-workflow/metadata.ts`:

```typescript
import { z } from 'zod';

export const metadata = {
  id: 'my-new-workflow',
  name: 'My New Workflow',
  description: 'Clear description of what this workflow does',
  category: 'automation', // automation, email, data, notifications, reporting
  version: '1.0.0',
  
  inputSchema: z.object({
    recipientEmail: z.string().email(),
    subject: z.string().min(1),
    body: z.string(),
  }),
  
  outputSchema: z.object({
    success: z.boolean(),
    messageId: z.string().optional(),
    error: z.string().optional(),
  }),
  
  requiredCredentials: ['google-oauth'], // or [] if none needed
};
```

### Step 3: Implement Function

Edit `src/my-new-workflow/function.ts`:

```typescript
import { inngest } from '@duramation/shared';
import { metadata } from './metadata';

export const myNewWorkflow = inngest.createFunction(
  {
    id: metadata.id,
    name: metadata.name,
  },
  { event: `workflow/${metadata.id}` },
  async ({ event, step }) => {
    const input = metadata.inputSchema.parse(event.data.input);

    // Step 1: Validate and prepare
    const prepared = await step.run('prepare', async () => {
      // Preparation logic
      return { ready: true };
    });

    // Step 2: Execute main logic
    const result = await step.run('execute', async () => {
      // Main workflow logic
      return { messageId: 'abc123' };
    });

    // Step 3: Cleanup or finalize
    await step.run('finalize', async () => {
      // Cleanup logic
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  }
);
```

### Step 4: Export Workflow

Add to `src/index.ts`:
```typescript
export * from './my-new-workflow';
```

### Step 5: Register in inngest-app

The workflow is automatically available via the package import.

## Workflow Patterns

### Using Credentials

```typescript
import { getCredentials } from '@duramation/integrations';

await step.run('use-credentials', async () => {
  const creds = await getCredentials(event.data.userId, 'google-oauth');
  // Use credentials
});
```

### Error Handling

```typescript
await step.run('risky-operation', async () => {
  try {
    // Operation that might fail
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
});
```

### Parallel Steps

```typescript
const [result1, result2] = await Promise.all([
  step.run('task-1', async () => { /* ... */ }),
  step.run('task-2', async () => { /* ... */ }),
]);
```

### Conditional Logic

```typescript
const shouldContinue = await step.run('check', async () => {
  return someCondition;
});

if (shouldContinue) {
  await step.run('continue', async () => { /* ... */ });
}
```

## Testing Workflows

### Local Testing

```bash
# Start inngest dev server
cd apps/inngest-app
pnpm dev

# Trigger workflow via API
curl -X POST http://localhost:3001/api/v1/workflows/my-workflow-id/trigger \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"input": {"email": "test@example.com"}}'
```

### Type Checking

```bash
cd packages/workflows
pnpm typecheck
```

## Workflow Categories

- **automation** - General automation tasks
- **email** - Email sending and processing
- **data** - Data transformation and sync
- **notifications** - Alerts and notifications
- **reporting** - Report generation
- **integration** - Third-party service integrations

## Build-Time Discovery

Workflows are discovered at build time through the package exports. The inngest-app imports all workflows from `@duramation/workflows` and registers them automatically.

## Migration from Old Structure

Old workflows in `apps/inngest-app/src/inngest/functions/` have been moved to `packages/workflows/src/`. Update any direct imports to use the package:

```typescript
// Old
import { myWorkflow } from '@/inngest/functions/my-workflow';

// New
import { myWorkflow } from '@duramation/workflows';
```

## Troubleshooting

**Workflow not appearing?**
- Check it's exported in `src/index.ts`
- Run `pnpm install` at root
- Rebuild: `pnpm build:packages`

**Type errors?**
- Ensure metadata schemas match function implementation
- Run `pnpm typecheck` in workflows package

**Import errors?**
- Verify workspace dependencies are installed
- Check package.json exports configuration
