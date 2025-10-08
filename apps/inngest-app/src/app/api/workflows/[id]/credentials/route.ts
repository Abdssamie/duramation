import { storeCredentialForWorkflow } from "@/services/credentials-store";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import { NextRequest } from "next/server";
import { CredentialCreateRequest, validateCredentialSecret } from "@duramation/shared";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;

    const workflowId = params.id;
    const body: CredentialCreateRequest = await req.json();

    if (body.type === 'OAUTH') {
        return new Response('OAuth credentials must be created via the OAuth flow', { status: 400 });
    }

    const validationResult = validateCredentialSecret(body.type, body.provider, body.secret);
    if (!validationResult.success) {
        return new Response(JSON.stringify({ error: validationResult }), { status: 400 });
    }

    try {
        const newCredential = await storeCredentialForWorkflow(userId, workflowId, body);
        
        return new Response(JSON.stringify(newCredential), { status: 201 });
    } catch (error) {
        console.error('Error storing credential for workflow:', error);
        return new Response('Error storing credential for workflow', { status: 500 });
    }
}