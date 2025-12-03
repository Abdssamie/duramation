import { NextResponse } from 'next/server';
import { authenticateUser, isAuthError } from '@/lib/utils/auth';
import { integrationClient } from '@duramation/integrations/server';

export async function POST(req: Request) {
  const authResult = await authenticateUser();
  if (isAuthError(authResult)) {
    return authResult;
  }

  const { userId } = authResult;
  const body = await req.json();
  const { provider_config_key } = body;

  if (!provider_config_key) {
    return NextResponse.json({ error: 'provider_config_key is required' }, { status: 400 });
  }

  try {
    // We need to access the Nango instance from the client wrapper
    // The client wrapper doesn't expose createConnectSession directly, so we need to extend it
    // or access the underlying nango instance if possible.
    // For now, I'll assume we can add this method to IntegrationClient.
    
    // However, looking at previous file reads, integrationClient wraps Nango.
    // I will modify IntegrationClient to expose createConnectSession.
    
    // Assuming IntegrationClient update is coming, here is the usage:
    // We use the userId as the connection_id prefix or let Nango generate one?
    // Recommended: unique connection ID per user/integration pair.
    const connectionId = `${provider_config_key.toLowerCase().replace(/_/g, '-')}-${userId}`;

    const params = {
      end_user: {
        id: userId,
        display_name: userId // Optional: fetch real user name
      },
      allowed_integrations: [provider_config_key.toLowerCase().replace(/_/g, '-')],
    };

    console.log('Creating Nango session with params:', JSON.stringify(params, null, 2));

    const session = await integrationClient.createConnectSession(params);

    return NextResponse.json({ token: session.data.token, connectionId });
  } catch (error: any) {
    console.error('Failed to create Nango session:', JSON.stringify(error, null, 2));
    return NextResponse.json({ error: error.response?.data || error.message || 'Internal Server Error' }, { status: 500 });
  }
}
