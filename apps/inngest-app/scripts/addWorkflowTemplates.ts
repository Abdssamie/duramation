// AUTO-GENERATED FILE
import { SendOutlookEmailTemplate } from "./../src/inngest/functions/send-outlook-email/metadata";
import prisma from "@/lib/prisma";
import { ScrapeWebsiteTemplate } from "./../src/inngest/functions/scrape-website/metadata";
import { RandomTextLoopTemplate } from "./../src/inngest/functions/random-text-loop/metadata";
import { PostToSlackTemplate } from "./../src/inngest/functions/post-to-slack/metadata";
import { DailyReportTemplate } from "./../src/inngest/functions/generate-daily-report/metadata";

import { addWorkflowTemplatesIfNotExist } from "@duramation/shared";

// Skip database operations during build if encryption key is not available
if (!process.env.PRISMA_FIELD_ENCRYPTION_KEY) {
  console.log('[addWorkflowTemplates] Skipping template sync - no encryption key available (build time)');
  process.exit(0);
}

addWorkflowTemplatesIfNotExist(prisma, [
  SendOutlookEmailTemplate,
  ScrapeWebsiteTemplate,
  RandomTextLoopTemplate,
  PostToSlackTemplate,
  DailyReportTemplate
]).catch((error) => {
  console.error('[addWorkflowTemplates] Error syncing templates:', error);
  process.exit(1);
});