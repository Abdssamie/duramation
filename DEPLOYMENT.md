# Deployment Guide

This guide explains how to deploy Duramation to Vercel with automated CI/CD.

## Prerequisites

- GitHub repository
- Vercel account
- Node.js 20+
- Yarn package manager

## Initial Setup

### 1. Install Vercel CLI

```bash
yarn add -D -W vercel
```

### 2. Link Projects to Vercel

#### Frontend App

```bash
cd apps/frontend
vercel link
```

Follow the prompts to:
- Select your Vercel scope/team
- Link to existing project or create new one
- Save the project settings

#### Inngest App

```bash
cd apps/inngest-app
vercel link
```

Repeat the same process for the inngest app.

### 3. Get Vercel Credentials

```bash
# Get your Vercel token
vercel whoami
# Then go to: https://vercel.com/account/tokens

# Get your Org ID and Project IDs
cat apps/frontend/.vercel/project.json
cat apps/inngest-app/.vercel/project.json
```

## GitHub Secrets Setup

Add these secrets to your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

### Required Secrets:

```
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-org-id>
VERCEL_FRONTEND_PROJECT_ID=<frontend-project-id>
VERCEL_INNGEST_PROJECT_ID=<inngest-project-id>
```

## Environment Variables

### Frontend App

Add these to Vercel project settings:

```bash
NEXT_PUBLIC_BACKEND_API_URL=https://your-inngest-app.vercel.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
```

### Inngest App

Add these to Vercel project settings:

```bash
# Database
DATABASE_URL=postgresql://...

# Clerk
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...

# Inngest
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...

# OAuth Providers
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
SLACK_CLIENT_ID=...
SLACK_CLIENT_SECRET=...
MICROSOFT_OAUTH_CLIENT_ID=...
MICROSOFT_OAUTH_CLIENT_SECRET=...

# Frontend URL
FRONTEND_URL=https://your-frontend.vercel.app
```

## CI/CD Workflows

### Automatic Deployments

- **Push to `develop`** → Deploys to staging
- **Push to `main`** → Deploys to production
- **Pull requests** → Runs CI checks (lint, typecheck, build)

### Manual Deployment

You can also trigger production deployment manually:

```bash
# Via GitHub UI
Actions → Deploy to Production → Run workflow

# Via Vercel CLI
cd apps/frontend
vercel --prod

cd apps/inngest-app
vercel --prod
```

## Branch Strategy

```
main (production)
  ↑
develop (staging)
  ↑
feature/* (preview deployments)
```

### Workflow:

1. Create feature branch from `develop`
2. Make changes and push
3. CI runs automatically on PR
4. Merge to `develop` → Auto-deploy to staging
5. Test on staging
6. Merge to `main` → Auto-deploy to production

## Vercel CLI Commands

### Development

```bash
# Run local development with Vercel env
vercel dev

# Pull environment variables
vercel env pull .env.local
```

### Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs <deployment-url>
```

### Environment Variables

```bash
# List env vars
vercel env ls

# Add env var
vercel env add <NAME>

# Remove env var
vercel env rm <NAME>

# Pull env vars to local
vercel env pull
```

## Monorepo Considerations

### Build Order

The CI/CD pipeline builds in this order:

1. Install all dependencies (root)
2. Build shared packages (`yarn build:packages`)
3. Build apps (`yarn build`)

### Vercel Configuration

Each app has its own `vercel.json` that:
- Specifies custom build commands
- Handles monorepo structure
- Sets environment variables

## Database Migrations

### Staging

```bash
# Run migrations on staging database
DATABASE_URL=<staging-db-url> yarn workspace @duramation/db prisma migrate deploy
```

### Production

```bash
# Run migrations on production database
DATABASE_URL=<production-db-url> yarn workspace @duramation/db prisma migrate deploy
```

**⚠️ Important:** Always test migrations on staging first!

## Troubleshooting

### Build Fails

```bash
# Check build logs
vercel logs <deployment-url>

# Test build locally
yarn build:packages
yarn build
```

### Environment Variables Not Working

```bash
# Verify env vars are set
vercel env ls

# Pull latest env vars
vercel env pull

# Check vercel.json configuration
```

### Monorepo Build Issues

```bash
# Ensure packages are built first
yarn build:packages

# Check turbo cache
yarn turbo run build --force
```

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly
- Check database allows connections from Vercel IPs
- Ensure connection pooling is configured

## Monitoring

### Vercel Dashboard

- View deployments: https://vercel.com/dashboard
- Check logs and analytics
- Monitor performance

### Inngest Dashboard

- View workflow executions
- Monitor function performance
- Check error rates

## Rollback

### Via Vercel Dashboard

1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Via CLI

```bash
# List deployments
vercel ls

# Promote specific deployment
vercel promote <deployment-url>
```

## Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Rotate tokens regularly** - Update GitHub secrets
3. **Use environment protection** - Require approvals for production
4. **Enable Vercel Authentication** - Protect preview deployments
5. **Monitor access logs** - Check for suspicious activity

## Performance Optimization

### Vercel Settings

- Enable Edge Functions for API routes
- Configure caching headers
- Use Image Optimization
- Enable compression

### Database

- Use connection pooling (Prisma Accelerate or PgBouncer)
- Add database indexes
- Monitor slow queries

## Cost Management

### Vercel

- Monitor bandwidth usage
- Optimize build times
- Use preview deployment limits

### Database

- Use connection pooling
- Monitor query performance
- Set up read replicas if needed

## Next Steps

1. Set up monitoring (Sentry, LogRocket)
2. Configure custom domains
3. Set up SSL certificates
4. Enable Vercel Analytics
5. Configure backup strategy

## Support

- Vercel Docs: https://vercel.com/docs
- Inngest Docs: https://www.inngest.com/docs
- GitHub Actions: https://docs.github.com/actions
