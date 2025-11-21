// Static imports for all workflows
import { generateReportSchedule } from "@/inngest/functions/generate-daily-report/function";
import { randomTextLoopWorkflow } from "@/inngest/functions/random-text-loop/function";
import { postToSlackWorkflow } from "@/inngest/functions/post-to-slack/function";
import { scrapeWebsiteWorkflow } from "@/inngest/functions/scrape-website/function";
import { sendOutlookEmailWorkflow } from "@/inngest/functions/send-outlook-email/function";
import { workflowStatusHandler } from "@/inngest/functions/system/workflow-status-handler";
import { 
  automationMetricsAggregation, 
  manualMetricsAggregation 
} from "@/inngest/functions/automation-metrics-aggregation";
import { 
  serviceRequestStatusHandler, 
  serviceRequestCreatedHandler, 
  automationMetricsUpdatedHandler 
} from "@/inngest/functions/service-request-handler";

export class WorkflowRegistry {
  private workflowFunctions: any[];
  private systemFunctions: any[];

  constructor() {
    this.workflowFunctions = [
      generateReportSchedule,
      randomTextLoopWorkflow,
      postToSlackWorkflow,
      scrapeWebsiteWorkflow,
      sendOutlookEmailWorkflow,
    ];

    this.systemFunctions = [
      workflowStatusHandler,
      automationMetricsAggregation,
      manualMetricsAggregation,
      serviceRequestStatusHandler,
      serviceRequestCreatedHandler,
      automationMetricsUpdatedHandler,
    ];
  }

  async discoverWorkflows(): Promise<any[]> {
    return this.workflowFunctions;
  }

  async discoverSystemFunctions(): Promise<any[]> {
    return this.systemFunctions;
  }

  async getAllFunctions(): Promise<any[]> {
    return [...this.workflowFunctions, ...this.systemFunctions];
  }
}

export const workflowRegistry = new WorkflowRegistry();
