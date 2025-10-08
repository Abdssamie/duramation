'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import api from '@/services/api/api-client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { Provider } from '@duramation/db/types';
import { Sparkles } from 'lucide-react';

// Helper function to get provider icon
const getProviderIcon = (provider: string) => {
  const providerKey = provider.toLowerCase() as keyof typeof Icons;
  const IconComponent = Icons[providerKey];
  return IconComponent || null;
};

// Helper function to format provider name
const formatProviderName = (provider: string) => {
  return provider.charAt(0).toUpperCase() + provider.slice(1).toLowerCase();
};

interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  requiredProviders: Provider[];
  isInstalled: boolean;
  hasNewVersion: boolean;
  canInstall: boolean;
}

interface MarketplaceClientProps {
  items: MarketplaceItem[];
  pagination?: {
    page: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
  limit: number;
}

export default function MarketplaceClient({ items, pagination, limit }: MarketplaceClientProps) {
  const { getToken } = useAuth();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [localItems, setLocalItems] = useState<MarketplaceItem[]>(items);

  // Sync local state when props change (e.g., on page navigation)
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleInstallWorkflow = async (tpl: MarketplaceItem) => {
    setLoadingStates(prev => ({ ...prev, [tpl.id]: true }));
    
    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication failed. Please try again.');
        return;
      }

      const wasUpdate = tpl.isInstalled && tpl.hasNewVersion;

      await api.workflows.install(
        token,
        tpl.id,
        tpl.name,
        wasUpdate
      );
      
      // Immediately update local state for instant UI feedback
      setLocalItems(prev => prev.map(item => 
        item.id === tpl.id 
          ? { 
              ...item, 
              isInstalled: true, 
              hasNewVersion: false 
            }
          : item
      ));
      
      toast.success(
        wasUpdate
          ? 'Workflow updated successfully!'
          : 'Workflow installed successfully!'
      );
    } catch (error) {
      console.error('Failed to install/update workflow:', error);
      toast.error(
        tpl.isInstalled && tpl.hasNewVersion
          ? 'Failed to update workflow.'
          : 'Failed to install workflow.'
      );
    } finally {
      setLoadingStates(prev => ({ ...prev, [tpl.id]: false }));
    }
  };

  if (localItems.length === 0) {
    return (
      <div className='text-center py-12'>
        <Icons.marketplace className='mx-auto h-12 w-12 text-muted-foreground mb-4' />
        <h3 className='text-lg font-medium mb-2'>No workflows available</h3>
        <p className='text-muted-foreground text-sm'>
          Check back later for new automation templates.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {localItems.map((tpl) => (
          <Card 
            key={tpl.id} 
            className={`flex flex-col transition-all duration-200 hover:shadow-md ${
              tpl.isInstalled && tpl.hasNewVersion 
                ? 'ring-2 ring-blue-200 dark:ring-blue-800' 
                : ''
            }`}
          >
            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between gap-2'>
                <CardTitle className='text-lg leading-tight line-clamp-2 min-w-0 flex-1'>
                  {tpl.name}
                </CardTitle>
                
                {tpl.isInstalled && tpl.hasNewVersion && (
                  <div className='flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium shrink-0'>
                    <Sparkles className='h-3 w-3' />
                    <span>Update</span>
                  </div>
                )}
                {tpl.isInstalled && !tpl.hasNewVersion && (
                  <Badge variant='outline' className='shrink-0 text-xs'>
                    Installed
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className='space-y-4 flex-1'>
              <p className='text-muted-foreground text-sm line-clamp-3'>
                {tpl.description}
              </p>
              
              {Array.isArray(tpl.requiredProviders) && tpl.requiredProviders.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium'>Required Integrations:</h4>
                  <div className='flex flex-wrap gap-2 max-h-20 overflow-y-auto'>
                    {tpl.requiredProviders.slice(0, 6).map((provider) => {
                      const IconComponent = getProviderIcon(provider);
                      return (
                        <div
                          key={provider}
                          className='flex items-center gap-1.5 bg-muted rounded-md px-2.5 py-1 shrink-0'
                        >
                          {IconComponent && (
                            <IconComponent className='h-3.5 w-3.5 shrink-0' />
                          )}
                          <span className='text-xs font-medium truncate max-w-20'>
                            {formatProviderName(provider)}
                          </span>
                        </div>
                      );
                    })}
                    {tpl.requiredProviders.length > 6 && (
                      <div className='flex items-center justify-center bg-muted rounded-md px-2.5 py-1 shrink-0'>
                        <span className='text-xs font-medium text-muted-foreground'>
                          +{tpl.requiredProviders.length - 6} more
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className='pt-4'>
              <Button
                onClick={() => handleInstallWorkflow(tpl)}
                disabled={(!tpl.canInstall && !tpl.hasNewVersion) || loadingStates[tpl.id]}
                className={`w-full ${
                  tpl.isInstalled && tpl.hasNewVersion
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0'
                    : ''
                }`}
                variant={tpl.isInstalled && tpl.hasNewVersion ? undefined : 'default'}
              >
                {loadingStates[tpl.id] 
                  ? 'Processing...'
                  : tpl.isInstalled && tpl.hasNewVersion
                    ? 'Update'
                    : tpl.isInstalled
                      ? 'Installed'
                      : 'Install'
                }
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className='flex items-center justify-between'>
          <div className='text-muted-foreground text-sm'>
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <div className='flex gap-2'>
            {pagination.hasPrev ? (
              <Button variant='outline' size='sm' asChild>
                <a href={`?page=${Math.max(1, pagination.page - 1)}&limit=${limit}`}>
                  Previous
                </a>
              </Button>
            ) : (
              <Button variant='outline' size='sm' disabled>
                Previous
              </Button>
            )}
            {pagination.hasNext ? (
              <Button variant='outline' size='sm' asChild>
                <a href={`?page=${pagination.page + 1}&limit=${limit}`}>
                  Next
                </a>
              </Button>
            ) : (
              <Button variant='outline' size='sm' disabled>
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}