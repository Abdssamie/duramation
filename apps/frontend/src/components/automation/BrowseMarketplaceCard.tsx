import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Plus, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BrowseMarketplaceCard() {
  return (
    <Card className='flex flex-col border-2 border-dashed transition-shadow hover:shadow-md'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base'>
          <Plus className='text-muted-foreground h-4 w-4' />
          <span>Add New Workflow</span>
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-3 text-sm'>
        <p className='text-muted-foreground'>
          Browse our marketplace to discover and install new automation
          workflows.
        </p>

        <div className='text-muted-foreground flex items-center gap-2 text-xs'>
          <Store className='h-3 w-3' />
          <span>100+ workflows available</span>
        </div>
      </CardContent>

      <CardFooter className='mt-auto'>
        <a href='/dashboard/marketplace' className='w-full'>
          <Button className='w-full' variant='outline'>
            <Store className='mr-2 h-4 w-4' />
            Browse Marketplace
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
