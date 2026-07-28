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

`RESEND_TO_EMAIL` é o endereço que receberá os pedidos enviados pelo formulário. Exemplo genérico:

```bash
RESEND_TO_EMAIL=destinatario@example.com
```

O email interno usa `public/images/email-logo.png` como logomarca inline por CID. O envio real mantém o email do cliente apenas em `replyTo`, para que a resposta no cliente de email seja direcionada ao potencial cliente.

## Imagens

As imagens usadas pelo site estão em `public/images`:

- `travel-project.jpg`
- `insurance-project.jpg`
- `tax-services-project.jpg`
- `gabriel.webp`
- `logo-qualidade-e-vida-tech.png`
- `email-logo.png`

Substitua estes ficheiros mantendo os mesmos nomes para trocar as imagens sem alterar os componentes.

O logótipo final aprovado está em `logo-qualidade-e-vida-tech.png` e a fotografia aprovada do fundador está em `gabriel.webp`. A imagem `email-logo.png` é uma versão PNG otimizada da mesma logomarca para incorporação inline no email por CID.

O favicon atual continua provisório porque ainda não existe uma versão quadrada aprovada apenas com o símbolo da marca. A imagem de partilha Open Graph ainda é provisória.

## Textos legais

As páginas de Política de Privacidade e Política de Cookies são versões provisórias. Os textos legais devem ser revistos antes da publicação comercial.

## Scripts

```bash
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run test:e2e
```

## Deploy

O projeto está preparado para Vercel. Configure as variáveis de ambiente na Vercel antes de publicar, especialmente `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` e `NEXT_PUBLIC_SITE_URL`.

Na Vercel, configure:

```bash
RESEND_API_KEY=<api-key-do-resend>
RESEND_FROM_EMAIL=<remetente-validado-no-resend>
RESEND_TO_EMAIL=destinatario@example.com
NEXT_PUBLIC_SITE_URL=<url-publica-do-site>
CONTACT_FORM_MOCK=false
```

No Resend, confirme que o domínio/remetente usado em `RESEND_FROM_EMAIL` está validado antes de testar o formulário publicado.

## Teste manual do email

Após o deploy:

1. Abra a página publicada.
2. Preencha o formulário com dados de teste.
3. Confirme no painel do Resend que o envio foi aceite.
4. Confirme no Outlook que o email chegou com a logomarca no topo.
5. Clique em responder e confirme que o destinatário da resposta é o email informado no formulário.

Os testes automatizados não enviam emails reais: os testes unitários usam mock do Resend e os testes Playwright interceptam a rota quando validam sucesso.
