-- CreateEnum
CREATE TYPE "public"."CredentialType" AS ENUM ('OAUTH', 'API_KEY');

-- CreateEnum
CREATE TYPE "public"."Provider" AS ENUM ('GOOGLE', 'SLACK', 'HUBSPOT', 'FIRECRAWL', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."WorkflowStatus" AS ENUM ('IDLE', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."RunStatus" AS ENUM ('STARTED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."users" (
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
CREATE TABLE "public"."credentials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."CredentialType" NOT NULL,
    "provider" "public"."Provider" NOT NULL,
    "secret" TEXT NOT NULL,
    "config" JSONB,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workflows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "description" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "status" "public"."WorkflowStatus" NOT NULL DEFAULT 'IDLE',
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
    "requiredProviders" "public"."Provider"[] DEFAULT ARRAY[]::"public"."Provider"[],
    "config" JSONB,

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workflow_credentials" (
    "workflowId" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,

    CONSTRAINT "workflow_credentials_pkey" PRIMARY KEY ("workflowId","credentialId")
);

-- CreateTable
CREATE TABLE "public"."workflow_runs" (
    "id" TEXT NOT NULL,
    "inngestRunId" TEXT NOT NULL,
    "idempotencyKey" TEXT,
    "status" "public"."RunStatus" NOT NULL DEFAULT 'STARTED',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "input" JSONB,
    "output" JSONB,
    "error" TEXT,
    "realtimeData" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "workflowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workflow_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workflow_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "canBeScheduled" BOOLEAN NOT NULL,
    "requiredProviders" "public"."Provider"[] DEFAULT ARRAY[]::"public"."Provider"[],
    "requiredScopes" JSONB,
    "fields" JSONB,
    "restrictedToUsers" TEXT[],
    "tags" TEXT[],
    "version" TEXT NOT NULL,

    CONSTRAINT "workflow_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_id_key" ON "public"."users"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "public"."users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "public"."users"("phone_number");

-- CreateIndex
CREATE INDEX "credentials_userId_idx" ON "public"."credentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_name_key" ON "public"."credentials"("userId", "name");

-- CreateIndex
CREATE INDEX "workflows_userId_idx" ON "public"."workflows"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_runs_inngestRunId_key" ON "public"."workflow_runs"("inngestRunId");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_runs_idempotencyKey_key" ON "public"."workflow_runs"("idempotencyKey");

-- CreateIndex
CREATE INDEX "workflow_runs_workflowId_idx" ON "public"."workflow_runs"("workflowId");

-- CreateIndex
CREATE INDEX "workflow_runs_userId_idx" ON "public"."workflow_runs"("userId");

-- CreateIndex
CREATE INDEX "workflow_runs_inngestRunId_idx" ON "public"."workflow_runs"("inngestRunId");

-- CreateIndex
CREATE INDEX "workflow_runs_status_idx" ON "public"."workflow_runs"("status");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_templates_eventName_key" ON "public"."workflow_templates"("eventName");

-- AddForeignKey
ALTER TABLE "public"."credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workflows" ADD CONSTRAINT "workflows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workflow_credentials" ADD CONSTRAINT "workflow_credentials_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workflow_credentials" ADD CONSTRAINT "workflow_credentials_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "public"."credentials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workflow_runs" ADD CONSTRAINT "workflow_runs_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workflow_runs" ADD CONSTRAINT "workflow_runs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
