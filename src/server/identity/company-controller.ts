import 'server-only';

import { companyBootstrapSchema } from '@/domain/identity/contracts';
import { IdentityError } from '@/domain/identity/errors';
import { getAuth } from '@/server/auth/auth';
import { bootstrapCompany } from '@/server/identity/tenant-service';
import { readIdentityJsonBody } from '@/server/identity/request';

export async function handleCompanyBootstrap(request: Request) {
  const session = await getAuth().api.getSession({ headers: request.headers });

  if (!session) {
    return response(401, 'AUTHENTICATION_REQUIRED', 'Inicie sessão para continuar.');
  }

  const bodyResult = await readIdentityJsonBody(request);

  if (!bodyResult.ok) {
    const status =
      bodyResult.reason === 'payload-too-large'
        ? 413
        : bodyResult.reason === 'unsupported-media-type'
          ? 415
          : 400;
    return response(status, 'INVALID_REQUEST', 'O pedido não é válido.');
  }

  const parsed = companyBootstrapSchema.safeParse(bodyResult.body);

  if (!parsed.success) {
    return response(400, 'INVALID_REQUEST', 'Os dados da empresa não são válidos.');
  }

  try {
    const context = await bootstrapCompany(session.user.id, parsed.data);
    return {
      status: 201,
      body: { ok: true as const, data: context }
    };
  } catch (error) {
    if (error instanceof IdentityError) {
      const status = error.code === 'COMPANY_ALREADY_EXISTS' ? 409 : 403;
      return response(status, error.code, error.message);
    }

    return response(500, 'INVALID_REQUEST', 'Não foi possível concluir o pedido.');
  }
}

function response(status: number, code: string, message: string) {
  return {
    status,
    body: {
      ok: false as const,
      error: { code, message }
    }
  };
}
