-- CreateEnum
CREATE TYPE "public"."BusinessOutcomeType" AS ENUM ('LEADS_GENERATED', 'ORDERS_PROCESSED', 'TICKETS_RESOLVED', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."OpportunityCategory" AS ENUM ('DATA_ENTRY', 'COMMUNICATION', 'REPORTING', 'INTEGRATION');

-- CreateEnum
CREATE TYPE "public"."OpportunityStatus" AS ENUM ('IDENTIFIED', 'DISMISSED', 'REQUESTED', 'IMPLEMENTED');

-- CreateEnum
CREATE TYPE "public"."HealthRecommendationType" AS ENUM ('PERFORMANCE', 'RELIABILITY', 'OPTIMIZATION');

-- CreateEnum
CREATE TYPE "public"."HealthRecommendationPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "public"."ImplementationEffort" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "public"."business_outcomes" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "outcomeType" "public"."BusinessOutcomeType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_outcomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."efficiency_metrics" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "beforeTimeSpent" DOUBLE PRECISION,
    "beforeErrorRate" DOUBLE PRECISION,
    "beforeThroughput" DOUBLE PRECISION,
    "afterTimeSpent" DOUBLE PRECISION,
    "afterErrorRate" DOUBLE PRECISION,
    "afterThroughput" DOUBLE PRECISION,
    "timeReduction" DOUBLE PRECISION,
    "errorReduction" DOUBLE PRECISION,
    "throughputIncrease" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "efficiency_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."automation_opportunities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."OpportunityCategory" NOT NULL,
    "impactScore" INTEGER NOT NULL,
    "difficultyScore" INTEGER NOT NULL,
    "timeSavingsHours" DOUBLE PRECISION,
    "costSavings" DECIMAL(65,30),
    "paybackPeriodMonths" INTEGER,
    "requiredIntegrations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "public"."OpportunityStatus" NOT NULL DEFAULT 'IDENTIFIED',
    "identifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dismissalReason" TEXT,
    "implementationNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "automation_opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workflow_health" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "healthScore" INTEGER NOT NULL,
    "lastCalculated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "successRate" DOUBLE PRECISION,
    "performanceTrend" DOUBLE PRECISION,
    "errorPattern" DOUBLE PRECISION,
    "businessImpact" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflow_health_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."health_recommendations" (
    "id" TEXT NOT NULL,
    "workflowHealthId" TEXT NOT NULL,
    "type" "public"."HealthRecommendationType" NOT NULL,
    "priority" "public"."HealthRecommendationPriority" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedImpact" TEXT NOT NULL,
    "implementationEffort" "public"."ImplementationEffort" NOT NULL,
    "isImplemented" BOOLEAN NOT NULL DEFAULT false,
    "implementedAt" TIMESTAMP(3),
    "effectivenessScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "health_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."health_alerts" (
    "id" TEXT NOT NULL,
    "workflowHealthId" TEXT NOT NULL,
    "alertType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "threshold" DOUBLE PRECISION,
    "currentValue" DOUBLE PRECISION,
    "isAcknowledged" BOOLEAN NOT NULL DEFAULT false,
    "acknowledgedAt" TIMESTAMP(3),
    "acknowledgedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "health_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."executive_reports" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "format" TEXT NOT NULL,
    "sections" JSONB NOT NULL,
    "companyName" TEXT,
    "logoUrl" TEXT,
    "primaryColor" TEXT,
    "shareableLink" TEXT,
    "linkExpiresAt" TIMESTAMP(3),
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "executive_reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "business_outcomes_workflowId_idx" ON "public"."business_outcomes"("workflowId");

-- CreateIndex
CREATE INDEX "business_outcomes_timestamp_idx" ON "public"."business_outcomes"("timestamp");

-- CreateIndex
CREATE INDEX "business_outcomes_outcomeType_idx" ON "public"."business_outcomes"("outcomeType");

-- CreateIndex
CREATE INDEX "efficiency_metrics_workflowId_idx" ON "public"."efficiency_metrics"("workflowId");

-- CreateIndex
CREATE INDEX "efficiency_metrics_period_idx" ON "public"."efficiency_metrics"("period");

-- CreateIndex
CREATE UNIQUE INDEX "efficiency_metrics_workflowId_period_key" ON "public"."efficiency_metrics"("workflowId", "period");

-- CreateIndex
CREATE INDEX "automation_opportunities_userId_idx" ON "public"."automation_opportunities"("userId");

-- CreateIndex
CREATE INDEX "automation_opportunities_status_idx" ON "public"."automation_opportunities"("status");

-- CreateIndex
CREATE INDEX "automation_opportunities_impactScore_idx" ON "public"."automation_opportunities"("impactScore");

-- CreateIndex
CREATE INDEX "automation_opportunities_identifiedAt_idx" ON "public"."automation_opportunities"("identifiedAt");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_health_workflowId_key" ON "public"."workflow_health"("workflowId");

-- CreateIndex
CREATE INDEX "workflow_health_workflowId_idx" ON "public"."workflow_health"("workflowId");

-- CreateIndex
CREATE INDEX "workflow_health_healthScore_idx" ON "public"."workflow_health"("healthScore");

-- CreateIndex
CREATE INDEX "workflow_health_lastCalculated_idx" ON "public"."workflow_health"("lastCalculated");

-- CreateIndex
CREATE INDEX "health_recommendations_workflowHealthId_idx" ON "public"."health_recommendations"("workflowHealthId");

-- CreateIndex
CREATE INDEX "health_recommendations_priority_idx" ON "public"."health_recommendations"("priority");

-- CreateIndex
CREATE INDEX "health_recommendations_isImplemented_idx" ON "public"."health_recommendations"("isImplemented");

-- CreateIndex
CREATE INDEX "health_alerts_workflowHealthId_idx" ON "public"."health_alerts"("workflowHealthId");

-- CreateIndex
CREATE INDEX "health_alerts_severity_idx" ON "public"."health_alerts"("severity");

-- CreateIndex
CREATE INDEX "health_alerts_isAcknowledged_idx" ON "public"."health_alerts"("isAcknowledged");

-- CreateIndex
CREATE INDEX "health_alerts_createdAt_idx" ON "public"."health_alerts"("createdAt");

-- CreateIndex
CREATE INDEX "executive_reports_userId_idx" ON "public"."executive_reports"("userId");

-- CreateIndex
CREATE INDEX "executive_reports_generatedAt_idx" ON "public"."executive_reports"("generatedAt");

-- CreateIndex
CREATE INDEX "executive_reports_shareableLink_idx" ON "public"."executive_reports"("shareableLink");

-- AddForeignKey
ALTER TABLE "public"."business_outcomes" ADD CONSTRAINT "business_outcomes_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."efficiency_metrics" ADD CONSTRAINT "efficiency_metrics_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."automation_opportunities" ADD CONSTRAINT "automation_opportunities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workflow_health" ADD CONSTRAINT "workflow_health_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."health_recommendations" ADD CONSTRAINT "health_recommendations_workflowHealthId_fkey" FOREIGN KEY ("workflowHealthId") REFERENCES "public"."workflow_health"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."health_alerts" ADD CONSTRAINT "health_alerts_workflowHealthId_fkey" FOREIGN KEY ("workflowHealthId") REFERENCES "public"."workflow_health"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."executive_reports" ADD CONSTRAINT "executive_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
