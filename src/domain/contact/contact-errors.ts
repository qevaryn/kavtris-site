export const contactResponseMessages = {
  rateLimited: 'Foram enviados demasiados pedidos. Tente novamente mais tarde.',
  validationInvalid: 'Validação inválida.',
  invalidRequest: 'Pedido inválido.',
  emailNotConfigured: 'O formulário não está configurado para envio neste ambiente.',
  processingFailed: 'Não foi possível processar o pedido.'
} as const;

export type ContactErrorCode =
  | 'INVALID_REQUEST'
  | 'SPAM_REJECTED'
  | 'RATE_LIMITED'
  | 'EMAIL_CONFIGURATION_ERROR'
  | 'EMAIL_PROVIDER_ERROR'
  | 'INTERNAL_ERROR';
