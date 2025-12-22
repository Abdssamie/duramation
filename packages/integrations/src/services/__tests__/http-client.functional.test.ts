import { describe, it, expect } from 'vitest';
import { createHttpClient, ApiClient } from '../http-client.js';

describe('HTTP Client - Functional Tests', () => {
  describe('JSONPlaceholder API', () => {
    const client = new ApiClient(createHttpClient({ 
      baseUrl: 'https://jsonplaceholder.typicode.com' 
    }));

    it('should GET a post', async () => {
      const post = await client.get('posts/1');
      
      expect(post).toHaveProperty('id', 1);
      expect(post).toHaveProperty('userId');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
    });

    it('should GET all posts', async () => {
      const posts = await client.get('posts');
      
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0]).toHaveProperty('id');
    });

    it('should POST a new post', async () => {
      const newPost = {
        title: 'Test Post',
        body: 'Test body',
        userId: 1
      };
      
      const result = await client.post('posts', newPost);
      
      expect(result).toHaveProperty('id');
      expect(result.title).toBe(newPost.title);
      expect(result.body).toBe(newPost.body);
    });

    it('should PUT to update a post', async () => {
      const updated = {
        id: 1,
        title: 'Updated Title',
        body: 'Updated body',
        userId: 1
      };
      
      const result = await client.put('posts/1', updated);
      
      expect(result.title).toBe(updated.title);
      expect(result.body).toBe(updated.body);
    });

    it('should PATCH to partially update', async () => {
      const result = await client.patch('posts/1', { title: 'Patched' });
      
      expect(result.title).toBe('Patched');
      expect(result).toHaveProperty('id', 1);
    });

    it('should DELETE a post', async () => {
      const result = await client.delete('posts/1');
      
      expect(result).toBeDefined();
    });
  });

  describe('HTTPBin API', () => {
    const client = new ApiClient(createHttpClient({ 
      baseUrl: 'https://httpbin.org' 
    }));

    it('should handle query parameters', async () => {
      const result = await client.get('get', { 
        searchParams: { foo: 'bar', test: '123' } 
      });
      
      expect(result.args).toEqual({ foo: 'bar', test: '123' });
    });

    it('should send custom headers', async () => {
      const customClient = new ApiClient(createHttpClient({ 
        baseUrl: 'https://httpbin.org',
        headers: { 'X-Custom-Header': 'test-value' }
      }));
      
      const result = await customClient.get('headers');
      
      expect(result.headers['X-Custom-Header']).toBe('test-value');
    });

    it('should POST JSON data', async () => {
      const data = { name: 'John', age: 30 };
      const result = await client.post('post', data);
      
      expect(result.json).toEqual(data);
      expect(result.headers['Content-Type']).toContain('application/json');
    });

    it('should handle status codes', async () => {
      const result = await client.get('status/200');
      expect(result).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    const client = new ApiClient(createHttpClient({ 
      baseUrl: 'https://httpbin.org',
      retries: 0
    }));

    it('should handle 404 errors', async () => {
      await expect(client.get('status/404')).rejects.toThrow();
    });

    it('should handle 500 errors', async () => {
      await expect(client.get('status/500')).rejects.toThrow();
    });
  });

  describe('Timeout Handling', () => {
    it('should timeout on slow requests', async () => {
      const client = new ApiClient(createHttpClient({ 
        baseUrl: 'https://httpbin.org',
        timeout: 1000,
        retries: 0
      }));

      await expect(client.get('delay/5')).rejects.toThrow();
    }, 10000);
  });
});
