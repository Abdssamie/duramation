'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { IconCalendar, IconFileText } from '@tabler/icons-react';
import { ServiceRequestDialog } from '@/components/dialogs/service-request-dialog';

export function ActionCards() {
  const handleSuccess = () => {
    window.location.reload();
  };

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
      {/* Book Sales Call Card */}
      <ServiceRequestDialog
        onSuccess={handleSuccess}
        trigger={
          <Card className='@container/card cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15'>
            <CardHeader className='pb-3'>
              <CardDescription className='text-xs font-medium text-primary'>Get Started</CardDescription>
              <CardTitle className='text-lg font-semibold flex items-center gap-2 text-primary'>
                <div className='p-2 bg-primary/10 rounded-lg'>
                  <IconCalendar className='size-5' />
                </div>
                Book Sales Call
              </CardTitle>
            </CardHeader>
            <CardFooter className='pt-0'>
              <div className='text-sm text-muted-foreground font-medium'>
                Schedule a consultation with our team →
              </div>
            </CardFooter>
          </Card>
        }
      />

      {/* Generate Report Card */}
      <Card className='@container/card opacity-60'>
        <CardHeader className='pb-3'>
          <div className='flex items-center justify-between'>
            <CardDescription className='text-xs'>Analytics</CardDescription>
            <Badge variant='secondary' className='text-xs'>
              Coming Soon
            </Badge>
          </div>
          <CardTitle className='text-lg font-semibold flex items-center gap-2'>
            <IconFileText className='size-5' />
            Generate Report
          </CardTitle>
        </CardHeader>
        <CardFooter className='pt-0'>
          <div className='text-xs text-muted-foreground'>
            Export detailed analytics and insights
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}