-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Provider" ADD VALUE 'google-mail';
ALTER TYPE "Provider" ADD VALUE 'google-calendar';
ALTER TYPE "Provider" ADD VALUE 'google-sheets';
ALTER TYPE "Provider" ADD VALUE 'slack';
ALTER TYPE "Provider" ADD VALUE 'microsoft-mail';
ALTER TYPE "Provider" ADD VALUE 'microsoft-calendar';
ALTER TYPE "Provider" ADD VALUE 'hubspot';
ALTER TYPE "Provider" ADD VALUE 'firecrawl';
ALTER TYPE "Provider" ADD VALUE 'instagram';
ALTER TYPE "Provider" ADD VALUE 'custom-api';

-- AlterTable
ALTER TABLE "credentials" ADD COLUMN     "nangoConnectionId" TEXT;
