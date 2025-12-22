# Phase 4: Testing & Validation - TODO

## Status: Partially Complete
- ✅ GitHub Actions CI workflow created
- ❌ Validation and test utilities removed (build issues)
- ⏳ Remaining work documented below

---

## 1. Workflow Structure Validation

### Goal
Validate that workflow folders follow the required structure before deployment.

### Tasks
- [ ] Create `apps/inngest-app/src/lib/workflow-validator.ts`
  - Export `validateWorkflowStructure(workflowPath: string): Promise<string[]>`
  - Check for required files: `function.ts` and `metadata.ts`
  - Verify `function.ts` contains `inngest.createFunction`
  - Verify `metadata.ts` exports valid metadata object
  - Return array of validation errors (empty if valid)

### Implementation Notes
- Use Node.js `fs/promises` for file checks
- Keep validation synchronous and fast
- Don't import the actual workflow files (avoid side effects)
- Use simple string matching for required patterns

---

## 2. Metadata Schema Validation

### Goal
Validate workflow metadata against Zod schema before syncing to database.

### Tasks
- [ ] Add validation to `apps/inngest-app/src/lib/sync-templates.ts`
  - Import `workflowTemplateSchema` from `@duramation/shared/validation/marketplace`
  - Validate each metadata object before database insert
  - Log validation errors with workflow name
  - Skip invalid workflows (don't fail entire sync)

### Implementation Notes
```typescript
import { workflowTemplateSchema } from '@duramation/shared/validation/marketplace';

// In sync loop:
const result = workflowTemplateSchema.safeParse(metadata);
if (!result.success) {
  console.error(`Invalid metadata for ${workflowName}:`, result.error.errors);
  continue; // Skip this workflow
}
```

---

## 3. Test Utilities (Optional)

### Goal
Provide helpers for testing workflows in isolation.

### Tasks
- [ ] Create `apps/inngest-app/src/lib/test-helpers.ts`
  - `createMockCredentials()` - Returns mock CredentialSecret object
  - `createMockWorkflowInput<T>(input: T)` - Type-safe input helper
  - `waitForCondition()` - Async polling utility for tests

### Implementation Notes
- Only create if you plan to write workflow tests
- Keep dependencies minimal (no test framework imports)
- Make helpers framework-agnostic (work with any test runner)

---

## 4. Pre-commit Hooks (Optional)

### Goal
Run typecheck and lint before commits to catch errors early.

### Tasks
- [ ] Install husky: `pnpm add -D husky`
- [ ] Add pre-commit hook:
  ```bash
  npx husky init
  echo "pnpm typecheck && pnpm lint" > .husky/pre-commit
  ```
- [ ] Test by making a commit with type errors

### Implementation Notes
- This is optional but recommended for team workflows
- Can be bypassed with `git commit --no-verify` if needed
- Consider adding to CI instead if pre-commit is too slow

---

## 5. Security Scanning

### Goal
Detect credential leaks and vulnerabilities in dependencies.

### Tasks
- [ ] Enable GitHub secret scanning (Settings → Security → Secret scanning)
- [ ] Add Dependabot (Settings → Security → Dependabot)
- [ ] Optional: Add `.github/workflows/security-scan.yml`:
  ```yaml
  name: Security Scan
  on: [push, pull_request]
  jobs:
    scan:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: github/super-linter@v5
  ```

### Implementation Notes
- GitHub provides these features for free on public repos
- Secret scanning catches hardcoded API keys, tokens, etc.
- Dependabot auto-creates PRs for dependency updates

---

## 6. Workflow Reload Script Enhancement

### Goal
Add validation to reload script before restarting server.

### Tasks
- [ ] Update `apps/inngest-app/scripts/reload-workflows.sh`
  - Add structure validation before typecheck
  - Validate all workflow folders in `src/inngest/functions/`
  - Exit with error if any validation fails
  - Show clear error messages with workflow names

### Implementation Notes
```bash
# Add before typecheck:
echo "🔍 Validating workflow structure..."
node -e "
  const fs = require('fs');
  const path = require('path');
  const functionsDir = './src/inngest/functions';
  const workflows = fs.readdirSync(functionsDir);
  
  for (const name of workflows) {
    const dir = path.join(functionsDir, name);
    if (!fs.statSync(dir).isDirectory()) continue;
    
    const hasFunction = fs.existsSync(path.join(dir, 'function.ts'));
    const hasMetadata = fs.existsSync(path.join(dir, 'metadata.ts'));
    
    if (!hasFunction || !hasMetadata) {
      console.error(\`❌ Invalid workflow: \${name}\`);
      process.exit(1);
    }
  }
  console.log('✅ All workflows valid');
"
```

---

## Priority Order

1. **High Priority** (Do First)
   - Metadata schema validation in sync-templates.ts
   - Workflow structure validation in reload script

2. **Medium Priority** (Nice to Have)
   - Workflow validator utility
   - GitHub secret scanning + Dependabot

3. **Low Priority** (Optional)
   - Test helpers
   - Pre-commit hooks
   - Advanced security scanning

---

## Estimated Time
- High priority tasks: 2-3 hours
- Medium priority tasks: 1-2 hours
- Low priority tasks: 1-2 hours
- **Total: 4-7 hours**

---

## Testing Checklist

After implementing, verify:
- [ ] `pnpm build` succeeds
- [ ] `pnpm typecheck` passes
- [ ] Invalid workflow metadata is rejected during sync
- [ ] Reload script catches missing function.ts/metadata.ts
- [ ] CI workflow runs on PR and catches type errors
- [ ] No false positives in validation
