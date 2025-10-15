import { Prisma, PrismaClient } from "./generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { fieldEncryptionExtension } from 'prisma-field-encryption';

// Create a mock client for build time when DATABASE_URL is not available
function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    console.warn('[Prisma] DATABASE_URL not found, using mock client for build time');
    // Return a proxy that throws helpful errors if used at build time
    return new Proxy({} as any, {
      get: () => {
        throw new Error('Prisma client cannot be used at build time. Ensure DATABASE_URL is available at runtime.');
      }
    });
  }

  const basePrisma = new PrismaClient().$extends(withAccelerate());

  // Only add field encryption if the key is available
  return process.env.PRISMA_FIELD_ENCRYPTION_KEY
    ? basePrisma.$extends(
      fieldEncryptionExtension(
        { dmmf: Prisma.dmmf }
      )
    )
    : basePrisma;
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
