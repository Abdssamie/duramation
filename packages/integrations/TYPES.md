# Integration Types

## Overview

All provider configurations are now properly typed to ensure you only include fields that have corresponding UI logic.

## Type Structure

### UI Configuration

```typescript
interface ProviderUIConfig {
  // Required fields
  setupInstructions: string;        // Instructions shown to user
  connectionTestAvailable: boolean; // Whether we can test the connection
  
  // Optional: Display logo/branding
  logo?: {
    url: string;
    alt: string;
  };
  
  // Optional: Additional help/documentation links
  helpLinks?: Array<{
    label: string;
    url: string;
  }>;
  
  // Optional: Warning or info messages to display
  notices?: Array<{
    type: 'info' | 'warning' | 'error';
    message: string;
  }>;
  
  // Optional: Scope selection UI for OAuth providers
  scopeSelection?: {
    enabled: boolean;
    categories: Array<{
      id: string;
      label: string;
      description: string;
      scopes: string[];
      required?: boolean;
    }>;
  };
  
  // Optional: Custom fields for API key providers
  customFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'password' | 'url' | 'select' | 'textarea';
    placeholder?: string;
    description?: string;
    required?: boolean;
    options?: string[]; // For select type
    defaultValue?: string;
  }>;
  
  // Optional: Validation rules
  validation?: {
    testEndpoint?: string;
    testMethod?: 'GET' | 'POST';
    successIndicator?: string;
  };
}
```

### OAuth Configuration

```typescript
interface OAuthProviderConfig {
  authUrl: string;                          // OAuth authorization URL
  tokenUrl: string;                         // Token exchange URL
  scopes: Record<string, string[]>;         // Available scopes by category
  defaultScopes: string[];                  // Default scopes to request
}
```

### API Key Configuration

```typescript
interface ApiKeyField {
  name: string;                             // Field name (e.g., 'apiKey')
  label: string;                            // Display label
  type: 'text' | 'password' | 'url';       // Input type
  placeholder?: string;                     // Placeholder text
  description?: string;                     // Help text
}

interface ApiKeyProviderConfig {
  baseUrl: string;                          // API base URL
  headerName: string;                       // Header name (e.g., 'Authorization')
  headerPrefix: string;                     // Prefix (e.g., 'Bearer')
  fields: ApiKeyField[];                    // Fields to collect from user
}
```

### Full Provider Configs

```typescript
// OAuth Provider
interface OAuthProviderFullConfig {
  provider: Provider;
  name: string;
  description: string;
  icon: string;
  authType: 'OAUTH';
  oauth: OAuthProviderConfig;
  ui: ProviderUIConfig;
}

// API Key Provider
interface ApiKeyProviderFullConfig {
  provider: Provider;
  name: string;
  description: string;
  icon: string;
  authType: 'API_KEY';
  apiKey: ApiKeyProviderConfig;
  ui: ProviderUIConfig;
}

// Union type
type ProviderFullConfig = OAuthProviderFullConfig | ApiKeyProviderFullConfig;
```

## Usage Examples

### OAuth Provider (Google)

```typescript
export const GOOGLE_CONFIG = {
  provider: 'GOOGLE' as Provider,
  name: 'Google',
  description: 'Connect your Google account',
  icon: 'https://www.google.com/favicon.ico',
  authType: 'oauth' as CredentialType,
  
  oauth: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: {
      gmail: ['https://www.googleapis.com/auth/gmail.send'],
      sheets: ['https://www.googleapis.com/auth/spreadsheets'],
    },
    defaultScopes: [
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  } satisfies OAuthProviderConfig,  // Type-checked!

  ui: {
    setupInstructions: 'Click to connect your Google account.',
    connectionTestAvailable: true,
    
    logo: {
      url: 'https://www.google.com/favicon.ico',
      alt: 'Google',
    },
    
    helpLinks: [
      {
        label: 'Google Cloud Console',
        url: 'https://console.cloud.google.com/',
      },
    ],
    
    scopeSelection: {
      enabled: true,
      categories: [
        {
          id: 'profile',
          label: 'Profile',
          description: 'Basic profile information',
          scopes: ['https://www.googleapis.com/auth/userinfo.email'],
          required: true,
        },
        {
          id: 'gmail',
          label: 'Gmail',
          description: 'Send and read emails',
          scopes: ['https://www.googleapis.com/auth/gmail.send'],
        },
      ],
    },
  } satisfies ProviderUIConfig,  // Type-checked!
} as const;
```

### API Key Provider (Firecrawl)

```typescript
export const FIRECRAWL_CONFIG = {
  provider: 'FIRECRAWL' as Provider,
  name: 'Firecrawl',
  description: 'Web scraping service',
  icon: 'https://firecrawl.dev/favicon.ico',
  authType: 'API_KEY' as CredentialType,
  
  apiKey: {
    baseUrl: 'https://api.firecrawl.dev/v1',
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    fields: [
      {
        name: 'apiKey',
        label: 'API Key',
        type: 'password',
        placeholder: 'fc-xxxxxxxxxxxxxxxx',
        description: 'Your Firecrawl API key',
      },
    ],
  } satisfies ApiKeyProviderConfig,  // Type-checked!

  ui: {
    setupInstructions: 'Enter your Firecrawl API key.',
    connectionTestAvailable: true,
    
    logo: {
      url: 'https://firecrawl.dev/favicon.ico',
      alt: 'Firecrawl',
    },
    
    helpLinks: [
      {
        label: 'Get API Key',
        url: 'https://firecrawl.dev/app',
      },
    ],
    
    notices: [
      {
        type: 'info',
        message: 'API keys start with "fc-" followed by 32 characters.',
      },
    ],
    
    validation: {
      testEndpoint: '/scrape',
      testMethod: 'POST',
      successIndicator: 'success',
    },
  } satisfies ProviderUIConfig,  // Type-checked!
} as const;
```

## Benefits

### Type Safety

Using `satisfies` ensures:
- ✅ You can't add fields that don't exist in the type
- ✅ You must include all required fields
- ✅ Field types are validated (e.g., `type` must be 'text' | 'password' | 'url')
- ✅ Autocomplete works in your IDE

### Example Error Caught

```typescript
ui: {
  setupInstructions: 'Connect your account',
  connectionTestAvailable: true,
  requiredFields: [],  // ❌ Error: 'requiredFields' doesn't exist on ProviderUIConfig
}
```

### Accessing Config in Frontend

```typescript
import { getProviderRegistryConfig } from '@duramation/integrations';

const config = getProviderRegistryConfig('GOOGLE');

// TypeScript knows the shape based on authType
if (config.authType === 'OAUTH') {
  // config.oauth is available
  const scopes = config.oauth.defaultScopes;
} else {
  // config.apiKey is available
  const fields = config.apiKey.fields;
}

// UI config is always available
console.log(config.ui.setupInstructions);
```

## Adding New Fields

If you need to add a new UI field:

1. **Add to type definition** (`packages/integrations/src/providers/types.ts`):
```typescript
export interface ProviderUIConfig {
  setupInstructions: string;
  connectionTestAvailable: boolean;
  newField: string;  // Add your new field
}
```

2. **Update all provider configs** to include the new field (TypeScript will error if you forget)

3. **Implement UI logic** to render the new field

This ensures you never have config fields without corresponding UI implementation.
