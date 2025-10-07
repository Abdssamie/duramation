import { RunStatus, WorkflowStatus } from "@duramation/db";
import { updateStatusForWorkflow } from "@/utils/updateWorkflowStatus";

export async function handleFunctionFailed(
  event: any,
  step: any,
  logger: any,
  userId: string,
  workflowId: string,
) {
  const runId = event.data.run_id;
  const errorMessage = event.data.error?.message || "Function failed";

  await updateStatusForWorkflow(
    step,
    logger,
    workflowId,
    runId,
    userId,
    WorkflowStatus.FAILED,
    RunStatus.FAILED,
    "update-workflow-status-failed",
    errorMessage,
  );
}