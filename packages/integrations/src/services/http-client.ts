import got, { Got, Options, OptionsOfJSONResponseBody, Response, BeforeRequestHook, AfterResponseHook, BeforeErrorHook } from 'got';
import type { Provider } from '../types/providers.js';
import type { CredentialSecret } from '@duramation/shared/types';
import { validateCredentials } from '../validation/credential-schemas.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get package version dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let packageVersion = '1.0.0';
try {
  const packageJson = JSON.parse(
    readFileSync(join(__dirname, '../../package.json'), 'utf-8')
  );
  packageVersion = packageJson.version;
} catch {
  // Fallback to default version if package.json can't be read
}

/**
 * Configuration options for HTTP client
 */
export interface HttpClientConfig {
  /** Base URL for all requests */
  baseUrl?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Number of retry attempts (default: 3) */
  retries?: number;
  /** Custom headers to include in all requests */
  headers?: Record<string, string>;
  /** Got hooks for request/response lifecycle */
  hooks?: {
    beforeRequest?: BeforeRequestHook[];
    afterResponse?: AfterResponseHook[];
    beforeError?: BeforeErrorHook[];
  };
}

/**
 * Configuration for authenticated HTTP client
 */
export interface AuthenticatedHttpClientConfig extends HttpClientConfig {
  /** Provider type (GOOGLE, SLACK, etc.) */
  provider: Provider;
  /** Provider credentials (OAuth tokens or API keys) */
  credentials: CredentialSecret;
}

/**
 * Base HTTP client factory using Got
 * 
 * Creates a configured Got instance with:
 * - Automatic JSON parsing
 * - Retry logic for transient failures
 * - Request/response logging (when HTTP_CLIENT_LOG=1)
 * - Custom User-Agent header
 * 
 * @param config - Client configuration options
 * @returns Configured Got instance
 * 
 * @example
 * ```typescript
 * const client = createHttpClient({
 *   baseUrl: 'https://api.example.com',
 *   timeout: 5000,
 *   retries: 2
 * });
 * ```
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
      'User-Agent': `Duramation/${packageVersion}`,
      'Accept': 'application/json',
      ...headers
    },
    hooks: {
      beforeRequest: [
        (options) => {
          // Optional request logging (enable with HTTP_CLIENT_LOG=1)
          if (process.env.HTTP_CLIENT_LOG === '1') {
            const url = String(options.url ?? '');
            // Strip query params to avoid logging sensitive data
            console.log(`[HTTP] ${options.method} ${url.split('?')[0]}`);
          }
        },
        ...(hooks.beforeRequest || [])
      ],
      afterResponse: [
        (response) => {
          // Optional response logging (enable with HTTP_CLIENT_LOG=1)
          if (process.env.HTTP_CLIENT_LOG === '1') {
            console.log(`[HTTP] ${response.statusCode} ${response.request.options.method} ${response.request.requestUrl}`);
          }
          return response;
        },
        ...(hooks.afterResponse || [])
      ],
      beforeError: [
        (error) => {
          // Log minimal metadata to avoid leaking sensitive data
          const metadata: Record<string, any> = {};
          if (error.request) {
            metadata.url = error.request.requestUrl;
            metadata.method = error.request.options?.method;
          }
          if (error.response) {
            metadata.statusCode = error.response.statusCode;
          }
          console.error(`[HTTP Error] ${error.message}`, metadata);
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
 * @throws {z.ZodError} If credentials are invalid
 */
export function createAuthenticatedHttpClient(config: AuthenticatedHttpClientConfig): Got {
  const { provider, credentials, ...httpConfig } = config;
  
  // Validate credentials before creating client
  validateCredentials(provider, credentials);
  
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
 * 
 * Pre-configured clients for each supported provider with:
 * - Correct base URL
 * - Authentication headers
 * - Provider-specific defaults
 * 
 * @example
 * ```typescript
 * // Google Sheets API
 * const googleClient = providerClients.google({ accessToken: 'token' });
 * const sheets = await googleClient.get('sheets/v4/spreadsheets/ID').json();
 * 
 * // Slack API
 * const slackClient = providerClients.slack({ accessToken: 'xoxb-token' });
 * await slackClient.post('api/chat.postMessage', { 
 *   json: { channel: 'general', text: 'Hello!' }
 * });
 * ```
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
 * Utility class for common API request patterns
 * 
 * Provides convenient methods for HTTP operations with automatic
 * JSON handling and response body extraction.
 * 
 * @example
 * ```typescript
 * const api = new ApiClient(createHttpClient({ baseUrl: 'https://api.example.com' }));
 * 
 * // GET request
 * const user = await api.get('users/123');
 * 
 * // POST request
 * const newUser = await api.post('users', { name: 'John', email: 'john@example.com' });
 * 
 * // PUT request
 * const updated = await api.put('users/123', { name: 'Jane' });
 * 
 * // DELETE request
 * await api.delete('users/123');
 * ```
 */
export class ApiClient {
  constructor(private client: Got) {}
  
  /**
   * Perform GET request
   * @param url - Request URL (relative to baseUrl if configured)
   * @param options - Got request options
   * @returns Response body
   */
  async get<T = any>(url: string, options?: Partial<Options>): Promise<T> {
    const response = await this.client.get(url, options) as Response<T>;
    return response.body;
  }
  
  /**
   * Perform POST request
   * @param url - Request URL
   * @param data - Request body (will be JSON stringified)
   * @param options - Got request options
   * @returns Response body
   */
  async post<T = any>(url: string, data?: any, options?: Partial<OptionsOfJSONResponseBody>): Promise<T> {
    const requestOptions: Partial<OptionsOfJSONResponseBody> = {
      ...options
    };
    
    if (data !== undefined) {
      if (options?.body) {
        requestOptions.body = options.body;
      } else {
        requestOptions.json = data;
      }
    }
    
    const response = await this.client.post(url, requestOptions) as Response<T>;
    return response.body;
  }
  
  /**
   * Perform PUT request
   * @param url - Request URL
   * @param data - Request body (will be JSON stringified)
   * @param options - Got request options
   * @returns Response body
   */
  async put<T = any>(url: string, data?: any, options?: Partial<OptionsOfJSONResponseBody>): Promise<T> {
    const requestOptions: Partial<OptionsOfJSONResponseBody> = {
      ...options
    };
    
    if (data !== undefined) {
      if (options?.body) {
        requestOptions.body = options.body;
      } else {
        requestOptions.json = data;
      }
    }
    
    const response = await this.client.put(url, requestOptions) as Response<T>;
    return response.body;
  }
  
  /**
   * Perform DELETE request
   * @param url - Request URL
   * @param options - Got request options
   * @returns Response body
   */
  async delete<T = any>(url: string, options?: Partial<Options>): Promise<T> {
    const response = await this.client.delete(url, options) as Response<T>;
    return response.body;
  }
  
  /**
   * Perform PATCH request
   * @param url - Request URL
   * @param data - Request body (will be JSON stringified)
   * @param options - Got request options
   * @returns Response body
   */
  async patch<T = any>(url: string, data?: any, options?: Partial<OptionsOfJSONResponseBody>): Promise<T> {
    const requestOptions: Partial<OptionsOfJSONResponseBody> = {
      ...options
    };
    
    if (data !== undefined) {
      if (options?.body) {
        requestOptions.body = options.body;
      } else {
        requestOptions.json = data;
      }
    }
    
    const response = await this.client.patch(url, requestOptions) as Response<T>;
    return response.body;
  }
}

/**
 * Default API client instance for convenience
 */
export const api = new ApiClient(httpClient);
