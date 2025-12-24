import { WorkflowTemplate } from "@/types/workflow";

export const ContentRepurposingTemplate: WorkflowTemplate = {
  id: "content-repurposing",
  name: "Content Repurposing Engine",
  description: "Scrapes a blog post, summarizes it, and drafts a social media post in Slack for approval.",
  eventName: "workflow/content.repurposing",
  canBeScheduled: false,
  version: "1.0.0",
  requiredProviders: ["FIRECRAWL", "SLACK"],
  fields: [
    {
      key: "url",
      label: "Blog Post URL",
      type: "text",
      placeholder: "https://example.com/blog/my-post",
      required: true
    },
    {
      key: "platform",
      label: "Target Platform",
      type: "select",
      options: [
        { label: "LinkedIn", value: "linkedin" },
        { label: "Twitter", value: "twitter" }
      ],
      required: true
    },
    {
      key: "channelId",
      label: "Slack Channel ID for Approval",
      type: "text",
      placeholder: "C12345678",
      required: true
    }
  ]
};
