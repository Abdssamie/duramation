import { inngest } from "@/inngest/client";
import { CacheInvalidationService } from "@/services/cache-invalidation";
import prisma from "@/lib/prisma";

/**
 * @function serviceRequestStatusHandler
 * @description Inngest function to handle changes in the status of a service request.
 * This function updates the service request's status in the database and then
 * invalidates relevant caches to ensure data consistency across the application.
 * @event "service-request/status.changed" - Triggered when a service request's status changes.
 * @param {object} event.data - Contains service request details:
 *   - `serviceRequestId`: ID of the service request.
 *   - `userId`: ID of the user associated with the service request.
 *   - `oldStatus`: The previous status of the service request.
 *   - `newStatus`: The new status of the service request.
 */
export const serviceRequestStatusHandler = inngest.createFunction(
  {
    id: "service-request-status-handler",
    name: "Service Request Status Change Handler",
  },
  { event: "service-request/status.changed" },
  async ({ event, step, logger }) => {
    const { serviceRequestId, userId, oldStatus, newStatus } = event.data as {
      serviceRequestId: string;
      userId: string;
      oldStatus: string;
      newStatus: string;
    };

    logger.info(`Processing service request status change: ${oldStatus} -> ${newStatus}`);

    const cacheService = new CacheInvalidationService();

    try {
      // Step 1: Update service request in the database with the new status
      await step.run("update-service-request", async () => {
        const updatedRequest = await prisma.serviceRequest.update({
          where: {
            id: serviceRequestId,
            userId: userId,
          },
          data: {
            status: newStatus as any, // Cast to enum type to match Prisma's expected value
            updatedAt: new Date(),
          },
        });

        logger.info(`Updated service request ${serviceRequestId} status to ${newStatus}`);
        return updatedRequest;
      });

      // Step 2: Invalidate cache for the user's service requests to reflect the update
      await step.run("invalidate-cache", async () => {
        await cacheService.invalidateServiceRequestCache(userId, 'updated');
        logger.info(`Invalidated cache for user ${userId} after service request status change`);
        return { success: true };
      });

      return {
        success: true,
        serviceRequestId,
        userId,
        statusChange: `${oldStatus} -> ${newStatus}`,
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      logger.error("Failed to handle service request status change:", error);
      // Re-throw the error for Inngest retry mechanisms
      throw new Error(`Service request status handler failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

/**
 * @function serviceRequestCreatedHandler
 * @description Inngest function to handle the creation of a new service request.
 * This function primarily invalidates relevant caches to ensure that the newly
 * created service request appears in the UI and is reflected in data queries.
 * @event "service-request/created" - Triggered when a new service request is created.
 * @param {object} event.data - Contains service request details:
 *   - `serviceRequestId`: ID of the newly created service request.
 *   - `userId`: ID of the user who created the service request.
 */
export const serviceRequestCreatedHandler = inngest.createFunction(
  {
    id: "service-request-created-handler",
    name: "Service Request Created Handler",
  },
  { event: "service-request/created" },
  async ({ event, step, logger }) => {
    const { serviceRequestId, userId } = event.data as {
      serviceRequestId: string;
      userId: string;
    };

    logger.info(`Processing new service request creation: ${serviceRequestId}`);

    const cacheService = new CacheInvalidationService();

    try {
      // Step 1: Invalidate cache for the user's service requests
      // This ensures that the frontend fetches the updated list including the new request.
      await step.run("invalidate-cache", async () => {
        await cacheService.invalidateServiceRequestCache(userId, 'created');
        logger.info(`Invalidated cache for user ${userId} after service request creation`);
        return { success: true };
      });

      return {
        success: true,
        serviceRequestId,
        userId,
        action: 'created',
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      logger.error("Failed to handle service request creation:", error);
      // Re-throw the error for Inngest retry mechanisms
      throw new Error(`Service request creation handler failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

/**
 * @function automationMetricsUpdatedHandler
 * @description Inngest function to handle updates to automation metrics.
 * This function invalidates specific caches related to automation metrics for a given
 * workflow and user, ensuring that analytics dashboards and reports reflect the latest data.
 * @event "automation/metrics.updated" - Triggered when automation metrics are updated.
 * @param {object} event.data - Contains metrics update details:
 *   - `workflowId`: ID of the workflow whose metrics were updated.
 *   - `userId`: ID of the user associated with the workflow.
 *   - `date`: The date for which metrics were updated (ISO string).
 */
export const automationMetricsUpdatedHandler = inngest.createFunction(
  {
    id: "automation-metrics-updated-handler",
    name: "Automation Metrics Updated Handler",
  },
  { event: "automation/metrics.updated" },
  async ({ event, step, logger }) => {
    const { workflowId, userId, date } = event.data as {
      workflowId: string;
      userId: string;
      date: string;
    };

    logger.info(`Processing automation metrics update for workflow: ${workflowId}`);

    const cacheService = new CacheInvalidationService();

    try {
      // Step 1: Invalidate cache specifically for the updated automation metrics
      await step.run("invalidate-metrics-cache", async () => {
        await cacheService.invalidateAutomationMetricsCache(userId, workflowId);
        logger.info(`Invalidated metrics cache for workflow ${workflowId}`);
        return { success: true };
      });

      return {
        success: true,
        workflowId,
        userId,
        date,
        action: 'metrics_updated',
        timestamp: new Date().toISOString(),
      };

    } catch (error) {
      logger.error("Failed to handle automation metrics update:", error);
      // Re-throw the error for Inngest retry mechanisms
      throw new Error(`Automation metrics handler failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);