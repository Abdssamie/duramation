#!/bin/bash
set -e

# Reset working tree (Jules requirement)
git reset --hard HEAD

# Verify Node.js 22
node -v | grep -q "v22" || { echo "Error: Node.js 22 required"; exit 1; }

# Verify pnpm exists
command -v pnpm >/dev/null 2>&1 || { echo "Error: pnpm not found"; exit 1; }

# Install dependencies
pnpm install

# Build shared packages
pnpm build:packages

# Generate Prisma client
cd packages/db && pnpm db:generate && cd ../..

# Verify setup
pnpm typecheck
