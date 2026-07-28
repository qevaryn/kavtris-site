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
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TO_EMAIL=
NEXT_PUBLIC_SITE_URL=
CONTACT_FORM_MOCK=false
```

O formulário só pode usar mock em desenvolvimento/teste quando `CONTACT_FORM_MOCK=true`. Em produção, configure `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` e `NEXT_PUBLIC_SITE_URL`.

## Imagens

As imagens usadas pelo site estão em `public/images`:

- `travel-project.jpg`
- `insurance-project.jpg`
- `tax-services-project.jpg`
- `gabriel.jpg`
- `logo-qualidade-e-vida-tech.svg`

Substitua estes ficheiros mantendo os mesmos nomes para trocar as imagens sem alterar os componentes.

O logótipo SVG atual é provisório até existir um ficheiro final aprovado. A imagem `gabriel.jpg` existe no repositório, mas a secção do fundador usa o placeholder “GS” até ser fornecida uma fotografia aprovada.

## Textos legais

As páginas de Política de Privacidade e Política de Cookies são versões provisórias. Os textos legais devem ser revistos antes da publicação comercial.

## Scripts

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

## Deploy

O projeto está preparado para Vercel. Configure as variáveis de ambiente na Vercel antes de publicar, especialmente `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` e `NEXT_PUBLIC_SITE_URL`.
