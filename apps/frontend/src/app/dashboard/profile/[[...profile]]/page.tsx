import PageContainer from '@/components/layout/page-container';
import ProfileViewPage from '@/features/profile/components/profile-view-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard : Profile'
};

export default function Page() {
  return (
    <PageContainer>
      <ProfileViewPage />
    </PageContainer>
  );
}
