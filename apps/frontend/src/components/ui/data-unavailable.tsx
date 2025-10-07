import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, WifiOff, Database, Clock } from 'lucide-react';

interface DataUnavailableProps {
  title?: string;
  message?: string;
  type?: 'network' | 'empty' | 'error' | 'timeout';
  onRetry?: () => void;
  retrying?: boolean;
  showRetryButton?: boolean;
  className?: string;
}

const getIcon = (type: DataUnavailableProps['type']) => {
  switch (type) {
    case 'network':
      return <WifiOff className="h-8 w-8" />;
    case 'empty':
      return <Database className="h-8 w-8" />;
    case 'timeout':
      return <Clock className="h-8 w-8" />;
    case 'error':
    default:
      return <AlertCircle className="h-8 w-8" />;
  }
};

const getDefaultMessage = (type: DataUnavailableProps['type']) => {
  switch (type) {
    case 'network':
      return 'Unable to connect to the server. Please check your internet connection.';
    case 'empty':
      return 'No data available at this time.';
    case 'timeout':
      return 'Request timed out. The server may be experiencing high load.';
    case 'error':
    default:
      return 'Data is temporarily unavailable. Please try again.';
  }
};

const getDefaultTitle = (type: DataUnavailableProps['type']) => {
  switch (type) {
    case 'network':
      return 'Connection Error';
    case 'empty':
      return 'No Data';
    case 'timeout':
      return 'Request Timeout';
    case 'error':
    default:
      return 'Data Unavailable';
  }
};

export function DataUnavailable({
  title,
  message,
  type = 'error',
  onRetry,
  retrying = false,
  showRetryButton = true,
  className
}: DataUnavailableProps) {
  const displayTitle = title || getDefaultTitle(type);
  const displayMessage = message || getDefaultMessage(type);
  const icon = getIcon(type);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-muted-foreground">
          {icon}
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-sm">
            {displayMessage}
          </p>
          
          {showRetryButton && onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              disabled={retrying}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${retrying ? 'animate-spin' : ''}`} />
              {retrying ? 'Retrying...' : 'Try Again'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}