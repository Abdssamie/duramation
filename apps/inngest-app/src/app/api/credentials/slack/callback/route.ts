import { NextResponse } from "next/server";
import { storeCredential, storeCredentialForWorkflow } from "@/services/credentials-store";
import { CredentialType, Provider } from "@duramation/db";
import { InternalUserId } from "@/types/user";
import { CredentialCreateRequest } from "@duramation/shared";
import { Slack } from "@duramation/integrations/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  
  if (!code || !state) {
    return new NextResponse("Missing code or state from Slack OAuth callback", {
      status: 400,
    });
  }

  try {
    // Parse the state parameter to get user ID and workflow ID
    let stateData: { userId: string; workflowId?: string };
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    } catch {
      stateData = { userId: state };
    }

    console.log(stateData);

    // Use the integrations package to handle OAuth callback
    const credentialPayload = await Slack.SlackAuthHandler.handleCallback(code);

    const createRequest: CredentialCreateRequest = {
      name: `Slack (${credentialPayload.teamName})`,
      type: CredentialType.OAUTH,
      provider: Provider.SLACK,
      secret: credentialPayload,
      config: {
        source: 'oauth' as const,
        teamId: credentialPayload.teamId,
        teamName: credentialPayload.teamName,
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
    console.error("Error processing Slack OAuth callback:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
