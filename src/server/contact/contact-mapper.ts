import type { ContactApiResponse } from '@/domain/contact';
import { contactResponseMessages } from '@/domain/contact';

export type ContactHttpResult = {
  status: number;
  body: ContactApiResponse;
  headers?: HeadersInit;
};

export function contactSuccessResponse(): ContactHttpResult {
  return {
    status: 200,
    body: { ok: true }
  };
}

export function contactRateLimitedResponse(retryAfterSeconds = 1): ContactHttpResult {
  return {
    status: 429,
    headers: { 'Retry-After': String(retryAfterSeconds) },
    body: { ok: false, message: contactResponseMessages.rateLimited }
  };
}

export function contactValidationErrorResponse(issues: unknown): ContactHttpResult {
  return {
    status: 400,
    body: {
      ok: false,
      message: contactResponseMessages.validationInvalid,
      issues
    }
  };
}

export function contactInvalidRequestResponse(): ContactHttpResult {
  return {
    status: 400,
    body: { ok: false, message: contactResponseMessages.invalidRequest }
  };
}

export function contactPayloadTooLargeResponse(): ContactHttpResult {
  return {
    status: 413,
    body: { ok: false, message: contactResponseMessages.payloadTooLarge }
  };
}

export function contactUnsupportedMediaTypeResponse(): ContactHttpResult {
  return {
    status: 415,
    body: { ok: false, message: contactResponseMessages.unsupportedMediaType }
  };
}

export function contactErrorResponse(error: unknown): ContactHttpResult {
  if (error instanceof Error && error.message === 'CONTACT_EMAIL_NOT_CONFIGURED') {
    return contactEmailNotConfiguredResponse();
  }

  if (error instanceof Error && error.message === 'CONTACT_EMAIL_ASSET_NOT_CONFIGURED') {
    return contactEmailNotConfiguredResponse();
  }

  return {
    status: 500,
    body: { ok: false, message: contactResponseMessages.processingFailed }
  };
}

function contactEmailNotConfiguredResponse(): ContactHttpResult {
  return {
    status: 503,
    body: { ok: false, message: contactResponseMessages.emailNotConfigured }
  };
}
