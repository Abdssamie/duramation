import { prisma } from '@duramation/db';
import { WorkflowCredential as DbWorkflowCredential, Credential } from '@duramation/db/types';

// Types for credential management
export interface CredentialSecret {
  [key: string]: any;
}

type DbWorkflowCredentialExtended = DbWorkflowCredential & {
  credential: Credential
};  


export interface OAuthCredential {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  scopes?: string[];
  [key: string]: any;
}

export interface ApiKeyCredential {
  apiKey: string;
  [key: string]: any;
}

export interface WorkflowCredential {
  id: string;
  name: string;
  type: string;
  provider: string;
  userId: string;
  secret: any;
  config: any;
  expiresIn: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Simple in-memory cache
const cache = new Map<string, { data: WorkflowCredential[]; expires: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Credential store using Prisma
export class CredentialStore {
  async getWorkflowCredentials(workflowId: string, userId: string): Promise<WorkflowCredential[]> {
    const cacheKey = `${workflowId}:${userId}`;
    const cached = cache.get(cacheKey);
    
    if (cached && cached.expires > Date.now()) {
      return cached.data;
    }

    const workflow: { workflowCredentials: DbWorkflowCredentialExtended[] | null } | null  = await prisma.workflow.findUnique({
      where: { id: workflowId, userId: userId },
      include: {
        workflowCredentials: {
          include: {
            credential: true
          }
        }
      }
    });

    const credentials = workflow?.workflowCredentials?.map((wc) => ({
      id: wc?.credential?.id,
      name: wc?.credential?.name,
      type: wc?.credential?.type,
      provider: wc?.credential?.provider,
      userId: wc?.credential?.userId,
      secret: wc?.credential?.secret ? JSON.parse(wc?.credential?.secret as string) : null,
      config: wc?.credential?.config,
      expiresIn: wc?.credential?.expiresIn,
      createdAt: wc?.credential?.createdAt,
      updatedAt: wc?.credential?.updatedAt
    })) || [];

    cache.set(cacheKey, { data: credentials, expires: Date.now() + CACHE_TTL });
    return credentials;
  }

  async getCredential(credentialId: string, userId: string): Promise<WorkflowCredential | null> {
    const credential = await prisma.credential.findFirst({
      where: {
        id: credentialId,
        userId: userId
      }
    });

    if (!credential) return null;

    return {
      id: credential.id,
      name: credential.name,
      type: credential.type,
      provider: credential.provider,
      userId: credential.userId,
      secret: credential.secret ? JSON.parse(credential.secret as string) : null,
      config: credential.config,
      expiresIn: credential.expiresIn,
      createdAt: credential.createdAt,
      updatedAt: credential.updatedAt
    };
  }

  async updateCredentialSecret(
    credentialId: string,
    userId: string,
    secret: CredentialSecret,
    expiresIn?: Date
  ): Promise<void> {
    await prisma.credential.update({
      where: {
        id: credentialId,
        userId: userId
      },
      data: {
        secret: JSON.stringify(secret),
        ...(expiresIn && { expiresIn })
      }
    });
    
    // Invalidate cache
    cache.clear();
  }
}

// Export singleton instance
export const credentialStore = new CredentialStore();
