import { NextResponse } from 'next/server';
import { sendUpdateToUser } from '@/lib/redis';

const INNGEST_WEBHOOK_SECRET = process.env.INNGEST_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!INNGEST_WEBHOOK_SECRET || secret !== INNGEST_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const payload = await request.json();
    const { userId, ...data } = payload;

    if (!userId) {
      return new Response('Missing userId in payload', { status: 400 });
    }

    await sendUpdateToUser(userId, data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return new Response(`Internal Server Error: ${error}`, { status: 500 });
  }
}
