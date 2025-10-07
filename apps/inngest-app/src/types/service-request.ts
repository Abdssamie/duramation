import { RequestStatus, RequestPriority } from "@duramation/db/types";

// Database to Frontend mapping types
export type FrontendStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type FrontendPriority = "low" | "medium" | "high" | "urgent";

// Service Request creation payload
export interface CreateServiceRequestPayload {
  title: string;
  description: string;
  businessProcess: string;
  desiredOutcome: string;
  priority?: string;
  preferredMeetingDate?: string;
  availabilityNotes?: string;
}

// Service Request update payload
export interface UpdateServiceRequestPayload {
  id: string;
  status?: FrontendStatus;
  priority?: FrontendPriority;
  estimatedHours?: number;
}

// Inngest event payloads
export interface ServiceRequestCreatedEventData {
  serviceRequestId: string;
  userId: string;
}

export interface ServiceRequestStatusChangedEventData {
  serviceRequestId: string;
  userId: string;
  oldStatus: RequestStatus;
  newStatus: RequestStatus;
}

// Mapping utilities
export const StatusMapping = {
  toFrontend: (status: RequestStatus): FrontendStatus => {
    switch (status) {
      case "SUBMITTED":
      case "REVIEWED":
      case "MEETING_SCHEDULED":
      case "PROPOSAL_SENT":
      case "APPROVED":
        return "pending";
      case "IN_PROGRESS":
        return "in_progress";
      case "COMPLETED":
        return "completed";
      case "CANCELLED":
        return "cancelled";
      default:
        return "pending";
    }
  },
  
  toDatabase: (status: string): RequestStatus => {
    switch (status) {
      case "pending":
        return "SUBMITTED";
      case "in_progress":
        return "IN_PROGRESS";
      case "completed":
        return "COMPLETED";
      case "cancelled":
        return "CANCELLED";
      default:
        return "SUBMITTED";
    }
  }
};

export const PriorityMapping = {
  toFrontend: (priority: RequestPriority): FrontendPriority => {
    switch (priority) {
      case "LOW":
        return "low";
      case "MEDIUM":
        return "medium";
      case "HIGH":
        return "high";
      case "URGENT":
        return "urgent";
      default:
        return "medium";
    }
  },
  
  toDatabase: (priority: string): RequestPriority => {
    switch (priority.toUpperCase()) {
      case "LOW":
        return "LOW";
      case "MEDIUM":
        return "MEDIUM";
      case "HIGH":
        return "HIGH";
      case "URGENT":
        return "URGENT";
      default:
        return "MEDIUM";
    }
  }
};