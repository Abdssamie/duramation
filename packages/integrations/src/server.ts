// Server-side exports with Node.js dependencies
// Import this in backend/server-side code only

// Re-export frontend-safe types and utilities (but not the registry)
export * from './types/providers.js';
export type {
  ProviderUIConfig,
  OAuthProviderConfig,
  ApiKeyProviderConfig,
  ApiKeyField,
  ProviderFullConfig,
  OAuthProviderFullConfig,
  ApiKeyProviderFullConfig,
} from './providers/types.js';

// Server-only services
export * from './services/credential-store.js';
export * from './services/http-client.js';
export * from './services/providers/index.js';
export * from './middleware/inngest-middleware.js';

// Server-only provider registry with auth handlers
export * from './providers/server-registry.js';

// Direct provider exports for server-side usage
export * as Google from './providers/google/index.js';
export * as Slack from './providers/slack/index.js';
export * as Microsoft from './providers/microsoft/index.js';
export * as Firecrawl from './providers/firecrawl/index.js';

// Backward compatibility alias
export { getServerProviderConfig as getProviderRegistryConfig } from './providers/server-registry.js';