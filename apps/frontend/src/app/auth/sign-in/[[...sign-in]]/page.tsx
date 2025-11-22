import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sign-in-view';
import { getDictionary } from '@/locales/get-dictionary';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default async function Page() {
  const dict = await getDictionary();
  return <SignInViewPage dict={dict} />;
}
