import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import { fetchMetricsFromDatabase } from '@/services/fetchMetricsFromDatabase';

// Initialize Redis client for caching
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

const CACHE_TTL = 300; // 5 minutes in seconds
const CACHE_KEY_PREFIX = 'dashboard_metrics';

function getCacheKey(userId: string): string {
  return `${CACHE_KEY_PREFIX}:${userId}`;
}

export function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;

    const cacheKey = getCacheKey(userId);

    try {
      // Try to get cached data first
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        return NextResponse.json(cachedData);
      }
    } catch (cacheError) {
      console.warn('Cache read error:', cacheError);
      // Continue without cache if Redis is unavailable
    }

    // Fetch fresh data from database
    const metrics = await fetchMetricsFromDatabase(userId);

    try {
      // Cache the result for 5 minutes
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(metrics));
    } catch (cacheError) {
      console.warn('Cache write error:', cacheError);
      // Continue without caching if Redis is unavailable
    }

    return NextResponse.json(metrics);

  } catch (error) {
    console.error('Error fetching simplified metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}