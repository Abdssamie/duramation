import prisma from "@/lib/prisma";
import { addWorkflowTemplatesIfNotExist } from "@duramation/shared";
import { SendOutlookEmailTemplate } from "@/inngest/functions/send-outlook-email/metadata";
import { ScrapeWebsiteTemplate } from "@/inngest/functions/scrape-website/metadata";
import { RandomTextLoopTemplate } from "@/inngest/functions/random-text-loop/metadata";
import { PostToSlackTemplate } from "@/inngest/functions/post-to-slack/metadata";
import { DailyReportTemplate } from "@/inngest/functions/generate-daily-report/metadata";

export async function syncTemplates() {
  try {
    await addWorkflowTemplatesIfNotExist(prisma, [
      SendOutlookEmailTemplate,
      ScrapeWebsiteTemplate,
      RandomTextLoopTemplate,
      PostToSlackTemplate,
      DailyReportTemplate
    ]);
    console.log('✅ Workflow templates synced');
  } catch (error) {
    console.error('❌ Failed to sync templates:', error);
  }
}
