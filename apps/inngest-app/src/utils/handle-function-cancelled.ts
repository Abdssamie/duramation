import { RunStatus, WorkflowStatus } from "@duramation/db";
import { updateStatusForWorkflow } from "@/utils/updateWorkflowStatus";

export async function handleFunctionCancelled(
  event: any,
  step: any,
  logger: any,
  userId: string,
  workflowId: string,
) {
  const runId = event.data.run_id || "";

  await updateStatusForWorkflow(
    step,
    logger,
    workflowId,
    runId,
    userId,
    WorkflowStatus.CANCELLED,
    RunStatus.CANCELLED,
    "update-workflow-status-cancelled",
  );
}
