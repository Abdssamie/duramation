import { GoogleService } from './services/providers/google-service.js';
import { FirecrawlService } from './services/providers/firecrawl-service.js';
import type { CredentialSecret } from '@duramation/shared/types';

async function testGoogle(accessToken: string) {
  console.log('--- Testing Google Service ---');
  const credentials: CredentialSecret = { accessToken };
  const google = new GoogleService(credentials);

  try {
    console.log('Testing listFiles...');
    const files = await google.listFiles({ pageSize: 5 });
    console.log('Files found:', files.files?.length || 0);
    
    console.log('Testing listEmails...');
    const emails = await google.listEmails({ maxResults: 5 });
    console.log('Emails found:', emails.messages?.length || 0);

    console.log('✅ Google Service basic tests passed!');
  } catch (error: any) {
    console.error('❌ Google Service test failed:', error.message);
    if (error.response) console.error('Response:', error.response.body);
  }
}

async function testFirecrawl(apiKey: string) {
  console.log('\n--- Testing Firecrawl Service ---');
  const credentials: CredentialSecret = { apiKey };
  const firecrawl = new FirecrawlService(credentials);

  try {
    console.log('Testing scrape (https://example.com)...');
    const result = await firecrawl.scrape('https://example.com');
    console.log('Scrape status:', result.success ? 'Success' : 'Failed');
    if (result.data?.metadata?.title) {
        console.log('Page title:', result.data.metadata.title);
    }

    console.log('✅ Firecrawl Service basic tests passed!');
  } catch (error: any) {
    console.error('❌ Firecrawl Service test failed:', error.message);
  }
}

async function main() {
  const googleToken = process.env.GOOGLE_TEST_TOKEN;
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;

  if (googleToken) {
    await testGoogle(googleToken);
  } else {
    console.log('Skipping Google test (GOOGLE_TEST_TOKEN not set)');
  }

  if (firecrawlKey) {
    await testFirecrawl(firecrawlKey);
  } else {
    console.log('Skipping Firecrawl test (FIRECRAWL_API_KEY not set)');
  }
}

main().catch(console.error);
