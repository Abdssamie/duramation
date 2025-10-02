import { Provider } from '../types/providers';
import { IntegrationService } from './registry';

export abstract class BaseIntegrationService implements IntegrationService {
  public provider: Provider;
  protected credentials: any; // This would be properly typed in a real implementation

  constructor(provider: Provider, credentials: any) {
    this.provider = provider;
    this.credentials = credentials;
  }

  abstract authenticate(): Promise<void>;
  
  abstract makeRequest(endpoint: string, options?: RequestInit): Promise<Response>;

  // refreshToken is optional, so we don't implement it here
}