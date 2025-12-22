import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";


export const generateReportSchedule = inngest.createFunction(
    {
        id: "generate-report",
        // Idempotency key to prevent duplicate executions for the same workflow instance
        idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
        cancelOn: [{
            event: "workflow/stop", // The event name that cancels this function
            if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
        }],
    },
    { event: "workflow/report.requested" },
    async ({ step, event, logger, publish, credentials }) => {
        const { workflowId, user_id, input } = event.data;

        logger.info(`Generating daily report for user ${user_id}`);
        logger.info(`Credentials received:`, {
            count: credentials?.length || 0,
            credentials: credentials?.map((c: any) => ({ id: c.id, name: c.name, provider: c.provider })) || []
        });

        if (!input) {
            throw new NonRetriableError("Daily report input is required");
        }

        const { sheetName } = input;

        // Check for Google credentials
        const googleCredential = credentials.find((cred: any) => cred.provider === 'GOOGLE');
        logger.info(`Google credential found:`, { found: !!googleCredential, googleCredential: googleCredential ? { id: googleCredential.id, name: googleCredential.name, provider: googleCredential.provider } : null });

        if (!googleCredential) {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", "Error: Google credentials not found. Please connect your Google account.")
                )
            );
            throw new NonRetriableError(`Google credentials required for this workflow: ${credentials}`);
        }

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("log", `Using Google credential: ${googleCredential.name}`)
            )
        );

        // Read sheet data using Google Sheets API
        const sheetData = await step.run("read-sheet-data", async () => {
            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("progress", `Reading data from sheet "${sheetName}"`)
                )
            );

            logger.info({
                credentialId: googleCredential.id,
                credentialName: googleCredential.name,
                hasSecret: !!googleCredential.secret,
                sheetName
            }, "Reading Google Sheet with credentials");

            // Extract OAuth token from credential
            const secret = googleCredential.secret as { accessToken: string; refreshToken: string; scopes?: string[] };
            const { accessToken, scopes } = secret;

            logger.info(`OAuth scopes available:`, { scopes });

            // Extract spreadsheet ID from URL if a full URL is provided
            // Expected formats:
            // - Full URL: https://docs.google.com/spreadsheets/d/{spreadsheetId}/edit...
            // - Just ID: {spreadsheetId}
            let spreadsheetId = sheetName;
            const urlMatch = sheetName.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
            if (urlMatch) {
                spreadsheetId = urlMatch[1] as any;  // TODO: temporary fix 
                logger.info(`Extracted spreadsheet ID from URL: ${spreadsheetId}`);
            }

            logger.info(`Attempting to read spreadsheet: ${spreadsheetId}`);

            // First, try to get spreadsheet metadata to verify it exists and is accessible
            const metadataResponse = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId,properties.title,sheets.properties`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!metadataResponse.ok) {
                const error = await metadataResponse.text();
                logger.error({ status: metadataResponse.status, error, spreadsheetId }, "Failed to access spreadsheet");
                throw new Error(`Failed to access spreadsheet: ${metadataResponse.status} - ${error}. Check that: 1) The spreadsheet ID is correct, 2) The Google account has access to this sheet, 3) OAuth scopes include Google Sheets access.`);
            }

            const metadata = await metadataResponse.json();
            logger.info(`Spreadsheet found:`, { title: metadata.properties?.title, sheets: metadata.sheets?.map((s: any) => s.properties?.title) });

            // Now read the data from the first sheet
            const response = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z100`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                const error = await response.text();
                logger.error({ status: response.status, error, spreadsheetId }, "Failed to read sheet data");
                throw new Error(`Failed to read sheet data: ${response.status} - ${error}`);
            }

            const data = await response.json();

            await publish(
                workflowChannel(user_id, workflowId).updates(
                    createWorkflowUpdate("log", `Successfully read ${data.values?.length || 0} rows from sheet`)
                )
            );

            return data;
        });

        // Final success update
        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", `Successfully read sheet data: ${sheetData.values?.length || 0} rows`)
            )
        );

        logger.info(`Sheet read completed for user ${user_id}`);
        return { success: true, rowCount: sheetData.values?.length || 0, sheetData };
    }
);
