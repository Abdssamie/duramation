'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import useDictionary from '@/locales/dictionary-hook';

export default function GithubSignInButton() {
  const dict = useDictionary();

  return (
    <Button
      className='w-full'
      variant='outline'
      type='button'
      onClick={() => console.log('continue with github clicked')}
    >
      <Icons.github className='mr-2 h-4 w-4' />
      {dict.auth.continueWithGithub}
    </Button>
  );
}
