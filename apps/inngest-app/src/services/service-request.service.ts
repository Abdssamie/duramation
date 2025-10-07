import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { inngest } from "@/inngest/client";
import { CACHE_TTL } from "@/utils/constants";
import { InternalUserId } from "@/types/user";
import {
  ServiceRequestsResponse,
  ServiceRequest as FrontendServiceRequest,
} from "@/types/dashboard-metrics";
import {
  ServiceRequest as DatabaseServiceRequest,
  RequestStatus,
  RequestPriority,
} from "@duramation/db/types";
import {
  StatusMapping,
  PriorityMapping,
  CreateServiceRequestPayload,
  UpdateServiceRequestPayload,
  ServiceRequestCreatedEventData,
  ServiceRequestStatusChangedEventData,
} from "@/types/service-request";

export class ServiceRequestService {
  private static readonly CACHE_PREFIX = "service-requests";

  /**
   * Get cache key for user's service requests
   */
  private static getCacheKey(userId: InternalUserId): string {
    return `${this.CACHE_PREFIX}:${userId}`;
  }

  /**
   * Map database service request to frontend format
   */
  private static mapToFrontend(
    dbRequest: DatabaseServiceRequest & {
      user: { clerk_id: string; email: string };
    },
  ): FrontendServiceRequest {
    return {
      id: dbRequest.id,
      title: dbRequest.title,
      status: StatusMapping.toFrontend(dbRequest.status),
      priority: PriorityMapping.toFrontend(dbRequest.priority),
      requestedBy: dbRequest.user.email || "Unknown User",
      assignedTo: undefined,
      createdAt: dbRequest.createdAt.toISOString(),
      updatedAt: dbRequest.updatedAt.toISOString(),
      description: dbRequest.description,
      category: "automation",
      estimatedHours: dbRequest.estimatedHours || undefined,
    };
  }

  /**
   * Fetch service requests from database
   */
  static async fetchFromDatabase(
    userId: InternalUserId,
  ): Promise<ServiceRequestsResponse> {
    const serviceRequests: ({
      user: { clerk_id: string; email: string };
    } & DatabaseServiceRequest)[] = await prisma.serviceRequest.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            clerk_id: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const mappedRequests = serviceRequests.map(this.mapToFrontend);

    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const completedThisMonth = mappedRequests.filter(
      (req) =>
        req.status === "completed" &&
        new Date(req.updatedAt) >= currentMonthStart,
    ).length;

    return {
      requests: mappedRequests,
      totalCount: mappedRequests.length,
      pendingCount: mappedRequests.filter((req) => req.status === "pending")
        .length,
      inProgressCount: mappedRequests.filter(
        (req) => req.status === "in_progress",
      ).length,
      completedThisMonth,
    };
  }

  /**
   * Get service requests with caching
   */
  static async getServiceRequests(
    userId: InternalUserId,
  ): Promise<ServiceRequestsResponse> {
    const cacheKey = this.getCacheKey(userId);

    // Try cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return cached as ServiceRequestsResponse;
    }

    // Fetch from database
    const serviceRequests = await this.fetchFromDatabase(userId);

    // Cache the result
    await redis.setex(cacheKey, CACHE_TTL, serviceRequests);

    return serviceRequests;
  }

  /**
   * Create a new service request
   */
  static async createServiceRequest(
    userId: InternalUserId,
    payload: CreateServiceRequestPayload,
  ): Promise<FrontendServiceRequest> {
    const {
      title,
      description,
      businessProcess,
      desiredOutcome,
      priority = "MEDIUM",
      preferredMeetingDate,
      availabilityNotes,
    } = payload;

    // Parse meeting date if provided
    let meetingDate: Date | null = null;
    if (preferredMeetingDate) {
      meetingDate = new Date(preferredMeetingDate);
      if (meetingDate <= new Date()) {
        throw new Error("Preferred meeting date must be in the future");
      }
    }

    // Create service request in database
    const serviceRequest: DatabaseServiceRequest =
      await prisma.serviceRequest.create({
        data: {
          userId,
          title,
          description: availabilityNotes
            ? `${description}\n\nAvailability Notes: ${availabilityNotes}`
            : description,
          businessProcess,
          desiredOutcome,
          priority: PriorityMapping.toDatabase(priority),
          status: "SUBMITTED" as RequestStatus,
          meetingDate,
        },
      });

    // Invalidate cache
    await this.invalidateCache(userId);

    // Trigger Inngest event
    await inngest.send({
      name: "service-request/created",
      data: {
        serviceRequestId: serviceRequest.id,
        userId,
      } as ServiceRequestCreatedEventData,
    });

    // Return frontend format
    return {
      id: serviceRequest.id,
      title: serviceRequest.title,
      status: StatusMapping.toFrontend(serviceRequest.status),
      priority: PriorityMapping.toFrontend(serviceRequest.priority),
      requestedBy: "Current User",
      createdAt: serviceRequest.createdAt.toISOString(),
      updatedAt: serviceRequest.updatedAt.toISOString(),
      description: serviceRequest.description,
      category: "automation",
      estimatedHours: serviceRequest.estimatedHours || undefined,
    };
  }

  /**
   * Update a service request
   */
  static async updateServiceRequest(
    userId: InternalUserId,
    payload: UpdateServiceRequestPayload,
  ): Promise<FrontendServiceRequest> {
    const { id, status, priority, estimatedHours } = payload;

    // Build update data
    const updateData: Partial<{
      status: RequestStatus;
      priority: RequestPriority;
      estimatedHours: number | null;
    }> = {};

    if (status) updateData.status = StatusMapping.toDatabase(status);
    if (priority) updateData.priority = PriorityMapping.toDatabase(priority);
    if (estimatedHours !== undefined)
      updateData.estimatedHours = estimatedHours;

    // Verify ownership
    const existingRequest: DatabaseServiceRequest | null =
      await prisma.serviceRequest.findFirst({
        where: { id, userId },
      });

    if (!existingRequest) {
      throw new Error("Service request not found or access denied");
    }

    // Update service request
    const updatedServiceRequest: ({
      user: { clerk_id: string; email: string };
    } & DatabaseServiceRequest) = await prisma.serviceRequest.update({
      where: { id, userId },
      data: updateData,
      include: {
        user: {
          select: {
            clerk_id: true,
            email: true,
          },
        },
      },
    });

    // Invalidate cache
    await this.invalidateCache(userId);

    // Trigger Inngest event
    await inngest.send({
      name: "service-request/status.changed",
      data: {
        serviceRequestId: updatedServiceRequest.id,
        userId,
        oldStatus: existingRequest.status,
        newStatus: updatedServiceRequest.status,
      } as ServiceRequestStatusChangedEventData,
    });

    return this.mapToFrontend(updatedServiceRequest);
  }

  /**
   * Invalidate cache for user
   */
  static async invalidateCache(userId: InternalUserId): Promise<void> {
    const cacheKey = this.getCacheKey(userId);
    await redis.del(cacheKey);
  }

  /**
   * Validate service request creation payload
   */
  static validateCreatePayload(
    payload: any,
  ): payload is CreateServiceRequestPayload {
    const { title, description, businessProcess, desiredOutcome } = payload;
    return !!(title && description && businessProcess && desiredOutcome);
  }

  /**
   * Validate service request update payload
   */
  static validateUpdatePayload(
    payload: any,
  ): payload is UpdateServiceRequestPayload {
    return !!payload.id;
  }
}
