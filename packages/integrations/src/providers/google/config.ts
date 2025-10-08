import { Provider } from '../../types/providers.js';
import type { ProviderUIConfig, OAuthProviderConfig } from '../types.js';

export const GOOGLE_CONFIG = {
  provider: 'GOOGLE' as Provider,
  name: 'Google',
  displayName: 'Google',
  description: 'Connect your Google account to access Gmail, Sheets, Calendar, and more',
  icon: 'https://www.google.com/favicon.ico',
  authType: 'OAUTH' as const,
  
  oauth: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: {
      gmail: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.modify',
      ],
      sheets: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.readonly',
      ],
      calendar: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ],
      drive: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
      ],
    },
    defaultScopes: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  } satisfies OAuthProviderConfig,

  ui: {
    setupInstructions: 'Click the button below to connect your Google account. You will be redirected to Google to authorize access.',
    connectionTestAvailable: true,
  } satisfies ProviderUIConfig,
} as const;
