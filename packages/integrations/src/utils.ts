import { Provider } from '@duramation/db/types';

/**
 * @interface ProviderMetadata
 * @description Defines the minimal UI metadata for an integration provider.
 * This information is used for display purposes in the frontend.
 * @property {string} displayName - The human-readable name of the provider (e.g., "Google Mail").
 * @property {string} description - A brief description of what the provider integration offers.
 * @property {object} colors - Color scheme for UI representation.
 * @property {string} colors.bgColor - Tailwind CSS class for background color.
 * @property {string} colors.color - Tailwind CSS class for text color.
 */
export interface ProviderMetadata {
  displayName: string;
  description: string;
  colors: {
    bgColor: string;
    color: string;
  };
}

/**
 * @constant {Record<Provider, ProviderMetadata>} PROVIDER_METADATA
 * @description A record containing UI metadata for each supported integration provider.
 * This data is used to render provider-specific information in the UI (e.g., logos, descriptions).
 * Authentication logic and field management are delegated to Nango, so this only stores display info.
 */
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

/**
 * @function getProviderMetadata
 * @description Retrieves the UI metadata for a given integration provider.
 * If the provider is unknown, it returns a generic fallback metadata.
 * @param {Provider} provider - The provider ID (e.g., `Provider.google_mail`).
 * @returns {ProviderMetadata} The metadata object for the specified provider.
 */
export function getProviderMetadata(provider: Provider): ProviderMetadata {
  const metadata = PROVIDER_METADATA[provider];
  if (!metadata) {
    // Fallback for unknown providers to prevent UI breaks
    return {
      displayName: provider,
      description: 'External Integration', // Generic description
      colors: { bgColor: 'bg-gray-500', color: 'text-white' } // Default colors
    };
  }
  return metadata;
}

/**
 * @function getProviderDisplayName
 * @description Retrieves the human-readable display name for a given integration provider.
 * @param {Provider} provider - The provider ID.
 * @returns {string} The display name of the provider.
 */
export function getProviderDisplayName(provider: Provider): string {
  return getProviderMetadata(provider).displayName;
}

/**
 * @function getProviderColors
 * @description Retrieves the color scheme for a given integration provider, used for UI styling.
 * @param {Provider} provider - The provider ID.
 * @returns {{bgColor: string; color: string}} An object containing background and text color Tailwind CSS classes.
 */
export function getProviderColors(provider: Provider): { bgColor: string; color: string } {
  return getProviderMetadata(provider).colors;
}

/**
 * @deprecated This helper is no longer strictly necessary as Nango handles all authentication flows uniformly.
 * For Nango-based integrations, all providers are essentially treated as "OAuth" in terms of UI flow.
 * @function isOAuthProvider
 * @description Determines if a provider uses an OAuth authentication flow.
 * (Note: With Nango, most external integrations leverage a unified "Connect" flow, rendering this
 * always true for Nango-managed providers in the UI context.)
 * @param {Provider} provider - The provider ID.
 * @returns {boolean} Always returns `true` for Nango-managed providers.
 */
export function isOAuthProvider(provider: Provider): boolean {
  // For Nango, everything uses the "Connect" flow, so we treat everything like OAuth in the UI
  return true; 
}

/**
 * @deprecated This helper is no longer necessary as Nango handles the UI for collecting provider-specific fields.
 * @function getProviderFields
 * @description Retrieves provider-specific configuration fields.
 * (Note: Nango typically handles the collection of necessary fields through its own UI,
 * making this function return an empty array.)
 * @param {Provider} provider - The provider ID.
 * @returns {any[]} An empty array, as Nango manages provider fields.
 */
export function getProviderFields(provider: Provider): any[] {
  // Nango handles fields in its UI
  return [];
}

/**
 * @deprecated Use `getProviderMetadata` instead for clarity and specificity.
 * @alias getProviderMetadata
 * @description Legacy alias for `getProviderMetadata`.
 */
export const getProviderConfig = getProviderMetadata;
