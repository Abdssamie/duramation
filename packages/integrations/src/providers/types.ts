import { Provider, CredentialType } from '../types/providers.js';

// UI Configuration - what the user needs to provide
export interface ProviderUIConfig {
  setupInstructions: string;
  connectionTestAvailable: boolean;
  [key: string]: any; // Allow additional dynamic fields
}

// OAuth Configuration
export interface OAuthProviderConfig {
  authUrl: string;
  tokenUrl: string;
  scopes: Record<string, string[]>;
  defaultScopes: string[];
}

// API Key Configuration
export interface ApiKeyField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'url';
  placeholder?: string;
  description?: string;
}

export interface ApiKeyProviderConfig {
  baseUrl: string;
  headerName: string;
  headerPrefix: string;
  fields: ApiKeyField[];
}

// Base Provider Config
export interface BaseProviderConfig {
  provider: Provider;
  name: string;
  description: string;
  icon: string;
  ui: ProviderUIConfig;
}

// OAuth Provider Config
export interface OAuthProviderFullConfig extends BaseProviderConfig {
  authType: 'OAUTH';
  oauth: OAuthProviderConfig;
}

// API Key Provider Config
export interface ApiKeyProviderFullConfig extends BaseProviderConfig {
  authType: 'API_KEY';
  apiKey: ApiKeyProviderConfig;
}

// Union type for all provider configs
export type ProviderFullConfig = OAuthProviderFullConfig | ApiKeyProviderFullConfig;
