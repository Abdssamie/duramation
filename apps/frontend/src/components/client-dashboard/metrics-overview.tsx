'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricData {
  totalRuns: number;
  successRate: number;
  avgDuration: number;
  timeSavedHours: number;
  costSavings: number;
  errorsPrevented: number;
  trend: {
    runs: number;
    successRate: number;
    timeSaved: number;
    costSavings: number;
  };
}

interface MetricsOverviewProps {
  userId?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  className?: string;
}

export function MetricsOverview({
  userId,
  dateRange,
  className
}: MetricsOverviewProps) {
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (dateRange) {
          params.append('from', dateRange.from.toISOString());
          params.append('to', dateRange.to.toISOString());
        }

        const response = await fetch(
          `${process.env.NEXT_BACKEND_API_URL}/api/client-dashboard/metrics?${params}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch metrics');
        }

        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [userId, dateRange]);

  if (loading) {
    return <MetricsOverviewSkeleton className={className} />;
  }

  if (error) {
    return (
      <div className={cn('space-y-4', className)}>
        <Alert variant='destructive'>
          <XCircle className='h-4 w-4' />
          <AlertDescription>Failed to load metrics: {error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className={cn('space-y-4', className)}>
        <Alert>
          <Activity className='h-4 w-4' />
          <AlertDescription>
            No metrics data available. Start running automations to see
            performance insights.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {/* Total Runs */}
      <MetricCard
        title='Total Runs'
        value={metrics.totalRuns.toLocaleString()}
        icon={<Activity className='h-4 w-4' />}
        trend={metrics.trend.runs}
        trendLabel='vs last period'
      />

      {/* Success Rate */}
      <MetricCard
        title='Success Rate'
        value={`${metrics.successRate.toFixed(1)}%`}
        icon={<CheckCircle className='h-4 w-4' />}
        trend={metrics.trend.successRate}
        trendLabel='vs last period'
        trendSuffix='%'
      />

      {/* Average Duration */}
      <MetricCard
        title='Avg Duration'
        value={formatDuration(metrics.avgDuration)}
        icon={<Clock className='h-4 w-4' />}
        description='Average execution time'
      />

      {/* Time Saved */}
      <MetricCard
        title='Time Saved'
        value={`${metrics.timeSavedHours.toFixed(1)}h`}
        icon={<Zap className='h-4 w-4' />}
        trend={metrics.trend.timeSaved}
        trendLabel='vs last period'
        trendSuffix='h'
        description='Estimated manual work avoided'
      />

      {/* Cost Savings */}
      <MetricCard
        title='Cost Savings'
        value={`$${metrics.costSavings.toLocaleString()}`}
        icon={<DollarSign className='h-4 w-4' />}
        trend={metrics.trend.costSavings}
        trendLabel='vs last period'
        trendPrefix='$'
        description='Based on time savings'
      />

      {/* Errors Prevented */}
      <MetricCard
        title='Errors Prevented'
        value={metrics.errorsPrevented.toLocaleString()}
        icon={<XCircle className='h-4 w-4' />}
        description='Estimated manual errors avoided'
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  trendPrefix?: string;
  trendSuffix?: string;
  description?: string;
}

function MetricCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  trendPrefix = '',
  trendSuffix = '',
  description
}: MetricCardProps) {
  const isPositiveTrend = trend !== undefined && trend > 0;
  const isNegativeTrend = trend !== undefined && trend < 0;

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <div className='text-muted-foreground'>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        {trend !== undefined && (
          <div className='text-muted-foreground flex items-center space-x-1 text-xs'>
            {isPositiveTrend && (
              <TrendingUp className='h-3 w-3 text-green-500' />
            )}
            {isNegativeTrend && (
              <TrendingDown className='h-3 w-3 text-red-500' />
            )}
            <Badge
              variant={
                isPositiveTrend
                  ? 'default'
                  : isNegativeTrend
                    ? 'destructive'
                    : 'secondary'
              }
              className='text-xs'
            >
              {trend > 0 ? '+' : ''}
              {trendPrefix}
              {Math.abs(trend).toFixed(1)}
              {trendSuffix}
            </Badge>
            {trendLabel && <span>{trendLabel}</span>}
          </div>
        )}
        {description && (
          <p className='text-muted-foreground mt-1 text-xs'>{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

function formatDuration(milliseconds: number): string {
  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  }

  const seconds = milliseconds / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${minutes.toFixed(1)}m`;
  }

  const hours = minutes / 60;
  return `${hours.toFixed(1)}h`;
}

function MetricsOverviewSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-4' />
          </CardHeader>
          <CardContent>
            <Skeleton className='mb-2 h-8 w-16' />
            <Skeleton className='h-4 w-24' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
