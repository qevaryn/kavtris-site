---
title: "Qevaryn Platform — Ecossistema, Sistemas, Planos e Subscrições"
owner: "Gabriel Dias de Souza"
organization: "Qevaryn Systems"
status: "draft"
version: "0.1"
classification: "internal"
language: "pt-PT"
last_updated: "2026-08-07"
review_required: true
legal_review_required: true
commercial_review_required: true
---

> Este documento representa uma baseline estratégica e empresarial em elaboração. Não constitui contrato, parecer jurídico, aconselhamento fiscal, certificação de conformidade ou compromisso comercial público.

> Funcionalidades, limites, preços e condições aqui descritos podem representar hipóteses de produto e precisam de validação antes da publicação ou comercialização.

# Qevaryn Platform — Ecossistema, Sistemas, Planos e Subscrições

Este é o documento central de produto para a Qevaryn Platform. Define a hierarquia oficial, os sistemas, os planos individuais por sistema e o modelo de subscrição, servindo de fonte antes das análises separadas de Frontend, Backend, QA e Comercial.

## 1. Hierarquia oficial

Registado como `DECIDIDO`:

```text
Rede Qualidade é Vida
        ↓
Qevaryn Systems
        ↓
Qevaryn Platform
        ↓
Os meus sistemas
        │
        ├── Pedidos e Trabalhos
        ├── Website
        ├── Mobile
        ├── FieldOps
        ├── Produção
        ├── Stock e Compras
        └── futuros sistemas
```

> SUBSTITUÍDO — A camada conceitual anteriormente designada "Qevaryn Core" foi removida da arquitetura oficial. Não existe camada entre a Qevaryn Platform e os sistemas. Não deve ser substituída por outro nome de marketing equivalente (como Qevaryn Base, Qevaryn Engine, Qevaryn Hub Core, Platform Core ou Shared Core) sem decisão futura explícita do Product Owner.

## 2. Qevaryn Systems

Definição:

```text
Qevaryn Systems
= empresa de tecnologia
```

Registado como `DECIDIDO`:

> A Qevaryn Systems é a empresa de tecnologia responsável por criar produtos, desenvolver sistemas, comercializar, operar, manter e prestar suporte.

A Qevaryn Systems integra a Rede Qualidade é Vida como operadora tecnológica, mas mantém autonomia jurídica, financeira e operacional.

> Não confundir Qevaryn Systems com Qevaryn Platform. Qevaryn Systems é a empresa; Qevaryn Platform é a aplicação que a empresa desenvolve e opera.

## 3. Qevaryn Platform

Registado como `DECIDIDO`:

> A Qevaryn Platform é a aplicação central através da qual uma empresa cliente acede à sua conta, gere informações gerais da empresa, ativa produtos, administra subscrições e abre os sistemas Qevaryn que contratou.

A Qevaryn Platform NÃO é:

- Pedidos e Trabalhos;
- um plano comercial;
- um módulo;
- um sistema específico;
- um ERP completo;
- a Rede Qualidade é Vida.

A Qevaryn Platform também NÃO deve possuir inicialmente planos próprios com os nomes:

```text
Essencial
Crescimento
Empresarial
```

Os planos pertencem aos SISTEMAS. Não existem "Qevaryn Platform Essencial", "Qevaryn Platform Crescimento" nem "Qevaryn Platform Empresarial".

## 4. Capacidades comuns da Qevaryn Platform

Registado como `DECIDIDO`:

> Algumas capacidades são naturalmente comuns à Qevaryn Platform e pertencem diretamente a ela.

Exemplos:

```text
Conta
Empresa
Utilizadores
Acessos
Sistemas comprados
Subscrições
Ativação de produto
Ajuda
Definições gerais
```

Tecnicamente poderão existir capacidades reutilizadas entre sistemas — por exemplo: identidade, empresa, utilizadores, permissões, subscrições, ficheiros, notificações e auditoria. Devem ser descritas como "capacidades ou serviços comuns da Qevaryn Platform" e não como entidade comercial ou arquitetural chamada Qevaryn Core.

> NÃO criar camada denominada "Qevaryn Core" nem outro nome substituto (Qevaryn Base, Qevaryn Engine, Qevaryn Hub Core, Platform Core, Shared Core) sem decisão futura explícita do Product Owner.

A implementação técnica concreta destas capacidades será responsabilidade futura do Backend.

## 5. Os meus sistemas

Registado como `DECIDIDO`.

Depois de entrar na Qevaryn Platform, o proprietário encontra a área:

```text
OS MEUS SISTEMAS
```

Exemplo:

```text
Pedidos e Trabalhos
Plano: Crescimento

4 pedidos a validar
7 trabalhos em curso

[ Abrir ]
[ Gerir plano ]
```

Outro:

```text
Website
Plano: Essencial

Site publicado

[ Abrir ]
[ Gerir plano ]
```

Outro ainda:

```text
Mobile

Não contratado

[ Conhecer ]
```

Separar claramente:

```text
Os meus sistemas
```

de:

```text
Outros sistemas / Catálogo
```

## 6. Definição de sistema

Registado:

> Sistema é um produto funcional da Qevaryn que resolve um conjunto específico de problemas do cliente e pode possuir subscrição própria.

Exemplos:

```text
Pedidos e Trabalhos
Website
Mobile
FieldOps
Produção
Stock e Compras
```

Não chamar todos eles simplesmente de "módulos".

## 7. Definição de plano

Registado:

> Plano é o nível comercial escolhido para um sistema específico.

Níveis atuais decididos:

```text
Essencial
Crescimento
Empresarial
```

Esses nomes poderão ser utilizados individualmente em cada sistema.

## 8. Regra fundamental — plano individual por sistema

Registado como `DECIDIDO`:

> Cada sistema possui a sua própria subscrição e o seu próprio plano.

Exemplo válido:

```text
Empresa: Gráfica Silva

Pedidos e Trabalhos
→ Crescimento

Website
→ Essencial

Mobile
→ Empresarial

Produção
→ Essencial

FieldOps
→ não contratado
```

Essa combinação é válida.

## 9. Proibição do conceito de "plano global Qevaryn"

Não documentar algo como:

```text
Empresa está no Qevaryn Crescimento
```

se isso significar que todos os sistemas sobem automaticamente de plano.

Não existe, nesta decisão atual:

```text
Qevaryn Platform Essencial
Qevaryn Platform Crescimento
Qevaryn Platform Empresarial
```

A empresa pode possuir diversos sistemas em níveis diferentes.

## 10. Subscrição

Definição conceitual:

```text
Empresa
+
Sistema
+
Plano
=
Subscrição daquele sistema
```

Exemplo:

```text
Barbearia António
+
Pedidos e Trabalhos
+
Crescimento
```

é uma subscrição.

Enquanto:

```text
Barbearia António
+
Website
+
Essencial
```

é outra subscrição independente.

## 11. Upgrade individual

Registado como `DECIDIDO`:

> Um sistema pode receber upgrade sem alterar os restantes sistemas da empresa.

Exemplo:

Antes:

```text
Pedidos e Trabalhos — Essencial
Website — Essencial
```

Upgrade:

```text
Pedidos e Trabalhos
Essencial → Crescimento
```

Resultado:

```text
Pedidos e Trabalhos — Crescimento
Website — Essencial
```

Website não muda.

## 12. Caminho de upgrade

Direção:

```text
Essencial
↓
Crescimento
↓
Empresarial
```

O upgrade deve:

- preservar dados;
- preservar conta;
- preservar empresa;
- preservar histórico;
- não exigir reinstalação;
- não exigir novo código do produto;
- não exigir recriação do sistema.

A nova subscrição/plano desbloqueia capacidades adicionais.

## 13. Downgrade

Registado como:

```text
PROPOSTA FORTE / A VALIDAR COMERCIALMENTE
```

Possível:

```text
Empresarial → Crescimento
Crescimento → Essencial
```

Antes do downgrade, informar impactos.

Exemplo:

```text
Plano atual: Crescimento
10 utilizadores ativos

Plano Essencial:
3 utilizadores incluídos
```

Não eliminar dados silenciosamente.

Detalhes de:

- read-only;
- desativação;
- período de transição;
- limites;
- data de efeito;

permanecem `A VALIDAR`.

## 14. Upgrade vs cross-sell

Registado claramente.

### Upgrade

Melhorar plano do mesmo sistema:

```text
Pedidos e Trabalhos
Essencial → Crescimento
```

### Cross-sell

Comprar outro sistema:

```text
Pedidos e Trabalhos
+
Website
```

São ações comerciais diferentes.

## 15. Filosofia dos planos

### Essencial

Registado:

> Deve resolver de verdade o problema principal daquele sistema.

Essencial não significa:

- demo;
- versão inútil;
- produto propositalmente quebrado.

### Crescimento

Registado:

> Destinado à empresa que necessita mais capacidade, equipa, automação, personalização ou controlo naquele sistema.

### Empresarial

Registado:

> Destinado a operações mais complexas, integrações, múltiplas unidades, governação, permissões ou necessidades empresariais avançadas naquele sistema.

## 16. Conteúdo dos planos é diferente por sistema

Os três NOMES podem ser comuns:

```text
Essencial
Crescimento
Empresarial
```

Mas o conteúdo não precisa ser igual.

Exemplo:

```text
Pedidos e Trabalhos — Crescimento
```

pode incluir agendamento.

Enquanto:

```text
Website — Crescimento
```

pode incluir blog, catálogo e maior personalização.

Não tentar criar uma matriz global única de funcionalidades.

## 17. Primeiro sistema — Pedidos e Trabalhos

Preservado como `DECIDIDO`:

```text
Qevaryn Pedidos e Trabalhos
```

é a designação funcional atual do primeiro sistema. O nome comercial definitivo ainda poderá mudar.

### Promessa funcional

> Reunir os pedidos da empresa num único lugar, organizá-los, validá-los e transformá-los em trabalhos que possam ser atribuídos e acompanhados.

### Regra preservada

```text
Pedido ≠ Trabalho
```

Todo pedido público entra inicialmente:

```text
Pedido recebido — A validar
```

Não criar automaticamente Job/trabalho confirmado.

## 18. Quatro formas configuráveis

Registado como direção decidida do produto.

### Pedido Livre

Para serviços personalizados.

Pode envolver:

- texto;
- áudio;
- fotos;
- documentos;
- data pretendida.

### Catálogo

Para:

- produtos;
- serviços;
- preços definidos;
- duração quando aplicável.

### Agendamento

Para:

- serviço;
- profissional;
- data;
- hora;
- duração;
- disponibilidade.

### Híbrido

Combina:

```text
produto/serviço definido
+
pedido personalizado
```

Exemplo:

```text
500 cartões — preço definido
```

ou:

```text
Pedir orçamento personalizado
```

## 19. Simplicidade para o proprietário

Registado como `DECIDIDO`:

> O proprietário deve conseguir utilizar e configurar as funções normais do produto sozinho, sem depender da Qevaryn para cada alteração.

Especial atenção a:

- pessoas com pouca experiência tecnológica;
- pessoas mais velhas;
- utilização mobile;
- pequenos empresários.

## 20. Onboarding

Registado como direção de UX como `PROPOSTA`.

Em vez de pedir termos técnicos:

```text
Escolha:
CUSTOM
FIXED
HYBRID
```

perguntar:

```text
Os seus serviços têm preços definidos?

[ Sim ]
[ Não ]
[ Alguns têm e outros não ]
```

A interface traduz a resposta para a configuração apropriada.

## 21. Telefone

Registado como canal oficial.

Canais:

```text
Telefone
WhatsApp
Instagram
Facebook
SMS
Email
Site
QR Code
Presencial
Link público
```

No início, WhatsApp/Instagram/Facebook etc. não implicam API direta. Podem servir simplesmente para enviar o link.

Telefone possui fluxo interno:

```text
Cliente liga
↓
funcionário abre + Novo pedido
↓
Origem: Telefone
↓
regista informações
↓
Pedido recebido — A validar
```

## 22. Telefonia futura

Registado como:

```text
FUTURO / A VALIDAR
```

Possibilidades:

```text
reconhecer número
localizar cliente
transcrever chamada autorizada
resumo por IA
```

Não colocar no MVP. Questões de privacidade precisam de análise específica.

## 23. Web-first

Registado como direção decidida:

> O acesso principal à Qevaryn Platform será através da web.

Fluxo:

```text
Site Qevaryn
↓
Entrar
↓
Qevaryn Platform
```

Instalação não deve ser obrigatória.

## 24. Download

Registado como `PROPOSTA FUTURA`.

O site institucional poderá ter:

```text
Entrar
Download
```

Possível página:

```text
Qevaryn para Windows
Qevaryn Mobile
Abrir no navegador
```

Não implementar agora.

## 25. Código de ativação

Registado como conceito de produto:

```text
QEV-XXXX-XXXX
```

O código serve para ativar uma compra/subscrição na empresa. NÃO fica preso ao computador.

Fluxo:

```text
Empresa compra sistema
↓
recebe código
↓
entra na Platform
↓
Ativar produto
↓
introduz código
↓
sistema + plano ficam associados à empresa
↓
sistema aparece em Os meus sistemas
```

## 26. Código não é necessário para upgrade

Se:

```text
Pedidos e Trabalhos
```

já estiver ativo e o cliente fizer:

```text
Essencial → Crescimento
```

não deve precisar ativar novamente o produto com novo código. A mudança ocorre na subscrição daquele sistema.

## 27. Ativação por email

Registado como `PROPOSTA RECOMENDADA`.

Exemplo:

```text
O seu produto está pronto.

[ Ativar Pedidos e Trabalhos ]
```

Alternativa:

```text
Tenho um código
```

Isso é especialmente útil para proprietários pouco tecnológicos.

## 28. Qevaryn Website

Registado como:

```text
PROPOSTA DE SISTEMA FUTURO
```

É diferente do site institucional da Qevaryn Systems. É um sistema vendido a clientes para criação/configuração de websites empresariais. Motor comum configurável.

Possíveis configurações:

- logótipo;
- cores;
- fontes;
- imagens;
- textos;
- serviços;
- produtos;
- contactos;
- horários;
- secções.

## 29. Website — planos individuais

Conceitualmente:

```text
Website
├── Essencial
├── Crescimento
└── Empresarial
```

Exemplos de capacidades continuam como propostas. Não definir preços definitivos.

## 30. Qevaryn Mobile

Registado como:

```text
PROPOSTA DE SISTEMA FUTURO
```

Também terá subscrição própria.

Conceitualmente:

```text
Mobile
├── Essencial
├── Crescimento
└── Empresarial
```

Mas funcionalidades específicas por plano:

```text
A VALIDAR
```

## 31. PWA

Registado como direção técnica/comercial recomendada:

```text
PROPOSTA
```

Primeiro explorar:

```text
web responsiva
+
PWA
```

antes de assumir um app white-label separado nas lojas para cada empresa.

## 32. Outros sistemas

Podem existir futuramente:

```text
FieldOps
Produção
Stock e Compras
Comunicação
Automação
Relatórios
```

Cada sistema futuro deverá ser avaliado individualmente. Quando comercializado poderá seguir:

```text
Essencial
Crescimento
Empresarial
```

se isso fizer sentido para aquele produto. Não definir funcionalidades definitivas agora.

## 33. Partilha entre sistemas

A empresa não deve precisar criar uma nova conta para cada sistema.

Exemplo:

```text
Barbearia António
```

possui:

```text
Pedidos e Trabalhos
Website
```

Ambos pertencem à mesma empresa dentro da Platform.

Informações gerais poderão ser reutilizadas quando autorizado. Exemplos:

- nome;
- logótipo;
- contactos;
- utilizadores.

Mas NÃO afirmar que todos os dados de todos os sistemas são automaticamente compartilhados.

O Backend definirá posteriormente:

- isolamento;
- ownership;
- autorização;
- segurança;
- sincronização.

## 34. Não criar dependência de planos

Um sistema não deve exigir upgrade de outro simplesmente por estar num nível superior.

Exemplo válido:

```text
Pedidos e Trabalhos — Empresarial
Website — Essencial
```

Não obrigar:

```text
Website → Empresarial
```

apenas porque Pedidos e Trabalhos é Empresarial.

## 35. Exemplos

Registados sempre como `EXEMPLO`. Nenhum destes exemplos representa cliente real.

### Gráfica

```text
Pedidos e Trabalhos — Crescimento
Website — Crescimento
Produção — futuro
```

### Barbearia

```text
Pedidos e Trabalhos — Crescimento
Website — Essencial
```

### Limpeza

```text
Pedidos e Trabalhos — Essencial
```

## 36. Separação das áreas profissionais

Depois desta baseline, o produto será analisado separadamente.

### Frontend

Responsável por:

- UX;
- UI;
- jornadas;
- responsividade;
- acessibilidade.

### Backend

Responsável por:

- domínio;
- APIs;
- dados;
- multi-tenant;
- autenticação;
- permissões;
- segurança;
- arquitetura técnica das subscrições.

### QA

Responsável por:

- critérios de aceitação;
- risco;
- functional testing;
- API;
- E2E;
- segurança;
- acessibilidade;
- release gates.

### Comercial

Responsável por:

- ICP;
- pricing;
- composição dos planos;
- piloto;
- vendas;
- objeções;
- upsell;
- cross-sell.

Nenhuma área pode alterar silenciosamente decisões marcadas:

```text
DECIDIDO
```

## 37. Classificações documentais

Preservar as classificações:

```text
DECIDIDO
PROPOSTA
EXEMPLO
A VALIDAR
HISTÓRICO
SUBSTITUÍDO
```

### Qevaryn Core — SUBSTITUÍDO

A camada conceitual anteriormente denominada "Qevaryn Core" foi removida da arquitetura oficial da Qevaryn. O seu conteúdo (capacidades comuns) pertence diretamente à Qevaryn Platform. Não deve voltar como camada, produto, plano, marca ou nome técnico de primeiro nível sem decisão futura explícita do Product Owner.

### Preços

Quaisquer valores existentes em documentação anterior, como:

```text
29 €
69 €
149 €
```

permanecem:

```text
EXEMPLO — NÃO APROVADO
```

Não transformar hipóteses em preços comerciais.

## 38. Documentos relacionados

- [Qevaryn Systems — Identidade Empresarial, Operação e Modelo de Negócio](../governance/qevaryn-systems.md)
- [Qevaryn Platform — Plataforma Modular e Primeiro Produto "Pedidos e Trabalhos"](qevaryn-platform-first-product.md)
- [Rede Qualidade é Vida — Governança, Marca, Cooperação e Regras Institucionais](../governance/rede-qualidade-e-vida.md)
