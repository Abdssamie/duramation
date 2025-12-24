import { inngest } from "@/inngest/client";
import { FirecrawlService } from "@duramation/integrations/services/providers";
import { workflowMiddleware } from "@/inngest/middleware/workflow-middleware";
import { LeadEnrichmentTemplate } from "./metadata";

export const leadEnrichmentWorkflow = inngest.createFunction(
  { 
    id: LeadEnrichmentTemplate.id, 
    name: LeadEnrichmentTemplate.name,
    middleware: [workflowMiddleware]
  },
  { event: LeadEnrichmentTemplate.eventName },
  async ({ event, step, credentials }) => {
    const { leadName, companyUrl, email } = event.data.input;

    // 1. Scrape Company Data
    const companyData = await step.run("enrich-company", async () => {
      const firecrawlCred = credentials.find(c => c.provider === "FIRECRAWL");
      if (!firecrawlCred) throw new Error("Firecrawl credentials missing");

      const firecrawl = new FirecrawlService(firecrawlCred.secret);
      
      // Normalize URL
      const url = companyUrl.startsWith('http') ? companyUrl : `https://${companyUrl}`;
      
      const result = await firecrawl.scrape(url, { formats: ["markdown"] });
      
      if (!result.success || !result.data?.metadata) {
        throw new Error("Failed to scrape company website");
      }

      return {
        title: result.data.metadata.title,
        description: result.data.metadata.description,
        techStack: ["React", "Next.js"] // Mock extraction for now
      };
    });

    // 2. Score the Lead (Logic example)
    const score = await step.run("score-lead", async () => {
      let points = 0;
      if (companyData.description?.toLowerCase().includes("saas")) points += 50;
      if (companyData.title?.toLowerCase().includes("enterprise")) points += 30;
      return points;
    });

    // 3. Log/Update CRM (Mock)
    await step.run("update-crm", async () => {
      console.log(`[CRM UPDATE] Lead: ${leadName} (${email})`);
      console.log(`[CRM UPDATE] Company: ${companyData.title}`);
      console.log(`[CRM UPDATE] Score: ${score}`);
      return { updated: true, crmId: "crm_12345" };
    });

    return { 
      success: true, 
      enrichedData: companyData,
      leadScore: score
    };
  }
);
