import { InngestMiddleware } from "inngest";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';
// import { CacheInvalidationService } from "@/services/cache-invalidation";
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
                // Generate idempotency key
                const runIdempotencyKey = uuidv4();
                
                try {
                  // Use upsert to handle race conditions and duplicates
                  const workflowRun = await prisma.workflowRun.upsert({
                    where: { 
                      inngestRunId: runId 
                    },
                    update: {
                      // Update if exists (shouldn't happen but handles edge cases)
                      status: 'STARTED',
                      input: input || {},
                    },
                    create: {
                      inngestRunId: runId,
                      idempotencyKey: runIdempotencyKey,
                      status: 'STARTED',
                      input: input || {},
                      workflowId,
                      userId,
                      startedAt: new Date(),
                    }
                  });

                  logger.info(`Upserted WorkflowRun record: ${workflowRun.id} for workflow: ${workflowId}`);
                } catch (dbError) {
                  logger.error(`Database operation failed:`, {
                    error: dbError instanceof Error ? dbError.message : String(dbError),
                    workflowId,
                    userId,
                    runId
                  });
                  // Don't throw to prevent workflow failure
                }

                // Skip cache invalidation in middleware to prevent blocking
                logger.info(`Skipped cache invalidation for performance: ${runId}`);
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
