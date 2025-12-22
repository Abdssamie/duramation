/*
  Warnings:

  - You are about to drop the column `canBeScheduled` on the `workflow_templates` table. All the data in the column will be lost.
  - You are about to drop the column `cronExpressions` on the `workflows` table. All the data in the column will be lost.
  - Added the required column `isCronType` to the `workflow_templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workflow_templates" DROP COLUMN "canBeScheduled",
ADD COLUMN     "isCronType" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "workflows" DROP COLUMN "cronExpressions",
ADD COLUMN     "cronExpression" TEXT;
