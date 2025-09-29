-- CreateEnum
CREATE TYPE "public"."RequestPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "public"."RequestStatus" AS ENUM ('SUBMITTED', 'REVIEWED', 'MEETING_SCHEDULED', 'PROPOSAL_SENT', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."client_branding" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "logoUrl" TEXT,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_branding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."service_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "businessProcess" TEXT NOT NULL,
    "desiredOutcome" TEXT NOT NULL,
    "priority" "public"."RequestPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "public"."RequestStatus" NOT NULL DEFAULT 'SUBMITTED',
    "meetingScheduled" BOOLEAN NOT NULL DEFAULT false,
    "meetingUrl" TEXT,
    "meetingDate" TIMESTAMP(3),
    "proposalSent" BOOLEAN NOT NULL DEFAULT false,
    "proposalAccepted" BOOLEAN,
    "estimatedHours" INTEGER,
    "quotedPrice" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."automation_metrics" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "runsCount" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failureCount" INTEGER NOT NULL DEFAULT 0,
    "avgDuration" INTEGER,
    "timeSavedMinutes" INTEGER,
    "errorsPrevented" INTEGER,
    "costSavings" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "automation_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_branding_userId_key" ON "public"."client_branding"("userId");

-- CreateIndex
CREATE INDEX "service_requests_userId_idx" ON "public"."service_requests"("userId");

-- CreateIndex
CREATE INDEX "service_requests_status_idx" ON "public"."service_requests"("status");

-- CreateIndex
CREATE INDEX "automation_metrics_workflowId_idx" ON "public"."automation_metrics"("workflowId");

-- CreateIndex
CREATE INDEX "automation_metrics_date_idx" ON "public"."automation_metrics"("date");

-- CreateIndex
CREATE UNIQUE INDEX "automation_metrics_workflowId_date_key" ON "public"."automation_metrics"("workflowId", "date");

-- AddForeignKey
ALTER TABLE "public"."client_branding" ADD CONSTRAINT "client_branding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service_requests" ADD CONSTRAINT "service_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."automation_metrics" ADD CONSTRAINT "automation_metrics_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
