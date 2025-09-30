// AUTO-GENERATED FILE
import { RandomTextLoopTemplate } from "./../src/inngest/functions/random-text-loop/metadata";
import prisma from "@/lib/prisma";
import { DailyReportTemplate } from "./../src/inngest/functions/generate-daily-report/metadata";

import { addWorkflowTemplatesIfNotExist } from "@duramation/shared";

addWorkflowTemplatesIfNotExist(prisma, [
  RandomTextLoopTemplate,
  DailyReportTemplate
]);