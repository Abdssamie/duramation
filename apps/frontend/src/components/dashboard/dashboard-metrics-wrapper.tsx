'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { SimplifiedMetrics } from '@duramation/shared';
import { dashboardApi } from '@/services/api/api-client';
import { MetricCardSkeleton } from '@/components/ui/metric-card-skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';

interface DashboardMetricsWrapperProps {
  children: (metrics: SimplifiedMetrics) => React.ReactNode;
  fallbackMetrics?: SimplifiedMetrics;
}

export function DashboardMetricsWrapper({ 
  children, 
  fallbackMetrics 
}: DashboardMetricsWrapperProps) {
  const { getToken } = useAuth();
  const [metrics, setMetrics] = useState<SimplifiedMetrics | null>(fallbackMetrics || null);
  const [loading, setLoading] = useState(!fallbackMetrics);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const data = await dashboardApi.getSimplifiedMetrics(token);
      setMetrics(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard metrics';
      setError(errorMessage);
      
      // If we have fallback metrics, use them
      if (fallbackMetrics && !metrics) {
        setMetrics(fallbackMetrics);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fallbackMetrics) {
      fetchMetrics();
    }
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchMetrics();
  };

  // Show loading skeleton if no data and loading
  if (loading && !metrics) {
    return (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <MetricCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Show error state if no data and error
  if (error && !metrics) {
    return (
      <Card className='col-span-full border-destructive'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-destructive'>
            <AlertCircle className="h-5 w-5" />
            Unable to Load Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Alert variant="destructive">
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>

          <div className='space-y-2'>
            <p className='text-muted-foreground text-sm'>
              We couldn't load your dashboard metrics. This might be temporary.
            </p>
          </div>

          <div className='flex gap-2'>
            <Button
              variant='default'
              size='sm'
              onClick={handleRetry}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Retrying...' : 'Try Again'}
            </Button>
          </div>

          {retryCount > 0 && (
            <p className='text-muted-foreground text-xs'>
              Retry attempts: {retryCount}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Show stale data warning if we have metrics but there's an error
  if (error && metrics) {
    return (
      <div className='space-y-4'>
        <Alert variant="default" className='border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'>
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className='text-yellow-800 dark:text-yellow-200'>
            Showing cached data. Unable to fetch latest metrics: {error}
            <Button
              variant='ghost'
              size='sm'
              onClick={handleRetry}
              disabled={loading}
              className="ml-2 h-auto p-1 text-yellow-800 dark:text-yellow-200"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </AlertDescription>
        </Alert>
        {children(metrics)}
      </div>
    );
  }

  // Render with metrics
  if (metrics) {
    return <>{children(metrics)}</>;
  }

  // Fallback - should not reach here
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {Array.from({ length: 8 }).map((_, index) => (
        <MetricCardSkeleton key={index} />
      ))}
    </div>
  );
}