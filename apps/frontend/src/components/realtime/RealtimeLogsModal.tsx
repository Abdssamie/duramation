'use client';

import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Zap,
  Database,
  Clock,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getLogIcon } from '@/utils/realtime';
import { ProgressBar } from '@/components/realtime/ProgressBar';
import type { WorkflowLogMessage, AIStreamMessage, WorkflowLogType, RealtimeMessage } from '@/hooks/useWorkflowRealtime';
import type { InngestSubscriptionState } from '@inngest/realtime/hooks';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface RealtimeLogsModalProps {
  workflowId: string;
  workflowName?: string;
  isOpen: boolean;
  onClose: () => void;
  // Enhanced typed data from useWorkflowRealtime
  logs: WorkflowLogMessage[];
  aiStreams: AIStreamMessage[];
  freshLogs: WorkflowLogMessage[];
  freshAiStreams: AIStreamMessage[];
  error: Error | null;
  state: InngestSubscriptionState;
  isConnected: boolean;
  rawData: RealtimeMessage[];
  freshData: RealtimeMessage[];
  latestData: RealtimeMessage | null;
}

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

// Data transformer utilities
const transformRawDataToUI = (rawData: RealtimeMessage[]) => {

  const messages = rawData.filter(item => item.topic == "updates").map((item, index) => ({
    id: `raw-${index}`,
    timestamp: item.data?.timestamp || new Date(),
    topic: item.topic,
    channel: item.channel,
    data: item.data || {},
    raw: item
  }));

  const stats = {
    total: messages.length,
    byTopic: messages.reduce((acc, msg) => {
      acc[msg.topic] = (acc[msg.topic] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byChannel: messages.reduce((acc, msg) => {
      acc[msg.channel] = (acc[msg.channel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  return { messages, stats };
};

const transformLatestDataToUI = (latestData: RealtimeMessage | null) => {
  if (!latestData || latestData.topic != "updates") return null;

  return {
    id: 'latest',
    timestamp: latestData.data?.timestamp || new Date(),
    topic: latestData.topic,
    channel: latestData.channel,
    data: latestData.data,
    message: latestData.data?.message,
    type: latestData.data?.type
  };
};

const DataCard = ({ title, value, icon: Icon, description }: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}) => (
  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border">
    <Icon className="h-5 w-5 text-muted-foreground" />
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{title}</span>
        <Badge variant="secondary" className="text-xs">{value}</Badge>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  </div>
);



export function RealtimeLogsModal({
  workflowName = 'Workflow',
  isOpen,
  onClose,
  logs,
  aiStreams,
  freshLogs,
  freshAiStreams,
  error,
  state,
  isConnected,
  rawData,
  freshData,
  latestData
}: RealtimeLogsModalProps) {
  // Transform raw data for better UI presentation
  const transformedRawData = useMemo(() => transformRawDataToUI(rawData || []), [rawData]);
  const transformedFreshData = useMemo(() => transformRawDataToUI(freshData || []), [freshData]);
  const transformedLatestData = useMemo(() => transformLatestDataToUI(latestData), [latestData]);

  // Logs are already properly typed, no need to filter nulls
  const validLogs = useMemo(() => logs || [], [logs]);
  const validFreshLogs = useMemo(() => freshLogs || [], [freshLogs]);
  const validAiStreams = useMemo(() => aiStreams || [], [aiStreams]);
  const validFreshAiStreams = useMemo(() => freshAiStreams || [], [freshAiStreams]);


  const getConnectionBadge = () => {
    if (error) return <Badge variant="destructive">Error</Badge>;
    if (isConnected) return <Badge variant="outline" className="text-green-600 border-green-600">Connected</Badge>;
    if (state === 'connecting') return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Connecting...</Badge>;
    return <Badge variant="secondary">Disconnected</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[98vw] !max-w-[1000px] !h-[92vh] flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 px-8 pt-6 pb-4">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5" />
              <span>Realtime Logs - {workflowName}</span>
              {getConnectionBadge()}
            </div>
          </DialogTitle>
        </DialogHeader>
        <VisuallyHidden>
          <DialogDescription/>
        </VisuallyHidden>
        <div className="flex-1 min-h-0 px-8 pb-6">
          <Tabs defaultValue="logs" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="logs" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap">
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">Logs ({validLogs.length})</span>
              </TabsTrigger>
              <TabsTrigger value="streams" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">AI ({validAiStreams.length})</span>
              </TabsTrigger>
              <TabsTrigger value="debug" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap">
                <Database className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">Debug</span>
              </TabsTrigger>
            </TabsList>

            {error && (
              <div className='flex items-center gap-2 p-3 mb-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800'>
                <AlertCircle className='h-4 w-4' />
                <span>Connection error: {error.message}</span>
              </div>
            )}

            <TabsContent value="logs" className="flex-1 mt-3 min-h-0">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium">Activity Stream</h3>
                    {validFreshLogs.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        +{validFreshLogs.length} new
                      </Badge>
                    )}
                    {validFreshAiStreams.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        +{validFreshAiStreams.length} AI streams
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    State: {state}
                  </div>
                </div>

                <ScrollArea className="flex-1 min-h-0">
                  <div className="space-y-2 pr-4">
                    {validLogs.length === 0 ? (
                      <div className='text-muted-foreground py-16 text-center'>
                        <div className='mb-4 flex items-center justify-center gap-2'>
                          <Activity className='h-12 w-12 text-muted-foreground/50' />
                        </div>
                        <h4 className="text-lg font-medium mb-2">No logs yet</h4>
                        <p className='text-sm mb-4'>
                          {isConnected ? 'Connected and ready to receive logs' : 'Connecting to realtime logs...'}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                          )} />
                          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                        </div>
                      </div>
                    ) : (
                      validLogs.map((log) => {
                        const typeInfo = getLogTypeInfo(log.type);
                        return (
                          <div
                            key={log.id}
                            className={cn(
                              'flex items-start gap-3 p-3 rounded-lg border transition-all hover:shadow-sm',
                              typeInfo.bgColor
                            )}
                          >
                            <div className={cn("flex-shrink-0 mt-0.5", typeInfo.color)}>
                              {getLogIcon(log.type)}
                            </div>
                            <div className='flex-1 min-w-0 overflow-hidden'>
                              <div className='flex items-center gap-2 mb-1 flex-wrap'>
                                <Badge variant="outline" className={cn('text-xs px-2 py-0.5 font-mono', typeInfo.color)}>
                                  {log.type.toUpperCase()}
                                </Badge>
                                <span className='text-xs text-muted-foreground font-mono'>
                                  {format(log.timestamp, 'HH:mm:ss')}
                                </span>
                              </div>
                              <p className="text-sm mb-2 break-words leading-relaxed overflow-wrap-anywhere">
                                {log.message}
                              </p>
                              {log.type === 'progress' && log.data && 'percentage' in log.data && (
                                <ProgressBar data={log.data} progressColor={typeInfo.progressColor} />
                              )}
                              {log.data && Object.keys(log.data).length > 0 && (
                                <details className="mt-2">
                                  <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground flex items-center gap-2">
                                    <Database className="h-3 w-3" />
                                    View data
                                  </summary>
                                  <div className='mt-2 p-2 bg-muted/50 rounded border max-h-32 overflow-auto'>
                                    <pre className='text-xs text-muted-foreground whitespace-pre-wrap break-all'>
                                      {JSON.stringify(log.data, null, 2)}
                                    </pre>
                                  </div>
                                </details>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="streams" className="flex-1 mt-3 min-h-0">
              <div className="h-full flex flex-col">
                <div className="mb-3 flex-shrink-0">
                  <h3 className="text-sm font-medium mb-1">AI Streams</h3>
                  <p className="text-xs text-muted-foreground">Real-time AI processing streams and responses</p>
                </div>

                <ScrollArea className="flex-1 min-h-0">
                  <div className="space-y-2 pr-4">
                    {validAiStreams.length === 0 ? (
                      <div className='text-muted-foreground py-16 text-center'>
                        <div className='mb-4 flex items-center justify-center gap-2'>
                          <Zap className='h-12 w-12 text-muted-foreground/50' />
                        </div>
                        <h4 className="text-lg font-medium mb-2">No AI streams</h4>
                        <p className='text-sm'>AI processing streams will appear here when available</p>
                      </div>
                    ) : (
                      validAiStreams.map((stream) => (
                        <div
                          key={stream.id}
                          className="flex items-start gap-3 p-3 rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 transition-all hover:shadow-sm"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <Zap className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className='flex-1 min-w-0 overflow-hidden'>
                            <div className='flex items-center gap-2 mb-1 flex-wrap'>
                              <Badge variant="secondary" className='text-xs px-2 py-0.5 font-mono bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                                AI-STREAM
                              </Badge>
                              <span className='text-xs text-muted-foreground font-mono'>
                                {format(stream.timestamp, 'HH:mm:ss')}
                              </span>
                              {stream.data.isComplete && (
                                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                                  Complete
                                </Badge>
                              )}
                              {stream.data.chunkCount && (
                                <Badge variant="outline" className="text-xs">
                                  {stream.data.chunkCount} chunks
                                </Badge>
                              )}
                            </div>
                            <div className='text-sm mb-2 break-words leading-relaxed overflow-wrap-anywhere bg-white dark:bg-gray-900 p-2 rounded border'>
                              <pre className="whitespace-pre-wrap font-mono text-xs">
                                {stream.chunk}
                              </pre>
                            </div>
                            {stream.data && Object.keys(stream.data).length > 0 && (
                              <details className="mt-2">
                                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground flex items-center gap-2">
                                  <Database className="h-3 w-3" />
                                  View metadata
                                </summary>
                                <div className='mt-2 p-2 bg-muted/50 rounded border max-h-32 overflow-auto'>
                                  <pre className='text-xs text-muted-foreground whitespace-pre-wrap break-all'>
                                    {JSON.stringify({
                                      runId: stream.data.runId,
                                      fnId: stream.data.fnId,
                                      isComplete: stream.data.isComplete,
                                      chunkCount: stream.data.chunkCount,
                                      metadata: stream.data.metadata
                                    }, null, 2)}
                                  </pre>
                                </div>
                              </details>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="debug" className="flex-1 mt-3 min-h-0">
              <div className="h-full flex flex-col">
                <div className="mb-3 flex-shrink-0">
                  <h3 className="text-sm font-medium mb-1">Debug Information</h3>
                  <p className="text-xs text-muted-foreground">Connection status and raw data insights</p>
                </div>

                <ScrollArea className="flex-1 min-h-0">
                  <div className="space-y-3 pr-4">
                    {/* Connection Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <DataCard
                        title="Connection"
                        value={isConnected ? 'Active' : 'Inactive'}
                        icon={isConnected ? CheckCircle : AlertCircle}
                        description={`State: ${state}`}
                      />
                      <DataCard
                        title="Total Messages"
                        value={transformedRawData.stats.total}
                        icon={MessageSquare}
                        description="All received messages"
                      />
                    </div>

                    {/* Latest Message */}
                    {transformedLatestData && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Latest Message
                        </h4>
                        <div className="p-3 bg-muted/30 rounded-lg border">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {transformedLatestData.topic}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-mono">
                              {format(transformedLatestData.timestamp, 'HH:mm:ss')}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{transformedLatestData.message}</p>
                          {Object.keys(transformedLatestData.data).length > 0 && (
                            <details>
                              <summary className="text-xs text-muted-foreground cursor-pointer">View data</summary>
                              <div className='mt-2 max-h-32 overflow-auto'>
                                <pre className='text-xs bg-background p-2 rounded border whitespace-pre-wrap break-all'>
                                  {JSON.stringify(transformedLatestData.data, null, 2)}
                                </pre>
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Fresh Data Stats */}
                    {transformedFreshData.stats.total > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Fresh Data ({transformedFreshData.stats.total})</h4>
                        <div className="space-y-2">
                          {Object.entries(transformedFreshData.stats.byTopic).map(([topic, count]) => (
                            <div key={topic} className="flex justify-between text-xs p-2 bg-muted/30 rounded">
                              <span>{topic}</span>
                              <Badge variant="secondary" className="text-xs">{count}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Raw Data Overview */}
                    {transformedRawData.stats.total > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Message Topics</h4>
                        <div className="space-y-2">
                          {Object.entries(transformedRawData.stats.byTopic).map(([topic, count]) => (
                            <div key={topic} className="flex justify-between text-xs p-2 bg-muted/30 rounded">
                              <span>{topic}</span>
                              <Badge variant="secondary" className="text-xs">{count}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}