# Qualidade é Vida Tech

Site institucional da Qualidade é Vida Tech, especializada em QA Manual, automação de testes, análise de requisitos e melhoria contínua da qualidade de software.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Lucide React
- React Hook Form + Zod
- Route Handler do Next.js
- Resend
- Playwright
- ESLint
- GitHub Actions

## Instalação

```bash
npm install
```

## Execução local

```bash
npm run dev
```

Depois abra `http://localhost:3000`.

## Variáveis de ambiente

Crie um ficheiro `.env.local` com base no `.env.example`:

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=Qualidade é Vida Tech <onboarding@resend.dev>
RESEND_TO_EMAIL=contacto@qualidadeevidatech.pt
NEXT_PUBLIC_SITE_URL=https://qualidadeevidatech.pt
```

Sem `RESEND_API_KEY`, o route handler de contacto funciona em modo mock para desenvolvimento e testes locais.

## Imagens

As imagens usadas pelo site estão em `public/images`:

- `travel-project.jpg`
- `insurance-project.jpg`
- `tax-services-project.jpg`
- `gabriel.jpg`

Substitua estes ficheiros mantendo os mesmos nomes para trocar as imagens sem alterar os componentes.

## Scripts

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

## Deploy

O projeto está preparado para Vercel. Configure as variáveis de ambiente na Vercel antes de publicar, especialmente `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` e `NEXT_PUBLIC_SITE_URL`.
