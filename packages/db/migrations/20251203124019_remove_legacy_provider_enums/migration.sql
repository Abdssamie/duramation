/*
  Warnings:

  - The values [GOOGLE,SLACK,MICROSOFT,HUBSPOT,FIRECRAWL,INSTAGRAM,CUSTOM] on the enum `Provider` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Provider_new" AS ENUM ('google-mail', 'google-calendar', 'google-sheets', 'slack', 'microsoft-mail', 'microsoft-calendar', 'hubspot', 'firecrawl', 'instagram', 'custom-api');
ALTER TABLE "public"."workflow_templates" ALTER COLUMN "requiredProviders" DROP DEFAULT;
ALTER TABLE "public"."workflows" ALTER COLUMN "requiredProviders" DROP DEFAULT;
ALTER TABLE "credentials" ALTER COLUMN "provider" TYPE "Provider_new" USING ("provider"::text::"Provider_new");
ALTER TABLE "workflows" ALTER COLUMN "requiredProviders" TYPE "Provider_new"[] USING ("requiredProviders"::text::"Provider_new"[]);
ALTER TABLE "workflow_templates" ALTER COLUMN "requiredProviders" TYPE "Provider_new"[] USING ("requiredProviders"::text::"Provider_new"[]);
ALTER TYPE "Provider" RENAME TO "Provider_old";
ALTER TYPE "Provider_new" RENAME TO "Provider";
DROP TYPE "public"."Provider_old";
ALTER TABLE "workflow_templates" ALTER COLUMN "requiredProviders" SET DEFAULT ARRAY[]::"Provider"[];
ALTER TABLE "workflows" ALTER COLUMN "requiredProviders" SET DEFAULT ARRAY[]::"Provider"[];
COMMIT;
