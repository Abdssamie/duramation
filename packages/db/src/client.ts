import { Prisma, PrismaClient } from "./generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { fieldEncryptionExtension } from 'prisma-field-encryption';

// Create a mock client for build time when DATABASE_URL is not available
function createPrismaClient() {
  // Get encryption key from environment
  const encryptionKey = process.env.PRISMA_FIELD_ENCRYPTION_KEY;

  if (!encryptionKey) {
    throw new Error('[Prisma] PRISMA_FIELD_ENCRYPTION_KEY environment variable is required for field encryption');
  }

  let basePrisma = new PrismaClient().$extends(
    fieldEncryptionExtension({
      encryptionKey: encryptionKey,
      dmmf: Prisma.dmmf,
    })
  );

  // Only apply Accelerate extension in production
  if (process.env.NODE_ENV === "production") {
    basePrisma = basePrisma.$extends(withAccelerate());
  }

  return basePrisma;
}

const extendedPrisma = createPrismaClient();

export type ExtendedPrismaClient = typeof extendedPrisma;

// Use globalThis for broader environment compatibility
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: ExtendedPrismaClient;
};

// Named export with global memoization
export const prisma: ExtendedPrismaClient =
  globalForPrisma.prisma ?? extendedPrisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
