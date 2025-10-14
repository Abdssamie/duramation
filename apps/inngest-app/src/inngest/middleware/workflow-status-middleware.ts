import { InngestMiddleware } from "inngest";
import logger from '@/services/logging';
import prisma from "@/lib/prisma";
import { RunStatus, WorkflowStatus } from "@duramation/db";
import { v4 as uuidv4 } from "uuid";

export const workflowStatusMiddleware = new InngestMiddleware({
  name: "Workflow Status Middleware",
  init() {
    return {
      async onFunctionRun({ ctx }) {
        const { event, runId } = ctx;

        // Only run for workflow events
        if (!event.name.startsWith('workflow/')) {
          return {};
        }

        // Extract workflow data from event
        const workflowId = event.data?.workflowId;
        const userId = event.data?.user_id;

        if (!workflowId || !userId) {
          return {};
        }

        return {
          async transformInput() {
            try {
              // Update workflow status directly without step.run
              const idempotencyKey = uuidv4();

              await prisma.workflow.upsert({
                where: {
                  id: workflowId,
                  userId: userId,
                },
                update: {
                  status: WorkflowStatus.RUNNING,
                  lastRunAt: new Date(),
                },
                create: {
                  id: workflowId,
                  userId: userId,
                  name: `workflow-${workflowId}`,
                  templateId: "unknown",
                  eventName: event.name,
                  status: WorkflowStatus.RUNNING,
                  lastRunAt: new Date(),
                },
              });

              // Create workflow run
              await prisma.workflowRun.upsert({
                where: {
                  inngestRunId: runId,
                  userId: userId,
                },
                update: {
                  status: RunStatus.RUNNING,
                },
                create: {
                  inngestRunId: runId,
                  idempotencyKey,
                  workflowId,
                  userId,
                  status: RunStatus.RUNNING,
                  startedAt: new Date(),
                },
              });

              logger.info(`Workflow ${workflowId} status set to RUNNING`);
            } catch (error) {
              logger.error("Failed to update workflow status to RUNNING:", error);
            }

            return {};
          }
        };
      }
    };
  }
});