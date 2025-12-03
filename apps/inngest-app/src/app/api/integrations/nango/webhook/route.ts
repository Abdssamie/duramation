import { NextResponse } from 'next/server';
import { Provider } from '@duramation/db';
import { credentialStore } from "@/services/credentials-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Verify webhook signature (TODO: Implement signature verification if Nango supports it)
    // For now, we trust the payload structure.

    if (body.type === 'auth' && body.success) {
      const { connectionId, providerConfigKey, endUser } = body;
      
      if (!connectionId || !providerConfigKey || !endUser?.id) {
        console.error('Invalid Nango webhook payload:', body);
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
      }

      const userId = endUser.id;
      
      // Convert Nango key (e.g. "google-mail") to Prisma Enum Key (e.g. "google_mail")
      // This assumes a consistent naming convention where hyphens become underscores
      const providerEnumKey = providerConfigKey.replace(/-/g, '_') as keyof typeof Provider;
      const provider = Provider[providerEnumKey];

      if (!provider) {
          console.error(`Unknown provider config key: ${providerConfigKey}`);
          return NextResponse.json({ error: 'Unknown provider' }, { status: 400 });
      }

      console.log(`[Nango Webhook] Auth success for ${provider} / ${userId} / ${connectionId}`);

      // Save to our Credential Store
      await credentialStore.store({
        userId,
        provider,
        type: 'OAUTH', // Nango handles the type, we just treat it as managed
        data: {
          nangoConnectionId: connectionId,
          accessToken: 'nango-managed', // Placeholder to satisfy potentially required fields in legacy types if any
        } as unknown as import('@duramation/shared').CredentialSecret 
      });

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true, ignored: true });
  } catch (error) {
    console.error('Error processing Nango webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
