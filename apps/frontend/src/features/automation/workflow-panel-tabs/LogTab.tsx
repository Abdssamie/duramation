'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TabsContent } from '@/components/ui/tabs';
import { Activity } from 'lucide-react';
import { InngestSubscriptionState } from '@inngest/realtime/hooks';

type Props = {
  isRunning: boolean;
  state: InngestSubscriptionState | null;
  realtimeError: Error | null;
  realtimeData: any;
};

export default function LogsTab({ isRunning }: Props) {
  return (
    <TabsContent value='logs' className='mt-0 space-y-4'>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='flex items-center gap-2 text-sm'>
            <Activity className='h-4 w-4' />
            Activity Log
            {isRunning && (
              <span className='inline-block size-2 animate-pulse rounded-full bg-green-500' />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-64'>
            <div className='space-y-2'>
              <div className='text-muted-foreground py-8 text-center text-xs'>
                <div className='mb-2 flex items-center justify-center gap-2'>
                  <Activity className='h-4 w-4' />
                  <span>Realtime Logs</span>
                </div>
                <p className='mb-1'>
                  Real-time workflow logs are not yet supported
                </p>
                <p className='text-xs opacity-75'>Coming soon...</p>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
