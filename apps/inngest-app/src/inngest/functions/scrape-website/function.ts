import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";

export const scrapeWebsiteWorkflow = inngest.createFunction(
    {
        id: "scrape-website",
        idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
        cancelOn: [{
            event: "workflow/stop",
            if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
        }],
    },
    { event: "workflow/scrape.website" },
    async ({ step, event, logger, publish, credentials }) => {
        const { workflowId, user_id, input } = event.data;

        logger.info(`Scraping website for user ${user_id}`);

        if (!input) {
            throw new NonRetriableError("Scrape website input is required");
        }

        const { url, formats } = input;

        // Check for Firecrawl credentials
        const firecrawlCredential = credentials.find((cred: any) => cred.provider === 'FIRECRAWL');

        if (!firecrawlCredential) {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", "Error: Firecrawl API key not found. Please add your Firecrawl credentials.")
                )
            );
            throw new NonRetriableError("Firecrawl credentials required for this workflow");
        }

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("log", `Using Firecrawl credential: ${firecrawlCredential.name}`)
            )
        );

        // Scrape the website
        const scrapedData = await step.run("scrape-url", async () => {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("progress", `Scraping ${url}`)
                )
            );

            const { apiKey } = firecrawlCredential.secret as { apiKey: string };

            const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url,
                    formats: formats,
                })
            });

            if (!response.ok) {
                const error = await response.text();
                logger.error({ status: response.status, error }, "Failed to scrape website");
                throw new Error(`Failed to scrape website: ${response.status} - ${error}`);
            }

            const data = await response.json();
            
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", `Successfully scraped ${url}`)
                )
            );

            return data;
        });

        // Final success update
        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `Successfully scraped website: ${url}`)
            )
        );

        logger.info(`Website scraping completed for user ${user_id}`);
        return { success: true, url, data: scrapedData };
    }
);
