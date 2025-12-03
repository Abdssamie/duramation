import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate, createErrorUpdate } from "@/lib/realtime-channels";
import { integrationClient } from "@duramation/integrations/server";

export const sendOutlookEmailWorkflow = inngest.createFunction(
    {
        id: "send-outlook-email",
        idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
        cancelOn: [{
            event: "workflow/stop",
            if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
        }],
    },
    { event: "workflow/microsoft.send-email" },
    async ({ step, event, logger, publish, credentials }) => {
        const { workflowId, user_id, input } = event.data;

        logger.info(`Sending Outlook email for user ${user_id}`);

        if (!input) {
            throw new NonRetriableError("Email input is required");
        }

        const { to, subject } = input;

        // Check for Microsoft credentials
        const microsoftCredential = credentials.find((cred: any) => cred.provider === 'microsoft_mail' || cred.provider === 'MICROSOFT');

        if (!microsoftCredential) {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", "Error: Microsoft credentials not found. Please connect your Microsoft account.")
                )
            );
            throw new NonRetriableError("Microsoft credentials required for this workflow");
        }

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("log", `Using Microsoft credential: ${microsoftCredential.name}`)
            )
        );

        // Parse recipients
        const recipients = to.split(',').map((email: string) => email.trim());

        // Send email via Microsoft Graph API
        await step.run("send-email", async () => {
            const stepName = 'send-email';
            
            try {
                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("progress", `Preparing to send email to ${recipients.join(', ')}`)
                    )
                );

                const nangoConnectionId = microsoftCredential.nangoConnectionId;
                if (!nangoConnectionId) {
                    throw new Error("Missing Nango Connection ID on credential. Please reconnect your Microsoft account.");
                }

                // Fetch token from Nango - this validates the connection and refreshes if needed
                const accessToken = await integrationClient.getAccessToken(microsoftCredential.provider, nangoConnectionId);

                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("log", `Microsoft credential validated and token retrieved`)
                    )
                );

                // TODO: Implement actual email sending via Microsoft Graph API
                // For now, just simulate success
                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("log", `[PLACEHOLDER] Would send email to ${recipients.join(', ')} with subject: "${subject}" using token ending in ...${accessToken.slice(-5)}`)
                    )
                );

                return { success: true, recipients, placeholder: true };
            } catch (error) {
                logger.error({ error }, "Error in send-email step");
                
                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createErrorUpdate('Failed to send email', {
                            error: error instanceof Error ? error.message : String(error),
                            code: 'EMAIL_SEND_ERROR',
                            stepName,
                            stack: error instanceof Error ? error.stack : undefined
                        })
                    )
                );
                
                throw error;
            }
        });

        // Final success update
        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `[TEST MODE] Email prepared for ${recipients.length} recipient(s). Actual sending not yet implemented.`)
            )
        );

        logger.info(`Outlook email workflow completed for user ${user_id}`);
        return { success: true, recipients, testMode: true };
    }
);
