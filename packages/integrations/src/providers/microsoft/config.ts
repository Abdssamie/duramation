import { Provider } from '../../types/providers.js';
import type { ProviderUIConfig, OAuthProviderConfig } from '../types.js';

export const MICROSOFT_CONFIG = {
  provider: 'MICROSOFT' as Provider,
  name: 'Microsoft',
  displayName: 'Microsoft',
  description: 'Connect your Microsoft account to access Outlook, OneDrive, Calendar, and more',
  icon: 'https://www.microsoft.com/favicon.ico',
  authType: 'OAUTH' as const,
  
  oauth: {
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scopes: {
      mail: [
        'https://graph.microsoft.com/Mail.Read',
        'https://graph.microsoft.com/Mail.Send',
        'https://graph.microsoft.com/Mail.ReadWrite',
      ],
      calendar: [
        'https://graph.microsoft.com/Calendars.Read',
        'https://graph.microsoft.com/Calendars.ReadWrite',
      ],
      onedrive: [
        'https://graph.microsoft.com/Files.Read',
        'https://graph.microsoft.com/Files.ReadWrite',
      ],
      contacts: [
        'https://graph.microsoft.com/Contacts.Read',
        'https://graph.microsoft.com/Contacts.ReadWrite',
      ],
    },
    defaultScopes: [
      'https://graph.microsoft.com/User.Read',
      'offline_access',
    ],
  } satisfies OAuthProviderConfig,

  ui: {
    setupInstructions: 'Click the button below to connect your Microsoft account. You will be redirected to Microsoft to authorize access.',
    connectionTestAvailable: true,
  } satisfies ProviderUIConfig,
} as const;
