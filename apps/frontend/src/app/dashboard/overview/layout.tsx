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

interface MetricsData {
  totalRuns: number;
  successRate: number;
  avgDuration: number;
  timeSavedHours: number;
  costSavings: number;
  errorsPrevented: number;
  trend: {
    runs: number;
    successRate: number;
    timeSaved: number;
    costSavings: number;
  };
}

import { dashboardApi } from '@/services/api/api-client';
import { auth } from '@clerk/nextjs/server';

async function getMetrics(): Promise<MetricsData> {
  const { getToken } = await auth();
  const token = await getToken();
  if (!token) {
    throw new Error('Unauthorized');
  }
  return dashboardApi.getMetrics(token);
}

export default async function OverViewLayout({
  sales,
  bar_stats
}: {
  sales: React.ReactNode;
  bar_stats: React.ReactNode;
}) {
  const metrics = await getMetrics();

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
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Runs</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {metrics.totalRuns.toLocaleString()}
              </CardTitle>
              <CardAction>
                {getTrendBadge(metrics.trend.runs)}
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {metrics.trend.runs >= 0 ? 'Trending up' : 'Trending down'} this period {getTrendIcon(metrics.trend.runs)}
              </div>
              <div className='text-muted-foreground'>
                Total workflow runs
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Success Rate</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {formatPercentage(metrics.successRate)}
              </CardTitle>
              <CardAction>
                {getTrendBadge(metrics.trend.successRate)}
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {metrics.trend.successRate >= 0 ? 'Improved' : 'Decreased'} success rate {getTrendIcon(metrics.trend.successRate)}
              </div>
              <div className='text-muted-foreground'>
                Percentage of successful runs
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Time Saved</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {metrics.timeSavedHours.toFixed(1)}h
              </CardTitle>
              <CardAction>
                {getTrendBadge(metrics.trend.timeSaved)}
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {metrics.trend.timeSaved >= 0 ? 'More time saved' : 'Less time saved'} this period {getTrendIcon(metrics.trend.timeSaved)}
              </div>
              <div className='text-muted-foreground'>
                Estimated hours saved by automations
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Cost Savings</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {formatCurrency(metrics.costSavings)}
              </CardTitle>
              <CardAction>
                {getTrendBadge(metrics.trend.costSavings)}
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {metrics.trend.costSavings >= 0 ? 'Increased savings' : 'Decreased savings'} this period {getTrendIcon(metrics.trend.costSavings)}
              </div>
              <div className='text-muted-foreground'>
                Estimated cost savings from automations
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <div className='col-span-1'>{sales}</div>
          <div className='col-span-1'>{bar_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
