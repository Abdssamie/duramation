'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import GithubSignInButton from './github-auth-button';
import useDictionary from '@/locales/dictionary-hook';

const createFormSchema = (dict: any) =>
  z.object({
    email: z.string().email({ message: dict.auth.userAuthForm.emailValidation })
  });

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const dict = useDictionary();
  const formSchema = createFormSchema(dict);
  type UserFormValue = z.infer<typeof formSchema>;
  const defaultValues = {
    email: 'demo@gmail.com'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(() => {
      console.log('continue with email clicked');
      toast.success(dict.auth.userAuthForm.signedInSuccessfully);
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-2'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.auth.userAuthForm.emailLabel}</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder={dict.auth.userAuthForm.emailPlaceholder}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className='mt-2 ml-auto w-full'
            type='submit'
          >
            {dict.auth.userAuthForm.continueWithEmail}
          </Button>
        </form>
      </Form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background text-muted-foreground px-2'>
            {dict.auth.userAuthForm.orContinueWith}
          </span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
}
