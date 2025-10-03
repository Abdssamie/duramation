'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, subDays } from 'date-fns';

interface ChartDataPoint {
  date: string;
  runs: number;
  successCount: number;
  failureCount: number;
  successRate: number;
  avgDuration: number;
  timeSaved: number;
}

interface PerformanceChartsProps {
  userId?: string;
  className?: string;
}

type TimeRange = '7d' | '30d' | '90d' | '1y';

const TIME_RANGES: Record<TimeRange, { label: string; days: number }> = {
  '7d': { label: 'Last 7 days', days: 7 },
  '30d': { label: 'Last 30 days', days: 30 },
  '90d': { label: 'Last 90 days', days: 90 },
  '1y': { label: 'Last year', days: 365 }
};

const COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b'
};

export function PerformanceCharts({
  userId,
  className
}: PerformanceChartsProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth(); // Moved here
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  useEffect(() => {
    async function fetchChartData() {
      try {
        setLoading(true);
        setError(null);

        const days = TIME_RANGES[timeRange].days;
        const to = new Date();
        const from = subDays(to, days);

        const params = new URLSearchParams({
          from: from.toISOString(),
          to: to.toISOString(),
          granularity: days <= 7 ? 'daily' : days <= 90 ? 'daily' : 'weekly'
        });

        const token = await getToken();

        const response = await fetch(
          `${process.env.NEXT_BACKEND_API_URL}/api/client-dashboard/charts?${params}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            credentials: 'include'
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }

        const data = await response.json();
        setChartData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchChartData();
  }, [userId, timeRange, getToken]);

  if (loading) {
    return <PerformanceChartsSkeleton className={className} />;
  }

  if (error) {
    return (
      <div className={cn('space-y-4', className)}>
        <Alert variant='destructive'>
          <XCircle className='h-4 w-4' />
          <AlertDescription>
            Failed to load chart data: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const successRateData = chartData.map((point) => ({
    ...point,
    successRate: point.runs > 0 ? (point.successCount / point.runs) * 100 : 0
  }));

  return (
    <div className={cn('space-y-6', className)}>
      {/* Controls */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Calendar className='text-muted-foreground h-4 w-4' />
          <span className='text-sm font-medium'>Time Range:</span>
        </div>
        <Select
          value={timeRange}
          onValueChange={(value: TimeRange) => setTimeRange(value)}
        >
          <SelectTrigger className='w-40'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(TIME_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Charts Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Automation Runs Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Activity className='h-4 w-4' />
              <span>Automation Runs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='date'
                  tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) =>
                    format(new Date(value), 'MMM dd, yyyy')
                  }
                  formatter={(value: number) => [
                    value.toLocaleString(),
                    'Total Runs'
                  ]}
                />
                <Area
                  type='monotone'
                  dataKey='runs'
                  stroke={COLORS.primary}
                  fill={COLORS.primary}
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <CheckCircle className='h-4 w-4' />
              <span>Success Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={successRateData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='date'
                  tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  labelFormatter={(value) =>
                    format(new Date(value), 'MMM dd, yyyy')
                  }
                  formatter={(value: number) => [
                    `${value.toFixed(1)}%`,
                    'Success Rate'
                  ]}
                />
                <Line
                  type='monotone'
                  dataKey='successRate'
                  stroke={COLORS.success}
                  strokeWidth={2}
                  dot={{ fill: COLORS.success, strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Success vs Failure Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <Activity className='h-4 w-4' />
              <span>Run Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='date'
                  tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) =>
                    format(new Date(value), 'MMM dd, yyyy')
                  }
                  formatter={(value: number, name: string) => [
                    value.toLocaleString(),
                    name === 'successCount' ? 'Successful' : 'Failed'
                  ]}
                />
                <Bar dataKey='successCount' stackId='a' fill={COLORS.success} />
                <Bar dataKey='failureCount' stackId='a' fill={COLORS.error} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Time Saved Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center space-x-2'>
              <TrendingUp className='h-4 w-4' />
              <span>Time Saved</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='date'
                  tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) =>
                    format(new Date(value), 'MMM dd, yyyy')
                  }
                  formatter={(value: number) => [
                    `${(value / 60).toFixed(1)}h`,
                    'Time Saved'
                  ]}
                />
                <Area
                  type='monotone'
                  dataKey='timeSaved'
                  stroke={COLORS.warning}
                  fill={COLORS.warning}
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PerformanceChartsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-10 w-40' />
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-[300px] w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
