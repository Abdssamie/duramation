import { workflowRegistry } from '@/lib/workflow-registry';

// Auto-sync templates in development
if (process.env.NODE_ENV === 'development') {
  import('@/lib/sync-templates').then(({ syncTemplates }) => {
    syncTemplates().catch(console.error);
  });
}

// Legacy exports for backward compatibility
export { generateReportSchedule } from "./generate-daily-report/function";
export { randomTextLoopWorkflow } from "./random-text-loop/function";
export { postToSlackWorkflow } from "./post-to-slack/function";
export { scrapeWebsiteWorkflow } from "./scrape-website/function";
export { sendOutlookEmailWorkflow } from "./send-outlook-email/function";
export { workflowStatusHandler } from "./system/workflow-status-handler";
export { automationMetricsAggregation, manualMetricsAggregation } from "./automation-metrics-aggregation";
export { 
  serviceRequestStatusHandler, 
  serviceRequestCreatedHandler, 
  automationMetricsUpdatedHandler 
} from "./service-request-handler";

// Dynamic function discovery
let cachedFunctions: any[] | null = null;

export async function getAllFunctions(): Promise<any[]> {
  if (cachedFunctions) {
    return cachedFunctions;
  }

  cachedFunctions = await workflowRegistry.getAllFunctions();
  console.log(`Discovered ${cachedFunctions.length} workflow functions`);
  
  return cachedFunctions;
}

// For immediate use (will be populated on first call)
export const allFunctions: any[] = [];

// Initialize on module load
getAllFunctions().then((functions) => {
  allFunctions.push(...functions);
}).catch(console.error);
