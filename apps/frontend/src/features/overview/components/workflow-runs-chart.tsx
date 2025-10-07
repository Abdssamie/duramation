'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from '@/components/ui/chart';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ChartDataResponse, TimeRange, ChartFilters } from '@duramation/shared';
import { WorkflowRunsChartSkeleton } from './workflow-runs-chart-skeleton';
import { dashboardApi } from '@/services/api/api-client';

interface WorkflowRunsChartProps {
  className?: string;
}

const TIME_RANGE_OPTIONS = [
  { value: '7d' as TimeRange, label: '7 days' },
  { value: '30d' as TimeRange, label: '30 days' },
  { value: '90d' as TimeRange, label: '90 days' }
];

const chartConfig = {
  runs: {
    label: 'Workflow Runs',
    color: 'var(--primary)'
  },
  trendValue: {
    label: 'Trend',
    color: 'var(--muted-foreground)'
  },
  movingAverage: {
    label: 'Moving Average',
    color: 'var(--primary-light)'
  }
} satisfies ChartConfig;

export function WorkflowRunsChart({ className }: WorkflowRunsChartProps) {
  const { getToken } = useAuth();
  const [chartData, setChartData] = useState<ChartDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ChartFilters>({
    timeRange: '30d',
    showTrendline: true
  });

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const params = new URLSearchParams({
        timeRange: filters.timeRange
      });

      if (filters.workflowId) {
        params.append('workflowId', filters.workflowId);
      }

      const data: ChartDataResponse = await dashboardApi.getChartData(token, params);
      setChartData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [filters.timeRange, filters.workflowId]);

  const handleTimeRangeChange = (timeRange: TimeRange) => {
    setFilters(prev => ({ ...prev, timeRange }));
  };

  const handleWorkflowChange = (workflowId: string) => {
    setFilters(prev => ({
      ...prev,
      workflowId: workflowId === 'all' ? undefined : workflowId
    }));
  };



  const formatXAxisTick = (value: string) => {
    try {
      const date = parseISO(value);
      return filters.timeRange === '7d' 
        ? format(date, 'MMM dd')
        : filters.timeRange === '30d'
        ? format(date, 'MMM dd')
        : format(date, 'MMM dd');
    } catch {
      return value;
    }
  };

  const formatTooltipLabel = (value: string) => {
    try {
      const date = parseISO(value);
      return format(date, 'MMM dd, yyyy');
    } catch {
      return value;
    }
  };

  const getTrendIcon = () => {
    if (!chartData) return null;
    return chartData.trendPercentage >= 0 
      ? <TrendingUp className="h-4 w-4 text-green-600" />
      : <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getTrendText = () => {
    if (!chartData) return '';
    const isPositive = chartData.trendPercentage >= 0;
    const sign = isPositive ? '+' : '';
    return `${sign}${chartData.trendPercentage.toFixed(1)}%`;
  };

  if (loading) {
    return <WorkflowRunsChartSkeleton className={className} />;
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Workflow Runs Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load chart data: {error}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchChartData}
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
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Workflow Runs Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No workflow runs data available for the selected period.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Workflow Runs Over Time
          </CardTitle>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {getTrendText()}
            </span>
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Time Range Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Period:</span>
            <Select value={filters.timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-32">
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

          {/* Workflow Filter */}
          {chartData.availableWorkflows.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Workflow:</span>
              <Select 
                value={filters.workflowId || 'all'} 
                onValueChange={handleWorkflowChange}
              >
                <SelectTrigger className="w-48">
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
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={chartData.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxisTick}
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  labelFormatter={formatTooltipLabel}
                  formatter={(value, name) => [
                    typeof value === 'number' ? value.toLocaleString() : value,
                    name === 'runs' ? 'Workflow Runs' :
                    name === 'trendValue' ? 'Trend' :
                    name === 'movingAverage' ? 'Moving Average' : name
                  ]}
                />
              }
            />
            
            {/* Main area chart */}
            <Area
              type="monotone"
              dataKey="runs"
              stroke="var(--color-runs)"
              fill="var(--color-runs)"
              fillOpacity={0.6}
              strokeWidth={2}
            />
            
            {/* Trendline */}
            <Line
              type="monotone"
              dataKey="trendValue"
              stroke="var(--color-trendValue)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls={false}
            />
          </AreaChart>
        </ChartContainer>

        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">
              {chartData.totalRuns.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Total Runs</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {chartData.averageRuns.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Daily Average</div>
          </div>
          <div>
            <div className="text-2xl font-bold flex items-center justify-center gap-1">
              {getTrendIcon()}
              {getTrendText()}
            </div>
            <div className="text-xs text-muted-foreground">Trend</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

