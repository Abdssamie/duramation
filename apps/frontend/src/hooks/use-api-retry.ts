'use client';

import { useState, useCallback } from 'react';

interface UseApiRetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  backoffMultiplier?: number;
  onError?: (error: Error, attempt: number) => void;
  onSuccess?: () => void;
}

interface UseApiRetryReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  retryCount: number;
  execute: () => Promise<void>;
  retry: () => Promise<void>;
  reset: () => void;
}

export function useApiRetry<T>(
  apiCall: () => Promise<T>,
  options: UseApiRetryOptions = {}
): UseApiRetryReturn<T> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    backoffMultiplier = 2,
    onError,
    onSuccess
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const executeWithRetry = useCallback(async (attempt = 0): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiCall();
      setData(result);
      setRetryCount(attempt);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      
      if (attempt < maxRetries) {
        // Calculate delay with exponential backoff
        const delay = retryDelay * Math.pow(backoffMultiplier, attempt);
        
        if (onError) {
          onError(err as Error, attempt + 1);
        }

        // Wait before retrying
        setTimeout(() => {
          executeWithRetry(attempt + 1);
        }, delay);
      } else {
        // Max retries reached
        setError(errorMessage);
        setRetryCount(attempt);
        
        if (onError) {
          onError(err as Error, attempt + 1);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [apiCall, maxRetries, retryDelay, backoffMultiplier, onError, onSuccess]);

  const execute = useCallback(() => executeWithRetry(0), [executeWithRetry]);

  const retry = useCallback(() => {
    setRetryCount(0);
    return executeWithRetry(0);
  }, [executeWithRetry]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    setRetryCount(0);
  }, []);

  return {
    data,
    loading,
    error,
    retryCount,
    execute,
    retry,
    reset
  };
}