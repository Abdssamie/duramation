import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";


export const generateReportSchedule = inngest.createFunction(
    {
        id: "generate-report",
        // Idempotency key to prevent duplicate executions for the same workflow instance
        idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + (event.data.idempotency_key ? event.data.idempotency_key : "manual")',
        cancelOn: [{
            event: "workflow/stop", // The event name that cancels this function
            if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
        }],
    },
    { event: "workflow/report.requested" },
    async ({ step, event, logger, runId, publish }) => {
        const { workflowId, user_id, cronExpression, scheduledRun, tz, input } = event.data;


        logger.info(`Generating daily report for user ${user_id}`);

        if (!input) {
            throw new NonRetriableError("Daily report input is required");
        }

        const { reportTitle, sheetName, emailRecipients, reportFormat, includeCharts } = input;

        // Fetch sheet data with realtime updates
        const reportSheetId = await step.run("fetch-sheet", async () => {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("progress", `Looking for sheet "${sheetName}"`)
                )
            );
            // TODO: Implement sheet lookup
            return "mock-sheet-id";
        });

        if (!reportSheetId) {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", `Error: Sheet "${sheetName}" not found`)
                )
            );
            throw new NonRetriableError(`Sheet "${sheetName}" not found`);
        }

        // Generate report with progress updates
        const reportData = await step.run("generate-report", async () => {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("progress", `Generating ${reportFormat} report with title "${reportTitle}"`)
                )
            );

            // TODO: Implement actual report generation
            logger.info(`Would generate "${reportTitle}" report from sheet "${sheetName}"`);
            logger.info(`Format: ${reportFormat}, Include charts: ${includeCharts}`);

            return { reportUrl: "mock-report-url", fileName: `${reportTitle}.${reportFormat.toLowerCase()}` };
        });

        // Send emails with realtime updates
        await step.run("send-emails", async () => {
            for (const recipient of emailRecipients) {
                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("log", `Sent report to ${recipient}`)
                    )
                );
                // TODO: Implement email sending
                logger.info(`Would send report to ${recipient}`);
            }
        });

        // Final success update
        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `Report "${reportTitle}" successfully sent to ${emailRecipients.length} recipients`)
            )
        );

        logger.info(`Report generation completed for user ${user_id}`);
        return { success: true, reportData, recipientCount: emailRecipients.length };
    }
);
