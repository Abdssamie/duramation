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
  const retryCountRef = useRef<number>(0);
  const maxRetries = 5;

  // Memoize the onUpdate callback to ensure the effect dependency is stable.
  const memoizedOnUpdate = useCallback(onUpdate, [onUpdate]);

  useEffect(() => {
    const connectToStream = () => {
      // If there's an existing connection, close it before creating a new one.
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      // Check if max retries exceeded
      if (retryCountRef.current >= maxRetries) {
        console.error(
          `SSE connection failed after ${maxRetries} attempts. Stopping reconnection.`
        );
        setIsConnected(false);
        return;
      }

      const eventSource = new EventSource('/api/realtime/events');
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE connection established.');
        setIsConnected(true);
        // Reset retry count on successful connection
        retryCountRef.current = 0;
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

      // Error handling with retry limit
      eventSource.onerror = () => {
        retryCountRef.current += 1;
        console.error(
          `SSE connection error. Retry attempt ${retryCountRef.current}/${maxRetries}...`
        );
        setIsConnected(false);
        eventSource.close();

        // Only attempt to reconnect if under max retries
        if (retryCountRef.current < maxRetries) {
          // Exponential backoff: 1s, 2s, 4s, 8s, 16s
          const delay = Math.min(1000 * Math.pow(2, retryCountRef.current - 1), 16000);
          console.log(`Reconnecting in ${delay}ms...`);
          setTimeout(connectToStream, delay);
        } else {
          console.error(
            'Max retry attempts reached. Please refresh the page to reconnect.'
          );
        }
      };
    };

    connectToStream();

    // The cleanup function is critical. It runs when the component unmounts.
    return () => {
      console.log('Closing SSE connection due to component unmount.');
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      // Reset retry count on unmount
      retryCountRef.current = 0;
    };
  }, [memoizedOnUpdate]); // The effect re-runs only if the callback function changes.

  return { isConnected };
}
