<div align="center">
  <h1>🚀 Duramation</h1>
  <p><strong>Build, Deploy, and Scale Workflow Automations in Minutes</strong></p>
  <p>
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 🎯 What is Duramation?

Duramation is a **modern workflow automation platform** that lets you create, manage, and monitor automated workflows without the complexity. Think Zapier meets n8n, but built for developers who want full control.

### Why Duramation?

- **🔌 Pre-built Integrations** - Google, Slack, Microsoft, and more
- **⚡ Real-time Monitoring** - Watch your workflows execute live
- **🔐 Secure by Default** - Encrypted credentials, OAuth flows built-in
- **📊 Analytics Dashboard** - Track ROI, time saved, and success rates
- **🎨 Beautiful UI** - Modern interface built with Next.js 15 and Tailwind
- **🔧 Developer-Friendly** - TypeScript, type-safe APIs, hot reload

---

## 🚀 Quick Start

Get up and running in 5 minutes:

### Prerequisites

- **Node.js 22.x** (required)
- **pnpm 9.15.4+** (package manager)
- **PostgreSQL** (database)
- **Redis** (caching - optional but recommended)

### Installation

**1. Clone and Install**

```bash
git clone https://github.com/abdssamie/duramation.git
cd duramation
npm install -g pnpm@9.15.4  # Install pnpm if needed
pnpm install
```

**2. Configure Environment**

```bash
# Copy environment templates
cp apps/frontend/.env.example apps/frontend/.env
cp apps/inngest-app/.env.example apps/inngest-app/.env

# Edit .env files with your credentials
# Required: DATABASE_URL, CLERK_SECRET_KEY, INNGEST_SIGNING_KEY
```

**3. Setup Database**

```bash
cd packages/db
pnpm db:generate  # Generate Prisma client
pnpm db:migrate   # Run migrations
cd ../..
```

**4. Build and Run**

```bash
pnpm build:packages  # Build shared packages
pnpm dev            # Start all services
```

**5. Open Your Browser**

- 🎨 **Frontend**: http://localhost:3000
- ⚙️ **Backend API**: http://localhost:3001
- 📊 **Inngest Dev Server**: http://localhost:3001/api/inngest

---

## ✨ Features

### For Users

- **� Workflow Marketplace** - Browse and install pre-built automations
- **🎛️ Visual Configuration** - No-code workflow setup with form-based inputs
- **� Scheduling** - Run workflows on cron schedules or trigger manually
- **� Analytics** - Track time saved, costs reduced, and success rates
- **🔔 Real-time Logs** - Watch your workflows execute with live updates
- **🔐 Credential Management** - Securely store and manage OAuth tokens

### For Developers

- **� TypeScript First** - Full type safety across the stack
- **🎯 Simple Workflow API** - Create workflows with minimal boilerplate
- **� AHot Reload** - Edit workflows without restarting the server
- **🧪 Built-in Testing** - Test workflows locally before deployment
- **📚 Auto-generated Docs** - OpenAPI/Swagger documentation
- **🚀 Easy Deployment** - One-click deploy to Vercel

---

## 🏗️ Architecture

### Monorepo Structure

```
duramation/
├── apps/
│   ├── frontend/              # 🎨 Next.js Dashboard (Port 3000)
│   │   ├── src/app/          # App Router pages
│   │   ├── src/components/   # React components
│   │   └── src/features/     # Feature modules
│   │
│   └── inngest-app/          # ⚙️ Workflow Engine (Port 3001)
│       ├── src/inngest/      # Workflow definitions
│       ├── src/services/     # Business logic
│       └── src/lib/          # Utilities
│
├── packages/
│   ├── db/                   # � ️ Prisma ORM + Schema
│   ├── shared/               # � Shatred types & utilities
│   ├── integrations/         # � Pyrovider integrations (Google, Slack, etc.)
│   ├── eslint-config/        # 🔍 Linting rules
│   └── typescript-config/    # � TypeScri pt configs
│
└── scripts/                  # 🛠️ Build & deployment scripts
```

### Data Flow

```
User → Frontend → API Routes → Inngest → Workflows → External APIs
                      ↓
                  Database (PostgreSQL)
                      ↓
                  Cache (Redis)
```

---

## 📖 Usage Examples

### Creating a Workflow

```typescript
// apps/inngest-app/src/inngest/functions/send-email/function.ts
import { inngest } from '@/inngest/client';

export const sendEmailWorkflow = inngest.createFunction(
  { id: 'send-email' },
  { event: 'workflow/send.email' },
  async ({ event, step }) => {
    const { to, subject, body } = event.data.input;
    
    await step.run('send-email', async () => {
      // Your email sending logic
      return { success: true };
    });
  }
);
```

### Triggering a Workflow

```typescript
// Via API
const response = await fetch('/api/v1/workflows/my-workflow-id/trigger', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
  body: JSON.stringify({
    input: { to: 'user@example.com', subject: 'Hello!' }
  })
});
```

### Monitoring Workflows

```typescript
// Real-time updates via WebSocket
const channel = workflowChannel(userId, workflowId);
channel.subscribe((update) => {
  console.log(update.type, update.message);
});
```

---

## 🛠️ Development

### Available Scripts

#### Development

```bash
pnpm dev              # Start all apps in dev mode
pnpm dev:frontend     # Start frontend only
pnpm dev:backend      # Start backend only
```

#### Building

```bash
pnpm build            # Build all apps and packages
pnpm build:frontend   # Build frontend app
pnpm build:backend    # Build backend app
pnpm build:packages   # Build shared packages only
```

#### Database

```bash
cd packages/db
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes
pnpm db:studio        # Open Prisma Studio
```

#### Workflow Development

```bash
cd apps/inngest-app
pnpm update-templates # Sync workflow templates to database
pnpm update-schemas   # Generate Zod schemas for workflow metadata
```

#### Code Quality

```bash
pnpm lint             # Lint all packages
pnpm typecheck        # Type check all packages
pnpm format           # Format code with Prettier
pnpm check-types      # Check types in all packages
pnpm clean            # Clean build artifacts
```

#### Deployment

```bash
pnpm deploy:staging   # Deploy to staging
pnpm deploy:production # Deploy to production
```

### Adding a New Workflow

```bash
# 1. Create workflow folder
mkdir -p apps/inngest-app/src/inngest/functions/my-workflow

# 2. Create function.ts and metadata.ts
# 3. Add to apps/inngest-app/src/inngest/functions/index.ts
# 4. Run dev server - changes are hot-reloaded!
pnpm dev
```

See [ADDING_WORKFLOWS.md](apps/inngest-app/ADDING_WORKFLOWS.md) for detailed guide.

---

## 🔧 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 15 + React 19 | Server-side rendering, App Router |
| **UI** | Tailwind CSS v4 + Shadcn | Modern, accessible components |
| **Auth** | Clerk | User authentication & management |
| **State** | Zustand | Client-side state management |
| **Backend** | Next.js API Routes | RESTful API endpoints |
| **Workflows** | Inngest v3.42+ | Durable workflow execution |
| **Database** | PostgreSQL + Prisma | Relational data storage |
| **Cache** | Upstash Redis | Fast data caching |
| **Storage** | Cloudflare R2 | File storage (S3-compatible) |
| **Deployment** | Vercel | Edge deployment platform |
| **Monitoring** | Winston | Structured logging |
| **Type Safety** | TypeScript 5.9 | End-to-end type safety |

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test  # if tests exist
   ```
5. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push and create a PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Contribution Guidelines

- **Code Style**: Follow existing patterns, use Prettier
- **Type Safety**: All code must be fully typed
- **Testing**: Add tests for new features
- **Documentation**: Update docs for API changes
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/)

### Areas to Contribute

- � ***New Integrations** - Add support for more services
- 🎨 **UI Improvements** - Enhance the dashboard
- 📚 **Documentation** - Improve guides and examples
- 🐛 **Bug Fixes** - Fix issues and improve stability
- ⚡ **Performance** - Optimize workflows and queries
- 🧪 **Testing** - Add test coverage

---

## 📚 Documentation

- **[Adding Workflows](apps/inngest-app/ADDING_WORKFLOWS.md)** - Create custom workflows
- **[Integration Best Practices](apps/inngest-app/INTEGRATION_BEST_PRACTICES.md)** - Add new providers
- **[API Documentation](apps/inngest-app/public/swagger.json)** - OpenAPI spec
- **[Environment Variables](apps/frontend/env.example.txt)** - Configuration guide

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to staging
pnpm deploy:staging

# Deploy to production
pnpm deploy:production
```

### Docker (Coming Soon)

```bash
docker-compose up -d
```

### Manual Deployment

1. Build all packages: `pnpm build`
2. Deploy frontend to Vercel/Netlify
3. Deploy backend to Vercel/Railway
4. Configure environment variables
5. Run database migrations

---

## 🔐 Security

- **Encrypted Credentials** - All OAuth tokens encrypted at rest
- **API Key Authentication** - Secure API access
- **CORS Protection** - Configured for production
- **Rate Limiting** - Prevent abuse
- **Webhook Signatures** - Verify webhook authenticity

Report security issues to: security@duramation.com

---

## 📊 Roadmap

- [x] **v1.0** - Core workflow engine
- [ ] **v1.1** - More integrations (Notion, Airtable, GitHub)
- [ ] **v1.2** - Workflow templates marketplace
- [ ] **v1.3** - Team collaboration features
- [ ] **v1.4** - Advanced scheduling (delays, retries)
- [ ] **v2.0** - Visual workflow builder
- [ ] **v2.1** - AI-powered workflow suggestions
- [ ] **v2.2** - Multi-tenant support

---

## 💬 Community & Support

- **GitHub Issues** - Bug reports and feature requests
- **Discussions** - Questions and community chat
- **Discord** - Real-time community support (coming soon)
- **Twitter** - [@duramation](https://twitter.com/duramation) (coming soon)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details
