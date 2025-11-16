'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Provider,
  getProviderDisplayName,
  isOAuthProvider,
  getProviderConfig,
  getProviderFields,
  ProviderIcon,
} from '@duramation/integrations';
import {
  CredentialCreateRequest,
  CredentialSecret,
} from '@duramation/shared';

// Extended field type for frontend forms
interface ProviderField {
  key: string;
  name: string;
  label: string;
  type: 'text' | 'password' | 'url' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from 'sonner';
import api from '@/services/api/api-client';
import IntegrationSelector from '@/components/integrations/IntegrationSelector';
import CredentialRequirementIndicator from './CredentialRequirementIndicator';
import { Icons } from '@/components/icons';

interface WorkflowCredentialManagerProps {
  workflowId: string;
  requiredProviders: Provider[];
  requiredScopes?: Record<string, string[]> | null;
  availableCredentials?: Array<{
    id: string;
    provider: Provider;
    name: string;
  }>;
  onCredentialAdded?: (credential: CredentialCreateRequest) => void;
  onClose?: () => void;
  open?: boolean;
}

const credentialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  fields: z.record(z.string(), z.string().optional()),
});

export default function WorkflowCredentialManager({
  workflowId,
  requiredProviders,
  requiredScopes,
  availableCredentials = [],
  onCredentialAdded,
  onClose,
  open = false
}: WorkflowCredentialManagerProps) {
  const { getToken: _getToken, isLoaded, isSignedIn } = useAuth();
  const getToken = useCallback(() => _getToken(), [_getToken]);

  const [currentStep, setCurrentStep] = useState<
    'overview' | 'select' | 'form'
  >('overview');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [oauthUrls, setOauthUrls] = useState<Record<string, string>>({});
  const [authUrlsLoading, setAuthUrlsLoading] = useState(true);

  // Initialize form with dynamic schema
  const providerFields = selectedProvider
    ? (getProviderFields(selectedProvider) as ProviderField[])
    : [];

  // Create default values for all provider fields
  const defaultFieldValues = providerFields.reduce((acc, field) => {
    acc[field.key] = '';
    return acc;
  }, {} as Record<string, string>);

  const form = useForm<z.infer<typeof credentialSchema>>({
    resolver: zodResolver(credentialSchema as any),
    defaultValues: {
      name: '',
      fields: defaultFieldValues
    }
  });

  // Reset form when provider changes
  useEffect(() => {
    if (selectedProvider) {
      const providerDisplayName = getProviderDisplayName(selectedProvider);
      const fields = getProviderFields(selectedProvider) as ProviderField[];
      const defaultFields: Record<string, string> = {};
      fields.forEach((field) => {
        defaultFields[field.key] = '';
      });

      form.reset({
        name: `${providerDisplayName} Credential`,
        fields: defaultFields
      });
    }
  }, [selectedProvider, form]);

  // Load OAuth URLs when component mounts - dynamically for all OAuth providers
  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setAuthUrlsLoading(false);
      return;
    }

    const loadOAuthUrls = async () => {
      setAuthUrlsLoading(true);
      try {
        const token = await getToken();
        if (!token) {
          setAuthUrlsLoading(false);
          return;
        }

        const oauthProviders = requiredProviders.filter(isOAuthProvider);
        const urls: Record<string, string> = {};

        for (const provider of oauthProviders) {
          const config = getProviderConfig(provider);
          if (config.authType !== 'OAUTH') continue;

          const scopes = requiredScopes?.[provider] || config.oauth.defaultScopes;
          
          // Use generic OAuth URL method from API client
          try {
            const response = await api.credentials.getOAuthUrl(
              token as string,
              provider,
              scopes,
              workflowId
            );
            urls[provider] = response.data?.authorizationUrl as string;
          } catch (error) {
            console.error(`Failed to get ${provider} OAuth URL:`, error);
          }
        }
        setOauthUrls(urls);
      } catch (error) {
        console.error('Failed to get OAuth URLs:', error);
        toast.error('Could not prepare connections. Please try again.');
      } finally {
        setAuthUrlsLoading(false);
      }
    };

    loadOAuthUrls();
  }, [
    isLoaded,
    isSignedIn,
    getToken,
    workflowId,
    requiredProviders,
    requiredScopes
  ]);

  // Refresh credentials when dialog opens (to catch OAuth returns)

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider);

    // For OAuth providers, redirect immediately
    if (isOAuthProvider(provider)) {
      if (authUrlsLoading) {
        toast.info('Preparing connection, please wait...');
        return;
      }
      const authUrl = oauthUrls[provider];
      if (authUrl) {
        window.location.href = authUrl;
        return;
      }
      toast.error(
        'Connection URL is not available for this provider. Please try again.'
      );
      return;
    }

    // For API key providers, show form
    setCurrentStep('form');
  };

  const handleFormSubmit = async (data: z.infer<typeof credentialSchema>) => {
    if (!selectedProvider) return;

    const providerFields = getProviderFields(
      selectedProvider
    ) as ProviderField[];
    let isValid = true;

    if (!data.name) {
      form.setError('name', {
        type: 'manual',
        message: 'Credential name is required',
      });
      isValid = false;
    }

    for (const field of providerFields) {
      if (field.required && !data.fields[field.key]) {
        form.setError(`fields.${field.key}`, {
          type: 'manual',
          message: `${field.label} is required`,
        });
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication required');
        setLoading(false);
        return;
      }

      const providerConfig = getProviderConfig(selectedProvider);
      const secret: CredentialSecret = data.fields as CredentialSecret;

      const credentialData: CredentialCreateRequest = {
        name: data.name,
        type: providerConfig.authType === 'OAUTH' ? 'OAUTH' : 'API_KEY',
        provider: selectedProvider,
        secret,
        config: {
          source: 'workflow' as const,
          workflowId,
          requiredScopes:
            requiredScopes?.[selectedProvider] ||
            (providerConfig.authType === 'OAUTH'
              ? providerConfig.oauth.defaultScopes
              : []),
          autoAssociate: !!workflowId,
        },
      };

      const newCredential = await api.credentials.create(token, credentialData);
      toast.success('Credential added successfully');
      onCredentialAdded?.(newCredential.data as unknown as CredentialCreateRequest);
      handleClose();
    } catch (error) {
      console.error('Failed to create credential:', error);
      toast.error('Failed to create credential');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentStep('overview');
    setSelectedProvider(null);
    form.reset({ name: '', fields: {} });
    onClose?.();
  };

  const handleAddCredential = (provider: Provider) => {
    handleProviderSelect(provider);
  };

  const renderOverview = () => (
    <div className='space-y-4'>
      <CredentialRequirementIndicator
        requiredProviders={requiredProviders}
        availableCredentials={availableCredentials}
        onAddCredential={handleAddCredential}
        showAddButton={true}
        compact={false}
      />

      <div className='flex justify-end gap-2 border-t pt-4'>
        <Button variant='outline' onClick={handleClose}>
          Close
        </Button>
        <Button onClick={() => setCurrentStep('select')}>
          Add New Credential
        </Button>
      </div>
    </div>
  );

  const renderIntegrationSelector = () => (
    <IntegrationSelector
      requiredProviders={requiredProviders}
      onProviderSelect={handleProviderSelect}
    />
  );

  const renderCredentialForm = () => {
    if (!selectedProvider) return null;

    const providerFields = getProviderFields(selectedProvider) as ProviderField[];
    const providerName = getProviderDisplayName(selectedProvider);

    // For OAuth providers, show sign-in button
    if (isOAuthProvider(selectedProvider)) {
      return (
        <div className='space-y-4'>
          <div className='py-8 text-center'>
            <h3 className='mb-2 flex items-center justify-center gap-2 text-lg font-medium'>
              <ProviderIcon provider={selectedProvider} className='h-6 w-6' />
              Connect to {providerName}
            </h3>
            <p className='text-muted-foreground mb-6'>
              You&#39;ll be redirected to {providerName} to authorize access.
            </p>
            <Button
              onClick={() => handleProviderSelect(selectedProvider)}
              className='w-full max-w-sm'
              disabled={authUrlsLoading}
            >
              {authUrlsLoading ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : null}
              {authUrlsLoading
                ? 'Preparing...'
                : `Sign in with ${providerName}`}
            </Button>
          </div>

          {requiredScopes?.[selectedProvider] && (
            <div className='rounded-md bg-blue-50 p-3'>
              <h4 className='text-sm font-medium text-blue-900'>
                Required Permissions
              </h4>
              <p className='mt-1 text-xs text-blue-700'>
                This will request access to:{' '}
                {(requiredScopes[selectedProvider] as string[]).join(', ')}
              </p>
            </div>
          )}

          <div className='flex justify-end gap-2 border-t pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setCurrentStep('select')}
            >
              Back
            </Button>
          </div>
        </div>
      );
    }

    // For API key providers, show form fields
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className='space-y-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex items-center gap-2'>
                  <ProviderIcon provider={selectedProvider} className='h-4 w-4' />
                  Credential Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={`My ${providerName} Credential`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {providerFields.map((providerField) => (
            <FormField
              key={providerField.key}
              control={form.control}
              name={`fields.${providerField.key}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {providerField.label}
                    {providerField.required && (
                      <span className='ml-1 text-red-500'>*</span>
                    )}
                  </FormLabel>
                  <FormControl>
                    {providerField.type === 'textarea' ? (
                      <Textarea
                        placeholder={providerField.placeholder}
                        rows={3}
                        {...field}
                      />
                    ) : providerField.type === 'select' ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select...' />
                        </SelectTrigger>
                        <SelectContent>
                          {providerField.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={
                          providerField.type === 'password'
                            ? 'password'
                            : 'text'
                        }
                        placeholder={providerField.placeholder}
                        {...field}
                      />
                    )}
                  </FormControl>
                  {providerField.description && (
                    <FormDescription>
                      {providerField.description}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {requiredScopes?.[selectedProvider] && (
            <div className='rounded-md bg-blue-50 p-3'>
              <h4 className='text-sm font-medium text-blue-900'>
                Required Permissions
              </h4>
              <p className='mt-1 text-xs text-blue-700'>
                This credential will need access to:{' '}
                {(requiredScopes[selectedProvider] as string[]).join(', ')}
              </p>
            </div>
          )}

          <div className='flex justify-end gap-2 border-t pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setCurrentStep('select')}
            >
              Back
            </Button>
            <Button type='submit' disabled={loading}>
              {loading ? 'Creating...' : 'Create Credential'}
            </Button>
          </div>
        </form>
      </Form>
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose(); // only reset when closing
        } else {
          // allow it to open normally
        }
      }}
    >
      <DialogContent
        className='max-w-2xl'
        aria-describedby='credential-manager-description'
      >
        <DialogDescription className='DialogDescription'>
          Manage your credentials for different integrations.
        </DialogDescription>
        <DialogTitle className='DialogTitle flex items-center gap-2'>
          {currentStep === 'overview' && 'Credential Requirements'}
          {currentStep === 'select' && (
            <>
              <Button
                variant='ghost'
                size='icon'
                className='-ml-2 h-6 w-6'
                onClick={() => setCurrentStep('overview')}
              >
                <Icons.ArrowLeft className='h-4 w-4' />
              </Button>
              Select Integration
            </>
          )}
          {currentStep === 'form' && selectedProvider && (
            <>
              <ProviderIcon provider={selectedProvider} className='h-5 w-5' />
              <span>
                Add {getProviderDisplayName(selectedProvider)} Credential
              </span>
            </>
          )}
          {currentStep === 'form' && !selectedProvider && 'Add Credential'}
        </DialogTitle>

        {currentStep === 'overview' && renderOverview()}
        {currentStep === 'select' && renderIntegrationSelector()}
        {currentStep === 'form' && renderCredentialForm()}
      </DialogContent>
    </Dialog>
  );
}
