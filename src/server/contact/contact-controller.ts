import { isContactRateLimited } from '@/server/contact/contact-rate-limit';
import { readContactJsonBody } from '@/server/contact/contact-request';
import { processContactRequest } from '@/server/contact/contact.service';
import { validateContactRequest } from '@/server/contact/contact-validation';
import {
  contactErrorResponse,
  contactInvalidRequestResponse,
  contactPayloadTooLargeResponse,
  contactRateLimitedResponse,
  contactSuccessResponse,
  contactUnsupportedMediaTypeResponse,
  contactValidationErrorResponse,
  type ContactHttpResult
} from '@/server/contact/contact-mapper';

export async function handleContactPost(request: Request): Promise<ContactHttpResult> {
  try {
    if (isContactRateLimited(request)) {
      return contactRateLimitedResponse();
    }

    const requestBody = await readContactJsonBody(request);

    if (!requestBody.ok) {
      if (requestBody.reason === 'unsupported-media-type') {
        return contactUnsupportedMediaTypeResponse();
      }

      if (requestBody.reason === 'payload-too-large') {
        return contactPayloadTooLargeResponse();
      }

      return contactInvalidRequestResponse();
    }

    const validation = validateContactRequest(requestBody.body);

    if (!validation.success) {
      return contactValidationErrorResponse(validation.issues);
    }

    if (validation.data.honeypot) {
      return contactInvalidRequestResponse();
    }

    await processContactRequest(validation.data);

    return contactSuccessResponse();
  } catch (error) {
    return contactErrorResponse(error);
  }
}
