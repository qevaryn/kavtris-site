# Fase 3.3A — Arquitetura Comercial, Planos e Assinatura

Status: Plano (sem implementação)
Audiência: Produto, Frontend, Backend, QA e Technical Lead
Base: docs/ux/phase-3-0-responsive-commercial-layout-plan.md, docs/ux/phase-3-0-cross-page-mobile-interaction-plan.md

Este documento define a arquitetura comercial antes da implementação. Não altera a Fase 3.2, os loops, os estilos ou as imagens. Não cria commit, push ou PR.

Cada ponto é marcado como:
- DECIDIDO
- RECOMENDADO
- A DEFINIR
- FORA DE ESCOPO

---

## 1) Estado inicial

- DECIDIDO: não há repositório git disponível neste ambiente de execução; os passos de git (Etapas 1, 2, 9) não puderam ser executados e são reportados como limitação.
- DECIDIDO: o trabalho desta fase produz apenas este documento.
- DECIDIDO: base de referência declarada: main = develop = 8445dad7ccaa3580c145d62261e87e9e408ec63e (não verificável por git aqui, assumido do enunciado).
- DECIDIDO: branch pretendida: feature/phase-3-3-commercial-architecture (a partir de develop).

## 2) Auditoria atual

### Homepage
- DECIDIDO: a homepage apresenta Hero, Credibilidade (ticker), Escolha rápida (SolutionFinder), Produtos em destaque (carrossel), Processo, Empresas, Rede e Contacto.
- DECIDIDO: não existe secção de planos, secção "como funciona a assinatura", FAQ comercial nem distinção explícita entre assinatura e solução personalizada.
- DECIDIDO: a navegação atual (Soluções, Produtos, Para empresas, Sobre, Contacto) não inclui item "Planos".
- DECIDIDO: o Hero já menciona "produto por assinatura ou solução personalizada", mas sem continuidade nas secções seguintes.

### Catálogo (/produtos)
- DECIDIDO: catálogo com 6 produtos, filtros por setor e cartão de solução personalizada.
- DECIDIDO: os cartões não mostram planos, preços nem modelo de assinatura.
- DECIDIDO: os CTAs são "Ver produto" e "Adaptar à minha empresa" (com produto pré-selecionado no contacto).

### Páginas de produto
- DECIDIDO: FieldOps tem página dedicada com experiência, setores, configurações (Essencial/Crescimento/Empresarial já como exemplos de evolução, sem preços) e detalhes técnicos em accordion.
- DECIDIDO: produtos genéricos têm problema, funcionalidades, benefícios, equipamento opcional e detalhes técnicos em accordion.
- DECIDIDO: nenhuma página de produto apresenta planos comerciais formais, preços, ciclo de assinatura nem CTAs por plano.
- DECIDIDO: as configurações FieldOps (Essencial/Crescimento/Empresarial) são "exemplos e não pacotes fechados ou preços fixos".

### Página Empresas (/empresas)
- DECIDIDO: apresenta fundamentos, capacidades, entrega/governança, clareza comercial e experiência aplicada.
- DECIDIDO: afirma explicitamente que não há certificações, SLA fixo nem promessas universais.
- DECIDIDO: não apresenta planos nem preços; o CTA é "Falar sobre requisitos".

### Contacto
- DECIDIDO: o formulário resolve intenção (produto, empresa, personalizada) e pré-seleciona produto/serviço.
- DECIDIDO: não há campo nem fluxo de seleção de plano.

### Dados
- DECIDIDO: src/features/products/data/products.ts centraliza produtos; src/features/products/fieldops/data/fieldops.ts centraliza FieldOps.
- DECIDIDO: não existe fonte de dados de planos, adicionais, níveis de suporte nem modos de faturação.

### Documentos existentes
- DECIDIDO: docs/ux/phase-3-0-responsive-commercial-layout-plan.md define os três planos, ordem de secções, CTAs e regras mobile.
- DECIDIDO: docs/ux/phase-3-0-cross-page-mobile-interaction-plan.md define padrões de interação mobile por página.

---

## 3) Caminhos comerciais

### 1. Produto por assinatura — DECIDIDO/RECOMENDADO

- DECIDIDO: produto existente do catálogo, oferecido por assinatura.
- DECIDIDO: o cliente escolhe um produto, um plano (Essencial/Crescimento/Empresarial) e adicionais conforme necessidade.
- RECOMENDADO: ciclo: configuração inicial → ativação → uso → manutenção/atualizações → suporte → evolução.
- RECOMENDADO: configuração inicial feita pela KAVTRIS como parte da ativação (não auto-service completo nesta fase).
- DECIDIDO: manutenção, correções e atualizações de segurança incluídas em todos os planos.
- RECOMENDADO: suporte diferenciado por plano, mas sem SLA fixo publicado.
- RECOMENDADO: adicionais (módulos, integrações, formação) contratados sobre qualquer plano.
- A DEFINIR: limites concretos por plano (utilizadores, locais, armazenamento).
- A DEFINIR: self-service parcial vs acompanhamento de ativação.

### 2. Solução personalizada — DECIDIDO/RECOMENDADO

- DECIDIDO: para requisitos fora dos produtos do catálogo.
- RECOMENDADO: ciclo: diagnóstico → proposta → desenvolvimento/adaptação → implementação → validação → suporte posterior.
- DECIDIDO: sem preço público; sob proposta.
- RECOMENDADO: proposta define escopo, propriedade, alojamento, suporte e transição (alinhado com a página Empresas).
- A DEFINIR: se a solução personalizada pode converter-se num produto de assinatura depois de estabilizada.

### Distinção — DECIDIDO

- DECIDIDO: mensagem explícita na homepage: assinatura = produto base + configuração + evolução contínua; personalizada = quando o produto padrão não cobre o processo/requisitos.
- RECOMENDADO: o CommercialPathSelector (ver secção de componentes) torna a distinção visível antes da escolha de plano.

---

## 4) Planos

### Essencial — DECIDIDO/RECOMENDADO/A DEFINIR

- DECIDIDO: entrada acessível, base funcional, operações pequenas.
- DECIDIDO: inclui correções de erros, atualizações de segurança, manutenção da plataforma, proteção básica dos dados e suporte conforme nível.
- RECOMENDADO: suporte padrão (canal único, tempo de resposta definido apenas no contrato, não publicado).
- RECOMENDADO: configuração inicial essencial incluída.
- RECOMENDADO: sem posicionamento visual de "plano inferior/abandonado".
- A DEFINIR: limite de utilizadores, locais/unidades, armazenamento.
- A DEFINIR: funcionalidades exatas por produto neste plano.
- A DEFINIR: preço público "a partir de" ou sob consulta.
- FORA DE ESCOPO: SLA 24/7, suporte prioritário.

### Crescimento — DECIDIDO/RECOMENDADO/A DEFINIR

- DECIDIDO: mais capacidade para equipas em crescimento, recursos adicionais conforme produto, suporte prioritário, atualizações regulares.
- DECIDIDO: badge "Mais recomendado"; destaque visual.
- RECOMENDADO: integrações avaliadas conforme necessidade (não prometidas como ilimitadas).
- RECOMENDADO: suporte prioritário (canal preferencial; SLA só no contrato).
- RECOMENDADO: no mobile, expandido por padrão como orientação visual, sem seleção automática.
- A DEFINIR: limite de utilizadores, locais/unidades, armazenamento.
- A DEFINIR: integrações incluídas vs adicionais pagos.
- A DEFINIR: preço público "a partir de".
- FORA DE ESCOPO: SLA fixo publicado, certificações.

### Empresarial — DECIDIDO/RECOMENDADO/A DEFINIR

- DECIDIDO: operações maiores e múltiplas unidades, funcionalidades avançadas conforme produto, integrações avaliadas, implementação e acompanhamento definidos na proposta, formação, suporte prioritário, evolução planeada, preço personalizado.
- DECIDIDO: CTA "Falar com um especialista".
- DECIDIDO: aparência premium distinta; ênfase em capacidade, governança e acompanhamento.
- RECOMENDADO: suporte prioritário com acompanhamento definido no contrato.
- RECOMENDADO: no mobile, compacto com CTA consultivo.
- A DEFINIR: funcionalidades exatas por produto neste plano.
- A DEFINIR: formação incluída vs adicional.
- FORA DE ESCOPO: preço público fixo, SLA publicado.

---

## 5) Elementos comuns a todos os planos — DECIDIDO

- DECIDIDO: correções de erros.
- DECIDIDO: atualizações de segurança.
- DECIDIDO: manutenção da plataforma.
- DECIDIDO: proteção básica dos dados.
- DECIDIDO: suporte conforme o nível contratado (sem SLA publicado).
- DECIDIDO: nenhum plano promete utilizadores ilimitados, integrações ilimitadas, 24/7 ou certificações.

## 6) Diferenças resumidas — RECOMENDADO

| Eixo | Essencial | Crescimento | Empresarial |
| --- | --- | --- | --- |
| Público | pequenas operações | equipas em crescimento | múltiplas unidades |
| Capacidade | base | adicional | avançada conforme produto |
| Suporte | padrão | prioritário | prioritário + acompanhamento contratual |
| Integrações | avaliadas | avaliadas | avaliadas, com proposta |
| Formação | não incluída por defeito | não incluída por defeito | incluída conforme proposta |
| Implementação | configuração essencial | configuração essencial | definida na proposta |
| CTA | Pedir demonstração | Pedir demonstração | Falar com um especialista |
| Preço | a definir | a definir | sob proposta |

---

## 7) Preços — RECOMENDADO/A DEFINIR

- RECOMENDADO: não inventar preços, SLA, 24/7, utilizadores ilimitados nem certificações.
- RECOMENDADO: Essencial e Crescimento podem usar "a partir de" se o produto decidir publicar preço mínimo; se não, ambos "sob consulta".
- DECIDIDO: Empresarial sempre "sob proposta", sem preço público.
- A DEFINIR: política de periodicidade (mensal/anual) e condições de cancelamento.
- A DEFINIR: se há período de demonstração/teste e respetivas condições.
- FORA DE ESCOPO: checkout, faturação automática e pagamentos nesta fase (ver ciclo comercial).

---

## 8) Ciclo da assinatura — RECOMENDADO/A DEFINIR

- RECOMENDADO: Demonstração → Proposta/Configuração → Ativação → Uso → Manutenção/Atualizações → Suporte → Evolução.
- RECOMENDADO: mudança de plano permitida, com revisão de escopo e proposta quando envolver capacidades/integrações.
- A DEFINIR: processo formal de upgrade/downgrade.
- A DEFINIR: política de cancelamento e devolução/rescisão.
- A DEFINIR: dados e acesso após cancelamento (retenção, exportação, apagamento conforme RGPD).
- FORA DE ESCOPO: cobrança automática, renovação automática processada por gateway de pagamento (depende de Stripe/integração futura).

---

## 9) CTAs por contexto — DECIDIDO/RECOMENDADO

- DECIDIDO: Hero — "Encontrar uma solução" / "Ver produtos".
- DECIDIDO: Escolha rápida — "Ver solução sugerida".
- DECIDIDO: Produtos — "Ver produto" / "Ver todos".
- DECIDIDO: Planos Essencial/Crescimento — "Pedir demonstração".
- DECIDIDO: Planos Empresarial — "Falar com um especialista".
- DECIDIDO: Empresas — "Ver informações para empresas".
- DECIDIDO: Contacto — "Enviar pedido".
- RECOMENDADO: um CTA principal por secção; secundário opcional.
- RECOMENDADO: CTAs de plano levam ao contacto com intenção (tipo=empresa ou produto) e, quando possível, plano pré-selecionado (A DEFINIR: campo de plano no formulário/contacto).

---

## 10) Modelo de dados — RECOMENDADO (sem implementar)

Local recomendado: nova pasta de domínio comercial (ex.: src/domain/commercial/ para tipos puros e src/features/commercial/data/ para dados). Isto evita duplicar planos entre homepage e páginas de produto e mantém os contratos puros (sem React/Next).

### CommercialPlan — RECOMENDADO
- id: 'essential' | 'growth' | 'enterprise'
- name, summary, recommended (boolean), audience: string[]
- baseInclusions: string[] (elementos comuns)
- features: string[]
- supportLevelId
- implementationModeId
- cta: CommercialCTA
- priceMode: 'public' | 'starting' | 'proposal'
- priceLabel?: string (apenas se priceMode !== 'proposal')
- openItems: string[] (pontos "A DEFINIR" visíveis como honestidade)

### AddOn — RECOMENDADO
- id, name, description, appliesToPlanIds
- priceMode: 'proposal' | 'starting' | 'public'
- priceLabel?

### SupportLevel — RECOMENDADO
- id: 'standard' | 'priority' | 'priority_managed'
- name, description (sem SLA fixo publicado)

### ImplementationMode — RECOMENDADO
- id: 'essential_setup' | 'configured_setup' | 'proposal_defined'
- name, description

### BillingMode — RECOMENDADO (A DEFINIR valores)
- id, name (ex.: monthly, annual, proposal)
- DECIDIDO: apenas conceptual; sem processamento de pagamento nesta fase.

### ProductPlanAvailability — RECOMENDADO
- productSlug
- planId
- notes?: string (diferenças por produto)

### PlanComparisonGroup — RECOMENDADO
- id, title (ex.: "Capacidade", "Suporte", "Segurança", "Integrações", "Implementação")
- rows: { label, values: { essential, growth, enterprise } }

### CommercialCTA — RECOMENDADO
- label, href, intent: 'demo' | 'specialist' | 'contact' | 'custom'
- RECOMENDADO: href pode incluir ?plano=...#contacto quando o campo de plano existir.

DECIDIDO: a fonte única de planos vive em src/features/commercial/data/plans.ts; homepage, catálogo e páginas de produto importam deste ponto.

---

## 11) Componentes futuros — RECOMENDADO (sem implementar)

### SubscriptionHowItWorksSection
- Responsabilidade: explicar em 3 passos como funciona a assinatura (configuração → uso → evolução).
- Dados: estáticos ou literais pequenos.
- Uso: homepage entre produtos e planos.
- Mobile: passos verticais curtos.
- Acessibilidade: headings semânticos, ordem de leitura.

### PlansSection
- Responsabilidade: apresentar os três planos com destaque em Crescimento.
- Dados: CommercialPlan[] + ProductPlanAvailability opcional.
- Uso: homepage (#planos) e potencialmente páginas de produto.
- Mobile: Crescimento primeiro e expandido; Empresarial compacto; Essencial compacto/expansível.
- Acessibilidade: um cartão por plano, headings consistentes, CTA focável.

### PlanCard
- Responsabilidade: renderizar um plano.
- Dados: CommercialPlan.
- Uso: dentro de PlansSection.
- Mobile: versão compacta/expansível controlada por props.
- Acessibilidade: badge "Mais recomendado" como texto/aria; CTA com nome de plano no aria-label.

### PlanComparison
- Responsabilidade: tabela desktop de comparação por grupos.
- Dados: PlanComparisonGroup[].
- Uso: homepage ou página dedicada.
- Mobile: fora de escopo aqui (ver PlanComparisonAccordion).

### PlanComparisonAccordion
- Responsabilidade: comparação por grupos em accordion para mobile.
- Dados: PlanComparisonGroup[].
- Uso: mobile em PlansSection.
- Acessibilidade: details/summary acessíveis, teclado, foco visível.

### ProductPlansPreview
- Responsabilidade: numa página de produto, mostrar planos aplicáveis a esse produto.
- Dados: productSlug + CommercialPlan[] filtrados por ProductPlanAvailability.
- Uso: páginas /produtos/[slug].
- Mobile: cartões compactos.
- Acessibilidade: indicação clara de "preço sob proposta" para Empresarial.

### CommercialPathSelector
- Responsabilidade: tornar explícita a escolha entre assinatura e solução personalizada antes dos planos.
- Dados: dois caminhos (assinatura, personalizada) com CTAs.
- Uso: homepage, antes ou dentro de PlansSection.
- Mobile: dois blocos empilhados.
- Acessibilidade: botões com nomes claros, aria-pressed.

### EnterprisePlanCTA
- Responsabilidade: bloco consultivo para Empresarial dentro de PlanCard ou PlansSection.
- Dados: CommercialCTA.
- Uso: destaque Empresarial.
- Mobile: compacto.
- Acessibilidade: CTA "Falar com um especialista" bem identificado.

### FAQSection
- Responsabilidade: FAQ comercial em accordion (preço, cancelamento, mudança de plano, demonstração).
- Dados: lista de perguntas/respostas (texto).
- Uso: homepage antes do contacto.
- Mobile: accordion.
- Acessibilidade: details/summary, headings, teclado.

---

## 12) Homepage — RECOMENDADO

- RECOMENDADO: ordem alvo (da Fase 3.0): Hero → Credibilidade → Escolha rápida → Produtos → Como funciona a assinatura → Planos → Empresas → Processo → FAQ → Contacto.
- RECOMENDADO: item "Planos" na navegação só quando a secção #planos existir (PR 3 da Fase 3.0).
- DECIDIDO: não alterar a Fase 3.2 (loops/carrosséis) nesta fase.
- RECOMENDADO: CommercialPathSelector posicionado antes de PlansSection.
- RECOMENDADO: máximo 2 produtos no mobile + "Ver todos".

## 13) Catálogo — RECOMENDADO

- RECOMENDADO: manter catálogo filtrável como hoje.
- RECOMENDADO: cartões podem mostrar um selo "Disponível por assinatura" sem preços.
- RECOMENDADO: CTA "Ver planos" no cartão opcional (leva a #planos ou à página do produto).
- A DEFINIR: se o catálogo mostra planos resumidos por produto.

## 14) Produtos — RECOMENDADO

- RECOMENDADO: cada página de produto pode apresentar ProductPlansPreview com planos aplicáveis.
- DECIDIDO: FieldOps já tem configurações (Essencial/Crescimento/Empresarial) como exemplos; alinhar nomes com CommercialPlan, mantendo o aviso "exemplos, não pacotes fechados".
- RECOMENDADO: Empresarial sempre "sob proposta" na página de produto.
- A DEFINIR: se as configurações FieldOps atuais são substituídas por ProductPlansPreview ou mantidas separadas.

## 15) Empresas — DECIDIDO/RECOMENDADO

- DECIDIDO: mantém o tom atual sem SLA/certificações.
- RECOMENDADO: o CTA Empresarial pode apontar para o plano Empresarial (#planos) antes de contacto, ou diretamente para "Falar com um especialista".
- RECOMENDADO: clareza comercial existente serve como base para o plano Empresarial.

## 16) Contacto — RECOMENDADO/A DEFINIR

- RECOMENDADO: CTAs de plano levam ao contacto com intenção (produto/empresa).
- A DEFINIR: adicionar campo "Plano de interesse" (Essencial/Crescimento/Empresarial/Personalizada) ao formulário e ao contrato ContactFormValues.
- A DEFINIR: se o parâmetro ?plano=... é suportado por resolveContactIntent.
- DECIDIDO: sem checkout nem pagamento no formulário.

---

## 17) Mobile — DECIDIDO/RECOMENDADO

- DECIDIDO: zero overflow horizontal (breakpoints 320–1440).
- RECOMENDADO: Crescimento primeiro e expandido; Empresarial compacto; Essencial compacto/expansível.
- RECOMENDADO: comparação longa em accordion por grupos.
- RECOMENDADO: CTA persistente opcional pós-scroll, respeitando regras da Fase 3.0 (safe-area, teclado, esconder no contacto).
- DECIDIDO: a escolha de plano é sempre voluntária e explícita.

## 18) Acessibilidade — DECIDIDO/RECOMENDADO

- DECIDIDO: teclado completo, foco visível, Escape no menu mobile, labels associadas.
- RECOMENDADO: accordions com details/summary acessíveis.
- RECOMENDADO: badges ("Mais recomendado") como texto, não só cor.
- RECOMENDADO: CTAs com aria-label incluindo o nome do plano.
- DECIDIDO: não usar cor como único diferenciador de planos.

---

## 19) Riscos — DECIDIDO/RECOMENDADO

- DECIDIDO: dissonância entre promessa comercial e funcionalidades reais (produtos são conceitos adaptáveis).
- DECIDIDO: regressão de acessibilidade ao introduzir planos e accordions.
- DECIDIDO: regressão de SEO ao alterar headings/estrutura.
- RECOMENDADO: conflito entre copy comercial nova e copy técnica existente (páginas de produto/Empresas).
- RECOMENDADO: expor preços sem política de cancelamento/faturação definida.
- RECOMENDADO: duplicated plan data entre homepage e produtos (mitigado pela fonte única em src/features/commercial/data/plans.ts).

---

## 20) Decisões pendentes — A DEFINIR

1. Preços públicos (sim/não) e política mensal/anual.
2. Limites concretos por plano (utilizadores, locais, armazenamento).
3. Integrações incluídas vs adicionais pagos.
4. Níveis finais de suporte por plano (sem SLA publicado).
5. Funcionalidades exatas por produto em cada plano.
6. Campo "Plano de interesse" no contacto e parâmetro ?plano=.
7. Conversão de solução personalizada em produto de assinatura.
8. Self-service de ativação vs acompanhamento.
9. Política de demonstração/teste.
10. Política de cancelamento e retenção de dados.
11. Substituição das configurações FieldOps por ProductPlansPreview.
12. Detalhe final da comparação de planos sem pricing público.

---

## 21) Divisão das próximas subfases — RECOMENDADO

- 3.3B: modelo de dados comercial + fonte única de planos (tipos e dados, sem UI).
- 3.3C: SubscriptionHowItWorksSection + CommercialPathSelector + PlansSection/PlanCard (homepage).
- 3.3D: PlanComparison + PlanComparisonAccordion + FAQSection.
- 3.3E: ProductPlansPreview nas páginas de produto + alinhamento FieldOps.
- 3.3F: campo de plano no contacto + intenção ?plano=.
- 3.3G: QA (overflow, acessibilidade, jornadas comerciais) e validação de honestidade comercial.

Cada subfase deve respeitar: não alterar a Fase 3.2, não alterar loops/estilos/imagens sem necessidade direta, e validar com lint/typecheck/build/e2e.

---

## Nota de execução

- Este documento é a única alteração produzida nesta execução.
- Não foram executados git add, git commit, git push nem gh pr create.
- Os passos de git (Etapas 1, 2, 9) não puderam ser executados por ausência de repositório git neste ambiente; ver secção 1.
