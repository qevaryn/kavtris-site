import { isContactRateLimited } from '@/server/contact/contact-rate-limit';
import { processContactRequest } from '@/server/contact/contact.service';
import { validateContactRequest } from '@/server/contact/contact-validation';
import {
  contactErrorResponse,
  contactInvalidRequestResponse,
  contactRateLimitedResponse,
  contactSuccessResponse,
  contactValidationErrorResponse,
  type ContactHttpResult
} from '@/server/contact/contact-mapper';

export async function handleContactPost(request: Request): Promise<ContactHttpResult> {
  try {
    if (isContactRateLimited(request)) {
      return contactRateLimitedResponse();
    }

    const body = await request.json();
    const validation = validateContactRequest(body);

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
