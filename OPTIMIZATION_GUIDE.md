# Project Optimization Guide

This guide provides actionable optimizations to improve development speed, build times, and overall project maintainability.

## 🚀 Quick Wins (Immediate Impact)

### 1. Clean Up Log Files
Your log files are growing large and slowing down the IDE.

```bash
# Remove existing logs
rm apps/inngest-app/*.log

# Add log rotation (create this file)
# apps/inngest-app/src/lib/logger.ts should use rotating file transport
```

### 2. Optimize Turbo Cache
```bash
# Clean stale cache
pnpm clean

# Verify turbo.json excludes test files from build inputs (already done ✓)
```

### 3. Remove Duplicate Dependencies
Both apps have duplicate dependencies that could be hoisted:

```bash
# Run dependency check
pnpm --filter frontend exec depcheck
pnpm --filter inngest-app exec depcheck
```

## 🏗️ Build Optimizations

### 4. Optimize Next.js Build
Add to `next.config.ts` in both apps:

```typescript
experimental: {
  optimizePackageImports: [
    '@radix-ui/react-icons',
    '@tabler/icons-react',
    'lucide-react',
    'date-fns'
  ],
  turbo: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
},
```

### 5. Reduce Template Updates
The `update-templates` script runs on every dev start. Consider:

```bash
# Only run when templates actually change
# Move to a separate command or use file watching
```

### 6. Optimize Prisma Client Generation
```bash
# Add to packages/db/package.json
"postinstall": "prisma generate"
```

## 📦 Dependency Optimizations

### 7. Consolidate Shared Dependencies
Move these to root `package.json`:
- `typescript` (currently in root ✓)
- `prettier` (currently in root ✓)
- Consider moving `next` to root as well

### 8. Remove Unused Dependencies
```bash
# Check for unused deps
pnpm --filter frontend exec depcheck
pnpm --filter inngest-app exec depcheck

# Common culprits to check:
# - @faker-js/faker (only needed in dev)
# - depcheck itself (only needed occasionally)
```

### 9. Use Exact Versions for Critical Deps
Pin versions for:
- `next`
- `react`
- `inngest`
- `@clerk/nextjs`

## 🔧 Development Experience

### 10. Parallel Development
Update root `package.json` scripts:

```json
"dev:all": "turbo run dev --parallel",
"dev:frontend": "turbo run dev --filter=frontend",
"dev:backend": "turbo run dev --filter=inngest-app"
```

### 11. Faster Type Checking
Add to `turbo.json`:

```json
"typecheck": {
  "dependsOn": ["^build"],
  "outputs": [],
  "cache": true
}
```

### 12. Optimize ESLint
Add to both apps' `eslint.config.js`:

```javascript
ignorePatterns: [
  '.next',
  'node_modules',
  'dist',
  '*.log',
  '.turbo'
]
```

## 🗄️ Database Optimizations

### 13. Connection Pooling
Ensure Prisma uses connection pooling:

```typescript
// packages/db/src/client.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL, // Uses connection pooling
    },
  },
})
```

### 14. Query Optimization
Review your Prisma queries for:
- Missing indexes
- N+1 query problems
- Unnecessary includes

## 🎯 Workflow Optimizations

### 15. Reduce Webhook Calls
Your logs show frequent webhook calls to `localhost:3000/api/realtime/notify`. Consider:
- Batching updates
- Debouncing rapid status changes
- Using WebSocket instead of webhooks for local dev

### 16. Implement Idempotency Caching
Your logs show duplicate idempotency keys. Add Redis caching:

```typescript
// Check cache before processing
const cached = await redis.get(`workflow:${idempotencyKey}`)
if (cached) return cached
```

### 17. Optimize Inngest Function Retries
Review retry strategies in your Inngest functions:

```typescript
{
  retries: 3, // Reduce if not needed
  rateLimit: {
    limit: 10,
    period: '1m'
  }
}
```

## 📊 Monitoring & Logging

### 18. Implement Log Rotation
Create `apps/inngest-app/src/lib/logger.ts`:

```typescript
import winston from 'winston'
import 'winston-daily-rotate-file'

const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '7d'
})
```

### 19. Reduce Log Verbosity
Filter out repetitive logs in production:

```typescript
if (process.env.NODE_ENV === 'development') {
  logger.info('Detailed debug info')
}
```

### 20. Add Performance Monitoring
```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

## 🚢 Deployment Optimizations

### 21. Optimize Vercel Builds
Add to `vercel.json` in each app:

```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install --frozen-lockfile",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### 22. Enable Output Standalone
Add to both `next.config.ts`:

```typescript
output: 'standalone',
```

### 23. Optimize Images
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60,
}
```

## 🧹 Maintenance

### 24. Regular Cleanup Script
Create `scripts/cleanup.sh`:

```bash
#!/bin/bash
# Clean logs
find . -name "*.log" -type f -delete

# Clean build artifacts
pnpm clean

# Clean node_modules
find . -name "node_modules" -type d -prune -exec rm -rf {} +

# Reinstall
pnpm install
```

### 25. Update Dependencies Regularly
```bash
# Check for updates
pnpm outdated

# Update non-breaking
pnpm update

# Update all (carefully)
pnpm up -r --latest
```

## 📈 Metrics to Track

After implementing optimizations, measure:
- Build time: `time pnpm build`
- Dev server startup: `time pnpm dev`
- Type check time: `time pnpm typecheck`
- Bundle size: Check `.next/analyze`
- Cache hit rate: Check `.turbo/` logs

## Priority Order

1. **High Priority** (Do Now):
   - Clean log files (#1)
   - Optimize template updates (#5)
   - Implement log rotation (#18)
   - Reduce webhook frequency (#15)

2. **Medium Priority** (This Week):
   - Remove unused dependencies (#8)
   - Optimize Next.js config (#4)
   - Add performance monitoring (#20)
   - Optimize Inngest retries (#17)

3. **Low Priority** (When Time Permits):
   - Consolidate dependencies (#7)
   - Add cleanup scripts (#24)
   - Optimize images (#23)

## Estimated Impact

| Optimization | Time to Implement | Expected Improvement |
|-------------|-------------------|---------------------|
| Log cleanup | 5 min | IDE performance +30% |
| Template optimization | 15 min | Dev startup -50% |
| Dependency cleanup | 30 min | Install time -20% |
| Next.js config | 20 min | Build time -15% |
| Log rotation | 30 min | Disk usage -80% |
| Webhook optimization | 1 hour | API calls -60% |

## Next Steps

1. Start with high-priority items
2. Measure baseline metrics
3. Implement optimizations
4. Measure improvements
5. Document results

Run `pnpm clean && pnpm install && pnpm build` after making changes to verify everything still works.
