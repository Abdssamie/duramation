# Quick Start Guide

## 🚀 Initial Setup (One Time)

```bash
# Clone and setup
git clone <repo-url>
cd duramation
pnpm setup
```

This will:
- ✅ Install dependencies
- ✅ Create .env files
- ✅ Generate Prisma client
- ✅ Run database migrations
- ✅ Build packages

**Configure environment variables:**
- `apps/frontend/.env`
- `apps/inngest-app/.env`
- `packages/db/.env`

Then start development:
```bash
pnpm dev
```

---

## 🔌 Add New Provider (Automated)

```bash
pnpm add-provider NOTION
```

This will:
- ✅ Add to Prisma Provider enum
- ✅ Run database migration
- ✅ Create provider config files
- ✅ Update provider registry
- ✅ Add HTTP client
- ✅ Create service template

**Then customize:**
1. Edit `packages/integrations/src/providers/notion/config.ts` - OAuth URLs
2. Edit `packages/integrations/src/providers/notion/auth.ts` - Token exchange
3. Edit `packages/integrations/src/services/providers/notion-service.ts` - API methods
4. Add env vars: `NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET`
5. Build: `pnpm build:packages`

---

## 📝 Add New Workflow (Automated)

```bash
cd apps/inngest-app
pnpm workflow:create send-notification
```

This creates:
- ✅ `send-notification/function.ts` - Workflow logic
- ✅ `send-notification/metadata.ts` - Fields & config

**Then:**
1. Edit `metadata.ts` - Define input fields
2. Edit `function.ts` - Add workflow logic
3. Add to `src/inngest/functions/index.ts`:
```typescript
import { sendNotificationWorkflow } from "./send-notification/function";

export const workflowFunctions = [
  // ... existing
  sendNotificationWorkflow
];
```
4. Restart dev server (auto-syncs templates)

---

## 🎯 Common Commands

```bash
# Development
pnpm dev                    # Start all services
pnpm dev:frontend           # Frontend only
pnpm dev:backend            # Backend only

# Building
pnpm build                  # Build everything
pnpm build:packages         # Build packages only

# Database
cd packages/db
pnpm db:generate            # Generate Prisma client
pnpm db:push                # Push schema changes
pnpm db:studio              # Open Prisma Studio

# Automation
pnpm setup                  # Initial setup
pnpm add-provider NAME      # Add new provider
cd apps/inngest-app
pnpm workflow:create NAME   # Add new workflow
```

---

## 📚 Documentation

- **DEV_PLAN.md** - Where to add code safely
- **WORKFLOW_GUIDE.md** - Quick workflow reference
- **README.md** - Full documentation

---

## 🔗 URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Inngest UI: http://localhost:3001/api/inngest

---

## 🎨 Example: Add Notion Integration

```bash
# 1. Add provider
pnpm add-provider NOTION

# 2. Customize config
# Edit packages/integrations/src/providers/notion/config.ts
# Update authUrl, tokenUrl, scopes

# 3. Implement auth
# Edit packages/integrations/src/providers/notion/auth.ts
# Add token exchange and refresh logic

# 4. Add service methods
# Edit packages/integrations/src/services/providers/notion-service.ts
export class NotionService extends BaseProviderService {
  async createPage(dbId: string, props: any) {
    return this.executeWithRefresh(() => 
      this.client.post('pages', { parent: { database_id: dbId }, properties: props })
    );
  }
}

# 5. Build
pnpm build:packages

# 6. Create workflow
cd apps/inngest-app
pnpm workflow:create create-notion-page

# 7. Use in workflow
import { NotionService } from '@duramation/integrations/services/providers';

const cred = credentials.find(c => c.provider === 'NOTION');
const service = new NotionService(cred.secret);
await service.createPage(dbId, props);
```

---

## ✅ What's Automated

- ✅ Token refresh (automatic on 401)
- ✅ Template sync (on dev server start)
- ✅ Credential caching (5min TTL)
- ✅ Provider setup (via script)
- ✅ Workflow boilerplate (via script)
- ✅ Database migrations (via script)

**Focus on business logic, not infrastructure!**
