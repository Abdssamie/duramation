'use client';

import { useState } from 'react';
import {
  Provider,
  getProviderConfig,
  getProviderColors,
  ProviderIcon,
  getProviderDisplayName
} from '@duramation/integrations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface IntegrationSelectorProps {
  requiredProviders: Provider[];
  onProviderSelect: (provider: Provider) => void;
  onClose?: () => void;
  disabled?: boolean;
}


export default function IntegrationSelector({
  requiredProviders,
  onProviderSelect,
  onClose,
  disabled = false
}: IntegrationSelectorProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );

  const handleProviderClick = (provider: Provider) => {
    if (disabled) return;
    setSelectedProvider(provider);
  };

  const handleConnect = () => {
    if (selectedProvider) {
      onProviderSelect(selectedProvider);
    }
  };

  // Show all providers if no specific requirements, otherwise show only required ones
  const providersToShow = requiredProviders.length > 0 ? requiredProviders : [];

  return (
    <div className='space-y-4'>
      {onClose && (
        <div className='flex justify-end'>
          <Button variant='ghost' size='sm' onClick={onClose}>
            ×
          </Button>
        </div>
      )}

      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {providersToShow.map((provider) => {
          const config = getProviderConfig(provider);
          const colors = getProviderColors(provider);
          const isSelected = selectedProvider === provider;

          return (
            <Card
              key={provider}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-primary ring-2' : ''
              } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={() => handleProviderClick(provider)}
            >
              <CardHeader className='pb-2'>
                <CardTitle className='flex items-center gap-2 text-sm'>
                  <div className={`rounded p-2 ${colors.bgColor}`}>
                    <ProviderIcon provider={provider} className={`h-4 w-4 ${colors.color}`} />
                  </div>
                  {config.displayName}
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                <p className='text-muted-foreground text-xs'>
                  {config.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedProvider && (
        <div className='flex justify-end gap-2 border-t pt-4'>
          <Button variant='outline' onClick={() => setSelectedProvider(null)}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={disabled}>
            Connect {getProviderDisplayName(selectedProvider)}
          </Button>
        </div>
      )}
    </div>
  );
}
