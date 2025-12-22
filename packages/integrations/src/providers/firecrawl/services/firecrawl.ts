import { FirecrawlApiKeySecret } from '../auth.js';

export interface ScrapeOptions {
  formats?: ('markdown' | 'html' | 'rawHtml' | 'links' | 'screenshot')[];
  onlyMainContent?: boolean;
  includeTags?: string[];
  excludeTags?: string[];
  waitFor?: number;
}

export interface CrawlOptions {
  limit?: number;
  maxDepth?: number;
  allowBackwardLinks?: boolean;
  allowExternalLinks?: boolean;
  ignoreSitemap?: boolean;
}

export class FirecrawlService {
  private apiKey: string;
  private baseUrl = 'https://api.firecrawl.dev/v1';

  constructor(credentialPayload: FirecrawlApiKeySecret) {
    this.apiKey = credentialPayload.apiKey;
  }

  private async makeRequest(endpoint: string, method: string = 'GET', body?: any) {
    const url = `${this.baseUrl}/${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Firecrawl API error: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  async scrape(url: string, options?: ScrapeOptions) {
    return this.makeRequest('scrape', 'POST', {
      url,
      ...options,
    });
  }

  async crawl(url: string, options?: CrawlOptions) {
    return this.makeRequest('crawl', 'POST', {
      url,
      ...options,
    });
  }

  async getCrawlStatus(crawlId: string) {
    return this.makeRequest(`crawl/${crawlId}`);
  }

  async cancelCrawl(crawlId: string) {
    return this.makeRequest(`crawl/${crawlId}`, 'DELETE');
  }

  async map(url: string) {
    return this.makeRequest('map', 'POST', {
      url,
    });
  }
}
