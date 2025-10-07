'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCw, MessageSquare, WifiOff } from 'lucide-react';
import { ServiceRequestsResponse } from '@duramation/shared';
import { dashboardApi } from '@/services/api/api-client';

import { RecentServiceRequestsClient } from './recent-service-requests-client';

interface RecentServiceRequestsWrapperProps {
  fallbackData?: ServiceRequestsResponse;
}

export function RecentServiceRequestsWrapper({
  fallbackData
}: RecentServiceRequestsWrapperProps) {
  const { getToken } = useAuth();
  const [data, setData] = useState<ServiceRequestsResponse | null>(fallbackData || null);
  const [loading, setLoading] = useState(!fallbackData);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchServiceRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await dashboardApi.getServiceRequests(token);
      setData(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load service requests';
      setError(errorMessage);

      // If we have fallback data, use it
      if (fallbackData && !data) {
        setData(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fallbackData) {
      fetchServiceRequests();
    }
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchServiceRequests();
  };

  // Show loading skeleton if no data and loading
  if (loading && !data) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-8 w-8 mx-auto mb-2" />
                  <Skeleton className="h-3 w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state if no data and error
  if (error && !data) {
    return (
      <Card className='border-destructive'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-destructive'>
            <AlertCircle className="h-5 w-5" />
            Service Requests Error
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
              Unable to load recent service requests. This might be temporary.
            </p>
            <ul className='text-muted-foreground text-xs list-disc list-inside space-y-1'>
              <li>Check your internet connection</li>
              <li>Try refreshing the page</li>
              <li>Contact support if the issue persists</li>
            </ul>
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

  // Show stale data warning if we have data but there's an error
  if (error && data) {
    return (
      <div className='space-y-4'>
        <Alert variant="default" className='border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'>
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className='text-yellow-800 dark:text-yellow-200'>
            Showing cached data. Unable to fetch latest service requests: {error}
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
        <RecentServiceRequestsClient data={data} />
      </div>
    );
  }

  // Show empty state if no requests
  if (data && data.requests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Service Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-medium mb-2">No Service Requests</h3>
            <p className="text-sm">Submit a service request and we'll book a sales call with you as soon as possible.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render with data
  if (data) {
    return <RecentServiceRequestsClient data={data} />;
  }

  // Fallback - should not reach here
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  );
}