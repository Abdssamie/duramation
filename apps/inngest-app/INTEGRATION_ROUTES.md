# Integration API Routes

## Overview

The integrations package provides the **logic**, but you need **Next.js API routes** to expose them as HTTP endpoints.

## Route Pattern

For each OAuth provider, you need two routes:

### 1. Auth URL Route
**Path**: `/api/credentials/{provider}/auth-url/route.ts`

**Purpose**: Generate OAuth authorization URL

**Query Params**:
- `scopes` (optional): Comma-separated list of scopes
- `workflowId` (optional): Associate credential with specific workflow

**Example**:
```typescript
import { Google, getProviderRegistryConfig } from "@duramation/integrations";

export async function GET(req: Request) {
  // 1. Authenticate user
  // 2. Get scopes (from query or defaults)
  // 3. Create state with userId and workflowId
  // 4. Generate auth URL using provider's AuthHandler
  const url = Google.GoogleAuthHandler.generateAuthUrl(scopes, state);
  return NextResponse.json({ url });
}
```

### 2. Callback Route
**Path**: `/api/credentials/{provider}/callback/route.ts`

**Purpose**: Handle OAuth callback and store credentials

**Query Params**:
- `code`: OAuth authorization code
- `state`: State parameter with userId and workflowId

**Example**:
```typescript
import { Google } from "@duramation/integrations";

export async function GET(request: Request) {
  // 1. Extract code and state from query params
  // 2. Parse state to get userId and workflowId
  // 3. Exchange code for tokens using provider's AuthHandler
  const credentialPayload = await Google.GoogleAuthHandler.handleCallback(code);
  // 4. Store credential in database
  // 5. Redirect user back to app
}
```

## Implemented Routes

### Google
- ✅ `/api/credentials/google/auth-url` - Generate Google OAuth URL
- ✅ `/api/credentials/google/callback` - Handle Google OAuth callback

### Slack
- ✅ `/api/credentials/slack/auth-url` - Generate Slack OAuth URL
- ✅ `/api/credentials/slack/callback` - Handle Slack OAuth callback

## To Add a New Provider

1. **Ensure provider is in integrations package** (`packages/integrations/src/providers/{provider}/`)

2. **Create auth-url route**:
```bash
mkdir -p apps/inngest-app/src/app/api/credentials/{provider}/auth-url
# Copy from slack/auth-url/route.ts and replace provider name
```

3. **Create callback route**:
```bash
mkdir -p apps/inngest-app/src/app/api/credentials/{provider}/callback
# Copy from slack/callback/route.ts and replace provider name
```

4. **Update environment variables**:
```env
{PROVIDER}_CLIENT_ID=xxx
{PROVIDER}_CLIENT_SECRET=xxx
{PROVIDER}_REDIRECT_URL=http://localhost:3000/api/credentials/{provider}/callback
```

## API Key Providers (Firecrawl, Custom)

For API key providers, you don't need OAuth routes. Just store the credential directly:

```typescript
// In your frontend or API route
import { Firecrawl } from "@duramation/integrations";

// Validate API key
const isValid = await Firecrawl.FirecrawlAuthHandler.validateApiKey(apiKey);

// Store credential
const createRequest: CredentialCreateRequest = {
  name: "Firecrawl API",
  type: CredentialType.API_KEY,
  provider: Provider.FIRECRAWL,
  secret: { apiKey },
};

await storeCredential(userId, createRequest);
```

## Environment Variables Required

```env
# Google
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
GOOGLE_OAUTH_REDIRECT_URL=http://localhost:3000/api/credentials/google/callback

# Slack
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
SLACK_REDIRECT_URL=http://localhost:3000/api/credentials/slack/callback

# Frontend
FRONTEND_URL=http://localhost:3000
```

## Next Steps

1. Build integrations package: `cd packages/integrations && npm run build`
2. Add integrations package to inngest-app dependencies if not already
3. Set up environment variables
4. Test OAuth flows
