import { Redis } from '@upstash/redis';

// This client is used for one-off commands like PUBLISH.
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

// Helper function to get the user-specific channel name.
export const getUserChannel = (userId: string) => `user:${userId}:events`;

/**
 * Publishes a message to a user-specific channel.
 * This is called from the /api/realtime/notify endpoint.
 * @param userId The ID of the user to send the update to.
 * @param data The data payload to send.
 */
export async function sendUpdateToUser(userId: string, data: any) {
  const userChannel = getUserChannel(userId);
  console.log(`Publishing update to ${userChannel}:`, data);
  // The @upstash/redis client automatically stringifies the payload.
  await redis.publish(userChannel, data);
}
