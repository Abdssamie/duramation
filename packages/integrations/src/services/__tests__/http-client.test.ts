import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createHttpClient, createAuthenticatedHttpClient, ApiClient, providerClients } from '../http-client.js';
import type { CredentialSecret } from '@duramation/shared/types';

describe('HTTP Client', () => {
  describe('createHttpClient', () => {
    it('should create a got instance with default config', () => {
      const client = createHttpClient();
      expect(client).toBeDefined();
    });

    it('should apply custom timeout', () => {
      const client = createHttpClient({ timeout: 5000 });
      expect(client.defaults.options.timeout).toEqual({ request: 5000 });
    });

    it('should apply custom headers', () => {
      const client = createHttpClient({ 
        headers: { 'X-Custom': 'test' } 
      });
      expect(client.defaults.options.headers).toBeDefined();
    });

    it('should set User-Agent header', () => {
      const client = createHttpClient();
      expect(client.defaults.options.headers).toBeDefined();
    });

    it('should configure retry logic', () => {
      const client = createHttpClient({ retries: 5 });
      expect(client.defaults.options.retry.limit).toBe(5);
    });
  });

  describe('createAuthenticatedHttpClient', () => {
    it('should add OAuth Bearer token for Google', () => {
      const credentials = { 
        accessToken: 'test-token',
        refreshToken: 'refresh',
        expiresIn: 3600,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      };
      const client = createAuthenticatedHttpClient({
        provider: 'GOOGLE',
        credentials
      });
      expect(client.defaults.options.headers).toBeDefined();
    });

    it('should add OAuth Bearer token for Slack', () => {
      const credentials = { accessToken: 'xoxb-test', teamId: 'T123' };
      const client = createAuthenticatedHttpClient({
        provider: 'SLACK',
        credentials
      });
      expect(client.defaults.options.headers).toBeDefined();
    });

    it('should add API key for Firecrawl', () => {
      const credentials = { apiKey: 'fc-test-key' };
      const client = createAuthenticatedHttpClient({
        provider: 'FIRECRAWL',
        credentials
      });
      expect(client.defaults.options.headers).toBeDefined();
    });

    it('should handle missing credentials gracefully', () => {
      const credentials = { 
        accessToken: 'test',
        refreshToken: 'refresh',
        expiresIn: 3600,
        scopes: ['test']
      };
      
      expect(() => createAuthenticatedHttpClient({
        provider: 'GOOGLE',
        credentials
      })).not.toThrow();
    });
  });

  describe('ApiClient', () => {
    let mockClient: any;
    let apiClient: ApiClient;

    beforeEach(() => {
      mockClient = {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
        patch: vi.fn()
      };
      apiClient = new ApiClient(mockClient as any);
    });

    describe('get', () => {
      it('should make GET request and return body', async () => {
        const mockResponse = { body: { data: 'test' } };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await apiClient.get('/test');
        
        expect(mockClient.get).toHaveBeenCalledWith('/test', undefined);
        expect(result).toEqual({ data: 'test' });
      });

      it('should pass options to got', async () => {
        const mockResponse = { body: { data: 'test' } };
        mockClient.get.mockResolvedValue(mockResponse);
        const options = { searchParams: { q: 'search' } };

        await apiClient.get('/test', options);
        
        expect(mockClient.get).toHaveBeenCalledWith('/test', options);
      });
    });

    describe('post', () => {
      it('should make POST request with JSON data', async () => {
        const mockResponse = { body: { success: true } };
        mockClient.post.mockResolvedValue(mockResponse);
        const data = { name: 'test' };

        const result = await apiClient.post('/test', data);
        
        expect(mockClient.post).toHaveBeenCalledWith('/test', { json: data });
        expect(result).toEqual({ success: true });
      });

      it('should handle undefined data', async () => {
        const mockResponse = { body: { success: true } };
        mockClient.post.mockResolvedValue(mockResponse);

        await apiClient.post('/test');
        
        expect(mockClient.post).toHaveBeenCalledWith('/test', {});
      });

      it('should use explicit body option if provided', async () => {
        const mockResponse = { body: { success: true } };
        mockClient.post.mockResolvedValue(mockResponse);
        const body = 'raw body';

        await apiClient.post('/test', null, { body });
        
        expect(mockClient.post).toHaveBeenCalledWith('/test', { body });
      });
    });

    describe('put', () => {
      it('should make PUT request with JSON data', async () => {
        const mockResponse = { body: { updated: true } };
        mockClient.put.mockResolvedValue(mockResponse);
        const data = { name: 'updated' };

        const result = await apiClient.put('/test', data);
        
        expect(mockClient.put).toHaveBeenCalledWith('/test', { json: data });
        expect(result).toEqual({ updated: true });
      });
    });

    describe('delete', () => {
      it('should make DELETE request', async () => {
        const mockResponse = { body: { deleted: true } };
        mockClient.delete.mockResolvedValue(mockResponse);

        const result = await apiClient.delete('/test');
        
        expect(mockClient.delete).toHaveBeenCalledWith('/test', undefined);
        expect(result).toEqual({ deleted: true });
      });
    });

    describe('patch', () => {
      it('should make PATCH request with JSON data', async () => {
        const mockResponse = { body: { patched: true } };
        mockClient.patch.mockResolvedValue(mockResponse);
        const data = { field: 'value' };

        const result = await apiClient.patch('/test', data);
        
        expect(mockClient.patch).toHaveBeenCalledWith('/test', { json: data });
        expect(result).toEqual({ patched: true });
      });
    });
  });

  describe('providerClients', () => {
    it('should create Google client with correct base URL', () => {
      const credentials = { 
        accessToken: 'test',
        refreshToken: 'refresh',
        expiresIn: 3600,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      };
      const client = providerClients.google(credentials);
      expect(client.defaults.options.prefixUrl).toBe('https://www.googleapis.com/');
    });

    it('should create Slack client with correct base URL', () => {
      const credentials = { accessToken: 'xoxb-test', teamId: 'T123' };
      const client = providerClients.slack(credentials);
      expect(client.defaults.options.prefixUrl).toBe('https://slack.com/api/');
    });

    it('should create Microsoft client with correct base URL', () => {
      const credentials = { accessToken: 'test', expiresIn: 3600, scopes: ['User.Read'] };
      const client = providerClients.microsoft(credentials);
      expect(client.defaults.options.prefixUrl).toBe('https://graph.microsoft.com/v1.0/');
    });

    it('should create Firecrawl client with correct base URL', () => {
      const credentials = { apiKey: 'fc-test' };
      const client = providerClients.firecrawl(credentials);
      expect(client.defaults.options.prefixUrl).toBe('https://api.firecrawl.dev/');
    });

    it('should create HubSpot client with correct base URL', () => {
      const credentials = { accessToken: 'test', refreshToken: 'refresh', hubId: 'hub123' };
      const client = providerClients.hubspot(credentials);
      expect(client.defaults.options.prefixUrl).toBe('https://api.hubapi.com/');
    });
  });

  describe('Error handling', () => {
    it('should handle network errors gracefully', async () => {
      const mockClient = {
        get: vi.fn().mockRejectedValue(new Error('Network error'))
      };
      const apiClient = new ApiClient(mockClient as any);

      await expect(apiClient.get('/test')).rejects.toThrow('Network error');
    });
  });

  describe('Logging', () => {
    let originalEnv: string | undefined;

    beforeEach(() => {
      originalEnv = process.env.HTTP_CLIENT_LOG;
    });

    afterEach(() => {
      if (originalEnv) {
        process.env.HTTP_CLIENT_LOG = originalEnv;
      } else {
        delete process.env.HTTP_CLIENT_LOG;
      }
    });

    it('should not log by default', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      createHttpClient();
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
