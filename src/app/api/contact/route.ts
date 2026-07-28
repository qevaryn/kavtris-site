import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/resend';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const submissions = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'local';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = submissions.get(key);

  if (!current || current.resetAt <= now) {
    submissions.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request);

    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { ok: false, message: 'Foram enviados demasiados pedidos. Tente novamente mais tarde.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Validação inválida.',
          issues: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    if (parsed.data.honeypot) {
      return NextResponse.json({ ok: false, message: 'Pedido inválido.' }, { status: 400 });
    }

    await sendContactEmail(parsed.data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'CONTACT_EMAIL_NOT_CONFIGURED') {
      return NextResponse.json(
        { ok: false, message: 'O formulário não está configurado para envio neste ambiente.' },
        { status: 503 }
      );
    }

    if (error instanceof Error && error.message === 'CONTACT_EMAIL_ASSET_NOT_CONFIGURED') {
      return NextResponse.json(
        { ok: false, message: 'O formulário não está configurado para envio neste ambiente.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: false, message: 'Não foi possível processar o pedido.' }, { status: 500 });
  }
}
