import { getCredential, updateCredential, deleteCredential } from "@/services/credentials-store"
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";
import { CredentialUpdateRequest, validateCredentialSecret } from "@duramation/shared";
import type { 
    CredentialGetResponse, 
    CredentialUpdateApiResponse, 
    CredentialDeleteResponse 
} from "@duramation/shared";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
    const user = await auth();
    const { id } = await params;
    const credentialId = id;

    if (!user || !user.userId) {
        const errorResponse: CredentialGetResponse = {
            success: false,
            error: "Unauthorized",
        };
        return NextResponse.json(errorResponse, { status: 401 });
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);

    if (!internalUserId) {
        const errorResponse: CredentialGetResponse = {
            success: false,
            error: "User not found",
        };
        return NextResponse.json(errorResponse, { status: 404 });
    }

    try {
        const credential = await getCredential(internalUserId, credentialId);
        if (!credential) {
            const errorResponse: CredentialGetResponse = {
                success: false,
                error: 'Credential not found',
            };
            return NextResponse.json(errorResponse, { status: 404 });
        }

        const response: CredentialGetResponse = {
            success: true,
            data: credential,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error getting credential:', error);
        const errorResponse: CredentialGetResponse = {
            success: false,
            error: 'Error getting credential',
        };
        return NextResponse.json(errorResponse, { status: 500 });
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
        const errorResponse: CredentialUpdateApiResponse = {
            success: false,
            error: 'Unauthorized',
        };
        return NextResponse.json(errorResponse, { status: 401 });
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);

    if (!internalUserId) {
        const errorResponse: CredentialUpdateApiResponse = {
            success: false,
            error: "User not found",
        };
        return NextResponse.json(errorResponse, { status: 404 });
    }

    try {
        const body: CredentialUpdateRequest = await req.json();

        if (!body || !body.secret) {
            const errorResponse: CredentialUpdateApiResponse = {
                success: false,
                error: 'Missing credential in request body',
                code: 'VALIDATION_ERROR',
            };
            return NextResponse.json(errorResponse, { status: 400 });
        }

        const credential = await getCredential(internalUserId, credentialId);
        if (!credential) {
            const errorResponse: CredentialUpdateApiResponse = {
                success: false,
                error: 'Credential not found',
            };
            return NextResponse.json(errorResponse, { status: 404 });
        }

        if (credential.type === 'OAUTH') {
            const errorResponse: CredentialUpdateApiResponse = {
                success: false,
                error: 'OAuth credentials cannot be updated directly',
                code: 'INVALID_OPERATION',
            };
            return NextResponse.json(errorResponse, { status: 400 });
        }

        const validationResult = validateCredentialSecret(credential.type, credential.provider, body.secret);

        if (!validationResult.success) {
            const errorResponse: CredentialUpdateApiResponse = {
                success: false,
                error: 'Invalid credential secret',
                code: 'VALIDATION_ERROR',
            };
            return NextResponse.json(errorResponse, { status: 400 });
        }

        const updatedCredential = await updateCredential(internalUserId, credentialId, body.secret);

        const response: CredentialUpdateApiResponse = {
            success: true,
            data: updatedCredential,
            message: 'Credential updated successfully',
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Credential update error:', error);
        const errorResponse: CredentialUpdateApiResponse = {
            success: false,
            error: 'Error updating credentials',
        };
        return NextResponse.json(errorResponse, { status: 500 });
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
        const errorResponse: CredentialDeleteResponse = {
            success: false,
            error: 'Unauthorized',
        };
        return NextResponse.json(errorResponse, { status: 401 });
    }

    const internalUserId = await getInternalUserId(user.userId as ClerkUserId);

    if (!internalUserId) {
        const errorResponse: CredentialDeleteResponse = {
            success: false,
            error: "User not found",
        };
        return NextResponse.json(errorResponse, { status: 404 });
    }

    try {
        await deleteCredential(internalUserId, credentialId);
        
        const response: CredentialDeleteResponse = {
            success: true,
            data: { deleted: true },
            message: 'Credentials deleted successfully',
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error deleting credentials:', error);
        const errorResponse: CredentialDeleteResponse = {
            success: false,
            error: 'Error deleting credentials',
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}
