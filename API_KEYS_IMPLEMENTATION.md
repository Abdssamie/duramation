# API Keys Feature Implementation Summary

## Overview
Added a complete public API system for triggering workflows externally using API keys.

## What Was Added

### 1. Database Schema (`packages/db/schema.prisma`)
- Added `ApiKey` model with fields:
  - `id`, `userId`, `name`, `key` (encrypted/hashed)
  - `lastUsedAt`, `expiresAt`, `isActive`
  - Proper indexes for performance

### 2. Backend API Endpoints

#### API Key Management (`apps/inngest-app/src/app/api/api-keys/`)
- `GET /api/api-keys` - List all API keys for user
- `POST /api/api-keys` - Create new API key
- `PATCH /api/api-keys/:id` - Update API key (name, active status)
- `DELETE /api/api-keys/:id` - Delete API key

#### Public Workflow API (`apps/inngest-app/src/app/api/v1/`)
- `GET /api/v1/workflows` - List all available workflows
- `GET /api/v1/workflows/:workflowId/trigger` - Get workflow status
- `POST /api/v1/workflows/:workflowId/trigger` - Trigger workflow
- `GET /api/v1/workflows/:workflowId/runs` - Get workflow run history (paginated)
- `GET /api/v1/workflows/:workflowId/runs/:runId` - Get specific run details

### 3. Utilities (`apps/inngest-app/src/lib/utils/api-key.ts`)
- `generateApiKey()` - Generate secure API keys with format `dura_live_<random>`
- `hashApiKey()` - SHA-256 hash for secure storage
- `authenticateApiKey()` - Validate and authenticate API keys

### 4. Frontend Components

#### API Keys Page (`apps/frontend/src/app/dashboard/api-keys/page.tsx`)
- Server component with auth check
- Wrapped in PageContainer for consistent layout

#### API Keys Client (`apps/frontend/src/features/api-keys/components/ApiKeysClient.tsx`)
- List all API keys with status badges
- Create new API keys with dialog
- Show generated key once (with copy and show/hide)
- Toggle active/inactive status
- Delete API keys with confirmation
- Display API documentation with examples

### 5. API Client (`apps/frontend/src/services/api/api-client.ts`)
- Added TypeScript interfaces for API key types
- Added `apiKeysApi` with CRUD methods
- Integrated into default export

### 6. Navigation
- Added "API Keys" to sidebar navigation (`apps/frontend/src/constants/data.ts`)
- Added key icon to Icons component (`apps/frontend/src/components/icons.tsx`)
- Added translation in English dictionary (`apps/frontend/src/locales/dictionaries/en.json`)

### 7. Documentation (`apps/frontend/API_DOCUMENTATION.md`)
- Complete API reference
- Authentication guide
- Usage examples (cURL, JavaScript, Python)
- Security best practices
- Error handling guide

## Security Features

1. **API Key Format**: `dura_live_<random_string>` for easy identification
2. **Hashing**: Keys are SHA-256 hashed before storage
3. **Encryption**: Prisma field-level encryption on the key field
4. **One-time Display**: Generated keys shown only once on creation
5. **Expiration Support**: Optional expiration dates
6. **Active/Inactive Toggle**: Disable keys without deletion
7. **Last Used Tracking**: Monitor key usage
8. **User Isolation**: Keys only work for workflows owned by the key's user

## How to Use

### For End Users:
1. Navigate to Dashboard > API Keys
2. Click "Create API Key"
3. Enter a name and save
4. Copy the generated key (shown only once!)
5. Use the key in external applications

### For Developers:
```bash
# Trigger a workflow
curl -X POST \
  http://localhost:3001/api/v1/workflows/<workflow_id>/trigger \
  -H "Authorization: Bearer dura_live_<your_key>" \
  -H "Content-Type: application/json" \
  -d '{"input": {"key": "value"}}'
```

## API Request/Response Format

### Trigger Workflow Request
```json
{
  "input": {
    "key1": "value1"
  },
  "scheduledRun": false,
  "timezone": "America/New_York",
  "metadata": {
    "source": "api"
  }
}
```

### Trigger Workflow Response
```json
{
  "success": true,
  "data": {
    "runId": "run_1697712345678_abc123def",
    "workflowId": "clw9876543210",
    "workflowName": "workflow/email-report",
    "status": "pending",
    "startedAt": "2024-10-19T10:30:00.000Z",
    "input": {...},
    "metadata": {...}
  },
  "message": "Workflow triggered successfully"
}
```

## Testing Checklist

- [ ] Create API key in dashboard
- [ ] Copy and save the generated key
- [ ] List API keys shows the new key
- [ ] Toggle key active/inactive status
- [ ] Delete API key
- [ ] Trigger workflow with valid API key and input
- [ ] Trigger workflow with empty body (uses default input)
- [ ] Trigger workflow with metadata
- [ ] Trigger workflow with custom timezone
- [ ] Verify input validation works (invalid input returns 400)
- [ ] Verify authentication fails with invalid key
- [ ] Verify authentication fails with inactive key
- [ ] Check lastUsedAt updates after API call
- [ ] Verify user can only trigger their own workflows
- [ ] Verify workflow not found returns 404

## Next Steps (Optional Enhancements)

1. **Rate Limiting**: Add rate limiting per API key
2. **Scopes**: Limit keys to specific workflows
3. **Webhooks**: Add webhook support for workflow completion
4. **API Logs**: Track all API requests per key
5. **Key Rotation**: Automated key rotation reminders
6. **IP Whitelisting**: Restrict keys to specific IP addresses
7. **Usage Analytics**: Dashboard showing API usage metrics

## Files Modified/Created

### Created:
- `packages/db/schema.prisma` (modified - added ApiKey model)
- `apps/inngest-app/src/lib/utils/api-key.ts`
- `apps/inngest-app/src/app/api/api-keys/route.ts`
- `apps/inngest-app/src/app/api/api-keys/[id]/route.ts`
- `apps/inngest-app/src/app/api/v1/workflows/route.ts`
- `apps/inngest-app/src/app/api/v1/workflows/[workflowId]/trigger/route.ts`
- `apps/inngest-app/src/app/api/v1/workflows/[workflowId]/runs/route.ts`
- `apps/inngest-app/src/app/api/v1/workflows/[workflowId]/runs/[runId]/route.ts`
- `apps/frontend/src/app/dashboard/api-keys/page.tsx`
- `apps/frontend/src/features/api-keys/components/ApiKeysClient.tsx`
- `apps/frontend/API_DOCUMENTATION.md`
- `API_KEYS_IMPLEMENTATION.md`
- `API_TESTING_GUIDE.md`
- `examples/duramation-sdk-example.js`
- `examples/duramation_sdk_example.py`
- `examples/README.md`

### Modified:
- `apps/frontend/src/services/api/api-client.ts`
- `apps/frontend/src/constants/data.ts`
- `apps/frontend/src/components/icons.tsx`
- `apps/frontend/src/locales/dictionaries/en.json`

## Database Migration

Run these commands to apply the schema changes:

```bash
cd packages/db
npx prisma generate
npx prisma db push
# or
npx prisma migrate dev --name add_api_keys
```
