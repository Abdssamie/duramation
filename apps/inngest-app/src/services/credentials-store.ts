import prisma from "@/lib/prisma";
import { InternalUserId } from "@/types/user";
import {
  CredentialSecret,
  CredentialWithSecret,
  SafeCredential,
  CredentialCreateRequest,
  BaseOAuthSecret
} from "@/lib/credentials/schema";
import type { Prisma, Provider, CredentialType } from "@duramation/db/types";

// Legacy type aliases for backward compatibility
export type SafeCredentialResponse = SafeCredential;

// Helper to safely extract nangoConnectionId
function getNangoConnectionId(type: CredentialType, secret: CredentialSecret | object): string | null {
  if (type === 'OAUTH' && secret && typeof secret === 'object' && 'nangoConnectionId' in secret) {
    return (secret as BaseOAuthSecret).nangoConnectionId || null;
  }
  return null;
}

// Internal helper for credential upsert logic
async function upsertCredentialInternal(
  userId: InternalUserId,
  credentialData: CredentialCreateRequest,
  nangoConnectionId: string | null
) {
  return prisma.credential.upsert({
    where: {
      userId_name: {
        userId: userId as string,
        name: credentialData.name,
      },
    },
    update: {
      secret: JSON.stringify(credentialData.secret),
      nangoConnectionId: nangoConnectionId,
      config: credentialData.config as unknown as Prisma.InputJsonValue,
    },
    create: {
      name: credentialData.name,
      type: credentialData.type,
      provider: credentialData.provider,
      secret: JSON.stringify(credentialData.secret),
      nangoConnectionId: nangoConnectionId,
      userId: userId as string,
      config: credentialData.config as unknown as Prisma.InputJsonValue,
    },
  });
}

interface CredentialStore {
  /**
   * Store a new credential
   */
  store(credential: {
    userId: InternalUserId;
    provider: Provider;
    type: CredentialType;
    data: CredentialSecret;
  }): Promise<SafeCredentialResponse>;

  /**
   * Retrieve a credential by ID
   */
  retrieve(credentialId: string, userId: InternalUserId): Promise<CredentialWithSecret | null>;

  /**
   * Update credential data (for token refresh)
   */
  update(
    credentialId: string,
    userId: InternalUserId,
    data: CredentialSecret,
  ): Promise<void>;

  /**
   * Upsert a credential
   */
  upsert(credential: {
    userId: InternalUserId;
    provider: Provider;
    type: CredentialType;
    data: CredentialSecret;
  }): Promise<SafeCredentialResponse>;

  /**
   * List credentials for a user and provider
   */
  listByUserAndProvider(
    userId: string,
    provider: Provider,
  ): Promise<SafeCredentialResponse[]>;

  /**
   * Delete a credential
   */
  delete(credentialId: string, userId: InternalUserId): Promise<void>;
}

export async function storeCredential(
  userId: InternalUserId,
  credentialData: CredentialCreateRequest,
): Promise<SafeCredentialResponse> {
  try {
    const nangoConnectionId = getNangoConnectionId(credentialData.type, credentialData.secret);

    // Create a sanitized secret that does not contain nangoConnectionId, as it's stored separately
    const sanitizedSecret: CredentialSecret = { ...credentialData.secret };
    if (sanitizedSecret && typeof sanitizedSecret === 'object' && 'nangoConnectionId' in sanitizedSecret) {
      delete (sanitizedSecret as Partial<BaseOAuthSecret>).nangoConnectionId;
    }

    const credential = await upsertCredentialInternal(userId, { ...credentialData, secret: sanitizedSecret }, nangoConnectionId);
    if (credentialData.config?.autoAssociate && credentialData.config?.workflowId) {
      try {
        await prisma.workflowCredential.upsert({
          where: {
            workflowId_credentialId: {
              workflowId: credentialData.config.workflowId,
              credentialId: credential.id,
            },
          },
          update: {},
          create: {
            workflowId: credentialData.config.workflowId,
            credentialId: credential.id,
          },
        });
        console.log(`Auto-associated credential ${credential.id} with workflow ${credentialData.config.workflowId}`);
      } catch (linkError) {
        console.error('Failed to auto-associate credential with workflow:', linkError);
        // Don't fail the whole operation if linking fails
      }
    }

    return {
      userId: userId,
      id: credential.id,
      name: credential.name,
      type: credential.type,
      provider: credential.provider,
      createdAt: credential.createdAt.toISOString(),
      updatedAt: credential.updatedAt.toISOString(),
      config: credential.config as unknown as Record<string, never>,
    };
  } catch (error) {
    console.error("Detailed error storing credentials:", error);
    throw new Error(`Error storing credentials: ${error}`);
  }
}

/**
 * Store a credential and associate it with a workflow
 */
export async function storeCredentialForWorkflow(
  userId: InternalUserId,
  workflowId: string,
  credentialData: CredentialCreateRequest,
): Promise<SafeCredentialResponse> {
  try {
    // First verify the workflow exists and belongs to the user
    const workflow = await prisma.workflow.findUnique({
      where: {
        id: workflowId,
        userId: userId as string,
      },
    });

    if (!workflow) {
      throw new Error("Workflow not found or access denied");
    }

    const nangoConnectionId = getNangoConnectionId(credentialData.type, credentialData.secret);

    // Create a sanitized secret that does not contain nangoConnectionId, as it's stored separately
    const sanitizedSecret: CredentialSecret = { ...credentialData.secret };
    if (sanitizedSecret && typeof sanitizedSecret === 'object' && 'nangoConnectionId' in sanitizedSecret) {
      delete (sanitizedSecret as Partial<BaseOAuthSecret>).nangoConnectionId;
    }

    const credential = await upsertCredentialInternal(userId, { ...credentialData, secret: sanitizedSecret }, nangoConnectionId);

    // Create the workflow-credential association
    await prisma.workflowCredential.upsert({
      where: {
        workflowId_credentialId: {
          workflowId: workflowId,
          credentialId: credential.id,
        },
      },
      update: {}, // No updates needed, just ensure the relationship exists
      create: {
        workflowId: workflowId,
        credentialId: credential.id,
      },
    });

    return {
      userId: userId,
      id: credential.id,
      name: credential.name,
      type: credential.type,
      provider: credential.provider,
      createdAt: credential.createdAt.toISOString(),
      updatedAt: credential.updatedAt.toISOString(),
      config: credential.config as unknown as Record<string, never>,
    };
  } catch (error) {
    console.error("Detailed error storing credential for workflow:", error);
    throw new Error(`Error storing credential for workflow: ${error}`);
  }
}

export async function updateCredential(
  userId: InternalUserId,
  credentialId: string,
  credentialSecret: CredentialSecret,
): Promise<SafeCredentialResponse> {
  try {
    // We assume if it's being updated as a CredentialSecret, we might find the ID there
    // Note: type is not passed here, but we can infer or check existence
    let nangoConnectionId = null;
    if ('nangoConnectionId' in credentialSecret) {
         nangoConnectionId = (credentialSecret as BaseOAuthSecret).nangoConnectionId || null;
    }

    const updatedCredential = await prisma.credential.update({
      where: {
        id: credentialId,
        userId: userId,
      },
      data: {
        secret: JSON.stringify(credentialSecret),
        ...(nangoConnectionId && { nangoConnectionId }),
      },
    });
    return {
      id: updatedCredential.id,
      name: updatedCredential.name,
      userId: userId,
      type: updatedCredential.type,
      provider: updatedCredential.provider,
      createdAt: updatedCredential.createdAt.toISOString(),
      updatedAt: updatedCredential.updatedAt.toISOString(),
      config: updatedCredential.config as unknown as Record<string, never>,
    };
  } catch (error) {
    console.error("Detailed error updating credentials:", error);
    throw new Error(`Error updating credentials: ${error}`);
  }
}

export async function deleteCredential(
  userId: InternalUserId,
  credentialId: string,
) {
  try {
    await prisma.credential.delete({
      where: {
        userId: userId,
        id: credentialId,
      },
    });
  } catch (error) {
    console.error("Detailed error deleting credentials:", error);
    throw new Error(`Error deleting credentials: ${error}`);
  }
}

export async function getAllUserCredentials(
  userId: InternalUserId,
): Promise<SafeCredentialResponse[]> {
  try {
    const credentials = await prisma.credential.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        type: true,
        userId: true,
        provider: true,
        createdAt: true,
        updatedAt: true,
        config: true,
      },
    });

    return credentials.map((cred) => ({
      ...cred,
      createdAt: cred.createdAt.toISOString(),
      updatedAt: cred.updatedAt.toISOString(),
      config: cred.config as Record<string, never> | undefined,
    }));
  } catch (error) {
    console.error("Detailed error getting credentials:", error);
    throw new Error(`Error getting credentials: ${error}`);
  }
}

export async function getCredential(
  userId: InternalUserId,
  credentialId: string,
): Promise<SafeCredentialResponse | null> {
  try {
    const credential = await prisma.credential.findUnique({
      where: {
        id: credentialId,
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        name: true,
        type: true,
        provider: true,
        createdAt: true,
        updatedAt: true,
        config: true,
      },
    });
    if (!credential) {
      return null;
    }
    return {
      ...credential,
      createdAt: credential.createdAt.toISOString(),
      updatedAt: credential.updatedAt.toISOString(),
      config: credential.config as Record<string, never> | undefined,
    };
  } catch (error) {
    console.error("Detailed error getting credentials:", error);
    throw new Error(`Error getting credentials: ${error}`);
  }
}

// New CredentialStore implementation for integrations package
export const credentialStore: CredentialStore = {
  async store(credential: {
    userId: string;
    provider: Provider;
    type: CredentialType;
    data: CredentialSecret;
  }): Promise<SafeCredentialResponse> {
    try {
      const nangoConnectionId = getNangoConnectionId(credential.type, credential.data);

      // Create a sanitized secret that does not contain nangoConnectionId, as it's stored separately
      const sanitizedSecret: CredentialSecret = { ...credential.data };
      if (sanitizedSecret && typeof sanitizedSecret === 'object' && 'nangoConnectionId' in sanitizedSecret) {
        delete (sanitizedSecret as Partial<BaseOAuthSecret>).nangoConnectionId;
      }

      const created = await prisma.credential.create({
        data: {
          name: `${credential.provider} Integration`,
          type: credential.type,
          provider: credential.provider,
          secret: JSON.stringify(sanitizedSecret),
          nangoConnectionId: nangoConnectionId,
          userId: credential.userId,
          config: {},
        },
      });

      return {
        id: created.id,
        name: created.name,
        type: created.type,
        provider: created.provider,
        userId: created.userId,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error storing credential:", error);
      throw new Error(`Error storing credential: ${error}`);
    }
  },

  async retrieve(credentialId: string, userId: InternalUserId): Promise<CredentialWithSecret | null> {
    try {
      const credential = await prisma.credential.findUnique({
        where: { id: credentialId, userId: userId, },
      });

      if (!credential) {
        return null;
      }

      return {
        id: credential.id,
        name: credential.name,
        type: credential.type,
        provider: credential.provider,
        userId: credential.userId,
        createdAt: credential.createdAt.toISOString(),
        updatedAt: credential.updatedAt.toISOString(),
        secret: credential.secret ? JSON.parse(credential.secret as string) : null,
      };
    } catch (error) {
      console.error("Error retrieving credential:", error);
      throw new Error(`Error retrieving credential: ${error}`);
    }
  },

  async update(
    credentialId: string,
    data: CredentialSecret,
  ): Promise<void> {
    try {
      let nangoConnectionId = null;
      if ('nangoConnectionId' in data) {
           nangoConnectionId = (data as BaseOAuthSecret).nangoConnectionId || null;
      }
      
      await prisma.credential.update({
        where: { id: credentialId },
        data: {
          secret: JSON.stringify(data),
          ...(nangoConnectionId && { nangoConnectionId }),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error("Error updating credential:", error);
      throw new Error(`Error updating credential: ${error}`);
    }
  },

  async listByUserAndProvider(
    userId: string,
    provider: Provider,
  ): Promise<SafeCredentialResponse[]> {
    try {
      const credentials = await prisma.credential.findMany({
        where: {
          userId,
          provider,
        },
        select: {
          id: true,
          name: true,
          type: true,
          provider: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return credentials.map((cred) => ({
        ...cred,
        createdAt: cred.createdAt.toISOString(),
        updatedAt: cred.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error("Error listing credentials:", error);
      throw new Error(`Error listing credentials: ${error}`);
    }
  },

  async delete(credentialId: string, userId: InternalUserId): Promise<void> {
    try {
      await prisma.credential.delete({
        where: { id: credentialId, userId: userId },
      });
    } catch (error) {
      console.error("Error deleting credential:", error);
      throw new Error(`Error deleting credential: ${error}`);
    }
  },

  async upsert(credential: {
    userId: string;
    provider: Provider;
    type: CredentialType;
    data: CredentialSecret;
  }): Promise<SafeCredentialResponse> {
    return storeCredential(credential.userId as InternalUserId, {
      name: `${credential.provider} Integration`,
      provider: credential.provider,
      type: credential.type,
      secret: credential.data,
      config: {},
    });
  },
};