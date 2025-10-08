'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import api from '@/services/api/api-client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import GoogleIcon from '@/components/icons/GoogleIcon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { SafeCredential } from '@duramation/shared';

export default function CredentialsTab() {
  const { getToken: _getToken, isLoaded, isSignedIn } = useAuth();
  const getToken = useCallback(() => _getToken(), [_getToken]);
  const [credentials, setCredentials] = useState<SafeCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedCredentialId, setSelectedCredentialId] = useState<
    string | null
  >(null);

  const loadCredentials = useCallback(async () => {
    if (!isLoaded || !isSignedIn) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const credsResponse = await api.credentials.list(token);
      setCredentials(credsResponse.data || []);
    } catch (error) {
      console.error('Failed to load credentials:', error);
      toast.error('Failed to load credentials.');
    } finally {
      setLoading(false);
    }
  }, [getToken, isLoaded, isSignedIn]);

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  const handleRemove = async () => {
    if (!selectedCredentialId) return;

    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication session expired. Please sign in again.');
        return;
      }
      await api.credentials.remove(token, selectedCredentialId);
      setCredentials((prev) =>
        prev.filter((c) => c.id !== selectedCredentialId)
      );
      toast.success('Credential removed successfully.');
    } catch (error) {
      console.error('Failed to remove credential:', error);
      toast.error('Failed to remove credential.');
    } finally {
      setIsAlertOpen(false);
      setSelectedCredentialId(null);
    }
  };

  const formatProviderName = (provider: string) => {
    if (!provider) return '';
    return provider.charAt(0).toUpperCase() + provider.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className='text-muted-foreground rounded-md border p-6 text-sm'>
        Loading credentials...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className='text-muted-foreground rounded-md border p-6 text-sm'>
        Please sign in to view credentials.
      </div>
    );
  }

  return (
    <>
      <div className='w-full space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-base font-medium'>Credentials</h2>
        </div>

        {credentials.length === 0 ? (
          <div className='text-muted-foreground w-full rounded-md border p-6 text-sm'>
            No credentials yet. Add credentials from the Workflows tab when
            setting up your automations.
          </div>
        ) : (
          <div className='grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {credentials.map((c) => (
              <Card key={c.id}>
                <CardHeader className='pb-2'>
                  <CardTitle className='flex items-center gap-3 text-lg'>
                    {c.provider === 'GOOGLE' && (
                      <GoogleIcon className='h-5 w-5' />
                    )}
                    {formatProviderName(c.provider)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground text-sm'>{c.name}</p>
                </CardContent>
                <CardFooter className='flex justify-end'>
                  <Button
                    variant='outline'
                    onClick={() => {
                      setSelectedCredentialId(c.id);
                      setIsAlertOpen(true);
                    }}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              credential and may break workflows that depend on it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
