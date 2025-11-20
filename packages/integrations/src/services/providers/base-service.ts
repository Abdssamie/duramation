import { ApiClient, providerClients } from '../http-client.js';
import type { CredentialSecret } from '@duramation/shared/types';
import type { Provider } from '../../types/providers.js';
import { GoogleAuthHandler } from '../../providers/google/auth.js';
import { MicrosoftAuthHandler } from '../../providers/microsoft/auth.js';

export abstract class BaseProviderService {
  protected client: ApiClient;
  protected provider: Provider;
  protected credentials: CredentialSecret;

  constructor(provider: Provider, credentials: CredentialSecret) {
    this.provider = provider;
    this.credentials = credentials;
    this.client = this.createClient();
  }

  protected abstract createClient(): ApiClient;

  protected async refreshAccessToken(): Promise<string | null> {
    const refreshToken = (this.credentials as any).refreshToken;
    if (!refreshToken) return null;

    try {
      let result: { accessToken: string; expiresIn: number } | null = null;

      switch (this.provider) {
        case 'GOOGLE':
          result = await GoogleAuthHandler.refreshToken(refreshToken);
          break;
        case 'MICROSOFT':
          result = await MicrosoftAuthHandler.refreshToken(refreshToken);
          break;
        default:
          return null;
      }

      if (result) {
        // Update credentials in memory
        (this.credentials as any).accessToken = result.accessToken;
        (this.credentials as any).expiresIn = result.expiresIn;
        
        // Recreate client with new token
        this.client = this.createClient();
        
        return result.accessToken;
      }
    } catch (error) {
      console.error(`[${this.provider}] Token refresh failed:`, error);
    }

    return null;
  }

  protected async executeWithRefresh<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      // If 401, try to refresh and retry once
      if (error.response?.statusCode === 401) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          return await fn();
        }
      }
      throw error;
    }
  }
}
