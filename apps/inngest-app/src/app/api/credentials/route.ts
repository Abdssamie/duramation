import { getAllUserCredentials, storeCredential } from "@/services/credentials-store"
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";
import { CredentialCreateRequest, validateCredentialSecret } from "@duramation/shared";


export async function GET() {
    const user = await auth();

    if (!user || !user.userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);

    if (!internalUserId) {
        return new Response("User not found", { status: 404 });
    }

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
    const user = await auth();

    if (!user || !user.userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);

    if (!internalUserId) {
        return new Response("User not found", { status: 404 });
    }

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

