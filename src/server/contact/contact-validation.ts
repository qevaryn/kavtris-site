import {
  contactSchema,
  type ContactFieldName,
  type ContactFormValues,
  type ContactValidationIssues
} from '@/domain/contact/contracts';

export type ContactValidationResult =
  | { success: true; data: ContactFormValues }
  | { success: false; issues: ContactValidationIssues };

export function validateContactRequest(body: unknown): ContactValidationResult {
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return {
      success: false,
      issues: normalizeContactValidationIssues(parsed.error.flatten())
    };
  }

  return {
    success: true,
    data: parsed.data
  };
}

function normalizeContactValidationIssues(issues: {
  formErrors: string[];
  fieldErrors: Partial<Record<ContactFieldName, string[] | undefined>>;
}): ContactValidationIssues {
  return {
    formErrors: [...issues.formErrors],
    fieldErrors: Object.fromEntries(
      Object.entries(issues.fieldErrors)
        .filter((entry): entry is [ContactFieldName, string[]] => Array.isArray(entry[1]))
        .map(([field, errors]) => [field, [...errors]])
    ) as ContactValidationIssues['fieldErrors']
  };
}
