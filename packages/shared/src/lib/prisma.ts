import { type ExtendedPrismaClient }  from '@duramation/db';

// This file now only exports the PrismaClient type for shared package usage.
// The actual Prisma client instance will be injected via dependency injection.
export type { ExtendedPrismaClient };
