---
title: Livrya
slug: livrya
locale: pt
type: project
summary: Plataforma editorial inteligente da criação à publicação, conectando texto, voz, leitores e IA como capability transversal.
status: Active
tags: [AI, Product, Publishing, Architecture]
category: Intelligent Publishing Platform
featured: true
related:
  - /pt/engineering/decisions/human-control-in-architecture
  - /pt/writing/from-automation-to-autonomy
---

# Livrya

## Intelligent Publishing Platform

Livrya é uma plataforma editorial inteligente que conecta criação, publicação, leitura e voz dentro de um mesmo produto.

A visão amadureceu bastante ao longo do projeto.

No início, diferentes capacidades — Writer, Reader, Social, IA e áudio — corriam o risco de parecer produtos separados.

A direção atual é outra:

**um único produto editorial, da criação à publicação, em que IA é uma capability transversal e não a identidade do produto.**

## Product Language

A jornada canônica é simples de explicar:

```text
Idea
  ↓
Create
  ↓
Write
  ↓
Review
  ↓
Publish
  ↓
Reach Readers
```

Áudio, colaboração, inteligência e distribuição entram como capacidades dessa jornada.

O usuário não deveria precisar entender a arquitetura interna do Livrya para compreender o Livrya.

## The Architectural Reset

Uma das mudanças mais importantes foi reconhecer que havia duas experiências de produto com necessidades diferentes.

O ecossistema convergiu para:

```text
React
  ├── Product Shell
  ├── Writer / Studio
  ├── Reader
  ├── Home
  ├── Criar
  ├── Publicar
  ├── Biblioteca
  ├── Descobrir
  └── Perfil público

Angular
  ├── Auth / Conta
  ├── Social / Comunidade
  ├── Admin
  └── Superfícies residuais
```

A decisão não foi “React venceu Angular”.

Foi uma decisão de **ownership de experiência**.

React concentra a jornada editorial principal. Angular permanece onde já possui responsabilidade clara ou onde a migração ainda não gera valor suficiente para justificar mudança.

## One Product, Multiple Surfaces

Essa separação só funciona se o produto continuar coerente.

Por isso Product Shell, Writer e Reader compartilham linguagem de produto, design system, contratos e navegação.

O princípio central é:

> O usuário nunca deve precisar compreender a arquitetura do Livrya para compreender o Livrya.

## Author Experience

A jornada autoral evoluiu para:

```text
Criar
  ↓
Preparar
  ↓
Publicar
  ↓
Alcançar leitores
```

O Author Experience v1 passou a usar estado da obra para orientar próxima ação, em vez de tratar o Writer como um conjunto de ferramentas desconectadas.

O Studio organiza trabalho em superfícies como:

- Texto;
- Estrutura;
- Revisão;
- Inteligência;
- Áudio;
- Publicação;
- Desempenho.

A interface precisa responder “o que faz sentido agora?” e não apenas “quais features existem?”.

## Reader Experience

Reader possui responsabilidade diferente do Writer.

Ele precisa priorizar:

- legibilidade;
- continuidade;
- progresso;
- desempenho;
- navegação;
- retomada cross-device;
- conclusão;
- analytics first-party.

O Reader não consome o estado de edição.

Ele consome publicação.

## Working Copy vs Publication

Uma decisão arquitetural que permaneceu importante é a separação entre trabalho editorial e conteúdo publicado.

```text
Author Workspace
      ↓
Working Copy
      ↓
Publish
      ↓
Immutable Published Version
      ↓
Reader
```

O autor pode continuar editando enquanto leitores consomem uma versão estável.

Isso protege histórico, cache, rollback, auditoria e experiência.

## AI as a Capability

Livrya não deve se tornar “um chat que também cria livros”.

IA entra onde produz valor editorial:

- sugestão;
- revisão;
- reescrita;
- estruturação;
- análise;
- preparação;
- apoio à narração;
- descoberta assistida.

Mas autoria, intenção e decisão permanecem humanas.

```text
Editorial Feature
       ↓
AI Capability
       ↓
Provider Boundary
       ↓
Model Provider
```

Isso também impede que um fornecedor de modelo se transforme na arquitetura do produto.

## Text and Voice

Texto e voz pertencem ao mesmo produto, mas não ao mesmo lifecycle.

Uma obra pode estar publicada enquanto sua versão em áudio ainda está sendo processada.

```text
Book
  ↓
Chapter
  ↓
Narration Job
  ↓
Queue
  ↓
TTS
  ↓
Audio Artifact
  ↓
Validation
  ↓
Published Audio
```

Estados precisam ser explícitos:

```text
PENDING
PROCESSING
COMPLETED
FAILED
CANCELLED
```

Finalizar processamento não é sinônimo de sucesso completo.

## Collaboration and Authorization

Colaboração precisa ser modelada como capacidade, não como comparação dispersa de IDs.

Papéis e permissões possuem significados diferentes.

```text
OWNER
EDITOR
VIEWER
```

Capacidades como leitura, escrita e gestão devem existir como regras de domínio.

## Growth Without Losing Product Clarity

Depois das jornadas Author e Reader, o produto também passou a estruturar loops de crescimento.

A regra permanece a mesma:

**crescimento não pode transformar a experiência editorial em um conjunto de hacks desconectados.**

Descoberta, perfil público, publicação e leitura precisam reforçar o mesmo sistema.

## Market Validation

Outra mudança importante foi parar de tratar Business Model como verdade pronta.

Business Model v1 existe como hipótese.

Market Validation passou a operar com research plan, interview guide, evidence ledger e experiment matrix.

O objetivo é escolher segmentos e propostas com evidência real, não congelar pricing, take rate ou beachhead por intuição.

```text
Hypothesis
    ↓
Interview / Experiment
    ↓
Evidence
    ↓
Decision
```

Isso aproxima product strategy do mesmo princípio que uso em engenharia: **hipóteses precisam sobreviver ao contato com evidência.**

## Finalization Program

Com produto-base, jornadas e arquitetura mais maduros, Livrya entrou em uma etapa explícita de finalização.

As frentes atuais incluem:

### Security & Legacy

Fechar secrets, redirects, legado e telemetria necessária para remover superfícies antigas com segurança.

### Design / UX / Brand

Eliminar linguagem pública inconsistente, PWA/CTA legado, hardcodes e diferenças visuais entre superfícies.

### Investor Readiness

Estruturar data room, technical/innovation memo, narrativa de produto e base do pitch sem transformar hipótese em claim.

### Experiments & Unit Economics

Preparar medição, experimentos e estrutura econômica sem inventar CAC, LTV ou validação de mercado inexistente.

### CI

Aumentar confiança nos gates que sustentam a entrega do produto.

## Security as Product Work

A finalização de segurança mostrou uma distinção importante:

código mergeado não significa risco encerrado.

Alguns itens dependem de rotação de secrets, purge autorizado de histórico, deploy, smoke tests e telemetria operacional.

Por isso o projeto diferencia trabalho implementado de fechamento operacional.

## What Changed Most

A maior evolução do Livrya não foi uma feature.

Foi a clareza.

```text
Before
Writer + Reader + Social + AI + Audio

After
One editorial product
with specialized surfaces
and transversal capabilities
```

Essa clareza influencia arquitetura, UX, roadmap, marca, métricas e comunicação com investidores.

## Technical Landscape

Backend: Express, TypeScript, Prisma, PostgreSQL, Redis, BullMQ e Socket.IO.

Product Shell / Writer / Reader: React 19, TypeScript e Tiptap.

Auth / Conta / Social / Admin: Angular 21 e superfícies residuais em migração controlada.

Quality: Playwright, contratos explícitos e gates de CI.

Observability: Prometheus, Grafana, Sentry e telemetria first-party onde necessário.

## Architecture Principles

- One Product, Multiple Surfaces
- AI Is a Capability, Not the Product
- Working Copy Is Not Publication
- Reader Consumes Publication
- Authorization Is a Domain Rule
- Async Work Has Explicit State
- Partial Failure Is Still Failure
- Legacy Removal Needs Evidence
- Business Model Is a Hypothesis Until Validated
- Product Language Should Hide Architecture

## What It Demonstrates

Livrya combina product strategy, publishing domain, frontend architecture, migration strategy, asynchronous workflows, AI product integration, narration, collaboration, market validation, security hardening e investor readiness.

Mais do que uma plataforma para escrever livros, ele se tornou um estudo prático de **como reorganizar tecnologia, produto e narrativa até que todos contem a mesma história**.
