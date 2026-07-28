import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { sendContactEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
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
  } catch {
    return NextResponse.json({ ok: false, message: 'Não foi possível processar o pedido.' }, { status: 500 });
  }
}
