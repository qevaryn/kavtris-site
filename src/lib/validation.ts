import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Indique o seu nome.').max(80, 'O nome está demasiado longo.'),
  company: z.string().trim().max(120, 'A empresa está demasiado longa.'),
  email: z.string().trim().email('Indique um email válido.').max(160, 'O email está demasiado longo.'),
  phone: z.string().trim().max(40, 'O telefone está demasiado longo.').optional().default(''),
  service: z.string().trim().min(1, 'Selecione o tipo de necessidade.'),
  message: z
    .string()
    .trim()
    .min(20, 'Descreva o problema com mais detalhe.')
    .max(1200, 'A mensagem excede o limite permitido.'),
  privacyConsent: z.boolean().refine((value) => value, {
    message: 'É necessário aceitar a Política de Privacidade.'
  }),
  honeypot: z.string().max(0).optional().default('')
});

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFormValues = z.output<typeof contactSchema>;
