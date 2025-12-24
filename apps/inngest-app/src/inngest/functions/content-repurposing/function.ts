import { inngest } from "@/inngest/client";
import { FirecrawlService } from "@duramation/integrations/services/providers";
import { SlackService } from "@duramation/integrations/services/providers";
import { workflowMiddleware } from "@/inngest/middleware/workflow-middleware";
import { ContentRepurposingTemplate } from "./metadata";

export const contentRepurposingWorkflow = inngest.createFunction(
  {
    id: ContentRepurposingTemplate.id,
    name: ContentRepurposingTemplate.name,
    middleware: [workflowMiddleware]
  },
  { event: ContentRepurposingTemplate.eventName },
  async ({ event, step, credentials }) => {
    const { url, platform, channelId } = event.data.input;

    // 1. Scrape the Blog Post
    const scrapedContent = await step.run("scrape-content", async () => {
      const firecrawlCred = credentials.find(c => c.provider === "FIRECRAWL");
      if (!firecrawlCred) throw new Error("Firecrawl credentials missing");

      const firecrawl = new FirecrawlService(firecrawlCred.secret);
      const result = await firecrawl.scrape(url, { formats: ["markdown"] });

      if (!result.success || !result.data?.markdown) {
        throw new Error("Failed to scrape content");
      }

      return {
        title: result.data.metadata?.title || "Untitled",
        content: result.data.markdown.substring(0, 5000) // Limit context
      };
    });

    // 2. Generate Draft (Mock AI for now, or use Gemini if integrated)
    const draftPost = await step.run("generate-draft", async () => {
      // In a real app, this would call OpenAI/Gemini
      const tone = platform === "linkedin" ? "professional" : "casual";
      const draft = `🚀 New Blog Post Alert: ${scrapedContent.title}\n\nHere's a quick summary of what we learned...\n\n#Tech #Growth`;

      return { draft, tone };
    });

    // 3. Send to Slack for Approval
    await step.run("notify-slack", async () => {
      const slackCred = credentials.find(c => c.provider === "SLACK");
      if (!slackCred) throw new Error("Slack credentials missing");

      const slack = new SlackService(slackCred.secret);

      await slack.postMessage(channelId, {
        text: "📝 New Social Media Draft Ready for Review",
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: "New Content Draft" }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Source:* ${url}\n*Platform:* ${platform}`
            }
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `\`\`${draftPost.draft}\`\``
            }
          },
          {
            type: "context",
            elements: [{ type: "mrkdwn", text: "Please review and post manually." }]
          }
        ]
      });

      return { sent: true };
    });

    return { success: true, message: "Draft sent to Slack" };
  }
);
