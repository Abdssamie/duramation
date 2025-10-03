import { Provider } from '../../types/providers.js';
import type { ProviderUIConfig, ApiKeyProviderConfig } from '../types.js';

export const FIRECRAWL_CONFIG = {
  provider: 'FIRECRAWL' as Provider,
  name: 'Firecrawl',
  description: 'Connect Firecrawl to scrape and crawl websites',
  icon: 'https://firecrawl.dev/favicon.ico',
  authType: 'API_KEY' as const,

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
        description: 'Your Firecrawl API key from the dashboard',
      },
    ],
  } satisfies ApiKeyProviderConfig,

  ui: {
    setupInstructions: 'Enter your Firecrawl API key. You can find it in your Firecrawl dashboard.',
    connectionTestAvailable: true,
  } satisfies ProviderUIConfig,
} as const;
