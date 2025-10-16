'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X, Play, Key, Settings, Activity, Maximize2, Minimize2 } from 'lucide-react';
import { WorkflowInputFieldDefinition } from '@duramation/shared';
import { WorkflowWithCredentials } from '@/types/workflow';
import { toast } from 'sonner';
import { useWorkflowRealtime } from '@/hooks/useWorkflowRealtime';

import OperationsTab from '../workflow-panel-tabs/OperationsTab';
import WorkflowCredentialsTab from '../workflow-panel-tabs/WorkflowCredentialsTab';
import InputTab from '@/features/automation/workflow-panel-tabs/InputTab';
import LogsTab from '@/features/automation/workflow-panel-tabs/LogTab';

interface WorkflowDetailWidgetProps {
  workflow: WorkflowWithCredentials;
  isOpen: boolean;
  onCloseAction: () => void;
  onUpdateAction: (
    id: string,
    update: Partial<WorkflowWithCredentials>
  ) => void;
  templateFields: WorkflowInputFieldDefinition[] | null;
  onRealtimeDataChange?: (hasData: boolean) => void;
}

export default function WorkflowDetailWidget({
  workflow,
  isOpen,
  onCloseAction,
  onUpdateAction,
  templateFields,
  onRealtimeDataChange
}: WorkflowDetailWidgetProps) {
  const [activeTab, setActiveTab] = useState('input');
  const [input, setInput] = useState<Record<string, unknown>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [, setTimezone] = useState<string>('UTC');

  // Move realtime hook to parent to persist data across tab switches
  // Always call the hook, enabled must always be true (bug in useInngestSubscription)
  const realtimeData = useWorkflowRealtime({
    workflowId: workflow.id,
    enabled: true,
    bufferInterval: 2000,
  });

  // Notify parent when realtime data changes
  useEffect(() => {
    const hasData = realtimeData.logs.length > 0 || realtimeData.aiStreams.length > 0;
    onRealtimeDataChange?.(hasData);
  }, [realtimeData.logs.length, realtimeData.aiStreams.length, onRealtimeDataChange]);

  // Debug logging for realtime connection
  useEffect(() => {
    console.log('[WorkflowDetailWidget] Realtime state:', {
      workflowId: workflow.id,
      workflowStatus: workflow.status,
      isRunning,
      realtimeState: realtimeData.state,
      isConnected: realtimeData.isConnected,
      logsCount: realtimeData.logs.length
    });
  }, [workflow.id, workflow.status, isRunning, realtimeData.state, realtimeData.isConnected, realtimeData.logs.length]);

  // Update running state when workflow status changes
  useEffect(() => {
    const newIsRunning = workflow.status === 'RUNNING';
    setIsRunning(newIsRunning);
  }, [workflow.status]);

  // Reset state when workflow changes
  useEffect(() => {
    // Reset state when workflow changes to prevent stale data
    setInput((workflow.input as Record<string, unknown>) || {});
    setTimezone(workflow.timezone || 'UTC');
    setActiveTab('input'); // Reset to input tab when workflow changes
  }, [workflow.id, workflow.input, workflow.timezone]); // Only trigger when workflow ID changes

  // Handle workflow status changes
  useEffect(() => {
    const wasRunning = isRunning;
    const isNowRunning = workflow.status === 'RUNNING';

    // Switch to logs tab when workflow starts
    if (!wasRunning && isNowRunning) {
      setActiveTab('logs');
    }

    // Show error toast if workflow just failed
    if (wasRunning && workflow.status === 'FAILED') {
      toast.error(
        <div className="space-y-1">
          <div className="font-semibold">Workflow execution failed</div>
          <div className="text-xs text-muted-foreground">
            This might be due to invalid input configuration. Check the Input tab and Logs for details.
          </div>
        </div>,
        { duration: 6000 }
      );
    }
  }, [workflow.status, isRunning]);

  const schedules = Array.isArray(workflow.cronExpressions)
    ? workflow.cronExpressions
    : [];
  const scheduled = schedules.length > 0;

  const handleClose = () => {
    setIsExpanded(false);
    onCloseAction();
  };

  const renderHeader = (isModal = false) => (
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
      <div className='flex items-center gap-1'>
        {!isModal && (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className='h-4 w-4' /> : <Maximize2 className='h-4 w-4' />}
          </Button>
        )}
        {isModal && (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsExpanded(false)}
            title='Minimize'
          >
            <Minimize2 className='h-4 w-4' />
          </Button>
        )}
        {!isModal && (
          <Button variant='ghost' size='sm' onClick={handleClose}>
            <X className='h-4 w-4' />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop - only on small screens when open */}
      {isOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/20 lg:hidden'
          onClick={handleClose}
        />
      )}

      {/* Side Panel Widget */}
      <div
        className={`bg-background border-border fixed inset-y-0 right-0 z-50 flex w-96 flex-col rounded-l-lg border shadow-xl transition-transform duration-300 lg:fixed lg:top-16 lg:right-0 lg:z-30 lg:h-[calc(100vh-4rem)] ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} ${isOpen ? 'lg:block' : 'lg:hidden'} `}
      >
        {renderHeader()}

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
                      onWorkflowStart={() => setActiveTab('logs')}
                    />
                  </TabsContent>

                  <TabsContent value='credentials'>
                    <WorkflowCredentialsTab workflow={workflow} />
                  </TabsContent>

                  <TabsContent value='logs'>
                    <LogsTab
                      workflowId={workflow.id}
                      isRunning={isRunning}
                      realtimeData={realtimeData}
                    />
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Expanded Modal View */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="!max-w-[90vw] sm:!max-w-[80vw] md:!max-w-[70vw] lg:!max-w-[60vw] !h-[95vh] p-0 flex flex-col" hideClose>
          <VisuallyHidden>
            <DialogTitle>{workflow.name} - Workflow Details</DialogTitle>
          </VisuallyHidden>
          {renderHeader(true)}

          <div className='flex-1  overflow-hidden'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='flex h-full flex-col px-6'
            >
              <TabsList className='!mt-4 !grid !w-full !max-w-md mx-auto grid-cols-4'>
                <TabsTrigger value='input' className='flex items-center justify-center gap-1 sm:gap-2' title='Input'>
                  <Settings className='h-4 w-4 flex-shrink-0' />
                  <span className='hidden sm:inline truncate'>Input</span>
                </TabsTrigger>
                <TabsTrigger value='operations' className='flex items-center justify-center gap-1 sm:gap-2' title='Run'>
                  <Play className='h-4 w-4 flex-shrink-0' />
                  <span className='hidden sm:inline truncate'>Run</span>
                </TabsTrigger>
                <TabsTrigger value='credentials' className='flex items-center justify-center gap-1 sm:gap-2' title='Credentials'>
                  <Key className='h-4 w-4 flex-shrink-0' />
                  <span className='hidden sm:inline'>Credentials</span>
                </TabsTrigger>
                <TabsTrigger value='logs' className='flex items-center justify-center gap-1 sm:gap-2' title='Logs'>
                  <Activity className='h-4 w-4 flex-shrink-0' />
                  <span className='hidden sm:inline truncate'>Logs</span>
                </TabsTrigger>
              </TabsList>

              <div className='flex-1 overflow-hidden mt-4'>
                <ScrollArea className='h-full'>
                  <div className='pb-6'>
                    <TabsContent value='input' className='mt-0'>
                      <InputTab
                        workflow={workflow}
                        input={input}
                        fields={templateFields}
                        setInputAction={setInput}
                        onUpdateAction={onUpdateAction}
                      />
                    </TabsContent>

                    <TabsContent value='operations' className='mt-0'>
                      <OperationsTab
                        workflow={workflow}
                        onUpdateAction={onUpdateAction}
                        schedules={schedules}
                        input={input}
                        setIsRunningAction={setIsRunning}
                        isRunning={isRunning}
                        onWorkflowStart={() => setActiveTab('logs')}
                      />
                    </TabsContent>

                    <TabsContent value='credentials' className='mt-0'>
                      <WorkflowCredentialsTab workflow={workflow} />
                    </TabsContent>

                    <TabsContent value='logs' className='mt-0'>
                      <LogsTab
                        workflowId={workflow.id}
                        isRunning={isRunning}
                        realtimeData={realtimeData}
                      />
                    </TabsContent>
                  </div>
                </ScrollArea>
              </div>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
