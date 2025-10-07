'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconCalendar, IconFileText } from '@tabler/icons-react';
import { ServiceRequestDialog } from '@/components/dialogs/service-request-dialog';

export function ActionButtons() {
  const handleSuccess = () => {
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ServiceRequestDialog
          onSuccess={handleSuccess}
          trigger={
            <Button size="lg" className="w-full">
              <IconCalendar className="size-4 mr-2" />
              Book Sales Call
            </Button>
          }
        />
        
        <Button size="lg" variant="outline" className="w-full" disabled>
          <IconFileText className="size-4 mr-2" />
          Generate Report
          <Badge variant="secondary" className="ml-2 text-xs">
            Coming Soon
          </Badge>
        </Button>
      </CardContent>
    </Card>
  );
}