# Livrya

## AI-Powered Publishing Platform

Livrya é uma plataforma de criação e publicação voltada para o ciclo completo de produção editorial.

O projeto combina escrita, colaboração, inteligência artificial, geração de áudio, versionamento editorial, publicação imutável e experiência de leitura.

Mais do que adicionar IA a um editor de texto, o objetivo é construir uma plataforma em que diferentes etapas do processo editorial possam coexistir sem perder consistência.

A pergunta central do projeto é:

**como construir um produto editorial inteligente sem comprometer controle, versionamento e confiabilidade?**

## Overview

Produzir e publicar um livro envolve criação, revisão, colaboração, estruturação, versionamento, publicação, distribuição, leitura, áudio, permissões e inteligência artificial.

Quando essas responsabilidades são implementadas sem boundaries claros, o sistema começa a misturar conceitos diferentes.

O conteúdo em edição não é necessariamente o mesmo conteúdo disponível para leitores. Um capítulo em revisão não deveria modificar silenciosamente uma versão já publicada. Geração de áudio incompleta não deveria fazer o livro parecer totalmente processado. Um colaborador não deveria receber permissões apenas porque consegue visualizar um projeto.

Juntos, esses problemas definem a arquitetura do produto.

## Product Vision

```text
Idea
  ↓
Create
  ↓
Write
  ↓
Collaborate
  ↓
Review
  ↓
AI Assist
  ↓
Narrate
  ↓
Publish
  ↓
Read
```

Cada etapa possui necessidades diferentes. O papel da arquitetura é permitir que compartilhem o mesmo produto sem acoplamento perigoso.

## The Problem

Um produto editorial inteligente precisa responder:

- O que significa uma versão publicada?
- O autor pode continuar editando depois da publicação?
- Essas mudanças afetam leitores imediatamente?
- Como colaboradores recebem permissões?
- Como IA participa sem assumir controle editorial?
- Como geração de áudio funciona quando envolve muitas operações assíncronas?
- Como cancelar processamento já iniciado?
- Como representar falhas parciais?
- Quem pode publicar?
- O que um leitor deve consumir?

## The Core Separation

Uma das decisões mais importantes é separar **working copy** de **published version**.

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

O autor pode continuar trabalhando enquanto o leitor consome versão estável.

## Why Published Content Should Be Immutable

Se o Reader consumir conteúdo em edição, qualquer alteração pode modificar instantaneamente uma obra publicada, criando problemas de consistência, histórico, rollback, cache, auditoria e experiência do leitor.

A publicação gera snapshot editorial próprio. Uma nova publicação gera nova versão.

## Working Copy

Representa o estado editorial atual e pode receber edição, revisão, colaboração, IA, reorganização e alterações estruturais.

É espaço de trabalho, não publicação.

## Published Version

Uma PublishedBookVersion representa estado editorial fechado com metadados, estrutura, capítulos, conteúdo e artefatos relacionados.

**reading is based on publication, not editing state.**

## Reader Isolation

Writer precisa de edição, autosave, colaboração, histórico e ferramentas de IA. Reader precisa de estabilidade, desempenho, navegação, continuidade e apresentação.

Misturar os dois domínios cria compromissos desnecessários.

## Writer Studio

Ambiente de autoria com estrutura da obra, capítulos, editor, colaboração, IA assistiva, organização, status e publicação.

O objetivo é proporcionar experiência de criação contínua sem esconder a complexidade editorial necessária.

## Collaboration

Papéis conceituais:

```text
OWNER
EDITOR
VIEWER
```

Capacidades:

```text
read
write
manage
```

A implementação não deve depender de verificações dispersas como `book.userId === currentUserId`.

## Authorization as a Domain Rule

Permissão precisa ser regra de domínio, com conceitos como `requireBookReadAccess()`, `requireBookWriteAccess()` e `requireBookManageAccess()`.

Isso melhora consistência, reutilização, segurança e evolução.

## Ownership vs Collaboration

Ser proprietário não é o mesmo que ter permissão de edição. OWNER pode possuir capacidades administrativas que EDITOR não possui, mas EDITOR ainda precisa poder escrever quando autorizado.

## AI as an Editorial Assistant

IA deve ampliar capacidades editoriais, não substituir o autor.

Possíveis usos: sugestões, reescrita, estruturação, resumo, revisão, geração auxiliar, análise e preparação de conteúdo.

## AI Audit

Operações de IA devem ser auditáveis por usuário, livro, capítulo, operação, modelo, consumo, timestamp e resultado.

## AI Quotas

Consumo de IA é parte do domínio e pode ser aplicado por usuário, plano, período e tipo de operação.

## AI Infrastructure

```text
Editorial Feature
       ↓
AI Service
       ↓
Provider Boundary
       ↓
Model Provider
```

Isso facilita troca de modelos, múltiplos provedores, testes, políticas e controle de custos.

## Narration

Geração de áudio muda o problema de request-response para pipeline:

```text
Request
  ↓
Job
  ↓
Queue
  ↓
Processor
  ↓
Artifacts
  ↓
Completion
```

## Async Processing

Estados explícitos:

```text
PENDING
PROCESSING
COMPLETED
FAILED
CANCELLED
```

O status final precisa representar o resultado real.

## Partial Failure

```text
Speech 1 → success
Speech 2 → success
Speech 3 → failed
Speech 4 → success
```

**processing finished** não é equivalente a **processing succeeded**.

## Cooperative Cancellation

Cancelar um job não significa apenas removê-lo da fila antes do início. Worker em execução precisa observar cancelamento entre etapas e retries.

## Retry

Serviços externos falham. Retry precisa possuir limites, backoff, classificação de erros, cancellation e observabilidade.

## Narration Pipeline

```text
Book
  ↓
Chapter
  ↓
Speech Segmentation
  ↓
Narration Job
  ↓
Queue
  ↓
TTS Provider
  ↓
Audio Artifact
  ↓
Validation
  ↓
Published Audio
```

## Audio Artifacts

Áudio é artefato associado a versão, capítulo, fala, configuração e geração, permitindo rastreabilidade e regeneração.

## Publication and Audio

Texto e áudio podem possuir ciclos diferentes. Uma obra pode estar publicada enquanto áudio ainda está em processamento.

**published text != completed audio**

## Commerce

Quando conteúdo possui acesso comercial, um serviço central deve responder se o usuário pode acessar a obra, considerando ownership, purchase, entitlement, plano ou disponibilidade pública.

## BookCommerceService

Centralizar regras comerciais preserva boundaries. Reader não precisa compreender compra, pagamento, plano ou entitlement.

## Product Architecture

```text
                    Livrya
                      │
    ┌─────────────────┼─────────────────┐
    │                 │                 │
 Writer            Publishing          Reader
    │                 │                 │
Collaboration      Versions          Consumption
    │                 │                 │
 AI              Narration          Commerce
```

## Architecture Layers

```text
Angular Frontend
       ↓
Application API
       ↓
Domain Services
       ↓
Persistence
       ↓
Async Workers
       ↓
External Services
```

Concerns transversais: Authentication, Authorization, Audit, AI Quota e Observability.

## Product State

Estados precisam ser explícitos. Livros, jobs, artefatos, permissões e publicações possuem semânticas distintas.

Quando conceitos diferentes compartilham um único booleano, complexidade começa a vazar.

## Immutability Where It Matters

Nem tudo precisa ser imutável. Working copies existem para mudar. Published version, audit events e historical generation records se beneficiam de imutabilidade.

## State Machines

```text
PENDING
  ↓
PROCESSING
  ├──→ FAILED
  ├──→ CANCELLED
  └──→ COMPLETED
```

Transições precisam possuir regras.

## Failure as Product Behavior

Falha afeta UX. Narração parcial, publicação incompleta e indisponibilidade de IA precisam aparecer como estados reais do produto.

## Frontend Architecture

O frontend precisa representar Writer Studio, library, publication management, collaboration, narration e Reader sem concentrar responsabilidades em componentes gigantes.

## Writer Experience

Operações técnicas como autosave, sincronização, geração, colaboração e processamento devem possuir feedback claro sem dominar a interface.

## Reader Experience

Reader deve priorizar conforto, continuidade, velocidade, legibilidade e navegação.

## Security

Áreas importantes: authentication, authorization, resource ownership, role validation, access checks e secure asset delivery. Permissão no frontend nunca substitui validação de backend.

## Data Integrity

Publicação e processamento assíncrono exigem transactions, idempotency, rollback, retry e recovery.

## Idempotency

Jobs podem ser executados novamente, filas reenviam mensagens e usuários repetem ações. Operações importantes precisam saber se repetição é segura.

## Observability

### API

Erros, latency e authorization failures.

### AI

Requests, model, quota, cost e failures.

### Narration

Jobs, progress, retries, failures e cancellation.

### Publication

Version creation, failures e duration.

## Architecture Reviews

Revisões arquiteturais ajudam a identificar inconsistências que testes isolados nem sempre revelam: permissão compartilhada ignorada em outra camada, job contabilizando falha mas marcando sucesso e cancellation disponível na API mas ignorada pelo worker.

## Why Reviews Matter

Um código pode estar correto dentro de um método e incorreto dentro do sistema. Isso aparece especialmente em autorização, workflows, async processing, retries e state transitions.

## Product Engineering

Livrya representa dimensão diferente de LucyOS e Invest Lucy. Aqui a pergunta não é apenas qual arquitetura investigar, mas como alguém realmente usa isso.

Isso exige combinar produto, UX, domínio, backend, frontend, IA e operação.

## AI Without Losing the Product

A aplicação não deve se tornar “um chat que por acaso cria livros”, mas “uma plataforma editorial que utiliza IA quando cria valor”.

## Domain Before Technology

O problema de publicação não é resolvido escolhendo framework. Primeiro é necessário compreender edição, versão, release e leitura.

## Architecture Principles

- Working Copy Is Not Publication
- Published Versions Are Immutable
- Reader Consumes Publication
- Authorization Is Centralized
- AI Is Audited
- Async Work Has Explicit State
- Partial Failure Is Still Failure
- Cancellation Must Be Cooperative

## Technical Landscape

Frontend: Angular, TypeScript, reactive state e modern UI components.  
Backend: Node.js/application services, domain services e REST APIs.  
Persistence: relational database e versioned schema.  
AI: generative AI services, auditing e quota.  
Async: queues, workers e retry policies.  
Media: text-to-speech e audio artifacts.

## Key Architectural Decisions

Immutable Publication, Centralized Commerce Access, Role-Based Collaboration, AI Audit and Quota, Async Narration Pipeline e Persistent Cancellation.

## What Went Wrong

### Partial narration failure

Processor contabilizava falhas individuais, mas ao final marcava job como concluído, criando falso sucesso.

### Cancellation

Remover job da fila funcionava apenas antes do processamento. Workers em execução não observavam estado persistido de cancelamento.

### Collaboration

Política compartilhada permitia edição por EDITOR, mas serviço específico ainda validava somente ownership direto.

Esses casos reforçaram a necessidade de tratar regras como capacidades sistêmicas.

## Hardening

Depois de concluir funcionalidades principais, o projeto entrou em fase explícita de hardening para fortalecer consistência, segurança, cancellation, failure handling, authorization e async workflows.

## Technical Debt as a Product Concern

Dívida técnica pode representar estados incorretos, autorização inconsistente, falhas silenciosas, dados difíceis de recuperar e dependência excessiva. Quando afeta comportamento, vira risco de produto.

## Collaboration as a Platform Capability

A base de autorização abre espaço para comentários, revisão, aprovação, histórico, presença e edição simultânea.

## Publishing as a Boundary

Antes da publicação:

```text
mutable
collaborative
editable
```

Depois:

```text
stable
versioned
consumable
```

## Reader as a Consumer of Contracts

Reader consome contratos de publicação, permitindo que Writer evolua sem necessariamente quebrar leitura.

## Narration as a Pipeline, Not a Feature

Um botão “gerar áudio” esconde segmentação, filas, processamento, APIs externas, retries, artifacts, estados, progress e cancellation.

## Eventual Consistency

```text
requested ≠ ready
```

A interface precisa representar esse fato claramente.

## UX and System Truth

UX depende de estados de domínio corretos. Modelagem ruim no backend inevitavelmente aparece como experiência confusa.

## Product Boundaries

```text
Authoring
   │
   ├── Writing
   ├── Collaboration
   └── AI
   │
   ↓
Publishing
   │
   ├── Versioning
   └── Distribution
   │
   ↓
Consumption
   │
   ├── Reader
   └── Audio
```

## Why This Project Matters to Me

Livrya é exemplo de uma ideia importante: **produtos aparentemente simples escondem sistemas complexos.**

“Escrever um livro” parece simples, mas transformar isso em plataforma exige modelar autoria, colaboração, publicação, histórico, IA, mídia e acesso.

É exatamente nesse tipo de problema que arquitetura e produto se encontram.

## Lessons Learned

1. Domain boundaries reduce product complexity.
2. Immutability is powerful when representing history.
3. Authorization must be systemic.
4. Async processing requires explicit semantics.
5. Cancellation is a protocol.
6. AI needs governance.
7. UI cannot repair incorrect domain state.
8. Hardening deserves its own phase.

## What I'm Exploring Next

Real-Time Collaboration, Better Revision History, AI Editorial Workflows, Narration Quality, Publishing Workflows, Reader Experience e Multimodal Publishing.

## How Livrya Fits My Work

```text
LucyOS
Agentic Architecture

Invest Lucy
Autonomy + Evidence + Governance

Livrya
Product Engineering
```

Juntos, representam uma parte importante da maneira como penso software hoje.

## Related Engineering Principles

AI is a System, Not a Prompt · Documentation Is Engineering · Failure Is Part of the Architecture · Replaceable Boundaries · Decisions Need Context · Incremental Evolution

## Related Architecture Decisions

Why Published Content Should Be Immutable · Why Reader Should Consume Only Published Versions · Why Authorization Must Be Centralized · Why Async Pipelines Need Cooperative Cancellation · Why Partial Failure Must Not Become Success

## Related Writing

AI Should Support the Product, Not Become the Product · Why Published Content Should Be Immutable · Designing Async Workflows That Can Fail · Cooperative Cancellation in Distributed Jobs · Authorization Is a Domain Problem · Product Engineering Beyond the Feature

## Closing

Livrya não é apenas um editor com recursos de inteligência artificial. É um exercício de arquitetura de produto.

O desafio está em permitir que criação, colaboração, IA, publicação, áudio e leitura evoluam juntas sem perder clareza de domínio.

**bons produtos precisam esconder complexidade do usuário sem esconder complexidade da engenharia.**

**Livrya — AI should strengthen the product, not replace its architecture.**
