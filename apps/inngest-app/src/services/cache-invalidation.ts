import { Redis } from "@upstash/redis";

export class CacheInvalidationService {
  private redis: Redis;
  private webhookUrl: string;
  private webhookSecret: string;

  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    
    this.webhookUrl = process.env.FRONTEND_WEBHOOK_URL || 'http://localhost:3000/api/realtime/notify';
    this.webhookSecret = process.env.INNGEST_WEBHOOK_SECRET || '';
  }

  /**
   * Invalidates dashboard metrics cache for a specific user
   */
  async invalidateDashboardMetricsCache(userId: string): Promise<void> {
    console.log(`[CACHE INVALIDATION] Starting dashboard metrics cache invalidation for user: ${userId}`);
    
    const cacheKeys = [
      `dashboard_metrics:${userId}`,
      `dashboard:chart-data:${userId}:*`,
      `workflow:runs:${userId}:*`,
      `automation:metrics:${userId}:*`,
    ];

    await this.invalidateCacheKeys(cacheKeys);
    await this.notifyFrontend({
      type: 'cache_invalidated',
      userId,
      scope: 'dashboard_metrics',
      timestamp: new Date().toISOString(),
    });

    console.log(`[CACHE INVALIDATION] Completed dashboard metrics cache invalidation for user: ${userId}`);
  }

  /**
   * Invalidates automation metrics cache for a specific workflow
   */
  async invalidateAutomationMetricsCache(userId: string, workflowId?: string): Promise<void> {
    const cacheKeys = workflowId 
      ? [
          `automation:metrics:${userId}:${workflowId}:*`,
          `dashboard:metrics:${userId}`, // Also invalidate overall dashboard
        ]
      : [
          `automation:metrics:${userId}:*`,
          `dashboard:metrics:${userId}`,
        ];

    await this.invalidateCacheKeys(cacheKeys);
    await this.notifyFrontend({
      type: 'cache_invalidated',
      userId,
      workflowId,
      scope: 'automation_metrics',
      timestamp: new Date().toISOString(),
    });

    console.log(`Invalidated automation metrics cache for user: ${userId}, workflow: ${workflowId || 'all'}`);
  }

  /**
   * Invalidates service request cache
   */
  async invalidateServiceRequestCache(userId: string, action: 'created' | 'updated' | 'deleted'): Promise<void> {
    const cacheKeys = [
      `service-requests:${userId}:*`,
      `dashboard:metrics:${userId}`, // Service requests affect dashboard metrics
    ];

    await this.invalidateCacheKeys(cacheKeys);
    await this.notifyFrontend({
      type: 'cache_invalidated',
      userId,
      scope: 'service_requests',
      action,
      timestamp: new Date().toISOString(),
    });

    console.log(`Invalidated service request cache for user: ${userId}, action: ${action}`);
  }

  /**
   * Invalidates workflow run cache when new runs are created or updated
   */
  async invalidateWorkflowRunCache(userId: string, workflowId: string, runId?: string): Promise<void> {
    const cacheKeys = [
      `workflow:runs:${userId}:${workflowId}:*`,
      `dashboard:metrics:${userId}`,
      `dashboard:chart-data:${userId}:*`,
    ];

    if (runId) {
      cacheKeys.push(`workflow:run:${userId}:${workflowId}:${runId}`);
    }

    await this.invalidateCacheKeys(cacheKeys);
    await this.notifyFrontend({
      type: 'cache_invalidated',
      userId,
      workflowId,
      runId,
      scope: 'workflow_runs',
      timestamp: new Date().toISOString(),
    });

    console.log(`Invalidated workflow run cache for user: ${userId}, workflow: ${workflowId}, run: ${runId || 'all'}`);
  }

  /**
   * Invalidates all dashboard-related cache for a user
   */
  async invalidateAllDashboardCache(userId: string): Promise<void> {
    const cacheKeys = [
      `dashboard:*:${userId}:*`,
      `workflow:*:${userId}:*`,
      `automation:*:${userId}:*`,
      `service-requests:${userId}:*`,
    ];

    await this.invalidateCacheKeys(cacheKeys);
    await this.notifyFrontend({
      type: 'cache_invalidated',
      userId,
      scope: 'all_dashboard',
      timestamp: new Date().toISOString(),
    });

    console.log(`Invalidated all dashboard cache for user: ${userId}`);
  }

  /**
   * Invalidates cache keys using pattern matching
   */
  private async invalidateCacheKeys(patterns: string[]): Promise<void> {
    try {
      for (const pattern of patterns) {
        if (pattern.includes('*')) {
          // Use SCAN to find keys matching the pattern
          const keys = await this.scanKeys(pattern);
          if (keys.length > 0) {
            await this.redis.del(...keys);
            console.log(`[CACHE INVALIDATION] Deleted ${keys.length} cache keys matching pattern: ${pattern}`);
          } else {
            console.log(`[CACHE INVALIDATION] No keys found matching pattern: ${pattern}`);
          }
        } else {
          // Direct key deletion
          const result = await this.redis.del(pattern);
          if (result > 0) {
            console.log(`[CACHE INVALIDATION] Deleted cache key: ${pattern}`);
          } else {
            console.log(`[CACHE INVALIDATION] Cache key not found: ${pattern}`);
          }
        }
      }
    } catch (error) {
      console.error('[CACHE INVALIDATION ERROR] Failed to invalidate cache keys:', error);
      throw error;
    }
  }

  /**
   * Scans for keys matching a pattern
   */
  private async scanKeys(pattern: string): Promise<string[]> {
    const keys: string[] = [];
    let cursor = '0'; // Redis scan cursor is a string

    do {
      const result = await this.redis.scan(cursor, {
        match: pattern,
        count: 100,
      });
      
      cursor = result[0];
      keys.push(...result[1]);
    } while (cursor !== '0');

    return keys;
  }

  /**
   * Notifies the frontend about cache invalidation via webhook
   */
  private async notifyFrontend(payload: any): Promise<void> {
    if (!this.webhookUrl) {
      console.warn('Frontend webhook URL not configured, skipping notification');
      return;
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.webhookSecret}`,
        },
        body: JSON.stringify({
          ...payload,
          source: 'cache_invalidation_service',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      console.log('Successfully notified frontend of cache invalidation');
    } catch (error) {
      console.error('Failed to notify frontend of cache invalidation:', error);
      // Don't throw error to prevent workflow failure
    }
  }

  /**
   * Publishes cache invalidation event via Redis pub/sub
   */
  async publishCacheInvalidation(channel: string, data: any): Promise<void> {
    try {
      await this.redis.publish(channel, JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'cache_invalidation_service',
      }));

      console.log(`Published cache invalidation to channel: ${channel}`);
    } catch (error) {
      console.error('Failed to publish cache invalidation:', error);
      throw error;
    }
  }

  /**
   * Subscribes to cache invalidation events (for frontend use)
   */
  async subscribeToCacheInvalidation(
    channels: string[], 
    // callback: (channel: string, message: string) => void
  ): Promise<void> {
    // This would typically be used in a separate service or frontend
    // Implementation depends on the Redis client being used
    console.log(`Subscribing to cache invalidation channels: ${channels.join(', ')}`);
    // Implementation would go here for pub/sub subscription
  }
}