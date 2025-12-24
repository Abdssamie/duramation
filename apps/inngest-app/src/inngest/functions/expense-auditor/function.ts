import { inngest } from "@/inngest/client";
import { GoogleService } from "@duramation/integrations/services/providers";
import { workflowMiddleware } from "@/inngest/middleware/workflow-middleware";
import { ExpenseAuditorTemplate } from "./metadata";

export const expenseAuditorWorkflow = inngest.createFunction(
  { 
    id: ExpenseAuditorTemplate.id, 
    name: ExpenseAuditorTemplate.name,
    middleware: [workflowMiddleware]
  },
  { event: ExpenseAuditorTemplate.eventName },
  async ({ event, step, credentials }) => {
    const { searchQuery, spreadsheetId } = event.data.input;

    // 1. Search Gmail
    const receipts = await step.run("search-emails", async () => {
      const googleCred = credentials.find(c => c.provider === "GOOGLE");
      if (!googleCred) throw new Error("Google credentials missing");

      const google = new GoogleService(googleCred.secret);
      
      const response = await google.listEmails({
        q: searchQuery,
        maxResults: 10
      });

      return response.messages || [];
    });

    if (receipts.length === 0) {
      return { message: "No receipts found" };
    }

    // 2. Process & Extract (Simulated)
    const processedData = await step.run("process-receipts", async () => {
      // In reality, we'd fetch full email content here
      // For showcase, we map the IDs
      return receipts.map((r: any) => ({
        id: r.id,
        date: new Date().toISOString().split('T')[0],
        vendor: "Unknown Vendor", // Placeholder
        amount: "$0.00"          // Placeholder
      }));
    });

    // 3. Add to Sheets
    await step.run("update-sheet", async () => {
      const googleCred = credentials.find(c => c.provider === "GOOGLE");
      if (!googleCred) throw new Error("Google credentials missing");

      const google = new GoogleService(googleCred.secret);
      
      const rows = processedData.map((d: any) => [d.id, d.date, d.vendor, d.amount]);
      
      await google.appendToSheet(spreadsheetId, "A1", rows);
      return { rowsAdded: rows.length };
    });

    return { 
      success: true, 
      processedCount: receipts.length 
    };
  }
);
