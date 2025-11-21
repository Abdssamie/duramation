import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";
import { HttpClient } from "@duramation/integrations/services";

export const generateReportSchedule = inngest.createFunction(
    {
        id: "generate-report",
        idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
        cancelOn: [{
            event: "workflow/stop",
            if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
        }],
    },
    { event: "workflow/report.requested" },
    async ({ step, event, logger, publish, credentials }) => {
        const { workflowId, user_id, input } = event.data;

        logger.info(`Generating daily report for user ${user_id}`);

        if (!input) {
            throw new NonRetriableError("Daily report input is required");
        }

        const { sheetName } = input;

        const googleCredential = credentials.find((cred: any) => cred.provider === 'GOOGLE');

        if (!googleCredential) {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", "Error: Google credentials not found. Please connect your Google account.")
                )
            );
            throw new NonRetriableError("Google credentials required for this workflow");
        }

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("log", `Using Google credential: ${googleCredential.name}`)
            )
        );

        const sheetData = await step.run("read-sheet-data", async () => {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("progress", `Reading data from sheet "${sheetName}"`)
                )
            );

            let spreadsheetId = sheetName;
            const urlMatch = sheetName.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
            if (urlMatch) {
                spreadsheetId = urlMatch[1];
                logger.info(`Extracted spreadsheet ID from URL: ${spreadsheetId}`);
            }

            const httpClient = new HttpClient({
                provider: 'GOOGLE',
                credentials: googleCredential.secret,
                baseUrl: 'https://sheets.googleapis.com/v4',
            });

            const metadata = await httpClient.get(`/spreadsheets/${spreadsheetId}`, {
                searchParams: { fields: 'spreadsheetId,properties.title,sheets.properties' }
            }).json();

            logger.info(`Spreadsheet found:`, { 
                title: metadata.properties?.title, 
                sheets: metadata.sheets?.map((s: any) => s.properties?.title) 
            });

            const data = await httpClient.get(`/spreadsheets/${spreadsheetId}/values/A1:Z100`).json();

            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", `Successfully read ${data.values?.length || 0} rows from sheet`)
                )
            );

            return data;
        });

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `Successfully read sheet data: ${sheetData.values?.length || 0} rows`)
            )
        );

        logger.info(`Sheet read completed for user ${user_id}`);
        return { success: true, rowCount: sheetData.values?.length || 0, sheetData };
    }
);
