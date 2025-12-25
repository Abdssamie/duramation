import { Prisma, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { fieldEncryptionExtension } from 'prisma-field-encryption';

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('[Prisma] DATABASE_URL environment variable is required');
  }

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
    console.log("Accelerate extension applied to prisma client");
    basePrisma = basePrisma.$extends(withAccelerate());
  } else {
    console.log("Accelerate extension not applied to prisma client");
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
