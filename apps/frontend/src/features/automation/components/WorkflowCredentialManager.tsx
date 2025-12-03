'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import Nango from '@nangohq/frontend';
import {
  Provider,
  getProviderDisplayName,
} from '@duramation/integrations';
import {
  CredentialCreateRequest,
} from '@duramation/shared';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/services/api/api-client';
import IntegrationSelector from '@/components/integrations/IntegrationSelector';
import CredentialRequirementIndicator from './CredentialRequirementIndicator';
import { Icons } from '@/components/icons';

interface WorkflowCredentialManagerProps {
  workflowId: string;
  requiredProviders: Provider[];
  requiredScopes?: Record<string, string[]> | null;
  availableCredentials?: Array<{
    id: string;
    provider: Provider;
    name: string;
  }>;
  onCredentialAdded?: (credential: CredentialCreateRequest) => void;
  onClose?: () => void;
  open?: boolean;
}

export default function WorkflowCredentialManager({
  workflowId,
  requiredProviders,
  requiredScopes,
  availableCredentials = [],
  onCredentialAdded,
  onClose,
  open = false
}: WorkflowCredentialManagerProps) {
  const { getToken: _getToken } = useAuth();
  const getToken = useCallback(() => _getToken(), [_getToken]);

  const [currentStep, setCurrentStep] = useState<'overview' | 'select'>('overview');
  const [loading, setLoading] = useState(false);

  const handleProviderSelect = async (provider: Provider) => {
    // We no longer check isOAuthProvider. Nango handles everything.
    try {
        setLoading(true);
        const token = await getToken();
        if (!token) {
            toast.error('Authentication required');
            setLoading(false);
            return;
        }

        // Initialize Nango
        const nango = new Nango();

        // Get Session Token from Backend
        const integrationId = provider.toLowerCase();
        const sessionResponse = await api.credentials.createConnectSession(token, integrationId);
        
        if (!sessionResponse?.token) {
            throw new Error('Failed to get session token');
        }

        // Close the dialog temporarily to allow Nango UI to be fully interactable
        // if it opens as a modal/iframe. If it's a popup, this is less critical but safer.
        handleClose();

        // Open Nango Connect UI
        const connect = nango.openConnectUI({
            onEvent: async (event) => {
                if (event.type === 'close') {
                    setLoading(false);
                    // Webhook handles credential creation and linking
                    onCredentialAdded?.({} as unknown as CredentialCreateRequest);
                }
            }
        });

        connect.setSessionToken(sessionResponse.token);

    } catch (error) {
        console.error('Nango connection failed:', error);
        toast.error('Failed to initiate connection. Please try again.');
        setLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentStep('overview');
    onClose?.();
  };

  const handleAddCredential = (provider: Provider) => {
    // If user clicks "Add" for a specific provider from the list, go straight to Nango
    handleProviderSelect(provider);
  };

  const renderOverview = () => (
    <div className='space-y-4'>
      <CredentialRequirementIndicator
        requiredProviders={requiredProviders}
        availableCredentials={availableCredentials}
        onAddCredential={handleAddCredential}
        showAddButton={true}
        compact={false}
      />

      <div className='flex justify-end gap-2 border-t pt-4'>
        <Button variant='outline' onClick={handleClose}>
          Close
        </Button>
        <Button onClick={() => setCurrentStep('select')}>
          Add New Credential
        </Button>
      </div>
    </div>
  );

  const renderIntegrationSelector = () => (
    <IntegrationSelector
      requiredProviders={requiredProviders}
      onProviderSelect={handleProviderSelect}
    />
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose(); 
        }
      }}
    >
      <DialogContent
        className='max-w-2xl'
        aria-describedby='credential-manager-description'
      >
        <DialogDescription className='DialogDescription'>
          Manage your credentials for different integrations.
        </DialogDescription>
        <DialogTitle className='DialogTitle flex items-center gap-2'>
          {currentStep === 'overview' && 'Credential Requirements'}
          {currentStep === 'select' && (
            <>
              <Button
                variant='ghost'
                size='icon'
                className='-ml-2 h-6 w-6'
                onClick={() => setCurrentStep('overview')}
              >
                <Icons.ArrowLeft className='h-4 w-4' />
              </Button>
              Select Integration
            </>
          )}
        </DialogTitle>

        {currentStep === 'overview' && renderOverview()}
        {currentStep === 'select' && renderIntegrationSelector()}
      </DialogContent>
    </Dialog>
  );
}
