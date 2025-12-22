import { MicrosoftOAuthSecret } from '@duramation/shared';
import { credentialStore } from '../../../services/credential-store.js';
import { MicrosoftAuthHandler } from '../auth.js';

export class MicrosoftService {
  protected userId: string;
  protected credentialId: string;
  protected secret: MicrosoftOAuthSecret;

  constructor(userId: string, credentialId: string, secret: MicrosoftOAuthSecret) {
    this.userId = userId;
    this.credentialId = credentialId;
    this.secret = secret;
  }

  /**
   * Get valid access token, refreshing if necessary
   */
  protected async getAccessToken(): Promise<string> {
    // Check if token is expired or about to expire (within 5 minutes)
    const now = Date.now();
    const expiresIn = this.secret.expiresIn;
    const bufferTime = 5 * 60 * 1000; // 5 minutes

    if (expiresIn && now >= expiresIn - bufferTime) {
       if (!this.secret.refreshToken) {
        throw new Error("Cannot refresh Microsoft token: Refresh token is missing or null.");
      }
      // Token expired or about to expire, refresh it
      const refreshed = await MicrosoftAuthHandler.refreshToken(this.secret.refreshToken);
      
      // Update the secret
      this.secret.accessToken = refreshed.accessToken;
      this.secret.expiresIn = refreshed.expiresIn;

      // Save to database
      await credentialStore.updateCredentialSecret(
        this.credentialId,
        this.userId,
        this.secret,
        new Date(refreshed.expiresIn)
      );
    }

    return this.secret.accessToken;
  }

  /**
   * Make authenticated request to Microsoft Graph API
   */
  protected async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const accessToken = await this.getAccessToken();
    
    const response = await fetch(`https://graph.microsoft.com/v1.0${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Microsoft Graph API request failed: ${error}`);
    }

    return response.json();
  }
}
