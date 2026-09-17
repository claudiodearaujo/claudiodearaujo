# Inventário Editorial do MVP

## Status consolidado

A fundação editorial, a arquitetura técnica v1 e a especificação de UX/wireframes do MVP estão definidas. O projeto está pronto para avançar para Visual Design / Design System Foundation antes da implementação.

## Product Foundation

- PRD — ✅ Concluído
- Content Architecture + Sitemap — ✅ Concluído
- Technical Architecture — ✅ Concluído — [TAD-001](./technical/TAD-001-SITE-ARCHITECTURE.md)
- UX / Wireframes — ✅ Concluído — [UX Wireframes](./ux/UX-WIREFRAMES.md)

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

## Architecture Decisions

- ADR 001 — Why MCP-first? — ✅
- ADR 002 — Why Shadow Mode Before Autonomy? — ✅
- ADR 003 — Why Human Control Belongs in the Architecture? — ✅

## Writing

- Article 001 — AI Agents Need Architecture, Not Just Prompts — ✅
- Article 002 — From Automation to Autonomy — ✅
- Article 003 — Evidence Before Autonomy — ✅

## Labs

- Lab 001 — Long-Term Memory for Agents — ✅
- Lab 002 — Evaluating Agentic Systems — ✅

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

## Páginas de índice ainda necessárias no conteúdo final

### `/work`

Apresentará LucyOS, Invest Lucy, Livrya, Argos, Enterprise AI e Financial Systems. Os três primeiros já possuem case completo; os demais podem iniciar como cards resumidos.

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

## UX baseline aprovada

A especificação de UX definiu:

- Home como mapa narrativo do site;
- landings como pontos de descoberta;
- cases, artigos, ADRs e Labs como deep dives;
- três níveis de leitura: Scan → Understand → Deep Dive;
- navegação desktop e mobile;
- templates para Home, Work, Case Study, Engineering, Principles, ADRs, Writing, Articles, Labs, About, Now e Contact;
- mobile first-class, sem dependência de hover;
- content graph com Related Content;
- TOC lateral apenas quando largura permitir;
- foco, teclado, reduced motion e semântica incorporados desde o wireframe;
- ausência deliberada de formulário de contato, filtros complexos, skeletons e loaders artificiais no MVP;
- 404 e estados essenciais definidos;
- conteúdo estático tratado como build-time concern, não runtime fetching.

Princípio central de UX:

> **Make depth available without making complexity mandatory.**

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
UX / Wireframes            ✅
Visual Design              🔴
Implementation             🔴
Quality Gate               🔴
Launch                     🔴
```

## Milestones concluídos

### Content Foundation v1 — ✅

Identidade profissional, narrativa central e evidência técnica documentadas.

### Technical Architecture v1 — ✅

Framework, renderização, pipeline de conteúdo, organização do código, internacionalização, SEO, analytics, testes, segurança, hosting e CI/CD definidos.

### UX / Wireframes v1 — ✅

Hierarquia, templates, navegação, responsividade, fluxos e padrões de interação definidos sem congelar a identidade visual.

## Próxima etapa recomendada

Produzir a especificação de **Visual Design / Design System Foundation**.

A etapa deve fechar pelo menos:

1. direção estética;
2. estratégia light/dark;
3. identidade visual e marca CA;
4. tipografia;
5. paleta e semântica de cores;
6. spacing e grid;
7. tokens;
8. botões e links;
9. cards;
10. headers e navegação;
11. estilos editoriais;
12. code blocks;
13. diagramas;
14. status e metadata;
15. motion;
16. protótipo visual da Home;
17. protótipo de Case Study;
18. protótipo de Article/Lab/ADR.
