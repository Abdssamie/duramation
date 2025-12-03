import { NextResponse } from 'next/server';
import { Provider } from '@duramation/db';
import { credentialStore } from "@/services/credentials-store";
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('[Nango Webhook] Received payload:', JSON.stringify(body, null, 2));

    if (body.type === 'auth' && body.success) {
      const { connectionId, providerConfigKey, endUser } = body;
      
      if (!connectionId || !providerConfigKey || !endUser?.endUserId) {
        console.error('[Nango Webhook] Invalid payload - missing required fields:', {
          hasConnectionId: !!connectionId,
          hasProviderConfigKey: !!providerConfigKey,
          hasEndUserId: !!endUser?.endUserId,
          payload: body
        });
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
      }

      const userId = endUser.endUserId;
      const workflowId = endUser.tags?.workflowId;
      
      const providerEnumKey = providerConfigKey.replace(/-/g, '_') as Provider;
      
      if (!Object.values(Provider).includes(providerEnumKey)) {
          console.error(`[Nango Webhook] Unknown provider config key: ${providerConfigKey}, tried enum key: ${providerEnumKey}`);
          return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
      }

      console.log(`[Nango Webhook] Auth success for ${providerEnumKey} / ${userId} / ${connectionId} / workflow: ${workflowId || 'none'}`);

      const credential = await credentialStore.store({
        userId,
        provider: providerEnumKey,
        type: 'OAUTH',
        data: {
          nangoConnectionId: connectionId,
          accessToken: 'nango-managed',
        } as unknown as import('@duramation/shared').CredentialSecret 
      });

      if (workflowId && credential?.id) {
        await prisma.workflowCredential.upsert({
          where: {
            workflowId_credentialId: {
              workflowId,
              credentialId: credential.id,
            },
          },
          update: {},
          create: {
            workflowId,
            credentialId: credential.id,
          },
        });
      }

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true, ignored: true });
  } catch (error) {
    console.error('Error processing Nango webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
