import { NextResponse } from 'next/server';
import { handleCompanyBootstrap } from '@/server/identity/company-controller';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const result = await handleCompanyBootstrap(request);

  return NextResponse.json(result.body, {
    status: result.status,
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
