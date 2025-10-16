import { inngest } from "@/inngest/client";
import { 
  workflowChannel, 
  createStatusUpdate,
  createLogUpdate,
  createResultUpdate,
  createProgressUpdate,
} from "@/lib/realtime-channels";

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
  async ({ step, event, runId, publish }) => {
    const { workflowId, user_id, input } = event.data;

    console.log('[test-realtime-logs] Function started with:', { workflowId, user_id, runId });

    // Get the channel for this workflow
    const channel = workflowChannel(user_id, workflowId);

    // Step 1: Simple test
    await step.run("simple-test", async () => {
      console.log('[test-realtime-logs] Starting simple test step');

      const testMessage = input?.message || "Realtime Logs Test";

      // Test enhanced typed logging
      console.log('[test-realtime-logs] Publishing start message');
      await publish(channel.updates(
        createStatusUpdate(`🚀 Starting workflow: ${testMessage}`, {
          status: 'started',
          stepName: 'simple-test'
        })
      ));

      console.log('[test-realtime-logs] Publishing log message');
      await publish(channel.updates(
        createLogUpdate("📝 This is a test log message", {
          level: 'info',
          stepName: 'simple-test',
          context: { testMessage, runId }
        })
      ));

      // Test progress update
      console.log('[test-realtime-logs] Publishing progress message');
      await publish(channel.updates(
        createProgressUpdate("Testing progress updates", {
          current: 1,
          total: 1,
          percentage: 100,
          stepName: 'simple-test'
        })
      ));

      // Test error handling (commented out to not fail the workflow)
      // await publish(channel.updates(
      //   createErrorUpdate("This is a test error message", {
      //     error: "Test error for demonstration",
      //     code: "TEST_ERROR",
      //     stepName: 'simple-test'
      //   })
      // ));

      console.log('[test-realtime-logs] Publishing completion message');
      await publish(channel.updates(
        createResultUpdate(`✅ Completed workflow: ${testMessage}`, {
          success: true,
          output: { testMessage, runId, completedAt: new Date().toISOString() },
          stepName: 'simple-test'
        })
      ));

      console.log('[test-realtime-logs] Completed simple test step');
    });

    console.log('[test-realtime-logs] Function completed');
  }
);