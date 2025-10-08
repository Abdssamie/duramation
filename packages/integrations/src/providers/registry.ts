import { Provider } from '../types/providers.js';
import type { ProviderFullConfig } from './types.js';

// Frontend-safe provider configurations
export const PROVIDER_REGISTRY: Record<Provider, ProviderFullConfig> = {
  GOOGLE: {
    provider: 'GOOGLE',
    name: 'Google',
    displayName: 'Google',
    description: 'Connect to Google services like Gmail, Drive, Sheets, Calendar',
    icon: 'google',
    authType: 'OAUTH',
    oauth: {
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      scopes: {
        'sheets': ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        'gmail': ['https://www.googleapis.com/auth/gmail.send'],
        'drive': ['https://www.googleapis.com/auth/drive.readonly'],
        'calendar': ['https://www.googleapis.com/auth/calendar.readonly']
      },
      defaultScopes: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    },
    ui: {
      setupInstructions: 'Connect your Google account to access Gmail, Drive, Sheets, and Calendar',
      connectionTestAvailable: true
    }
  },
  SLACK: {
    provider: 'SLACK',
    name: 'Slack',
    displayName: 'Slack',
    description: 'Send messages and manage Slack workspaces',
    icon: 'slack',
    authType: 'OAUTH',
    oauth: {
      authUrl: 'https://slack.com/oauth/v2/authorize',
      tokenUrl: 'https://slack.com/api/oauth.v2.access',
      scopes: {
        'channels': ['channels:read'],
        'chat': ['chat:write'],
        'users': ['users:read'],
        'team': ['team:read']
      },
      defaultScopes: ['channels:read', 'chat:write']
    },
    ui: {
      setupInstructions: 'Connect your Slack workspace to send messages and manage channels',
      connectionTestAvailable: true
    }
  },
  FIRECRAWL: {
    provider: 'FIRECRAWL',
    name: 'Firecrawl',
    displayName: 'Firecrawl',
    description: 'Web scraping and data extraction',
    icon: 'firecrawl',
    authType: 'API_KEY',
    apiKey: {
      baseUrl: 'https://api.firecrawl.dev',
      headerName: 'Authorization',
      headerPrefix: 'Bearer',
      fields: [
        {
          name: 'apiKey',
          label: 'API Key',
          type: 'password',
          placeholder: 'fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          description: 'Your Firecrawl API key from the dashboard'
        }
      ]
    },
    ui: {
      setupInstructions: 'Get your API key from the Firecrawl dashboard',
      connectionTestAvailable: true
    }
  },
  HUBSPOT: {
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
  INSTAGRAM: {
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
  CUSTOM: {
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
  }
};



export function getAllProviders(): Provider[] {
  return Object.keys(PROVIDER_REGISTRY) as Provider[];
}

export function getAvailableProviders(): Provider[] {
  // For now, return providers that have proper configuration
  return getAllProviders().filter(provider => {
    const config = PROVIDER_REGISTRY[provider];
    return config.ui.connectionTestAvailable !== false;
  });
}
