import prisma from "@/lib/prisma";
import { InternalUserId } from "@/types/user";
import {
  CredentialSecret,
  CredentialWithSecret,
  OAuthCredential,
  ApiKeyCredential,
  SafeCredential,
  CredentialCreateRequest,
} from "@/lib/credentials/schema";
import type { Prisma, Provider, CredentialType } from "@duramation/db/types";

// Legacy type aliases for backward compatibility
export type SafeCredentialResponse = SafeCredential;


interface CredentialStore {
  /**
   * Store a new credential
   */
  store(credential: {
    userId: InternalUserId;
    provider: Provider;
    type: CredentialType;
    data: OAuthCredential | ApiKeyCredential;
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

// Legacy functions for backward compatibility
export async function storeCredential(
  userId: InternalUserId,
  credentialData: CredentialCreateRequest,
): Promise<SafeCredentialResponse> {
  try {
    const credential = await prisma.credential.upsert({
      where: {
        userId_name: {
          userId: userId as string,
          name: credentialData.name,
        },
      },
      update: {
        secret: credentialData.secret,
        config: credentialData.config as unknown as Prisma.InputJsonValue,
      },
      create: {
        name: credentialData.name,
        type: credentialData.type,
        provider: credentialData.provider,
        secret: credentialData.secret,
        userId: userId as string,
        config: credentialData.config as unknown as Prisma.InputJsonValue,
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
      config: credential.config as unknown as Record<string, any>,
    };
  } catch (error: any) {
    console.error("Detailed error storing credentials:", error);
    throw new Error(`Error storing credentials: ${error.message || error}`);
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

    // Create the credential
    const credential = await prisma.credential.upsert({
      where: {
        userId_name: {
          userId: userId as string,
          name: credentialData.name,
        },
      },
      update: {
        secret: credentialData.secret,
        config: credentialData.config as unknown as Prisma.InputJsonValue,
      },
      create: {
        name: credentialData.name,
        type: credentialData.type,
        provider: credentialData.provider,
        secret: credentialData.secret,
        userId: userId as string,
        config: credentialData.config as unknown as Prisma.InputJsonValue,
      },
    });

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
      config: credential.config as unknown as Record<string, any>,
    };
  } catch (error: any) {
    console.error("Detailed error storing credential for workflow:", error);
    throw new Error(`Error storing credential for workflow: ${error.message || error}`);
  }
}

/**
 * Associate an existing credential with a workflow
 */
export async function associateCredentialWithWorkflow(
  userId: InternalUserId,
  credentialId: string,
  workflowId: string,
): Promise<void> {
  try {
    // Verify the credential belongs to the user
    const credential = await prisma.credential.findUnique({
      where: {
        id: credentialId,
        userId: userId as string,
      },
    });

    if (!credential) {
      throw new Error("Credential not found or access denied");
    }

    // Verify the workflow belongs to the user
    const workflow = await prisma.workflow.findUnique({
      where: {
        id: workflowId,
        userId: userId as string,
      },
    });

    if (!workflow) {
      throw new Error("Workflow not found or access denied");
    }

    // Create the association
    await prisma.workflowCredential.upsert({
      where: {
        workflowId_credentialId: {
          workflowId: workflowId,
          credentialId: credentialId,
        },
      },
      update: {}, // No updates needed, just ensure the relationship exists
      create: {
        workflowId: workflowId,
        credentialId: credentialId,
      },
    });
  } catch (error: any) {
    console.error("Detailed error associating credential with workflow:", error);
    throw new Error(`Error associating credential with workflow: ${error.message || error}`);
  }
}

export async function updateCredential(
  userId: InternalUserId,
  credentialId: string,
  credentialSecret: CredentialSecret,
): Promise<SafeCredentialResponse> {
  try {
    const updatedCredential = await prisma.credential.update({
      where: {
        id: credentialId,
        userId: userId,
      },
      data: {
        secret: credentialSecret,
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
      config: updatedCredential.config as unknown as Record<string, any>,
    };
  } catch (error: any) {
    console.error("Detailed error updating credentials:", error);
    throw new Error(`Error updating credentials: ${error.message || error}`);
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
  } catch (error: any) {
    console.error("Detailed error deleting credentials:", error);
    throw new Error(`Error deleting credentials: ${error.message || error}`);
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
      config: cred.config as Record<string, any> | undefined,
    }));
  } catch (error: any) {
    console.error("Detailed error getting credentials:", error);
    throw new Error(`Error getting credentials: ${error.message || error}`);
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
      config: credential.config as Record<string, any> | undefined,
    };
  } catch (error: any) {
    console.error("Detailed error getting credentials:", error);
    throw new Error(`Error getting credentials: ${error.message || error}`);
  }
}

// New CredentialStore implementation for integrations package
export const credentialStore: CredentialStore = {
  async store(credential: {
    userId: string;
    provider: Provider;
    type: CredentialType;
    data: OAuthCredential | ApiKeyCredential;
  }): Promise<SafeCredentialResponse> {
    try {
      const created = await prisma.credential.create({
        data: {
          name: `${credential.provider} Integration`,
          type: credential.type,
          provider: credential.provider,
          secret: credential.data,
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
    } catch (error: any) {
      console.error("Error storing credential:", error);
      throw new Error(`Error storing credential: ${error.message || error}`);
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
        secret: credential.secret,
      };
    } catch (error: any) {
      console.error("Error retrieving credential:", error);
      throw new Error(`Error retrieving credential: ${error.message || error}`);
    }
  },

  async update(
    credentialId: string,
    data: CredentialSecret,
  ): Promise<void> {
    try {
      await prisma.credential.update({
        where: { id: credentialId },
        data: {
          secret: data,
          updatedAt: new Date(),
        },
      });
    } catch (error: any) {
      console.error("Error updating credential:", error);
      throw new Error(`Error updating credential: ${error.message || error}`);
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
    } catch (error: any) {
      console.error("Error listing credentials:", error);
      throw new Error(`Error listing credentials: ${error.message || error}`);
    }
  },

  async delete(credentialId: string, userId: InternalUserId): Promise<void> {
    try {
      await prisma.credential.delete({
        where: { id: credentialId, userId: userId },
      });
    } catch (error: any) {
      console.error("Error deleting credential:", error);
      throw new Error(`Error deleting credential: ${error.message || error}`);
    }
  },
};
