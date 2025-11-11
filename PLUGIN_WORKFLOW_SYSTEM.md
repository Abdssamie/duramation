# Plugin-Based Workflow System

## Goal
Workflows should be completely isolated, hot-reloadable, and not require app rebuilds.

## Architecture

### 1. Workflows as Separate NPM Packages

```
packages/
├── workflows/
│   ├── workflow-send-email/
│   │   ├── package.json
│   │   ├── index.ts
│   │   └── metadata.json
│   ├── workflow-slack-post/
│   │   ├── package.json
│   │   ├── index.ts
│   │   └── metadata.json
```

### 2. Dynamic Loading at Runtime

```typescript
// apps/inngest-app/src/lib/workflow-loader.ts
import { readdir } from 'fs/promises';
import path from 'path';

export async function loadWorkflows() {
  const workflowsDir = path.join(process.cwd(), '../../packages/workflows');
  const dirs = await readdir(workflowsDir);
  
  const workflows = [];
  for (const dir of dirs) {
    if (!dir.startsWith('workflow-')) continue;
    
    const { default: workflow } = await import(`@duramation/${dir}`);
    workflows.push(workflow);
  }
  
  return workflows;
}
```

### 3. Hot Reload Support

Use file watching to reload workflows without restart:

```typescript
import chokidar from 'chokidar';

const watcher = chokidar.watch('../../packages/workflows/*/index.ts');
watcher.on('change', async (path) => {
  delete require.cache[require.resolve(path)];
  await reloadWorkflows();
});
```

## Simpler Alternative: Database-Driven Workflows

Store workflow logic in database as JavaScript strings, eval at runtime:

```typescript
// Workflow stored in DB
const workflow = await prisma.workflow.findUnique({ where: { id } });
const fn = new Function('event', 'step', workflow.code);
await fn(event, step);
```

## Simplest: External Service

Run workflows in separate microservice that polls for jobs:

```
apps/
├── frontend/
├── inngest-app/
└── workflow-runner/    # Separate service
    └── workflows/      # Just drop files here
```

Which approach do you prefer?
