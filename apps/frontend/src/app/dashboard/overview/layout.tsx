import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import React from 'react';
import { ActionCards } from '@/components/dashboard/action-cards';
import { getSimplifiedMetrics } from '@/services/api/getSimplifiedMetrics';

export const dynamic = 'force-dynamic'

// Helper function to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function OverViewLayout({
  service_requests,
  workflow_chart
}: {
  service_requests: React.ReactNode;
  workflow_chart: React.ReactNode;
}) {
  const metrics = await getSimplifiedMetrics();


  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        {/* Header */}
        <div className='flex items-center'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
        </div>

        {/* Metrics Cards */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {/* 1. Total Automations Executed */}
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Automations</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {metrics.totalAutomationsExecuted.toLocaleString()}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  All-time
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Since account creation <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                {metrics.totalAutomationsExecuted > 1000 ? 'Excellent automation adoption' : metrics.totalAutomationsExecuted > 100 ? 'Good progress on automation' : 'Just getting started with automation'}
              </div>
            </CardFooter>
          </Card>

          {/* 2. Cost Savings */}
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Cost Savings</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {formatCurrency(metrics.estimatedSavings.costUSD)}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +{metrics.estimatedSavings.timeHours.toFixed(0)}h saved
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Strong ROI performance <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                {metrics.estimatedSavings.costUSD > 10000 ? 'Significant ROI achieved' : metrics.estimatedSavings.costUSD > 1000 ? 'Strong cost reduction impact' : 'Building towards meaningful savings'}
              </div>
            </CardFooter>
          </Card>

          {/* 3. Active Workflows */}
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Active Workflows</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {metrics.activeWorkflows.total}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +{metrics.newWorkflowsThisMonth} this month
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {metrics.activeWorkflows.scheduled} scheduled, {metrics.activeWorkflows.direct} direct <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                {metrics.activeWorkflows.total > 10 ? 'Well-established automation suite' : metrics.activeWorkflows.total > 3 ? 'Growing automation portfolio' : 'Consider adding more workflows'}
              </div>
            </CardFooter>
          </Card>

          {/* 4. Success Rate */}
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Success Rate</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {metrics.workflowSuccessRate.toFixed(1)}%
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  {metrics.workflowSuccessRate >= 95 ? <IconTrendingUp /> : <IconTrendingDown />}
                  {metrics.workflowSuccessRate.toFixed(1)}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                {(100 - metrics.workflowSuccessRate).toFixed(1)}% failure rate {metrics.workflowSuccessRate >= 95 ? <IconTrendingUp className='size-4' /> : <IconTrendingDown className='size-4' />}
              </div>
              <div className='text-muted-foreground'>
                {metrics.workflowSuccessRate >= 95 ? 'Excellent system reliability' : metrics.workflowSuccessRate >= 85 ? 'Good performance, room for improvement' : 'Consider reviewing workflow configurations'}
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <div className='col-span-1'>{workflow_chart}</div>
          <div className='col-span-1 space-y-4'>
            <ActionCards />
            {service_requests}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
