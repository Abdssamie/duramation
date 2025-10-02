import { BaseIntegrationService } from './base-service';
import { Provider } from '../types/providers';

interface InstagramCredentials {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  userId?: string;
}

export class InstagramService extends BaseIntegrationService {
  private instagramCredentials: InstagramCredentials;
  private apiBaseUrl: string;

  constructor(credentials: InstagramCredentials) {
    super('INSTAGRAM', credentials);
    this.instagramCredentials = credentials;
    this.apiBaseUrl = 'https://graph.facebook.com/v18.0';
  }

  async authenticate(): Promise<void> {
    // For Instagram, authentication would typically be handled via OAuth flow
    // This method would be called after the OAuth flow is complete
    if (!this.instagramCredentials.accessToken) {
      throw new Error('No access token available for Instagram authentication');
    }
    
    // Validate the token
    try {
      const response = await this.makeRequest('/me?fields=id,name');
      if (!response.ok) {
        throw new Error('Failed to validate Instagram access token');
      }
    } catch (error) {
      throw new Error(`Instagram authentication failed: ${error.message}`);
    }
  }

  async makeRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    // Check if token needs refresh
    if (this.isTokenExpired()) {
      await this.refreshToken();
    }

    const url = `${this.apiBaseUrl}${endpoint}`;
    const defaultHeaders = {
      'Authorization': `Bearer ${this.instagramCredentials.accessToken}`,
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    return fetch(url, config);
  }

  private async refreshToken(): Promise<void> {
    // Instagram/Facebook OAuth tokens can be refreshed using the long-lived token approach
    // This is a simplified implementation
    console.log('Refreshing Instagram token...');
    // In a real implementation, you would make a request to Facebook's token endpoint
    // and update this.instagramCredentials.accessToken with the new token
  }

  private isTokenExpired(): boolean {
    // Check if token is expired (with 5 minute buffer)
    if (!this.instagramCredentials.expiresIn) return false;
    
    const now = Math.floor(Date.now() / 1000);
    return this.instagramCredentials.expiresIn < now + 300;
  }

  // Instagram-specific methods
  async getMediaList(limit: number = 25): Promise<any> {
    const response = await this.makeRequest(`/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=${limit}`);
    return response.json();
  }

  async getAccountInsights(metrics: string[], period: string = 'lifetime'): Promise<any> {
    const metricsParam = metrics.join(',');
    const response = await this.makeRequest(`/me/insights?metric=${metricsParam}&period=${period}`);
    return response.json();
  }
}