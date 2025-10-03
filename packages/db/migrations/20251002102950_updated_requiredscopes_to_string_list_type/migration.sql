/*
  Warnings:

  - The `requiredScopes` column on the `workflows` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "public"."Provider" ADD VALUE 'INSTAGRAM';

-- AlterTable
ALTER TABLE "public"."workflows" DROP COLUMN "requiredScopes",
ADD COLUMN     "requiredScopes" TEXT[];
