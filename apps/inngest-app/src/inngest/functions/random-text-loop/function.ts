import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import {
    workflowChannel,
    createStatusUpdate,
    createProgressUpdate,
    createLogUpdate,
    createResultUpdate,
    createErrorUpdate,

} from "@/lib/realtime-channels";


export const randomTextLoopWorkflow = inngest.createFunction(
    {
        id: "random-text-loop",
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

        const channel = workflowChannel(user_id, workflowId);

        const initResult = await step.run("initialize-workflow", async () => {
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
            return { scheduledRun, cronExpression, tz };
        });

        if (initResult.scheduledRun) {
            await publish(channel.updates(
                createLogUpdate("📅 Scheduled run detected", {
                    level: 'info',
                    context: { cronExpression: initResult.cronExpression, tz: initResult.tz, scheduledRun: initResult.scheduledRun }
                })
            ));
        }

        await publish(channel.updates(
            createStatusUpdate("🚀 Starting workflow: Random Text Loop", {
                status: 'started',
                stepName: 'initialize-workflow'
            })
        ));

        await step.run("validate-input", async () => {
            logger.info({ runId, functionId, workflowId, userId: user_id }, "Starting random text loop");

            if (!input) {
                const err = new NonRetriableError("Random text loop input is required");
                logger.error({ runId, functionId, workflowId, userId: user_id, error: err.message }, "Missing input");
                throw err;
            }
        });

        const { iterations = 10, delaySeconds = 5 } = input;

        const words = [
            "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
            "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
            "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
            "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat"
        ];

        const generateRandomText = (wordCount: number = 5): string => {
            const selectedWords = [];
            for (let i = 0; i < wordCount; i++) {
                const randomIndex = Math.floor(Math.random() * words.length);
                selectedWords.push(words[randomIndex]);
            }
            return selectedWords.join(" ");
        };

        await publish(channel.updates(
            createStatusUpdate(`🔄 Starting loop with ${iterations} iterations, ${delaySeconds} second delays`, {
                status: 'running',
                stepName: 'text-generation-loop'
            })
        ));

        for (let i = 1; i <= iterations; i++) {
            const timestamp = new Date().toISOString();
            const randomText = generateRandomText();
            const logMessage = `📝 Iteration ${i}/${iterations}: ${randomText}`;

            await publish(channel.updates(
                createLogUpdate(logMessage, {
                    level: 'info',
                    stepName: 'text-generation-loop',
                    context: {
                        iteration: i,
                        totalIterations: iterations,
                        timestamp,
                        generatedText: randomText
                    }
                })
            ));

            const progressPercent = Math.round((i / iterations) * 100);
            await publish(channel.updates(
                createProgressUpdate(`Progress: ${progressPercent}% (${i}/${iterations})`, {
                    current: i,
                    total: iterations,
                    percentage: progressPercent,
                    stepName: 'text-generation-loop'
                })
            ));

            if (i < iterations) {
                const sleepUntil = new Date(Date.now() + delaySeconds * 1000);
                const sleepKey = `random-text-loop-${i}`;
                await step.sleepUntil(sleepKey, sleepUntil);
            }
        }

        await publish(channel.updates(
            createResultUpdate("✅ Completed workflow: Random Text Loop", {
                success: true,
                output: {
                    totalIterations: iterations,
                    delaySeconds,
                    completedAt: new Date().toISOString()
                },
                stepName: 'complete-workflow'
            })
        ));
    }
);
