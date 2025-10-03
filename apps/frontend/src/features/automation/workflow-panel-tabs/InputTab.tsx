'use client';

import { Dispatch, SetStateAction, useState } from 'react';
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
import { Save } from 'lucide-react';
import { TabsContent } from '@/components/ui/tabs';
import {
  WorkflowInputFieldDefinition,
  WorkflowWithCredentials
} from '@/types/workflow';
import { WorkflowInputForm } from '@/utils/input-transformer';
import { Provider } from '@duramation/integrations';

type Props = {
  workflow: WorkflowWithCredentials;
  input: Record<string, unknown>;
  fields: WorkflowInputFieldDefinition[] | null;
  setInputAction: Dispatch<SetStateAction<Record<string, any>>>;
  onUpdateAction: (
    id: string,
    uworkflowTemplateUtilspdate: Partial<WorkflowWithCredentials>
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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = await getToken();
      if (!token) {
        toast.error('Authentication failed. Please try again.');
        return;
      }

      await api.workflows.update(token, workflow.id, { input });
      onUpdateAction(workflow.id, { input });
      toast.success('Input configuration saved successfully!');
    } catch (error: any) {
      console.error('Failed to save workflow input:', error);
      toast.error(error.message || 'Failed to save input. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges =
    JSON.stringify(input) !== JSON.stringify(workflow.input || {});

  return (
    <TabsContent value='input' className='mt-0 space-y-4'>
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
            />
          ) : (
            <div className='py-8 text-center'>
              <p className='text-muted-foreground text-sm'>
                No input configuration available for this workflow
              </p>
              <p className='text-muted-foreground mt-2 text-xs'>
                Template: {workflow.templateId || 'Unknown'} | Event:{' '}
                {workflow.eventName || 'None'}
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
