import { auth } from '@clerk/nextjs/server';
import Redis from 'ioredis'; // Import ioredis directly
import { getUserChannel } from '@/lib/redis'; // We only need the channel helper

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Call the internal API to get the internal user ID
  let internalUserId;
  try {
    const response = await fetch(
      `${process.env.NEXT_BACKEND_API_URL}/api/internal/user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.INTERNAL_API_SECRET}`
        },
        body: JSON.stringify({ clerkId })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to fetch internal user ID: ${response.status} ${errorText}`
      );
      return new Response('Failed to resolve user', { status: 500 });
    }

    const { internalUserId: fetchedUserId } = await response.json();
    internalUserId = fetchedUserId;
  } catch (error) {
    console.error('Error calling internal user API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }

  if (!internalUserId) {
    return new Response('User not found', { status: 404 });
  }

  const connectionUrl = process.env.REDIS_URL;
  if (!connectionUrl) {
    throw new Error('REDIS_URL environment variable is not set');
  }

  const stream = new ReadableStream({
    async start(controller) {
      // Create a new, dedicated ioredis client for this specific connection.
      const subscriber = new Redis(connectionUrl);
      const userChannel = getUserChannel(internalUserId);
      const encoder = new TextEncoder();

      subscriber.on('error', (error: Error) => {
        console.error(
          `Redis subscriber error for user ${internalUserId}:`,
          error
        );
        // Close the stream with an error. This will trigger the client's onerror handler.
        controller.error(error);
        subscriber.quit();
      });

      subscriber.on('message', (channel: string, message: string) => {
        if (channel === userChannel) {
          console.log(`Received message for user ${internalUserId}:`, message);
          // The message from ioredis is already a string, which is what we need.
          controller.enqueue(
            encoder.encode(`event: status-update\ndata: ${message}\n\n`)
          );
        }
      });

      // Subscribe to the user-specific channel.
      await subscriber.subscribe(userChannel);

      console.log(
        `Client for user ${internalUserId} connected and subscribed to ${userChannel}`
      );

      // Send a confirmation message.
      controller.enqueue(
        encoder.encode(
          'event: connection-established\ndata: {"success":true}\n\n'
        )
      );

      // When the client disconnects, clean up THIS specific subscriber instance.
      request.signal.addEventListener('abort', () => {
        console.log(
          `Client for user ${internalUserId} disconnected, unsubscribing and quitting.`
        );
        subscriber.unsubscribe(userChannel);
        subscriber.quit();
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Content-Encoding': 'none'
    }
  });
}