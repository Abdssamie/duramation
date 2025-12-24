import { WorkflowTemplate } from "@/types/workflow";

export const ExpenseAuditorTemplate: WorkflowTemplate = {
  id: "expense-auditor",
  name: "Monthly Expense Auditor",
  description: "Scans Gmail for receipts and adds them to a Google Sheet for finance review.",
  eventName: "workflow/expense.auditor",
  canBeScheduled: true, // Key feature: this runs on CRON
  version: "1.0.0",
  requiredProviders: ["GOOGLE"],
  fields: [
    {
      key: "searchQuery",
      label: "Gmail Search Query",
      type: "text",
      placeholder: "subject:receipt has:attachment newer_than:30d",
      required: true
    },
    {
      key: "spreadsheetId",
      label: "Google Sheet ID",
      type: "text",
      required: true
    }
  ]
};
