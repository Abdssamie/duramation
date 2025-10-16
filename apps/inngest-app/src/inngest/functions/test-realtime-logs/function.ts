import { inngest } from "@/inngest/client";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";

export const testRealtimeLogsWorkflow = inngest.createFunction(
  {
    id: "test-realtime-logs",
    idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
    cancelOn: [{
      event: "workflow/stop",
      if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
    }],
  },
  { event: "workflow/test.realtime.logs" },
  async ({ step, event, logger, runId, publish }) => {
    const { workflowId, user_id, input } = event.data;
    const functionId = "test-realtime-logs";

    console.log('[test-realtime-logs] Function started with:', { workflowId, user_id, runId });

    // Get the channel for this workflow
    const channel = workflowChannel(user_id, workflowId);

    // Step 1: Simple test
    await step.run("simple-test", async () => {
      console.log('[test-realtime-logs] Starting simple test step');

      const testMessage = input?.message || "Realtime Logs Test";

      // Test basic logging using createWorkflowUpdate helper
      console.log('[test-realtime-logs] Publishing start message');
      await publish(channel.updates(
        createWorkflowUpdate("status", `🚀 Starting workflow: ${testMessage}`)
      ));

      console.log('[test-realtime-logs] Publishing log message');
      await publish(channel.updates(
        createWorkflowUpdate("log", "📝 This is a test log message")
      ));

      console.log('[test-realtime-logs] Publishing completion message');
      await publish(channel.updates(
        createWorkflowUpdate("result", `✅ Completed workflow: ${testMessage}`, { success: true })
      ));

      console.log('[test-realtime-logs] Completed simple test step');
    });

    console.log('[test-realtime-logs] Function completed');
  }
);