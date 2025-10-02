// Example of how to use the new integration system

import { 
  PROVIDER_CONFIGS, 
  getProviderConfig, 
  isOAuthProvider, 
  isApiKeyProvider,
  integrationServiceRegistry,
  InstagramService
} from '../index';

// 1. Adding a new provider (already done in providers.ts)
// To add a new provider, simply add it to the PROVIDER_CONFIGS object

// 2. Using the provider configuration
const instagramConfig = getProviderConfig('INSTAGRAM');
console.log('Instagram config:', instagramConfig);

// 3. Checking provider type
if (isOAuthProvider('INSTAGRAM')) {
  console.log('Instagram uses OAuth authentication');
}

// 4. Registering a service
const instagramCredentials = {
  accessToken: 'user-access-token',
  refreshToken: 'user-refresh-token',
  expiresIn: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
  userId: 'user-id'
};

const instagramService = new InstagramService(instagramCredentials);
integrationServiceRegistry.registerService('INSTAGRAM', instagramService);

// 5. Using the service registry
if (integrationServiceRegistry.hasService('INSTAGRAM')) {
  const service = integrationServiceRegistry.getService('INSTAGRAM');
  console.log('Instagram service registered:', service);
}

// 6. In a Next.js API route for OAuth
/*
import { OAuthHandler } from '../routes/oauth';

// GET /api/auth/instagram
export async function handleInstagramAuth(req, res) {
  try {
    const state = {
      provider: 'INSTAGRAM',
      userId: 'current-user-id',
      redirectUri: 'https://yourapp.com/callback'
    };
    
    const authUrl = OAuthHandler.generateAuthUrl('INSTAGRAM', state, 'https://yourapp.com/api/auth/instagram/callback');
    res.redirect(authUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /api/auth/instagram/callback
export async function handleInstagramCallback(req, res) {
  try {
    const { code, state } = req.query;
    const tokenData = await OAuthHandler.handleCallback('INSTAGRAM', code as string, state as string);
    
    // Save credentials to database
    // Register service with integration registry
    // Redirect user back to app
    
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
*/

// 7. In an Inngest workflow
/*
import { integrationMiddleware } from '../middleware/inngest-middleware';

export const socialMediaWorkflow = inngest.createFunction(
  { id: "social-media-post" },
  { event: "social/post.content" },
  [integrationMiddleware],
  async ({ event, step, integrations }) => {
    if (integrations.hasIntegration('INSTAGRAM')) {
      const instagram = integrations.getIntegration('INSTAGRAM');
      
      // Post to Instagram
      const media = await instagram.getMediaList(5);
      console.log('Latest media:', media);
      
      // ... do something with the media
    }
    
    return { success: true };
  }
);
*/

console.log('Integration system example completed');