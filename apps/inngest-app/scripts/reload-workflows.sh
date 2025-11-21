#!/bin/bash
# Workflow reload script for AI agents
# Usage: ./scripts/reload-workflows.sh

set -e

echo "🔄 Reloading workflows..."

# Validate workflow structure
echo "📋 Validating workflow structure..."
pnpm tsx -e "
  const { validateWorkflowStructure } = require('./src/lib/workflow-loader.ts');
  const { valid, invalid } = validateWorkflowStructure();
  if (invalid.length > 0) {
    console.error('❌ Invalid workflows found. Fix them before reloading.');
    process.exit(1);
  }
  console.log('✓ All workflows valid');
"

# Typecheck
echo "🔍 Running typecheck..."
pnpm typecheck

# In development: restart dev server (handled by process manager)
if [ "$NODE_ENV" = "development" ]; then
  echo "✓ Workflows validated. Restart dev server to load changes."
  echo "  Run: pnpm dev"
fi

# In production: trigger deployment
if [ "$NODE_ENV" = "production" ]; then
  echo "🚀 Triggering production deployment..."
  # This would trigger your CI/CD pipeline
  # git commit -m "feat: add new workflow" && git push
fi

echo "✅ Workflow reload complete"
