import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface WorkflowRunsChartSkeletonProps {
  className?: string;
}

export function WorkflowRunsChartSkeleton({ className }: WorkflowRunsChartSkeletonProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-4 pt-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <Skeleton className="h-8 w-16 mx-auto mb-2" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </div>
          <div className="text-center">
            <Skeleton className="h-8 w-16 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
          <div className="text-center">
            <Skeleton className="h-8 w-16 mx-auto mb-2" />
            <Skeleton className="h-4 w-16 mx-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}