import { Provider } from '@duramation/db/types';

// Minimal UI Metadata Only
export interface ProviderMetadata {
  displayName: string;
  description: string;
  colors: {
    bgColor: string;
    color: string;
  };
}

// We only keep display info. Auth logic and fields are delegated to Nango.
const PROVIDER_METADATA: Record<Provider, ProviderMetadata> = {
  google_mail: {
    displayName: 'Google Mail',
    description: 'Connect to your Google account for Gmail access.',
    colors: {
      bgColor: 'bg-red-500',
      color: 'text-white',
    },
  },
  google_calendar: {
    displayName: 'Google Calendar',
    description: 'Connect to your Google Calendar.',
    colors: {
      bgColor: 'bg-blue-500',
      color: 'text-white',
    },
  },
  google_sheets: {
    displayName: 'Google Sheets',
    description: 'Connect to Google Sheets for spreadsheet automation.',
    colors: {
      bgColor: 'bg-green-600',
      color: 'text-white',
    },
  },
  slack: {
    displayName: 'Slack',
    description: 'Integrate with Slack to send messages and manage channels.',
    colors: {
      bgColor: 'bg-purple-700',
      color: 'text-white',
    },
  },
  microsoft_mail: {
    displayName: 'Microsoft Mail',
    description: 'Connect your Microsoft Outlook email.',
    colors: {
      bgColor: 'bg-blue-600',
      color: 'text-white',
    },
  },
  microsoft_calendar: {
    displayName: 'Microsoft Calendar',
    description: 'Connect your Microsoft Outlook calendar.',
    colors: {
      bgColor: 'bg-blue-500',
      color: 'text-white',
    },
  },
  hubspot: {
    displayName: 'HubSpot',
    description: 'Automate CRM tasks in HubSpot.',
    colors: {
      bgColor: 'bg-orange-500',
      color: 'text-white',
    },
  },
  firecrawl: {
    displayName: 'Firecrawl',
    description: 'Web scraping and content extraction.',
    colors: {
      bgColor: 'bg-red-600',
      color: 'text-white',
    },
  },
  instagram: {
    displayName: 'Instagram',
    description: 'Connect your Instagram account.',
    colors: {
      bgColor: 'bg-pink-600',
      color: 'text-white',
    },
  },
  custom_api: {
    displayName: 'Custom API',
    description: 'Integrate with any custom API.',
    colors: {
      bgColor: 'bg-gray-600',
      color: 'text-white',
    },
  },
};

export function getProviderMetadata(provider: Provider): ProviderMetadata {
  const metadata = PROVIDER_METADATA[provider];
  if (!metadata) {
    // Fallback for unknown providers
    return {
      displayName: provider,
      description: 'External Integration',
      colors: { bgColor: 'bg-gray-500', color: 'text-white' }
    };
  }
  return metadata;
}

export function getProviderDisplayName(provider: Provider): string {
  return getProviderMetadata(provider).displayName;
}

export function getProviderColors(provider: Provider): { bgColor: string; color: string } {
  return getProviderMetadata(provider).colors;
}

// Deprecated helpers - kept temporarily to avoid breaking imports immediately, 
// but implementation is now "always true" or "empty" because Nango handles everything.
export function isOAuthProvider(provider: Provider): boolean {
  // For Nango, everything uses the "Connect" flow, so we treat everything like OAuth in the UI
  return true; 
}

export function getProviderFields(provider: Provider): any[] {
  // Nango handles fields in its UI
  return [];
}

// Legacy alias
export const getProviderConfig = getProviderMetadata;
