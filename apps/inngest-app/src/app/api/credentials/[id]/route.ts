import { getCredential, updateCredential, deleteCredential } from "@/services/credentials-store"
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";
import { CredentialUpdateRequest, validateCredentialSecret } from "@duramation/shared";



export async function GET({ params }: { params: Promise<{ id: string }> }) {
    const user = await auth();
    const { id } = await params;
    const credentialId = id;

    if (!user || !user.userId) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);

    if (!internalUserId) {
        return new Response("User not found", { status: 404 });
    }

    try {
        const credential = await getCredential(internalUserId, credentialId);
        if (!credential) {
            return new Response('Credential not found', { status: 404 });
        }
        return new Response(JSON.stringify(credential), { status: 200 });
    } catch (error) {
        console.error('Error getting credential:', error);
        return new Response('Error getting credential', { status: 500 });
    }
}



export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await auth();
    const { id } = await params;
    const credentialId = id;

    if (!user || !user.userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);

    if (!internalUserId) {
        return new Response("User not found", { status: 404 });
    }

    try {
        const body: CredentialUpdateRequest = await req.json();

        if (!body || !body.secret) {
            return new Response('Missing credential in request body', { status: 400 });
        }

        const credential = await getCredential(internalUserId, credentialId);
        if (!credential) {
            return new Response('Credential not found', { status: 404 });
        }

        if (credential.type === 'OAUTH') {
            return new Response('OAuth credentials cannot be updated directly', { status: 400 });
        }

        const validationResult = validateCredentialSecret(credential.type, credential.provider, body.secret);

        if (!validationResult.success) {
            return new Response(JSON.stringify({ error: validationResult }), { status: 400 });
        }

        const updatedCredential = await updateCredential(internalUserId, credentialId, body.secret);

        return new Response(JSON.stringify(updatedCredential), { status: 200 });
    } catch (error) {
        console.error('Credential update error:', error);
        return new Response('Error updating credentials', { status: 500 });
    }
}



export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await auth();
    const { id } = await params;
    const credentialId = id;

    if (!user || !user.userId) {
        return new Response('Unauthorized', { status: 401 });
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);

    if (!internalUserId) {
        return new Response("User not found", { status: 404 });
    }

    try {
        await deleteCredential(internalUserId, credentialId);
        return new Response('Credentials deleted successfully', { status: 200 });
    } catch (error) {
        console.error('Error deleting credentials:', error);
        return new Response('Error deleting credentials', { status: 500 });
    }
}
