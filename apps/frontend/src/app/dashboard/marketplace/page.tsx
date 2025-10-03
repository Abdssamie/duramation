import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';


function formatPrice(pricing: any) {
  if (!pricing || pricing.type === 'free') return 'Free';
  const amount = typeof pricing.price === 'number' ? pricing.price / 100 : 0;
  const currency = pricing.currency || 'USD';
  const period =
    pricing.billingPeriod === 'monthly'
      ? '/mo'
      : pricing.billingPeriod === 'yearly'
        ? '/yr'
        : '';
  return (
    new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(
      amount
    ) + period
  );
}

export default async function MarketplacePage({
  searchParams
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const { getToken } = await auth();
  const token = await getToken();

  const params = await searchParams;

  if (!token) {
    return <div className='p-6'>Please sign in to browse the marketplace.</div>;
  }

  const page = Number(params?.page ?? 1);
  const limit = Number(params?.limit ?? 20);
  const search = (params?.search as string) || '';
  const provider = (params?.provider as string) || '';
  const pricing = (params?.pricing as string) || '';
  const category = (params?.category as string) || '';

  const data = await api.marketplace.list(token, {
    page,
    limit,
    search: search || undefined,
    provider: provider || undefined,
    pricing:
      pricing && pricing !== 'all' ? (pricing as 'free' | 'paid') : undefined,
    category: category || undefined
  });

  const items = data?.data?.items || [];
  const pagination = data?.data?.pagination;

  async function InstallButton({
    templateId,
    name,
    update = false
  }: {
    templateId: string;
    name: string;
    update?: boolean;
  }) {
    'use server';
    const { getToken: getT } = await auth();
    const t = await getT();
    if (!t) return;
    await api.workflows.install(t, templateId, name, update);
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-xl font-semibold'>Workflow Marketplace</h1>
        <div className='flex gap-2'>
          <form className='flex gap-2'>
            <Input
              name='search'
              placeholder='Search workflows'
              defaultValue={search}
            />
            <Select name='pricing' defaultValue={pricing}>
              <SelectTrigger className='w-36'>
                <SelectValue placeholder='Pricing' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='free'>Free</SelectItem>
                <SelectItem value='paid'>Paid</SelectItem>
              </SelectContent>
            </Select>
            <Button type='submit' variant='secondary'>
              Apply
            </Button>
          </form>
        </div>
      </div>

      {items.length === 0 ? (
        <div className='text-muted-foreground text-sm'>No templates found.</div>
      ) : (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {items.map((tpl: any) => (
            <Card key={tpl.id} className='flex flex-col'>
              <CardHeader>
                <CardTitle className='text-base'>{tpl.name}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2 text-sm'>
                {tpl.isInstalled && tpl.hasNewVersion && (
                  <span className='bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-semibold'>
                    New Version Available
                  </span>
                )}
                <p className='text-muted-foreground line-clamp-3'>
                  {tpl.description}
                </p>
                <div className='flex items-center justify-between'>
                  <span className='font-medium'>
                    {formatPrice(tpl.pricing)}
                  </span>
                  {Array.isArray(tpl.requiredProviders) &&
                  tpl.requiredProviders.length > 0 ? (
                    <span className='text-muted-foreground text-xs'>
                      {tpl.requiredProviders.join(', ')}
                    </span>
                  ) : null}
                </div>
              </CardContent>
              <CardFooter className='mt-auto flex gap-2'>
                <form
                  action={async () => {
                    'use server';
                    try {
                      const { getToken: getT } = await auth();
                      const t = await getT();
                      if (!t) return;
                      await api.workflows.install(
                        t,
                        tpl.id,
                        tpl.name,
                        tpl.isInstalled && tpl.hasNewVersion
                      );
                      toast.success('Workflow updated successfully!');
                      revalidatePath('/dashboard/marketplace');
                    } catch (error) {
                      toast.error('Failed to update workflow.');
                    }
                  }}
                >
                  <Button
                    type='submit'
                    disabled={!tpl.canInstall && !tpl.hasNewVersion}
                  >
                    {tpl.isInstalled && tpl.hasNewVersion
                      ? 'Update'
                      : tpl.isInstalled
                        ? 'Installed'
                        : 'Install'}
                  </Button>
                </form>
                <Button variant='outline'>Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {pagination ? (
        <div className='text-muted-foreground flex items-center justify-between text-sm'>
          <div>
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <div className='flex gap-2'>
            <a
              className='underline-offset-2 hover:underline disabled:opacity-50'
              aria-disabled={!pagination.hasPrev}
              href={`?page=${Math.max(1, pagination.page - 1)}&limit=${limit}`}
            >
              Previous
            </a>
            <a
              className='underline-offset-2 hover:underline disabled:opacity-50'
              aria-disabled={!pagination.hasNext}
              href={`?page=${pagination.page + 1}&limit=${limit}`}
            >
              Next
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
