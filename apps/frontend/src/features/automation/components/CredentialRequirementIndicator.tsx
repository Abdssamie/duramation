'use client';

import { Provider, getProviderDisplayName } from '@duramation/integrations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { Icons } from '@/components/icons';

interface CredentialRequirementIndicatorProps {
  requiredProviders: Provider[];
  availableCredentials: Array<{
    id: string;
    provider: Provider;
    name: string;
  }>;
  onAddCredential?: (provider: Provider) => void;
  showAddButton?: boolean;
  compact?: boolean;
}

export default function CredentialRequirementIndicator({
  requiredProviders,
  availableCredentials,
  onAddCredential,
  showAddButton = true,
  compact = false
}: CredentialRequirementIndicatorProps) {
  if (requiredProviders.length === 0) {
    return (
      <div className='text-muted-foreground text-sm'>
        No credentials required
      </div>
    );
  }

  const availableProviders = availableCredentials.map((c) => c.provider);
  const missingProviders = requiredProviders.filter(
    (p) => !availableProviders.includes(p)
  );
  const connectedProviders = requiredProviders.filter((p) =>
    availableProviders.includes(p)
  );
  const isComplete = missingProviders.length === 0;

  const compactLabel =
    missingProviders.length === 1
      ? 'A required credential is missing'
      : `${missingProviders.length} required credentials are missing`;

  if (compact) {
    return (
      <div className='flex items-center gap-2'>
        {isComplete ? (
          <Badge variant='secondary' className='bg-green-100 text-green-700'>
            <CheckCircle className='mr-1 h-3 w-3' />
            All connected
          </Badge>
        ) : (
          <Badge variant='secondary' className='bg-amber-100 text-amber-700'>
            <AlertCircle className='mr-1 h-3 w-3' />
            {compactLabel}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-2'>
        <h4 className='text-sm font-medium'>Required Connections</h4>
        {isComplete ? (
          <Badge variant='secondary' className='bg-green-100 text-green-700'>
            <CheckCircle className='mr-1 h-3 w-3' />
            Complete
          </Badge>
        ) : (
          <Badge variant='secondary' className='bg-amber-100 text-amber-700'>
            <AlertCircle className='mr-1 h-3 w-3' />
            {missingProviders.length} missing
          </Badge>
        )}
      </div>

      <div className='space-y-2'>
        {/* Connected providers */}
        {connectedProviders.map((provider) => {
          const credential = availableCredentials.find(
            (c) => c.provider === provider
          );
          const ProviderIcon =
            Icons[provider.toLowerCase() as keyof typeof Icons] || CheckCircle;
          return (
            <div
              key={provider}
              className='flex items-center gap-2 rounded-md bg-green-50 p-2 dark:bg-green-950'
            >
              <ProviderIcon className='h-4 w-4 text-green-600 dark:text-green-400' />
              <div>
                <span className='text-sm font-medium text-green-900 dark:text-green-100'>
                  {getProviderDisplayName(provider)}
                </span>
                {credential && (
                  <div className='text-xs text-green-700 dark:text-green-300'>
                    {credential.name}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Missing providers */}
        {missingProviders.map((provider) => {
          const ProviderIcon =
            Icons[provider.toLowerCase() as keyof typeof Icons] || AlertCircle;
          return (
            <div
              key={provider}
              className='flex items-center justify-between rounded-md bg-red-50 p-2 dark:bg-red-950'
            >
              <div className='flex items-center gap-2'>
                <ProviderIcon className='h-4 w-4 text-red-600 dark:text-red-400' />
                <div>
                  <span className='text-sm font-medium text-red-900 dark:text-red-100'>
                    {getProviderDisplayName(provider)}
                  </span>
                  <div className='text-xs text-red-600 dark:text-red-400'>Not connected</div>
                </div>
              </div>
              {showAddButton && onAddCredential && (
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => onAddCredential(provider)}
                  className='text-xs'
                >
                  <Plus className='mr-1 h-3 w-3' />
                  Connect
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
