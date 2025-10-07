import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import React from 'react';
import { SimplifiedMetrics } from '@duramation/shared';
import { dashboardApi } from '@/services/api/api-client';
import { auth } from '@clerk/nextjs/server';
import { ServiceRequestDialogWrapper } from '@/components/dialogs/service-request-dialog-wrapper';

async function getSimplifiedMetrics(): Promise<SimplifiedMetrics> {
  const { getToken } = await auth();
  const token = await getToken();
  if (!token) {
    throw new Error('Unauthorized');
  }
  return dashboardApi.getSimplifiedMetrics(token);
}

export default async function OverViewLayout({
  sales,
  bar_stats
}: {
  sales: React.ReactNode;
  bar_stats: React.ReactNode;
}) {
  const metrics = await getSimplifiedMetrics();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value / 100);
  };

  const getTrendIcon = (value: number) => {
    return value >= 0 ? <IconTrendingUp className='size-4' /> : <IconTrendingDown className='size-4' />;
  };

  const getTrendBadge = (value: number) => {
    const isPositive = value >= 0;
    const icon = isPositive ? <IconTrendingUp /> : <IconTrendingDown />;
    const sign = isPositive ? '+' : '';
    return (
      <Badge variant='outline'>
        {icon}
        {sign}{value.toFixed(1)}%
      </Badge>
    );
  };

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-3'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
          <ServiceRequestDialogWrapper />
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-4 lg:grid-cols-6'>
          {/* 1. Workflow Runs This Month */}
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Runs This Month</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {metrics.workflowRunsThisMonth.total.toLocaleString()}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  {getTrendBadge(metrics.workflowRunsThisMonth.trend)}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Trending up this month <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>

          {/* 2. Total Automations Executed */}
          <Card className='@container/card'>
            <CardHeader className='pb-2'>
              <CardDescription className='text-xs'>Total Automations</CardDescription>
              <CardTitle className='text-xl font-semibold tabular-nums'>
                {metrics.totalAutomationsExecuted.toLocaleString()}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* 3. Average Execution Time */}
          <Card className='@container/card'>
            <CardHeader className='pb-2'>
              <CardDescription className='text-xs'>Avg Time</CardDescription>
              <CardTitle className='text-xl font-semibold tabular-nums'>
                {metrics.averageExecutionTime.toFixed(1)}s
              </CardTitle>
            </CardHeader>
          </Card>

          {/* 4. Estimated Savings */}
          <Card className='@container/card'>
            <CardHeader className='pb-2'>
              <CardDescription className='text-xs'>Time Saved</CardDescription>
              <CardTitle className='text-xl font-semibold tabular-nums'>
                {metrics.estimatedSavings.timeHours.toFixed(1)}h
              </CardTitle>
            </CardHeader>
          </Card>

          {/* 5. Workflow Success Rate */}
          <Card className='@container/card'>
            <CardHeader className='pb-2'>
              <CardDescription className='text-xs'>Success Rate</CardDescription>
              <CardTitle className='text-xl font-semibold tabular-nums'>
                {metrics.workflowSuccessRate.toFixed(1)}%
              </CardTitle>
            </CardHeader>
          </Card>

          {/* 6. Active Workflows */}
          <Card className='@container/card'>
            <CardHeader className='pb-2'>
              <CardDescription className='text-xs'>Active Workflows</CardDescription>
              <CardTitle className='text-xl font-semibold tabular-nums'>
                {metrics.activeWorkflows.total}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <div className='col-span-1'>{bar_stats}</div>
          <div className='col-span-1'>{sales}</div>
        </div>
      </div>
    </PageContainer>
  );
}
