'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';

interface ServiceRequestsErrorProps {
  error: Error;
  reset: () => void;
}

export default function ServiceRequestsError({ error, reset }: ServiceRequestsErrorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <Card className='border-red-500'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-destructive'>
          <AlertCircle className="h-5 w-5" />
          Service Requests Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Unable to Load Service Requests</AlertTitle>
          <AlertDescription className='mt-2'>
            {error.message || 'Failed to load recent service requests'}
          </AlertDescription>
        </Alert>
        
        <div className='mt-4 text-center'>
          <p className='text-muted-foreground mb-4 text-sm'>
            Recent service requests are temporarily unavailable
          </p>
          <Button
            onClick={handleRetry}
            variant='outline'
            size='sm'
            disabled={isPending}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
            {isPending ? 'Retrying...' : 'Try Again'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}