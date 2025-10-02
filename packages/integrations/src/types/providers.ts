// import { Provider, CredentialType } from '@duramation/db/types';

type Provider = 'GOOGLE' | 'SLACK' | 'HUBSPOT' | 'FIRECRAWL' | 'CUSTOM' | 'INSTAGRAM';
type CredentialType = 'OAUTH' | 'API_KEY';

export interface ProviderField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'url' | 'select' | 'textarea' | 'number' | 'checkbox';
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  defaultValue?: string | number | boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

export interface OAuthEndpoints {
  authUrl: string;
  tokenUrl: string;
  callbackUrl: string;
  apiBaseUrl: string;
}

export interface ProviderConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  type: CredentialType;
  icon: string;
  color: string;
  bgColor: string;
  authType: 'oauth' | 'api_key';
  scopes?: string[];
  endpoints?: OAuthEndpoints;
  fields?: ProviderField[];
  documentation?: {
    setupUrl?: string;
    apiDocsUrl?: string;
  };
  category?: string;
  isBeta?: boolean;
  requiresScopes?: boolean;
}

// Enhanced PROVIDER_CONFIGS with better organization
export const PROVIDER_CONFIGS: Record<Provider, ProviderConfig> = {
  ['GOOGLE']: {
    id: 'google',
    name: 'google',
    displayName: 'Google',
    description: 'Connect to Google services like Gmail, Drive, Calendar',
    type: 'OAUTH',
    icon: 'google',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    authType: 'oauth',
    category: 'productivity',
    requiresScopes: true,
    scopes: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/calendar.readonly'
    ],
    endpoints: {
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      callbackUrl: '/api/auth/google/callback',
      apiBaseUrl: 'https://www.googleapis.com'
    },
    documentation: {
      setupUrl: 'https://console.developers.google.com/',
      apiDocsUrl: 'https://developers.google.com/identity/protocols/oauth2'
    }
  },

  ['SLACK']: {
    id: 'slack',
    name: 'slack',
    displayName: 'Slack',
    description: 'Send messages and manage Slack workspaces',
    type: 'OAUTH',
    icon: 'slack',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    authType: 'oauth',
    category: 'communication',
    requiresScopes: true,
    scopes: [
      'channels:read',
      'chat:write',
      'users:read',
      'team:read'
    ],
    endpoints: {
      authUrl: 'https://slack.com/oauth/v2/authorize',
      tokenUrl: 'https://slack.com/api/oauth.v2.access',
      callbackUrl: '/api/auth/slack/callback',
      apiBaseUrl: 'https://slack.com/api'
    },
    documentation: {
      setupUrl: 'https://api.slack.com/apps',
      apiDocsUrl: 'https://api.slack.com/authentication/oauth-v2'
    }
  },

  ["HUBSPOT"]: {
    id: 'hubspot',
    name: 'hubspot',
    displayName: 'HubSpot',
    description: 'Manage contacts, deals, and CRM data',
    type: 'OAUTH',
    icon: 'hubspot',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    authType: 'oauth',
    category: 'crm',
    requiresScopes: true,
    scopes: [
      'contacts',
      'content',
      'reports',
      'social',
      'automation',
      'timeline',
      'business-intelligence',
      'forms',
      'files',
      'hubdb',
      'integration-sync',
      'tickets',
      'e-commerce'
    ],
    endpoints: {
      authUrl: 'https://app.hubspot.com/oauth/authorize',
      tokenUrl: 'https://api.hubapi.com/oauth/v1/token',
      callbackUrl: '/api/auth/hubspot/callback',
      apiBaseUrl: 'https://api.hubapi.com'
    },
    documentation: {
      setupUrl: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      apiDocsUrl: 'https://developers.hubspot.com/docs/api/oauth-quickstart-guide'
    }
  },

  ['FIRECRAWL']: {
    id: 'firecrawl',
    name: 'firecrawl',
    displayName: 'Firecrawl',
    description: 'Web scraping and data extraction',
    type: 'API_KEY',
    icon: 'firecrawl',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    authType: 'api_key',
    category: 'development',
    fields: [
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: true,
        placeholder: 'fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        description: 'Your Firecrawl API key from the dashboard',
        validation: {
          pattern: '^fc-[a-zA-Z0-9]{32}$',
          minLength: 35,
          maxLength: 35
        }
      },
      {
        key: 'baseUrl',
        label: 'Base URL',
        type: 'url',
        required: false,
        placeholder: 'https://api.firecrawl.dev',
        description: 'Custom base URL for self-hosted instances (optional)',
        defaultValue: 'https://api.firecrawl.dev'
      }
    ],
    endpoints: {
      authUrl: '',
      tokenUrl: '',
      callbackUrl: '',
      apiBaseUrl: 'https://api.firecrawl.dev'
    },
    documentation: {
      setupUrl: 'https://firecrawl.dev/app',
      apiDocsUrl: 'https://docs.firecrawl.dev/api-reference/introduction'
    }
  },

  ['CUSTOM']: {
    id: 'custom',
    name: 'custom',
    displayName: 'Custom API',
    description: 'Connect to custom APIs and services',
    type: 'API_KEY',
    icon: 'custom',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    authType: 'api_key',
    category: 'development',
    fields: [
      {
        key: 'name',
        label: 'API Name',
        type: 'text',
        required: true,
        placeholder: 'My Custom API',
        description: 'A descriptive name for this API connection'
      },
      {
        key: 'baseUrl',
        label: 'Base URL',
        type: 'url',
        required: true,
        placeholder: 'https://api.example.com',
        description: 'The base URL for your API'
      },
      {
        key: 'apiKey',
        label: 'API Key',
        type: 'password',
        required: false,
        placeholder: 'Your API key',
        description: 'API key for authentication (if required)'
      },
      {
        key: 'authHeader',
        label: 'Authorization Header',
        type: 'select',
        required: false,
        options: ['Authorization', 'X-API-Key', 'X-Auth-Token', 'Custom'],
        description: 'Header name for API key authentication',
        defaultValue: 'Authorization'
      },
      {
        key: 'customHeaders',
        label: 'Custom Headers',
        type: 'textarea',
        required: false,
        placeholder: '{"X-Custom-Header": "value"}',
        description: 'Additional headers as JSON object (optional)'
      }
    ],
    endpoints: {
      authUrl: '',
      tokenUrl: '',
      callbackUrl: '',
      apiBaseUrl: ''
    },
    documentation: {
      setupUrl: 'https://docs.duramation.com/custom-apis',
      apiDocsUrl: 'https://docs.duramation.com/api-reference'
    }
  },
  
  // Instagram Business API integration
  ['INSTAGRAM']: {
    id: 'instagram',
    name: 'instagram',
    displayName: 'Instagram Business',
    description: 'Connect to Instagram Business API for social media management',
    type: 'OAUTH',
    icon: 'instagram',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    authType: 'oauth',
    category: 'social',
    requiresScopes: true,
    scopes: [
      'instagram_basic',
      'instagram_manage_insights',
      'pages_manage_engagement'
    ],
    endpoints: {
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
      callbackUrl: '/api/auth/instagram/callback',
      apiBaseUrl: 'https://graph.facebook.com/v18.0'
    },
    documentation: {
      setupUrl: 'https://developers.facebook.com/apps/',
      apiDocsUrl: 'https://developers.facebook.com/docs/instagram-api'
    }
  }
};

// Export the types
export type { Provider, CredentialType };

// Utility functions for working with provider configs
export const getProviderConfig = (provider: Provider): ProviderConfig => {
  const config = PROVIDER_CONFIGS[provider];
  if (!config) {
    throw new Error(`Provider configuration not found for: ${provider}`);
  }
  return config;
};

export const isOAuthProvider = (provider: Provider): boolean => {
  return getProviderConfig(provider).authType === 'oauth';
};

export const isApiKeyProvider = (provider: Provider): boolean => {
  return getProviderConfig(provider).authType === 'api_key';
};


export const getProviderFields = (provider: Provider): ProviderField[] => {
  return getProviderConfig(provider).fields || [];
};

export const getProviderEndpoints = (provider: Provider): OAuthEndpoints | undefined => {
  return getProviderConfig(provider).endpoints;
};

export const getProviderScopes = (provider: Provider): string[] => {
  return getProviderConfig(provider).scopes || [];
};

export const getProviderDocumentation = (provider: Provider) => {
  return getProviderConfig(provider).documentation || {};
};

export const getProviderCategory = (provider: Provider): string | undefined => {
  return getProviderConfig(provider).category;
};

export const getAllProviders = (): Provider[] => {
  return Object.keys(PROVIDER_CONFIGS) as Provider[];
};

export const getProvidersByCategory = (category: string): Provider[] => {
  return Object.entries(PROVIDER_CONFIGS)
    .filter(([_, config]) => config.category === category)
    .map(([provider]) => provider as Provider);
};

export const getProviderCategories = (): string[] => {
  const categories = new Set<string>();
  Object.values(PROVIDER_CONFIGS).forEach(config => {
    if (config.category) {
      categories.add(config.category);
    }
  });
  return Array.from(categories);
};