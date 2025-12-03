import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import Link from 'next/link';
export default function SignInViewPage({
  dict
}: {
  dict: any;
}) {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        {dict.auth.signIn.login}
      </Link>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          {dict.auth.signIn.logo}
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>{dict.auth.signIn.quote}</p>
            <footer className='text-sm'>{dict.auth.signIn.quoteAuthor}</footer>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <ClerkSignInForm
            initialValues={{
              emailAddress: 'your_mail+clerk_test@example.com'
            }}
          />

          <p className='text-muted-foreground px-8 text-center text-sm'>
            {dict.auth.signIn.agreementPart1}{' '}
            <Link
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              {dict.auth.signIn.termsOfService}
            </Link>{' '}
            {dict.auth.signIn.and}{' '}
            <Link
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              {dict.auth.signIn.privacyPolicy}
            </Link>
            {dict.auth.signIn.agreementPart2}
          </p>
        </div>
      </div>
    </div>
  );
}
