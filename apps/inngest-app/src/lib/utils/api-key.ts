import crypto from 'crypto';
import prisma from '@/lib/prisma';

/**
 * Generate a secure API key
 * Format: dura_live_<random_string>
 */
export function generateApiKey(): string {
  const randomBytes = crypto.randomBytes(32);
  const key = randomBytes.toString('base64url');
  return `dura_live_${key}`;
}

/**
 * Hash an API key for storage
 */
export function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

/**
 * Validate and authenticate an API key
 * Returns the user ID if valid, null otherwise
 */
export async function authenticateApiKey(apiKey: string): Promise<string | null> {
  if (!apiKey || !apiKey.startsWith('dura_live_')) {
    return null;
  }

  const hashedKey = hashApiKey(apiKey);

  try {
    const keyRecord = await prisma.apiKey.findUnique({
      where: {
        key: hashedKey,
        isActive: true,
      },
      select: {
        userId: true,
        expiresAt: true,
      },
    });

    if (!keyRecord) {
      return null;
    }

    // Check if key is expired
    if (keyRecord.expiresAt && keyRecord.expiresAt < new Date()) {
      return null;
    }

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { key: hashedKey },
      data: { lastUsedAt: new Date() },
    });

    return keyRecord.userId;
  } catch (error) {
    console.error('Error authenticating API key:', error);
    return null;
  }
}
