'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  DollarSign,
  Clock,
  TrendingUp,
  Calculator,
  Settings,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ROIData {
  timeSavedHours: number;
  errorsPrevented: number;
  totalRuns: number;
  successRate: number;
  costSavings: number;
  projectedAnnualSavings: number;
}

interface ROICalculatorProps {
  userId?: string;
  className?: string;
}

interface ROISettings {
  hourlyRate: number;
  errorCostPerIncident: number;
  manualTimePerTask: number; // minutes
  automationReliabilityFactor: number; // 0-1
}

const DEFAULT_SETTINGS: ROISettings = {
  hourlyRate: 50,
  errorCostPerIncident: 100,
  manualTimePerTask: 15,
  automationReliabilityFactor: 0.95
};

export function ROICalculator({ userId, className }: ROICalculatorProps) {
  const [roiData, setRoiData] = useState<ROIData | null>(null);
  const [settings, setSettings] = useState<ROISettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    async function fetchROIData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_BACKEND_API_URL}/api/client-dashboard/roi-data`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch ROI data');
        }

        const data = await response.json();
        setRoiData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchROIData();
  }, [userId]);

  // Calculate derived metrics
  const calculatedMetrics = roiData
    ? {
        // Time savings calculations
        actualTimeSaved: roiData.timeSavedHours,
        potentialTimeSaved:
          (roiData.totalRuns * settings.manualTimePerTask) / 60,
        timeSavingsValue: roiData.timeSavedHours * settings.hourlyRate,

        // Error prevention calculations
        errorPreventionValue:
          roiData.errorsPrevented * settings.errorCostPerIncident,

        // Reliability factor
        reliabilityBonus:
          roiData.successRate > 95
            ? roiData.timeSavedHours * settings.hourlyRate * 0.1
            : 0,

        // Projected annual savings
        monthlyRuns: roiData.totalRuns,
        annualProjectedRuns: roiData.totalRuns * 12,
        annualTimeSavings: roiData.timeSavedHours * 12,
        annualErrorPrevention: roiData.errorsPrevented * 12
      }
    : null;

  const totalROI = calculatedMetrics
    ? calculatedMetrics.timeSavingsValue +
      calculatedMetrics.errorPreventionValue +
      calculatedMetrics.reliabilityBonus
    : 0;

  const annualROI = calculatedMetrics
    ? calculatedMetrics.annualTimeSavings * settings.hourlyRate +
      calculatedMetrics.annualErrorPrevention * settings.errorCostPerIncident
    : 0;

  if (loading) {
    return <ROICalculatorSkeleton className={className} />;
  }

  if (error) {
    return (
      <div className={cn('space-y-4', className)}>
        <Alert variant='destructive'>
          <AlertTriangle className='h-4 w-4' />
          <AlertDescription>Failed to load ROI data: {error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!roiData) {
    return (
      <div className={cn('space-y-4', className)}>
        <Alert>
          <Info className='h-4 w-4' />
          <AlertDescription>
            No ROI data available. Start running automations to see financial
            impact.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with Settings Toggle */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center space-x-2 text-lg font-semibold'>
            <Calculator className='h-5 w-5' />
            <span>ROI Calculator</span>
          </h3>
          <p className='text-muted-foreground text-sm'>
            Calculate the financial impact of your automations
          </p>
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className='mr-2 h-4 w-4' />
          Settings
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Calculation Settings</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='hourlyRate'>Hourly Rate ($)</Label>
                <Input
                  id='hourlyRate'
                  type='number'
                  value={settings.hourlyRate}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      hourlyRate: parseFloat(e.target.value) || 0
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='errorCost'>Error Cost per Incident ($)</Label>
                <Input
                  id='errorCost'
                  type='number'
                  value={settings.errorCostPerIncident}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      errorCostPerIncident: parseFloat(e.target.value) || 0
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='manualTime'>
                  Manual Time per Task (minutes)
                </Label>
                <Input
                  id='manualTime'
                  type='number'
                  value={settings.manualTimePerTask}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      manualTimePerTask: parseFloat(e.target.value) || 0
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='reliability'>
                  Automation Reliability (0-1)
                </Label>
                <Input
                  id='reliability'
                  type='number'
                  step='0.01'
                  min='0'
                  max='1'
                  value={settings.automationReliabilityFactor}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      automationReliabilityFactor:
                        parseFloat(e.target.value) || 0
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ROI Summary Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Monthly ROI</CardTitle>
            <DollarSign className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              ${totalROI.toLocaleString()}
            </div>
            <p className='text-muted-foreground text-xs'>
              Current month savings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Annual Projection
            </CardTitle>
            <TrendingUp className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>
              ${annualROI.toLocaleString()}
            </div>
            <p className='text-muted-foreground text-xs'>
              Projected yearly savings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Time Saved</CardTitle>
            <Clock className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-600'>
              {roiData.timeSavedHours.toFixed(1)}h
            </div>
            <p className='text-muted-foreground text-xs'>This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>ROI Breakdown</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Time Savings */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Time Savings Value</span>
              <Badge variant='secondary'>
                ${calculatedMetrics?.timeSavingsValue.toLocaleString()}
              </Badge>
            </div>
            <div className='text-muted-foreground text-xs'>
              {roiData.timeSavedHours.toFixed(1)} hours × ${settings.hourlyRate}
              /hour
            </div>
          </div>

          <Separator />

          {/* Error Prevention */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>
                Error Prevention Value
              </span>
              <Badge variant='secondary'>
                ${calculatedMetrics?.errorPreventionValue.toLocaleString()}
              </Badge>
            </div>
            <div className='text-muted-foreground text-xs'>
              {roiData.errorsPrevented} errors prevented × $
              {settings.errorCostPerIncident}/error
            </div>
          </div>

          <Separator />

          {/* Reliability Bonus */}
          {calculatedMetrics && calculatedMetrics?.reliabilityBonus > 0 && (
            <>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='flex items-center space-x-1 text-sm font-medium'>
                    <CheckCircle className='h-3 w-3 text-green-500' />
                    <span>High Reliability Bonus</span>
                  </span>
                  <Badge variant='default'>
                    ${calculatedMetrics.reliabilityBonus.toLocaleString()}
                  </Badge>
                </div>
                <div className='text-muted-foreground text-xs'>
                  {roiData.successRate.toFixed(1)}% success rate (10% bonus for{' '}
                  {'>'}95%)
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Total */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between font-semibold'>
              <span>Total Monthly ROI</span>
              <Badge className='bg-green-600'>
                ${totalROI.toLocaleString()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Annual Projections */}
      <Card>
        <CardHeader>
          <CardTitle>Annual Projections</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <div className='text-sm font-medium'>Projected Annual Runs</div>
              <div className='text-xl font-bold'>
                {calculatedMetrics?.annualProjectedRuns.toLocaleString()}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-sm font-medium'>Projected Time Savings</div>
              <div className='text-xl font-bold'>
                {calculatedMetrics?.annualTimeSavings.toFixed(0)}h
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-sm font-medium'>
                Projected Errors Prevented
              </div>
              <div className='text-xl font-bold'>
                {calculatedMetrics?.annualErrorPrevention.toLocaleString()}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='text-sm font-medium'>Total Annual ROI</div>
              <div className='text-xl font-bold text-green-600'>
                ${annualROI.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ROICalculatorSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-4 w-60' />
        </div>
        <Skeleton className='h-9 w-20' />
      </div>

      {/* Summary Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-2 h-8 w-24' />
              <Skeleton className='h-3 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Breakdown Card */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-32' />
        </CardHeader>
        <CardContent className='space-y-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-4 w-40' />
                <Skeleton className='h-6 w-16' />
              </div>
              <Skeleton className='h-3 w-60' />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
