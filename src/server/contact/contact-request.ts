export const CONTACT_REQUEST_MAX_BYTES = 16_384;

export type ContactRequestBodyResult =
  | { ok: true; body: unknown }
  | { ok: false; reason: 'unsupported-media-type' | 'malformed-json' | 'payload-too-large' };

export async function readContactJsonBody(request: Request): Promise<ContactRequestBodyResult> {
  if (!isJsonContentType(request.headers.get('content-type'))) {
    return { ok: false, reason: 'unsupported-media-type' };
  }

  const body = await readBodyWithinLimit(request);

  if (!body.ok) {
    return body;
  }

  try {
    return { ok: true, body: JSON.parse(body.text) as unknown };
  } catch {
    return { ok: false, reason: 'malformed-json' };
  }
}

function isJsonContentType(contentType: string | null) {
  return contentType
    ?.split(';')[0]
    ?.trim()
    .toLowerCase() === 'application/json';
}

async function readBodyWithinLimit(
  request: Request
): Promise<{ ok: true; text: string } | { ok: false; reason: 'payload-too-large' }> {
  const reader = request.body?.getReader();

  if (!reader) {
    return { ok: true, text: '' };
  }

  const chunks: Uint8Array[] = [];
  let byteCount = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    byteCount += value.byteLength;

    // Transport safety limit: this caps raw request bytes before JSON parsing.
    // Domain field limits remain owned by the shared contact Zod schema.
    if (byteCount > CONTACT_REQUEST_MAX_BYTES) {
      await reader.cancel();
      return { ok: false, reason: 'payload-too-large' };
    }

    chunks.push(value);
  }

  const body = new Uint8Array(byteCount);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { ok: true, text: new TextDecoder().decode(body) };
}
