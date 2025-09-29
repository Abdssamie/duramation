import { Provider, CredentialType } from '@duramation/db/types';


export interface ProviderField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'url' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}


export interface ProviderConfig {
  name: string;
  displayName: string;
  description: string;
  type: CredentialType;
  icon: string;
  color: string;
  bgColor: string;
  authType: 'oauth' | 'api_key' | 'custom';
  scopes?: string[];
  endpoints?: {
    auth?: string;
    token?: string;
    validate?: string;
    revoke?: string;
  };
  fields?: ProviderField[];
  documentation?: {
    setupUrl?: string;
    apiDocsUrl?: string;
  };
}

export const PROVIDER_CONFIGS: Record<Provider, ProviderConfig> = {
  ['GOOGLE']: {
    name: 'google',
    displayName: 'Google',
    description: 'Connect to Google services like Gmail, Drive, Calendar',
    type: 'OAUTH',
    icon: 'google',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    authType: 'oauth',
    scopes: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/calendar.readonly'
    ],
  },

  ['SLACK']: {
    name: 'slack',
    displayName: 'Slack',
    description: 'Send messages and manage Slack workspaces',
    type: 'OAUTH',
    icon: 'slack',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    authType: 'oauth',
    scopes: [
      'channels:read',
      'chat:write',
      'users:read',
      'team:read'
    ],
    endpoints: {
      auth: 'https://slack.com/oauth/v2/authorize',
      token: 'https://slack.com/api/oauth.v2.access',
      validate: 'https://slack.com/api/auth.test',
      revoke: 'https://slack.com/api/auth.revoke'
    },
    documentation: {
      setupUrl: 'https://api.slack.com/apps',
      apiDocsUrl: 'https://api.slack.com/authentication/oauth-v2'
    }
  },

  ["HUBSPOT"]: {
    name: 'hubspot',
    displayName: 'HubSpot',
    description: 'Manage contacts, deals, and CRM data',
    type: 'OAUTH',
    icon: 'hubspot',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    authType: 'oauth',
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
      auth: 'https://app.hubspot.com/oauth/authorize',
      token: 'https://api.hubapi.com/oauth/v1/token',
      validate: 'https://api.hubapi.com/oauth/v1/access-tokens',
      revoke: 'https://api.hubapi.com/oauth/v1/refresh-tokens'
    },
    documentation: {
      setupUrl: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      apiDocsUrl: 'https://developers.hubspot.com/docs/api/oauth-quickstart-guide'
    }
  },

  ['FIRECRAWL']: {
    name: 'firecrawl',
    displayName: 'Firecrawl',
    description: 'Web scraping and data extraction',
    type: 'API_KEY',
    icon: 'firecrawl',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    authType: 'api_key',
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
        description: 'Custom base URL for self-hosted instances (optional)'
      }
    ],
    endpoints: {
      validate: 'https://api.firecrawl.dev/v0/crawl/status'
    },
    documentation: {
      setupUrl: 'https://firecrawl.dev/app',
      apiDocsUrl: 'https://docs.firecrawl.dev/api-reference/introduction'
    }
  },

  ['CUSTOM']: {
    name: 'custom',
    displayName: 'Custom API',
    description: 'Connect to custom APIs and services',
    type: 'API_KEY',
    icon: 'custom',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    authType: 'custom',
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
        description: 'Header name for API key authentication'
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
    documentation: {
      setupUrl: 'https://docs.duramation.com/custom-apis',
      apiDocsUrl: 'https://docs.duramation.com/api-reference'
    }
  }
};
