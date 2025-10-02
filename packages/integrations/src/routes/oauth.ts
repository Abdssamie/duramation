import { Provider } from '../types/providers';
import { PROVIDER_CONFIGS } from '../types/providers';
import { GoogleService } from '../services/google-service';

// This would typically be in a Next.js API route file
// For example: pages/api/auth/[provider].ts

interface OAuthState {
  provider: Provider;
  userId: string;
  redirectUri?: string;
  scopes?: string[];
  workflowId?: string; // Optional workflow context
}

export class OAuthHandler {
  // Generate OAuth authorization URL
  static generateAuthUrl(
    provider: Provider,
    state: OAuthState,
    redirectUri: string
  ): string {
    const config = PROVIDER_CONFIGS[provider];
    
    if (!config || config.authType !== 'oauth') {
      throw new Error(`Provider ${provider} does not support OAuth`);
    }
    
    if (!config.endpoints?.authUrl) {
      throw new Error(`No auth URL configured for provider ${provider}`);
    }
    
    // Encode state parameter
    const stateParam = btoa(JSON.stringify(state));
    
    // Get scopes (use provider defaults or override with custom scopes)
    const scopes = state.scopes || config.scopes || [];
    
    // Special handling for Google
    if (provider === 'GOOGLE') {
      return GoogleService.generateAuthUrl(scopes, stateParam);
    }
    
    // Build URL based on provider
    switch (provider) {
      case 'SLACK':
        return this.buildSlackAuthUrl(config.endpoints.authUrl, stateParam, redirectUri, scopes);
      
      case 'HUBSPOT':
        return this.buildHubspotAuthUrl(config.endpoints.authUrl, stateParam, redirectUri, scopes);
      
      case 'INSTAGRAM':
        return this.buildInstagramAuthUrl(config.endpoints.authUrl, stateParam, redirectUri, scopes);
      
      default:
        return this.buildGenericOAuthUrl(config.endpoints.authUrl, stateParam, redirectUri, scopes, provider);
    }
  }
  
  // Handle OAuth callback
  static async handleCallback(
    provider: Provider,
    code: string,
    state: string
  ): Promise<any> {
    const config = PROVIDER_CONFIGS[provider];
    
    if (!config || config.authType !== 'oauth') {
      throw new Error(`Provider ${provider} does not support OAuth`);
    }
    
    if (!config.endpoints?.tokenUrl) {
      throw new Error(`No token URL configured for provider ${provider}`);
    }
    
    // Decode state parameter
    let stateData: OAuthState;
    try {
      stateData = JSON.parse(atob(state));
    } catch (error) {
      throw new Error('Invalid state parameter');
    }
    
    // Special handling for Google
    if (provider === 'GOOGLE') {
      return GoogleService.handleOAuthCallback(code);
    }
    
    // Exchange code for token based on provider
    switch (provider) {
      case 'SLACK':
        return this.exchangeSlackCodeForToken(config.endpoints.tokenUrl, code, stateData);
      
      case 'HUBSPOT':
        return this.exchangeHubspotCodeForToken(config.endpoints.tokenUrl, code, stateData);
      
      case 'INSTAGRAM':
        return this.exchangeInstagramCodeForToken(config.endpoints.tokenUrl, code, stateData);
      
      default:
        return this.exchangeGenericCodeForToken(config.endpoints.tokenUrl, code, stateData, provider);
    }
  }
  
  // Provider-specific URL builders
  private static buildSlackAuthUrl(
    authUrl: string,
    state: string,
    redirectUri: string,
    scopes: string[]
  ): string {
    const params = new URLSearchParams({
      client_id: process.env.SLACK_CLIENT_ID || '',
      redirect_uri: redirectUri,
      scope: scopes.join(','),
      state: state,
    });
    
    return `${authUrl}?${params.toString()}`;
  }
  
  private static buildHubspotAuthUrl(
    authUrl: string,
    state: string,
    redirectUri: string,
    scopes: string[]
  ): string {
    const params = new URLSearchParams({
      client_id: process.env.HUBSPOT_CLIENT_ID || '',
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      state: state,
    });
    
    return `${authUrl}?${params.toString()}`;
  }
  
  private static buildInstagramAuthUrl(
    authUrl: string,
    state: string,
    redirectUri: string,
    scopes: string[]
  ): string {
    // Instagram uses Facebook's OAuth system
    const params = new URLSearchParams({
      client_id: process.env.INSTAGRAM_CLIENT_ID || process.env.FACEBOOK_CLIENT_ID || '',
      redirect_uri: redirectUri,
      scope: scopes.join(','),
      response_type: 'code',
      state: state,
    });
    
    return `${authUrl}?${params.toString()}`;
  }
  
  private static buildGenericOAuthUrl(
    authUrl: string,
    state: string,
    redirectUri: string,
    scopes: string[],
    provider: Provider
  ): string {
    const params = new URLSearchParams({
      client_id: process.env[`${provider.toUpperCase()}_CLIENT_ID`] || '',
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      response_type: 'code',
      state: state,
    });
    
    return `${authUrl}?${params.toString()}`;
  }
  
  // Provider-specific token exchange
  private static async exchangeSlackCodeForToken(
    tokenUrl: string,
    code: string,
    state: OAuthState
  ): Promise<any> {
    const params = new URLSearchParams({
      client_id: process.env.SLACK_CLIENT_ID || '',
      client_secret: process.env.SLACK_CLIENT_SECRET || '',
      redirect_uri: state.redirectUri || '',
      code: code,
    });
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to exchange code for token: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  private static async exchangeHubspotCodeForToken(
    tokenUrl: string,
    code: string,
    state: OAuthState
  ): Promise<any> {
    const params = new URLSearchParams({
      client_id: process.env.HUBSPOT_CLIENT_ID || '',
      client_secret: process.env.HUBSPOT_CLIENT_SECRET || '',
      redirect_uri: state.redirectUri || '',
      grant_type: 'authorization_code',
      code: code,
    });
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to exchange code for token: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  private static async exchangeInstagramCodeForToken(
    tokenUrl: string,
    code: string,
    state: OAuthState
  ): Promise<any> {
    // Instagram uses Facebook's token endpoint
    const params = new URLSearchParams({
      client_id: process.env.INSTAGRAM_CLIENT_ID || process.env.FACEBOOK_CLIENT_ID || '',
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET || process.env.FACEBOOK_CLIENT_SECRET || '',
      redirect_uri: state.redirectUri || '',
      code: code,
    });
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to exchange code for token: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  private static async exchangeGenericCodeForToken(
    tokenUrl: string,
    code: string,
    state: OAuthState,
    provider: Provider
  ): Promise<any> {
    const params = new URLSearchParams({
      client_id: process.env[`${provider.toUpperCase()}_CLIENT_ID`] || '',
      client_secret: process.env[`${provider.toUpperCase()}_CLIENT_SECRET`] || '',
      redirect_uri: state.redirectUri || '',
      grant_type: 'authorization_code',
      code: code,
    });
    
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to exchange code for token: ${response.statusText}`);
    }
    
    return response.json();
  }
}