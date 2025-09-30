import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function WorkflowCardSkeleton() {
  return (
    <Card className='flex flex-col transition-shadow hover:shadow-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base'>
          <Skeleton className='inline-block size-2 rounded-full' />
          <Skeleton className='h-4 flex-1' />
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-3 text-sm'>
        <div className='space-y-2'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-3/4' />
        </div>

        <div className='grid grid-cols-2 gap-3 text-xs'>
          <div className='space-y-1'>
            <Skeleton className='h-3 w-12' />
            <Skeleton className='h-3 w-16' />
          </div>
          <div className='space-y-1'>
            <Skeleton className='h-3 w-10' />
            <Skeleton className='h-3 w-20' />
          </div>
          <div className='space-y-1'>
            <Skeleton className='h-3 w-14' />
            <Skeleton className='h-3 w-24' />
          </div>
          <div className='space-y-1'>
            <Skeleton className='h-3 w-16' />
            <Skeleton className='h-3 w-8' />
          </div>
        </div>

        <Skeleton className='h-3 w-1/3' />
      </CardContent>

      <CardFooter className='mt-auto'>
        <Skeleton className='h-9 w-full' />
      </CardFooter>
    </Card>
  );
}
