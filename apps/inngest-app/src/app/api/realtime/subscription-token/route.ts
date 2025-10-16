import { NextRequest, NextResponse } from "next/server";
import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { workflowChannel } from "@/lib/realtime-channels";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json({ 
        success: false, 
        error: "Unauthorized" 
      }, { status: 401 });
    }

    const { workflowId } = await req.json();

    if (!workflowId) {
      return NextResponse.json({ 
        success: false, 
        error: "workflowId is required" 
      }, { status: 400 });
    }

    // Get internal user id
    const internalUserId = await getInternalUserId(clerkUserId as ClerkUserId);

    if (!internalUserId) {
      return NextResponse.json({ 
        success: false, 
        error: "Internal user not found" 
      }, { status: 404 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: internalUserId },
    });

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: "User not found" 
      }, { status: 404 });
    }

    // Verify user owns the workflow
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId: user.id,
      },
    });

    if (!workflow) {
      return NextResponse.json({ 
        success: false, 
        error: "Workflow not found or access denied" 
      }, { status: 404 });
    }

    // Generate subscription token for this specific workflow
    const channel = workflowChannel(user.id, workflowId);
    console.log('[subscription-token] Generating token for user:', user.id, 'workflow:', workflowId);
    console.log('[subscription-token] Channel name:', channel.name);

    const token = await getSubscriptionToken(inngest, {
      channel: channel,
      topics: ["updates", "ai-stream"], // Allow both topics
    });

    console.log('[subscription-token] Token generated successfully');

    return NextResponse.json({ 
      success: true, 
      data: { token } 
    });
  } catch (error) {
    console.error("Error generating subscription token:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to generate subscription token" 
      },
      { status: 500 }
    );
  }
}
