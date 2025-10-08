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
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { getWorkflowStatusDisplay, getWorkflowStatusColorClass } from '@/utils/workflow-sanitizer';
import Link from 'next/link';

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
  const statusLabel = getWorkflowStatusDisplay(workflow.status);
  const statusColorClass = getWorkflowStatusColorClass(workflow.status);

  // Simple credential status calculation
  const requiredProviders = (workflow.requiredProviders as Provider[]) || [];

  const headingId = `workflow-title-${workflow.id}`;

  return (
    <Card
      className={`flex flex-col transition-all duration-200 hover:shadow-md ${hasNewVersion ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}
      role='region'
      aria-labelledby={headingId}
    >
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-2'>
          <CardTitle id={headingId} className='flex items-center gap-2 text-base flex-1 min-w-0'>
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
              className='truncate'
              title={workflow.name || 'Untitled workflow'}
            >
              {workflow.name || 'Untitled workflow'}
            </span>
          </CardTitle>
          
          {hasNewVersion && (
            <div className='flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium shrink-0'>
              <Sparkles className='h-3 w-3' />
              <span>Update</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className='space-y-3 text-sm'>
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

      <CardFooter className='mt-auto pt-4'>
        <div className='flex flex-col gap-3 w-full'>
          {hasNewVersion && (
            <Button
              asChild
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0'
            >
              <Link href='/dashboard/marketplace'>
                <ArrowUpRight className='mr-2 h-4 w-4' />
                Update Available
              </Link>
            </Button>
          )}
          <Button
            aria-label={`Open details for ${workflow.name || 'Untitled workflow'}`}
            onClick={() => onOpenDetails(workflow)}
            className='w-full'
            variant={hasNewVersion ? 'outline' : 'outline'}
          >
            <ExternalLink className='mr-2 h-4 w-4' />
            Open Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
});
