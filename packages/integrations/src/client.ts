import { Nango } from '@nangohq/node';
import type { Provider } from '@duramation/db/types';

/**
 * @interface CreateConnectSessionParams
 * @description Parameters required to create a Nango Connect Session token for the frontend.
 * This token allows the frontend to initiate and manage OAuth connections with third-party services.
 * @property {string[]} allowed_integrations - A list of integration IDs (e.g., "google-mail", "slack") that the user is allowed to connect to.
 * @property {object} end_user - Information about the end user initiating the connection.
 * @property {string} end_user.id - The unique identifier for the end user.
 * @property {string} [end_user.email] - The email address of the end user.
 * @property {string} [end_user.display_name] - The display name of the end user.
 * @property {Record<string, string>} [end_user.tags] - Optional tags to associate with the end user.
 * @property {string} [connection_id] - Optional. If provided, Nango will attempt to re-establish a connection with this ID.
 * @property {object} [organization] - Optional. Information about the organization associated with the connection.
 * @property {string} organization.id - The unique identifier for the organization.
 * @property {string} [organization.display_name] - The display name of the organization.
 */
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

/**
 * @class IntegrationClient
 * @description A client for interacting with Nango, an integration platform that simplifies
 * connecting to various third-party services. This class provides methods to manage
 * OAuth connections, retrieve access tokens, and handle connection lifecycle.
 */
export class IntegrationClient {
  private nango: Nango;

  /**
   * @constructor
   * @param {string} [secretKey] - The Nango secret key. Defaults to `process.env.NANGO_SECRET_KEY` if not provided.
   * @throws {Error} If `NANGO_SECRET_KEY` is not defined in the environment.
   */
  constructor(secretKey?: string) {
    if (!secretKey) {
      throw new Error('NANGO_SECRET_KEY is not defined. Please set the environment variable.');
    }
    // Initialize Nango client with the provided secret key and optional base URL
    this.nango = new Nango({ 
      secretKey,
      ...(process.env.NANGO_BASE_URL && { host: process.env.NANGO_BASE_URL })
    });
  }

  /**
   * @method createConnectSession
   * @description Creates a Connect Session token for the frontend. This token is used
   * by the Nango Connect Widget to securely initiate OAuth flows.
   * @param {CreateConnectSessionParams} params - Parameters for creating the connect session.
   * @returns {Promise<any>} A promise that resolves to the Nango Connect Session token.
   */
  async createConnectSession(params: CreateConnectSessionParams) {
    return this.nango.createConnectSession(params);
  }

  /**
   * @method getAccessToken
   * @description Retrieves a valid access token for a given provider and connection ID.
   * Nango automatically handles token refreshing, so the returned token is always valid.
   * @param {Provider} provider - The provider ID (e.g., "google_mail", "slack").
   * @param {string} connectionId - The unique ID of the connection in Nango.
   * @returns {Promise<string>} A promise that resolves to the access token.
   * @throws {Error} If no access token is found for the specified connection.
   */
  async getAccessToken(provider: Provider, connectionId: string): Promise<string> {
    try {
      // Nango uses hyphens (e.g., "google-mail"), but our internal `Provider` type might use underscores.
      // Convert the provider ID to Nango's expected format.
      const nangoProviderId = provider.toLowerCase().replace(/_/g, '-');
      const connection = await this.nango.getConnection(
        nangoProviderId,
        connectionId
      );
      
      // Cast to any because Nango's types might not cover all OAuth2 scenarios perfectly,
      // or we are accessing standard fields that should be present for OAuth2.
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
   * @method getConnection
   * @description Retrieves the raw Nango connection object for a given provider and connection ID.
   * This object can contain additional metadata about the connection.
   * @param {Provider} provider - The provider ID (e.g., "google_mail", "slack").
   * @param {string} connectionId - The unique ID of the connection in Nango.
   * @returns {Promise<any>} A promise that resolves to the Nango connection object.
   */
  async getConnection(provider: Provider, connectionId: string) {
    // Convert provider ID to Nango's expected format.
    const nangoProviderId = provider.toLowerCase().replace(/_/g, '-');
    return this.nango.getConnection(nangoProviderId, connectionId);
  }

  /**
   * @method deleteConnection
   * @description Deletes a connection from Nango. This revokes access and removes
   * the connection record from Nango's database.
   * @param {Provider} provider - The provider ID (e.g., "google_mail", "slack").
   * @param {string} connectionId - The unique ID of the connection in Nango.
   * @returns {Promise<void>} A promise that resolves when the connection is successfully deleted.
   */
  async deleteConnection(provider: Provider, connectionId: string): Promise<void> {
    const nangoProviderId = provider.toLowerCase().replace(/_/g, '-');
    await this.nango.deleteConnection(nangoProviderId, connectionId);
  }
}

// Export a singleton instance of IntegrationClient initialized with the Nango secret key.
// This allows for easy access to Nango functionalities throughout the application.
export const integrationClient = new IntegrationClient(process.env.NANGO_SECRET_KEY);
