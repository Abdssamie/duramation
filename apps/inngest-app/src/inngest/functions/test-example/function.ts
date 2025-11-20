import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";

export const testExampleWorkflow = inngest.createFunction(
  {
    id: "test-example",
    idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
    cancelOn: [{
      event: "workflow/stop",
      if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
    }],
  },
  { event: "workflow/test-example" },
  async ({ step, event, logger, publish }) => {
    const { workflowId, user_id, input } = event.data;

    logger.info(`Starting TestExample workflow for user ${user_id}`);

    if (!input) {
      throw new NonRetriableError("Input is required");
    }

    // TODO: Add your workflow logic here
    const result = await step.run("main-step", async () => {
      await publish(
        workflowChannel(user_id, workflowId).updates(
          createWorkflowUpdate("progress", "Processing...")
        )
      );

      // Your implementation here

      return { success: true };
    });

    await publish(
      workflowChannel(user_id, workflowId).updates(
        createWorkflowUpdate("result", "Workflow completed successfully")
      )
    );

    logger.info(`TestExample workflow completed for user ${user_id}`);
    return result;
  }
);
