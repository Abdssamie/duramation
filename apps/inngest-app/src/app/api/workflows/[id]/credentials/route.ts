import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import prisma from "@/lib/prisma";

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
    const { credentialId, credentialIds } = body;

    const ids = credentialIds || (credentialId ? [credentialId] : []);

    if (ids.length === 0) {
      return NextResponse.json({ error: "credentialId or credentialIds is required" }, { status: 400 });
    }

    // Verify Workflow Ownership
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId, userId },
    });

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
    }

    const results = [];

    for (const credId of ids) {
      // Verify credential belongs to user
      const credential = await prisma.credential.findFirst({
        where: {
          id: credId,
          userId,
        },
      });

      if (!credential) {
        results.push({ credentialId: credId, success: false, error: 'Credential not found' });
        continue;
      }

      // Link credential to workflow
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

      results.push({ credentialId: credId, success: true });
    }

    return NextResponse.json({ success: true, results });

  } catch (error) {
    console.error("Error linking credential:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
