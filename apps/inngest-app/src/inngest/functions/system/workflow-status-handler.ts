import {inngest} from "@/inngest/client";
import {WorkflowStatus, RunStatus} from "@duramation/db";
import {updateStatusForWorkflow} from "@/utils/updateWorkflowStatus";

async function handleFunctionFinished(
    event: any,
    step: any,
    logger: any,
    userId: string,
    workflowId: string,
) {
    const runId = event.data.run_id;

    let status : WorkflowStatus = WorkflowStatus.COMPLETED;

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

async function handleFunctionFailed(
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

async function handleFunctionCancelled(
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

export const workflowStatusHandler = inngest.createFunction(
    {
        id: "workflow-status-handler",
        idempotency: 'event.data.event.data.user_id + "-" + event.data.event.data.workflowId + "-" + event.data.run_id',
    },
    [
        {event: "inngest/function.finished"},
        {event: "inngest/function.failed"},
        {event: "inngest/function.cancelled"},
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
            logger.error("Unable to determine workflowId or user_id for event:", event.name);
            return;
        }


        switch (event.name) {
            case "inngest/function.finished":
                return handleFunctionFinished(
                    event,
                    step,
                    logger,
                    user_id,
                    workflowId,
                );
            case "inngest/function.failed":
                return handleFunctionFailed(
                    event,
                    step,
                    logger,
                    user_id,
                    workflowId,
                );
            case "inngest/function.cancelled":
                return handleFunctionCancelled(
                    event as any,
                    step,
                    logger,
                    user_id,
                    workflowId,
                );
            default:
                return;
        }
    }
);
