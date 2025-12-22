import { Provider, CredentialType } from '../../types/providers.js';
import type { ProviderUIConfig, OAuthProviderConfig } from '../types.js';

export const SLACK_CONFIG = {
  provider: 'SLACK' as Provider,
  name: 'Slack',
  displayName: 'Slack',
  description: 'Connect your Slack workspace to send messages, manage channels, and more',
  icon: 'https://slack.com/favicon.ico',
  authType: 'OAUTH' as const,
  
  oauth: {
    authUrl: 'https://slack.com/oauth/v2/authorize',
    tokenUrl: 'https://slack.com/api/oauth.v2.access',
    scopes: {
      bot: [
        'chat:write',
        'chat:write.public',
        'channels:read',
        'channels:manage',
        'users:read',
        'users:read.email',
      ],
      user: [
        'channels:read',
        'channels:write',
        'chat:write',
      ],
    },
    defaultScopes: ['chat:write', 'channels:read'],
  } satisfies OAuthProviderConfig,

  ui: {
    setupInstructions: 'Click the button below to connect your Slack workspace. You will be redirected to Slack to authorize access.',
    connectionTestAvailable: true,
  } satisfies ProviderUIConfig,
} as const;
