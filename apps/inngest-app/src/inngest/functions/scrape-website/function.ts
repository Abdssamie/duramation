import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate, createErrorUpdate } from "@/lib/realtime-channels";
import { HttpClient } from "@duramation/integrations/services";

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

        const scrapedData = await step.run("scrape-url", async () => {
            try {
                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("progress", `Scraping ${url}`)
                    )
                );

                const httpClient = new HttpClient({
                    provider: 'FIRECRAWL',
                    credentials: firecrawlCredential.secret,
                    baseUrl: 'https://api.firecrawl.dev/v1',
                });

                const data = await httpClient.post('/scrape', {
                    json: { url, formats },
                }).json();

                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createWorkflowUpdate("log", `Successfully scraped ${url}`)
                    )
                );

                return data;
            } catch (error) {
                logger.error({ error }, "Error in scrape-url step");
                
                await publish(
                    workflowChannel(user_id, workflowId).updates(
                        createErrorUpdate(`Error scraping website`, {
                            error: error instanceof Error ? error.message : String(error),
                            code: 'SCRAPE_ERROR',
                            stepName: 'scrape-url',
                            stack: error instanceof Error ? error.stack : undefined
                        })
                    )
                );
                
                throw error;
            }
        });

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `Successfully scraped website: ${url}`)
            )
        );

        logger.info(`Website scraping completed for user ${user_id}`);
        return { success: true, url, data: scrapedData };
    }
);
