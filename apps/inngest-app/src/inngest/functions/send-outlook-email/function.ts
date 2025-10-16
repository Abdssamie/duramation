import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate, createErrorUpdate } from "@/lib/realtime-channels";

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

        const { to, subject, body, isHtml } = input;

        // Check for Microsoft credentials
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

                // Validate Microsoft credential structure
                const secret = microsoftCredential.secret as any;
                const hasAccessToken = !!secret?.accessToken;
                const hasRefreshToken = !!secret?.refreshToken;
                const hasScopes = Array.isArray(secret?.scopes) && secret.scopes.length > 0;
                const hasExpiry = !!secret?.expiresIn;

                logger.info('Microsoft credential validation:', {
                    hasAccessToken,
                    hasRefreshToken,
                    hasScopes,
                    hasExpiry,
                    scopes: secret?.scopes || []
                });

                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("log", `Microsoft credential validated: ${hasAccessToken ? '✓' : '✗'} Access Token, ${hasRefreshToken ? '✓' : '✗'} Refresh Token, ${hasScopes ? '✓' : '✗'} Scopes`)
                    )
                );

                if (!hasAccessToken) {
                    const error = new Error('Microsoft credential is missing access token');
                    
                    await publish(
                        workflowChannel(user_id, workflowId).updates(
                            createErrorUpdate('Missing access token', {
                                error: error.message,
                                code: 'MISSING_ACCESS_TOKEN',
                                stepName,
                                stack: error.stack
                            })
                        )
                    );
                    
                    throw error;
                }

                // TODO: Implement actual email sending via Microsoft Graph API
                // For now, just simulate success
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
