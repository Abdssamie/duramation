import { Logger } from "winston";
import { RunStatus, WorkflowStatus } from "@duramation/db";
import { v4 as uuidv4 } from "uuid";
import { CacheInvalidationService } from "@/services/cache-invalidation";
import prisma from "@/lib/prisma";
import { sendWebhookWithRetry } from "@/utils/sendWebhookWithRetry";

export async function updateStatusForWorkflow(
  step: any,
  logger: Logger,
  workflowId: string,
  runId: string,
  userId: string,
  workflowStatus: WorkflowStatus,
  runStatus: RunStatus,
  stepName: string,
  errorMessage?: string,
) {
  await step.run(stepName, async () => {
    if (!workflowId) {
      logger.error("WorkflowId is required but not provided");
      throw new Error("WorkflowId is required for status update");
    }

    logger.info("Updating workflow status");

    const idempotencyKey = uuidv4();
    const webhookUrl =
      process.env.FRONTEND_WEBHOOK_URL ||
      "http://localhost:3000/api/realtime/notify";
    const webhookSecret = process.env.INNGEST_WEBHOOK_SECRET || "";
    const cacheService = new CacheInvalidationService();

    const isFinished =
      runStatus === RunStatus.COMPLETED ||
      runStatus === RunStatus.FAILED ||
      runStatus === RunStatus.CANCELLED;

    const completedAt = new Date();

    // Upsert workflow status - create if doesn't exist, update if it does
    const updateData: any = {
      status: workflowStatus,
      lastRunAt: new Date(),
      ...(workflowStatus !== WorkflowStatus.RUNNING && { idempotencyKey }),
    };

    try {
      await prisma.workflow.upsert({
        where: {
          id: workflowId,
          userId: userId,
        },
        update: updateData,
        create: {
          id: workflowId,
          userId: userId,
          name: `workflow-${workflowId}`, // Default name if creating
          templateId: "unknown",
          eventName: "unknown",
          ...updateData,
        },
      });

      logger.info(`Upserted workflow status for workflow: ${workflowId}`);
    } catch (error) {
      logger.error(`Failed to upsert workflow status: ${error}`);
      // Fallback to update only if upsert fails
      await prisma.workflow.updateMany({
        where: { id: workflowId, userId: userId },
        data: updateData,
      });
    }

    logger.info("Updating workflow run status");

    // Upsert workflow run - create if doesn't exist, update if it does
    try {
      await prisma.workflowRun.upsert({
        where: {
          inngestRunId: runId,
          userId: userId,
        },
        update: {
          status: runStatus,
          completedAt: isFinished ? completedAt : null,
          error: errorMessage || null,
        },
        create: {
          inngestRunId: runId,
          idempotencyKey,
          workflowId,
          userId,
          status: runStatus,
          startedAt: new Date(),
          completedAt: isFinished ? completedAt : null,
          error: errorMessage || null,
        },
      });

      logger.info(`Upserted workflow run status for run: ${runId}`);
    } catch (error) {
      logger.error(`Failed to upsert workflow run: ${error}`);
      // Fallback to updateMany if upsert fails
      await prisma.workflowRun.updateMany({
        where: {
          userId: userId,
          workflowId: workflowId,
          inngestRunId: runId,
        },
        data: {
          status: runStatus,
          completedAt: isFinished ? completedAt : null,
          error: errorMessage || null,
        },
      });
    }

    // Invalidate cache after database updates
    try {
      await cacheService.invalidateWorkflowRunCache(
        userId,
        workflowId,
        "updated",
      );
      logger.info("Cache invalidated successfully");
    } catch (error) {
      logger.error("Failed to invalidate cache:", error);
      // Don't throw error to prevent breaking workflow execution
    }

    // Send webhook if this is a terminal state
    if (isFinished && webhookUrl) {
      logger.info(`Sending webhook to: ${webhookUrl}`);

      const webhookBody = {
        workflowId,
        runId,
        idempotencyKey,
        userId,
        status: runStatus,
        completedAt,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      };

      await sendWebhookWithRetry(
        webhookUrl,
        webhookSecret,
        webhookBody,
        logger,
      );
    }

    logger.info("Workflow and run status update complete");
  });
}
