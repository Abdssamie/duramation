import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import prisma from "@/lib/prisma";
import { integrationClient } from "@duramation/integrations/server";
import { Provider } from "@duramation/db/types";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateUser();
  if (isAuthError(authResult)) {
    return authResult;
  }

  const { userId } = authResult;
  const { id } = await params;
  const workflowId = id;

  try {
    const body = await req.json();
    const { nangoConnectionId, provider: providerStr } = body;

    if (!nangoConnectionId) {
      return NextResponse.json({ error: "nangoConnectionId is required" }, { status: 400 });
    }

    // 1. Verify Workflow Ownership
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId, userId },
    });

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
    }

    // 2. Find the Credential by nangoConnectionId AND userId
    let credential = await prisma.credential.findFirst({
      where: {
        userId,
        nangoConnectionId,
      },
    });

    // 2a. If not found, try to recover from Nango if provider is supplied
    if (!credential && providerStr) {
      const provider = providerStr as Provider;
      try {
        // Check if connection exists in Nango
        // integrationClient handles the provider formatting (replacing _ with -)
        const nangoConnection = await integrationClient.getConnection(provider, nangoConnectionId);
        
        if (nangoConnection) {
            console.log(`[Auto-Recover] Found Nango connection ${nangoConnectionId}, creating DB record.`);
            
            // Create the credential in our DB
            // We treat the provider string as the enum key
            credential = await prisma.credential.create({
                data: {
                    name: `${provider} Integration`, // Fallback name
                    type: 'OAUTH',
                    provider: provider,
                    nangoConnectionId: nangoConnectionId,
                    userId: userId,
                    secret: JSON.stringify({ nangoConnectionId }), // Minimal secret
                }
            });
        }
      } catch (nangoError) {
        console.error("Failed to recover credential from Nango:", nangoError);
        // Continue to error response if recovery failed
      }
    }

    if (!credential) {
      return NextResponse.json({ error: "Credential not found. Please ensure connection was successful." }, { status: 404 });
    }

    // 3. Create the Link
    await prisma.workflowCredential.upsert({
      where: {
        workflowId_credentialId: {
          workflowId,
          credentialId: credential.id,
        },
      },
      update: {}, // already linked
      create: {
        workflowId,
        credentialId: credential.id,
      },
    });

    return NextResponse.json({ success: true, message: "Credential linked successfully" });

  } catch (error) {
    console.error("Error linking credential:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
