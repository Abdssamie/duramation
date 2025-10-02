import { Provider } from '../types/providers';

export interface IntegrationService {
  provider: Provider;
  authenticate(): Promise<void>;
  refreshToken?(): Promise<void>;
  makeRequest(endpoint: string, options?: RequestInit): Promise<Response>;
}

export class IntegrationServiceRegistry {
  private static instance: IntegrationServiceRegistry;
  private services: Map<Provider, IntegrationService> = new Map();

  private constructor() {}

  static getInstance(): IntegrationServiceRegistry {
    if (!IntegrationServiceRegistry.instance) {
      IntegrationServiceRegistry.instance = new IntegrationServiceRegistry();
    }
    return IntegrationServiceRegistry.instance;
  }

  registerService(provider: Provider, service: IntegrationService): void {
    this.services.set(provider, service);
  }

  getService(provider: Provider): IntegrationService | undefined {
    return this.services.get(provider);
  }

  hasService(provider: Provider): boolean {
    return this.services.has(provider);
  }

  unregisterService(provider: Provider): boolean {
    return this.services.delete(provider);
  }

  getAllServices(): IntegrationService[] {
    return Array.from(this.services.values());
  }

  getAllProviders(): Provider[] {
    return Array.from(this.services.keys());
  }
}

// Export singleton instance
export const integrationServiceRegistry = IntegrationServiceRegistry.getInstance();