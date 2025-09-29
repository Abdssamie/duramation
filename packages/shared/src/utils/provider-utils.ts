import { Provider } from '@duramation/db/types';
import { PROVIDER_CONFIGS, ProviderConfig } from '../types/providers.js';

/**
 * Get provider configuration by provider enum
 */
export function getProviderConfig(provider: Provider): ProviderConfig {
  const config = PROVIDER_CONFIGS[provider];
  if (!config) {
    throw new Error(`Provider configuration not found for: ${provider}`);
  }
  return config;
}

/**
 * Get provider display name
 */
export function getProviderDisplayName(provider: Provider): string {
  return getProviderConfig(provider).displayName;
}

/**
 * Get provider icon identifier
 */
export function getProviderIcon(provider: Provider): string {
  return getProviderConfig(provider).icon;
}

/**
 * Get provider color classes
 */
export function getProviderColors(provider: Provider): { color: string; bgColor: string } {
  const config = getProviderConfig(provider);
  return {
    color: config.color,
    bgColor: config.bgColor
  };
}

/**
 * Get required scopes for provider
 */
export function getProviderScopes(provider: Provider): string[] {
  return getProviderConfig(provider).scopes || [];
}

/**
 * Check if provider supports OAuth authentication
 */
export function isOAuthProvider(provider: Provider): boolean {
  return getProviderConfig(provider).authType === 'oauth';
}

/**
 * Check if provider uses API key authentication
 */
export function isApiKeyProvider(provider: Provider): boolean {
  return getProviderConfig(provider).authType === 'api_key';
}

/**
 * Check if provider uses custom authentication
 */
export function isCustomProvider(provider: Provider): boolean {
  return getProviderConfig(provider).authType === 'custom';
}

/**
 * Get provider authentication endpoints
 */
export function getProviderEndpoints(provider: Provider) {
  return getProviderConfig(provider).endpoints || {};
}

/**
 * Get provider form fields for custom configuration
 */
export function getProviderFields(provider: Provider) {
  return getProviderConfig(provider).fields || [];
}

/**
 * Get provider documentation links
 */
export function getProviderDocumentation(provider: Provider) {
  return getProviderConfig(provider).documentation || {};
}

/**
 * Get provider description
 */
export function getProviderDescription(provider: Provider): string {
  return getProviderConfig(provider).description;
}

/**
 * Check if provider has custom form fields
 */
export function hasCustomFields(provider: Provider): boolean {
  const fields = getProviderFields(provider);
  return fields.length > 0;
}

/**
 * Get all providers that support a specific authentication type
 */
export function getProvidersByAuthType(authType: 'oauth' | 'api_key' | 'custom'): Provider[] {
  return Object.keys(PROVIDER_CONFIGS).filter(provider => 
    PROVIDER_CONFIGS[provider as Provider].authType === authType
  ) as Provider[];
}

/**
 * Validate if a provider exists in the configuration
 */
export function isValidProvider(provider: string): provider is Provider {
  return provider in PROVIDER_CONFIGS;
}

/**
 * Get all configured providers
 */
export function getAllConfiguredProviders(): Provider[] {
  return Object.keys(PROVIDER_CONFIGS) as Provider[];
}
