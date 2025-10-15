import { Prisma, PrismaClient } from "./generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { fieldEncryptionExtension } from 'prisma-field-encryption';

// Instantiate the extended Prisma client to infer its type
const basePrisma = new PrismaClient().$extends(withAccelerate());

// Only add field encryption if the key is available
const extendedPrisma = process.env.PRISMA_FIELD_ENCRYPTION_KEY
  ? basePrisma.$extends(
    fieldEncryptionExtension(
      { dmmf: Prisma.dmmf }
    )
  )
  : basePrisma;

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
