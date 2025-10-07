'use client';

import { Component, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import PageContainer from '@/components/layout/page-container';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  retryCount: number;
}

export class DashboardErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, retryCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Dashboard Error:', error, errorInfo);
    Sentry.captureException(error, {
      contexts: {
        errorBoundary: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: undefined,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <PageContainer>
          <div className='flex flex-1 flex-col space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold tracking-tight'>Dashboard Error</h2>
            </div>

            <Card className='border-destructive'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-destructive'>
                  <AlertCircle className="h-5 w-5" />
                  Unable to Load Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {this.state.error?.message || 'An unexpected error occurred while loading your dashboard.'}
                  </AlertDescription>
                </Alert>

                <div className='space-y-2'>
                  <p className='text-muted-foreground text-sm'>
                    We're experiencing issues loading your dashboard data. This could be due to:
                  </p>
                  <ul className='text-muted-foreground text-sm list-disc list-inside space-y-1'>
                    <li>Temporary network connectivity issues</li>
                    <li>Server maintenance or high load</li>
                    <li>Authentication session expiration</li>
                  </ul>
                </div>

                <div className='flex gap-2'>
                  <Button
                    variant='default'
                    size='sm'
                    onClick={this.handleRetry}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={this.handleRefresh}
                  >
                    Refresh Page
                  </Button>
                </div>

                {this.state.retryCount > 0 && (
                  <p className='text-muted-foreground text-xs'>
                    Retry attempts: {this.state.retryCount}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      );
    }

    return this.props.children;
  }
}