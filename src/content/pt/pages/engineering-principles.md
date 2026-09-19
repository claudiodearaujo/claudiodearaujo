---
title: Engineering Principles
slug: engineering-principles
locale: pt
type: page
route: /pt/engineering/principles
summary: Princípios que orientam minhas decisões de engenharia, arquitetura e liderança técnica.
tags: [Engineering, Architecture, Leadership]
---

# Engineering Principles

## How I Engineer

Tecnologias mudam rapidamente. Frameworks mudam. Modelos mudam. Plataformas mudam. Mas alguns princípios continuam úteis por muito mais tempo.

Ao longo da minha trajetória, fui acumulando ideias que influenciam a forma como penso arquitetura, inteligência artificial, sistemas distribuídos e liderança técnica.

Não trato esses princípios como regras absolutas. Eles são ferramentas de decisão.

## Index by Theme

Trinta e oito princípios em ordem de escrita ficam difíceis de escanear. Agrupados por tema, eles ficam mais fáceis de navegar sem perder a leitura linear abaixo.

### Autonomy & AI

- [1. Evidence Before Autonomy](#1-evidence-before-autonomy)
- [2. AI Is a System, Not a Prompt](#2-ai-is-a-system-not-a-prompt)
- [3. Human-in-the-loop Is Architecture](#3-human-in-the-loop-is-architecture)
- [22. Tools Create Responsibility](#22-tools-create-responsibility)
- [24. Authorization Is a Domain Problem](#24-authorization-is-a-domain-problem)
- [28. Auditability Grows with Power](#28-auditability-grows-with-power)

### Architecture & Boundaries

- [5. Replaceable Boundaries](#5-replaceable-boundaries)
- [6. Domain Before Technology](#6-domain-before-technology)
- [7. Explicit State Beats Implicit Behavior](#7-explicit-state-beats-implicit-behavior)
- [14. Incremental Evolution](#14-incremental-evolution)
- [15. Complexity Must Pay Rent](#15-complexity-must-pay-rent)
- [16. Simplicity Before Infrastructure](#16-simplicity-before-infrastructure)
- [23. Protocols Can Become Architecture](#23-protocols-can-become-architecture)
- [35. Architecture Should Make Change Safer](#35-architecture-should-make-change-safer)
- [37. The Goal Is Not Maximum Abstraction](#37-the-goal-is-not-maximum-abstraction)
- [38. Build for Evolution, Not Prediction](#38-build-for-evolution-not-prediction)

### Reliability & Failure

- [4. Observability by Design](#4-observability-by-design)
- [8. Failure Is Part of the Architecture](#8-failure-is-part-of-the-architecture)
- [9. Recovery Is a Feature](#9-recovery-is-a-feature)
- [10. Safe Defaults](#10-safe-defaults)
- [11. Immutability Where History Matters](#11-immutability-where-history-matters)
- [25. Partial Failure Is Still Failure](#25-partial-failure-is-still-failure)
- [26. Cancellation Is a Protocol](#26-cancellation-is-a-protocol)
- [27. Idempotency Is a Reliability Tool](#27-idempotency-is-a-reliability-tool)

### Research & Evidence

- [17. Research and Runtime Are Different Systems](#17-research-and-runtime-are-different-systems)
- [18. Baselines Must Be Protected](#18-baselines-must-be-protected)
- [19. Scientific Correctness Is Different from Software Correctness](#19-scientific-correctness-is-different-from-software-correctness)

### Context & Memory

- [20. Context Is a Resource](#20-context-is-a-resource)
- [21. Memory Requires Curation](#21-memory-requires-curation)

### Leadership & Communication

- [12. Documentation Is Engineering](#12-documentation-is-engineering)
- [13. Decisions Need Context](#13-decisions-need-context)
- [29. UX Must Reflect System Truth](#29-ux-must-reflect-system-truth)
- [30. Engineering Is Also Communication](#30-engineering-is-also-communication)
- [31. Context Before Direction](#31-context-before-direction)
- [32. Principles Before Rules](#32-principles-before-rules)
- [33. Ownership Before Control](#33-ownership-before-control)
- [34. Systems Before Heroes](#34-systems-before-heroes)
- [36. Optimize for Understanding](#36-optimize-for-understanding)

## 1. Evidence Before Autonomy

**Autonomy should be earned, not assumed.**

Um sistema não deveria receber mais autonomia simplesmente porque tecnicamente consegue executar determinada ação.

Existe uma diferença fundamental entre **Can execute** e **Should execute**.

A primeira é capacidade. A segunda envolve evidência, risco e responsabilidade.

Progressão possível:

```text
Observe
   ↓
Recommend
   ↓
Prepare
   ↓
Execute with Approval
   ↓
Execute Within Policy
```

Antes de ampliar autonomia, procuro responder se o comportamento foi observado por tempo suficiente, se existem métricas, cenários de falha, reconstrução de decisões, rollback e condições que invalidam a confiança atual.

Exemplo: Invest Lucy utiliza Scientific Evidence → Shadow Outcomes → Calibration → Hypothesis Experiments → Walk-forward → OOS → Monte Carlo → Human Review.

## 2. AI Is a System, Not a Prompt

**Good prompts do not replace engineering.**

Uma aplicação de IA envolve modelos, contexto, dados, retrieval, memória, ferramentas, permissões, avaliação, observabilidade, custos, fallback, segurança e governança.

O prompt é apenas uma interface entre essas partes.

```text
Product
  ↓
AI Capability
  ↓
Context
  ↓
Model
  ↓
Tools
  ↓
Evaluation
```

No LucyOS, inteligência emerge da combinação entre agentes, memória, conhecimento, MCP, ferramentas, contexto e políticas.

## 3. Human-in-the-loop Is Architecture

**Human control should be designed, not improvised.**

Participação humana precisa existir como parte explícita da arquitetura.

Precisamos definir onde decisões humanas são necessárias, quais ações exigem aprovação, como interromper uma execução, como revisar decisões e como comunicar incerteza.

Uma taxonomia útil:

```text
Read
Suggest
Prepare
Execute with Approval
Execute Within Policy
High-Risk Execute
```

## 4. Observability by Design

**If a system can act, we should be able to understand what it did.**

Observabilidade vai além de logs.

Precisamos responder o que aconteceu, quando, por quê, quais dependências participaram, qual contexto estava disponível e qual foi o resultado.

Em sistemas inteligentes existe uma pergunta adicional: **Como reconstruímos uma decisão?**

## 5. Replaceable Boundaries

**External dependencies should not become your architecture.**

Modelos, APIs, serviços e frameworks mudam.

Identificar dependências com alta probabilidade de mudança e impedir que detalhes específicos atravessem o sistema inteiro ajuda a reduzir acoplamento.

```text
Domain
   ↓
Capability
   ↓
Adapter
   ↓
External Provider
```

## 6. Domain Before Technology

**Understand the problem before choosing the abstraction.**

Perguntas como “microservices?”, “eventos?” ou “agentes?” são secundárias.

Primeiro precisamos compreender entidades, estados, responsabilidades, invariantes, fluxos, falhas e boundaries.

No Livrya, a distinção entre working copy e published version veio antes da tecnologia.

## 7. Explicit State Beats Implicit Behavior

**Important state should be modeled.**

Evitar ausência de registro significando “pendente”, booleanos tentando representar muitos estados ou processo finalizado sendo tratado como processo bem-sucedido.

Preferir estados explícitos como:

```text
PENDING
PROCESSING
COMPLETED
FAILED
CANCELLED
```

## 8. Failure Is Part of the Architecture

**Systems should be designed for failure, not surprise.**

APIs falham, bancos ficam indisponíveis, workers caem, mensagens chegam duas vezes e requests sofrem timeout.

Precisamos responder: pode repetir? é idempotente? existe retry? cancellation? DLQ? recovery?

## 9. Recovery Is a Feature

**Restarting the process is not recovery.**

Recuperação precisa considerar efeitos externos e estado real do mundo.

Reconciliation, checkpoints, idempotency, durable state, replay e recovery procedures fazem parte do design.

## 10. Safe Defaults

**When uncertain, systems should fail toward the safer state.**

Exemplos:

```text
No authorization → deny
No autonomy configuration → autonomy off
Unknown state → do not execute
Invalid evidence → do not promote
```

## 11. Immutability Where History Matters

**Mutable systems still need immutable history.**

Alguns dados representam fatos históricos: publicação, eventos financeiros, auditoria, decisões, fills e versões.

Pergunta útil: isso representa estado atual ou algo que aconteceu?

## 12. Documentation Is Engineering

**Code tells us what. Documentation preserves why.**

PRD responde o que queremos construir. ADR responde por que escolhemos determinada abordagem. Implementation Plan responde como executar. Validation Report responde se a hipótese foi atendida. Roadmap registra sequência de evolução.

## 13. Decisions Need Context

**A decision without context becomes a rule without meaning.**

Para decisões relevantes, registrar:

```text
Context
Decision
Alternatives
Consequences
What could change this decision?
```

## 14. Incremental Evolution

**Large systems should earn complexity progressively.**

Preferir:

```text
Simple
  ↓
Observed limitation
  ↓
Explicit requirement
  ↓
New capability
```

em vez de construir grande infraestrutura para necessidade futura apenas possível.

## 15. Complexity Must Pay Rent

**Every abstraction should solve a real problem.**

Cada nova camada adiciona manutenção, aprendizado, debugging, deploy, observabilidade e dependências.

Perguntas: qual problema concreto resolve? o que fica mais simples? quem manterá isso? existe solução menor?

## 16. Simplicity Before Infrastructure

**Infrastructure should support the product, not define it.**

Começar pela menor infraestrutura capaz de sustentar requisitos atuais com margem razoável de evolução.

## 17. Research and Runtime Are Different Systems

**Experimentation and production optimize for different things.**

Pesquisa precisa de liberdade para testar, comparar, falhar e mudar parâmetros. Runtime precisa de previsibilidade, estabilidade, governança e auditabilidade.

```text
Research
   ↓
Evidence
   ↓
Promotion Gate
   ↓
Runtime
```

## 18. Baselines Must Be Protected

**Experiments are useful only when there is something stable to compare against.**

```text
Baseline
vs
Experiment A
vs
Experiment B
```

## 19. Scientific Correctness Is Different from Software Correctness

**A program can run perfectly and still produce invalid evidence.**

Exemplos: look-ahead bias, data leakage, seleção inadequada, janela temporal errada e outcome prematuro.

Qualidade científica precisa validar:

```text
Code Correctness
+
Data Correctness
+
Methodological Correctness
```

## 20. Context Is a Resource

**More context is not always better context.**

Contexto possui custo, ruído, limites e risco de conflito.

Separar memória, conhecimento, projeto, conversa e estado operacional ajuda a montar contexto intencionalmente.

## 21. Memory Requires Curation

**Remembering everything is another form of forgetting.**

Memória precisa considerar relevância, tempo, atualização, conflito, consolidação e descarte.

## 22. Tools Create Responsibility

**Giving an agent a tool changes the risk model.**

Um agente capaz de editar arquivos, enviar mensagens, executar código, modificar bancos ou operar sistemas financeiros possui outro perfil de risco.

Ferramentas precisam de autorização, scope, contracts, audit e aprovação humana quando necessário.

## 23. Protocols Can Become Architecture

**Good protocols create useful boundaries.**

Protocolos podem separar Intent de Implementation. MCP é exemplo relevante em ecossistemas agentic.

## 24. Authorization Is a Domain Problem

**Permissions should describe capabilities, not scattered conditionals.**

Preferir conceitos como `canRead`, `canWrite`, `canManage` ou guards de domínio equivalentes.

## 25. Partial Failure Is Still Failure

**Finished is not the same as successful.**

Workflows distribuídos podem terminar com resultados incompletos. Semântica de estado importa.

## 26. Cancellation Is a Protocol

**Cancel is not just a UI button.**

O request pode pedir cancelamento, mas worker precisa observar, interromper, persistir estado e liberar recursos.

## 27. Idempotency Is a Reliability Tool

**Retry without idempotency can duplicate side effects.**

Operações importantes precisam identificar intent único, correlation id, existing result e safe retry behavior.

## 28. Auditability Grows with Power

**The more a system can do, the more it must explain.**

Quanto maior a capacidade de impacto, maior precisa ser observabilidade, auditabilidade, autorização e clareza de intervenção humana.

## 29. UX Must Reflect System Truth

**The interface should never invent certainty the backend does not have.**

Se o backend possui estado incerto, a UI precisa representar incerteza.

## 30. Engineering Is Also Communication

**Systems scale through shared understanding.**

Arquitetura não escala se apenas uma pessoa a compreende. Naming, documentação, diagramas, reviews, princípios e decisões registradas fazem parte da engenharia.

## 31. Context Before Direction

**People make better decisions when they understand why.**

Dar instruções resolve o problema imediato. Compartilhar contexto melhora decisões futuras.

## 32. Principles Before Rules

**Rules answer known situations. Principles help with new ones.**

Princípios compartilhados permitem resolver novos problemas mantendo coerência.

## 33. Ownership Before Control

**Strong engineering teams need responsibility, not constant permission.**

O equilíbrio está em contexto claro, boundaries claros e ownership real.

## 34. Systems Before Heroes

**Reliable organizations should not require constant rescue.**

Boa engenharia tenta reduzir necessidade de heroísmo por automação, documentação, processos, observabilidade e melhores boundaries.

## 35. Architecture Should Make Change Safer

**The real test of architecture is not the first release.**

Boa arquitetura não elimina mudança; reduz custo e risco de mudar.

## 36. Optimize for Understanding

**Clever code is expensive when nobody can safely change it.**

Favorecer nomes claros, responsabilidade explícita, fluxo visível e abstrações justificadas.

## 37. The Goal Is Not Maximum Abstraction

**Abstractions should remove complexity, not hide it.**

Cada abstração deveria possuir razão clara. Se apenas move complexidade para outro arquivo, talvez não esteja ajudando.

## 38. Build for Evolution, Not Prediction

**Architecture should tolerate change without pretending to know the future.**

Não antecipar todos os requisitos futuros; identificar áreas de provável mudança e criar espaço para evolução.

## My Decision Framework

1. What problem are we actually solving?
2. What are the invariants?
3. Where should state live?
4. What happens when this fails?
5. What changes most often?
6. What needs to be auditable?
7. What can humans override?
8. How will we know if it works?
9. What is the simplest acceptable solution?
10. What would make us revisit this decision?

## How the Principles Connect

```text
Autonomy
   ↓
requires Evidence
   ↓
requires Observability
   ↓
requires Explicit State
   ↓
requires Auditability
   ↓
requires Governance
   ↓
requires Human Control
```

E:

```text
AI Capability
   ↓
uses Tools
   ↓
requires Boundaries
   ↓
requires Authorization
   ↓
requires Observability
   ↓
requires Failure Handling
```

## Projects That Shaped These Principles

### LucyOS

AI is a System, Not a Prompt; Context Is a Resource; Memory Requires Curation; Replaceable Boundaries; MCP-first; Human Control.

### Invest Lucy

Evidence Before Autonomy; Safe Defaults; Research vs Runtime; Scientific Correctness; Recovery; Auditability; Human Review.

### Livrya

Domain Before Technology; Explicit State; Immutability; Authorization; Cooperative Cancellation; Partial Failure; Product Boundaries.

## These Principles Are Not Finished

Esses princípios representam meu pensamento atual. Não são dogmas. Experiência nova pode refiná-los, criar exceções, revelar conflitos ou gerar novos princípios.

## Closing

Depois de mais de duas décadas trabalhando com software, minha visão se tornou menos centrada em tecnologias específicas.

O que mais importa para mim hoje é construir sistemas que consigam combinar capability com clarity, autonomy com control, complexity com understanding e change com reliability.

**Build systems that can evolve without becoming impossible to understand.**
