import { NextResponse } from "next/server";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import {
  SERVER_PROVIDER_REGISTRY,
  getServerProviderConfig,
} from "@duramation/integrations/server";
import { Provider } from "@duramation/db/types";
import type { OAuthAuthorizationResponse } from "@duramation/shared";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const providerParam = searchParams.get("provider");
  const scopesParam = searchParams.get("scopes");
  const workflowId = searchParams.get("workflowId");

  try {
    // Validate provider parameter
    if (!providerParam) {
      const errorResponse: OAuthAuthorizationResponse = {
        success: false,
        error: "Missing provider parameter",
        code: "VALIDATION_ERROR",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const provider = providerParam.toUpperCase() as Provider;

    // Check if provider exists in registry
    if (!SERVER_PROVIDER_REGISTRY[provider]) {
      const errorResponse: OAuthAuthorizationResponse = {
        success: false,
        error: `Invalid provider: ${provider}`,
        code: "INVALID_PROVIDER",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Check if provider has an auth handler
    const { authHandler } = SERVER_PROVIDER_REGISTRY[provider];
    if (!authHandler) {
      const errorResponse: OAuthAuthorizationResponse = {
        success: false,
        error: `Provider ${provider} does not support OAuth authentication`,
        code: "UNSUPPORTED_OPERATION",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Authenticate user
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId: id } = authResult;

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

    const response: OAuthAuthorizationResponse = {
      success: true,
      data: {
        authorizationUrl: url,
        state,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error generating OAuth Auth URL:", error);
    const errorResponse: OAuthAuthorizationResponse = {
      success: false,
      error: "Internal Server Error",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
