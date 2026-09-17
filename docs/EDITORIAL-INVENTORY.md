# Inventário Editorial do MVP

## Status consolidado

A fundação editorial do site já possui material suficiente para avançar da estratégia de conteúdo para arquitetura técnica e UX.

## Product Foundation

- PRD — ✅ Concluído
- Content Architecture + Sitemap — ✅ Concluído

## Conteúdo principal

- Homepage — ✅ Conteúdo v1 concluído
- About — ✅ Conteúdo v1 concluído
- Now — ✅ Concluído
- Contact — ✅ Concluído

## Core Case Studies

- LucyOS — ✅ Concluído — Personal Agentic AI Platform
- Invest Lucy — ✅ Concluído — Evidence-Driven Autonomous Investment Research
- Livrya — ✅ Concluído — AI-Powered Publishing Platform

## Engineering Principles

✅ Concluído.

Princípios documentados incluem Evidence Before Autonomy, AI Is a System Not a Prompt, Human-in-the-loop Is Architecture, Observability by Design, Replaceable Boundaries, Domain Before Technology, Explicit State, Failure, Recovery, Safe Defaults, Immutability, Documentation, Context, Incremental Evolution, Complexity, Research vs Runtime, Scientific Correctness, Memory, Tools, Authorization, Idempotency, Auditability, Leadership e evolução arquitetural.

## Architecture Decisions

- ADR 001 — Why MCP-first? — ✅
- ADR 002 — Why Shadow Mode Before Autonomy? — ✅
- ADR 003 — Why Human Control Belongs in the Architecture? — ✅

Mínimo de ADRs para MVP atingido.

## Writing

- Article 001 — AI Agents Need Architecture, Not Just Prompts — ✅
- Article 002 — From Automation to Autonomy — ✅
- Article 003 — Evidence Before Autonomy — ✅

Mínimo editorial para MVP atingido.

## Labs

- Lab 001 — Long-Term Memory for Agents — ✅
- Lab 002 — Evaluating Agentic Systems — ✅

Mínimo de Labs para MVP atingido.

## Conteúdo essencial do MVP

```text
Home                    ✅
About                   ✅
Work landing            🟡
3 Case Studies          ✅
Engineering Principles  ✅
3 ADRs                   ✅
Labs landing             🟡
2 Labs                   ✅
Writing landing          🟡
3 Articles               ✅
Now                      ✅
Contact                  ✅
```

## Páginas de índice ainda necessárias

### `/work`

Deverá apresentar inicialmente LucyOS, Invest Lucy, Livrya, Argos, Enterprise AI e Financial Systems. Os três primeiros já possuem case completo; os três seguintes podem iniciar como cards resumidos.

### `/labs`

Apresentará Long-Term Memory for Agents e Evaluating Agentic Systems, preparando categorias para novos experimentos.

### `/writing`

Apresentará os três artigos iniciais, categorias e espaço para crescimento editorial.

## Conteúdo opcional para lançamento

Não bloqueadores do MVP:

- case completo Argos;
- case Enterprise AI;
- case Financial Systems;
- mais ADRs;
- mais artigos;
- mais Labs;
- currículo;
- versão em inglês;
- newsletter;
- speaking;
- open-source page.

## Confidentiality Review

Antes da publicação, revisar conteúdos ligados a projetos corporativos e pessoais para evitar exposição de nomes internos, URLs privadas, endpoints, nomes de tabelas, infraestrutura, credenciais, screenshots, nomes de pessoas, políticas internas e informações operacionais confidenciais.

## Editorial Consistency Review

Antes da implementação definitiva:

- remover repetições excessivas;
- manter terminologia consistente;
- decidir equilíbrio PT-BR / inglês técnico;
- uniformizar títulos;
- reduzir textos onde UX exigir;
- preservar versões completas para deep dives.

## Content Depth Strategy

### Level 1 — Scan

Homepage e cards. Leitura em segundos.

### Level 2 — Understand

Introduções e seções resumidas. Leitura em minutos.

### Level 3 — Deep Dive

Cases, ADRs, Labs e artigos.

## Próxima fase

# Technical Architecture

Decidir formalmente:

- framework;
- rendering;
- content engine;
- repository structure;
- routing;
- internationalization;
- SEO;
- analytics;
- deployment;
- hosting;
- testing;
- CI/CD;
- security;
- observability;
- content schemas.

## Sequência atualizada

```text
Product Vision             ✅
PRD                        ✅
Content Architecture       ✅
Sitemap                    ✅
Homepage                   ✅
About                      ✅
LucyOS Case                ✅
Invest Lucy Case           ✅
Livrya Case                ✅
Engineering Principles     ✅
ADR 001                    ✅
ADR 002                    ✅
ADR 003                    ✅
Article 001                ✅
Article 002                ✅
Article 003                ✅
Lab 001                    ✅
Lab 002                    ✅
Now                        ✅
Contact                    ✅
Work Index                 🟡
Labs Index                 🟡
Writing Index              🟡
Technical Architecture     🔴
UX / Wireframes            🔴
Visual Design              🔴
Implementation             🔴
Quality Gate               🔴
Launch                     🔴
```

## Editorial Milestone

Podemos considerar concluído o marco **Content Foundation v1**.

A identidade profissional, a narrativa central e a principal evidência técnica do site já estão documentadas.

A partir daqui, a pergunta passa a ser: qual é a melhor maneira de estruturar, apresentar e implementar aquilo que já definimos?

## Próximo passo recomendado

Produzir um **Technical Architecture Decision Document** definindo Angular ou alternativa, SSR/SSG, versionamento de conteúdo, Markdown/JSON, rotas dinâmicas, i18n, SEO, structured data, hosting, deploy e preparação para crescimento sem infraestrutura excessiva.
