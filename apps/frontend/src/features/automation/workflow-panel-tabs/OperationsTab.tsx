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
  schedules: string[]; // list of cron expressions
  input: Record<string, unknown>;
  isRunning: boolean;
  setIsRunningAction: Dispatch<SetStateAction<boolean>>;
};

export default function OperationsTab({
  onUpdateAction,
  workflow,
  schedules,
  input,
  isRunning,
  setIsRunningAction
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
      // Avoid duplicate clicks while running or pending
      toast.info('Workflow is already running');
      return;
    }
    setIsRequestPending(true);

    try {
      const freshToken = await getToken();
      if (!freshToken) {
        toast.error('Authentication failed. Please refresh the page.');
        return;
      }

      let parsedInput = {};
      try {
        parsedInput = input;
      } catch (e) {
        console.debug(e);
        toast.error('Invalid input JSON');
        return;
      }

      await api.workflows.run(freshToken, workflow.id, {
        input: parsedInput
      });
      onUpdateAction(workflow.id, { status: 'RUNNING', input: parsedInput });
      setIsRunningAction(true);
      toast.success('Workflow started');
    } catch (error) {
      console.debug(error);
      toast.error('Failed to run workflow');
    } finally {
      setIsRequestPending(false);
    }
  };

  const handleStop = async () => {
    if (!workflow) return;

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
              {isRunning || isRequestPending ? 'Running...' : 'Run Now'}
            </Button>
            <Button
              onClick={handleStop}
              variant='outline'
              disabled={!isRunning}
              className='flex-1'
            >
              <Square className='mr-1 h-4 w-4' />
              Stop
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
              <div className='text-muted-foreground text-xs'> Schedules </div>
              <div className='font-medium'> {schedules.length} </div>
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
