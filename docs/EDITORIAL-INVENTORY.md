# Inventário Editorial do MVP

## Status consolidado

A fundação editorial, a arquitetura técnica v1, a especificação de UX/wireframes e a fundação de Visual Design / Design System estão definidas. O projeto está pronto para iniciar a Implementation Foundation.

## Product Foundation

- PRD — ✅ Concluído
- Content Architecture + Sitemap — ✅ Concluído
- Technical Architecture — ✅ Concluído — [TAD-001](./technical/TAD-001-SITE-ARCHITECTURE.md)
- UX / Wireframes — ✅ Concluído — [UX Wireframes](./ux/UX-WIREFRAMES.md)
- Visual Design / Design System Foundation — ✅ Concluído — [Visual Design](./design/VISUAL-DESIGN-SYSTEM.md)

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
Work landing            ✅
3 Case Studies          ✅
Engineering Principles  ✅
3 ADRs                   ✅
Labs landing             ✅
2 Labs                   ✅
Writing landing          ✅
3 Articles               ✅
Now                      ✅
Contact                  ✅
```

## Páginas de índice implementadas

### `/work`

Apresentará LucyOS, Invest Lucy, Livrya, Argos, Enterprise AI e Financial Systems. Os três primeiros já possuem case completo; os demais podem iniciar como cards resumidos.

### `/labs`

Apresentará Long-Term Memory for Agents e Evaluating Agentic Systems, preparando categorias para novos experimentos.

### `/writing`

Apresentará os três artigos iniciais, categorias e espaço para crescimento editorial.

## Baseline técnica aprovada

- Angular 22 greenfield;
- Node.js 22.22.3+;
- standalone + strict mode;
- prerender/SSG padrão;
- conteúdo Markdown + front matter validado no build;
- `src/content` como fonte de verdade de publicação;
- estrutura pronta para `pt` e `en`;
- Signals sem store global dedicada;
- Vitest + Playwright;
- Render Static Site;
- analytics opcional e não bloqueador do MVP;
- sem backend, banco, autenticação, CMS, PWA ou service worker sem requisito real.

## UX baseline aprovada

- Home como mapa narrativo;
- landings como descoberta;
- deep dives em cases, artigos, ADRs e Labs;
- Scan → Understand → Deep Dive;
- navegação desktop/mobile;
- content graph com Related Content;
- TOC responsivo;
- foco, teclado, semântica e reduced motion incorporados;
- sem formulário de contato e sem loaders artificiais no MVP.

Princípio de UX:

> **Make depth available without making complexity mandatory.**

## Visual Design baseline aprovada

### Direção

**Editorial-tech sofisticada**, com engenharia e arquitetura como linguagem visual.

### Theme

- dark-first, não dark-only;
- respeito a `prefers-color-scheme`;
- toggle manual com persistência local;
- light e dark equivalentes em legibilidade e função.

### Identidade

- monograma `CA` simples e geométrico;
- motivo gráfico baseado em boundaries, linhas e conexões;
- sem cérebro digital, terminal fake, matrix ou estética hacker.

### Tipografia

- Manrope Variable — headings/display;
- Inter Variable — body/UI;
- JetBrains Mono Variable — code/metadata.

### Cor

- superfícies neutras profundas no dark;
- branco/off-white no light;
- azul controlado como accent;
- cores semânticas discretas;
- contraste WCAG 2.2 AA.

### Componentes e linguagem

- boundaries e borders mais importantes que sombras;
- cards apenas quando houver agrupamento real;
- diagramas como componentes de primeira classe;
- code blocks editoriais, não terminais decorativos;
- status com texto + sinal visual;
- motion mínimo e funcional;
- Open Graph coerente com a marca.

Assinatura:

> **Deep neutral surfaces + precise typography + structural lines + controlled blue accent + architecture as visual language.**

## Conteúdo opcional para lançamento

Não bloqueadores:

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
Work Index                 ✅
Labs Index                 ✅
Writing Index              ✅
Technical Architecture     ✅
UX / Wireframes            ✅
Visual Design              ✅
Implementation Foundation  ✅
Implementation             ✅
Quality Gate               ✅
Launch                     🟡
```

## Milestones concluídos

### Content Foundation v1 — ✅

Identidade profissional, narrativa central e evidência técnica documentadas.

### Technical Architecture v1 — ✅

Framework, renderização, pipeline de conteúdo, organização do código, internacionalização, SEO, analytics, testes, segurança, hosting e CI/CD definidos.

### UX / Wireframes v1 — ✅

Hierarquia, templates, navegação, responsividade, fluxos e padrões de interação definidos.

### Visual Design / Design System Foundation v1 — ✅

Direção estética, tema, identidade, tipografia, paleta, spacing, grid, tokens, componentes editoriais, diagramas e motion definidos.

## Implementation Foundation v1 — ✅

A base Angular 22, SSG, shell, tema, content pipeline e quality gates locais estão implementados e validados.

Fonte: [Implementation Foundation v1](./technical/IMPLEMENTATION-FOUNDATION.md).

## Content Experience v1 — ✅

Renderer tipado, landings, deep dives, SEO, accessibility gates, performance budgets e preparação para Render Static Site implementados.

Fonte: [Content Experience v1](./technical/CONTENT-EXPERIENCE-V1.md).

## Próxima etapa recomendada

Com a **Content Experience v1 já mergeada**, concluir Render Deployment & Launch Readiness:

1. sincronizar o Blueprint no Render;
2. ativar/validar security headers;
3. ativar/validar PR previews;
4. definir o domínio final;
5. configurar `SITE_ORIGIN` no domínio final;
6. revalidar headers, robots, sitemap e canonical;
7. executar revisão visual final;
8. concluir launch readiness.

Toda tarefa de implementação deve passar por `npm run validate:full` antes de ser considerada concluída.

## Render Live Deployment — ✅

O Static Site está live em `https://claudiodearaujo-site.onrender.com`. Build, deep routes, SEO, sitemap com 21 URLs, 404 e 13/13 E2E live foram validados. Headers adicionais e PR previews permanecem pendentes da sincronização do Blueprint.

Fonte: [Render Live Deployment Validation](./technical/RENDER-LIVE-VALIDATION.md).
