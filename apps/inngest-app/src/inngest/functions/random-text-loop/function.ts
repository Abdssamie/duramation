import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";
import { updateStatusForWorkflow } from "@/utils/updateWorkflowStatus";
import { RunStatus, WorkflowStatus } from "@duramation/db";


export const randomTextLoopWorkflow = inngest.createFunction(
    {
        id: "random-text-loop",
        // Idempotency key to prevent duplicate executions for the same workflow instance
        idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
        cancelOn: [{
            event: "workflow/stop",
            if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
        }],
    },
    { event: "workflow/random.text.loop" },
    async ({ step, event, logger, runId, publish, credentials }) => {
        const { workflowId, user_id, cronExpression, scheduledRun, tz, input } = event.data;
        const functionId = "random-text-loop";

        await updateStatusForWorkflow(
            step,
            logger,
            workflowId,
            runId,
            user_id,
            WorkflowStatus.RUNNING,
            RunStatus.RUNNING,
            "update-workflow-status-failed",
        );


        // Initialize workflow run and publish status update
        await step.run("initialize-workflow", async () => {
            if (scheduledRun) {
                logger.info({
                    runId,
                    functionId,
                    workflowId,
                    userId: user_id,
                    cronExpression,
                    tz
                }, "Scheduled run detected");
            }

            const channel = workflowChannel(user_id, workflowId);
            logger.debug({
                runId,
                functionId,
                workflowId,
                userId: user_id,
                channel: channel.name
            }, "Publishing start message to channel");
            await publish(
                channel.updates(
                    createWorkflowUpdate("status", "Random text loop workflow started")
                )
            );
        });

        

        await step.run("start-random-text-loop", async () => {
            logger.info({ runId, functionId, workflowId, userId: user_id }, "Starting random text loop");

            if (!input) {
                await publish({
                    channel: `user:${user_id}:workflow:${workflowId}`,
                    topic: "updates",
                    data: createWorkflowUpdate("log", "Error: Random text loop input is required")
                });
                const err = new NonRetriableError("Random text loop input is required");
                logger.error({ runId, functionId, workflowId, userId: user_id, error: err.message }, "Missing input");
                throw err;
            }
        });

        const { iterations = 10, delaySeconds = 5 } = input;

        // Generate random words for text creation
        const words = [
            "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
            "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
            "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
            "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat"
        ];

        // Function to generate random text
        const generateRandomText = (wordCount: number = 5): string => {
            const selectedWords = [];
            for (let i = 0; i < wordCount; i++) {
                const randomIndex = Math.floor(Math.random() * words.length);
                selectedWords.push(words[randomIndex]);
            }
            return selectedWords.join(" ");
        };

        // Publish loop configuration
        await publish({
            channel: `user:${user_id}:workflow:${workflowId}`,
            topic: "updates",
            data: createWorkflowUpdate("status", `Starting loop with ${iterations} iterations, ${delaySeconds} second delays`)
        });


        for (let i = 1; i <= iterations; i++) {
            const timestamp = new Date().toISOString();

            // Generate new random text for each iteration
            const randomText = generateRandomText();

            const logMessage = `Iteration ${i}/${iterations}: ${randomText} (timestamp: ${timestamp})`;

            // Publish realtime log update
            const logChannel = workflowChannel(user_id, workflowId);
            await publish(
                logChannel.updates(
                    createWorkflowUpdate("log", logMessage)
                )
            );

            // Sleep for the specified delay, but not on the last iteration
            if (i < iterations) {
                const sleepUntil = new Date(Date.now() + delaySeconds * 1000);
                const sleepKey = `random-text-loop-${i}`;
                await step.sleepUntil(sleepKey, sleepUntil);
            }
        }

        // Publish completion status
        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `Random text loop completed successfully after ${iterations} iterations`)
            )
        );
    }
);
