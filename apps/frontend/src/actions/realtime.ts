"use server";

import { auth } from "@clerk/nextjs/server";
import api from "@/services/api/api-client";
import type { Realtime } from "@inngest/realtime";
import { workflowChannel } from "@/data/realtime";

/**
 * Server action to securely fetch an Inngest Realtime subscription token
 * This is called from client components to get a token for subscribing to workflow updates
 */
export async function fetchRealtimeSubscriptionToken(
  workflowId: string
): Promise<Realtime.Token<typeof workflowChannel, ["updates", "ai-stream"]> | undefined> {
  console.log('[fetchRealtimeSubscriptionToken] Called with workflowId:', workflowId);
  
  // Validate workflowId
  if (!workflowId || workflowId.trim() === '') {
    throw new Error("workflowId is required");
  }
  
  const { getToken } = await auth();
  const authToken = await getToken();

  if (!authToken) {
    throw new Error("Authentication required");
  }

  try {
    const response = await api.realtime.getSubscriptionToken(authToken, {
      workflowId,
    });

    if (!response.success) {
      throw new Error(response.error || "Failed to get subscription token");
    }

    const token = response.data?.token;
    return token as unknown as Realtime.Token<typeof workflowChannel, ["updates", "ai-stream"]>;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch subscription:", error.message);
      throw new Error(`Failed to fetch subscription token ${error.message}`);
    } else {
      console.error("Caught an unknown error:", error);
    }
  }
}