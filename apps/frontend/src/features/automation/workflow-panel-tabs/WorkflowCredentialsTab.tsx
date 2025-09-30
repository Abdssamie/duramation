'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Plus, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { WorkflowWithCredentials } from '@/types/workflow';
import { Provider } from '@duramation/db/types';
import {
  mapCredentialRequirements,
  getProviderDisplayName,
  getCredentialStatusText,
  calculateCredentialStatus
} from '@/utils/workflow-credentials';
import WorkflowCredentialManager from '@/features/automation/components/WorkflowCredentialManager';
import { Icons } from '@/components/icons';

interface WorkflowCredentialsTabProps {
  workflow: WorkflowWithCredentials;
}

export default function WorkflowCredentialsTab({
  workflow
}: WorkflowCredentialsTabProps) {
  const [showCredentialManager, setShowCredentialManager] = useState(false);
  const credentialRequirements = mapCredentialRequirements(workflow);
  const credentialStatus = calculateCredentialStatus(workflow);
  const hasRequiredCredentials = credentialRequirements.length > 0;
  const missingCredentials = credentialRequirements.filter(
    (req) => !req.available
  );
  const availableCredentials = credentialRequirements.filter(
    (req) => req.available
  );

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
              onClick={() => setShowCredentialManager(true)}
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
          {missingCredentials.map((requirement) => (
            <Card key={requirement.provider} className='p-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  {getStatusIcon(requirement.available, requirement.provider)}
                  <div>
                    <div className='text-sm font-medium'>
                      {getProviderDisplayName(requirement.provider)}
                    </div>
                    {requirement.scopes && requirement.scopes.length > 0 && (
                      <div className='text-muted-foreground text-xs'>
                        Scopes: {requirement.scopes.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
                {getStatusBadge(requirement.available)}
              </div>
            </Card>
          ))}
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

      {/* Credential Manager Modal */}
      {showCredentialManager && (
        <WorkflowCredentialManager
          open={showCredentialManager}
          workflowId={workflow.id}
          requiredProviders={missingCredentials.map((req) => req.provider)}
          requiredScopes={workflow.requiredScopes}
          onCredentialAdded={() => {
            // Refresh workflow data - this would typically trigger a refetch
            setShowCredentialManager(false);
          }}
          onClose={() => setShowCredentialManager(false)}
        />
      )}
    </div>
  );
}
