import got, { Got, Options, Response, BeforeRequestHook, AfterResponseHook, BeforeErrorHook } from 'got';
import type { Provider } from '../types/providers.js';
import type { CredentialSecret } from '@duramation/shared/types';

export interface HttpClientConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  hooks?: {
    beforeRequest?: BeforeRequestHook[];
    afterResponse?: AfterResponseHook[];
    beforeError?: BeforeErrorHook[];
  };
}

export interface AuthenticatedHttpClientConfig extends HttpClientConfig {
  provider: Provider;
  credentials: CredentialSecret;
}

/**
 * Base HTTP client factory using Got
 */
export function createHttpClient(config: HttpClientConfig = {}): Got {
  const {
    baseUrl,
    timeout = 30000,
    retries = 3,
    headers = {},
    hooks = {}
  } = config;

  return got.extend({
    prefixUrl: baseUrl,
    timeout: {
      request: timeout
    },
    retry: {
      limit: retries,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      statusCodes: [408, 413, 429, 500, 502, 503, 504, 521, 522, 524]
    },
    headers: {
      'User-Agent': 'Duramation/1.0',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    hooks: {
      beforeRequest: [
        (options) => {
          // Add request logging
          console.log(`[HTTP] ${options.method} ${options.url}`);
        },
        ...(hooks.beforeRequest || [])
      ],
      afterResponse: [
        (response) => {
          // Add response logging
          console.log(`[HTTP] ${response.statusCode} ${response.request.options.method} ${response.url}`);
          return response;
        },
        ...(hooks.afterResponse || [])
      ],
      beforeError: [
        (error) => {
          // Enhanced error logging
          console.error(`[HTTP Error] ${error.message}`, {
            url: error.request?.requestUrl,
            method: error.request?.options?.method,
            statusCode: error.response?.statusCode,
            body: error.response?.body
          });
          return error;
        },
        ...(hooks.beforeError || [])
      ]
    },
    responseType: 'json'
  });
}

/**
 * Create an authenticated HTTP client for a specific provider
 */
export function createAuthenticatedHttpClient(config: AuthenticatedHttpClientConfig): Got {
  const { provider, credentials, ...httpConfig } = config;
  
  // Get provider-specific authentication headers
  const authHeaders = getAuthHeaders(provider, credentials);
  
  return createHttpClient({
    ...httpConfig,
    headers: {
      ...httpConfig.headers,
      ...authHeaders
    }
  });
}

/**
 * Get authentication headers for a provider
 */
function getAuthHeaders(provider: Provider, credentials: CredentialSecret): Record<string, string> {
  switch (provider) {
    case 'GOOGLE':
      if ('accessToken' in credentials) {
        return {
          'Authorization': `Bearer ${credentials.accessToken}`
        };
      }
      break;
      
    case 'SLACK':
      if ('accessToken' in credentials) {
        return {
          'Authorization': `Bearer ${credentials.accessToken}`
        };
      }
      break;
      
    case 'MICROSOFT':
      if ('accessToken' in credentials) {
        return {
          'Authorization': `Bearer ${credentials.accessToken}`
        };
      }
      break;
      
    case 'FIRECRAWL':
      if ('apiKey' in credentials) {
        return {
          'Authorization': `Bearer ${credentials.apiKey}`
        };
      }
      break;
      
    case 'HUBSPOT':
      if ('accessToken' in credentials) {
        return {
          'Authorization': `Bearer ${credentials.accessToken}`
        };
      }
      break;
      
    default:
      // For custom providers, try to use API key or OAuth token
      if ('apiKey' in credentials) {
        return {
          'Authorization': `Bearer ${credentials.apiKey}`
        };
      } else if ('accessToken' in credentials) {
        return {
          'Authorization': `Bearer ${credentials.accessToken}`
        };
      }
  }
  
  return {};
}

/**
 * Provider-specific HTTP client factories
 */
export const providerClients = {
  google: (credentials: CredentialSecret) => createAuthenticatedHttpClient({
    provider: 'GOOGLE',
    credentials,
    baseUrl: 'https://www.googleapis.com'
  }),
  
  slack: (credentials: CredentialSecret) => createAuthenticatedHttpClient({
    provider: 'SLACK',
    credentials,
    baseUrl: 'https://slack.com/api'
  }),
  
  microsoft: (credentials: CredentialSecret) => createAuthenticatedHttpClient({
    provider: 'MICROSOFT',
    credentials,
    baseUrl: 'https://graph.microsoft.com/v1.0'
  }),
  
  firecrawl: (credentials: CredentialSecret) => createAuthenticatedHttpClient({
    provider: 'FIRECRAWL',
    credentials,
    baseUrl: 'https://api.firecrawl.dev'
  }),
  
  hubspot: (credentials: CredentialSecret) => createAuthenticatedHttpClient({
    provider: 'HUBSPOT',
    credentials,
    baseUrl: 'https://api.hubapi.com'
  })
};

/**
 * Generic HTTP client for non-authenticated requests
 */
export const httpClient = createHttpClient();

/**
 * Utility function to handle common API patterns
 */
export class ApiClient {
  constructor(private client: Got) {}
  
  async get<T = any>(url: string, options?: Partial<Options>): Promise<T> {
    const response = await this.client.get(url, options) as Response<T>;
    return response.body;
  }
  
  async post<T = any>(url: string, data?: any, options?: Partial<Options>): Promise<T> {
    const requestOptions: Partial<Options> = {
      ...options
    };
    
    // Handle different data types
    if (data !== undefined) {
      if (options?.body) {
        // If body is explicitly provided in options, use it
        requestOptions.body = options.body;
      } else if (data instanceof FormData) {
        requestOptions.body = data;
      } else {
        requestOptions.json = data;
      }
    }
    
    const response = await this.client.post(url, requestOptions) as Response<T>;
    return response.body;
  }
  
  async put<T = any>(url: string, data?: any, options?: Partial<Options>): Promise<T> {
    const requestOptions: Partial<Options> = {
      ...options
    };
    
    // Handle different data types
    if (data !== undefined) {
      if (options?.body) {
        // If body is explicitly provided in options, use it
        requestOptions.body = options.body;
      } else if (data instanceof FormData) {
        requestOptions.body = data;
      } else {
        requestOptions.json = data;
      }
    }
    
    const response = await this.client.put(url, requestOptions) as Response<T>;
    return response.body;
  }
  
  async delete<T = any>(url: string, options?: Partial<Options>): Promise<T> {
    const response = await this.client.delete(url, options) as Response<T>;
    return response.body;
  }
  
  async patch<T = any>(url: string, data?: any, options?: Partial<Options>): Promise<T> {
    const requestOptions: Partial<Options> = {
      ...options
    };
    
    // Handle different data types
    if (data !== undefined) {
      if (options?.body) {
        // If body is explicitly provided in options, use it
        requestOptions.body = options.body;
      } else if (data instanceof FormData) {
        requestOptions.body = data;
      } else {
        requestOptions.json = data;
      }
    }
    
    const response = await this.client.patch(url, requestOptions) as Response<T>;
    return response.body;
  }
}