# 🤖 Jules Setup Guide for Duramation

This guide is specifically designed for **Jules AI** to quickly set up and work on the Duramation project.

## 📋 Environment Overview

Jules VMs come pre-installed with:
- ✅ Node.js v22.16.0 (matches our requirement)
- ✅ pnpm 10.12.1 (compatible with our 10.22.0 requirement)
- ✅ PostgreSQL client tools
- ✅ Git, curl, and other standard tools

## 🚀 Quick Setup Script

Use this setup script in Jules configuration:

```bash
#!/bin/bash
set -e

# Verify Node.js version
echo "Node version: $(node -v)"
echo "pnpm version: $(pnpm -v)"

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build shared packages first (required before apps can build)
echo "Building shared packages..."
pnpm build:packages

# Generate Prisma client (required for type safety)
echo "Generating Prisma client..."
cd packages/db
pnpm db:generate
cd ../..

# Verify build
echo "Verifying TypeScript compilation..."
pnpm typecheck

echo "✅ Setup complete!"
```

## 📁 Project Structure

```
duramation/
├── apps/
│   ├── frontend/              # Next.js 15 Dashboard (Port 3000)
│   └── inngest-app/          # Workflow Engine (Port 3001)
├── packages/
│   ├── db/                   # Prisma ORM + Database Schema
│   ├── shared/               # Shared types & utilities
│   ├── integrations/         # Provider integrations (Google, Slack, etc.)
│   ├── eslint-config/        # Linting configuration
│   └── typescript-config/    # TypeScript configurations
└── scripts/                  # Build & deployment scripts
```

## 🔧 Common Commands

### Development
```bash
pnpm dev                # Start all apps in dev mode
pnpm dev:frontend       # Start frontend only (port 3000)
pnpm dev:backend        # Start backend only (port 3001)
```

### Building
```bash
pnpm build              # Build everything
pnpm build:packages     # Build shared packages only
pnpm build:frontend     # Build frontend app
pnpm build:backend      # Build backend app
```

### Code Quality
```bash
pnpm lint               # Lint all packages
pnpm typecheck          # Type check all packages
pnpm format             # Format code with Prettier
```

### Database (requires DATABASE_URL)
```bash
cd packages/db
pnpm db:generate        # Generate Prisma client
pnpm db:migrate         # Run migrations
pnpm db:studio          # Open Prisma Studio
```

## 🔑 Environment Variables

### Minimal Setup (for type checking and building)
No environment variables are strictly required for:
- Installing dependencies
- Building packages
- Type checking
- Linting

### Full Development Setup
For running the apps, you'll need:

**Frontend** (`apps/frontend/.env`):
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Database
DATABASE_URL="postgresql://user:password@host:port/db"

# Inngest
INNGEST_EVENT_KEY="your_inngest_event_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"

# Optional: Redis Cache
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

**Backend** (`apps/inngest-app/.env`):
```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/db"

# Inngest
INNGEST_SIGNING_KEY="your_inngest_signing_key"
INNGEST_EVENT_KEY="your_inngest_event_key"

# Clerk
CLERK_SECRET_KEY="sk_test_..."

# Optional: Provider OAuth credentials
GOOGLE_OAUTH_CLIENT_ID="..."
GOOGLE_OAUTH_CLIENT_SECRET="..."
```

The following environment variables exist in your system:
# PostgreSQL
POSTGRES_PRISMA_URL="postgresql://user:password@host:port/db"

# Upstash Redis
UPSTASH_REDIS_REST_URL="your_upstash_redis_rest_url"
UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_rest_token"

# Google OAuth
GOOGLE_OAUTH_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_OAUTH_CLIENT_SECRET="your_google_oauth_client_secret"

## 🎯 Working on Specific Features

### Frontend Development
```bash
cd apps/frontend
pnpm dev                # Start dev server on port 3000
pnpm lint               # Lint frontend code
pnpm typecheck          # Check types
```

Key directories:
- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable React components
- `src/features/` - Feature-specific modules
- `src/hooks/` - Custom React hooks

### Backend/Workflow Development
```bash
cd apps/inngest-app
pnpm dev                # Start dev server on port 3001
pnpm update-templates   # Sync workflow templates to DB
```

Key directories:
- `src/inngest/functions/` - Workflow definitions
- `src/services/` - Business logic
- `src/lib/` - Utilities and helpers

### Adding New Integrations
```bash
cd packages/integrations
# Edit provider files
pnpm build              # Build the package
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '@duramation/...'"
**Solution**: Build shared packages first
```bash
pnpm build:packages
```

### Issue: "Prisma Client not generated"
**Solution**: Generate Prisma client
```bash
cd packages/db
pnpm db:generate
cd ../..
```

### Issue: Type errors in zodResolver
**Solution**: This is a known compatibility issue. Use `as any` cast:
```typescript
resolver: zodResolver(schema as any)
```

### Issue: pnpm version mismatch
**Solution**: Jules has pnpm 10.12.1, project uses 10.22.0 - this is compatible, no action needed

## 📝 Code Style Guidelines

### TypeScript
- All code must be fully typed (no `any` except for known compatibility issues)
- Use strict mode
- Prefer `interface` over `type` for object shapes
- Use `const` assertions where appropriate

### React/Next.js
- Use `'use client'` directive for client components
- Prefer server components by default
- Use App Router conventions
- Keep components small and focused

### Naming Conventions
- Components: PascalCase (`UserProfile.tsx`)
- Hooks: camelCase with `use` prefix (`useWorkflowRealtime.ts`)
- Utilities: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (`MAX_RETRIES`)

## 🧪 Testing

Currently, the project doesn't have a comprehensive test suite. When adding tests:

```bash
# Frontend tests (when implemented)
cd apps/frontend
pnpm test

# Backend tests (when implemented)
cd apps/inngest-app
pnpm test
```

## 🔍 Debugging Tips

### Check Build Status
```bash
pnpm typecheck          # Check for type errors
pnpm lint               # Check for linting issues
```

### View Logs
```bash
# Frontend logs
cd apps/frontend
pnpm dev                # Logs appear in console

# Backend logs
cd apps/inngest-app
pnpm dev                # Logs appear in console
```

### Database Inspection
```bash
cd packages/db
pnpm db:studio          # Opens Prisma Studio (requires DATABASE_URL)
```

## 📚 Key Files to Know

### Configuration Files
- `turbo.json` - Turborepo build configuration
- `pnpm-workspace.yaml` - Workspace configuration
- `packages/db/prisma/schema.prisma` - Database schema
- `packages/typescript-config/` - Shared TypeScript configs

### Important Documentation
- `README.md` - Main project documentation
- `apps/inngest-app/ADDING_WORKFLOWS.md` - Workflow creation guide
- `apps/inngest-app/INTEGRATION_BEST_PRACTICES.md` - Integration patterns
- `SIMPLE_WORKFLOW_SOLUTION.md` - Workflow architecture overview

## 🎓 Learning Resources

### Inngest (Workflow Engine)
- Docs: https://www.inngest.com/docs
- Key concepts: Functions, Steps, Events, Retries

### Next.js 15
- Docs: https://nextjs.org/docs
- Key features: App Router, Server Components, Server Actions

### Prisma
- Docs: https://www.prisma.io/docs
- Key commands: generate, migrate, studio

## ✅ Validation Checklist

Before submitting changes, ensure:
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build:packages` succeeds
- [ ] No console errors in dev mode
- [ ] Changes follow existing code patterns
- [ ] Types are properly defined (no `any` unless necessary)

## 🚨 Known Issues

1. **Zod + react-hook-form compatibility**: Some Zod schemas (with `z.coerce.number()` or `z.record()`) require `as any` cast in `zodResolver()`
2. **Next.js auto-generated files**: The `.next/` directory generates many type warnings - these can be ignored
3. **Prisma client generation**: Must be run after schema changes and before type checking

## 💡 Pro Tips for Jules

1. **Always build packages first**: Run `pnpm build:packages` before working on apps
2. **Use turbo for speed**: Turbo caches builds, making subsequent builds faster
3. **Check diagnostics**: Use `pnpm typecheck` to catch type errors early
4. **Follow monorepo patterns**: Changes in `packages/` affect all apps
5. **Hot reload works**: Both frontend and backend support hot reload in dev mode

---

**Last Updated**: 2025-01-16
**Project Version**: 1.0.0
**Node Version Required**: 22.x
**Package Manager**: pnpm 10.x
