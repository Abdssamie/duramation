import { auth } from '@clerk/nextjs/server';
import api from '@/services/api/api-client';
import MarketplaceClient from '@/features/marketplace/marketplace-client';
import PageContainer from '@/components/layout/page-container';

export default async function MarketplacePage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const { getToken } = await auth();
  const token = await getToken();

  const params = await searchParams;

  if (!token) {
    return (
      <PageContainer>
        <div className='p-6'>Please sign in to browse the marketplace.</div>
      </PageContainer>
    );
  }

  const page = Number(params?.page ?? 1);
  const limit = Number(params?.limit ?? 20);

  const data = await api.marketplace.list(token, {
    page,
    limit
  });

  const items = data?.data || [];
  const pagination = data?.pagination;

  return (
    <PageContainer scrollable={true}>
      <div className='w-full space-y-6'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>Workflow Marketplace</h1>
            <p className='text-muted-foreground mt-1'>
              Discover and install pre-built automation workflows
            </p>
          </div>
        </div>

        <MarketplaceClient 
          items={items} 
          pagination={pagination} 
          limit={limit} 
        />
      </div>
    </PageContainer>
  );
}
