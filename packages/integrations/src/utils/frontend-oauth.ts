import { Provider } from '../types/providers.js';
import { PROVIDER_REGISTRY } from '../providers/registry.js';

/**
 * Frontend OAuth utilities that work with backend APIs
 * These functions help the frontend handle OAuth flows without Node.js dependencies
 */

export interface OAuthInitiateRequest {
    provider: Provider;
    scopes?: string[];
    redirectUrl?: string;
    state?: string;
}

export interface OAuthInitiateResponse {
    authUrl: string;
    state: string;
}

export interface OAuthCallbackRequest {
    provider: Provider;
    code: string;
    state: string;
}

export interface OAuthCallbackResponse {
    success: boolean;
    credentialId?: string;
    error?: string;
}

/**
 * Generate OAuth initiation request for a provider
 * This should be sent to your backend API endpoint
 */
export function createOAuthInitiateRequest(
    provider: Provider,
    options: {
        scopes?: string[];
        redirectUrl?: string;
        state?: string;
    } = {}
): OAuthInitiateRequest {
    const config = PROVIDER_REGISTRY[provider];

    if (config.authType !== 'OAUTH') {
        throw new Error(`Provider ${provider} is not an OAuth provider`);
    }

    const defaultScopes = config.oauth.defaultScopes;
    const requestedScopes = options.scopes || defaultScopes;

    return {
        provider,
        scopes: requestedScopes,
        redirectUrl: options.redirectUrl,
        state: options.state || generateRandomState(),
    };
}

/**
 * Get available scopes for a provider
 */
export function getProviderScopes(provider: Provider): Record<string, string[]> {
    const config = PROVIDER_REGISTRY[provider];

    if (config.authType !== 'OAUTH') {
        return {};
    }

    return config.oauth.scopes;
}

/**
 * Get default scopes for a provider
 */
export function getProviderDefaultScopes(provider: Provider): string[] {
    const config = PROVIDER_REGISTRY[provider];

    if (config.authType !== 'OAUTH') {
        return [];
    }

    return config.oauth.defaultScopes;
}

/**
 * Check if provider supports OAuth
 */
export function isOAuthProvider(provider: Provider): boolean {
    const config = PROVIDER_REGISTRY[provider];
    return config.authType === 'OAUTH';
}

/**
 * Check if provider uses API key authentication
 */
export function isApiKeyProvider(provider: Provider): boolean {
    const config = PROVIDER_REGISTRY[provider];
    return config.authType === 'API_KEY';
}

/**
 * Get API key fields for a provider
 * Alias: getProviderFields for backward compatibility
 */
export function getApiKeyFields(provider: Provider) {
    const config = PROVIDER_REGISTRY[provider];

    if (config.authType !== 'API_KEY') {
        return [];
    }

    return config.apiKey.fields.map((field: any) => ({
        key: field.name,
        name: field.name,
        label: field.label,
        type: field.type,
        required: true,
        placeholder: field.placeholder,
        description: field.description,
    }));
}

/**
 * Get provider fields (backward compatibility alias for getApiKeyFields)
 */
export function getProviderFields(provider: Provider) {
    return getApiKeyFields(provider);
}

/**
 * Generate a random state parameter for OAuth
 */
function generateRandomState(): string {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

/**
 * Frontend OAuth flow helper
 * This provides a complete OAuth flow interface for the frontend
 */
export class FrontendOAuthFlow {
    private baseUrl: string;

    constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api') {
        this.baseUrl = baseUrl;
    }

    /**
     * Initiate OAuth flow for Google
     * Returns the auth URL to redirect the user to
     */
    async initiateGoogleOAuth(
        options: {
            scopes?: string[];
            workflowId?: string;
        } = {}
    ): Promise<string> {
        const params = new URLSearchParams();

        if (options.scopes) {
            params.append('scopes', options.scopes.join(','));
        }

        if (options.workflowId) {
            params.append('workflowId', options.workflowId);
        }

        const response = await fetch(`${this.baseUrl}/credentials/google/auth-url?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get Google auth URL: ${response.statusText}`);
        }

        const data = await response.json();
        return data.url;
    }

    /**
     * Generic OAuth initiation (falls back to provider-specific methods)
     */
    async initiateOAuth(
        provider: Provider,
        options: {
            scopes?: string[];
            workflowId?: string;
        } = {}
    ): Promise<string> {
        switch (provider) {
            case 'GOOGLE':
                return this.initiateGoogleOAuth(options);

            case 'SLACK':
                // TODO: Implement Slack OAuth URL endpoint
                throw new Error('Slack OAuth not implemented yet');

            default:
                throw new Error(`OAuth not supported for provider: ${provider}`);
        }
    }

    /**
     * Handle OAuth callback
     * Process the authorization code from the OAuth provider
     */
    async handleCallback(
        provider: Provider,
        code: string,
        state: string
    ): Promise<OAuthCallbackResponse> {
        const request: OAuthCallbackRequest = {
            provider,
            code,
            state,
        };

        const response = await fetch(`${this.baseUrl}/oauth/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`Failed to handle OAuth callback: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Create API key credential
     */
    async createApiKeyCredential(
        provider: Provider,
        fields: Record<string, string>,
        name: string
    ): Promise<{ success: boolean; credentialId?: string; error?: string }> {
        const response = await fetch(`${this.baseUrl}/credentials/api-key`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                provider,
                fields,
                name,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to create API key credential: ${response.statusText}`);
        }

        return response.json();
    }
}

/**
 * Default OAuth flow instance
 */
export const oauthFlow = new FrontendOAuthFlow();