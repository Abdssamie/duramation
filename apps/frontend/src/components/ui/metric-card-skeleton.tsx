import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MetricCardSkeleton() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-6 w-16 mt-2" />
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5'>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-36" />
      </CardFooter>
    </Card>
  );
}