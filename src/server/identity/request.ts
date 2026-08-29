export const IDENTITY_REQUEST_MAX_BYTES = 8_192;

export type IdentityRequestBodyResult =
  | { ok: true; body: unknown }
  | {
      ok: false;
      reason: 'unsupported-media-type' | 'malformed-json' | 'payload-too-large';
    };

export async function readIdentityJsonBody(
  request: Request
): Promise<IdentityRequestBodyResult> {
  if (!isJsonContentType(request.headers.get('content-type'))) {
    return { ok: false, reason: 'unsupported-media-type' };
  }

  const contentLength = Number(request.headers.get('content-length'));

  if (Number.isFinite(contentLength) && contentLength > IDENTITY_REQUEST_MAX_BYTES) {
    return { ok: false, reason: 'payload-too-large' };
  }

  const reader = request.body?.getReader();

  if (!reader) {
    return { ok: true, body: null };
  }

  const chunks: Uint8Array[] = [];
  let byteCount = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    byteCount += value.byteLength;

    if (byteCount > IDENTITY_REQUEST_MAX_BYTES) {
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

  try {
    return {
      ok: true,
      body: JSON.parse(new TextDecoder().decode(body)) as unknown
    };
  } catch {
    return { ok: false, reason: 'malformed-json' };
  }
}

function isJsonContentType(contentType: string | null) {
  return contentType?.split(';')[0]?.trim().toLowerCase() === 'application/json';
}
