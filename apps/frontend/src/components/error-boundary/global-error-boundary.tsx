'use client';

import { Component, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorId: Math.random().toString(36).substring(2, 15)
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Global Error Boundary:', error, errorInfo);
    
    // Send to Sentry
    const eventId = Sentry.captureException(error, {
      contexts: {
        errorBoundary: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    this.setState({ errorId: eventId });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-2xl border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-6 w-6" />
                Application Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="destructive">
                <Bug className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-medium">Something went wrong</p>
                    <p className="text-sm">
                      {this.state.error?.message || 'An unexpected error occurred in the application.'}
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">What happened?</h4>
                <p className="text-muted-foreground text-sm">
                  The application encountered an unexpected error and couldn't continue. 
                  This error has been automatically reported to our team.
                </p>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-sm">You can try:</h5>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Refreshing the page to reload the application
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Going back to the dashboard home page
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Clearing your browser cache and cookies
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Contacting support if the problem persists
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.handleRetry}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleRefresh}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Page
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </div>

              {this.state.errorId && (
                <div className="pt-4 border-t">
                  <p className="text-muted-foreground text-xs">
                    Error ID: {this.state.errorId}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Please include this ID when contacting support.
                  </p>
                </div>
              )}

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="pt-4 border-t">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                    Technical Details (Development Only)
                  </summary>
                  <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}