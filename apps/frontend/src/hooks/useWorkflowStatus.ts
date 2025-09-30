import { useState, useEffect, useCallback, useRef } from 'react';

export interface WorkflowStatusUpdate {
  workflowId: string;
  idempotencyKey: string;
  status: 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'RUNNING' | 'PENDING';
  completedAt?: string;
  error?: string;
}

/**
 * A hook to subscribe to real-time workflow status updates for the current user.
 * @param onUpdate A callback function that will be invoked with the status update data.
 *                 This function should be memoized with `useCallback` to prevent re-subscribing.
 */
export function useWorkflowStatus(
  onUpdate: (data: WorkflowStatusUpdate) => void
) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  // Use a ref to hold the eventSource instance so it can be accessed in cleanup functions
  // without causing re-renders or being stale.
  const eventSourceRef = useRef<EventSource | null>(null);

  // Memoize the onUpdate callback to ensure the effect dependency is stable.
  const memoizedOnUpdate = useCallback(onUpdate, [onUpdate]);

  useEffect(() => {
    const connectToStream = () => {
      // If there's an existing connection, close it before creating a new one.
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventSource = new EventSource('/api/realtime/events');
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE connection established.');
        setIsConnected(true);
      };

      eventSource.addEventListener('connection-established', (event) => {
        console.log(
          'SSE connection confirmed by server:',
          JSON.parse(event.data)
        );
      });

      eventSource.addEventListener('status-update', (event) => {
        try {
          const data: WorkflowStatusUpdate = JSON.parse(event.data);
          memoizedOnUpdate(data);
        } catch (error) {
          console.error('Failed to parse SSE event data:', error);
        }
      });

      // Your requested error handling and reconnection logic.
      eventSource.onerror = () => {
        console.error('SSE connection error. Attempting to reconnect...');
        setIsConnected(false);
        eventSource.close();
        // Use a small delay before attempting to reconnect.
        setTimeout(connectToStream, 1);
      };
    };

    connectToStream();

    // The cleanup function is critical. It runs when the component unmounts.
    return () => {
      console.log('Closing SSE connection due to component unmount.');
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [memoizedOnUpdate]); // The effect re-runs only if the callback function changes.

  return { isConnected };
}
