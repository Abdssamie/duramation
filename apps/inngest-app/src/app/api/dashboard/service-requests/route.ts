import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getInternalUserId } from '@/lib/helpers/getInternalUserId';
import { ClerkUserId, InternalUserId } from "@/types/user";
import { ServiceRequestsResponse, ServiceRequest } from '@/types/dashboard-metrics';
import { Redis } from '@upstash/redis';
import prisma from '@/lib/prisma';
import { inngest } from '@/inngest/client';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_TTL = 300; // 5 minutes

async function fetchServiceRequestsFromDatabase(userId: InternalUserId): Promise<ServiceRequestsResponse> {
  // Fetch actual service requests from database
  const serviceRequests = await prisma.serviceRequest.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          clerk_id: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Map database records to frontend format
  const mappedRequests: ServiceRequest[] = serviceRequests.map(req => ({
    id: req.id,
    title: req.title,
    status: mapDatabaseStatusToFrontend(req.status),
    priority: req.priority.toLowerCase() as 'low' | 'medium' | 'high' | 'urgent',
    requestedBy: req.user.email || 'Unknown User',
    assignedTo: req.status === 'IN_PROGRESS' ? 'Support Team' : undefined,
    createdAt: req.createdAt.toISOString(),
    updatedAt: req.updatedAt.toISOString(),
    description: req.description,
    category: 'automation', // Default category for now
    estimatedHours: req.estimatedHours || undefined,
  }));

  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const completedThisMonth = mappedRequests.filter(req => 
    req.status === 'completed' && 
    new Date(req.updatedAt) >= currentMonthStart
  ).length;

  return {
    requests: mappedRequests,
    totalCount: mappedRequests.length,
    pendingCount: mappedRequests.filter(req => req.status === 'pending').length,
    inProgressCount: mappedRequests.filter(req => req.status === 'in_progress').length,
    completedThisMonth
  };
}

function mapDatabaseStatusToFrontend(status: string): 'pending' | 'in_progress' | 'completed' | 'cancelled' {
  switch (status) {
    case 'SUBMITTED':
    case 'REVIEWED':
    case 'MEETING_SCHEDULED':
    case 'PROPOSAL_SENT':
    case 'APPROVED':
      return 'pending';
    case 'IN_PROGRESS':
      return 'in_progress';
    case 'COMPLETED':
      return 'completed';
    case 'CANCELLED':
      return 'cancelled';
    default:
      return 'pending';
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = await getInternalUserId(clerkUserId as ClerkUserId);
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const cacheKey = `service-requests:${userId}`;

    // Try to get from cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Fetch from database
    const serviceRequests = await fetchServiceRequestsFromDatabase(userId);

    // Cache the result
    await redis.setex(cacheKey, CACHE_TTL, serviceRequests);

    return NextResponse.json(serviceRequests);
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = await getInternalUserId(clerkUserId as ClerkUserId);
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, businessProcess, desiredOutcome, priority = 'MEDIUM' } = body;

    // Validate required fields
    if (!title || !description || !businessProcess || !desiredOutcome) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, businessProcess, desiredOutcome' },
        { status: 400 }
      );
    }

    // Create service request in database
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        userId,
        title,
        description,
        businessProcess,
        desiredOutcome,
        priority,
        status: 'SUBMITTED',
      },
    });

    // Invalidate cache
    const cacheKey = `service-requests:${userId}`;
    await redis.del(cacheKey);

    // Trigger Inngest event for service request creation
    await inngest.send({
      name: 'service-request/created',
      data: {
        serviceRequestId: serviceRequest.id,
        userId,
      },
    });

    return NextResponse.json(serviceRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}