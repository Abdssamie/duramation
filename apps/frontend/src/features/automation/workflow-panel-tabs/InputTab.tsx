'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import api from '@/services/api/api-client';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Save, AlertCircle } from 'lucide-react';
import { TabsContent } from '@/components/ui/tabs';
import {
  WorkflowInputFieldDefinition,
  WorkflowWithCredentials
} from '@/types/workflow';
import { WorkflowInputForm } from '@/utils/input-transformer';
import { Provider } from '@duramation/integrations';
import {
  Alert,
  AlertDescription
} from '@/components/ui/alert';

type Props = {
  workflow: WorkflowWithCredentials;
  input: Record<string, unknown>;
  fields: WorkflowInputFieldDefinition[] | null;
  setInputAction: Dispatch<SetStateAction<Record<string, unknown>>>;
  onUpdateAction: (
    id: string,
    workflowTemplateUtilsUpdate: Partial<WorkflowWithCredentials>
  ) => void;
};

type Cred = {
  workflowId: string;
  credentialId: string;
  credential: {
    id: string;
    name: string;
    type: string;
    provider: Provider;
    userId: string;
    secret: string;
    config: any;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function InputTab({
  workflow,
  input,
  setInputAction,
  fields,
  onUpdateAction
}: Props) {
  const { getToken } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const hasChanges =
    JSON.stringify(input) !== JSON.stringify(workflow.input || {});

  // Warn user before leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const validateInput = (field: WorkflowInputFieldDefinition, value: any): string | null => {
    const validation = field.validation;
    
    // Required field validation
    if (validation?.required && (value === undefined || value === null || value === '')) {
      return `${field.label} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value && !validation?.required) {
      return null;
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return `${field.label} must be a valid email address`;
      }
    }

    // URL validation
    if (field.type === 'url' && value) {
      try {
        new URL(value);
      } catch {
        return `${field.label} must be a valid URL`;
      }
    }

    // Number validation
    if (field.type === 'number' && value !== '') {
      const num = Number(value);
      if (isNaN(num)) {
        return `${field.label} must be a valid number`;
      }
      if (validation?.min !== undefined && num < validation.min) {
        return `${field.label} must be at least ${validation.min}`;
      }
      if (validation?.max !== undefined && num > validation.max) {
        return `${field.label} must be at most ${validation.max}`;
      }
    }

    // Pattern validation
    if (validation?.pattern && value) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        return `${field.label} format is invalid`;
      }
    }

    // JSON validation
    if (field.type === 'json' && value) {
      try {
        JSON.parse(value);
      } catch {
        return `${field.label} must be valid JSON`;
      }
    }

    return null;
  };

  const validateAllInputs = (): boolean => {
    if (!fields) return true;

    const errors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach((field) => {
      const error = validateInput(field, input[field.key]);
      if (error) {
        errors[field.key] = error;
        hasErrors = true;
      }
    });

    setValidationErrors(errors);

    if (hasErrors) {
      const errorMessages = Object.values(errors);
      toast.error(
        <div className="space-y-1">
          <div className="font-semibold">Please fix the following errors:</div>
          {errorMessages.slice(0, 3).map((msg, i) => (
            <div key={i} className="text-sm">• {msg}</div>
          ))}
          {errorMessages.length > 3 && (
            <div className="text-sm">• And {errorMessages.length - 3} more...</div>
          )}
        </div>
      );
    }

    return !hasErrors;
  };

  const handleSave = async () => {
    // Validate inputs before saving
    if (!validateAllInputs()) {
      return;
    }

    setIsSaving(true);
    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication failed. Please try again.');
        return;
      }

      await api.workflows.update(token, workflow.id, { input });
      onUpdateAction(workflow.id, { input });
      setValidationErrors({});
      toast.success('Input configuration saved successfully!');
    } catch (error: any) {
      console.error('Failed to save workflow input:', error);
      toast.error(error.message || 'Failed to save input. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TabsContent value='input' className='mt-0 space-y-4'>
      {hasChanges && (
        <Alert>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            You have unsaved changes. Don&apos;t forget to save your configuration.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>Input Configuration</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          {fields && fields.length > 0 ? (
            <WorkflowInputForm
              fields={fields}
              values={input}
              setValues={setInputAction}
              validationErrors={validationErrors}
            />
          ) : (
            <div className='py-8 text-center'>
              <p className='text-muted-foreground text-sm'>
                No input configuration available for this workflow
              </p>
            </div>
          )}

          {workflow.workflowCredentials &&
            workflow.workflowCredentials.length > 0 && (
              <div>
                <div className='text-muted-foreground mb-1 text-xs'>
                  Required Credentials:
                </div>
                <div className='flex flex-wrap gap-1'>
                  {workflow.workflowCredentials.map((cred: Cred, i: number) => (
                    <Badge key={i} variant='outline' className='text-xs'>
                      {cred?.credential?.name ||
                        cred?.credential?.type ||
                        `Credential ${i + 1}`}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
        </CardContent>
        {fields && fields.length > 0 && (
          <CardFooter className='flex justify-end'>
            <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
              <Save className='mr-2 h-4 w-4' />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        )}
      </Card>
    </TabsContent>
  );
}
