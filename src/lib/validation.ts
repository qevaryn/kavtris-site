import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Indique o seu nome.').max(80, 'O nome está demasiado longo.'),
  company: z.string().trim().max(120, 'A empresa está demasiado longa.'),
  email: z.string().trim().email('Indique um email válido.').max(160, 'O email está demasiado longo.'),
  phone: z.string().trim().max(40, 'O telefone está demasiado longo.').optional().default(''),
  sector: z.string().trim().min(1, 'Indique o setor ou área do negócio.').max(120, 'O setor está demasiado longo.'),
  service: z.string().trim().min(1, 'Selecione o que está difícil.'),
  currentProcess: z
    .string()
    .trim()
    .min(10, 'Explique brevemente como funciona atualmente.')
    .max(700, 'A descrição do funcionamento atual está demasiado longa.'),
  affectedPeople: z.string().trim().min(1, 'Indique quem é afetado.').max(160, 'A resposta está demasiado longa.'),
  contactPreference: z.string().trim().min(1, 'Selecione a melhor forma de contacto.'),
  message: z
    .string()
    .trim()
    .min(20, 'Explique o que está difícil com mais detalhe.')
    .max(1200, 'A mensagem excede o limite permitido.'),
  privacyConsent: z.boolean().refine((value) => value, {
    message: 'É necessário aceitar a Política de Privacidade.'
  }),
  honeypot: z.string().max(0).optional().default('')
});

export type ContactFormInput = z.input<typeof contactSchema>;
export type ContactFormValues = z.output<typeof contactSchema>;
