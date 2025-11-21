import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate, createErrorUpdate } from "@/lib/realtime-channels";

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
            const stepName = 'scrape-url';
            
            try {
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
                    const errorText = await response.text();
                    logger.error({ status: response.status, error: errorText }, "Failed to scrape website");
                    
                    const error = new Error(`Failed to scrape website: ${response.status} - ${errorText}`);
                    
                    await publish(
                        workflowChannel(user_id, workflowId).updates(
                            createErrorUpdate(`Failed to scrape ${url}`, {
                                error: error.message,
                                code: `HTTP_${response.status}`,
                                stepName,
                                stack: error.stack
                            })
                        )
                    );
                    
                    throw error;
                }

                const data = await response.json();
                
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
                createWorkflowUpdate("result", `Successfully scraped website: ${url}`)
            )
        );

        logger.info(`Website scraping completed for user ${user_id}`);
        return { success: true, url, data: scrapedData };
    }
);
