'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CredentialCreateRequest,
  CredentialSecret,
  getProviderDisplayName,
  isOAuthProvider,
  getProviderConfig,
  getProviderFields,
  ProviderField
} from '@duramation/shared';

import { type Provider } from '@duramation/db/types';

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
  onCredentialAdded?: (credential: any) => void;
  onClose?: () => void;
  open?: boolean;
}

// Dynamic schema creation based on provider fields
const createCredentialSchema = (providerFields: ProviderField[]) => {
  const fieldsSchema: Record<string, z.ZodOptional<z.ZodString> | z.ZodString> =
    {};

  providerFields.forEach((field) => {
    if (field.required) {
      fieldsSchema[field.key] = z.string().min(1, `${field.label} is required`);
    } else {
      fieldsSchema[field.key] = z.string().optional();
    }
  });

  return z.object({
    name: z.string().min(1, 'Credential name is required'),
    fields: z.object(fieldsSchema)
  });
};

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
    ? getProviderFields(selectedProvider)
    : [];
  const schema = createCredentialSchema(providerFields);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      fields: {}
    }
  });

  // Reset form when provider changes
  useEffect(() => {
    if (selectedProvider) {
      const providerDisplayName = getProviderDisplayName(selectedProvider);
      const fields = getProviderFields(selectedProvider);
      const defaultFields: Record<string, any> = {};
      fields.forEach((field) => {
        defaultFields[field.key] = '';
      });

      form.reset({
        name: `${providerDisplayName} Credential`,
        fields: defaultFields
      });
    }
  }, [selectedProvider, form]);

  // Load OAuth URLs when component mounts
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
          const scopes = requiredScopes?.[provider] || [];
          if (provider === 'GOOGLE') {
            const response = await api.credentials.getGoogleAuthUrl(
              token,
              scopes.length > 0 ? scopes : ['email', 'profile', 'openid'],
              workflowId
            );
            urls[provider] = response.url;
          }
          // Add other OAuth providers here, e.g., SLACK, HUBSPOT
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

  const handleFormSubmit = async (data: z.infer<typeof schema>) => {
    if (!selectedProvider) return;

    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const providerConfig = getProviderConfig(selectedProvider);

      // Create the appropriate secret structure based on provider type
      let secret: CredentialSecret;

      // For API key providers, use the form fields as the secret
      const fields = getProviderFields(selectedProvider);
      if (fields.length > 0) {
        secret = data.fields as CredentialSecret;
      } else {
        // Fallback for simple API key
        secret = {
          apiKey: data.fields.apiKey || Object.values(data.fields)[0]
        } as CredentialSecret;
      }

      const credentialData: CredentialCreateRequest = {
        name: data.name,
        type: providerConfig.type,
        provider: selectedProvider,
        secret,
        config: {
          source: 'workflow' as const,
          workflowId,
          requiredScopes: requiredScopes?.[selectedProvider] || [],
          autoAssociate: !!workflowId
        }
      };

      const newCredential = await api.credentials.create(token, credentialData);

      toast.success('Credential added successfully');
      onCredentialAdded?.(newCredential);
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

    const providerFields = getProviderFields(selectedProvider);
    const providerName = getProviderDisplayName(selectedProvider);

    // For OAuth providers, show sign-in button
    if (isOAuthProvider(selectedProvider)) {
      return (
        <div className='space-y-4'>
          <div className='py-8 text-center'>
            <h3 className='mb-2 flex items-center justify-center gap-2 text-lg font-medium'>
              {selectedProvider === 'GOOGLE' && <Icons.google size={24} />}
              {selectedProvider === 'SLACK' && <Icons.slack size={24} />}
              {selectedProvider === 'HUBSPOT' && <Icons.hubspot size={24} />}
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
                  {selectedProvider === 'GOOGLE' && <Icons.google size={16} />}
                  {selectedProvider === 'SLACK' && <Icons.slack size={16} />}
                  {selectedProvider === 'HUBSPOT' && (
                    <Icons.hubspot size={16} />
                  )}
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
              name={`fields.${providerField.key}` as any}
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
              {selectedProvider === 'GOOGLE' && <Icons.google size={20} />}
              {selectedProvider === 'SLACK' && <Icons.slack size={20} />}
              {selectedProvider === 'HUBSPOT' && <Icons.hubspot size={20} />}
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
