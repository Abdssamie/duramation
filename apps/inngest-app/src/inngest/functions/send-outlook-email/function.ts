import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate, createErrorUpdate } from "@/lib/realtime-channels";
import { HttpClient } from "@duramation/integrations/services";

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

        const microsoftCredential = credentials.find((cred: any) => cred.provider === 'MICROSOFT');

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

        const recipients = to.split(',').map((email: string) => email.trim());

        await step.run("send-email", async () => {
            try {
                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("progress", `Preparing to send email to ${recipients.join(', ')}`)
                    )
                );

                const secret = microsoftCredential.secret as any;
                const hasAccessToken = !!secret?.accessToken;

                logger.info('Microsoft credential validation:', {
                    hasAccessToken,
                    hasRefreshToken: !!secret?.refreshToken,
                    hasScopes: Array.isArray(secret?.scopes) && secret.scopes.length > 0,
                });

                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("log", `Microsoft credential validated: ${hasAccessToken ? '✓' : '✗'} Access Token`)
                    )
                );

                if (!hasAccessToken) {
                    throw new Error('Microsoft credential is missing access token');
                }

                // TODO: Implement actual email sending via Microsoft Graph API
                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("log", `[PLACEHOLDER] Would send email to ${recipients.join(', ')} with subject: "${subject}"`)
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
                            stepName: 'send-email',
                            stack: error instanceof Error ? error.stack : undefined
                        })
                    )
                );
                
                throw error;
            }
        });

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `[TEST MODE] Email prepared for ${recipients.length} recipient(s). Actual sending not yet implemented.`)
            )
        );

        logger.info(`Outlook email workflow completed for user ${user_id}`);
        return { success: true, recipients, testMode: true };
    }
);
