import { NextResponse } from "next/server";
import { google } from "googleapis";
import { auth } from "@clerk/nextjs/server";
import { getInternalUserId } from "@/lib/helpers/getInternalUserId";
import { ClerkUserId } from "@/types/user";

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


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scopesParam = searchParams.get("scopes");
  const workflowId = searchParams.get("workflowId");
  const scopes = scopesParam ? scopesParam.split(",") : [];

  try {
    const user = await auth();

    if (!user || !user.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const id = await getInternalUserId(user.userId as ClerkUserId);

    if (!id) {
      return new Response("User not found", { status: 404 });
    }

    // Create state parameter that includes both user ID and workflow ID
    const stateData = {
      userId: id,
      ...(workflowId && { workflowId })
    };
    const state = Buffer.from(JSON.stringify(stateData)).toString('base64');

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      // Pass the user's ID and workflow ID to the state parameter
      state: state,
      prompt: "consent", // This will ensure the user is prompted for consent every time, which is useful for getting a refresh token.
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error generating Google Auth URL:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
