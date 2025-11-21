import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";
import { HttpClient } from "@duramation/integrations/services";

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

        const result = await step.run("post-message", async () => {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("progress", `Posting message to ${channel}`)
                )
            );

            const httpClient = new HttpClient({
                provider: 'SLACK',
                credentials: slackCredential.secret,
                baseUrl: 'https://slack.com/api',
            });

            const data = await httpClient.post('/chat.postMessage', {
                json: { channel, text: message },
            }).json();

            if (!data.ok) {
                throw new Error(`Slack API error: ${data.error}`);
            }

            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", `Successfully posted to ${channel}`)
                )
            );

            return data;
        });

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `Successfully posted message to ${channel}`)
            )
        );

        logger.info(`Slack post completed for user ${user_id}`);
        return { success: true, channel, messageTs: result.ts };
    }
);
