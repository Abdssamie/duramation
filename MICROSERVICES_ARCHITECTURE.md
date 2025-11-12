# Microservices Architecture for Isolated Workflows

## Architecture Overview

```
┌─────────────┐      ┌──────────────┐      ┌─────────────────┐
│  Frontend   │─────▶│  API Gateway │─────▶│  Workflow Queue │
│  (Next.js)  │      │ (inngest-app)│      │    (Inngest)    │
└─────────────┘      └──────────────┘      └─────────────────┘
                              │                      │
                              │                      ▼
                              │             ┌─────────────────┐
                              │             │ Workflow Runner │
                              │             │   (Microservice)│
                              │             └─────────────────┘
                              │                      │
                              ▼                      ▼
                     ┌──────────────┐      ┌─────────────────┐
                     │   Database   │      │  Workflow Plugins│
                     │  (Postgres)  │      │  (Hot-reloadable)│
                     └──────────────┘      └─────────────────┘
```

## New Structure

```
apps/
├── frontend/              # User interface
├── inngest-app/          # API Gateway + Orchestration
└── workflow-runner/      # NEW: Isolated workflow executor
    ├── src/
    │   ├── index.ts      # Main server
    │   ├── loader.ts     # Dynamic workflow loader
    │   └── executor.ts   # Workflow execution engine
    ├── workflows/        # Drop workflows here
    │   ├── send-email.js
    │   ├── slack-post.js
    │   └── ...
    ├── package.json
    └── Dockerfile        # For containerization
```

## Benefits

1. **Isolation**: Workflows run in separate process
2. **Hot Reload**: Add/update workflows without restart
3. **Scalability**: Scale workflow runners independently
4. **Safety**: Workflow crashes don't affect main app
5. **Resource Control**: Limit CPU/memory per workflow
