'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  IconPlayerPlay,
  IconCheck,
  IconX,
  IconClock,
  IconTrendingUp,
  IconTrendingDown
} from '@tabler/icons-react';

interface WorkflowRunStatus {
  id: string;
  name: string;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'STARTED';
  lastRunAt?: Date;
  successRate: number;
  totalRuns: number;
  recentTrend: 'up' | 'down' | 'stable';
}

interface AutomationStatusCardsProps {
  className?: string;
}

export function AutomationStatusCards({
  className
}: AutomationStatusCardsProps) {
  const [workflowStatuses, setWorkflowStatuses] = useState<WorkflowRunStatus[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkflowStatuses();
  }, []);

  const fetchWorkflowStatuses = async () => {
    try {
      setLoading(true);

      // Call the backend API endpoint for workflow status
      const response = await fetch(
        `${process.env.NEXT_BACKEND_API_URL}/api/workflows/status`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch workflow statuses');
      }

      const data = await response.json();

      if (data.success) {
        setWorkflowStatuses(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch workflow statuses');
      }
    } catch (err) {
      // Fallback to mock data for development
      console.warn('Using mock data for workflow statuses:', err);
      const mockData: WorkflowRunStatus[] = [
        {
          id: '1',
          name: 'Order Processing',
          status: 'RUNNING',
          lastRunAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
          successRate: 98.5,
          totalRuns: 1247,
          recentTrend: 'up'
        },
        {
          id: '2',
          name: 'Inventory Sync',
          status: 'COMPLETED',
          lastRunAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
          successRate: 95.2,
          totalRuns: 892,
          recentTrend: 'stable'
        },
        {
          id: '3',
          name: 'Customer Notifications',
          status: 'FAILED',
          lastRunAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          successRate: 87.3,
          totalRuns: 2156,
          recentTrend: 'down'
        },
        {
          id: '4',
          name: 'Report Generation',
          status: 'COMPLETED',
          lastRunAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          successRate: 99.1,
          totalRuns: 456,
          recentTrend: 'up'
        }
      ];

      setWorkflowStatuses(mockData);
      setError('Failed to load automation status - using mock data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AutomationStatusSkeleton />;
  }

  if (error) {
    return (
      <div className='py-8 text-center'>
        <p className='text-muted-foreground text-sm'>{error}</p>
        <button
          onClick={fetchWorkflowStatuses}
          className='text-primary mt-2 text-sm hover:underline'
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-2', className)}>
      {workflowStatuses.map((workflow) => (
        <AutomationStatusCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}

interface AutomationStatusCardProps {
  workflow: WorkflowRunStatus;
}

function AutomationStatusCard({ workflow }: AutomationStatusCardProps) {
  const getStatusIcon = (status: WorkflowRunStatus['status']) => {
    switch (status) {
      case 'RUNNING':
        return <IconPlayerPlay className='h-4 w-4 text-blue-500' />;
      case 'COMPLETED':
        return <IconCheck className='h-4 w-4 text-green-500' />;
      case 'FAILED':
        return <IconX className='h-4 w-4 text-red-500' />;
      case 'STARTED':
        return <IconClock className='h-4 w-4 text-yellow-500' />;
      default:
        return <IconClock className='h-4 w-4 text-gray-500' />;
    }
  };

  const getStatusBadge = (status: WorkflowRunStatus['status']) => {
    switch (status) {
      case 'RUNNING':
        return (
          <Badge variant='outline' className='border-blue-200 text-blue-600'>
            Running
          </Badge>
        );
      case 'COMPLETED':
        return (
          <Badge variant='outline' className='border-green-200 text-green-600'>
            Completed
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge variant='outline' className='border-red-200 text-red-600'>
            Failed
          </Badge>
        );
      case 'STARTED':
        return (
          <Badge
            variant='outline'
            className='border-yellow-200 text-yellow-600'
          >
            Starting
          </Badge>
        );
      default:
        return <Badge variant='outline'>Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend: WorkflowRunStatus['recentTrend']) => {
    switch (trend) {
      case 'up':
        return <IconTrendingUp className='h-3 w-3 text-green-500' />;
      case 'down':
        return <IconTrendingDown className='h-3 w-3 text-red-500' />;
      default:
        return null;
    }
  };

  const formatLastRun = (date?: Date) => {
    if (!date) return 'Never';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className='transition-shadow hover:shadow-md'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            {getStatusIcon(workflow.status)}
            <CardTitle className='text-sm font-medium'>
              {workflow.name}
            </CardTitle>
          </div>
          {getStatusBadge(workflow.status)}
        </div>
        <CardDescription className='text-xs'>
          Last run: {formatLastRun(workflow.lastRunAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Success Rate</span>
            <div className='flex items-center space-x-1'>
              <span className='font-medium'>{workflow.successRate}%</span>
              {getTrendIcon(workflow.recentTrend)}
            </div>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Total Runs</span>
            <span className='font-medium'>
              {workflow.totalRuns.toLocaleString()}
            </span>
          </div>

          {/* Success rate progress bar */}
          <div className='mt-3'>
            <div className='mb-1 flex items-center justify-between text-xs'>
              <span className='text-muted-foreground'>Health</span>
            </div>
            <div className='h-1.5 w-full rounded-full bg-gray-200'>
              <div
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  workflow.successRate >= 95
                    ? 'bg-green-500'
                    : workflow.successRate >= 85
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                )}
                style={{ width: `${workflow.successRate}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AutomationStatusSkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className='pb-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Skeleton className='h-4 w-4 rounded' />
                <Skeleton className='h-4 w-24' />
              </div>
              <Skeleton className='h-5 w-16 rounded-full' />
            </div>
            <Skeleton className='h-3 w-20' />
          </CardHeader>
          <CardContent className='pt-0'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-3 w-16' />
                <Skeleton className='h-3 w-12' />
              </div>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-3 w-16' />
                <Skeleton className='h-3 w-12' />
              </div>
              <div className='mt-3'>
                <Skeleton className='mb-1 h-3 w-10' />
                <Skeleton className='h-1.5 w-full rounded-full' />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
