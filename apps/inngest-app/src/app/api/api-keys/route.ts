import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticateUser, isAuthError } from '@/lib/utils/auth';
import { generateApiKey, hashApiKey } from '@/lib/utils/api-key';

// GET - List all API keys for the authenticated user
export async function GET() {
  const authResult = await authenticateUser();

  if (isAuthError(authResult)) {
    return authResult;
  }

  const { userId } = authResult;

  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        lastUsedAt: true,
        expiresAt: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: apiKeys,
    });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

// POST - Create a new API key
export async function POST(request: NextRequest) {
  const authResult = await authenticateUser();

  if (isAuthError(authResult)) {
    return authResult;
  }

  const { userId } = authResult;

  try {
    const body = await request.json();
    const { name, expiresAt } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    // Generate the API key
    const apiKey = generateApiKey();
    const hashedKey = hashApiKey(apiKey);

    // Store in database
    const newKey = await prisma.apiKey.create({
      data: {
        userId,
        name,
        key: hashedKey,
        keyHash: hashedKey, // Store hash for searching
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      select: {
        id: true,
        name: true,
        lastUsedAt: true,
        expiresAt: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Return the plain API key only once (it won't be shown again)
    return NextResponse.json({
      success: true,
      data: {
        ...newKey,
        key: apiKey, // Only returned on creation
      },
      message: 'API key created successfully. Save it now - you won\'t be able to see it again!',
    });
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}
