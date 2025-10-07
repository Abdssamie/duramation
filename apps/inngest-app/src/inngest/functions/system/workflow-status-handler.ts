import { inngest } from "@/inngest/client";
import { handleFunctionFinished } from "@/utils/handle-function-finished";
import { handleFunctionFailed } from "@/utils/handle-function-failed";
import { handleFunctionCancelled } from "@/utils/handle-function-cancelled";

export const workflowStatusHandler = inngest.createFunction(
  {
    id: "workflow-status-handler",
    idempotency:
      'event.data.event.data.user_id + "-" + event.data.event.data.workflowId + "-" + event.data.run_id',
  },
  [
    { event: "inngest/function.finished" },
    { event: "inngest/function.failed" },
    { event: "inngest/function.cancelled" },
  ],
  async ({ event, step, logger }) => {
    // Extract the dynamic data from the event payload.
    // @ts-ignore
    const { workflowId, user_id } = event.data.event.data;

    logger.info("--------------------------------\n");
    logger.info(event.data.function_id, "Function ID");
    logger.info("--------------------------------\n");
    logger.info(workflowId, "Workflow ID");
    logger.info(user_id, "User ID");

    if (!workflowId || !user_id) {
      logger.error(
        "Unable to determine workflowId or user_id for event:",
        event.name,
      );
      return;
    }

    switch (event.name) {
      case "inngest/function.finished":
        return handleFunctionFinished(event, step, logger, user_id, workflowId);
      case "inngest/function.failed":
        return handleFunctionFailed(event, step, logger, user_id, workflowId);
      case "inngest/function.cancelled":
        return handleFunctionCancelled(
          event,
          step,
          logger,
          user_id,
          workflowId,
        );
      default:
        return;
    }
  },
);
