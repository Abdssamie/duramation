'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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

export const description = 'An interactive bar chart';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { dashboardApi } from '@/services/api/api-client';

type ChartType = 'pageViews' | 'topWorkflows';

interface BarGraphProps {
  chartType?: ChartType;
}

export function BarGraph({ chartType = 'pageViews' }: BarGraphProps) {
  const { getToken } = useAuth();
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [activeChart, setActiveChart] = useState<string>('runs');

  useEffect(() => {
    const fetchData = async () => {
      if (chartType === 'topWorkflows') {
        const token = await getToken();
        if (!token) return;
        const data = await dashboardApi.getTopWorkflows(token);
        setChartData(data);
        setCardTitle('Top 5 Active Workflows');
        setCardDescription('The most frequently run workflows.');
        setChartConfig({
          runs: {
            label: 'Runs',
            color: 'var(--primary)'
          }
        } satisfies ChartConfig);
      } else {
        // Existing pageViews data logic
      }
    };

    fetchData();
  }, [chartType, getToken]);

  return (
    <Card className='@container/card !pt-3'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 !py-0'>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>
            <span className='hidden @[540px]/card:block'>
              {cardDescription}
            </span>
            <span className='@[540px]/card:hidden'>{cardDescription}</span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillBar' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--primary)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--primary)'
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={chartType === 'topWorkflows' ? 'name' : 'date'}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill='url(#fillBar)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
