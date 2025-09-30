'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  IconClock,
  IconShield,
  IconCurrencyDollar,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus
} from '@tabler/icons-react';

interface ROIMetric {
  id: string;
  type: 'time_saved' | 'errors_prevented' | 'cost_savings';
  title: string;
  value: number;
  unit: string;
  trend: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    period: string;
  };
  description: string;
}

interface ROIMetricsDisplayProps {
  className?: string;
}

export function ROIMetricsDisplay({ className }: ROIMetricsDisplayProps) {
  const [metrics, setMetrics] = useState<ROIMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchROIMetrics();
  }, []);

  const fetchROIMetrics = async () => {
    try {
      setLoading(true);

      // Call the backend API endpoint for ROI metrics
      const response = await fetch(
        `${process.env.NEXT_BACKEND_API_URL}/api/client-dashboard/roi-data`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch ROI metrics');
      }

      const data = await response.json();

      if (data.success) {
        setMetrics(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch ROI metrics');
      }
    } catch (err) {
      // Fallback to mock data for development
      console.warn('Using mock data for ROI metrics:', err);
      const mockData: ROIMetric[] = [
        {
          id: '1',
          type: 'time_saved',
          title: 'Time Saved',
          value: 127.5,
          unit: 'hours',
          trend: {
            direction: 'up',
            percentage: 23.5,
            period: 'vs last month'
          },
          description: 'Total automation time savings this month'
        },
        {
          id: '2',
          type: 'errors_prevented',
          title: 'Errors Prevented',
          value: 89,
          unit: 'incidents',
          trend: {
            direction: 'up',
            percentage: 12.3,
            period: 'vs last month'
          },
          description: 'Manual errors avoided through automation'
        },
        {
          id: '3',
          type: 'cost_savings',
          title: 'Cost Savings',
          value: 4250,
          unit: '$',
          trend: {
            direction: 'up',
            percentage: 18.7,
            period: 'vs last month'
          },
          description: 'Estimated cost savings from automation'
        }
      ];

      setMetrics(mockData);
      setError('Failed to load ROI metrics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ROIMetricsSkeleton />;
  }

  if (error) {
    return (
      <div className='py-8 text-center'>
        <p className='text-muted-foreground text-sm'>{error}</p>
        <button
          onClick={fetchROIMetrics}
          className='text-primary mt-2 text-sm hover:underline'
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {metrics.map((metric) => (
        <ROIMetricCard key={metric.id} metric={metric} />
      ))}

      {/* Summary Card */}
      <Card className='from-primary/5 to-primary/10 border-primary/20 bg-gradient-to-r'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-primary text-sm font-medium'>
            Monthly Impact Summary
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-0'>
          <div className='text-muted-foreground text-xs'>
            Your automations are delivering significant value across all key
            metrics. Keep up the great work!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface ROIMetricCardProps {
  metric: ROIMetric;
}

function ROIMetricCard({ metric }: ROIMetricCardProps) {
  const getMetricIcon = (type: ROIMetric['type']) => {
    switch (type) {
      case 'time_saved':
        return <IconClock className='h-4 w-4 text-blue-500' />;
      case 'errors_prevented':
        return <IconShield className='h-4 w-4 text-green-500' />;
      case 'cost_savings':
        return <IconCurrencyDollar className='h-4 w-4 text-emerald-500' />;
      default:
        return <IconClock className='h-4 w-4 text-gray-500' />;
    }
  };

  const getTrendIcon = (direction: ROIMetric['trend']['direction']) => {
    switch (direction) {
      case 'up':
        return <IconTrendingUp className='h-3 w-3 text-green-500' />;
      case 'down':
        return <IconTrendingDown className='h-3 w-3 text-red-500' />;
      case 'stable':
        return <IconMinus className='h-3 w-3 text-gray-500' />;
      default:
        return null;
    }
  };

  const getTrendColor = (direction: ROIMetric['trend']['direction']) => {
    switch (direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return `$${value.toLocaleString()}`;
    } else if (unit === 'hours') {
      return `${value} hrs`;
    } else {
      return `${value} ${unit}`;
    }
  };

  return (
    <Card className='transition-shadow hover:shadow-sm'>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            {getMetricIcon(metric.type)}
            <CardTitle className='text-sm font-medium'>
              {metric.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='space-y-2'>
          <div className='flex items-baseline space-x-2'>
            <span className='text-2xl font-bold'>
              {formatValue(metric.value, metric.unit)}
            </span>
          </div>

          <div className='flex items-center space-x-1'>
            {getTrendIcon(metric.trend.direction)}
            <span
              className={cn(
                'text-xs font-medium',
                getTrendColor(metric.trend.direction)
              )}
            >
              {metric.trend.direction === 'stable'
                ? 'No change'
                : `${metric.trend.percentage}%`}
            </span>
            <span className='text-muted-foreground text-xs'>
              {metric.trend.period}
            </span>
          </div>

          <p className='text-muted-foreground mt-2 text-xs'>
            {metric.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ROIMetricsSkeleton() {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className='pb-3'>
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-4 w-4 rounded' />
              <Skeleton className='h-4 w-20' />
            </div>
          </CardHeader>
          <CardContent className='pt-0'>
            <div className='space-y-2'>
              <Skeleton className='h-8 w-16' />
              <div className='flex items-center space-x-1'>
                <Skeleton className='h-3 w-3 rounded' />
                <Skeleton className='h-3 w-8' />
                <Skeleton className='h-3 w-16' />
              </div>
              <Skeleton className='h-3 w-full' />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Summary Card Skeleton */}
      <Card>
        <CardHeader className='pb-3'>
          <Skeleton className='h-4 w-32' />
        </CardHeader>
        <CardContent className='pt-0'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='mt-1 h-3 w-3/4' />
        </CardContent>
      </Card>
    </div>
  );
}
