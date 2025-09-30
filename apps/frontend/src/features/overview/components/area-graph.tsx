'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import useDictionary from '@/locales/dictionary-hook';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { dashboardApi } from '@/services/api/api-client';

type ChartType = 'visitors' | 'workflowRoi';

interface AreaGraphProps {
  chartType?: ChartType;
}

export function AreaGraph({ chartType = 'visitors' }: AreaGraphProps) {
  const dict = useDictionary();
  const { getToken } = useAuth();
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (chartType === 'workflowRoi') {
        const token = await getToken();
        if (!token) return;
        const data = await dashboardApi.getWorkflowRoi(token);
        setChartData(data);
        setCardTitle('Workflow ROI');
        setCardDescription('Time and money saved per workflow.');
        setChartConfig({
          timeSaved: {
            label: 'Time Saved (hours)',
            color: 'var(--primary)'
          },
          moneySaved: {
            label: 'Money Saved ($)',
            color: 'var(--secondary)'
          }
        } satisfies ChartConfig);
      } else {
        setChartData([
          { month: dict.areaGraph.months.january, desktop: 186, mobile: 80 },
          { month: dict.areaGraph.months.february, desktop: 305, mobile: 200 },
          { month: dict.areaGraph.months.march, desktop: 237, mobile: 120 },
          { month: dict.areaGraph.months.april, desktop: 73, mobile: 190 },
          { month: dict.areaGraph.months.may, desktop: 209, mobile: 130 },
          { month: dict.areaGraph.months.june, desktop: 214, mobile: 140 }
        ]);
        setCardTitle(dict.areaGraph.cardTitle);
        setCardDescription(dict.areaGraph.cardDescription);
        setChartConfig({
          visitors: {
            label: dict.areaGraph.chartConfig.visitorsLabel
          },
          desktop: {
            label: dict.areaGraph.chartConfig.desktopLabel,
            color: 'var(--primary)'
          },
          mobile: {
            label: dict.areaGraph.chartConfig.mobileLabel,
            color: 'var(--primary)'
          }
        } satisfies ChartConfig);
      }
    };

    fetchData();
  }, [chartType, dict, getToken]);

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillTimeSaved' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor="var(--color-timeSaved, 'var(--primary)')"
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor="var(--color-timeSaved, 'var(--primary)')"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillMoneySaved' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor="var(--color-moneySaved, 'var(--secondary)')"
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor="var(--color-moneySaved, 'var(--secondary)')"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={chartType === 'workflowRoi' ? 'name' : 'month'}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            {chartType === 'workflowRoi' ? (
              <>
                <Area
                  dataKey='timeSaved'
                  type='natural'
                  fill='url(#fillTimeSaved)'
                  stroke='var(--color-timeSaved)'
                  stackId='a'
                />
                <Area
                  dataKey='moneySaved'
                  type='natural'
                  fill='url(#fillMoneySaved)'
                  stroke='var(--color-moneySaved)'
                  stackId='b'
                />
              </>
            ) : (
              <>
                <Area
                  dataKey='mobile'
                  type='natural'
                  fill='url(#fillMobile)'
                  stroke='var(--color-mobile)'
                  stackId='a'
                />
                <Area
                  dataKey='desktop'
                  type='natural'
                  fill='url(#fillDesktop)'
                  stroke='var(--color-desktop)'
                  stackId='a'
                />
              </>
            )}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 leading-none font-medium'>
              {dict.areaGraph.footer.trendingUp}{' '}
              <IconTrendingUp className='h-4 w-4' />
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              {dict.areaGraph.footer.dateRange}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
