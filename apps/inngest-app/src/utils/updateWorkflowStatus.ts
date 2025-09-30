import { RunStatus, WorkflowStatus } from "@duramation/db";
import prisma from "@/lib/prisma";

import { v4 as uuidv4 } from 'uuid';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendWebhookWithRetry(webhookUrl: string, webhookSecret: string, body: any, logger: any, maxRetries = MAX_RETRIES): Promise<boolean> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${webhookSecret}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        logger.info(`Webhook sent successfully to: ${webhookUrl}`);
        return true;
      }

      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody}`);
    } catch (error) {
      lastError = error as Error;
      const delayMs = RETRY_DELAY_MS * attempt; // Exponential backoff
      logger.warn(`Attempt ${attempt} failed (${lastError.message}). Retrying in ${delayMs}ms...`);

      if (attempt < maxRetries) {
        await delay(delayMs);
      }
    }
  }

  logger.error(`Failed to send webhook after ${maxRetries} attempts: ${lastError?.message}`);
  return false;
}

export async function updateStatusForWorkflow(
  step: any,
  logger: any,
  workflowId: string,
  runId: string,
  userId: string,
  workflowStatus: WorkflowStatus,
  runStatus: RunStatus,
  stepName: string,
  errorMessage?: string
) {
  await step.run(stepName, async () => {
    if (!workflowId) {
      logger.error("WorkflowId is required but not provided");
      throw new Error("WorkflowId is required for status update");
    }

    logger.info("Updating workflow status");

    const idempotencyKey = uuidv4();
    const webhookUrl = process.env.FRONTEND_WEBHOOK_URL || 'http://localhost:3000/api/realtime/notify';
    const webhookSecret = process.env.INNGEST_WEBHOOK_SECRET || '';

    const isFinished =
      runStatus === RunStatus.COMPLETED ||
      runStatus === RunStatus.FAILED ||
      runStatus === RunStatus.CANCELLED;

    // Update workflow status
    const updateData: any = {
      status: workflowStatus,
      ...(workflowStatus !== WorkflowStatus.RUNNING && { idempotencyKey })
    };

    await prisma.workflow.update({
      where: { id: workflowId, userId: userId },
      data: updateData,
    });

    const completedAt = new Date();

    logger.info("Updating workflow run status");

    await prisma.workflowRun.updateMany({
      where: {
        userId: userId,
        workflowId: workflowId,
        idempotencyKey: idempotencyKey,
        inngestRunId: runId
      },
      data: {
        status: runStatus,
        completedAt,
        error: errorMessage || null,
      },
    });

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
        timestamp: new Date().toISOString()
      };

      await sendWebhookWithRetry(
        webhookUrl,
        webhookSecret,
        webhookBody,
        logger
      );
    }

    logger.info("Workflow and run status update complete");
  });
}
