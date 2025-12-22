import { SlackOAuthSecret } from '@duramation/shared';

function getSlackCredentials() {
  const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
  const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
  const SLACK_REDIRECT_URL = process.env.SLACK_REDIRECT_URL || `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/credentials/oauth/callback?provider=SLACK`;

  if (!SLACK_CLIENT_ID || !SLACK_CLIENT_SECRET) {
    throw new Error("Slack OAuth client credentials not found");
  }

  return {
    clientId: SLACK_CLIENT_ID,
    clientSecret: SLACK_CLIENT_SECRET,
    redirectUrl: SLACK_REDIRECT_URL,
  };
}

export class SlackAuthHandler {
  static generateAuthUrl(scopes: string[], state: string): string {
    const { clientId, redirectUrl } = getSlackCredentials();
    
    const params = new URLSearchParams({
      client_id: clientId,
      scope: scopes.join(','),
      state: state,
      redirect_uri: redirectUrl,
    });

    return `https://slack.com/oauth/v2/authorize?${params.toString()}`;
  }

  static async handleCallback(code: string): Promise<SlackOAuthSecret> {
    const { clientId, clientSecret, redirectUrl } = getSlackCredentials();
    
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUrl,
    });

    const response = await fetch('https://slack.com/api/oauth.v2.access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(`Slack OAuth error: ${data.error}`);
    }

    return {
      accessToken: data.access_token,
      scopes: data.scope?.split(',') || [],
      teamId: data.team.id,
      teamName: data.team.name,
      tokenType: data.token_type,
      botUserId: data.bot_user_id,
    };
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string; expiresIn: number }> {
    // Slack tokens don't expire, so this is a no-op
    // But we implement it for interface consistency
    throw new Error('Slack tokens do not support refresh');
  }
}
