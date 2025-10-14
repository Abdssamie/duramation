#!/bin/bash

# Vercel Setup Script for Duramation
# This script helps you set up Vercel projects and get the necessary IDs

set -e

echo "🚀 Duramation Vercel Setup"
echo "=========================="
echo ""

echo "📦 Step 1: Link Frontend App"
echo "----------------------------"
cd apps/frontend
npx vercel link
cd ../..

echo ""
echo "📦 Step 2: Link Inngest App"
echo "----------------------------"
cd apps/inngest-app
npx vercel link
cd ../..

echo ""
echo "✅ Projects linked successfully!"
echo ""
echo "📋 Step 3: Get Your Project IDs"
echo "--------------------------------"

FRONTEND_PROJECT_ID=$(cat apps/frontend/.vercel/project.json | grep -o '"projectId":"[^"]*' | cut -d'"' -f4)
INNGEST_PROJECT_ID=$(cat apps/inngest-app/.vercel/project.json | grep -o '"projectId":"[^"]*' | cut -d'"' -f4)
ORG_ID=$(cat apps/frontend/.vercel/project.json | grep -o '"orgId":"[^"]*' | cut -d'"' -f4)

echo ""
echo "🔑 Add these secrets to GitHub:"
echo "================================"
echo ""
echo "VERCEL_TOKEN=<get from https://vercel.com/account/tokens>"
echo "VERCEL_ORG_ID=$ORG_ID"
echo "VERCEL_FRONTEND_PROJECT_ID=$FRONTEND_PROJECT_ID"
echo "VERCEL_INNGEST_PROJECT_ID=$INNGEST_PROJECT_ID"
echo ""
echo "📍 Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions"
echo ""
echo "✨ Setup complete! Check DEPLOYMENT.md for next steps."
