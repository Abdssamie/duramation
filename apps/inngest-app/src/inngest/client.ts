import { EventSchemas, Inngest } from 'inngest';
import { User } from '@duramation/db/types';
import logger from '@/services/logging';
import { WorkflowDailyReportInput } from '@/inngest/functions/generate-daily-report/metadata';
import { WorkflowRandomTextLoopInput } from '@/inngest/functions/random-text-loop/metadata';
import { WorkflowPostToSlackInput } from '@/inngest/functions/post-to-slack/metadata';
import { WorkflowScrapeWebsiteInput } from '@/inngest/functions/scrape-website/metadata';
import { WorkflowSendOutlookEmailInput } from '@/inngest/functions/send-outlook-email/metadata';
import { InternalUserId } from '@/types/user';
import { credentialMiddleware } from '@/inngest/middleware/credential';
import { workflowStatusMiddleware } from '@/inngest/middleware/workflow-status-middleware';
import { workflowRunTrackingMiddleware } from '@/inngest/middleware/workflow-run-tracking';
import { realtimeMiddleware } from './middleware/realtime';

// Basic scheduler input schema (defined inline in templates)
export type BasicSchedulerInput = {
  taskName: string;
  description?: string;
};

// Allow extending with optional fields via a generic
type UserEventPayload<T extends object = object> = {
  id: string;
  user: User; // From Prisma
  data: { user_id: InternalUserId } & T; // Merge required + optional
};

export type WorkflowTriggerPayload<
  TInput = unknown,
  T extends object = { user_id: InternalUserId },
> = {
  user: User; // From Prisma
  data: {
    scheduledRun: boolean;
    workflowId: string;
    cronExpression: string | null;
    tz: string | null;
    metadata?: Record<string, unknown>;
    idempotency_key: string;
    input: TInput;
  } & T;
};

export type ScheduleStopPayload<
  T extends object = { user_id: InternalUserId },
> = {
  data: {
    workflowId: string;
  } & T;
};

export type Events = {
  'internal/user/new.signup': UserEventPayload<{
    plan?: string;
    referralCode?: string;
  }>;
  'internal/user/new.google.signup': UserEventPayload<{
    plan?: string;
    referralCode?: string;
  }>;

  // Workflow events - strongly typed
  'workflow/stop': ScheduleStopPayload;
  'workflow/report.requested': WorkflowTriggerPayload<WorkflowDailyReportInput>;
  'workflow/random.text.loop': WorkflowTriggerPayload<WorkflowRandomTextLoopInput>;
  'workflow/slack.post': WorkflowTriggerPayload<WorkflowPostToSlackInput>;
  'workflow/scrape.website': WorkflowTriggerPayload<WorkflowScrapeWebsiteInput>;
  'workflow/microsoft.send-email': WorkflowTriggerPayload<WorkflowSendOutlookEmailInput>;

  // Automation metrics events
  'automation/metrics.aggregate': {
    data: {
      startDate?: string;
      endDate?: string;
      days?: number;
      user_id: InternalUserId;
    };
  };
  'automation/metrics.updated': {
    data: {
      workflowId: string;
      userId: string;
      date: string;
    };
  };

  // Service request events
  'service-request/status.changed': {
    data: {
      serviceRequestId: string;
      userId: string;
      oldStatus: string;
      newStatus: string;
    };
  };
  'service-request/created': {
    data: {
      serviceRequestId: string;
      userId: string;
    };
  };

};

// Array of the event keys for runtime check
const eventKeys = [
  'internal/user/new.signup',
  'internal/user/new.google.signup',
  'workflow/report.requested',
  'workflow/random.text.loop',
  'workflow/slack.post',
  'workflow/scrape.website',
  'workflow/microsoft.send-email',
  'workflow/stop',
  'automation/metrics.aggregate',
  'automation/metrics.updated',
  'service-request/status.changed',
  'service-request/created',
  'blog-post.updated',
  'invoice/data.submitted',
] as const;

// Create a union type of all the keys from the Events type
type EventKeys = keyof Events;

export type EventFor<K extends keyof Events> = { name: K } & Events[K];

// Type guard function to check if the input string is a valid event key
export function isEventKey(str: string): str is EventKeys {
  return (eventKeys as readonly string[]).includes(str);
}


// Create a client to send and receive events
export const inngest = new Inngest({
  id: 'duramation',
  middleware: [
    realtimeMiddleware(),
    credentialMiddleware,
    workflowStatusMiddleware
  ],
  logger: logger,
  schemas: new EventSchemas().fromRecord<Events>(),
});
