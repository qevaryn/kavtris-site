export type IdentityErrorCode =
  | 'AUTHENTICATION_REQUIRED'
  | 'AUTHORIZATION_DENIED'
  | 'COMPANY_ALREADY_EXISTS'
  | 'INVALID_REQUEST';

export class IdentityError extends Error {
  constructor(
    public readonly code: IdentityErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'IdentityError';
  }
}
