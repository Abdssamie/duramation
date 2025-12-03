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
  const { provider_config_key, workflowId } = body;

  if (!provider_config_key) {
    return NextResponse.json({ error: 'provider_config_key is required' }, { status: 400 });
  }

  try {
    const providerKeys = Array.isArray(provider_config_key) ? provider_config_key : [provider_config_key];
    const allowedIntegrations = providerKeys.map(key => key.toLowerCase().replace(/_/g, '-'));

    const params = {
      end_user: {
        id: userId,
        ...(workflowId && { tags: { workflowId } }),
      },
      allowed_integrations: allowedIntegrations,
    };

    console.log('Creating Nango session with params:', JSON.stringify(params, null, 2));

    const session = await integrationClient.createConnectSession(params);

    return NextResponse.json({ token: session.data.token });
  } catch (error: any) {
    console.error('Failed to create Nango session:', JSON.stringify(error, null, 2));
    return NextResponse.json({ error: error.response?.data || error.message || 'Internal Server Error' }, { status: 500 });
  }
}
