import { Logger } from "winston";
import { RunStatus, WorkflowStatus } from "@duramation/db";

import { updateStatusForWorkflow } from "@/utils/updateWorkflowStatus";

export async function handleFunctionFinished(
  event: any,
  step: any,
  logger: Logger,
  userId: string,
  workflowId: string,
) {
  const runId = event.data.run_id;

  let status: WorkflowStatus = WorkflowStatus.COMPLETED;

  if ("error" in event.data && event.data.error) {
    if (event.data.error.error === "function cancelled") {
      status = WorkflowStatus.CANCELLED;
    }
  }

  await updateStatusForWorkflow(
    step,
    logger,
    workflowId,
    runId,
    userId,
    status,
    RunStatus.COMPLETED,
    "update-workflow-status-finished",
  );
}