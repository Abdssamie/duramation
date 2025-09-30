// Array of all workflow functions for easy registration
import { generateReportSchedule } from "./generate-daily-report/function";
import { randomTextLoopWorkflow } from "./random-text-loop/function";
import { workflowStatusHandler } from "./system/workflow-status-handler";


export const workflowFunctions = [
    generateReportSchedule,
    randomTextLoopWorkflow,
];

export const systemFunctions = [
    workflowStatusHandler,
];


export const allFunctions = [
    ...workflowFunctions,
    ...systemFunctions,
];
