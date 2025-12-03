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
    const { nangoConnectionId, nangoConnectionIds, provider: providerStr } = body;

    const connectionIds = nangoConnectionIds || (nangoConnectionId ? [nangoConnectionId] : []);

    if (connectionIds.length === 0) {
      return NextResponse.json({ error: "nangoConnectionId or nangoConnectionIds is required" }, { status: 400 });
    }

    // 1. Verify Workflow Ownership
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId, userId },
    });

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
    }

    const results = [];

    for (const connId of connectionIds) {
      // 2. Find the Credential by nangoConnectionId AND userId
      let credential = await prisma.credential.findFirst({
        where: {
          userId,
          nangoConnectionId: connId,
        },
      });

      // 2a. If not found, try to recover from Nango
      if (!credential) {
        try {
          // Get connection from Nango to determine provider
          const nangoConn = await integrationClient.nango.getConnection(connId.split('-')[0], connId);
          const provider = nangoConn.provider_config_key.toUpperCase() as Provider;
          
          console.log(`[Auto-Recover] Found Nango connection ${connId}, creating DB record.`);
          
          credential = await prisma.credential.create({
            data: {
              name: `${provider} Integration`,
              type: 'OAUTH',
              provider: provider,
              nangoConnectionId: connId,
              userId: userId,
              secret: JSON.stringify({ nangoConnectionId: connId }),
            }
          });
        } catch (nangoError) {
          console.error(`Failed to recover credential ${connId} from Nango:`, nangoError);
          results.push({ connectionId: connId, success: false, error: 'Credential not found' });
          continue;
        }
      }

      // 3. Create the Link
      await prisma.workflowCredential.upsert({
        where: {
          workflowId_credentialId: {
            workflowId,
            credentialId: credential.id,
          },
        },
        update: {},
        create: {
          workflowId,
          credentialId: credential.id,
        },
      });

      results.push({ connectionId: connId, success: true });
    }

    return NextResponse.json({ success: true, results });

  } catch (error) {
    console.error("Error linking credential:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
