import type { CredentialSecret } from '@duramation/shared/types';
import type { Provider } from '../../types/providers.js';
import { GoogleService } from './google-service.js';
import { SlackService } from './slack-service.js';
import { MicrosoftService } from './microsoft-service.js';
import { FirecrawlService } from './firecrawl-service.js';

// Export all service classes
export { GoogleService } from './google-service.js';
export { SlackService } from './slack-service.js';
export { MicrosoftService } from './microsoft-service.js';
export { FirecrawlService } from './firecrawl-service.js';

// Export all types
export type * from './google-service.js';
export type * from './slack-service.js';
export type * from './microsoft-service.js';
export type * from './firecrawl-service.js';

/**
 * Service factory for creating provider-specific service instances
 */
export class ProviderServiceFactory {
  static createService(provider: Provider, credentials: CredentialSecret) {
    switch (provider) {
      case 'GOOGLE':
        return new GoogleService(credentials);
      case 'SLACK':
        return new SlackService(credentials);
      case 'MICROSOFT':
        return new MicrosoftService(credentials);
      case 'FIRECRAWL':
        return new FirecrawlService(credentials);
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
  
  static async testConnection(provider: Provider, credentials: CredentialSecret): Promise<boolean> {
    try {
      const service = this.createService(provider, credentials);
      
      // Each service should implement a testConnection method
      if ('testConnection' in service && typeof service.testConnection === 'function') {
        return await service.testConnection();
      }
      
      // Fallback: try to create the service and make a simple call
      switch (provider) {
        case 'GOOGLE':
          await (service as GoogleService).listFiles({ pageSize: 1 });
          return true;
        case 'SLACK':
          await (service as SlackService).testAuth();
          return true;
        case 'MICROSOFT':
          await (service as MicrosoftService).getProfile();
          return true;
        case 'FIRECRAWL':
          return await (service as FirecrawlService).testConnection();
        default:
          return false;
      }
    } catch (error) {
      console.error(`Connection test failed for ${provider}:`, error);
      return false;
    }
  }
}

/**
 * Convenience functions for creating specific services
 */
export const createGoogleService = (credentials: CredentialSecret) => new GoogleService(credentials);
export const createSlackService = (credentials: CredentialSecret) => new SlackService(credentials);
export const createMicrosoftService = (credentials: CredentialSecret) => new MicrosoftService(credentials);
export const createFirecrawlService = (credentials: CredentialSecret) => new FirecrawlService(credentials);

/**
 * Type-safe service creation with provider validation
 */
export function createProviderService<T extends Provider>(
  provider: T,
  credentials: CredentialSecret
): T extends 'GOOGLE' ? GoogleService
  : T extends 'SLACK' ? SlackService
  : T extends 'MICROSOFT' ? MicrosoftService
  : T extends 'FIRECRAWL' ? FirecrawlService
  : never {
  return ProviderServiceFactory.createService(provider, credentials) as any;
}