import { format, parseISO } from 'date-fns';
import { TrendingDown, TrendingUp } from 'lucide-react';
import * as React from 'react';
import { ChartDataResponse } from '@duramation/shared';

export const formatTooltipLabel = (value: string) => {
    try {
      const date = parseISO(value);
      return format(date, 'MMM dd, yyyy');
    } catch {
      return value;
    }
  };

export  const getTrendIcon = (chartData: ChartDataResponse) => {
    if (!chartData) return null;
    return chartData.trendPercentage >= 0
      ? <TrendingUp className="h-4 w-4 text-green-600" />
      : <TrendingDown className="h-4 w-4 text-red-600" />;
  };

export const getTrendText = (chartData: ChartDataResponse) => {
    if (!chartData) return '';
    const isPositive = chartData.trendPercentage >= 0;
    const sign = isPositive ? '+' : '';
    return `${sign}${chartData.trendPercentage.toFixed(1)}%`;
  };
