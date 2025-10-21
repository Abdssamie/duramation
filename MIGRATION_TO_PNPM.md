# Migration from Yarn to pnpm

This project has been migrated from Yarn to pnpm for better performance and disk space efficiency.

## Prerequisites

Install pnpm globally:

```bash
npm install -g pnpm@9.15.4
# or
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## Migration Steps

### 1. Clean up Yarn artifacts

```bash
# Remove yarn.lock and node_modules
rm -rf yarn.lock node_modules
rm -rf apps/*/node_modules packages/*/node_modules
rm -rf apps/*/.next packages/*/dist
```

### 2. Install dependencies with pnpm

```bash
pnpm install
```

### 3. Verify the installation

```bash
# Check that all packages are properly linked
pnpm list --depth=0

# Try building packages
pnpm build:packages

# Try running dev
pnpm dev
```

## Key Differences

### Command Mapping

| Yarn | pnpm |
|------|------|
| `yarn` | `pnpm install` |
| `yarn add <pkg>` | `pnpm add <pkg>` |
| `yarn add -D <pkg>` | `pnpm add -D <pkg>` |
| `yarn remove <pkg>` | `pnpm remove <pkg>` |
| `yarn <script>` | `pnpm <script>` |
| `yarn workspace <name> <cmd>` | `pnpm --filter <name> <cmd>` |

### Workspace Commands

```bash
# Run command in specific workspace
pnpm --filter frontend dev
pnpm --filter inngest-app build

# Run command in all workspaces
pnpm -r build

# Add dependency to specific workspace
pnpm --filter frontend add lodash
```

## Configuration Files

- **pnpm-workspace.yaml**: Defines workspace packages (replaces package.json workspaces)
- **.npmrc**: pnpm configuration
- **package.json**: Updated packageManager field to `pnpm@9.15.4`

## Benefits of pnpm

1. **Faster installations**: Up to 2x faster than Yarn
2. **Disk space efficiency**: Uses content-addressable storage (saves ~50% disk space)
3. **Strict dependency resolution**: Prevents phantom dependencies
4. **Better monorepo support**: Native workspace protocol support
5. **Compatible with npm/yarn**: Can use the same package.json format

## Troubleshooting

### Peer dependency warnings

If you see peer dependency warnings, they're usually safe to ignore. To suppress them:

```bash
pnpm install --no-strict-peer-dependencies
```

### Module not found errors

If you encounter "module not found" errors after migration:

```bash
# Clean everything and reinstall
pnpm clean
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

### Prisma client issues

If Prisma client is not found:

```bash
cd packages/db
pnpm db:generate
cd ../..
pnpm build:packages
```

## CI/CD Updates

Update your CI/CD pipelines to use pnpm:

```yaml
# GitHub Actions example
- uses: pnpm/action-setup@v2
  with:
    version: 9.15.4

- uses: actions/setup-node@v4
  with:
    node-version: 18
    cache: 'pnpm'

- run: pnpm install --frozen-lockfile
- run: pnpm build
```

## Vercel Deployment

Vercel automatically detects pnpm. No configuration needed, but you can explicitly set it:

```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install"
}
```
