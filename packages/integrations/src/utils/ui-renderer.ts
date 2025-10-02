import { Provider } from '../types/providers';
import { PROVIDER_CONFIGS, ProviderField } from '../types/providers';

// Utility functions for the generic UI renderer

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'url' | 'select' | 'textarea' | 'number' | 'checkbox';
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  defaultValue?: string | number | boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

export interface ProviderUIConfig {
  provider: Provider;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  authType: 'oauth' | 'api_key';
  fields: FormField[];
  documentation?: {
    setupUrl?: string;
    apiDocsUrl?: string;
  };
  category?: string;
}

// Get UI configuration for a provider
export function getProviderUIConfig(provider: Provider): ProviderUIConfig {
  const config = PROVIDER_CONFIGS[provider];
  if (!config) {
    throw new Error(`Provider configuration not found for: ${provider}`);
  }
  
  return {
    provider: config.id as Provider,
    name: config.name,
    displayName: config.displayName,
    description: config.description,
    icon: config.icon,
    color: config.color,
    bgColor: config.bgColor,
    authType: config.authType,
    fields: config.fields || [],
    documentation: config.documentation,
    category: config.category
  };
}

// Check if provider uses OAuth
export function isOAuthProvider(provider: Provider): boolean {
  const config = PROVIDER_CONFIGS[provider];
  return config ? config.authType === 'oauth' : false;
}

// Check if provider uses API key
export function isApiKeyProvider(provider: Provider): boolean {
  const config = PROVIDER_CONFIGS[provider];
  return config ? config.authType === 'api_key' : false;
}

// Get form fields for a provider
export function getProviderFormFields(provider: Provider): FormField[] {
  const config = PROVIDER_CONFIGS[provider];
  return config?.fields || [];
}

// Validate form data against provider fields
export function validateProviderFormData(
  provider: Provider,
  data: Record<string, any>
): { isValid: boolean; errors: Record<string, string> } {
  const fields = getProviderFormFields(provider);
  const errors: Record<string, string> = {};
  
  for (const field of fields) {
    const value = data[field.key];
    
    // Check required fields
    if (field.required && (value === undefined || value === null || value === '')) {
      errors[field.key] = `${field.label} is required`;
      continue;
    }
    
    // Skip validation for empty optional fields
    if (!field.required && (value === undefined || value === null || value === '')) {
      continue;
    }
    
    // Validate based on field type and validation rules
    if (field.validation) {
      // Pattern validation
      if (field.validation.pattern && value) {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          errors[field.key] = `Invalid format for ${field.label}`;
        }
      }
      
      // Length validations
      if (typeof value === 'string') {
        if (field.validation.minLength !== undefined && value.length < field.validation.minLength) {
          errors[field.key] = `${field.label} must be at least ${field.validation.minLength} characters`;
        }
        
        if (field.validation.maxLength !== undefined && value.length > field.validation.maxLength) {
          errors[field.key] = `${field.label} must be no more than ${field.validation.maxLength} characters`;
        }
      }
      
      // Numeric validations
      if (typeof value === 'number') {
        if (field.validation.min !== undefined && value < field.validation.min) {
          errors[field.key] = `${field.label} must be at least ${field.validation.min}`;
        }
        
        if (field.validation.max !== undefined && value > field.validation.max) {
          errors[field.key] = `${field.label} must be no more than ${field.validation.max}`;
        }
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Generate default values for form fields
export function generateDefaultFormValues(provider: Provider): Record<string, any> {
  const fields = getProviderFormFields(provider);
  const defaults: Record<string, any> = {};
  
  for (const field of fields) {
    if (field.defaultValue !== undefined) {
      defaults[field.key] = field.defaultValue;
    } else {
      // Set appropriate default values based on field type
      switch (field.type) {
        case 'checkbox':
          defaults[field.key] = false;
          break;
        case 'number':
          defaults[field.key] = 0;
          break;
        default:
          defaults[field.key] = '';
      }
    }
  }
  
  return defaults;
}

// Get all providers grouped by category
export function getProvidersByCategory(): Record<string, ProviderUIConfig[]> {
  const categories: Record<string, ProviderUIConfig[]> = {};
  
  Object.values(PROVIDER_CONFIGS).forEach(config => {
    const uiConfig: ProviderUIConfig = {
      provider: config.id as Provider,
      name: config.name,
      displayName: config.displayName,
      description: config.description,
      icon: config.icon,
      color: config.color,
      bgColor: config.bgColor,
      authType: config.authType,
      fields: config.fields || [],
      documentation: config.documentation,
      category: config.category
    };
    
    const category = config.category || 'other';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(uiConfig);
  });
  
  return categories;
}

// Get all available categories
export function getAvailableCategories(): string[] {
  const categories = new Set<string>();
  
  Object.values(PROVIDER_CONFIGS).forEach(config => {
    if (config.category) {
      categories.add(config.category);
    }
  });
  
  return Array.from(categories);
}