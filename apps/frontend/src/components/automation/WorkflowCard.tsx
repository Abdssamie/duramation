import { memo } from 'react';
import { WorkflowWithCredentials } from '@/types/workflow';
import { Provider } from '@duramation/integrations';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import CredentialRequirementIndicator from '@/features/automation/components/CredentialRequirementIndicator';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export const WorkflowCard = memo(function WorkflowCard({
  workflow,
  onOpenDetails,
  hasNewVersion = false
}: {
  workflow: WorkflowWithCredentials;
  onOpenDetails: (workflow: WorkflowWithCredentials) => void;
  hasNewVersion?: boolean;
}) {
  const schedules = Array.isArray(workflow.cronExpressions)
    ? workflow.cronExpressions
    : [];
  const creds = Array.isArray(workflow.workflowCredentials)
    ? workflow.workflowCredentials.map((wc) => wc.credential)
    : [];
  const running = String(workflow.status) === 'RUNNING';
  const scheduled = schedules.length > 0;
  const status = String(workflow.status || '').toUpperCase();
  const statusLabel =
    status === 'RUNNING'
      ? 'Running'
      : status === 'FAILED'
        ? 'Failed'
        : status === 'PAUSED'
          ? 'Paused'
          : status === 'COMPLETED'
            ? 'Completed'
            : status === 'IDLE'
              ? 'Idle'
              : status
                ? status.charAt(0) + status.slice(1).toLowerCase()
                : 'Unknown';
  const statusColorClass =
    status === 'RUNNING'
      ? 'text-green-600 dark:text-green-400'
      : status === 'FAILED'
        ? 'text-red-600 dark:text-red-400'
        : status === 'PAUSED'
          ? 'text-amber-600 dark:text-amber-400'
          : status === 'COMPLETED'
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-slate-600 dark:text-slate-400';

  // Simple credential status calculation
  const requiredProviders = (workflow.requiredProviders as Provider[]) || [];

  const headingId = `workflow-title-${workflow.id}`;

  return (
    <Card
      className='flex flex-col transition-shadow hover:shadow-md'
      role='region'
      aria-labelledby={headingId}
    >
      <CardHeader>
        <CardTitle id={headingId} className='flex items-center gap-2 text-base'>
          {running ? (
            <span
              className='inline-block size-2 animate-pulse rounded-full bg-green-500'
              role='img'
              aria-label='Running'
              title='Running'
            />
          ) : scheduled ? (
            <span
              className='inline-block size-2 animate-pulse rounded-full bg-yellow-400'
              role='img'
              aria-label='Scheduled'
              title='Scheduled'
            />
          ) : (
            <span
              className='inline-block size-2 rounded-full'
              style={{
                backgroundColor:
                  workflow.status === 'FAILED' ? '#ef4444' : '#94a3b8'
              }}
              role='img'
              aria-label={workflow.status === 'FAILED' ? 'Failed' : 'Idle'}
            />
          )}
          <span
            className='flex-1 truncate'
            title={workflow.name || 'Untitled workflow'}
          >
            {workflow.name || 'Untitled workflow'}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-3 text-sm'>
        {hasNewVersion && (
          <span className='bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-semibold'>
            New Version Available
          </span>
        )}
        {workflow.description && (
          <p className='text-muted-foreground line-clamp-2'>
            {workflow.description}
          </p>
        )}

        <div className='grid grid-cols-2 gap-3 text-xs'>
          <div>
            <div className='text-muted-foreground'>Status</div>
            <div className={`font-medium ${statusColorClass}`}>
              {statusLabel}
            </div>
          </div>
          {workflow.nextRunAt && (
            <div>
              <div className='text-muted-foreground'>Next run</div>
              <div
                className='text-xs font-medium'
                title={new Date(workflow.nextRunAt).toLocaleString()}
              >
                {formatDistanceToNow(new Date(workflow.nextRunAt), {
                  addSuffix: true
                })}
              </div>
            </div>
          )}
          <div>
            <div className='text-muted-foreground'>Schedules</div>
            <div className='font-medium'>
              {schedules.length > 0 ? schedules.length : '—'}
            </div>
          </div>
        </div>

        {/* Simple credential status */}
        {requiredProviders.length > 0 && (
          <div className='space-y-2'>
            <CredentialRequirementIndicator
              requiredProviders={requiredProviders}
              availableCredentials={creds.map((c) => ({
                id: c.id,
                provider: c.provider as Provider,
                name: c.name
              }))}
              showAddButton={false}
              compact={true}
            />
          </div>
        )}

        {requiredProviders.length === 0 && creds.length > 0 && (
          <div className='text-muted-foreground text-xs'>
            {creds.length} service{creds.length !== 1 ? 's' : ''} connected
          </div>
        )}
      </CardContent>

      <CardFooter className='mt-auto'>
        <Button
          aria-label={`Open details for ${workflow.name || 'Untitled workflow'}`}
          onClick={() => onOpenDetails(workflow)}
          className='w-full'
          variant='outline'
        >
          <ExternalLink className='mr-2 h-4 w-4' />
          Open Details
        </Button>
      </CardFooter>
    </Card>
  );
});
