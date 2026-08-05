# Fase 3.0A - Plano de Layout Responsivo e Arquitetura Comercial

## Escopo e objetivo
Este documento planeia a reformulação da homepage para desktop e mobile antes de novos assets visuais (incluindo hero dedicado de FieldOps). O foco é melhorar compreensão, reduzir fadiga e aumentar conversão, distinguindo claramente:
- Produtos por assinatura
- Solução personalizada

Sem implementação nesta fase.

## 1) Diagnóstico da homepage atual
A homepage atual é funcional e visualmente consistente, mas concentra muitas secções completas numa única narrativa contínua:
- Hero
- Credibilidade
- Descoberta de solução
- Produtos em destaque
- Processo
- Área empresarial
- Confiança/sobre
- Contacto

No mobile, esta sequência fica longa e exige demasiado scroll antes de uma decisão clara.

## 2) Pontos fortes a preservar
- Identidade visual premium navy/gold/white.
- Clareza de headings e hierarquia visual.
- CTAs visíveis em todas as zonas relevantes.
- Catálogo de produtos já organizado e consistente com as páginas de detalhe.
- Testes E2E existentes de navegação, overflow, mobile e jornada.

## 3) Problemas de desktop
- Navegação com redundância semântica ("O que resolvemos" e "Descobrir solução" levam à mesma secção).
- Homepage mistura descoberta, prova, catálogo e contacto sem bloco dedicado a planos.
- Muitos CTAs equivalentes competem na mesma sessão de leitura.
- Falta de separação comercial explícita entre assinatura e solução personalizada.

## 4) Problemas de mobile
- Hero ocupa altura relevante antes de o utilizador chegar ao conteúdo de escolha.
- Sequência longa de cartões completos (soluções + produtos + áreas técnicas).
- Menu com muitos itens para ecrãs curtos.
- Excesso de contexto secundário exposto cedo (fadiga cognitiva).

## 5) Jornada principal do visitante
Jornada alvo (curta):
1. Entender proposta de valor em 3-5 segundos.
2. Escolher caminho (produto por assinatura ou solução personalizada).
3. Ver 1-3 opções mais prováveis.
4. Perceber modelo de planos.
5. Executar CTA principal (demonstração/contato especialista).

## 6) Arquitetura de informação (target)
Dois caminhos comerciais explícitos:
- Caminho A: Produtos por assinatura (com planos Essencial/Crescimento/Empresarial)
- Caminho B: Solução personalizada (para requisitos fora dos produtos)

## 7) Wireframe textual desktop
1. Header simplificado
2. Hero orientado a valor + 2 CTAs
3. Credibilidade curta (4 pilares)
4. Escolha rápida (4 intenções)
5. Produtos em destaque (3 cartões)
6. Como funciona a assinatura (3 passos)
7. Planos (3 cartões com destaque em Crescimento)
8. Soluções para empresas (segurança, integrações, permissões, suporte)
9. Processo compacto
10. FAQ
11. Contacto curto
12. Footer

## 8) Wireframe textual mobile
1. Header compacto
2. Hero curto com CTA principal visível no primeiro ecrã
3. Credibilidade resumida
4. Escolha rápida
5. Até 2 produtos + botão "Ver todos"
6. Como funciona a assinatura (3 passos)
7. Crescimento primeiro e expandido
8. Empresarial compacto com CTA especialista
9. Essencial compacto/expansível
10. Processo compacto
11. FAQ em accordion
12. Contacto curto
13. Footer
14. CTA persistente pós-scroll (condicional de acessibilidade e contexto)

## 9) Ordem final das secções
Ordem proposta para homepage:
- Hero
- Credibilidade
- Escolha rápida
- Produtos em destaque
- Como funciona a assinatura
- Planos
- Soluções para empresas
- Processo
- FAQ
- Contacto

## 10) Navegação desktop
Itens alvo:
- Soluções
- Produtos
- Planos (entra apenas no PR 3, quando a secção #planos estiver implementada)
- Para empresas
- Contacto

CTA principal no header:
- Pedir demonstração

## 11) Navegação mobile
Itens alvo:
- Soluções
- Produtos
- Planos (entra apenas no PR 3, quando a secção #planos estiver implementada)
- Empresas
- Contacto

Regras:
- Priorizar labels curtas.
- Evitar duplicação de destino.
- Preservar Escape, foco e lock/unlock de scroll (acessibilidade).

## 12) Comportamento do Hero
Desktop:
- Mensagem principal + CTA principal + CTA secundário.
- Visual de apoio sem dominar a área.

Mobile:
- Título + explicação curta + CTA principal acima da dobra.
- Visual reduzido e opcionalmente abaixo do texto.

## 13) Comportamento dos produtos em destaque
Desktop:
- 3 cartões resumidos (problema + frase + botão).
- Sem excesso de detalhe técnico.

Mobile:
- Exibir no máximo 2 produtos na homepage.
- Botão "Ver todos os produtos" para continuar no catálogo.

## 14) Estrutura dos planos
Três planos sem preço nesta fase:
- Essencial
- Crescimento (Mais recomendado)
- Empresarial (Preço personalizado)

Todos os planos incluem obrigatoriamente:
- correções de erros
- atualizações de segurança
- manutenção da plataforma
- proteção básica dos dados
- suporte conforme o nível contratado

## 15) Diferenças entre os planos
Essencial:
- Entrada acessível
- Base funcional
- Operações pequenas
- Suporte padrão
- Atualizações de segurança/manutenção
- Sem posicionamento visual de plano inferior ou abandonado

Crescimento:
- Mais capacidade para equipas em crescimento
- Recursos adicionais conforme o produto
- Integrações avaliadas conforme a necessidade
- Suporte prioritário
- Atualizações regulares
- Destaque de recomendação

Empresarial:
- Operações maiores e múltiplas unidades
- Funcionalidades avançadas de acordo com o produto contratado
- Integrações avaliadas conforme a necessidade
- Implementação e acompanhamento definidos na proposta
- Formação
- Suporte prioritário
- Evolução planeada
- Preço personalizado
- CTA "Falar com um especialista"

## 16) Comportamento dos planos no mobile
- Crescimento: primeiro, aberto e completo.
- Empresarial: compacto com CTA de especialista.
- Essencial: compacto/expansível.
- Comparação longa: abrir sob demanda (accordion por grupos).
- A escolha do plano é sempre voluntária e explícita pelo utilizador.

## 17) Posicionamento de Crescimento
- Badge: "Mais recomendado".
- Maior contraste e prioridade visual.
- Plano recomendado para a maioria das empresas.
- Expandido por padrão no mobile apenas como orientação visual, sem seleção automática.

## 18) Posicionamento Empresarial
- Aparência premium distinta.
- Ênfase em capacidade, governança e acompanhamento.
- CTA orientado a conversa consultiva.

## 19) Distinção assinatura vs personalizada
Mensagem explícita na homepage:
- Assinatura: produto base + configuração + evolução contínua.
- Personalizada: quando produto padrão não cobre processo/requisitos.

## 20) CTAs por secção
- Hero: Encontrar uma solução / Ver produtos
- Escolha rápida: Ver solução sugerida
- Produtos: Ver produto / Ver todos
- Planos: Pedir demonstração / Falar com especialista
- Empresas: Ver informações para empresas
- Contacto: Enviar pedido

Regra: 1 CTA principal por secção; secundário opcional.

## 21) Regras de conteúdo curto para mobile
- Parágrafos curtos (2-3 linhas).
- Até 5 benefícios por cartão.
- Titles diretos e sem duplicação.
- Conteúdo secundário em accordion.
- Tap target mínimo adequado.
- Sem overflow horizontal.

## 21.1) Regras para CTA móvel persistente
- Aparece apenas depois de o utilizador sair do Hero.
- Desaparece ao chegar ao formulário de contacto.
- Não cobre botões, texto ou campos de formulário.
- Respeita safe-area de dispositivos iOS.
- Pode ser fechado manualmente.
- Não aparece quando o teclado virtual está aberto.
- Ocupa pouca altura vertical.
- Exibe apenas um botão.
- Texto do botão: "Pedir demonstração".

## 22) Componentes reutilizáveis
Reutilizar com ajuste:
- Header
- MobileMenu
- Hero
- CredibilityBar
- FeaturedProducts
- ProcessTimeline
- EnterprisePreview
- ContactForm
- SectionHeading
- Button

## 23) Componentes que precisam ser alterados
- Header e navigationLinks (reduzir/normalizar IA e CTA).
- Hero (altura mobile, densidade de texto, prioridades de CTA).
- SolutionFinder (transformar para escolha rápida menos extensa).
- FeaturedProducts (limite de itens no mobile + teaser para catálogo).
- ContactForm (versão curta para homepage).

## 24) Novos componentes necessários
- SubscriptionHowItWorksSection (3 passos antes dos planos).
- PlansSection (desktop + mobile variants).
- PlanCard (Essencial/Crescimento/Empresarial).
- PlanComparisonAccordion (mobile).
- FAQSection (accordion acessível).
- StickyMobileCTA (opcional, controlado por viewport/scroll).

## 25) Critérios de acessibilidade
- Navegação por teclado completa.
- Escape e foco restaurado no menu mobile.
- Contraste WCAG para textos/CTAs.
- Labels claros em formulários.
- Ordem semântica de headings.
- Estados focus-visible consistentes.

## 26) Critérios responsivos
Breakpoints-alvo obrigatórios:
- 1440
- 1280
- 1024
- 768
- 430
- 390
- 360
- 320

Condições:
- Zero overflow horizontal.
- Hero e navegação com prioridade de ação no primeiro ecrã mobile.
- Conteúdo longo colapsável.

## 27) Critérios de conversão
- Reduzir número de decisões concorrentes por viewport.
- Tornar explícito o caminho "plano" vs "custom".
- Destacar Crescimento como plano recomendado para a maioria das empresas.
- Proteger via de alto valor (Empresarial) com CTA consultivo.
- Reduzir scroll necessário até primeiro CTA decisivo.

## 28) Estratégia de testes
Aproveitar e expandir testes existentes:
- Navegação desktop/mobile.
- Jornada homepage.
- Overflow responsivo.
- Contacto.

Adicionar na 3.0B/3.0C:
- Secção "Como funciona a assinatura" (presença, ordem e conteúdo).
- Presença da secção Planos e ordem das secções.
- Prioridade de conteúdo no mobile (primeiro ecrã).
- Regras de exibição (2 produtos no mobile).
- Estado padrão do plano Crescimento.
- FAQ e comparação em accordion.
- Regras do CTA persistente (safe-area, keyboard open, hide on contact).

## 29) Riscos
- Regressão de acessibilidade no menu mobile.
- Aumento de complexidade visual ao introduzir planos.
- Dissonância entre promessa comercial e funcionalidades reais.
- Regressão de SEO se headings/estrutura forem alterados sem cuidado.
- Conflito entre copy comercial e copy técnica existente.

## 30) Plano de implementação em pequenos PRs
PR 1 - Navegação e Hero
- Header desktop.
- MobileMenu.
- Navegação simplificada (sem item "Planos" neste PR).
- Hero desktop/mobile.
- CTAs iniciais.

PR 2 - Jornada curta e produtos
- Credibilidade.
- Escolha rápida.
- Produtos em destaque.
- Regra de 2 produtos no mobile.
- Botão "Ver todos os produtos".

PR 3 - Assinaturas e posicionamento comercial
- Como funciona a assinatura.
- Planos (Essencial/Crescimento/Empresarial).
- Comparação mobile em accordion.
- Distinção assinatura/personalizado.
- Crescimento recomendado.
- Empresarial premium.

PR 4 - Compactação e QA
- Soluções para empresas.
- Processo.
- FAQ.
- Contacto curto.
- CTA persistente.
- Acessibilidade.
- Responsividade.
- Testes finais.

---

## Ficheiros analisados (3.0A)
- src/features/home/HomePageView.tsx
- src/components/layout/Header.tsx
- src/components/layout/MobileMenu.tsx
- src/features/home/components/Hero.tsx
- src/features/home/components/CredibilityBar.tsx
- src/features/home/components/SolutionFinder.tsx
- src/features/home/components/FeaturedProducts.tsx
- src/features/home/components/ProcessTimeline.tsx
- src/features/enterprise/components/EnterprisePreview.tsx
- src/features/home/components/TrustAndCompany.tsx
- src/features/contact/components/ContactForm.tsx
- src/lib/constants.ts
- src/features/products/fieldops/FieldOpsPage.tsx
- src/features/products/generic/GenericProductPage.tsx
- tests/web-shared/home.spec.ts
- tests/web-shared/homepage-journey.spec.ts
- tests/web-mobile/mobile-navigation.spec.ts
- tests/web-mobile/responsive-layout.spec.ts

## Decisões comerciais ainda em aberto
1. Limites concretos de utilizadores por plano.
2. Limites concretos de locais/unidades por plano.
3. Limites de armazenamento por plano.
4. Quantidade e tipo de integrações por plano.
5. Preços e política de periodicidade (mensal/anual).
6. Condições de cancelamento.
7. Níveis finais de suporte por plano.
8. Funcionalidades exatas por produto em cada plano.
9. Copy final da distinção assinatura vs personalizada para evitar promessa excessiva.
10. Nível final de detalhe da comparação de planos sem pricing público.

## Recomendação antes de implementar
Avançar para 3.0B iniciando por navegação + Hero + escolha rápida (PRs pequenos), congelando primeiro a matriz comercial mínima dos três planos para evitar retrabalho na 3.0C.

Sequência obrigatória para implementação antes do FAQ:
1. Navegação
2. Hero
3. Escolha rápida
4. Produtos
5. Planos
6. Compactação das demais secções
7. FAQ
8. Contacto
9. QA
