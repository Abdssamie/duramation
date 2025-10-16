import { useCallback, useEffect, useRef } from "react";
import { InngestSubscriptionState, useInngestSubscription } from "@inngest/realtime/hooks";
import { fetchRealtimeSubscriptionToken } from "@/actions/realtime";
import type {Realtime} from "@inngest/realtime";
import {
  workflowChannel, 
  type WorkflowUpdate, 
  formatUpdateMessage,
  isWorkflowComplete,
  isWorkflowError,
} from "@/data/realtime";

interface UseWorkflowRealtimeProps {
  workflowId: string;
  enabled?: boolean;
  bufferInterval?: number;
}

export type RealtimeMessage = Realtime.Subscribe.Token.InferMessage<Realtime.Token<typeof workflowChannel, ["updates", "ai-stream"]>>;

interface RealtimeSubscription {
  data: RealtimeMessage[];
  latestData: RealtimeMessage | null;
  freshData: RealtimeMessage[];
  error: Error | null;
  state: InngestSubscriptionState;
}

// Define enum for workflow log message types
export type WorkflowLogType = "log" | "progress" | "status" | "result" | "error";

// Define the structure of workflow log messages (updates only)
export interface WorkflowLogMessage {
    id: string;
    type: WorkflowLogType;
    message: string;
    timestamp: Date;
    data: WorkflowUpdate['data'];
    topic: "updates";
    channel: string;
}

// Define separate structure for AI stream messages
export interface AIStreamMessage {
    id: string;
    type: 'ai-stream';
    chunk: string;
    timestamp: Date;
    data: {
        chunk: string;
        isComplete: boolean;
        metadata?: Record<string, unknown>;
        runId?: string;
        fnId?: string;
        envId?: string;
        kind?: string;
        chunkCount?: number; // Added by accumulation
    };
    topic: "ai-stream";
    channel: string;
}

// Define the hook's final return shape with proper separation
export interface WorkflowRealtimeData {
    logs: WorkflowLogMessage[];
    aiStreams: AIStreamMessage[];

    freshLogs: WorkflowLogMessage[];
    freshAiStreams: AIStreamMessage[];

    latestMessage: WorkflowLogMessage | AIStreamMessage | null;
    latestLog: WorkflowLogMessage | null;
    latestAiStream: AIStreamMessage | null;

    error: Error | null;
    state: InngestSubscriptionState;
    isConnected: boolean;

    // Computed properties for easier workflow state management
    hasErrors: boolean;
    isComplete: boolean;
    currentProgress: number | null;
    currentStatus: string | null;

    // Raw data (leveraging your existing RealtimeSubscription type for consistency)
    rawData: RealtimeSubscription['data'];
    freshData: RealtimeSubscription['freshData'];
    latestData: RealtimeSubscription['latestData'] | null;
}

// Utility to accumulate AI stream chunks into complete messages
const accumulateAiStreamChunks = (messages: AIStreamMessage[]): AIStreamMessage[] => {
  const chunkGroups = new Map<string, AIStreamMessage[]>();
  
  // Group chunks by runId or a combination of identifiers
  messages.forEach(message => {
    if (message.data?.runId) {
      const key = `${message.data.runId}-${message.data.fnId || 'default'}`;
      if (!chunkGroups.has(key)) {
        chunkGroups.set(key, []);
      }
      chunkGroups.get(key)!.push(message);
    }
  });

  const result: AIStreamMessage[] = [];
  
  // Process each group
  chunkGroups.forEach((chunks, key) => {
    // Sort chunks by timestamp
    chunks.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    // Find if there's a complete message
    const completeChunk = chunks.find(chunk => chunk.data?.isComplete);
    
    if (completeChunk || chunks.length > 0) {
      // Combine all chunks into one message
      const combinedChunk = chunks.reduce((acc, chunk) => acc + chunk.chunk, '');
      const latestChunk = chunks[chunks.length - 1];
      
      if (latestChunk) {
        result.push({
          ...latestChunk,
          id: `ai-complete-${key}`,
          chunk: combinedChunk,
          data: {
            ...latestChunk.data,
            chunk: combinedChunk,
            isComplete: !!completeChunk,
            chunkCount: chunks.length
          }
        });
      }
    }
  });

  return result.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};


// Separate parsing functions for different message types
const parseUpdateMessage = (message: RealtimeMessage): WorkflowLogMessage | null => {
  if (!message || !message.data || message.topic !== "updates") return null;

  if ("message" in message.data) {
    const timestamp = ('createdAt' in message ? message.createdAt : null) || 
                     message.data.timestamp || 
                     new Date();
    
    return {
      id: `update-${timestamp.getTime()}-${Math.random()}`,
      type: message.data.type as WorkflowLogType,
      message: formatUpdateMessage(message.data),
      timestamp,
      data: message.data.data,
      topic: "updates",
      channel: message.channel,
    };
  }
  return null;
};

const parseAiStreamMessage = (message: RealtimeMessage): AIStreamMessage | null => {
  if (!message || message.topic !== "ai-stream") return null;

  const timestamp = ('createdAt' in message ? message.createdAt : null) || new Date();

  // Handle AI stream messages with chunk structure
  if ("chunk" in message.data) {
    return {
      id: `ai-stream-${timestamp.getTime()}-${Math.random()}`,
      type: 'ai-stream',
      chunk: message.data.chunk || '',
      timestamp,
      data: {
        chunk: message.data.chunk,
        isComplete: message.data.isComplete,
        metadata: message.data.metadata,
        runId: message.runId,
        fnId: message.fnId,
        envId: 'envId' in message ? message.envId : undefined,
        kind: message.kind
      },
      topic: "ai-stream",
      channel: message.channel,
    };
  }

  return null;
};

export function useWorkflowRealtime({
  workflowId,
  enabled = true,
  bufferInterval = 2000,
}: UseWorkflowRealtimeProps): WorkflowRealtimeData {
  console.log(`[useWorkflowRealtime] Hook initialized with:`, { workflowId, enabled, bufferInterval });

  const refreshToken = useCallback(async () => {
    console.log(`[useWorkflowRealtime] ⚡ refreshToken callback CALLED! workflowId=${workflowId}`);
    
    console.log(`[useWorkflowRealtime] Fetching subscription token for workflow ${workflowId}`);
    try {
      const token: Realtime.Token<typeof workflowChannel, ["updates", "ai-stream"]> | undefined = await fetchRealtimeSubscriptionToken(workflowId);
      if (!token) {
        console.error(`[useWorkflowRealtime] No subscription token received for workflow ${workflowId}`);
        throw new Error('No subscription token received');
      }
      console.log(`[useWorkflowRealtime] ✅ Successfully fetched token for workflow ${workflowId}`, token);
      return token;
    } catch (error) {
      console.error(`[useWorkflowRealtime] ❌ Failed to get subscription token for workflow ${workflowId}:`, error);
      throw error;
    }
  }, [workflowId]);

  // WORKAROUND: useInngestSubscription doesn't call refreshToken when enabled changes from false to true
  // So we always keep it enabled. The component should conditionally call this hook instead.
  const subscription = useInngestSubscription({
    refreshToken,
    bufferInterval,
    enabled: true,
  });

  const { data, error, state, freshData, latestData } = subscription;
  
  console.log(`[useWorkflowRealtime] Hook state:`, {
    workflowId,
    enabled,
    state,
    error: error?.message,
    dataCount: data?.length || 0,
  });

  // Process messages using separate parsing functions
  const freshLogs = (freshData)
    .filter((message) => message?.topic === "updates")
    .map(parseUpdateMessage)
    .filter(Boolean) as WorkflowLogMessage[];

  const freshAiStreams = (freshData)
    .filter((message) => message?.topic === "ai-stream")
    .map(parseAiStreamMessage)
    .filter(Boolean) as AIStreamMessage[];

  const allLogs = (data)
    .filter((message) => message?.topic === "updates")
    .map(parseUpdateMessage)
    .filter(Boolean) as WorkflowLogMessage[];

  const allAiStreams = (data)
    .filter((message) => message?.topic === "ai-stream")
    .map(parseAiStreamMessage)
    .filter(Boolean) as AIStreamMessage[];

  // Get latest message using appropriate parser
  const latestMessage: WorkflowLogMessage | AIStreamMessage | null = latestData 
    ? (latestData.topic === "updates" ? parseUpdateMessage(latestData) : parseAiStreamMessage(latestData))
    : null;

  // Accumulate AI stream chunks for better display
  const accumulatedAiStreams = accumulateAiStreamChunks(allAiStreams);
  const accumulatedFreshAiStreams = accumulateAiStreamChunks(freshAiStreams);

  const getStatusFromLog = (log: WorkflowLogMessage): string | null => {
    if (log.type === 'status' && log.data && typeof log.data === 'object' && 'status' in log.data) {
      return log.data.status ?? null;
    }
    return null;
  };
  
  // Compute workflow state from all messages
  const hasErrors = allLogs.some(log => log.type === 'error') || 
                   allLogs.some(log => getStatusFromLog(log) === 'failed') ||
                   (data || []).some(msg => msg.topic === 'updates' && msg.data && 'message' in msg.data && isWorkflowError(msg.data));
  
  const isComplete = (data || []).some(msg => msg.topic === 'updates' && msg.data && 'message' in msg.data && isWorkflowComplete(msg.data));
  
  // Helper functions to safely extract typed data
  const getProgressFromLog = (log: WorkflowLogMessage): number | null => {
    if (log.type === 'progress' && log.data && 'percentage' in log.data) {
      return log.data.percentage ?? null;
    }
    return null;
  };

  // Use type-safe filtering for progress and status
  const latestProgressMessage = allLogs.filter(log => log.type === 'progress').pop();
  const currentProgress = latestProgressMessage ? getProgressFromLog(latestProgressMessage) : null;
  
  const latestStatusMessage = allLogs.filter(log => log.type === 'status').pop();
  const currentStatus = latestStatusMessage ? getStatusFromLog(latestStatusMessage) : null;

  return {
    // All accumulated logs
    logs: allLogs,
    aiStreams: accumulatedAiStreams,

    // Fresh logs (new since last buffer)
    freshLogs,
    freshAiStreams: accumulatedFreshAiStreams,

    // Latest single message
    latestMessage,
    latestLog: allLogs[allLogs.length - 1] || null,
    latestAiStream: accumulatedAiStreams[accumulatedAiStreams.length - 1] || null,

    // Connection state
    error,
    state,
    isConnected: state === "active",

    // Computed workflow state
    hasErrors,
    isComplete,
    currentProgress,
    currentStatus,

    // Raw data for debugging
    rawData: data,
    freshData,
    latestData,
  };
}