import PageContainer from '@/components/layout/page-container';
import { MetricCardSkeleton } from '@/components/ui/metric-card-skeleton';
import { WorkflowRunsChartSkeleton } from '@/features/overview/components/workflow-runs-chart-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <Skeleton className="h-8 w-64" />
        </div>

        {/* KPI Cards Grid */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <MetricCardSkeleton key={index} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <div className='col-span-1'>
            <WorkflowRunsChartSkeleton />
          </div>
          <div className='col-span-1'>
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}