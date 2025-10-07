import { NextResponse } from "next/server";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import { auth } from "@clerk/nextjs/server";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";
import {
  OAuthProviderFullConfig,
  Slack,
  getProviderRegistryConfig,
} from "@duramation/integrations/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scopesParam = searchParams.get("scopes");
  const workflowId = searchParams.get("workflowId");
  
  try {
    // Authenticate user
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId: id } = authResult;

    // Get scopes from query param or use defaults
    const config = getProviderRegistryConfig('SLACK') as OAuthProviderFullConfig;
    const scopes = scopesParam 
      ? scopesParam.split(",") 
      : config.oauth?.defaultScopes || [];

    // Create state parameter that includes both user ID and workflow ID
    const stateData = {
      userId: id,
      ...(workflowId && { workflowId })
    };
    const state = Buffer.from(JSON.stringify(stateData)).toString('base64');

    // Use the integrations package to generate auth URL
    const url = Slack.SlackAuthHandler.generateAuthUrl(scopes, state);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error generating Slack Auth URL:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
