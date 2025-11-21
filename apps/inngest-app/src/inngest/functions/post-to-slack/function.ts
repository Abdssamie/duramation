import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";

export const postToSlackWorkflow = inngest.createFunction(
    {
        id: "post-to-slack",
        idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
        cancelOn: [{
            event: "workflow/stop",
            if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
        }],
    },
    { event: "workflow/slack.post" },
    async ({ step, event, logger, publish, credentials }) => {
        const { workflowId, user_id, input } = event.data;

        logger.info(`Posting to Slack for user ${user_id}`);

        if (!input) {
            throw new NonRetriableError("Slack post input is required");
        }

        const { channel, message } = input;

        // Check for Slack credentials
        const slackCredential = credentials.find((cred: any) => cred.provider === 'SLACK');

        if (!slackCredential) {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", "Error: Slack credentials not found. Please connect your Slack workspace.")
                )
            );
            throw new NonRetriableError("Slack credentials required for this workflow");
        }

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("log", `Using Slack credential: ${slackCredential.name}`)
            )
        );

        // Post message to Slack
        const result = await step.run("post-message", async () => {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("progress", `Posting message to ${channel}`)
                )
            );

            const { accessToken } = slackCredential.secret as { accessToken: string };

            const response = await fetch('https://slack.com/api/chat.postMessage', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    channel: channel,
                    text: message,
                })
            });

            if (!response.ok) {
                const error = await response.text();
                logger.error({ status: response.status, error }, "Failed to post to Slack");
                throw new Error(`Failed to post to Slack: ${response.status} - ${error}`);
            }

            const data = await response.json();
            
            if (!data.ok) {
                logger.error({ error: data.error }, "Slack API returned error");
                throw new Error(`Slack API error: ${data.error}`);
            }

            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", `Successfully posted to ${channel}`)
                )
            );

            return data;
        });

        // Final success update
        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `Successfully posted message to ${channel}`)
            )
        );

        logger.info(`Slack post completed for user ${user_id}`);
        return { success: true, channel, messageTs: result.ts };
    }
);
