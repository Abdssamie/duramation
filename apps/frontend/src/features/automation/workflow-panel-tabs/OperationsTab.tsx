'use client';

import { useAuth } from '@clerk/nextjs';
import api from '@/services/api/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@radix-ui/react-tabs';
import { toast } from 'sonner';
import { Dispatch, SetStateAction, useState } from 'react';
import { WorkflowWithCredentials } from '@/types/workflow';
import { Play, Square, AlertCircle, CheckCircle } from 'lucide-react';
import {
  calculateCredentialStatus,
  getCredentialStatusText
} from '@/utils/workflow-credentials';

type Props = {
  onUpdateAction: (
    id: string,
    update: Partial<WorkflowWithCredentials>
  ) => void;
  workflow: WorkflowWithCredentials;
  input: Record<string, unknown>;
  isRunning: boolean;
  setIsRunningAction: Dispatch<SetStateAction<boolean>>;
  onWorkflowStart?: () => void;
};

export default function OperationsTab({
  onUpdateAction,
  workflow,
  input,
  isRunning,
  setIsRunningAction,
  onWorkflowStart
}: Props) {
  const { getToken } = useAuth();
  const [isRequestPending, setIsRequestPending] = useState(false);

  const credentialStatus = calculateCredentialStatus(workflow);
  const hasCredentialIssues =
    credentialStatus.status !== 'complete' &&
    workflow.requiredProviders.length > 0;

  const handleRun = async () => {
    if (!workflow) return;
    if (isRunning || isRequestPending) {
      toast.info('Workflow is already running');
      return;
    }
    setIsRequestPending(true);
    setIsRunningAction(true); // Set to "Starting" state immediately

    try {
      const freshToken = await getToken();
      if (!freshToken) {
        toast.error('Authentication failed. Please refresh the page.');
        setIsRunningAction(false);
        return;
      }

      let parsedInput = {};
      try {
        parsedInput = input;
      } catch (e) {
        console.debug(e);
        toast.error('Invalid input JSON');
        setIsRunningAction(false);
        return;
      }

      await api.workflows.run(freshToken, workflow.id, {
        input: parsedInput
      });
      onUpdateAction(workflow.id, { status: 'RUNNING', input: parsedInput });
      toast.success('Workflow started');
      onWorkflowStart?.(); // Switch to logs tab
    } catch (error: any) {
      console.debug(error);
      setIsRunningAction(false); // Reset on error
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to run workflow';
      
      const isInputError = errorMessage.toLowerCase().includes('input') || 
                          errorMessage.toLowerCase().includes('validation') ||
                          errorMessage.toLowerCase().includes('required') ||
                          errorMessage.toLowerCase().includes('invalid');
      
      if (isInputError) {
        toast.error(
          <div className="space-y-1">
            <div className="font-semibold">Failed to start workflow</div>
            <div className="text-sm">{errorMessage}</div>
            <div className="text-xs text-muted-foreground">Check the Input tab for validation errors</div>
          </div>,
          { duration: 5000 }
        );
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsRequestPending(false);
    }
  };

  const handleStop = async () => {
    if (!workflow || isRequestPending) return;
    
    setIsRequestPending(true);

    try {
      const freshToken = await getToken();
      if (!freshToken) {
        toast.error('Authentication failed. Please refresh the page.');
        return;
      }

      await api.workflows.stop(freshToken, workflow.id);
      onUpdateAction(workflow.id, { status: 'IDLE' });
      setIsRunningAction(false);
      toast.success('Workflow stopped');
    } catch (error) {
      console.debug(error);
      toast.error('Failed to stop workflow');
    } finally {
      setIsRequestPending(false);
    }
  };

  return (
    <TabsContent value='operations' className='mt-0 space-y-4'>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'> Quick Actions </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          {/* Credential Status Warning */}
          {hasCredentialIssues && (
            <div className='flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-700'>
              <AlertCircle className='h-4 w-4' />
              <div>
                <div className='font-medium'>Credentials Required</div>
                <div>{getCredentialStatusText(credentialStatus.status)}</div>
              </div>
            </div>
          )}

          <div className='flex gap-2'>
            <Button
              onClick={handleRun}
              disabled={isRunning || isRequestPending || hasCredentialIssues}
              className='flex-1'
              title={
                hasCredentialIssues
                  ? 'Configure required credentials first'
                  : undefined
              }
            >
              <Play className='mr-1 h-4 w-4' />
              {isRequestPending && !workflow.status.includes('RUNNING') ? 'Starting...' : isRunning ? 'Running...' : 'Run Now'}
            </Button>
            <Button
              onClick={handleStop}
              variant='outline'
              disabled={!isRunning || isRequestPending}
              className='flex-1'
            >
              <Square className='mr-1 h-4 w-4' />
              {isRequestPending && isRunning ? 'Stopping...' : 'Stop'}
            </Button>
          </div>

          <div className='flex items-center justify-between text-xs'>
            <div className='text-muted-foreground'>
              Status: <span className='font-medium'> {workflow.status} </span>
            </div>
            {workflow.requiredProviders.length > 0 && (
              <div className='flex items-center gap-1'>
                {credentialStatus.status === 'complete' ? (
                  <CheckCircle className='h-3 w-3 text-green-500' />
                ) : (
                  <AlertCircle className='h-3 w-3 text-yellow-500' />
                )}
                <span className='text-muted-foreground'>
                  {credentialStatus.available}/{credentialStatus.total}{' '}
                  credentials
                </span>
              </div>
            )}
          </div>

          {workflow.description && (
            <div className='text-muted-foreground text-sm'>
              {workflow.description}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'> Workflow Info </CardTitle>
        </CardHeader>
        <CardContent className='space-y-2 text-sm'>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <div className='text-muted-foreground text-xs'> Available </div>
              <div className='font-medium'>
                {' '}
                {workflow.available ? 'Yes' : 'No'}{' '}
              </div>
            </div>
            <div>
              <div className='text-muted-foreground text-xs'> Schedulable </div>
              <div className='font-medium'>
                {' '}
                {workflow.canBeScheduled ? 'Yes' : 'No'}{' '}
              </div>
            </div>
            <div>
              <div className='text-muted-foreground text-xs'> Trigger </div>
              <div className='font-medium truncate max-w-[120px]' title={workflow.eventName}> {workflow.eventName} </div>
            </div>
          </div>

          {workflow.nextRunAt && (
            <div>
              <div className='text-muted-foreground text-xs'> Next run </div>
              <div className='text-xs font-medium'>
                {' '}
                {new Date(workflow.nextRunAt).toLocaleString()}{' '}
              </div>
            </div>
          )}

          {workflow.lastRunAt && (
            <div>
              <div className='text-muted-foreground text-xs'> Last run </div>
              <div className='text-xs font-medium'>
                {' '}
                {new Date(workflow.lastRunAt).toLocaleString()}{' '}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
