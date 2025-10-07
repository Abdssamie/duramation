import { getAllUserCredentials, storeCredential } from "@/services/credentials-store"
import { NextRequest } from "next/server";
import { CredentialCreateRequest, validateCredentialSecret } from "@duramation/shared";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";


export async function GET() {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
        return authResult;
    }

    const { userId: internalUserId } = authResult;

    try {
        const credentials = await getAllUserCredentials(internalUserId);

        console.log('Retrieved credentials:', JSON.stringify(credentials, null, 2));
        return new Response(JSON.stringify(credentials), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error getting credentials:', error);
        return new Response('Error getting credentials', { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
        return authResult;
    }

    const { userId: internalUserId } = authResult;

    const body: CredentialCreateRequest = await req.json();

    if (body.type === 'OAUTH') {
        return new Response('OAuth credentials must be created via the OAuth flow', { status: 400 });
    }

    const validationResult = validateCredentialSecret(body.type, body.provider, body.secret);
    if (!validationResult.success) {
        return new Response(JSON.stringify({ error: validationResult }), { status: 400 });
    }

    try {
        const newCredential = await storeCredential(internalUserId, body);
        
        return new Response(JSON.stringify(newCredential), { status: 201 });
    } catch (error) {
        console.error('Error storing credentials:', error);
        return new Response('Error storing credentials', { status: 500 });
    }
}

