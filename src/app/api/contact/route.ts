import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { isContactRateLimited } from '@/server/contact/contact-rate-limit';
import { processContactRequest } from '@/server/contact/contact.service';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    if (isContactRateLimited(request)) {
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

    await processContactRequest(parsed.data);

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
