import { Nango } from '@nangohq/node';
import type { Provider } from '@duramation/db/types';

export interface CreateConnectSessionParams {
    allowed_integrations: string[];
    end_user: {
        id: string;
        email?: string;
        display_name?: string;
        tags?: Record<string, string>;
    };
    connection_id?: string;
    organization?: {
        id: string;
        display_name?: string;
    };
}

export class IntegrationClient {
  private nango: Nango;

  constructor(secretKey?: string) {
    if (!secretKey) {
      throw new Error('NANGO_SECRET_KEY is not defined. Please set the environment variable.');
    }
    this.nango = new Nango({ secretKey });
  }

  /**
   * Create a Connect Session token for the frontend
   */
  async createConnectSession(params: CreateConnectSessionParams) {
    return this.nango.createConnectSession(params);
  }

  /**
   * Get a valid access token for a given provider and connection ID.
   * Nango handles the refreshing automatically.
   */
  async getAccessToken(provider: Provider, connectionId: string): Promise<string> {
    try {
      // Nango uses hyphens (google-mail), we use underscores (google_mail)
      const nangoProviderId = provider.toLowerCase().replace(/_/g, '-');
      const connection = await this.nango.getConnection(
        nangoProviderId,
        connectionId
      );
      
      // Cast to any because Nango's types might not cover all OAuth2 scenarios perfectly 
      // or we are accessing standard fields that should be there for OAuth2
      const credentials = connection?.credentials as any;

      if (!credentials?.access_token) {
        throw new Error(`No access token found for connection ${connectionId}`);
      }

      return credentials.access_token;
    } catch (error) {
      console.error(`Failed to get access token for ${provider}/${connectionId}:`, error);
      throw error;
    }
  }

  /**
   * Get the raw Nango connection object (useful for metadata)
   */
  async getConnection(provider: Provider, connectionId: string) {
    // Nango uses hyphens (google-mail), we use underscores (google_mail)
    const nangoProviderId = provider.toLowerCase().replace(/_/g, '-');
    return this.nango.getConnection(nangoProviderId, connectionId);
  }

  /**
   * Delete a connection from Nango
   */
  async deleteConnection(provider: Provider, connectionId: string): Promise<void> {
    const nangoProviderId = provider.toLowerCase().replace(/_/g, '-');
    await this.nango.deleteConnection(nangoProviderId, connectionId);
  }
}

// Singleton instance using env var
export const integrationClient = new IntegrationClient(process.env.NANGO_SECRET_KEY);
