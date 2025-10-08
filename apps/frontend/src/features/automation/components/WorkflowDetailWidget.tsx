'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Play, Key, Settings, Activity } from 'lucide-react';
import { WorkflowInputFieldDefinition } from '@duramation/shared';
import { WorkflowWithCredentials } from '@/types/workflow';

import OperationsTab from '../workflow-panel-tabs/OperationsTab';
import WorkflowCredentialsTab from '../workflow-panel-tabs/WorkflowCredentialsTab';
import InputTab from '@/features/automation/workflow-panel-tabs/InputTab';
import LogsTab from '@/features/automation/workflow-panel-tabs/LogTab';

interface WorkflowDetailWidgetProps {
  workflow: WorkflowWithCredentials | null;
  isOpen: boolean;
  onCloseAction: () => void;
  onUpdateAction: (
    id: string,
    update: Partial<WorkflowWithCredentials>
  ) => void;
  templateFields: WorkflowInputFieldDefinition[] | null;
}

export default function WorkflowDetailWidget({
  workflow,
  isOpen,
  onCloseAction,
  onUpdateAction,
  templateFields
}: WorkflowDetailWidgetProps) {
  const [activeTab, setActiveTab] = useState('input');
  const [input, setInput] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState(false);

  const [timezone, setTimezone] = useState<string>('UTC');

  useEffect(() => {
    if (workflow) {
      setInput((workflow.input as Record<string, any>) || {});
      setTimezone(workflow.timezone || 'UTC');
      setIsRunning(workflow.status === 'RUNNING');
    }
  }, [workflow]);

  if (!workflow) {
    return null;
  }

  const schedules = Array.isArray(workflow.cronExpressions)
    ? workflow.cronExpressions
    : [];
  const scheduled = schedules.length > 0;

  return (
    <>
      {/* Backdrop - only on small screens when open */}
      {isOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/20 lg:hidden'
          onClick={onCloseAction}
        />
      )}

      {/* Widget */}
      <div
        className={`bg-background border-border fixed inset-y-0 right-0 z-50 flex w-96 flex-col rounded-l-lg border shadow-xl transition-transform duration-300 lg:fixed lg:top-16 lg:right-0 lg:z-30 lg:h-[calc(100vh-4rem)] ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} ${isOpen ? 'lg:block' : 'lg:hidden'} `}
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b p-4'>
          <div className='flex min-w-0 items-center gap-2'>
            <span
              className='inline-block size-2 rounded-full'
              style={{
                backgroundColor: isRunning
                  ? '#22c55e'
                  : workflow.status === 'FAILED'
                    ? '#ef4444'
                    : '#94a3b8'
              }}
            />
            <h2 className='truncate font-semibold'>{workflow.name}</h2>
            {scheduled && (
              <Badge variant='secondary' className='text-xs'>
                Scheduled
              </Badge>
            )}
          </div>
          <Button variant='ghost' size='sm' onClick={onCloseAction}>
            <X className='h-4 w-4' />
          </Button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-hidden'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='flex h-full flex-col px-4'
          >
            <TabsList className='mt-4 grid w-full grid-cols-4'>
              <TabsTrigger value='input' className='px-1 text-[10px]'>
                <Settings className='mr-1 h-3 w-3' />
                Input
              </TabsTrigger>
              <TabsTrigger value='operations' className='px-1 text-[10px]'>
                <Play className='mr-1 h-3 w-3' />
                Run
              </TabsTrigger>
              <TabsTrigger value='credentials' className='px-1 text-[10px]'>
                <Key className='mr-1 h-3 w-3' />
                Credentials
              </TabsTrigger>
              <TabsTrigger value='logs' className='px-1 text-[10px]'>
                <Activity className='mr-1 h-3 w-3' />
                Logs
              </TabsTrigger>
            </TabsList>

            <div className='flex-1 overflow-hidden'>
              <ScrollArea className='h-full lg:h-[calc(100vh-200px)]'>
                <div className='py-4'>
                  <TabsContent value='input'>
                    <InputTab
                      workflow={workflow}
                      input={input}
                      fields={templateFields}
                      setInputAction={setInput}
                      onUpdateAction={onUpdateAction}
                    />
                  </TabsContent>

                  <TabsContent value='operations'>
                    <OperationsTab
                      workflow={workflow}
                      onUpdateAction={onUpdateAction}
                      schedules={schedules}
                      input={input}
                      setIsRunningAction={setIsRunning}
                      isRunning={isRunning}
                    />
                  </TabsContent>

                  <TabsContent value='credentials'>
                    <WorkflowCredentialsTab workflow={workflow} />
                  </TabsContent>

                  <TabsContent value='logs'>
                    <LogsTab
                      isRunning={isRunning}
                      state={null}
                      realtimeError={null}
                      realtimeData={null}
                    />
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}
