import { Provider } from '@duramation/db/types';
import {
  WorkflowWithCredentials,
  CredentialStatusCalculation,
  CredentialRequirement
} from '@/types/workflow';

/**
 * Calculate credential status based on database requiredProviders field
 */
export function calculateCredentialStatus(
  workflow: WorkflowWithCredentials
): CredentialStatusCalculation {
  const requiredProviders = workflow.requiredProviders || [];
  const availableProviders =
    workflow.workflowCredentials?.map((wc) => wc.credential.provider) || [];

  const total = requiredProviders.length;
  const available = requiredProviders.filter((provider) =>
    availableProviders.includes(provider)
  ).length;
  const missing = total - available;

  let status: 'complete' | 'partial' | 'missing';
  if (total === 0) {
    status = 'complete';
  } else if (available === total) {
    status = 'complete';
  } else if (available > 0) {
    status = 'partial';
  } else {
    status = 'missing';
  }

  return { total, available, missing, status };
}

/**
 * Get missing providers for a workflow
 */
export function getMissingProviders(
  workflow: WorkflowWithCredentials
): Provider[] {
  const requiredProviders = workflow.requiredProviders || [];
  const availableProviders =
    workflow.workflowCredentials?.map((wc) => wc.credential.provider) || [];

  return requiredProviders.filter(
    (provider) => !availableProviders.includes(provider)
  );
}

/**
 * Map database requiredScopes to frontend credential requirement display
 */
export function mapCredentialRequirements(
  workflow: WorkflowWithCredentials
): CredentialRequirement[] {
  const requiredProviders = workflow.requiredProviders || [];
  const availableCredentials =
    workflow.workflowCredentials?.map((wc) => wc.credential) || [];
  const requiredScopes = workflow.requiredScopes as Record<
    string,
    string[]
  > | null;

  return requiredProviders.map((provider) => {
    const availableCredential = availableCredentials.find(
      (cred) => cred.provider === provider
    );
    const scopes = requiredScopes?.[provider] || [];

    return {
      provider,
      scopes,
      required: true,
      available: !!availableCredential,
      credentialId: availableCredential?.id
    };
  });
}

/**
 * Enhance workflow with computed credential status
 */
export function enhanceWorkflowWithCredentialStatus(
  workflow: WorkflowWithCredentials
): WorkflowWithCredentials {
  const statusCalc = calculateCredentialStatus(workflow);
  const missingProviders = getMissingProviders(workflow);
  const availableCredentials =
    workflow.workflowCredentials?.map((wc) => wc.credential) || [];

  return {
    ...workflow,
    credentialStatus: statusCalc.status,
    availableCredentials,
    missingProviders
  };
}

/**
 * Check if workflow has all required credentials
 */
export function hasAllRequiredCredentials(
  workflow: WorkflowWithCredentials
): boolean {
  const requiredProviders = workflow.requiredProviders || [];
  const availableProviders =
    workflow.workflowCredentials?.map((wc) => wc.credential.provider) || [];

  return (
    requiredProviders.length > 0 &&
    requiredProviders.every((provider) => availableProviders.includes(provider))
  );
}

/**
 * Get provider display name
 */
export function getProviderDisplayName(provider: Provider): string {
  const displayNames: Record<Provider, string> = {
    GOOGLE: 'Google',
    SLACK: 'Slack',
    HUBSPOT: 'HUBSPOT',
    FIRECRAWL: 'FIRECRAWL',
    CUSTOM: 'Other'
  };

  return displayNames[provider] || provider;
}

/**
 * Get credential status text
 */
export function getCredentialStatusText(
  status: 'complete' | 'partial' | 'missing'
): string {
  switch (status) {
    case 'complete':
      return 'All required credentials are connected and ready to use.';
    case 'partial':
      return 'Some required credentials are missing. Add them to enable full functionality.';
    case 'missing':
      return 'Required credentials are missing. Add them to enable this workflow.';
    default:
      return 'Unknown credential status.';
  }
}
