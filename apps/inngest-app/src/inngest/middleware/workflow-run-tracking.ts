import { InngestMiddleware } from "inngest";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';
import { CacheInvalidationService } from "@/services/cache-invalidation";
import logger  from "@/services/logging";

interface WorkflowEventData {
  workflowId: string;
  user_id: string;
  input?: any;
  Key?: string;
}

export const workflowRunTrackingMiddleware = new InngestMiddleware({
  name: "Workflow Run Tracking Middleware",
  init() {
    return {
      async onFunctionRun({ ctx }) {
        const { event, runId } = ctx;

        // Only process workflow events
        if (!event.name.startsWith('workflow/')) {
          return {};
        }

        const eventData = event.data as WorkflowEventData;
        const { workflowId, user_id: userId, input } = eventData;

        if (!workflowId || !userId) {
          console.warn(`Missing required data for workflow run tracking: workflowId=${workflowId}, userId=${userId}`);
          return {};
        }

        return {
          async transformInput({ ctx }) {
            const step = ctx.step;
            
            try {
              await step.run("create-workflow-run", async () => {
                const cacheService = new CacheInvalidationService();
                
                // Generate idempotency key
                const runIdempotencyKey = uuidv4();
                
                // Check if WorkflowRun already exists to prevent duplicates
                const existingRun = await prisma.workflowRun.findUnique({
                  where: { inngestRunId: runId, userId: userId }
                });

                if (existingRun) {
                  logger.info(`WorkflowRun already exists for runId: ${runId}`);
                  return;
                }

                // Create new WorkflowRun record
                const workflowRun = await prisma.workflowRun.create({
                  data: {
                    inngestRunId: runId,
                    idempotencyKey: runIdempotencyKey,
                    status: 'STARTED',
                    input: input || {},
                    workflowId,
                    userId,
                    startedAt: new Date(),
                  }
                });

                logger.info(`Created WorkflowRun record: ${workflowRun.id} for workflow: ${workflowId}`);

                // Invalidate cache for workflow run start
                try {
                  await cacheService.invalidateWorkflowRunCache(userId, workflowId, runId);
                  logger.info(`Invalidated cache for workflow run start: ${runId}`);
                } catch (cacheError) {
                  logger.warn(`Failed to invalidate cache: ${cacheError}`);
                }
              });
            } catch (error) {
              logger.error(`Failed to create WorkflowRun record:`, {
                error: error instanceof Error ? error.message : String(error),
                workflowId,
                userId,
                runId
              });
            }

            return {};
          }
        };
      }
    };
  }
});
