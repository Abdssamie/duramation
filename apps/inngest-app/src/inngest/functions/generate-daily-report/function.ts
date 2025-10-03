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
    async ({ step, event, logger, publish, credentials }) => {
        const { workflowId, user_id, input } = event.data;


        logger.info(`Generating daily report for user ${user_id}`);

        if (!input) {
            throw new NonRetriableError("Daily report input is required");
        }

        const { reportTitle, sheetName, emailRecipients, reportFormat } = input;

        // Check for Google credentials
        const googleCredential = credentials.find((cred: any) => cred.provider === 'GOOGLE');

        if (!googleCredential) {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", "Error: Google credentials not found. Please connect your Google account.")
                )
            );
            throw new NonRetriableError("Google credentials required for this workflow");
        }

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("log", `Using Google credential: ${googleCredential.name}`)
            )
        );

        // Fetch sheet data with realtime updates
        const reportSheetId = await step.run("fetch-sheet", async () => {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("progress", `Looking for sheet "${sheetName}" using Google Sheets API`)
                )
            );

            // Log credential info (without exposing secrets)
            logger.info({
                credentialId: googleCredential.id,
                credentialName: googleCredential.name,
                hasSecret: !!googleCredential.secret
            }, "Using Google credential for Sheets access");

            // TODO: Implement actual Google Sheets lookup using googleCredential.secret
            // For now, return mock data to test credential flow
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

            logger.info({
                reportTitle,
                sheetName,
                reportFormat,
                credentialUsed: googleCredential.name
            }, "Generating report with Google credentials");

            // TODO: Implement actual report generation using Google Sheets API
            // The credential secret contains: { accessToken, refreshToken, expiresIn, scopes }

            return { reportUrl: "mock-report-url", fileName: `${reportTitle}.${reportFormat.toLowerCase()}` };
        });

        // Send emails with realtime updates
        await step.run("send-emails", async () => {
            for (const recipient of emailRecipients) {
                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("log", `Sending report to ${recipient} via Gmail API`)
                    )
                );

                logger.info({
                    recipient,
                    credentialUsed: googleCredential.name
                }, "Sending email with Google credentials");

                // TODO: Implement actual Gmail API email sending using googleCredential.secret
                // The credential secret contains the OAuth tokens needed for Gmail API
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
