import { Provider, CredentialType } from '@duramation/db/types';
import { CredentialSecret } from './credential-secrets.js';

// Note: Secret data is stored as JSON in the database and encrypted.
// The CredentialSecret type represents the decrypted structure.

export interface BaseCredential {
    id: string;
    name: string;
    type: CredentialType;
    provider: Provider;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface SafeCredential extends BaseCredential {
    config?: Record<string, any>;
    isValid?: boolean;
    lastValidated?: string;
    expiresAt?: string;
}

export interface CredentialWithSecret extends BaseCredential {
    secret: CredentialSecret,
    config?: Record<string, any>;
}

export interface OAuthCredential extends BaseCredential {
    type: "OAUTH";
    secret: CredentialSecret; // Encrypted JSON containing OAuthSecret
    config?: {
        scopes?: string[];
        expiresAt?: string;
        refreshToken?: string;
        tokenType?: string;
    };
}

export interface ApiKeyCredential extends BaseCredential {
    type: "API_KEY";
    secret: CredentialSecret; // Encrypted JSON containing ApiKeySecret
    config?: {
        baseUrl?: string;
        headers?: Record<string, string>;
        endpoint?: string;
    };
}

/**
 * Union type for all credential types
 */
export type Credential = OAuthCredential | ApiKeyCredential;


export interface CredentialCreateRequest {
    name: string;
    type: CredentialType;
    provider: Provider;
    secret: CredentialSecret | object;
    config?: Record<string, any>;
}

export interface CredentialUpdateRequest {
    name?: string;
    secret?: CredentialSecret | object;
    config?: Record<string, any>;
}
