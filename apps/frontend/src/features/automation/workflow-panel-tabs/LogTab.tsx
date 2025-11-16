'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Activity, AlertCircle, Maximize2 } from 'lucide-react';
import { RealtimeLogsModal } from '@/components/realtime/RealtimeLogsModal';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getLogIcon } from '@/utils/realtime';
import { ProgressBar } from '@/components/realtime/ProgressBar';
import type { WorkflowLogType, WorkflowRealtimeData } from '@/hooks/useWorkflowRealtime';

type Props = {
  workflowId: string;
  isRunning: boolean;
  realtimeData: WorkflowRealtimeData;
};

// Helper function to get type-specific display information
const getLogTypeInfo = (type: WorkflowLogType) => {
  switch (type) {
    case 'error':
      return { 
        color: 'text-red-400', 
        bgColor: 'bg-red-500/10 border-red-500/20',
        progressColor: 'bg-red-500'
      };
    case 'progress':
      return { 
        color: 'text-purple-400', 
        bgColor: 'bg-purple-500/10 border-purple-500/20',
        progressColor: 'bg-purple-500'
      };
    case 'status':
      return { 
        color: 'text-green-600 dark:text-green-400', 
        bgColor: 'bg-green-500/10 border-green-500/20',
        progressColor: 'bg-green-500'
      };
    case 'result':
      return { 
        color: 'text-blue-600 dark:text-blue-400', 
        bgColor: 'bg-blue-500/10 border-blue-500/20',
        progressColor: 'bg-blue-500'
      };
    default:
      return { 
        color: 'text-muted-foreground', 
        bgColor: 'bg-muted/50 border-border',
        progressColor: 'bg-primary'
      };
  }
};

export default function LogsTab({ workflowId, isRunning, realtimeData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDisconnected, setShowDisconnected] = useState(false);
  
  // Destructure realtime data from parent component
  // This ensures data persists across tab switches
  const { 
    logs,
    aiStreams,
    freshLogs,
    freshAiStreams,
    error, 
    state, 
    isConnected, 
    rawData, 
    freshData, 
    latestData,
  } = realtimeData;

  // Debug state changes
  useEffect(() => {
    console.log('[LogsTab] State changed:', {
      state,
      isConnected,
      isRunning,
      logsCount: logs.length,
      error: error?.message
    });
  }, [state, isConnected, isRunning, logs.length, error]);

  // Delay showing "Disconnected" to avoid flicker during rapid state changes
  useEffect(() => {
    if (!isRunning) {
      setShowDisconnected(true);
      return;
    }

    // If connecting or active, don't show disconnected
    if (state === 'connecting' || state === 'refresh_token' || state === 'active') {
      setShowDisconnected(false);
      return;
    }

    // For closed state, wait a bit before showing disconnected
    if (state === 'closed') {
      const timer = setTimeout(() => {
        setShowDisconnected(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state, isRunning]);

  // Get recent logs for compact view (last 3) - combine logs and AI streams for display
  const allMessages = [...logs, ...aiStreams].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const recentLogs = allMessages.slice(-3).filter(log => log !== null && log !== undefined);

  const getConnectionBadge = () => {
    // Handle error state first
    if (error) {
      return <Badge variant="destructive">Error</Badge>;
    }

    // Don't show anything if not running
    if (!isRunning) {
      return null;
    }

    // Handle intermediate states (refresh_token, connecting)
    if (state === 'refresh_token' || state === 'connecting') {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Connecting...</Badge>;
    }

    // Handle active/connected state
    if (state === 'active' || isConnected) {
      return <Badge variant="outline" className="text-green-600 border-green-600">Connected</Badge>;
    }

    // Only show disconnected after delay
    if (showDisconnected) {
      return <Badge variant="secondary">Disconnected</Badge>;
    }

    // During rapid transitions, show connecting
    return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Connecting...</Badge>;
  };

  return (
    <>
      <TabsContent value='logs' className='mt-0 space-y-4'>
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center justify-between text-sm'>
              <div className='flex items-center gap-2'>
                <Activity className='h-4 w-4' />
                <div className='flex flex-col'>
                  <div className='flex items-center gap-2'>
                    <span>Realtime Activity Log</span>
                    {isRunning && (
                      <span className='inline-block size-2 animate-pulse rounded-full bg-green-500' />
                    )}
                    {allMessages.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {allMessages.length}
                      </Badge>
                    )}
                  </div>
                  <span className='text-xs font-normal text-muted-foreground'>Showing last 3 messages</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {getConnectionBadge()}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {error && (
              <div className='flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 rounded-lg border border-red-500/20'>
                <AlertCircle className='h-4 w-4' />
                <span>Connection error: {error.message}</span>
              </div>
            )}

            {/* Compact Recent Logs View */}
            <div className="space-y-2">
              {recentLogs.length === 0 ? (
                <div className='text-muted-foreground py-6 text-center'>
                  <div className='mb-3 flex items-center justify-center gap-2'>
                    <Activity className='h-6 w-6' />
                  </div>
                  <h4 className="font-medium mb-1">
                    {!isRunning ? 'Workflow not running' :
                     state === 'refresh_token' || state === 'connecting' ? 'Connecting...' : 
                     state === 'active' ? 'Waiting for messages...' : 
                     'No messages yet'}
                  </h4>
                  <p className='text-sm text-muted-foreground mb-3'>
                    {!isRunning ? 'Start the workflow to see realtime logs' :
                     isConnected ? 'Connected and ready to receive messages' : 
                     state === 'refresh_token' || state === 'connecting' ? 'Establishing realtime connection...' :
                     'Connecting to realtime stream...'}
                  </p>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsModalOpen(true)}
                    className="mt-2"
                  >
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Open Full View
                  </Button>
                </div>
              ) : (
                <>
                  {recentLogs.filter(log => log && log.topic != "ai-stream").map((log) => {
                    const typeInfo = getLogTypeInfo(log.type);
                    return (
                      <div
                        key={log.id}
                        className={cn(
                          'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                          typeInfo.bgColor
                        )}
                      >
                        <div className={cn('mt-0.5 flex-shrink-0', typeInfo.color)}>
                          {getLogIcon(log.type)}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1'>
                            <Badge variant="outline" className={cn('text-xs px-2 py-0.5 border-0', typeInfo.color)}>
                              {log.type.toUpperCase()}
                            </Badge>
                            <span className='text-muted-foreground text-xs font-mono'>
                              {format(log.timestamp, 'HH:mm:ss')}
                            </span>
                          </div>
                          <p className="text-sm break-words line-clamp-2 text-foreground/90">
                            {log.message}
                          </p>
                          {log.type === 'progress' && log.data && 'percentage' in log.data && (
                            <ProgressBar data={log.data} progressColor={typeInfo.progressColor} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full"
                  >
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Open Full View
                  </Button>
                </>
              )}
            </div>


          </CardContent>
        </Card>
      </TabsContent>

      {/* Realtime Logs Modal */}
      <RealtimeLogsModal
        workflowId={workflowId}
        workflowName="Workflow" // You can pass the actual workflow name here
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        logs={logs}
        freshLogs={freshLogs}
        aiStreams={aiStreams}
        freshAiStreams={freshAiStreams}
        error={error}
        state={state}
        isConnected={isConnected}
        rawData={rawData || []}
        freshData={freshData || []}
        latestData={latestData}
      />
    </>
  );
}
