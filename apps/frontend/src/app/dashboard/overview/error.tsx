'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import * as Sentry from '@sentry/nextjs';
import PageContainer from '@/components/layout/page-container';

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  const handleGoHome = () => {
    router.push('/dashboard');
  };

  const getErrorMessage = () => {
    if (error.message.includes('Unauthorized')) {
      return 'Your session has expired. Please sign in again.';
    }
    if (error.message.includes('Network')) {
      return 'Network connection issue. Please check your internet connection.';
    }
    if (error.message.includes('timeout')) {
      return 'Request timed out. The server may be experiencing high load.';
    }
    return error.message || 'An unexpected error occurred while loading the dashboard.';
  };

  const getErrorSuggestions = () => {
    if (error.message.includes('Unauthorized')) {
      return [
        'Try signing out and signing back in',
        'Clear your browser cache and cookies',
        'Contact support if the issue persists'
      ];
    }
    if (error.message.includes('Network')) {
      return [
        'Check your internet connection',
        'Try refreshing the page',
        'Disable any VPN or proxy connections'
      ];
    }
    return [
      'Try refreshing the page',
      'Wait a few moments and try again',
      'Contact support if the issue continues'
    ];
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>Dashboard Error</h2>
        </div>

        <Card className='border-destructive max-w-2xl mx-auto'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-destructive'>
              <AlertCircle className="h-5 w-5" />
              Failed to Load Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Details</AlertTitle>
              <AlertDescription className='mt-2'>
                {getErrorMessage()}
              </AlertDescription>
            </Alert>

            <div className='space-y-3'>
              <h4 className='font-medium text-sm'>What you can try:</h4>
              <ul className='text-muted-foreground text-sm space-y-1'>
                {getErrorSuggestions().map((suggestion, index) => (
                  <li key={index} className='flex items-start gap-2'>
                    <span className='text-primary'>•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                onClick={handleRetry}
                disabled={isPending}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
                {isPending ? 'Retrying...' : 'Try Again'}
              </Button>
              <Button
                variant='outline'
                onClick={handleGoHome}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Go to Dashboard Home
              </Button>
            </div>

            {error.digest && (
              <div className='pt-4 border-t'>
                <p className='text-muted-foreground text-xs'>
                  Error ID: {error.digest}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}