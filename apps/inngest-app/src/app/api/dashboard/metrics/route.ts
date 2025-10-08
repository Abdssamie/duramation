import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import { fetchMetricsFromDatabase } from '@/services/fetchMetricsFromDatabase';
import type { MetricsResponse, SimplifiedMetrics } from "@duramation/shared";

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

export async function GET() {
  try {
    const authResult = await authenticateUser();

    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;

    const cacheKey = getCacheKey(userId);

    try {
      // Try to get cached data first
      const cachedData: SimplifiedMetrics | null = await redis.get(cacheKey);
      if (cachedData) {
        const response: MetricsResponse = {
          success: true,
          data: cachedData,
        };
        return NextResponse.json(response);
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

    const response: MetricsResponse = {
      success: true,
      data: metrics,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error fetching simplified metrics:', error);
    const errorResponse: MetricsResponse = {
      success: false,
      error: 'Internal server error',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}