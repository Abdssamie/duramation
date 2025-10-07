import { NextRequest, NextResponse } from "next/server";
import { ServiceRequestService } from "@/services/service-request.service";
import { authenticateUser, isAuthError } from "@/lib/utils/auth";

export async function GET(_: NextRequest) {
  try {
    const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;

    const serviceRequests = await ServiceRequestService.getServiceRequests(userId);
    return NextResponse.json(serviceRequests);
  } catch (error) {
    console.error("Error fetching service requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
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
      return NextResponse.json(
        {
          error: "Missing required fields: title, description, businessProcess, desiredOutcome",
        },
        { status: 400 },
      );
    }

    const serviceRequest = await ServiceRequestService.createServiceRequest(userId, body);
    return NextResponse.json(serviceRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating service request:", error);

    if (error instanceof Error && error.message.includes("future")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
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
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 },
      );
    }

    const updatedRequest = await ServiceRequestService.updateServiceRequest(userId, body);
    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating service request:", error);

    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
