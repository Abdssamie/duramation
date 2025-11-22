#!/usr/bin/env tsx
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const providerName = process.argv[2];

if (!providerName) {
  console.error('Usage: pnpm add-provider <PROVIDER_NAME>');
  console.error('Example: pnpm add-provider NOTION');
  process.exit(1);
}

const provider = providerName.toUpperCase();
const providerLower = provider.toLowerCase();
const providerTitle = provider.charAt(0) + providerLower.slice(1);

console.log(`🚀 Adding provider: ${provider}`);

// 1. Update Prisma schema
console.log('📝 Updating Prisma schema...');
const schemaPath = join(process.cwd(), 'packages/db/schema.prisma');
let schema = readFileSync(schemaPath, 'utf-8');

if (schema.includes(`  ${provider}\n`)) {
  console.log(`⚠️  ${provider} already exists in schema`);
} else {
  schema = schema.replace(
    /enum Provider \{([^}]+)\}/,
    (match, content) => `enum Provider {${content}  ${provider}\n}`
  );
  writeFileSync(schemaPath, schema);
  console.log(`✅ Added ${provider} to Provider enum`);
}

// 2. Run migration
console.log('🔄 Running database migration...');
try {
  execSync('pnpm db:push', { cwd: join(process.cwd(), 'packages/db'), stdio: 'inherit' });
  console.log('✅ Database updated');
} catch (error) {
  console.error('❌ Migration failed');
  process.exit(1);
}

// 3. Create provider directory structure
console.log('📁 Creating provider files...');
const providerDir = join(process.cwd(), 'packages/integrations/src/providers', providerLower);

if (!existsSync(providerDir)) {
  mkdirSync(providerDir, { recursive: true });
}

// Create config.ts
const configContent = `import { Provider } from '../../types/providers.js';
import type { OAuthProviderConfig, ProviderUIConfig } from '../types.js';

export const ${provider}_CONFIG = {
  provider: '${provider}' as Provider,
  name: '${providerTitle}',
  displayName: '${providerTitle}',
  description: 'Connect ${providerTitle} for automation',
  icon: 'https://${providerLower}.com/favicon.ico',
  authType: 'OAUTH' as const,
  
  oauth: {
    authUrl: 'https://api.${providerLower}.com/oauth/authorize',
    tokenUrl: 'https://api.${providerLower}.com/oauth/token',
    scopes: {
      default: ['read', 'write']
    },
    defaultScopes: ['read']
  } satisfies OAuthProviderConfig,

  ui: {
    setupInstructions: 'Connect your ${providerTitle} account',
    connectionTestAvailable: true
  } satisfies ProviderUIConfig
} as const;
`;

writeFileSync(join(providerDir, 'config.ts'), configContent);

// Create auth.ts
const authContent = `export class ${providerTitle}AuthHandler {
  static async exchangeCodeForToken(code: string, redirectUri: string) {
    // TODO: Implement token exchange
    throw new Error('Not implemented');
  }

  static async refreshToken(refreshToken: string) {
    // TODO: Implement token refresh
    throw new Error('Not implemented');
  }
}
`;

writeFileSync(join(providerDir, 'auth.ts'), authContent);

// Create index.ts
const indexContent = `export { ${provider}_CONFIG } from './config.js';
export * from './auth.js';
`;

writeFileSync(join(providerDir, 'index.ts'), indexContent);

console.log(`✅ Created provider files in packages/integrations/src/providers/${providerLower}/`);

// 4. Update registry
console.log('📝 Updating provider registry...');
const registryPath = join(process.cwd(), 'packages/integrations/src/providers/registry.ts');
let registry = readFileSync(registryPath, 'utf-8');

if (!registry.includes(`import { ${provider}_CONFIG }`)) {
  // Add import
  const lastImport = registry.lastIndexOf('import');
  const endOfLastImport = registry.indexOf('\n', lastImport);
  registry = registry.slice(0, endOfLastImport + 1) + 
    `import { ${provider}_CONFIG } from './${providerLower}/index.js';\n` +
    registry.slice(endOfLastImport + 1);

  // Add to registry object
  registry = registry.replace(
    /export const PROVIDER_REGISTRY[^{]+\{/,
    (match) => match + `\n  ${provider}: ${provider}_CONFIG,`
  );

  writeFileSync(registryPath, registry);
  console.log('✅ Updated provider registry');
}

// 5. Update HTTP client
console.log('📝 Updating HTTP client...');
const httpClientPath = join(process.cwd(), 'packages/integrations/src/services/http-client.ts');
let httpClient = readFileSync(httpClientPath, 'utf-8');

if (!httpClient.includes(`${providerLower}:`)) {
  httpClient = httpClient.replace(
    /export const providerClients = \{([^}]+)\}/s,
    (match, content) => `export const providerClients = {${content}
  ${providerLower}: (credentials: CredentialSecret, onTokenRefresh?: AuthenticatedHttpClientConfig['onTokenRefresh']) => createAuthenticatedHttpClient({
    provider: '${provider}',
    credentials,
    baseUrl: 'https://api.${providerLower}.com',
    onTokenRefresh
  }),
}`
  );

  writeFileSync(httpClientPath, httpClient);
  console.log('✅ Updated HTTP client');
}

// 6. Create service template
console.log('📝 Creating service template...');
const serviceContent = `import { ApiClient, providerClients } from '../http-client.js';
import type { CredentialSecret } from '@duramation/shared/types';
import { BaseProviderService } from './base-service.js';

export class ${providerTitle}Service extends BaseProviderService {
  constructor(credentials: CredentialSecret) {
    super('${provider}', credentials);
  }

  protected createClient(): ApiClient {
    return new ApiClient(providerClients.${providerLower}(this.credentials));
  }

  // TODO: Add your service methods here
  async exampleMethod() {
    return this.executeWithRefresh(() => this.client.get('endpoint'));
  }
}
`;

const servicePath = join(process.cwd(), 'packages/integrations/src/services/providers', `${providerLower}-service.ts`);
writeFileSync(servicePath, serviceContent);
console.log(`✅ Created service template`);

// 7. Update service index
const serviceIndexPath = join(process.cwd(), 'packages/integrations/src/services/providers/index.ts');
let serviceIndex = readFileSync(serviceIndexPath, 'utf-8');
serviceIndex += `export { ${providerTitle}Service } from './${providerLower}-service.js';\n`;
writeFileSync(serviceIndexPath, serviceIndex);

console.log('\n✅ Provider setup complete!\n');
console.log('📋 Next steps:');
console.log(`1. Edit packages/integrations/src/providers/${providerLower}/config.ts - Update OAuth URLs`);
console.log(`2. Edit packages/integrations/src/providers/${providerLower}/auth.ts - Implement auth handlers`);
console.log(`3. Edit packages/integrations/src/services/providers/${providerLower}-service.ts - Add service methods`);
console.log(`4. Add environment variables: ${provider}_CLIENT_ID, ${provider}_CLIENT_SECRET`);
console.log(`5. Run: pnpm build:packages`);
