import { describe, expect, it } from 'vitest';
import { ContactProcessingError, contactResponseMessages } from '@/domain/contact/contact-errors';
import { contactErrorResponse } from './contact-mapper';

describe('contactErrorResponse', () => {
  it('maps typed configuration errors to the safe 503 response', () => {
    expect(contactErrorResponse(new ContactProcessingError('EMAIL_CONFIGURATION_ERROR'))).toEqual({
      status: 503,
      body: {
        ok: false,
        message: contactResponseMessages.emailNotConfigured
      }
    });
  });

  it('maps typed provider errors to the safe generic 500 response', () => {
    expect(contactErrorResponse(new ContactProcessingError('EMAIL_PROVIDER_ERROR', {
      cause: new Error('provider raw detail')
    }))).toEqual({
      status: 500,
      body: {
        ok: false,
        message: contactResponseMessages.processingFailed
      }
    });
  });

  it('maps unknown Error values to the safe generic 500 response', () => {
    expect(contactErrorResponse(new Error('EMAIL_CONFIGURATION_ERROR'))).toEqual({
      status: 500,
      body: {
        ok: false,
        message: contactResponseMessages.processingFailed
      }
    });
  });

  it('maps non-Error thrown values to the safe generic 500 response', () => {
    expect(contactErrorResponse('EMAIL_CONFIGURATION_ERROR')).toEqual({
      status: 500,
      body: {
        ok: false,
        message: contactResponseMessages.processingFailed
      }
    });
  });
});
