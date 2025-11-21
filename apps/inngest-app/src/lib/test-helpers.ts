import type { CredentialSecret } from '@duramation/integrations/server';

export function createMockCredentials(overrides?: Partial<CredentialSecret>): CredentialSecret {
  return {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
    expiresAt: new Date(Date.now() + 3600000),
    ...overrides,
  };
}

export function createMockWorkflowInput<T extends Record<string, unknown>>(input: T): T {
  return input;
}

export async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  timeout = 5000,
  interval = 100
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await condition()) return;
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  throw new Error('Condition timeout');
}
