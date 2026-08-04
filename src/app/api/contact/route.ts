import { NextResponse } from 'next/server';
import { handleContactPost } from '@/server/contact/contact-controller';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const result = await handleContactPost(request);

  return NextResponse.json(result.body, { status: result.status });
}
