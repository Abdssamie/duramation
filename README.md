# Duramation

A workflow automation platform built with Next.js, Inngest, and Turborepo.

## Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

Install pnpm globally:

```bash
npm install -g pnpm@9.15.4
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Copy the example env files and fill in your credentials:

```bash
cp apps/frontend/.env.example apps/frontend/.env
cp apps/inngest-app/.env.example apps/inngest-app/.env
```

### 3. Set up the database

```bash
cd packages/db
pnpm db:generate
pnpm db:migrate
cd ../..
```

### 4. Build packages

```bash
pnpm build:packages
```

### 5. Start development servers

```bash
# Start all apps
pnpm dev

# Or start individually
pnpm dev:frontend  # Runs on port 3000
pnpm dev:backend   # Runs on port 3001
```

## Project Structure

```
duramation/
├── apps/
│   ├── frontend/          # Next.js user dashboard (port 3000)
│   └── inngest-app/       # Inngest workflow engine (port 3001)
├── packages/
│   ├── db/               # Prisma schema and client
│   ├── shared/           # Shared types and utilities
│   ├── integrations/     # Provider integrations
│   ├── eslint-config/    # ESLint configurations
│   └── typescript-config/ # TypeScript configurations
└── scripts/              # Build and deployment scripts
```

## Available Scripts

### Development

```bash
pnpm dev              # Start all apps in dev mode
pnpm dev:frontend     # Start frontend only
pnpm dev:backend      # Start backend only
```

### Building

```bash
pnpm build            # Build all apps and packages
pnpm build:frontend   # Build frontend app
pnpm build:backend    # Build backend app
pnpm build:packages   # Build shared packages only
```

### Database

```bash
cd packages/db
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Prisma Studio
```

### Workflow Development

```bash
cd apps/inngest-app
pnpm update-templates # Sync workflow templates to database
pnpm update-schemas   # Generate Zod schemas for workflow metadata
```

### Code Quality

```bash
pnpm lint             # Lint all packages
pnpm typecheck        # Type check all packages
pnpm format           # Format code with Prettier
pnpm check-types      # Check types in all packages
pnpm clean            # Clean build artifacts
```

### Deployment

```bash
pnpm deploy:staging   # Deploy to staging
pnpm deploy:production # Deploy to production
```

## Tech Stack

### Frontend (apps/frontend)
- Next.js 15 with App Router
- React 19
- TypeScript 5.9
- Tailwind CSS v4
- Shadcn-ui
- Clerk Authentication
- Zustand for state management

### Backend (apps/inngest-app)
- Next.js 15 (API routes)
- Inngest v3.42+ (workflow engine)
- TypeScript 5.9
- Winston logging

### Shared Infrastructure
- PostgreSQL with Prisma ORM
- Upstash Redis
- Cloudflare R2 for storage
- Vercel for deployment

## Workspace Commands

```bash
# Run command in specific workspace
pnpm --filter frontend <command>
pnpm --filter inngest-app <command>
pnpm --filter @duramation/db <command>

# Run command in all workspaces
pnpm -r <command>

# Add dependency to specific workspace
pnpm --filter frontend add lodash
pnpm --filter inngest-app add -D @types/node
```

## Environment Variables

Required environment variables are defined in `turbo.json`. See `apps/frontend/env.example.txt` for a complete list.

Key variables:
- Database: `POSTGRES_PRISMA_URL`, `DATABASE_URL`
- Redis: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- Clerk: `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SIGNING_SECRET`
- Inngest: `INNGEST_SIGNING_KEY`, `INNGEST_EVENT_KEY`
- OAuth Providers: Client IDs and secrets for Google, Slack, Microsoft
- Encryption: `ENCRYPTION_SECRET_KEY`, `PRISMA_FIELD_ENCRYPTION_KEY`

## Troubleshooting

### Module not found errors

```bash
pnpm clean
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
pnpm build:packages
```

### Prisma client issues

```bash
cd packages/db
pnpm db:generate
cd ../..
pnpm build:packages
```

### Build cache issues

```bash
pnpm clean
pnpm build
```

## Migration from Yarn

If you're migrating from Yarn, see [MIGRATION_TO_PNPM.md](./MIGRATION_TO_PNPM.md) for detailed instructions.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint` and `pnpm typecheck`
4. Submit a pull request

## License

MIT
