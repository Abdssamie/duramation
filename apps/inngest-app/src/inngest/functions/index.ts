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

/**
 * @module inngest/functions/index
 * @description This module serves as a central registry for all Inngest functions
 * used within the `inngest-app`. It categorizes and exports functions for easy
 * registration with the Inngest client.
 */

/**
 * @constant {Array<Function>} workflowFunctions
 * @description An array containing Inngest functions that represent user-defined
 * or core automation workflows. These are typically triggered by specific events
 * or schedules to perform various automated tasks.
 */
export const workflowFunctions = [
    generateReportSchedule,
    randomTextLoopWorkflow,
    postToSlackWorkflow,
    scrapeWebsiteWorkflow,
    sendOutlookEmailWorkflow
];

/**
 * @constant {Array<Function>} systemFunctions
 * @description An array containing Inngest functions that handle system-level
 * operations, such as status updates, metrics aggregation, and cache invalidation.
 * These functions often respond to internal events or cron schedules to maintain
 * the health and data consistency of the platform.
 */
export const systemFunctions = [
    workflowStatusHandler,
    automationMetricsAggregation,
    manualMetricsAggregation,
    serviceRequestStatusHandler,
    serviceRequestCreatedHandler,
    automationMetricsUpdatedHandler,
];

/**
 * @constant {Array<Function>} allFunctions
 * @description A combined array of all `workflowFunctions` and `systemFunctions`.
 * This array is typically used to register all available Inngest functions
 * with the Inngest client in the main application entry point.
 */
export const allFunctions = [
    ...workflowFunctions,
    ...systemFunctions,
];
