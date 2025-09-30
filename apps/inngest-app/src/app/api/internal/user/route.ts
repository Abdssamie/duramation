import { NextResponse } from 'next/server';
import { getInternalUser } from '@/lib/helpers/getInternalUser';

const INTERNAL_API_SECRET = process.env.INTERNAL_API_SECRET;

export async function POST(request: Request) {
  const secret = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!INTERNAL_API_SECRET || secret !== INTERNAL_API_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { clerkId } = await request.json();
    
    if (!clerkId) {
      return new Response('Missing clerkId in payload', { status: 400 });
    }
  
    const user = await getInternalUser(clerkId);
  
    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return NextResponse.json({ internalUserId: user.id });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
