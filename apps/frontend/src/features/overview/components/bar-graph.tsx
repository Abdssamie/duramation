'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { useAuth } from '@clerk/nextjs';
import { Activity } from 'lucide-react';
import { format, parseISO } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ChartDataResponse, TimeRange } from '@duramation/shared';
import { dashboardApi } from '@/services/api/api-client';
import { TIME_RANGE_OPTIONS} from '@/constants/workflow-run-chart';
import { useCallback } from 'react';
import { formatTooltipLabel, getTrendIcon, getTrendText } from '@/utils/graph-utils';

const chartConfig = {
  runs: {
    label: 'Workflow Runs',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const { getToken } = useAuth();
  const [chartData, setChartData] = React.useState<ChartDataResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [timeRange, setTimeRange] = React.useState<TimeRange>('30d');
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<string>('all');

  const fetchChartData = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();

      if (token) {
        const params = new URLSearchParams({
          timeRange: timeRange
        });

        if (selectedWorkflow !== 'all') {
          params.append('workflowId', selectedWorkflow);
        }

        const dataResponse = await dashboardApi.getChartData(token, params);
        const data: ChartDataResponse | null = dataResponse.data ? dataResponse.data : null;
        setChartData(data);

      } else if (retryCount < 3) {
        // Retry after delay for new signups (race condition with webhook)
        setTimeout(() => fetchChartData(retryCount + 1), 1000 * (retryCount + 1));
        return;
      } else {
        setError('Authentication Error');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load chart data');
    } finally {
      setLoading(false);
    }
  }, [timeRange, selectedWorkflow, getToken]);

  React.useEffect(() => {
    fetchChartData();
  }, [timeRange, selectedWorkflow, fetchChartData]);

  const formatXAxisTick = (value: string) => {
    try {
      const date = parseISO(value);
      return timeRange === '7d' 
        ? format(date, 'MMM dd')
        : timeRange === '30d'
        ? format(date, 'MMM dd')
        : format(date, 'MMM dd');
    } catch {
      return value;
    }
  };


  if (loading) {
    return (
      <Card className='@container/card'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Workflow Runs
          </CardTitle>
          <CardDescription>Loading workflow data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse bg-muted rounded h-full w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className='@container/card'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Workflow Runs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              {error}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fetchChartData()}
                className="ml-2"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!chartData || chartData.data.length === 0) {
    return (
      <Card className='@container/card'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Workflow Runs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center">
            <div className="text-center">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No Workflow Data Available
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Create and run workflows to see execution metrics and trends displayed in this chart.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className='@container/card'>
      <CardHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="flex items-center gap-2 shrink-0">
              <Activity className="h-5 w-5" />
              Workflow Runs
            </CardTitle>
            <div className="flex items-center gap-2 text-sm font-medium">
              {getTrendIcon(chartData)}
              <span className="whitespace-nowrap">
                {getTrendText(chartData)}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            {chartData && chartData.availableWorkflows.length > 0 && (
              <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workflows</SelectItem>
                  {chartData.availableWorkflows.map(workflow => (
                    <SelectItem key={workflow.id} value={workflow.id}>
                      {workflow.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className='h-[300px] w-full'
        >
          <BarChart
            data={chartData.data}
            margin={{
              left: 0,
              right: 0,
              top: 12,
              bottom: 12
            }}
          >
            <defs>
              <linearGradient id='fillBar' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--color-runs)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--color-runs)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fontSize: 12 }}
              tickFormatter={formatXAxisTick}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--color-runs)', opacity: 0.1 }}
              content={
                <ChartTooltipContent
                  labelFormatter={formatTooltipLabel}
                  formatter={(value) => [
                    typeof value === 'number' ? value.toLocaleString() : value,
                    ' Workflow Runs'
                  ]}
                />
              }
            />
            <Bar
              dataKey="runs"
              fill='url(#fillBar)'
              radius={[4, 4, 0, 0]}
              strokeWidth={1}
              stroke='var(--color-runs)'
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}