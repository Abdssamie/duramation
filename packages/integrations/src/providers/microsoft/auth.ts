import { MicrosoftOAuthSecret } from '@duramation/shared';

const MICROSOFT_OAUTH_CLIENT_ID = process.env.MICROSOFT_OAUTH_CLIENT_ID;
const MICROSOFT_OAUTH_CLIENT_SECRET = process.env.MICROSOFT_OAUTH_CLIENT_SECRET;
// Microsoft doesn't allow query strings in redirect URLs, so use path-based routing
const MICROSOFT_OAUTH_REDIRECT_URL = process.env.MICROSOFT_OAUTH_REDIRECT_URL || `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/oauth/microsoft/callback`;

function validateMicrosoftCredentials() {
  if (!MICROSOFT_OAUTH_CLIENT_ID || !MICROSOFT_OAUTH_CLIENT_SECRET) {
    throw new Error("Microsoft OAuth client credentials not found");
  }
}

export class MicrosoftAuthHandler {
  static generateAuthUrl(scopes: string[], state: string): string {
    validateMicrosoftCredentials();

    // Ensure offline_access is always included to get refresh token
    const scopesWithOfflineAccess = scopes.includes('offline_access') 
      ? scopes 
      : [...scopes, 'offline_access'];

    const params = new URLSearchParams({
      client_id: MICROSOFT_OAUTH_CLIENT_ID!,
      response_type: 'code',
      redirect_uri: MICROSOFT_OAUTH_REDIRECT_URL!,
      response_mode: 'query',
      scope: scopesWithOfflineAccess.join(' '),
      state: state,
      prompt: 'consent', // Force consent to ensure refresh token is returned
    });

    return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`;
  }

  static async handleCallback(code: string): Promise<MicrosoftOAuthSecret> {
    validateMicrosoftCredentials();

    const params = new URLSearchParams({
      client_id: MICROSOFT_OAUTH_CLIENT_ID!,
      client_secret: MICROSOFT_OAUTH_CLIENT_SECRET!,
      code: code,
      redirect_uri: MICROSOFT_OAUTH_REDIRECT_URL!,
      grant_type: 'authorization_code',
    });

    const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Microsoft OAuth token exchange failed: ${error}`);
    }

    const data = await response.json();

    if (!data.access_token || !data.expires_in) {
      console.error('Microsoft token response:', data);
      throw new Error('Incomplete token data from Microsoft: missing access_token or expires_in');
    }

    // Refresh token might not be returned on subsequent authorizations
    if (!data.refresh_token) {
      console.warn('Microsoft did not return a refresh_token. This may happen on re-authorization.');
    }

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || '',
      expiresIn: Date.now() + data.expires_in * 1000,
      scopes: data.scope?.split(' ') || [],
    };
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string; expiresIn: number }> {
    validateMicrosoftCredentials();

    const params = new URLSearchParams({
      client_id: MICROSOFT_OAUTH_CLIENT_ID!,
      client_secret: MICROSOFT_OAUTH_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to refresh Microsoft access token: ${error}`);
    }

    const data = await response.json();

    if (!data.access_token || !data.expires_in) {
      throw new Error('Failed to refresh access token');
    }

    return {
      accessToken: data.access_token,
      expiresIn: Date.now() + data.expires_in * 1000,
    };
  }
}
