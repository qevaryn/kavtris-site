# Qevaryn Systems

Site comercial da Qevaryn Systems, empresa de tecnologia focada em sistemas web, aplicações mobile, automação de processos, integrações, ferramentas internas, MVPs digitais, plataformas empresariais e qualidade de software.

A Qevaryn Systems atua como operadora independente e integra a Rede Qualidade é Vida como identidade institucional secundária.

Mensagem principal da experiência atual:

> Tecnologia forte por trás. Simplicidade na frente.

O site comunica em duas camadas: primeiro explica problemas e soluções em linguagem simples para empresas de qualquer dimensão; depois revela detalhes técnicos em componentes opcionais para equipas que precisam avaliar segurança, arquitetura, integrações, qualidade e suporte.

Resumo de posicionamento:

> Soluções de software adaptadas à realidade de cada empresa — desde uma ferramenta simples até uma plataforma completa.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Lucide React
- React Hook Form + Zod
- Route Handler do Next.js
- Resend
- Playwright
- Vitest
- ESLint
- GitHub Actions

## Serviços atuais

- Sistemas e aplicações web
- Automação de processos
- Ferramentas internas e painéis
- Integrações e APIs
- QA e qualidade de software
- MVPs e protótipos digitais
- Manutenção, suporte e melhoria contínua

O site não apresenta hardware, robótica, automação industrial, máquinas físicas ou produtos ainda não construídos.

A Qevaryn pode desenvolver software que funcione sozinho ou ligado a equipamentos acessíveis e fáceis de encontrar, como QR Codes, NFC, tablets, leitores de código de barras, impressoras comuns, câmaras, sensores simples ou equipamentos já existentes no cliente. Esses elementos são apresentados apenas como extensão opcional do software.

## Relação institucional

A Qevaryn Systems é apresentada como marca principal e operadora comercial.

A Rede Qualidade é Vida aparece apenas como identificação institucional secundária. A página `/rede-qualidade-e-vida` explica que a rede não é uma única empresa operacional, que cada participante deverá manter responsabilidades próprias e que projetos conjuntos dependerão de contratos específicos.

Os textos institucionais e legais são provisórios. A estrutura jurídica e contratual da rede deve ser validada por profissionais especializados em Portugal antes de qualquer publicação comercial definitiva.

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

## Ativos de marca

As imagens usadas pelo site estão em `public/images`:

- `qevaryn-systems-logo.png`
- `qualidade-e-vida-logo.png`
- `qualidade-e-vida-seal.png`
- `email-logo.png`
- `travel-project.jpg`
- `insurance-project.jpg`
- `tax-services-project.jpg`
- `gabriel.webp`

`qevaryn-systems-logo.png` é a marca principal do site. `qualidade-e-vida-logo.png` é usada de forma secundária na secção institucional da rede, sem o sufixo TECH/SYSTEMS. `email-logo.png` usa a marca Qevaryn Systems para o email comercial.

A imagem Open Graph está em `src/app/opengraph-image.png` e a imagem de Twitter/X está em `src/app/twitter-image.png`, ambas com 1200 × 630 px.

O favicon atual pode continuar provisório se não existir uma versão quadrada aprovada apenas com o símbolo Qevaryn.

## Estrutura

```text
src/
  app/
  components/
    layout/
    sections/
    ui/
  data/
  emails/
  lib/
tests/
public/images/
```

As secções principais da homepage são: Header, Hero, faixa de competências, problemas interativos, exemplos de soluções, demonstração interativa, simulador de solução, processo, detalhes para empresas, produtos-conceito, experiência, Rede Qualidade é Vida, sobre e contacto.

## Sistema visual responsivo

A landing page usa navy, dourado, branco e fundos claros alternados para separar visualmente as secções.

Em mobile:

- problemas usam cartões clicáveis em grelha responsiva;
- exemplos de soluções usam detalhes técnicos opcionais;
- a demonstração alterna entre computador e telemóvel;
- o simulador usa perguntas de negócio antes de traduzir para tecnologia;
- o processo usa etapas clicáveis com detalhes progressivos;
- projetos usam carrossel nativo horizontal com scroll-snap;
- o formulário usa campos em uma coluna com altura e fonte adequadas para toque.

As screenshots de auditoria visual são geradas pelos testes Playwright em `test-results/**/phase6-*.png`.

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

Para executar os testes Playwright contra uma URL publicada, use:

```bash
BASE_URL=https://url-publicada.vercel.app npm run test:e2e
```

O teste que valida erro de configuração do formulário é ignorado quando `BASE_URL` está definido para evitar envios reais em ambientes publicados.

## Segurança

O projeto define headers HTTP em `next.config.mjs`:

- `X-Content-Type-Options`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `X-Frame-Options`;
- `Content-Security-Policy`.

A CSP de produção não utiliza `unsafe-eval`. Em desenvolvimento, `unsafe-eval` é permitido apenas para compatibilidade com o servidor local do Next.js.

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

## Smoke test publicado

Existe um workflow manual `Production Smoke` em `.github/workflows/smoke.yml`. Execute-o no GitHub Actions informando a URL publicada no input `base_url`. O workflow não usa secrets e não envia emails reais automaticamente.

## Teste manual do email

Após o deploy:

1. Abra a página publicada.
2. Preencha o formulário com dados de teste.
3. Confirme no painel do Resend que o envio foi aceite.
4. Confirme no cliente de email que o email chegou com a logomarca Qevaryn Systems no topo.
5. Clique em responder e confirme que o destinatário da resposta é o email informado no formulário.

Os testes automatizados não enviam emails reais: os testes unitários usam mock do Resend e os testes Playwright interceptam a rota quando validam sucesso.
