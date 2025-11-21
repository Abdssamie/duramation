# Agent Instructions for Duramation Migration

## Workflow Rules

### After Every TypeScript File Change
1. **Run typecheck immediately**:
   ```bash
   pnpm typecheck
   ```
2. Fix any type errors before proceeding
3. If typecheck passes, continue to next step

### After Every Task Completion
1. **Stage changes**:
   ```bash
   git add .
   ```
2. **Commit with descriptive message**:
   ```bash
   git commit -m "feat: [description of what was implemented]"
   ```
3. Use conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `refactor:` for code restructuring
   - `test:` for adding tests
   - `docs:` for documentation

### Task Execution Flow
```
Implement Change → Run Typecheck → Fix Errors → Git Add → Git Commit → Next Task
```

## Current Migration: Agent Workflow Infrastructure

### Phase 1: Shared Services Layer
- Extract common HTTP client
- Extract auth manager
- Extract rate limiter
- Extract error handlers

### Phase 2: Dynamic Workflow Registry
- Auto-discover workflows
- Remove manual registration
- Hot-reload support

### Phase 3: Workflow Generator API
- Create generation endpoint
- Template system
- File creation utilities

### Phase 4: Testing & Validation
- Syntax validation
- Type checking automation
- Security scanning
- Integration test helpers

## Important Notes
- Always maintain type safety
- Keep changes minimal and focused
- Test locally before committing
- Follow existing code patterns
