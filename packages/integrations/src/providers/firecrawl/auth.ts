export interface FirecrawlApiKeySecret {
  apiKey: string;
}

export class FirecrawlAuthHandler {
  static async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'https://example.com',
        }),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  static createCredential(apiKey: string): FirecrawlApiKeySecret {
    return { apiKey };
  }
}
