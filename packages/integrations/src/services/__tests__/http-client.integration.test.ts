import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import nock from 'nock';
import { createHttpClient, createAuthenticatedHttpClient, ApiClient, providerClients } from '../http-client.js';
import type { CredentialSecret } from '@duramation/shared/types';

describe('HTTP Client - Integration Tests', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('OAuth Flow', () => {
    it('should handle OAuth token in requests', async () => {
      const credentials = { 
        accessToken: 'test-token-123',
        refreshToken: 'refresh',
        expiresIn: 3600,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      };
      
      nock('https://www.googleapis.com')
        .get('/sheets/v4/spreadsheets/test-id')
        .matchHeader('Authorization', 'Bearer test-token-123')
        .reply(200, { spreadsheetId: 'test-id', properties: { title: 'Test Sheet' } });

      const client = providerClients.google(credentials);
      const response = await client.get('sheets/v4/spreadsheets/test-id').json<any>();

      expect(response).toEqual({
        spreadsheetId: 'test-id',
        properties: { title: 'Test Sheet' }
      });
    });

    it('should handle expired token error', async () => {
      const credentials = { accessToken: 'xoxb-expired-token', teamId: 'T123' };
      
      nock('https://slack.com')
        .post('/api/chat.postMessage')
        .reply(401, { ok: false, error: 'token_expired' });

      const client = providerClients.slack(credentials);
      
      await expect(
        client.post('api/chat.postMessage', { json: { channel: 'test', text: 'hi' } }).json()
      ).rejects.toThrow();
    });
  });

  describe('API Key Authentication', () => {
    it('should send API key in header', async () => {
      const credentials = { apiKey: 'fc-test-key' };
      
      nock('https://api.firecrawl.dev')
        .post('/v1/scrape')
        .matchHeader('Authorization', 'Bearer fc-test-key')
        .reply(200, { success: true, data: { content: 'scraped' } });

      const client = providerClients.firecrawl(credentials);
      const response = await client.post('v1/scrape', { json: { url: 'https://example.com' } }).json<any>();

      expect(response.success).toBe(true);
    });
  });

  describe('Retry Logic', () => {
    it('should retry on 500 errors', async () => {
      nock('https://api.example.com')
        .get('/data')
        .reply(500, { error: 'Internal Server Error' })
        .get('/data')
        .reply(500, { error: 'Internal Server Error' })
        .get('/data')
        .reply(200, { data: 'success' });

      const client = new ApiClient(createHttpClient({ 
        baseUrl: 'https://api.example.com',
        retries: 3
      }));

      const result = await client.get('data');
      expect(result.data).toBe('success');
    });

    it('should retry on 429 rate limit', async () => {
      nock('https://api.example.com')
        .get('/data')
        .reply(429, { error: 'Rate limit exceeded' })
        .get('/data')
        .reply(200, { data: 'success' });

      const client = new ApiClient(createHttpClient({ 
        baseUrl: 'https://api.example.com',
        retries: 2
      }));

      const result = await client.get('data');
      expect(result.data).toBe('success');
    });
  });

  describe('Request/Response Transformation', () => {
    it('should send JSON and receive JSON', async () => {
      const requestData = { name: 'John', email: 'john@example.com' };
      
      nock('https://api.example.com')
        .post('/users', requestData)
        .reply(201, { id: '123', ...requestData });

      const client = new ApiClient(createHttpClient({ 
        baseUrl: 'https://api.example.com' 
      }));

      const result = await client.post('users', requestData);
      
      expect(result).toEqual({ id: '123', name: 'John', email: 'john@example.com' });
    });

    it('should handle query parameters', async () => {
      nock('https://api.example.com')
        .get('/search')
        .query({ q: 'test', limit: '10' })
        .reply(200, { results: [] });

      const client = new ApiClient(createHttpClient({ 
        baseUrl: 'https://api.example.com' 
      }));

      const result = await client.get('search', { 
        searchParams: { q: 'test', limit: '10' } 
      });
      
      expect(result.results).toEqual([]);
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 not found', async () => {
      nock('https://api.example.com')
        .get('/users/999')
        .reply(404, { error: 'User not found' });

      const client = new ApiClient(createHttpClient({ 
        baseUrl: 'https://api.example.com',
        retries: 0
      }));

      await expect(client.get('users/999')).rejects.toThrow();
    });

    it('should handle network errors', async () => {
      nock('https://api.example.com')
        .get('/data')
        .replyWithError('Network error');

      const client = new ApiClient(createHttpClient({ 
        baseUrl: 'https://api.example.com',
        retries: 0
      }));

      await expect(client.get('data')).rejects.toThrow();
    });

    it('should handle malformed JSON', async () => {
      nock('https://api.example.com')
        .get('/data')
        .reply(200, 'not json', { 'Content-Type': 'application/json' });

      const client = new ApiClient(createHttpClient({ 
        baseUrl: 'https://api.example.com' 
      }));

      await expect(client.get('data')).rejects.toThrow();
    });
  });

  describe('Provider-Specific Scenarios', () => {
    it('should handle Google Sheets API', async () => {
      const credentials = { 
        accessToken: 'google-token',
        refreshToken: 'refresh',
        expiresIn: 3600,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      };
      
      nock('https://www.googleapis.com')
        .get('/sheets/v4/spreadsheets/abc123/values/Sheet1!A1:B10')
        .reply(200, {
          range: 'Sheet1!A1:B10',
          values: [['Name', 'Email'], ['John', 'john@example.com']]
        });

      const client = providerClients.google(credentials);
      const response = await client.get('sheets/v4/spreadsheets/abc123/values/Sheet1!A1:B10').json<any>();

      expect(response.values).toHaveLength(2);
    });

    it('should handle Microsoft Graph API', async () => {
      const credentials = { accessToken: 'ms-token', expiresIn: 3600, scopes: ['User.Read'] };
      
      nock('https://graph.microsoft.com')
        .get('/v1.0/me/messages')
        .query({ $top: '10' })
        .reply(200, {
          value: [
            { id: '1', subject: 'Test Email' }
          ]
        });

      const client = providerClients.microsoft(credentials);
      const response = await client.get('me/messages', { 
        searchParams: { $top: '10' } 
      }).json<any>();

      expect(response.value).toHaveLength(1);
    });
  });
});
