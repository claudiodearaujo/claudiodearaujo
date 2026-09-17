# Inventário Editorial do MVP

## Status consolidado

A fundação editorial e a arquitetura técnica v1 do site estão definidas. O projeto está pronto para avançar para UX/wireframes antes do visual design e da implementação.

## Product Foundation

- PRD — ✅ Concluído
- Content Architecture + Sitemap — ✅ Concluído
- Technical Architecture — ✅ Concluído — [TAD-001](./technical/TAD-001-SITE-ARCHITECTURE.md)

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

## Baseline técnica aprovada

O TAD-001 definiu:

- Angular 22 como baseline greenfield;
- Node.js 22.22.3+ como baseline mínima reproduzível;
- standalone + strict mode;
- prerender/SSG como renderização padrão;
- hydration apenas para interatividade necessária;
- conteúdo público em Markdown com front matter;
- validação de conteúdo em build time;
- `src/content` como fonte de verdade de publicação;
- rotas preparadas para `pt` e `en`;
- Signals sem store global dedicada;
- design system próprio com SCSS + CSS Custom Properties;
- SEO, sitemap, canonical, hreflang e JSON-LD gerados pelo build;
- Vitest para unit/component tests;
- Playwright para E2E e acessibilidade;
- Cloudflare Pages como hosting inicial;
- Cloudflare Web Analytics como analytics privacy-first;
- GitHub Actions não obrigatório para o MVP;
- nenhum backend, banco, autenticação, CMS, PWA ou service worker sem requisito real.

## Conteúdo opcional para lançamento

Não bloqueadores do MVP:

- case completo Argos;
- case Enterprise AI;
- case Financial Systems;
- mais ADRs;
- mais artigos;
- mais Labs;
- currículo;
- versão completa em inglês;
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
Technical Architecture     ✅
UX / Wireframes            🔴
Visual Design              🔴
Implementation             🔴
Quality Gate               🔴
Launch                     🔴
```

## Milestones concluídos

### Content Foundation v1 — ✅

A identidade profissional, narrativa central e principal evidência técnica estão documentadas.

### Technical Architecture v1 — ✅

Framework, renderização, pipeline de conteúdo, organização do código, internacionalização, SEO, analytics, testes, segurança, hosting e CI/CD foram formalmente definidos.

## Próxima etapa recomendada

Produzir a especificação de **UX / Wireframes** com foco em estrutura, hierarquia visual e comportamento responsivo, ainda sem congelar identidade visual.

A etapa deve definir pelo menos:

1. application shell;
2. header e navegação;
3. homepage wireframe;
4. Work index;
5. Case Study template;
6. Engineering index e Principles;
7. ADR template;
8. Writing index e Article template;
9. Labs index e Lab template;
10. About;
11. Now;
12. Contact;
13. mobile navigation;
14. estados de foco/keyboard;
15. relações e Related Content;
16. comportamento de diagramas e blocos de código.
