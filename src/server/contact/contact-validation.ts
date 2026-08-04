import { contactSchema, type ContactFormValues } from '@/domain/contact';

export type ContactValidationResult =
  | { success: true; data: ContactFormValues }
  | { success: false; issues: unknown };

export function validateContactRequest(body: unknown): ContactValidationResult {
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return {
      success: false,
      issues: parsed.error.flatten()
    };
  }

  return {
    success: true,
    data: parsed.data
  };
}
