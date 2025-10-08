import { NextRequest, NextResponse } from "next/server";
import { ServiceRequestService } from "@/services/service-request.service";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";
import type { 
    ServiceRequestListResponse, 
    ServiceRequestCreateResponse, 
    ServiceRequestUpdateResponse 
} from "@duramation/shared";

export async function GET() {
  try {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;

    const serviceRequests = await ServiceRequestService.getServiceRequests(userId);
    
    const response: ServiceRequestListResponse = {
      success: true,
      data: serviceRequests,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching service requests:", error);
    const errorResponse: ServiceRequestListResponse = {
      success: false,
      error: "Internal server error",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;

    const body = await request.json();

    // Validate payload
    if (!ServiceRequestService.validateCreatePayload(body)) {
      const errorResponse: ServiceRequestCreateResponse = {
        success: false,
        error: "Missing required fields: title, description, businessProcess, desiredOutcome",
        code: "VALIDATION_ERROR",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const serviceRequest = await ServiceRequestService.createServiceRequest(userId, body);
    
    const response: ServiceRequestCreateResponse = {
      success: true,
      data: serviceRequest,
      message: "Service request created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating service request:", error);

    if (error instanceof Error && error.message.includes("future")) {
      const errorResponse: ServiceRequestCreateResponse = {
        success: false,
        error: error.message,
        code: "VALIDATION_ERROR",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const errorResponse: ServiceRequestCreateResponse = {
      success: false,
      error: "Internal server error",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;

    const body = await request.json();

    // Validate payload
    if (!ServiceRequestService.validateUpdatePayload(body)) {
      const errorResponse: ServiceRequestUpdateResponse = {
        success: false,
        error: "Missing required field: id",
        code: "VALIDATION_ERROR",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const updatedRequest = await ServiceRequestService.updateServiceRequest(userId, body);
    
    const response: ServiceRequestUpdateResponse = {
      success: true,
      data: updatedRequest,
      message: "Service request updated successfully",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating service request:", error);

    if (error instanceof Error && error.message.includes("not found")) {
      const errorResponse: ServiceRequestUpdateResponse = {
        success: false,
        error: error.message,
        code: "NOT_FOUND",
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const errorResponse: ServiceRequestUpdateResponse = {
      success: false,
      error: "Internal server error",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
