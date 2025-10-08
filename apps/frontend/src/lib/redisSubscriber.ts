// Use ioredis to be able to subscribe to an Upstash Redis instance
import Redis from 'ioredis';

const connectionUrl = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!connectionUrl || !token) {
  throw new Error(
    'UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables must be set'
  );
}

// Parse the Redis URL to extract host and port
const url = new URL(connectionUrl);
const host = url.hostname;
const port = parseInt(url.port || '6379');
const username = url.username || 'default';

// Create an Upstash Redis Subscriber instance with proper TLS configuration
export const redisSubscriber = new Redis({
  host,
  port,
  username,
  password: token,
  tls: {
    rejectUnauthorized: false // Required for Upstash Redis
  },
  retryStrategy: (times) => {
    // Reconnect after this time

    return Math.min(times * 50, 2000);
  },
  maxRetriesPerRequest: null
});

// Log connection events for debugging
redisSubscriber.on('connect', () => {
  console.log('Redis subscriber connected');
});

redisSubscriber.on('error', (err) => {
  console.error('Redis subscriber error:', err);
});

redisSubscriber.on('reconnecting', () => {
  console.log('Redis subscriber reconnecting...');
});
