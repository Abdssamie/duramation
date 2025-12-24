import { WorkflowTemplate } from "@/types/workflow";

export const LeadEnrichmentTemplate: WorkflowTemplate = {
  id: "lead-enrichment",
  name: "Sales Lead Enrichment",
  description: "Enriches new leads with company data from their website and updates the CRM.",
  eventName: "workflow/lead.enrichment",
  canBeScheduled: false,
  version: "1.0.0",
  requiredProviders: ["FIRECRAWL"], // Could add HubSpot/Salesforce here later
  fields: [
    {
      key: "leadName",
      label: "Lead Name",
      type: "text",
      required: true
    },
    {
      key: "companyUrl",
      label: "Company Website",
      type: "text",
      placeholder: "duramation.com",
      required: true
    },
    {
      key: "email",
      label: "Lead Email",
      type: "text",
      required: true
    }
  ]
};
