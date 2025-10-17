# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

This is a Turborepo monorepo using Yarn workspaces with the following key commands:

### Build Commands
- `yarn build` - Build all apps and packages
- `yarn build:frontend` - Build only the frontend app
- `yarn build:backend` - Build only the inngest-app (backend)
- `yarn build:packages` - Build only the packages

### Development Commands
- `yarn dev` - Start all apps in development mode (frontend on port 3000, inngest-app on port 3001)
- `turbo dev --filter=frontend` - Run only the frontend app
- `turbo dev --filter=inngest-app` - Run only the inngest-app (backend)

### Code Quality
- `yarn lint` - Lint all packages
- `yarn typecheck` - Type check all packages  
- `yarn format` - Format all TypeScript/TSX and Markdown files
- `yarn check-types` - Check types across all packages

### Database Commands (within packages/db)
- `yarn db:generate` - Generate Prisma client
- `yarn db:migrate` - Run database migrations in development
- `yarn db:deploy` - Deploy migrations to production
- `yarn db:studio` - Open Prisma Studio

### Package-Specific Commands
- Frontend: `yarn lint:fix`, `yarn format:check`
- Inngest-app: `yarn update-schemas`, `yarn update-templates`

## Architecture Overview

### Monorepo Structure
```
├── apps/
│   ├── frontend/          # Next.js 15 frontend with React 19
│   └── inngest-app/       # Next.js backend for Inngest workflows
├── packages/
│   ├── db/               # Prisma database package
│   ├── integrations/     # Third-party API integrations
│   ├── shared/           # Shared utilities and types
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
```

### Core Technology Stack
- **Monorepo**: Turborepo with Yarn workspaces
- **Frontend**: Next.js 15 with React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API routes + Inngest for workflow orchestration
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Clerk for authentication
- **UI**: Radix UI components, Framer Motion, shadcn/ui patterns
- **State**: React Hook Form + Zod for forms/validation

### Key Application Concepts

**Duramation** is a workflow automation platform that allows users to create, manage, and execute automated workflows. 

#### Core Models (from Prisma schema):
- **User**: Authenticated users with Clerk integration
- **Workflow**: User-created automation workflows based on templates
- **Credential**: Encrypted OAuth/API credentials for integrations
- **WorkflowRun**: Individual execution instances with realtime tracking
- **AutomationMetrics**: Performance and execution analytics

#### Workflow System:
- Templates are defined in `apps/inngest-app/src/inngest/functions/`
- Each workflow template has metadata defining inputs, outputs, and integrations
- Workflows are executed via Inngest with realtime status updates
- Support for scheduled workflows via cron expressions
- Integration with multiple providers (Google, Slack, Microsoft, etc.)

#### Frontend Architecture:
- App Router with TypeScript
- Component structure: `src/components/{feature}/`
- Authentication flows with Clerk
- Dashboard for workflow management
- Real-time workflow execution monitoring

#### Backend Architecture:
- Inngest functions for workflow execution
- API routes for workflow CRUD operations
- Integration services for external providers
- Middleware for authentication and logging

### Development Patterns

#### Adding New Workflows:
1. Create function in `apps/inngest-app/src/inngest/functions/{workflow-name}/`
2. Define metadata schema with inputs/outputs
3. Run `yarn update-templates` to sync templates
4. Test via the frontend workflow builder

#### Working with Integrations:
- OAuth credentials are encrypted using `prisma-field-encryption`
- Integration logic is centralized in `packages/integrations/`
- Server-side integration utilities in `packages/integrations/server`

#### Environment Setup:
- Requires extensive environment variables (see turbo.json)
- Database connection, OAuth secrets, API keys for integrations
- Separate environments for frontend and inngest-app

#### Testing:
- No specific test commands found - may need to be added
- Uses TypeScript for compile-time validation
- Relies on linting and type checking for code quality

### Package Management
- Uses Yarn 1.22.22 (specified in packageManager)
- Workspace dependencies use `*` for internal packages
- Requires Node.js >= 18