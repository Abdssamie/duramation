# Troubleshooting Guide

## Issues Encountered and Solutions

### 1. Prisma Database Connection Issues

**Problem**: `Error validating datasource 'db': the URL must start with the protocol 'prisma://' or 'prisma+postgres://'`

**Root Cause**: 
- Prisma client was generated with Prisma Accelerate configuration
- The `@prisma/extension-accelerate` was being applied even in development
- Schema had `directUrl` pointing to Accelerate

**Solution**:
1. Update `packages/db/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Remove Accelerate extension from `packages/db/src/client.ts`:
   ```typescript
   // Remove: import { withAccelerate } from "@prisma/extension-accelerate";
   // Remove: basePrisma = basePrisma.$extends(withAccelerate());
   ```

3. Regenerate Prisma client:
   ```bash
   cd packages/db
   rm -rf src/generated dist
   pnpm prisma generate
   pnpm build
   ```

4. Use `postgresql://` protocol in DATABASE_URL (not `postgres://`)

### 2. Prisma Client Missing Engine

**Problem**: `Authentication failed against database server` even with correct credentials

**Root Cause**: Prisma client was generated with `--no-engine` flag

**Solution**:
Update `packages/db/package.json`:
```json
"db:generate": "prisma generate"  // Remove --no-engine flag
```

### 3. Database Schema Drift

**Problem**: `The column 'workflows.canBeScheduled' does not exist in the current database`

**Solution**:
```bash
cd packages/db
npx prisma db push --accept-data-loss
```

### 4. Inngest Functions Not Registered

**Problem**: No functions showing in Inngest dev server

**Root Cause**: Async function loading in `apps/inngest-app/src/app/api/inngest/route.ts`

**Solution**:
```typescript
import * as functions from "@/inngest/functions";

const allFunctions = Object.values(functions).filter(
  (fn) => fn && typeof fn === 'object' && 'id' in fn
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: allFunctions,
});
```

### 5. Nested Step Warnings in Inngest

**Problem**: `⚠️ We detected that you have nested 'step.*' tooling`

**Root Cause**: Calling `publish()` inside `step.run()`

**Solution**: Move all `publish()` calls outside of `step.run()`:
```typescript
// ❌ Wrong
await step.run("my-step", async () => {
  await publish(channel.updates(...));
});

// ✅ Correct
await step.run("my-step", async () => {
  // Do work
  return result;
});
await publish(channel.updates(...));
```

### 6. Redis Connection Timeout (SSE)

**Problem**: `Redis subscriber error: connect ETIMEDOUT`

**Root Cause**: VPN (ProtonVPN) blocking Upstash Redis connections

**Solution**:
- Disable VPN when developing locally
- Or use Upstash REST API (but pub/sub won't work)
- The app uses `ioredis` with `rediss://` protocol for pub/sub

**Note**: The SSE endpoint (`/api/realtime/events`) requires TCP connection to Redis for pub/sub. REST API doesn't support real-time subscriptions.

### 7. Next.js Cross-Origin Warnings with ngrok

**Problem**: `Cross origin request detected from *.ngrok-free.app`

**Solution**:
Add to `apps/frontend/next.config.ts`:
```typescript
const baseConfig: NextConfig = {
  allowedDevOrigins: ['your-subdomain.ngrok-free.app']
};
```

### 8. Clerk Webhook Signature Verification Failed

**Problem**: Webhook returns 400 Bad Request

**Solution**:
Update `CLERK_WEBHOOK_SIGNING_SECRET` in `apps/inngest-app/.env.local` with the correct signing secret from Clerk dashboard.

## Environment Setup Checklist

### Required Environment Variables

**packages/db/.env**:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/duramation
PRISMA_FIELD_ENCRYPTION_KEY=k1.aesgcm256.your-key-here
```

**apps/inngest-app/.env.local**:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/duramation
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...
INNGEST_SIGNING_KEY=signkey-prod-...
INNGEST_EVENT_KEY=...
UPSTASH_REDIS_REST_URL=https://....upstash.io
UPSTASH_REDIS_REST_TOKEN=...
REDIS_URL=rediss://default:token@....upstash.io:6379
```

**apps/frontend/.env**:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_BACKEND_API_URL=http://localhost:3001
INTERNAL_API_SECRET=...
REDIS_URL=rediss://default:token@....upstash.io:6379
UPSTASH_REDIS_REST_URL=https://....upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

## Build Order

Always build in this order:
```bash
# 1. Clean everything
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# 2. Install dependencies
pnpm install

# 3. Build packages first
pnpm build:packages

# 4. Build apps
pnpm build
```

## Common Commands

```bash
# Regenerate Prisma client
cd packages/db
pnpm prisma generate
pnpm build

# Sync database schema
cd packages/db
pnpm db:push

# Run migrations
cd packages/db
pnpm db:migrate

# Start dev servers
pnpm dev              # All services
pnpm dev:frontend     # Frontend only (port 3000)
pnpm dev:backend      # Backend only (port 3001)
```

## Network Issues

If you experience connection timeouts:
1. Check if VPN is enabled (disable it)
2. Verify firewall isn't blocking ports 5432 (Postgres), 6379 (Redis)
3. Test Redis connection: `curl https://your-redis.upstash.io/ping -H "Authorization: Bearer YOUR_TOKEN"`
4. Test Postgres: `psql -h localhost -U postgres -d duramation`

## Debugging Tips

1. **Check Prisma client location**: `packages/db/src/generated/client`
2. **Verify build outputs**: `packages/db/dist` should contain compiled JS files
3. **Check Inngest functions**: Visit `http://localhost:3001/api/inngest` in browser
4. **Monitor Redis pub/sub**: Use Upstash console or `redis-cli MONITOR`
5. **Check logs**: Backend logs show Prisma queries and Inngest function executions
