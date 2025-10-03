import { Provider } from '../types/providers.js';
import { PROVIDER_REGISTRY } from '../providers/registry.js';
import type { ProviderFullConfig } from '../providers/types.js';

/**
 * Get provider display name
 */
export function getProviderDisplayName(provider: Provider): string {
    const config = PROVIDER_REGISTRY[provider];
    return config.name;
}

/**
 * Get provider description
 */
export function getProviderDescription(provider: Provider): string {
    const config = PROVIDER_REGISTRY[provider];
    return config.description;
}

/**
 * Get provider icon identifier
 */
export function getProviderIcon(provider: Provider): string {
    const config = PROVIDER_REGISTRY[provider];
    return config.icon;
}

/**
 * Get provider configuration
 */
export function getProviderConfig(provider: Provider): ProviderFullConfig {
    return PROVIDER_REGISTRY[provider];
}



/**
 * Get provider UI colors (for frontend display)
 */
export function getProviderColors(provider: Provider): { color: string; bgColor: string } {
    // Map providers to Tailwind color classes
    const colorMap: Record<Provider, { color: string; bgColor: string }> = {
        GOOGLE: { color: 'text-blue-600', bgColor: 'bg-blue-50' },
        SLACK: { color: 'text-purple-600', bgColor: 'bg-purple-50' },
        HUBSPOT: { color: 'text-orange-600', bgColor: 'bg-orange-50' },
        FIRECRAWL: { color: 'text-red-600', bgColor: 'bg-red-50' },
        INSTAGRAM: { color: 'text-pink-600', bgColor: 'bg-pink-50' },
        CUSTOM: { color: 'text-gray-600', bgColor: 'bg-gray-50' },
    };

    return colorMap[provider] || { color: 'text-gray-600', bgColor: 'bg-gray-50' };
}

/**
 * Validate if a provider exists in the registry
 */
export function isValidProvider(provider: string): provider is Provider {
    try {
        const config = PROVIDER_REGISTRY[provider as Provider];
        return !!config;
    } catch {
        return false;
    }
}
