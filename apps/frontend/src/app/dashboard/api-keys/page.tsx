import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ApiKeysClient from '@/features/api-keys/components/ApiKeysClient';
import PageContainer from '@/components/layout/page-container';

export default async function ApiKeysPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/auth/sign-in');
  }

  return (
    <PageContainer>
      <ApiKeysClient />
    </PageContainer>
  );
}
