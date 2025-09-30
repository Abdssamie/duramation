'use client';

import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { AutomationStatusCards } from '@/components/client-dashboard/automation-status-cards';
import { ROIMetricsDisplay } from '@/components/client-dashboard/roi-metrics-display';
import { MetricsOverview } from '@/components/client-dashboard/metrics-overview';
import { PerformanceCharts } from '@/components/client-dashboard/performance-charts';
import { ROICalculator } from '@/components/client-dashboard/roi-calculator';

interface ClientBranding {
  companyName: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

interface ClientDashboardProps {
  branding?: ClientBranding;
  className?: string;
}

export function ClientDashboard({ branding, className }: ClientDashboardProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header Section with Branding */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          {branding?.logoUrl && (
            <img
              src={branding.logoUrl}
              alt={`${branding.companyName} logo`}
              className='h-12 w-auto'
            />
          )}
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              {branding?.companyName
                ? `${branding.companyName} Dashboard`
                : 'Automation Dashboard'}
            </h1>
            <p className='text-muted-foreground'>
              Monitor your automation performance and ROI
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Automation Status Section */}
        <div className='md:col-span-2 lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Automation Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<AutomationStatusSkeleton />}>
                <AutomationStatusCards />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* ROI Metrics Section */}
        <div className='lg:col-span-1'>
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<ROIMetricsSkeleton />}>
                <ROIMetricsDisplay />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Metrics Overview */}
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<MetricsOverviewSkeleton />}>
              <MetricsOverview />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<PerformanceChartsSkeleton />}>
              <PerformanceCharts />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* ROI Calculator */}
      <div className='space-y-6'>
        <Suspense fallback={<ROICalculatorSkeleton />}>
          <ROICalculator />
        </Suspense>
      </div>

      {/* Additional Dashboard Sections */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div className='h-2 w-2 rounded-full bg-green-500' />
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    Order Processing Automation
                  </p>
                  <p className='text-muted-foreground text-xs'>
                    Completed successfully • 2 minutes ago
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='h-2 w-2 rounded-full bg-blue-500' />
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Inventory Sync</p>
                  <p className='text-muted-foreground text-xs'>
                    Running • Started 5 minutes ago
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='h-2 w-2 rounded-full bg-green-500' />
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Customer Email Campaign</p>
                  <p className='text-muted-foreground text-xs'>
                    Completed successfully • 1 hour ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-3'>
              <button className='hover:bg-accent flex items-center justify-between rounded-lg border p-3 text-left'>
                <div>
                  <p className='font-medium'>Request New Automation</p>
                  <p className='text-muted-foreground text-sm'>
                    Get help with a new process
                  </p>
                </div>
                <div className='text-muted-foreground h-4 w-4'>→</div>
              </button>
              <button className='hover:bg-accent flex items-center justify-between rounded-lg border p-3 text-left'>
                <div>
                  <p className='font-medium'>View Reports</p>
                  <p className='text-muted-foreground text-sm'>
                    Download performance reports
                  </p>
                </div>
                <div className='text-muted-foreground h-4 w-4'>→</div>
              </button>
              <button className='hover:bg-accent flex items-center justify-between rounded-lg border p-3 text-left'>
                <div>
                  <p className='font-medium'>Manage Integrations</p>
                  <p className='text-muted-foreground text-sm'>
                    Update service connections
                  </p>
                </div>
                <div className='text-muted-foreground h-4 w-4'>→</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Loading skeletons for better UX
function AutomationStatusSkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='space-y-3'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-8 w-1/2' />
          <Skeleton className='h-3 w-full' />
        </div>
      ))}
    </div>
  );
}

function ROIMetricsSkeleton() {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='space-y-2'>
          <Skeleton className='h-4 w-2/3' />
          <Skeleton className='h-6 w-1/2' />
          <Skeleton className='h-3 w-3/4' />
        </div>
      ))}
    </div>
  );
}

function MetricsOverviewSkeleton() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-4' />
          </CardHeader>
          <CardContent>
            <Skeleton className='mb-2 h-8 w-16' />
            <Skeleton className='h-4 w-24' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PerformanceChartsSkeleton() {
  return (
    <div className='space-y-6'>
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

function ROICalculatorSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-4 w-60' />
        </div>
        <Skeleton className='h-9 w-20' />
      </div>
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
