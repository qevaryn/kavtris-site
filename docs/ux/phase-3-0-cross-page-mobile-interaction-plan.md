# Fase 3.0 - Plano de Interação Mobile Cross-Page

## Objetivo
Definir padrões de interação mobile-first para próximas fases sem aplicar carrossel em todo o produto. O foco é reduzir fadiga vertical, manter descoberta progressiva e preservar acesso direto ao conteúdo completo.

## Princípios gerais
- Um padrão por necessidade: ticker para mensagens curtas, expansão local para decisão, carrossel para cards visuais, conteúdo longo estático com abertura sob demanda.
- Movimento com orçamento: apenas um componente em autoplay por vez quando visível.
- Regra de posse do autoplay: o primeiro componente elegível mantém a autorização enquanto continuar elegível; ao deixar de ser elegível, liberta para o próximo.
- Todo autoplay pausa por hover, foco, interação manual e quando sai do viewport.
- `prefers-reduced-motion` desativa movimento automático.
- Informação relevante nunca depende apenas de animação.

## Página /produtos
Direção:
- manter catálogo pesquisável e filtrável;
- filtros horizontais com leitura clara em mobile;
- grelha de cartões com consistência visual.

Não fazer:
- transformar catálogo inteiro em carrossel;
- ocultar produtos fora de interações complexas.

## Página /produtos/[slug]
Direção:
- navegação horizontal entre blocos de conteúdo quando útil;
- detalhes técnicos em accordions por tema;
- progressão de conteúdo por prioridade (valor, processo, capacidades, detalhe).

Não fazer:
- autoplay de texto longo;
- excesso de tabs com conteúdo redundante.

## Página /empresas
Direção:
- introdução estática curta;
- ticker complementar de capacidades curtas;
- detalhes técnicos sob demanda (`details`/accordion).

Não fazer:
- transformar parágrafos longos em loop;
- criar claims não suportados (SLA fixo, certificações não publicadas).

## Página /rede-qualidade-e-vida
Direção:
- carrossel dos segmentos da Rede;
- cada segmento com resumo curto e CTA de aprofundamento;
- continuidade visual com marca da Rede e Qevaryn.

Não fazer:
- autoplay agressivo em blocos densos;
- ocultar texto essencial atrás de animação.

## Páginas legais (/privacy, /cookies e correlatas)
Direção:
- layout estático e legível;
- navegação por âncoras quando necessário;
- prioridade total para leitura contínua.

Não fazer:
- animações decorativas que competem com o conteúdo jurídico.

## Checklist para PRs futuros
- validar breakpoints: 1440, 1280, 1024, 768, 430, 390, 360 e 320;
- confirmar zero overflow horizontal;
- confirmar pausa de movimento por foco/hover/interação;
- confirmar comportamento com `prefers-reduced-motion`;
- manter controle manual sempre disponível.
