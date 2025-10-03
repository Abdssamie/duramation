import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";
import {
  SERVER_PROVIDER_REGISTRY,
  getServerProviderConfig,
} from "@duramation/integrations/server";
import { Provider } from "@duramation/db/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const providerParam = searchParams.get("provider");
  const scopesParam = searchParams.get("scopes");
  const workflowId = searchParams.get("workflowId");

  try {
    // Validate provider parameter
    if (!providerParam) {
      return new NextResponse("Missing provider parameter", { status: 400 });
    }

    const provider = providerParam.toUpperCase() as Provider;

    // Check if provider exists in registry
    if (!SERVER_PROVIDER_REGISTRY[provider]) {
      return new NextResponse(`Invalid provider: ${provider}`, { status: 400 });
    }

    // Check if provider has an auth handler
    const { authHandler } = SERVER_PROVIDER_REGISTRY[provider];
    if (!authHandler) {
      return new NextResponse(
        `Provider ${provider} does not support OAuth authentication`,
        { status: 400 }
      );
    }

    // Authenticate user
    const user = await auth();
    if (!user || !user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const id = await getInternalUserId(user.userId as ClerkUserId);
    if (!id) {
      return new Response("User not found", { status: 404 });
    }

    // Get scopes from query param or use defaults
    const config = getServerProviderConfig(provider);
    let scopes: string[] = [];

    if (config.authType === "OAUTH") {
      scopes = scopesParam
        ? scopesParam.split(",")
        : config.oauth?.defaultScopes || [];
    }

    // Create state parameter that includes both user ID and workflow ID
    const stateData = {
      userId: id,
      ...(workflowId && { workflowId }),
    };
    const state = Buffer.from(JSON.stringify(stateData)).toString("base64");

    // Generate auth URL using the provider's auth handler
    const url = authHandler.generateAuthUrl(scopes, state);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error generating OAuth Auth URL:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
