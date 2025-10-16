// AUTO-GENERATED FILE
import prisma from "@/lib/prisma";
import { SendOutlookEmailTemplate } from "@/inngest/functions/send-outlook-email/metadata";
import { ScrapeWebsiteTemplate } from "@/inngest/functions/scrape-website/metadata";
import { RandomTextLoopTemplate } from "@/inngest/functions/random-text-loop/metadata";
import { PostToSlackTemplate } from "@/inngest/functions/post-to-slack/metadata";
import { DailyReportTemplate } from "@/inngest/functions/generate-daily-report/metadata";

import { addWorkflowTemplatesIfNotExist } from "@duramation/shared";

addWorkflowTemplatesIfNotExist(prisma, [
  SendOutlookEmailTemplate,
  ScrapeWebsiteTemplate,
  RandomTextLoopTemplate,
  PostToSlackTemplate,
  DailyReportTemplate
]).then();