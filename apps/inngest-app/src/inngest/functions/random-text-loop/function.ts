import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";


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
    async ({ step, event, logger, runId, publish }) => {
        const { workflowId, user_id, cronExpression, scheduledRun, tz, input } = event.data;
        const functionId = "random-text-loop";

        // Get the channel for this workflow
        const channel = workflowChannel(user_id, workflowId);

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
                
                await publish(channel.updates(
                    createWorkflowUpdate("log", "📅 Scheduled run detected")
                ));
            }

            await publish(channel.updates(
                createWorkflowUpdate("status", "🚀 Starting workflow: Random Text Loop")
            ));
        });        

        await step.run("start-random-text-loop", async () => {
            logger.info({ runId, functionId, workflowId, userId: user_id }, "Starting random text loop");
            
            await publish(channel.updates(
                createWorkflowUpdate("log", "🔄 Validating input parameters")
            ));

            if (!input) {
                await publish(channel.updates(
                    createWorkflowUpdate("log", "❌ Error: Random text loop input is required")
                ));
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
        await publish(channel.updates(
            createWorkflowUpdate("status", `🔄 Starting loop with ${iterations} iterations, ${delaySeconds} second delays`)
        ));


        for (let i = 1; i <= iterations; i++) {
            const timestamp = new Date().toISOString();

            // Generate new random text for each iteration
            const randomText = generateRandomText();

            const logMessage = `📝 Iteration ${i}/${iterations}: ${randomText}`;
            
            // Publish realtime log update
            await publish(channel.updates(
                createWorkflowUpdate("log", logMessage, { 
                    iteration: i, 
                    totalIterations: iterations, 
                    timestamp,
                    generatedText: randomText 
                })
            ));

            // Update progress
            const progressPercent = Math.round((i / iterations) * 100);
            await publish(channel.updates(
                createWorkflowUpdate("progress", `Progress: ${progressPercent}% (${i}/${iterations})`, {
                    percent: progressPercent,
                    current: i,
                    total: iterations
                })
            ));

            // Sleep for the specified delay, but not on the last iteration
            if (i < iterations) {
                const sleepUntil = new Date(Date.now() + delaySeconds * 1000);
                const sleepKey = `random-text-loop-${i}`;
                await step.sleepUntil(sleepKey, sleepUntil);
            }
        }

        // Publish completion status
        await publish(channel.updates(
            createWorkflowUpdate("result", "✅ Completed workflow: Random Text Loop", {
                totalIterations: iterations,
                delaySeconds,
                completedAt: new Date().toISOString()
            })
        ));
    }
);
