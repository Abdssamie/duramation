/*
  Warnings:

  - The `requiredScopes` column on the `workflows` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."credentials" ALTER COLUMN "secret" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."workflows" DROP COLUMN "requiredScopes",
ADD COLUMN     "requiredScopes" JSONB;
