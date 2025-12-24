// AUTO-GENERATED FILE
import { SendOutlookEmailTemplate } from "./../src/inngest/functions/send-outlook-email/metadata";
import prisma from "@/lib/prisma";
import { ScrapeWebsiteTemplate } from "./../src/inngest/functions/scrape-website/metadata";
import { RandomTextLoopTemplate } from "./../src/inngest/functions/random-text-loop/metadata";
import { PostToSlackTemplate } from "./../src/inngest/functions/post-to-slack/metadata";
import { LeadEnrichmentTemplate } from "./../src/inngest/functions/lead-enrichment/metadata";
import { DailyReportTemplate } from "./../src/inngest/functions/generate-daily-report/metadata";
import { ExpenseAuditorTemplate } from "./../src/inngest/functions/expense-auditor/metadata";
import { ContentRepurposingTemplate } from "./../src/inngest/functions/content-repurposing/metadata";

import { addWorkflowTemplatesIfNotExist } from "@duramation/shared";

addWorkflowTemplatesIfNotExist(prisma, [
  SendOutlookEmailTemplate,
  ScrapeWebsiteTemplate,
  RandomTextLoopTemplate,
  PostToSlackTemplate,
  LeadEnrichmentTemplate,
  DailyReportTemplate,
  ExpenseAuditorTemplate,
  ContentRepurposingTemplate
]);