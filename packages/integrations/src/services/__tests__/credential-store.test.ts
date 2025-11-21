import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Prisma before importing CredentialStore
vi.mock('@duramation/db', () => ({
  prisma: {
    workflow: {
      findUnique: vi.fn()
    },
    credential: {
      findFirst: vi.fn(),
      update: vi.fn()
    }
  }
}));

import { CredentialStore } from '../credential-store.js';
import { prisma } from '@duramation/db';

describe('CredentialStore', () => {
  let store: CredentialStore;

  beforeEach(() => {
    store = new CredentialStore();
    vi.clearAllMocks();
  });

  describe('getWorkflowCredentials', () => {
    it('should return workflow credentials', async () => {
      const mockData = {
        workflowCredentials: [
          {
            credential: {
              id: 'cred-1',
              name: 'Google Account',
              type: 'OAUTH',
              provider: 'GOOGLE',
              userId: 'user-1',
              secret: JSON.stringify({ accessToken: 'token123' }),
              config: { scopes: ['sheets'] },
              expiresIn: new Date('2025-12-31'),
              createdAt: new Date('2025-01-01'),
              updatedAt: new Date('2025-01-01')
            }
          }
        ]
      };

      vi.mocked(prisma.workflow.findUnique).mockResolvedValue(mockData as any);

      const result = await store.getWorkflowCredentials('workflow-1', 'user-1');

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 'cred-1',
        name: 'Google Account',
        type: 'OAUTH',
        provider: 'GOOGLE',
        secret: { accessToken: 'token123' }
      });
      expect(prisma.workflow.findUnique).toHaveBeenCalledWith({
        where: { id: 'workflow-1', userId: 'user-1' },
        include: {
          workflowCredentials: {
            include: { credential: true }
          }
        }
      });
    });

    it('should return empty array when workflow not found', async () => {
      vi.mocked(prisma.workflow.findUnique).mockResolvedValue(null);

      const result = await store.getWorkflowCredentials('workflow-1', 'user-1');

      expect(result).toEqual([]);
    });

    it('should handle null workflowCredentials', async () => {
      vi.mocked(prisma.workflow.findUnique).mockResolvedValue({ workflowCredentials: null } as any);

      const result = await store.getWorkflowCredentials('workflow-1', 'user-1');

      expect(result).toEqual([]);
    });
  });

  describe('getCredential', () => {
    it('should return credential by id', async () => {
      const mockCredential = {
        id: 'cred-1',
        name: 'Slack Workspace',
        type: 'OAUTH',
        provider: 'SLACK',
        userId: 'user-1',
        secret: JSON.stringify({ accessToken: 'xoxb-token' }),
        config: { workspace: 'my-team' },
        expiresIn: null,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01')
      };

      vi.mocked(prisma.credential.findFirst).mockResolvedValue(mockCredential as any);

      const result = await store.getCredential('cred-1', 'user-1');

      expect(result).toMatchObject({
        id: 'cred-1',
        name: 'Slack Workspace',
        secret: { accessToken: 'xoxb-token' }
      });
      expect(prisma.credential.findFirst).toHaveBeenCalledWith({
        where: { id: 'cred-1', userId: 'user-1' }
      });
    });

    it('should return null when credential not found', async () => {
      vi.mocked(prisma.credential.findFirst).mockResolvedValue(null);

      const result = await store.getCredential('cred-1', 'user-1');

      expect(result).toBeNull();
    });

    it('should handle null secret', async () => {
      const mockCredential = {
        id: 'cred-1',
        name: 'Test',
        type: 'API_KEY',
        provider: 'CUSTOM',
        userId: 'user-1',
        secret: null,
        config: {},
        expiresIn: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      vi.mocked(prisma.credential.findFirst).mockResolvedValue(mockCredential as any);

      const result = await store.getCredential('cred-1', 'user-1');

      expect(result?.secret).toBeNull();
    });
  });

  describe('updateCredentialSecret', () => {
    it('should update credential secret', async () => {
      const newSecret = { accessToken: 'new-token', refreshToken: 'refresh' };
      const expiresIn = new Date('2025-12-31');

      vi.mocked(prisma.credential.update).mockResolvedValue({} as any);

      await store.updateCredentialSecret('cred-1', 'user-1', newSecret, expiresIn);

      expect(prisma.credential.update).toHaveBeenCalledWith({
        where: { id: 'cred-1', userId: 'user-1' },
        data: {
          secret: JSON.stringify(newSecret),
          expiresIn
        }
      });
    });

    it('should update without expiresIn', async () => {
      const newSecret = { apiKey: 'key123' };

      vi.mocked(prisma.credential.update).mockResolvedValue({} as any);

      await store.updateCredentialSecret('cred-1', 'user-1', newSecret);

      expect(prisma.credential.update).toHaveBeenCalledWith({
        where: { id: 'cred-1', userId: 'user-1' },
        data: {
          secret: JSON.stringify(newSecret)
        }
      });
    });
  });
});
