import { Provider, CredentialType } from '../types/providers';

// Types for credential management
export interface CredentialSecret {
  [key: string]: any;
}

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

export interface SafeCredential {
  id: string;
  name: string;
  type: CredentialType;
  provider: Provider;
  userId: string;
  createdAt: string;
  updatedAt: string;
  config?: Record<string, any>;
}

export interface CredentialWithSecret extends SafeCredential {
  secret: CredentialSecret;
}

export interface CredentialCreateRequest {
  name: string;
  type: CredentialType;
  provider: Provider;
  secret: CredentialSecret;
  config?: Record<string, any>;
}

export interface CredentialUpdateRequest {
  secret: CredentialSecret;
}

// Interface for credential store
export interface CredentialStore {
  store(credential: {
    userId: string;
    provider: Provider;
    type: CredentialType;
    data: OAuthCredential | ApiKeyCredential;
  }): Promise<SafeCredential>;

  retrieve(credentialId: string, userId: string): Promise<CredentialWithSecret | null>;

  update(
    credentialId: string,
    userId: string,
    data: CredentialSecret,
  ): Promise<SafeCredential>;

  listByUserAndProvider(
    userId: string,
    provider: Provider,
  ): Promise<SafeCredential[]>;

  delete(credentialId: string, userId: string): Promise<void>;
}

// Mock implementation - in a real app, this would connect to a database
export class InMemoryCredentialStore implements CredentialStore {
  private credentials: Map<string, CredentialWithSecret> = new Map();
  private workflowCredentials: Map<string, Set<string>> = new Map(); // workflowId -> credentialIds

  async store(credential: {
    userId: string;
    provider: Provider;
    type: CredentialType;
    data: OAuthCredential | ApiKeyCredential;
  }): Promise<SafeCredential> {
    const id = `cred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    
    const credentialWithSecret: CredentialWithSecret = {
      id,
      name: `${credential.provider} Integration`,
      type: credential.type,
      provider: credential.provider,
      userId: credential.userId,
      createdAt: now,
      updatedAt: now,
      secret: credential.data,
    };
    
    this.credentials.set(id, credentialWithSecret);
    
    return {
      id,
      name: credentialWithSecret.name,
      type: credentialWithSecret.type,
      provider: credentialWithSecret.provider,
      userId: credentialWithSecret.userId,
      createdAt: credentialWithSecret.createdAt,
      updatedAt: credentialWithSecret.updatedAt,
    };
  }

  async retrieve(credentialId: string, userId: string): Promise<CredentialWithSecret | null> {
    const credential = this.credentials.get(credentialId);
    if (!credential || credential.userId !== userId) {
      return null;
    }
    return credential;
  }

  async update(
    credentialId: string,
    userId: string,
    data: CredentialSecret,
  ): Promise<SafeCredential> {
    const credential = await this.retrieve(credentialId, userId);
    if (!credential) {
      throw new Error('Credential not found');
    }
    
    const updatedCredential: CredentialWithSecret = {
      ...credential,
      secret: data,
      updatedAt: new Date().toISOString(),
    };
    
    this.credentials.set(credentialId, updatedCredential);
    
    return {
      id: updatedCredential.id,
      name: updatedCredential.name,
      type: updatedCredential.type,
      provider: updatedCredential.provider,
      userId: updatedCredential.userId,
      createdAt: updatedCredential.createdAt,
      updatedAt: updatedCredential.updatedAt,
    };
  }

  async listByUserAndProvider(
    userId: string,
    provider: Provider,
  ): Promise<SafeCredential[]> {
    const result: SafeCredential[] = [];
    
    for (const credential of this.credentials.values()) {
      if (credential.userId === userId && credential.provider === provider) {
        result.push({
          id: credential.id,
          name: credential.name,
          type: credential.type,
          provider: credential.provider,
          userId: credential.userId,
          createdAt: credential.createdAt,
          updatedAt: credential.updatedAt,
        });
      }
    }
    
    return result;
  }

  async delete(credentialId: string, userId: string): Promise<void> {
    const credential = await this.retrieve(credentialId, userId);
    if (!credential) {
      throw new Error('Credential not found');
    }
    
    this.credentials.delete(credentialId);
  }

  // Workflow credential association methods
  async associateCredentialWithWorkflow(
    credentialId: string,
    workflowId: string,
  ): Promise<void> {
    if (!this.workflowCredentials.has(workflowId)) {
      this.workflowCredentials.set(workflowId, new Set());
    }
    
    this.workflowCredentials.get(workflowId)!.add(credentialId);
  }

  async getWorkflowCredentials(workflowId: string): Promise<SafeCredential[]> {
    const credentialIds = this.workflowCredentials.get(workflowId) || new Set();
    const credentials: SafeCredential[] = [];
    
    for (const id of credentialIds) {
      const credential = this.credentials.get(id);
      if (credential) {
        credentials.push({
          id: credential.id,
          name: credential.name,
          type: credential.type,
          provider: credential.provider,
          userId: credential.userId,
          createdAt: credential.createdAt,
          updatedAt: credential.updatedAt,
        });
      }
    }
    
    return credentials;
  }
}

// Export singleton instance
export const credentialStore = new InMemoryCredentialStore();