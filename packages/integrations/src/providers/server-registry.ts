import { Provider } from '../types/providers.js';
import type { ProviderFullConfig } from './types.js';
import * as Google from './google/index.js';
import * as Slack from './slack/index.js';
import * as Microsoft from './microsoft/index.js';
import * as Firecrawl from './firecrawl/index.js';

// Server-side registry with auth handlers (Node.js dependencies)
export interface ServerProviderRegistryEntry {
  config: ProviderFullConfig;
  authHandler: any;
}

export const SERVER_PROVIDER_REGISTRY: Record<Provider, ServerProviderRegistryEntry> = {
  GOOGLE: {
    config: Google.GOOGLE_CONFIG,
    authHandler: Google.GoogleAuthHandler,
  },
  SLACK: {
    config: Slack.SLACK_CONFIG,
    authHandler: Slack.SlackAuthHandler,
  },
  MICROSOFT: {
    config: Microsoft.MICROSOFT_CONFIG,
    authHandler: Microsoft.MicrosoftAuthHandler,
  },
  FIRECRAWL: {
    config: Firecrawl.FIRECRAWL_CONFIG,
    authHandler: Firecrawl.FirecrawlAuthHandler,
  },
  HUBSPOT: {
    config: {
      provider: 'HUBSPOT',
      name: 'HubSpot',
      displayName: 'HubSpot',
      description: 'Connect HubSpot CRM',
      icon: 'hubspot',
      authType: 'OAUTH',
      oauth: {
        authUrl: 'https://app.hubspot.com/oauth/authorize',
        tokenUrl: 'https://api.hubapi.com/oauth/v1/token',
        scopes: {
          'contacts': ['contacts'],
          'deals': ['content'],
          'reports': ['reports']
        },
        defaultScopes: ['contacts']
      },
      ui: {
        setupInstructions: 'Coming soon',
        connectionTestAvailable: false
      }
    },
    authHandler: null,
  },
  INSTAGRAM: {
    config: {
      provider: 'INSTAGRAM',
      name: 'Instagram',
      displayName: 'Instagram',
      description: 'Connect Instagram Business',
      icon: 'instagram',
      authType: 'OAUTH',
      oauth: {
        authUrl: '',
        tokenUrl: '',
        scopes: {},
        defaultScopes: []
      },
      ui: {
        setupInstructions: 'Coming soon',
        connectionTestAvailable: false
      }
    },
    authHandler: null,
  },
  CUSTOM: {
    config: {
      provider: 'CUSTOM',
      name: 'Custom',
      displayName: 'Custom',
      description: 'Custom integration',
      icon: 'custom',
      authType: 'API_KEY',
      apiKey: {
        baseUrl: '',
        headerName: 'Authorization',
        headerPrefix: 'Bearer',
        fields: [
          {
            name: 'apiKey',
            label: 'API Key',
            type: 'password',
            placeholder: 'Your API key',
            description: 'API key for authentication'
          }
        ]
      },
      ui: {
        setupInstructions: 'Custom integration',
        connectionTestAvailable: false
      }
    },
    authHandler: null,
  },
};

export function getServerProviderConfig(provider: Provider): ProviderFullConfig {
  return SERVER_PROVIDER_REGISTRY[provider].config;
}

export function getAuthHandler(provider: Provider) {
  return SERVER_PROVIDER_REGISTRY[provider].authHandler;
}

export function getAllProvidersFromServerRegistry(): Provider[] {
  return Object.keys(SERVER_PROVIDER_REGISTRY) as Provider[];
}

export function getAvailableProvidersFromServerRegistry(): Provider[] {
  return getAllProvidersFromServerRegistry().filter(
    provider => SERVER_PROVIDER_REGISTRY[provider].authHandler !== null
  );
}