# Quick Deploy Guide

Get your app deployed in 5 minutes!

## 🚀 Quick Start

### 1. Run Setup Script

```bash
./scripts/setup-vercel.sh
```

This will:
- Link your apps to Vercel
- Generate project IDs
- Show you what secrets to add to GitHub

### 2. Add GitHub Secrets

Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`

Add these 4 secrets (get values from setup script output):
- `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
- `VERCEL_ORG_ID`
- `VERCEL_FRONTEND_PROJECT_ID`
- `VERCEL_INNGEST_PROJECT_ID`

### 3. Add Environment Variables to Vercel

#### Frontend (https://vercel.com/YOUR_ORG/YOUR_FRONTEND_PROJECT/settings/environment-variables)

```
NEXT_PUBLIC_BACKEND_API_URL=https://your-inngest-app.vercel.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
```

#### Inngest App (https://vercel.com/YOUR_ORG/YOUR_INNGEST_PROJECT/settings/environment-variables)

```
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
GOOGLE_OAUTH_CLIENT_ID=...
GOOGLE_OAUTH_CLIENT_SECRET=...
SLACK_CLIENT_ID=...
SLACK_CLIENT_SECRET=...
MICROSOFT_OAUTH_CLIENT_ID=...
MICROSOFT_OAUTH_CLIENT_SECRET=...
FRONTEND_URL=https://your-frontend.vercel.app
```

### 4. Deploy!

#### Option A: Push to GitHub (Automatic)

```bash
git add .
git commit -m "Add CI/CD pipeline"
git push origin develop  # Deploys to staging
```

#### Option B: Manual Deploy

```bash
# Deploy both apps to staging
yarn deploy:staging

# Deploy both apps to production
yarn deploy:production
```

## 📊 Check Deployment Status

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Actions**: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

## 🔄 Workflow

```
feature/my-feature → develop (staging) → main (production)
```

1. Create feature branch
2. Push changes
3. Create PR to `develop`
4. CI runs automatically
5. Merge → Auto-deploy to staging
6. Test on staging
7. Merge to `main` → Auto-deploy to production

## 🛠️ Useful Commands

```bash
# Pull environment variables locally
vercel env pull

# View deployment logs
vercel logs <deployment-url>

# List deployments
vercel ls

# Rollback to previous deployment
vercel promote <previous-deployment-url>
```

## ⚡ Pro Tips

1. **Test locally first**: `yarn build` before pushing
2. **Use staging**: Always test on `develop` branch first
3. **Monitor logs**: Check Vercel dashboard after deployment
4. **Database migrations**: Run manually before deploying breaking changes

## 🆘 Troubleshooting

### Build fails?
```bash
# Test locally
yarn build:packages
yarn build
```

### Environment variables not working?
```bash
# Pull latest from Vercel
vercel env pull
```

### Need to rollback?
```bash
# Via Vercel dashboard or CLI
vercel promote <previous-deployment-url>
```

## 📚 Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

## ✅ Checklist

- [ ] Run `./scripts/setup-vercel.sh`
- [ ] Add GitHub secrets
- [ ] Add Vercel environment variables (Frontend)
- [ ] Add Vercel environment variables (Inngest)
- [ ] Push to `develop` branch
- [ ] Verify staging deployment works
- [ ] Merge to `main` for production

That's it! Your app is now deployed with automated CI/CD! 🎉
