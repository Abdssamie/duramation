import { NextResponse } from "next/server";
import { storeCredential, storeCredentialForWorkflow } from "@/services/credentials-store";
import { CredentialType, Provider } from "@duramation/db";
import { InternalUserId } from "@/types/user";
import { CredentialCreateRequest } from "@duramation/shared";
import { Microsoft } from "@duramation/integrations/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  
  if (!code || !state) {
    return new NextResponse("Missing code or state from Microsoft OAuth callback", {
      status: 400,
    });
  }

  try {
    // Parse the state parameter to get user ID and workflow ID
    let stateData: { userId: string; workflowId?: string };
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    } catch {
      // Fallback for old format (just user ID)
      stateData = { userId: state };
    }

    console.log('Microsoft OAuth callback state:', stateData);

    // Use the integrations package to handle OAuth callback
    const credentialPayload = await Microsoft.MicrosoftAuthHandler.handleCallback(code);

    // Get user's email from Microsoft Graph API
    let credentialName = 'Microsoft Account';
    
    try {
      const userInfoResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${credentialPayload.accessToken}`,
        },
      });

      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        const userEmail = userInfo.mail || userInfo.userPrincipalName;
        if (userEmail) {
          credentialName = `Microsoft (${userEmail})`;
        }
      } else {
        console.warn('Could not fetch Microsoft user info, using default name');
      }
    } catch (error) {
      console.error('Error fetching Microsoft user info:', error);
      // Continue with default name
    }

    const createRequest: CredentialCreateRequest = {
      name: credentialName,
      type: CredentialType.OAUTH,
      provider: Provider.MICROSOFT,
      secret: credentialPayload,
      config: {
        source: 'oauth' as const,
        scopes: credentialPayload.scopes || [],
      },
    };

    // Use the appropriate function based on whether we have a workflow context
    if (stateData.workflowId) {
      await storeCredentialForWorkflow(
        stateData.userId as InternalUserId,
        stateData.workflowId,
        createRequest
      );
    } else {
      await storeCredential(stateData.userId as InternalUserId, createRequest);
    }

    // Redirect user back to the integrations page in the app
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const frontendBaseUrl = process.env.FRONTEND_URL;
    const redirectUrl = new URL("/dashboard/automation", frontendBaseUrl);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Error processing Microsoft OAuth callback:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
