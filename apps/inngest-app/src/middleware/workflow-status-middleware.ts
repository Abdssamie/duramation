import { InngestMiddleware } from "inngest";
import { updateStatusForWorkflow } from "@/utils/updateWorkflowStatus";

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
          async transformInput({ ctx }) {
            const step = ctx.step;
            const logger = ctx.logger;

            // Update workflow status to RUNNING at the start
            try {
              await updateStatusForWorkflow(
                step,
                logger,
                workflowId,
                runId,
                userId,
                'RUNNING',
                'RUNNING',
                "workflow-status-middleware-start"
              );
            } catch (error) {
              console.error("Failed to update workflow status to RUNNING:", error);
            }
            return {}
          }
        };
      }
    };
  }
});