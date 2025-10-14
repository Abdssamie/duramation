# Integration Best Practices

Guidelines for adding third-party service integrations while maintaining performance and manageable bundle sizes.

## The Bundle Size Problem

When adding integrations, each service SDK adds to your bundle size:
- `googleapis`: ~2MB
- `@slack/web-api`: ~500KB  
- `facebook-sdk`: ~5MB
- `aws-sdk`: ~50MB (full SDK)

**Problem**: Installing all SDKs affects ALL workflows, even if only one uses them.

## Solution Strategies

### 1. Dynamic Imports (Recommended for Most Cases)

Load SDKs only when needed:

```typescript
// ❌ BAD: Loads immediately
import { FacebookService } from 'facebook-sdk';

// ✅ GOOD: Loads only when used
const loadFacebookService = async () => {
  const { FacebookService } = await import('facebook-sdk');
  return FacebookService;
};

export const facebookWorkflow = inngest.createFunction(
  { id: "post-to-facebook" },
  { event: "workflow/facebook.post" },
  async ({ step }) => {
    await step.run("post", async () => {
      const FacebookService = await loadFacebookService();
      const fb = new FacebookService(credentials);
      await fb.post(message);
    });
  }
);
```

### 2. Optional Peer Dependencies

Mark heavy dependencies as optional in `package.json`:

```json
{
  "peerDependencies": {
    "googleapis": "^159.0.0",
    "facebook-sdk": "^3.0.0"
  },
  "peerDependenciesMeta": {
    "facebook-sdk": {
      "optional": true
    }
  }
}
```

Then only install what you need:

```json
// apps/inngest-app/package.json
{
  "dependencies": {
    "googleapis": "^159.0.0",
    // Don't install facebook-sdk unless you have Facebook workflows
  }
}
```

### 3. Separate Integration Packages (For Very Large SDKs)

For SDKs > 10MB, create separate packages:

```
packages/
  integrations/              # Core (lightweight)
  integrations-google/       # Google-specific
  integrations-facebook/     # Facebook-specific  
  integrations-salesforce/   # Salesforce-specific
```

```json
// Only install what you need
{
  "dependencies": {
    "@duramation/integrations": "*",
    "@duramation/integrations-google": "*"
  }
}
```

## Integration Package Structure

### Minimal Example

```typescript
// packages/integrations/src/providers/facebook/services/facebook.ts
export class FacebookService {
  private static sdk: any;

  // Lazy load SDK
  private static async loadSDK() {
    if (!this.sdk) {
      this.sdk = await import('facebook-sdk');
    }
    return this.sdk;
  }

  async postToPage(pageId: string, message: string) {
    const sdk = await FacebookService.loadSDK();
    const FB = new sdk.Facebook(this.credentials);
    return await FB.api(`/${pageId}/feed`, 'POST', { message });
  }
}
```

### With Error Handling

```typescript
export class FacebookService {
  private static async loadSDK() {
    try {
      return await import('facebook-sdk');
    } catch (error) {
      throw new Error(
        'Facebook SDK not installed. Run: npm install facebook-sdk'
      );
    }
  }
}
```

## Provider Integration Checklist

When adding a new provider:

- [ ] **Evaluate SDK size** - Check npm package size
- [ ] **Use dynamic imports** - For SDKs > 500KB
- [ ] **Mark as optional** - Add to peerDependenciesMeta
- [ ] **Document installation** - Add to provider README
- [ ] **Test without SDK** - Ensure graceful failure
- [ ] **Monitor bundle size** - Use webpack-bundle-analyzer

## Bundle Size Guidelines

| SDK Size | Strategy |
|----------|----------|
| < 100KB | Direct import OK |
| 100KB - 1MB | Use dynamic imports |
| 1MB - 10MB | Dynamic imports + optional peer dep |
| > 10MB | Separate package |

## Example: Adding Salesforce Integration

### 1. Create Provider Structure

```
packages/integrations/src/providers/salesforce/
├── config.ts
├── auth.ts
├── services/
│   └── salesforce.ts
└── index.ts
```

### 2. Implement with Dynamic Loading

```typescript
// services/salesforce.ts
export class SalesforceService {
  private static jsforce: any;

  private static async loadJSForce() {
    if (!this.jsforce) {
      try {
        this.jsforce = await import('jsforce');
      } catch (error) {
        throw new Error(
          'JSForce not installed. Install with: npm install jsforce\n' +
          'This is optional and only needed for Salesforce workflows.'
        );
      }
    }
    return this.jsforce;
  }

  async query(soql: string) {
    const jsforce = await SalesforceService.loadJSForce();
    const conn = new jsforce.Connection({
      instanceUrl: this.credentials.instanceUrl,
      accessToken: this.credentials.accessToken
    });
    return await conn.query(soql);
  }
}
```

### 3. Mark as Optional

```json
// packages/integrations/package.json
{
  "peerDependencies": {
    "jsforce": "^2.0.0"
  },
  "peerDependenciesMeta": {
    "jsforce": {
      "optional": true
    }
  }
}
```

### 4. Document Installation

```markdown
// packages/integrations/src/providers/salesforce/README.md
# Salesforce Integration

## Installation

This integration requires the JSForce library:

\`\`\`bash
npm install jsforce
\`\`\`

Bundle size: ~2MB

## Usage

...
```

## Monitoring Bundle Size

### 1. Add Bundle Analyzer

```bash
npm install --save-dev webpack-bundle-analyzer
```

### 2. Analyze Build

```bash
ANALYZE=true npm run build
```

### 3. Set Size Budgets

```json
// next.config.js
module.exports = {
  webpack: (config) => {
    config.performance = {
      maxAssetSize: 500000, // 500KB
      maxEntrypointSize: 500000,
      hints: 'warning'
    };
    return config;
  }
};
```

## Performance Best Practices

### 1. Cache SDK Instances

```typescript
class ServiceCache {
  private static instances = new Map();

  static get(key: string, factory: () => any) {
    if (!this.instances.has(key)) {
      this.instances.set(key, factory());
    }
    return this.instances.get(key);
  }
}
```

### 2. Lazy Load Heavy Operations

```typescript
// Load only when needed
await step.run("heavy-operation", async () => {
  const HeavyLib = await import('heavy-library');
  return await HeavyLib.process(data);
});
```

### 3. Use Tree Shaking

```typescript
// ❌ Imports entire library
import * as AWS from 'aws-sdk';

// ✅ Imports only what's needed
import { S3 } from 'aws-sdk/clients/s3';
```

## Testing Without Dependencies

```typescript
describe('FacebookService', () => {
  it('should fail gracefully without SDK', async () => {
    // Mock import to fail
    jest.mock('facebook-sdk', () => {
      throw new Error('Module not found');
    });

    const service = new FacebookService(creds);
    
    await expect(service.post('test'))
      .rejects
      .toThrow('Facebook SDK not installed');
  });
});
```

## Migration Guide

### Converting Existing Integration

1. **Identify heavy imports**
```bash
npm ls --depth=0 | grep -E "MB|KB"
```

2. **Convert to dynamic imports**
```typescript
// Before
import { HeavySDK } from 'heavy-sdk';

// After  
const loadSDK = async () => await import('heavy-sdk');
```

3. **Update package.json**
```json
{
  "peerDependenciesMeta": {
    "heavy-sdk": { "optional": true }
  }
}
```

4. **Test and document**

## Summary

- **Always check SDK size** before adding
- **Use dynamic imports** for SDKs > 500KB
- **Mark as optional** in package.json
- **Document installation** requirements
- **Monitor bundle size** regularly
- **Test graceful failures** without SDKs

Following these practices keeps your application fast and maintainable as you add more integrations.
