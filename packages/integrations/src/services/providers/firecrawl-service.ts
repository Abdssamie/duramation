import { ApiClient, providerClients } from '../http-client.js';
import type { CredentialSecret } from '@duramation/shared/types';

export interface FirecrawlScrapeOptions {
  formats?: ('markdown' | 'html' | 'rawHtml' | 'links' | 'screenshot')[];
  headers?: Record<string, string>;
  includeTags?: string[];
  excludeTags?: string[];
  onlyMainContent?: boolean;
  timeout?: number;
  waitFor?: number;
}

export interface FirecrawlCrawlOptions {
  includePaths?: string[];
  excludePaths?: string[];
  maxDepth?: number;
  limit?: number;
  allowBackwardLinks?: boolean;
  allowExternalLinks?: boolean;
  ignoreSitemap?: boolean;
  scrapeOptions?: FirecrawlScrapeOptions;
}

export interface FirecrawlScrapeResponse {
  success: boolean;
  data?: {
    markdown?: string;
    html?: string;
    rawHtml?: string;
    links?: string[];
    screenshot?: string;
    metadata?: {
      title?: string;
      description?: string;
      language?: string;
      keywords?: string;
      robots?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogUrl?: string;
      ogImage?: string;
      ogLocaleAlternate?: string[];
      ogSiteName?: string;
      sourceURL?: string;
      statusCode?: number;
    };
  };
  error?: string;
}

export interface FirecrawlCrawlResponse {
  success: boolean;
  id?: string;
  url?: string;
  error?: string;
}

export interface FirecrawlCrawlStatusResponse {
  success: boolean;
  status: 'scraping' | 'completed' | 'failed';
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: Array<{
    markdown?: string;
    html?: string;
    rawHtml?: string;
    links?: string[];
    screenshot?: string;
    metadata?: any;
  }>;
  error?: string;
}

export class FirecrawlService {
  private client: ApiClient;
  
  constructor(credentials: CredentialSecret) {
    this.client = new ApiClient(providerClients.firecrawl(credentials));
  }
  
  // Scrape methods
  async scrape(url: string, options: FirecrawlScrapeOptions = {}): Promise<FirecrawlScrapeResponse> {
    return this.client.post('/v1/scrape', {
      url,
      formats: ['markdown'],
      ...options
    });
  }
  
  async scrapeMultiple(urls: string[], options: FirecrawlScrapeOptions = {}, concurrency = 5): Promise<FirecrawlScrapeResponse[]> {
    const results: FirecrawlScrapeResponse[] = [];
    for (let i = 0; i < urls.length; i += concurrency) {
      const batch = urls.slice(i, i + concurrency);
      const batchResults = await Promise.all(batch.map(url => this.scrape(url, options)));
      results.push(...batchResults);
    }
    return results;
  }
  
  // Crawl methods
  async crawl(url: string, options: FirecrawlCrawlOptions = {}): Promise<FirecrawlCrawlResponse> {
    return this.client.post('/v1/crawl', {
      url,
      limit: 100,
      scrapeOptions: {
        formats: ['markdown'],
        ...options.scrapeOptions
      },
      ...options
    });
  }
  
  async getCrawlStatus(id: string): Promise<FirecrawlCrawlStatusResponse> {
    return this.client.get(`/v1/crawl/${id}`);
  }
  
  async cancelCrawl(id: string): Promise<{ success: boolean }> {
    return this.client.delete(`/v1/crawl/${id}`);
  }
  
  // Batch operations
  async batchScrape(requests: Array<{
    url: string;
    options?: FirecrawlScrapeOptions;
  }>): Promise<FirecrawlScrapeResponse[]> {
    return this.client.post('/v1/batch/scrape', {
      urls: requests.map(req => ({
        url: req.url,
        ...req.options
      }))
    });
  }
  
  // Search methods (if available)
  async search(query: string, options: {
    limit?: number;
    searchDepth?: 'basic' | 'advanced';
    includeDomains?: string[];
    excludeDomains?: string[];
  } = {}): Promise<any> {
    return this.client.post('/v1/search', {
      query,
      limit: 10,
      searchDepth: 'basic',
      ...options
    });
  }
  
  // Map methods
  async map(url: string, options: {
    search?: string;
    ignoreSitemap?: boolean;
    includeSubdomains?: boolean;
    limit?: number;
  } = {}): Promise<any> {
    return this.client.post('/v1/map', {
      url,
      limit: 5000,
      ...options
    });
  }
  
  // Utility methods
  async extractContent(url: string, selector?: string): Promise<string> {
    const response = await this.scrape(url, {
      formats: ['markdown'],
      onlyMainContent: true,
      includeTags: selector ? [selector] : undefined
    });
    
    return response.data?.markdown || '';
  }
  
  async extractLinks(url: string): Promise<string[]> {
    const response = await this.scrape(url, {
      formats: ['links']
    });
    
    return response.data?.links || [];
  }
  
  async takeScreenshot(url: string): Promise<string | null> {
    const response = await this.scrape(url, {
      formats: ['screenshot']
    });
    
    return response.data?.screenshot || null;
  }
  
  async getMetadata(url: string): Promise<any> {
    const response = await this.scrape(url, {
      formats: ['markdown']
    });
    
    return response.data?.metadata || {};
  }
  
  // Monitoring methods
  async waitForCrawlCompletion(id: string, options: {
    maxWaitTime?: number;
    pollInterval?: number;
    signal?: AbortSignal;
  } = {}): Promise<FirecrawlCrawlStatusResponse> {
    const { maxWaitTime = 300000, pollInterval = 5000 } = options; // 5 minutes max, 5 second intervals
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      if (options.signal?.aborted) {
        throw new Error('Crawl wait aborted');
      }
      
      const status = await this.getCrawlStatus(id);
      
      if (status.status === 'completed' || status.status === 'failed') {
        return status;
      }
      
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
    
    throw new Error('Crawl timeout exceeded');
  }
  
  async testConnection(): Promise<boolean> {
    try {
      // Test with a simple scrape of a reliable URL
      await this.scrape('https://example.com', {
        formats: ['markdown'],
        timeout: 10000
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}