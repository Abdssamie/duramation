'use client';

import { useAuth } from '@clerk/nextjs';
import Nango from '@nangohq/frontend';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Plus, CheckCircle, AlertCircle, XCircle, Link } from 'lucide-react';
import { WorkflowWithCredentials } from '@/types/workflow';
import { Provider } from '@duramation/integrations';
import {
  mapCredentialRequirements,
  getProviderDisplayName,
  getCredentialStatusText,
  calculateCredentialStatus
} from '@/utils/workflow-credentials';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';
import api from '@/services/api/api-client';
import { useState, useEffect } from 'react';

interface WorkflowCredentialsTabProps {
  workflow: WorkflowWithCredentials;
}

export default function WorkflowCredentialsTab({
  workflow
}: WorkflowCredentialsTabProps) {
  const { getToken } = useAuth();
  const [existingCredentials, setExistingCredentials] = useState<any[]>([]);
  const credentialRequirements = mapCredentialRequirements(workflow);
  const credentialStatus = calculateCredentialStatus(workflow);
  const hasRequiredCredentials = credentialRequirements.length > 0;
  const missingCredentials = credentialRequirements.filter(
    (req) => !req.available
  );
  const availableCredentials = credentialRequirements.filter(
    (req) => req.available
  );

  useEffect(() => {
    const fetchExistingCredentials = async () => {
      const token = await getToken();
      if (!token) return;
      
      try {
        const response = await api.credentials.list(token);
        console.log('[WorkflowCredentials] Existing credentials:', response?.data);
        setExistingCredentials(response?.data || []);
      } catch (error) {
        console.error('Failed to fetch credentials:', error);
      }
    };
    
    fetchExistingCredentials();
  }, [getToken]);

  const handleLinkExisting = async (provider: Provider) => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const existingCred = existingCredentials.find(c => c.provider === provider);
      console.log('[WorkflowCredentials] Linking credential:', { provider, existingCred, allCreds: existingCredentials });
      
      if (!existingCred) {
        toast.error('Credential not found');
        return;
      }

      await api.workflows.associateCredential(token, workflow.id, undefined, [existingCred.id]);
      toast.success('Credential linked successfully');
      window.location.reload();
    } catch (error) {
      console.error('Failed to link credential:', error);
      toast.error('Failed to link credential');
    }
  };

  const handleAddCredentials = async () => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      // Only connect providers that don't have existing credentials
      const providersToConnect = missingCredentials.filter(req => 
        !existingCredentials.some(c => c.provider === req.provider)
      );

      if (providersToConnect.length === 0) {
        toast.info('All required credentials already exist. Please use "Link to this workflow" button.');
        return;
      }

      const nango = new Nango({ publicKey: process.env.NEXT_PUBLIC_NANGO_PUBLIC_KEY || '' });

      const integrationIds = providersToConnect.map(req => req.provider.toLowerCase().replace(/_/g, '-'));
      const sessionResponse = await api.credentials.createConnectSession(token, integrationIds, workflow.id);
      
      if (!sessionResponse?.token) {
        throw new Error('Failed to get session token');
      }

      const connect = nango.openConnectUI({
        onEvent: async (event) => {
          if (event.type === 'close') {
            window.location.reload();
          }
        }
      });

      connect.setSessionToken(sessionResponse.token);
    } catch (error) {
      console.error('Failed to add credentials:', error);
      toast.error('Failed to add credentials');
    }
  };

  const getStatusIcon = (available: boolean, provider: Provider) => {
    const ProviderIcon = Icons[provider.toLowerCase() as keyof typeof Icons];
    if (available) {
      const Icon = ProviderIcon || CheckCircle;
      return <Icon className='h-4 w-4 text-green-500' />;
    }
    const Icon = ProviderIcon || XCircle;
    return <Icon className='h-4 w-4 text-red-500' />;
  };

  const getStatusBadge = (available: boolean) => {
    if (available) {
      return (
        <Badge variant='secondary' className='bg-green-100 text-green-700'>
          Connected
        </Badge>
      );
    }
    return <Badge variant='destructive'>Missing</Badge>;
  };

  if (!hasRequiredCredentials) {
    return (
      <div className='space-y-4'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CheckCircle className='h-5 w-5 text-green-500' />
              No Credentials Required
            </CardTitle>
            <CardDescription>
              This workflow doesn&#39;t require any external service credentials
              to run.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            {credentialStatus.status === 'complete' ? (
              <CheckCircle className='h-5 w-5 text-green-500' />
            ) : (
              <AlertCircle className='h-5 w-5 text-yellow-500' />
            )}
            Credential Status
          </CardTitle>
          <CardDescription>
            {getCredentialStatusText(credentialStatus.status)}
          </CardDescription>
        </CardHeader>
        {credentialStatus.status !== 'complete' && (
          <CardContent>
            <Button
              onClick={handleAddCredentials}
              className='w-full'
            >
              <Plus className='mr-2 h-4 w-4' />
              Add Missing Credentials
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Missing Credentials List */}
      {missingCredentials.length > 0 && (
        <div className='space-y-2'>
          <h4 className='text-sm font-medium'>Missing Credentials</h4>
          {missingCredentials.map((requirement) => {
            const existingCred = existingCredentials.find(c => c.provider === requirement.provider);
            console.log('[WorkflowCredentials] Checking requirement:', { 
              provider: requirement.provider, 
              existingCred,
              allExisting: existingCredentials.map(c => c.provider)
            });
            
            return (
              <Card key={requirement.provider} className='p-3'>
                <div className='flex flex-col gap-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3 min-w-0'>
                      {getStatusIcon(requirement.available, requirement.provider)}
                      <div className='min-w-0'>
                        <div className='text-sm font-medium truncate'>
                          {getProviderDisplayName(requirement.provider)}
                        </div>
                        <div className='text-muted-foreground text-xs break-words'>
                          This service needs to be connected to run this workflow.
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(requirement.available)}
                  </div>
                  
                  {existingCred && (
                    <div className='flex items-center justify-between p-2 bg-muted rounded-md'>
                      <div className='text-xs'>
                        <span className='font-medium'>{existingCred.name}</span> is already connected in another workflow
                      </div>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleLinkExisting(requirement.provider)}
                      >
                        <Link className='mr-1 h-3 w-3' />
                        Link to this workflow
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Available Credentials */}
      {availableCredentials.length > 0 && (
        <div className='space-y-2'>
          <h4 className='text-sm font-medium'>Connected Credentials</h4>
          {availableCredentials.map((requirement) => {
            const credential = workflow.workflowCredentials?.find(
              (wc) => wc.credential.provider === requirement.provider
            )?.credential;

            const ProviderIcon =
              Icons[requirement.provider.toLowerCase() as keyof typeof Icons] ||
              CheckCircle;
            return (
              <Card key={requirement.provider} className='p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <ProviderIcon className='h-4 w-4 text-green-500' />
                    <div>
                      <div className='text-sm font-medium'>
                        {credential?.name ||
                          getProviderDisplayName(requirement.provider)}
                      </div>
                      <div className='text-muted-foreground text-xs'>
                        {getProviderDisplayName(requirement.provider)} •
                        Connected
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant='secondary'
                    className='bg-green-100 text-green-700'
                  >
                    Active
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
