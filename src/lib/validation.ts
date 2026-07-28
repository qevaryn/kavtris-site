import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Indique o seu nome.').max(80, 'O nome está demasiado longo.'),
  company: z.string().trim().max(120, 'A empresa está demasiado longa.'),
  email: z.string().trim().email('Indique um email válido.').max(160, 'O email está demasiado longo.'),
  service: z.string().trim().min(1, 'Selecione um serviço.'),
  timeline: z.string().trim().min(1, 'Indique o prazo desejado.'),
  message: z
    .string()
    .trim()
    .min(20, 'Descreva o projeto com mais detalhe.')
    .max(1200, 'A mensagem excede o limite permitido.'),
  privacyConsent: z.boolean().refine((value) => value, {
    message: 'É necessário aceitar a Política de Privacidade.'
  }),
  honeypot: z.string().max(0).optional().default('')
});

export type ContactFormValues = z.infer<typeof contactSchema>;
