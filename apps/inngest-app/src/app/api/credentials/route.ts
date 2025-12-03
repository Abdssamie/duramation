import { getAllUserCredentials, storeCredential } from "@/services/credentials-store"
import { NextRequest, NextResponse } from "next/server";
import { CredentialCreateRequest, validateCredentialSecret } from "@duramation/shared";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import type { 
    CredentialListResponse, 
    CredentialCreateApiResponse 
} from "@duramation/shared";


export async function GET() {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
        return authResult;
    }

    const { userId: internalUserId } = authResult;

    try {
        const credentials = await getAllUserCredentials(internalUserId);

        console.log('Retrieved credentials:', JSON.stringify(credentials, null, 2));
        
        const response: CredentialListResponse = {
            success: true,
            data: credentials,
            pagination: {
                page: 1,
                limit: credentials.length,
                total: credentials.length,
                totalPages: 1,
                hasNext: false,
                hasPrev: false,
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error getting credentials:', error);
        const errorResponse = {
            success: false,
            error: 'Error getting credentials',
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
        return authResult;
    }

    const { userId: internalUserId } = authResult;

    const body: CredentialCreateRequest = await req.json();

    if (body.type === 'OAUTH' && !(body.secret as any).nangoConnectionId) {
        const errorResponse: CredentialCreateApiResponse = {
            success: false,
            error: 'OAuth credentials must be created via the OAuth flow or Nango',
            code: 'INVALID_OPERATION',
        };
        return NextResponse.json(errorResponse, { status: 400 });
    }

    const validationResult = validateCredentialSecret(body.type, body.provider, body.secret);
    if (!validationResult.success) {
        const errorResponse: CredentialCreateApiResponse = {
            success: false,
            error: 'Invalid credential secret',
            code: 'VALIDATION_ERROR',
        };
        return NextResponse.json(errorResponse, { status: 400 });
    }

    try {
        const newCredential = await storeCredential(internalUserId, body);
        
        const response: CredentialCreateApiResponse = {
            success: true,
            data: newCredential,
            message: 'Credential created successfully',
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('Error storing credentials:', error);
        const errorResponse: CredentialCreateApiResponse = {
            success: false,
            error: 'Error storing credentials',
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

