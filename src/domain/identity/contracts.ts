import { z } from 'zod';

export const companyBootstrapSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    nif: z.string().trim().min(9).max(32).nullable().optional()
  })
  .strict();

export type CompanyBootstrapInput = z.infer<typeof companyBootstrapSchema>;
