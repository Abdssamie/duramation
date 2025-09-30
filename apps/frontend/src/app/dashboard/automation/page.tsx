import { auth } from '@clerk/nextjs/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorkflowsTab from '@/features/automation/components/WorkflowsTab';
import CredentialsTab from '@/features/automation/components/CredentialsTab';
import HistoryTab from '@/features/automation/components/HistoryTab';
import PageContainer from '@/components/layout/page-container';

export default async function Automation() {
  const { getToken } = await auth();
  const token = await getToken();
  if (!token) {
    return <div className='p-6'>Please sign in to manage workflows.</div>;
  }

  return (
    <PageContainer>
      <div className='space-y-6 p-6'>
        <Tabs defaultValue='workflows' className='w-full'>
          <TabsList>
            <TabsTrigger value='workflows'>Workflows</TabsTrigger>
            <TabsTrigger value='credentials'>Credentials</TabsTrigger>
            <TabsTrigger value='history'>History</TabsTrigger>
          </TabsList>

          <TabsContent value='workflows' className='mt-4'>
            <WorkflowsTab />
          </TabsContent>

          <TabsContent value='credentials' className='mt-4'>
            <CredentialsTab />
          </TabsContent>

          <TabsContent value='history' className='mt-4'>
            <HistoryTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
