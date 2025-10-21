import { NextResponse } from "next/server";
import {
  storeCredential,
  storeCredentialForWorkflow,
} from "@/services/credentials-store";
import { CredentialType, Provider } from "@duramation/db";
import { InternalUserId } from "@/types/user";
import { CredentialCreateRequest } from "@duramation/shared";
import {
  SERVER_PROVIDER_REGISTRY,
  getServerProviderConfig,
} from "@duramation/integrations/server";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const FRONTEND_URL = process.env.FRONTEND_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const providerParam = searchParams.get("provider");
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!providerParam) {
    return redirectToError("Missing provider parameter");
  }

  if (!code || !state) {
    return redirectToError("Missing code or state from OAuth callback");
  }

  try {
    const provider = providerParam.toUpperCase() as Provider;

    // Validate provider exists and has auth handler
    if (!SERVER_PROVIDER_REGISTRY[provider]) {
      return redirectToError(`Invalid provider: ${provider}`);
    }

    const { authHandler } = SERVER_PROVIDER_REGISTRY[provider];
    if (!authHandler) {
      return redirectToError(
        `Provider ${provider} does not support OAuth authentication`
      );
    }

    // Parse the state parameter to get user ID and workflow ID
    let stateData: { userId: string; workflowId?: string };
    try {
      stateData = JSON.parse(Buffer.from(state, "base64").toString());
    } catch {
      // Fallback for old format (just user ID)
      stateData = { userId: state };
    }

    // Use the provider's auth handler to exchange code for tokens
    const credentialPayload = await authHandler.handleCallback(code);

    // Get provider config for naming
    const config = getServerProviderConfig(provider);

    // Determine credential name based on provider
    let credentialName = `${config.name} Account`;

    // Try to get more specific name if possible
    if (provider === "GOOGLE") {
      // Fetch user email from Google
      const { google } = await import("googleapis");
      const oauth2Client = new google.auth.OAuth2(
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        process.env.GOOGLE_OAUTH_CLIENT_ID,
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        process.env.GOOGLE_OAUTH_CLIENT_SECRET
      );
      oauth2Client.setCredentials({
        access_token: credentialPayload.accessToken,
      });
      const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
      try {
        const { data: userInfo } = await oauth2.userinfo.get();
        if (userInfo.email) {
          credentialName = `Google (${userInfo.email})`;
        }
      } catch (error) {
        console.error("Error fetching Google user info:", error);
      }
    } else if (provider === "SLACK" && credentialPayload.teamName) {
      credentialName = `Slack (${credentialPayload.teamName})`;
    }

    const createRequest: CredentialCreateRequest = {
      name: credentialName,
      type: CredentialType.OAUTH,
      provider: provider,
      secret: credentialPayload,
      config: {
        source: "oauth" as const,
        scopes: credentialPayload.scopes || [],
      },
    };

    // Store credential with or without workflow association
    if (stateData.workflowId) {
      await storeCredentialForWorkflow(
        stateData.userId as InternalUserId,
        stateData.workflowId,
        createRequest
      );
    } else {
      await storeCredential(stateData.userId as InternalUserId, createRequest);
    }

    // Redirect user back to the automations page
    const redirectUrl = new URL("/dashboard/automation", FRONTEND_URL);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Error processing OAuth callback:", error);
    return redirectToError(
      error instanceof Error ? error.message : "Internal Server Error"
    );
  }
}

function redirectToError(message: string): NextResponse {
  const errorUrl = new URL("/dashboard/automation", FRONTEND_URL);
  errorUrl.searchParams.set("error", message);
  return NextResponse.redirect(errorUrl);
}
