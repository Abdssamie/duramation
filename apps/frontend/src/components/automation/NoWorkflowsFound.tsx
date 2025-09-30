import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NoWorkflowsFound = function NoWorkflowsFound() {
  return (
    <div className='w-full'>
      <div className='flex min-h-[300px] items-center justify-center p-6'>
        <Card className='w-full max-w-xl text-center'>
          <CardHeader>
            <CardTitle className='flex items-center justify-center gap-2 text-lg'>
              <Store className='text-muted-foreground h-5 w-5' />
              <span>No workflows yet</span>
            </CardTitle>
          </CardHeader>
          <CardContent className='text-muted-foreground'>
            Kickstart your automation by browsing the marketplace and installing
            a ready‑made workflow, or create your own from scratch.
          </CardContent>
          <CardFooter className='flex items-center justify-center gap-3'>
            <a href='/dashboard/marketplace'>
              <Button variant='default' className='gap-2'>
                <Store className='h-4 w-4' />
                Browse marketplace
              </Button>
            </a>
            <a href='/dashboard/automation/new'>
              <Button variant='outline'>Create workflow</Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
