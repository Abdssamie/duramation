import { inngest } from "@/inngest/client";
import { CacheInvalidationService } from "@/services/cache-invalidation";
import prisma from "@/lib/prisma";

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
      // Update service request in database
      await step.run("update-service-request", async () => {
        const updatedRequest = await prisma.serviceRequest.update({
          where: {
            id: serviceRequestId,
            userId: userId,
          },
          data: {
            status: newStatus as any, // Cast to enum type
            updatedAt: new Date(),
          },
        });

        logger.info(`Updated service request ${serviceRequestId} status to ${newStatus}`);
        return updatedRequest;
      });

      // Invalidate cache
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
      throw new Error(`Service request status handler failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

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
      // Invalidate cache for new service request
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
      throw new Error(`Service request creation handler failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);

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
      // Invalidate cache for updated metrics
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
      throw new Error(`Automation metrics handler failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);