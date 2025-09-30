import { NextResponse } from 'next/server';
import { getTemplateFields } from '@duramation/shared';
import { auth } from '@clerk/nextjs/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const user = await auth();

  if (!user || !user.userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { templateId } = await params;
    const templateFields = await getTemplateFields(templateId);

    console.log('Fetched template fields:', templateFields);
    
    return NextResponse.json({ fields: templateFields });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch template fields' },
      { status: 500 }
    );
  }
}
