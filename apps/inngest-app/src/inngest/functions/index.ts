// Array of all workflow functions for easy registration
import { generateReportSchedule } from "./generate-daily-report/function";
import { randomTextLoopWorkflow } from "./random-text-loop/function";
import { postToSlackWorkflow } from "./post-to-slack/function";
import { scrapeWebsiteWorkflow } from "./scrape-website/function";
import { sendOutlookEmailWorkflow } from "./send-outlook-email/function";
import { workflowStatusHandler } from "./system/workflow-status-handler";
import { automationMetricsAggregation, manualMetricsAggregation } from "./automation-metrics-aggregation";
import { 
  serviceRequestStatusHandler, 
  serviceRequestCreatedHandler, 
  automationMetricsUpdatedHandler 
} from "./service-request-handler";

export const workflowFunctions = [
    generateReportSchedule,
    randomTextLoopWorkflow,
    postToSlackWorkflow,
    scrapeWebsiteWorkflow,
    sendOutlookEmailWorkflow
];

export const systemFunctions = [
    workflowStatusHandler,
    automationMetricsAggregation,
    manualMetricsAggregation,
    serviceRequestStatusHandler,
    serviceRequestCreatedHandler,
    automationMetricsUpdatedHandler,
];


export const allFunctions = [
    ...workflowFunctions,
    ...systemFunctions,
];
