import { NextResponse } from "next/server";
import { google } from "googleapis";
import { storeCredential, storeCredentialForWorkflow } from "@/services/credentials-store";
import { CredentialType, Provider } from "@duramation/db";
import { InternalUserId } from "@/types/user";
import { CredentialCreateRequest, GoogleOAuthSecret } from "@duramation/shared";

const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const GOOGLE_OAUTH_REDIRECT_URL = process.env.GOOGLE_OAUTH_REDIRECT_URL;

if (
  !GOOGLE_OAUTH_CLIENT_ID ||
  !GOOGLE_OAUTH_CLIENT_SECRET ||
  !GOOGLE_OAUTH_REDIRECT_URL
) {
  throw new Error("Google OAuth credentials not found in .env file");
}

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URL
);


export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  if (!code || !state) {
    return new NextResponse("Missing code or state from Google OAuth callback", {
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

     console.log(stateData)

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user's email to name the credential
    const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
    const { data: userInfo } = await oauth2.userinfo.get();

    if (!userInfo.email) {
        return NextResponse.json(
            { message: "Could not retrieve user email from Google." },
            { status: 500 }
        );
    }

    if (!tokens.access_token || !tokens.refresh_token || !tokens.expiry_date || !tokens.scope) {
        return NextResponse.json(
            { message: "Incomplete token data from Google." },
            { status: 500 }
        );
    }

    const credentialPayload: GoogleOAuthSecret = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expiry_date,
      scope: tokens.scope,
    };

    const createRequest: CredentialCreateRequest = {
      name: `Google (${userInfo.email})`,
      type: CredentialType.OAUTH,
      provider: Provider.GOOGLE,
      secret: credentialPayload,
      config: {
        source: 'oauth' as const,
        scopes: tokens.scope?.split(' ') || [],
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
    const frontendBaseUrl = process.env.FRONTEND_URL;
    const redirectUrl = new URL("/dashboard/automation", frontendBaseUrl);
    return NextResponse.redirect(redirectUrl);
    
  } catch (error) {
    console.error("Error processing Google OAuth callback:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
