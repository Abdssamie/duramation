import { prisma } from '@duramation/db';
import { EfficiencyCalculatorService } from './efficiency-calculator';

interface CachedEfficiencyData {
  userId: string;
  period: string;
  data: any;
  calculatedAt: Date;
  expiresAt: Date;
}

export class EfficiencyCacheService {
  private static readonly CACHE_DURATION_HOURS = 6; // Cache for 6 hours
  private static readonly CACHE_KEY_PREFIX = 'efficiency_cache';

  /**
   * Get cached efficiency data or calculate and cache if not available
   */
  static async getCachedEfficiencyData(userId: string, period?: string) {
    const cacheKey = this.generateCacheKey(userId, period);
    
    // Try to get from cache first
    const cached = await this.getCachedData(cacheKey);
    
    if (cached && cached.expiresAt > new Date()) {
      return cached.data;
    }

    // Calculate fresh data
    const freshData = await EfficiencyCalculatorService.aggregateUserEfficiencyMetrics(userId, period);
    
    // Cache the result
    await this.setCachedData(cacheKey, freshData, userId, period || 'current');
    
    return freshData;
  }

  /**
   * Get cached efficiency trends or calculate and cache if not available
   */
  static async getCachedEfficiencyTrends(workflowId: string, periodType: 'month' | 'quarter' = 'month') {
    const cacheKey = `${this.CACHE_KEY_PREFIX}_trends_${workflowId}_${periodType}`;
    
    // Try to get from cache first
    const cached = await this.getCachedData(cacheKey);
    
    if (cached && cached.expiresAt > new Date()) {
      return cached.data;
    }

    // Calculate fresh data
    const freshData = await EfficiencyCalculatorService.calculateEfficiencyTrends(workflowId, periodType);
    
    // Cache the result
    await this.setCachedData(cacheKey, freshData, null, `trends_${workflowId}_${periodType}`);
    
    return freshData;
  }

  /**
   * Invalidate cache for a user when their data changes
   */
  static async invalidateUserCache(userId: string) {
    // In a real implementation, this would clear Redis cache or similar
    // For now, we'll use a simple database-based approach
    
    await prisma.$executeRaw`
      DELETE FROM efficiency_cache 
      WHERE cache_key LIKE ${`${this.CACHE_KEY_PREFIX}_${userId}_%`}
    `;
  }

  /**
   * Invalidate cache for a specific workflow
   */
  static async invalidateWorkflowCache(workflowId: string) {
    await prisma.$executeRaw`
      DELETE FROM efficiency_cache 
      WHERE cache_key LIKE ${`%${workflowId}%`}
    `;
  }

  /**
   * Generate cache key
   */
  private static generateCacheKey(userId: string, period?: string): string {
    return `${this.CACHE_KEY_PREFIX}_${userId}_${period || 'current'}`;
  }

  /**
   * Get cached data from storage
   */
  private static async getCachedData(cacheKey: string): Promise<CachedEfficiencyData | null> {
    try {
      // In a real implementation, this would use Redis or similar
      // For now, we'll simulate with a simple approach
      const result = await prisma.$queryRaw<any[]>`
        SELECT * FROM efficiency_cache WHERE cache_key = ${cacheKey} LIMIT 1
      `;
      
      if (result.length === 0) {
        return null;
      }

      return {
        userId: result[0].user_id,
        period: result[0].period,
        data: JSON.parse(result[0].data),
        calculatedAt: result[0].calculated_at,
        expiresAt: result[0].expires_at
      };
    } catch (error) {
      // If cache table doesn't exist or other error, return null
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  }

  /**
   * Set cached data in storage
   */
  private static async setCachedData(
    cacheKey: string, 
    data: any, 
    userId: string | null, 
    period: string
  ) {
    try {
      const now = new Date();
      const expiresAt = new Date(now.getTime() + this.CACHE_DURATION_HOURS * 60 * 60 * 1000);

      // In a real implementation, this would use Redis or similar
      // For now, we'll simulate with a simple approach
      await prisma.$executeRaw`
        INSERT INTO efficiency_cache (cache_key, user_id, period, data, calculated_at, expires_at)
        VALUES (${cacheKey}, ${userId}, ${period}, ${JSON.stringify(data)}, ${now}, ${expiresAt})
        ON CONFLICT (cache_key) 
        DO UPDATE SET 
          data = ${JSON.stringify(data)},
          calculated_at = ${now},
          expires_at = ${expiresAt}
      `;
    } catch (error) {
      // If cache table doesn't exist, we'll just skip caching
      console.warn('Cache storage failed:', error);
    }
  }

  /**
   * Clean up expired cache entries
   */
  static async cleanupExpiredCache() {
    try {
      const now = new Date();
      await prisma.$executeRaw`
        DELETE FROM efficiency_cache WHERE expires_at < ${now}
      `;
    } catch (error) {
      console.warn('Cache cleanup failed:', error);
    }
  }

  /**
   * Warm up cache for a user's efficiency data
   */
  static async warmUpUserCache(userId: string) {
    const periods = [
      'current',
      new Date().toISOString().substring(0, 7), // Current month
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 7) // Previous month
    ];

    for (const period of periods) {
      try {
        await this.getCachedEfficiencyData(userId, period === 'current' ? undefined : period);
      } catch (error) {
        console.warn(`Failed to warm up cache for user ${userId}, period ${period}:`, error);
      }
    }
  }

  /**
   * Get cache statistics
   */
  static async getCacheStats() {
    try {
      const stats = await prisma.$queryRaw<any[]>`
        SELECT 
          COUNT(*) as total_entries,
          COUNT(CASE WHEN expires_at > NOW() THEN 1 END) as active_entries,
          COUNT(CASE WHEN expires_at <= NOW() THEN 1 END) as expired_entries,
          AVG(EXTRACT(EPOCH FROM (expires_at - calculated_at))) as avg_cache_duration_seconds
        FROM efficiency_cache
      `;

      return {
        totalEntries: Number(stats[0]?.total_entries || 0),
        activeEntries: Number(stats[0]?.active_entries || 0),
        expiredEntries: Number(stats[0]?.expired_entries || 0),
        avgCacheDurationSeconds: Number(stats[0]?.avg_cache_duration_seconds || 0)
      };
    } catch (error) {
      console.warn('Failed to get cache stats:', error);
      return {
        totalEntries: 0,
        activeEntries: 0,
        expiredEntries: 0,
        avgCacheDurationSeconds: 0
      };
    }
  }
}

// Note: In a production environment, you would create the cache table:
/*
CREATE TABLE IF NOT EXISTS efficiency_cache (
  cache_key VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  period VARCHAR(50),
  data JSONB,
  calculated_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_expires_at (expires_at)
);
*/