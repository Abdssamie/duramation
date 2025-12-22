-- CreateEnum
CREATE TYPE "CredentialType" AS ENUM ('OAUTH', 'API_KEY');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'SLACK', 'MICROSOFT', 'HUBSPOT', 'FIRECRAWL', 'INSTAGRAM', 'CUSTOM');

-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('IDLE', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('STARTED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RequestPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('SUBMITTED', 'REVIEWED', 'MEETING_SCHEDULED', 'PROPOSAL_SENT', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone_number" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "language" TEXT NOT NULL DEFAULT 'en',
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credentials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CredentialType" NOT NULL,
    "provider" "Provider" NOT NULL,
    "secret" TEXT,
    "config" JSONB,
    "expiresIn" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "description" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'IDLE',
    "canBeScheduled" BOOLEAN NOT NULL DEFAULT false,
    "idempotencyKey" TEXT,
    "cronExpressions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "timezone" TEXT DEFAULT 'UTC',
    "lastRunAt" TIMESTAMP(3),
    "nextRunAt" TIMESTAMP(3),
    "fields" JSONB,
    "input" JSONB,
    "eventName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "requiredProviders" "Provider"[] DEFAULT ARRAY[]::"Provider"[],
    "requiredScopes" JSONB,
    "version" TEXT,
    "config" JSONB,

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_credentials" (
    "workflowId" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,

    CONSTRAINT "workflow_credentials_pkey" PRIMARY KEY ("workflowId","credentialId")
);

-- CreateTable
CREATE TABLE "workflow_runs" (
    "id" TEXT NOT NULL,
    "inngestRunId" TEXT NOT NULL,
    "idempotencyKey" TEXT,
    "status" "RunStatus" NOT NULL DEFAULT 'STARTED',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "input" JSONB,
    "output" JSONB,
    "error" TEXT,
    "realtimeData" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "version" TEXT,
    "workflowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workflow_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "canBeScheduled" BOOLEAN NOT NULL,
    "requiredProviders" "Provider"[] DEFAULT ARRAY[]::"Provider"[],
    "requiredScopes" JSONB,
    "fields" JSONB,
    "restrictedToUsers" TEXT[],
    "tags" TEXT[],
    "version" TEXT NOT NULL,

    CONSTRAINT "workflow_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_branding" (
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
CREATE TABLE "service_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "businessProcess" TEXT NOT NULL,
    "desiredOutcome" TEXT NOT NULL,
    "priority" "RequestPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "RequestStatus" NOT NULL DEFAULT 'SUBMITTED',
    "meetingScheduled" BOOLEAN NOT NULL DEFAULT false,
    "meetingUrl" TEXT,
    "meetingDate" TIMESTAMP(3),
    "preferredMeetingDate" TEXT,
    "availabilityNotes" TEXT,
    "proposalSent" BOOLEAN NOT NULL DEFAULT false,
    "proposalAccepted" BOOLEAN,
    "estimatedHours" INTEGER,
    "quotedPrice" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_metrics" (
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
CREATE UNIQUE INDEX "users_clerk_id_key" ON "users"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE INDEX "credentials_userId_idx" ON "credentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_name_key" ON "credentials"("userId", "name");

-- CreateIndex
CREATE INDEX "workflows_userId_idx" ON "workflows"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_runs_inngestRunId_key" ON "workflow_runs"("inngestRunId");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_runs_idempotencyKey_key" ON "workflow_runs"("idempotencyKey");

-- CreateIndex
CREATE INDEX "workflow_runs_workflowId_idx" ON "workflow_runs"("workflowId");

-- CreateIndex
CREATE INDEX "workflow_runs_userId_idx" ON "workflow_runs"("userId");

-- CreateIndex
CREATE INDEX "workflow_runs_inngestRunId_idx" ON "workflow_runs"("inngestRunId");

-- CreateIndex
CREATE INDEX "workflow_runs_status_idx" ON "workflow_runs"("status");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_templates_eventName_key" ON "workflow_templates"("eventName");

-- CreateIndex
CREATE UNIQUE INDEX "client_branding_userId_key" ON "client_branding"("userId");

-- CreateIndex
CREATE INDEX "service_requests_userId_idx" ON "service_requests"("userId");

-- CreateIndex
CREATE INDEX "service_requests_status_idx" ON "service_requests"("status");

-- CreateIndex
CREATE INDEX "automation_metrics_workflowId_idx" ON "automation_metrics"("workflowId");

-- CreateIndex
CREATE INDEX "automation_metrics_date_idx" ON "automation_metrics"("date");

-- CreateIndex
CREATE UNIQUE INDEX "automation_metrics_workflowId_date_key" ON "automation_metrics"("workflowId", "date");

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_credentials" ADD CONSTRAINT "workflow_credentials_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_credentials" ADD CONSTRAINT "workflow_credentials_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_runs" ADD CONSTRAINT "workflow_runs_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_runs" ADD CONSTRAINT "workflow_runs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_branding" ADD CONSTRAINT "client_branding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_metrics" ADD CONSTRAINT "automation_metrics_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
