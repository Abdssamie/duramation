import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId, InternalUserId } from "@/types/user";

export interface AuthResult {
  userId: InternalUserId;
  clerkUserId: ClerkUserId;
}

/**
 * Utility function to handle authentication for API routes
 * Returns the internal user ID if authentication is successful
 * Returns a NextResponse with error if authentication fails
 */
export async function authenticateUser(): Promise<AuthResult | NextResponse> {
  const { userId: clerkUserId } = await auth();
  console.log(clerkUserId)
  
  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = await getInternalUserId(clerkUserId as ClerkUserId);
  
  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return {
    userId: userId as InternalUserId,
    clerkUserId: clerkUserId as ClerkUserId
  };
}

/**
 * Type guard to check if the result is an error response
 */
export function isAuthError(result: AuthResult | NextResponse): result is NextResponse {
  return result instanceof NextResponse;
}