# TAD-001 — Arquitetura Técnica do Site Pessoal

**Status:** Accepted  
**Data:** 17/09/2026  
**Owner:** Cláudio Araújo  
**Escopo:** MVP e base evolutiva do site pessoal

## 1. Contexto

O site pessoal será uma plataforma pública de autoridade técnica, portfólio, conteúdo editorial e registro de evolução profissional. A fundação editorial já está definida em `docs/`, com Home, About, cases, princípios de engenharia, ADRs, artigos, Labs, Now e Contact.

O produto precisa priorizar:

- SEO e indexação;
- performance e Core Web Vitals;
- acessibilidade;
- conteúdo versionado junto ao código;
- baixo custo operacional;
- ausência de backend sem necessidade real;
- facilidade de publicação;
- internacionalização futura;
- segurança por simplicidade;
- capacidade de crescer sem reescrita arquitetural prematura.

## 2. Decisão principal

O site será implementado como uma aplicação **Angular 22**, standalone, orientada a conteúdo, com **Static Site Generation / prerendering como estratégia padrão de renderização**.

Não haverá backend dedicado nem runtime SSR no MVP.

Arquitetura resumida:

```text
Markdown / Assets
       ↓
Build-time Content Pipeline
       ↓
Typed Content Manifest
       ↓
Angular 22
       ↓
Prerender / SSG
       ↓
Static HTML + JS + CSS
       ↓
Render Static Site / CDN
```

## 3. Angular 22 em vez de Angular 21

O PRD original indicava Angular 21+.

Como o projeto é greenfield e a implementação começa em setembro de 2026, a baseline será **Angular 22**.

Motivos:

- é a linha atual para projetos novos;
- preserva a arquitetura moderna standalone;
- possui suporte oficial a SSR, prerender e hybrid rendering;
- mantém a estratégia de Signals e arquitetura zoneless moderna;
- evita iniciar um projeto novo já uma major atrás.

Angular 21 permanece compatível com praticamente todas as decisões deste documento, mas não será a baseline do repositório.

Referências oficiais:

- https://angular.dev/reference/versions
- https://angular.dev/best-practices/performance/ssr
- https://angular.dev/guide/routing/rendering-strategies

## 4. Runtime e toolchain

Baseline:

- Angular 22;
- TypeScript compatível com Angular 22;
- Node.js 22.22.3+ como baseline mínima reproduzível;
- npm como package manager inicial;
- aplicação standalone;
- strict mode habilitado.

A versão exata do Node deverá ser fixada em `.nvmrc` ou equivalente e também no ambiente de build.

## 5. Estratégia de renderização

### 5.1 Decisão

Todas as páginas públicas conhecidas no build serão **prerenderizadas**.

Exemplos:

```text
/pt/
/pt/about
/pt/work
/pt/work/lucyos
/pt/work/invest-lucy
/pt/work/livrya
/pt/engineering/principles
/pt/engineering/decisions/mcp-first
/pt/writing/ai-agents-need-architecture
/pt/labs/long-term-memory-for-agents
/pt/now
/pt/contact
```

### 5.2 Por que SSG

O conteúdo do site é predominantemente:

- público;
- igual para todos os visitantes;
- versionado;
- conhecido durante o build.

Esse é o cenário ideal para prerender.

Benefícios:

- HTML completo entregue imediatamente;
- excelente SEO;
- ótimo tempo de primeira renderização;
- cache simples em CDN;
- ausência de servidor de aplicação;
- menor superfície de ataque;
- menor custo operacional.

### 5.3 SSR runtime

SSR em runtime fica **fora do MVP**.

Será considerado apenas se surgir requisito concreto que dependa de informação request-specific ou conteúdo não conhecido no build.

### 5.4 CSR

CSR não será estratégia primária para páginas indexáveis.

Angular continuará hidratando as páginas para recursos interativos após o HTML prerenderizado ser carregado.

## 6. Hydration e interatividade

Hydration permanecerá habilitada.

A maior parte das páginas deverá funcionar como conteúdo estático com pequenas ilhas interativas.

Uso de `@defer` será considerado para:

- componentes abaixo da dobra;
- diagramas pesados;
- experiências interativas;
- elementos não necessários ao primeiro paint.

Incremental hydration poderá ser utilizada apenas quando medições mostrarem benefício real.

Princípio:

> Static first. Hydrate only what needs interaction.

## 7. Arquitetura de conteúdo

A documentação de produto continuará em:

```text
/docs
```

O conteúdo realmente publicado pelo site ficará separado em:

```text
/src/content
```

Estrutura proposta:

```text
src/content/
├── pt/
│   ├── pages/
│   ├── work/
│   ├── engineering/
│   ├── writing/
│   └── labs/
└── en/
    ├── pages/
    ├── work/
    ├── engineering/
    ├── writing/
    └── labs/
```

`docs/` representa decisões e fonte editorial de trabalho.

`src/content/` representa conteúdo aprovado para publicação.

## 8. Formato de conteúdo

Conteúdo editorial será escrito em **Markdown com front matter YAML**.

Exemplo:

```yaml
---
type: article
slug: ai-agents-need-architecture
title: AI Agents Need Architecture, Not Just Prompts
summary: Por que agentes confiáveis exigem mais do que bons prompts.
locale: pt-BR
status: published
publishedAt: 2026-09-17
updatedAt: 2026-09-17
category: ai-engineering
tags:
  - agents
  - architecture
  - ai
featured: true
---
```

Benefícios:

- legibilidade humana;
- versionamento Git;
- revisão por diff;
- portabilidade;
- independência de CMS;
- fácil geração de sitemap e feeds.

## 9. Content pipeline

Será criado um pipeline Node/TypeScript em build time.

Responsabilidades:

```text
Markdown
   ↓
Parse Front Matter
   ↓
Validate Schema
   ↓
Parse Markdown
   ↓
Sanitize
   ↓
Generate HTML / AST
   ↓
Generate Content Manifest
   ↓
Angular Build
```

Stack proposta:

- `gray-matter` para front matter;
- `zod` para validação de schemas;
- `unified` / `remark` / `rehype` para Markdown;
- `remark-gfm` para Markdown estendido;
- `rehype-sanitize` para impedir HTML arbitrário;
- `rehype-slug` para IDs de headings;
- syntax highlighting em build time quando necessário.

Raw HTML dentro do Markdown ficará desabilitado por padrão.

## 10. Content schemas

Tipos iniciais:

```text
Page
Project
CaseStudy
Article
ADR
Lab
Principle
```

Campos comuns:

```text
slug
locale
title
summary
status
publishedAt
updatedAt
tags
seo
related
```

Campos específicos serão validados durante o build.

Um documento inválido deverá quebrar o build em vez de publicar conteúdo inconsistente.

## 11. Manifesto de conteúdo

O pipeline deverá gerar manifesto tipado contendo:

- rota;
- metadata;
- relacionamentos;
- locale;
- datas;
- tags;
- conteúdo processado;
- estado de publicação.

Esse manifesto será utilizado por:

- rotas;
- prerender params;
- listas de conteúdo;
- Related Content;
- sitemap;
- RSS futuro;
- SEO.

Não haverá varredura de filesystem no browser.

## 12. Estrutura Angular

Estrutura inicial:

```text
src/
├── app/
│   ├── core/
│   │   ├── analytics/
│   │   ├── content/
│   │   ├── seo/
│   │   └── routing/
│   ├── layout/
│   │   ├── header/
│   │   ├── footer/
│   │   └── shell/
│   ├── features/
│   │   ├── home/
│   │   ├── about/
│   │   ├── work/
│   │   ├── engineering/
│   │   ├── labs/
│   │   ├── writing/
│   │   ├── now/
│   │   └── contact/
│   ├── shared/
│   │   ├── ui/
│   │   ├── models/
│   │   ├── pipes/
│   │   └── utilities/
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.routes.server.ts
├── content/
├── generated/
└── styles/

public/
├── images/
├── icons/
├── robots.txt
├── _headers
└── _redirects

tools/
└── content/
```

## 13. Routing

Rotas serão standalone e lazy sempre que isso reduzir bundle inicial sem prejudicar UX.

Estrutura pública planejada:

```text
/:locale
/:locale/about
/:locale/work
/:locale/work/:slug
/:locale/engineering
/:locale/engineering/principles
/:locale/engineering/decisions/:slug
/:locale/labs
/:locale/labs/:slug
/:locale/writing
/:locale/writing/:slug
/:locale/now
/:locale/contact
```

O MVP terá `pt` publicado. A arquitetura já deverá aceitar `en` sem alterar o modelo de rotas.

A raiz `/` deverá redirecionar para o locale padrão.

## 14. Internacionalização

A estratégia será híbrida:

### UI chrome

Textos pequenos de interface poderão utilizar as capacidades oficiais de i18n do Angular.

### Conteúdo editorial

Artigos, cases, Labs e páginas longas terão arquivos Markdown separados por locale.

Não haverá tradução automática em runtime.

Cada conteúdo poderá possuir um identificador lógico que relacione versões PT e EN.

SEO deverá gerar:

- `lang` correto no HTML;
- canonical;
- `hreflang` entre versões;
- `x-default` quando apropriado.

Referência oficial:

- https://angular.dev/guide/i18n

## 15. State management

Não haverá store global dedicada no MVP.

Decisão:

- Signals para estado local e derivado;
- services para estado compartilhado real;
- RxJS quando streams assíncronos forem a abstração adequada;
- sem NgRx inicialmente.

Justificativa:

O site possui pouquíssimo estado transacional. Introduzir uma store global agora violaria o princípio `Complexity Must Pay Rent`.

## 16. UI architecture

O site terá design system próprio.

Baseline:

- semantic HTML;
- SCSS;
- CSS Custom Properties para design tokens;
- layout com CSS Grid/Flexbox;
- componentes Angular pequenos e orientados a responsabilidade;
- nenhuma biblioteca visual pesada como dependência estrutural.

Não utilizar inicialmente:

- Angular Material como identidade visual;
- PrimeNG;
- Tailwind como dependência obrigatória do design.

Angular CDK ou primitives acessíveis poderão ser utilizados quando resolverem um problema concreto.

## 17. Design tokens

Mesmo antes da definição visual definitiva, a implementação deverá trabalhar com tokens.

Exemplos:

```text
--color-background
--color-surface
--color-text
--color-muted
--color-accent
--space-1 ... --space-n
--radius-*
--font-size-*
--content-width
```

Isso permitirá evoluir identidade sem espalhar valores arbitrários pelos componentes.

## 18. Imagens e mídia

Diretrizes:

- AVIF/WebP quando apropriado;
- dimensões explícitas para evitar CLS;
- lazy loading abaixo da dobra;
- `NgOptimizedImage` quando trouxer benefício;
- SVG para diagramas e elementos vetoriais;
- evitar vídeo automático no Hero.

Screenshots corporativos somente após sanitização explícita.

## 19. Diagramas

Diagramas serão componentes editoriais importantes.

No MVP:

- preferir SVG, HTML/CSS ou assets gerados em build time;
- evitar runtime pesado apenas para renderizar diagramas;
- Mermaid poderá ser adotado como ferramenta de autoria desde que a saída seja pré-renderizada no build.

## 20. SEO

Cada rota indexável deverá ter metadata definida pelo próprio conteúdo.

Campos mínimos:

```text
title
description
canonical
og:title
og:description
og:type
og:image
twitter/card
robots
```

Angular `Title` e `Meta` poderão ser utilizados pela camada de SEO durante prerender.

Também serão gerados:

- `sitemap.xml`;
- `robots.txt`;
- canonical links;
- hreflang;
- breadcrumbs estruturados.

Referências oficiais:

- https://angular.dev/best-practices/performance/ssr
- https://angular.dev/api/platform-browser/Meta

## 21. Structured data

JSON-LD inicial:

### Global

- `Person`;
- `WebSite`.

### Articles

- `Article`.

### Navegação

- `BreadcrumbList`.

### Projetos

Utilizar tipos schema.org somente quando semanticamente corretos; não criar marcação apenas para tentar manipular SEO.

## 22. Open Graph

Cada peça relevante deverá possuir imagem social própria ou template reutilizável.

No MVP podem existir templates por tipo:

- Case Study;
- Article;
- ADR;
- Lab.

A geração dinâmica de OG images não é necessária no primeiro release.

## 23. Analytics

O lançamento inicial não dependerá de analytics.

Motivos:

- evitar tracker externo sem necessidade real;
- preservar privacidade por padrão;
- reduzir CSP e integrações no primeiro release;
- não criar coleta de dados sem uma decisão concreta que dependa dela.

Uma solução privacy-first poderá ser adicionada depois, caso métricas passem a orientar decisões reais de produto.

## 24. Hosting

Decisão inicial:

**Render Static Site**.

Motivos:

- encaixe direto com o output prerenderizado;
- CDN global;
- TLS gerenciado;
- custom domains;
- pull request previews;
- integração com GitHub;
- response headers configuráveis;
- não requer runtime Node em produção;
- suporta Blueprint versionado em `render.yaml`.

Referências:

- https://render.com/docs/static-sites
- https://render.com/docs/blueprint-spec
- https://render.com/docs/service-previews

## 25. CI/CD

O deploy utilizará inicialmente a integração GitHub → Render, com infraestrutura descrita em `render.yaml`.

Fluxo:

```text
Branch / PR
    ↓
Render PR Preview
    ↓
Human Review
    ↓
Merge main
    ↓
Render Build
    ↓
npm ci
    ↓
npm run validate
    ↓
Angular Build + Prerender
    ↓
Atomic Static Deploy
```

GitHub Actions **não será requisito para o MVP**.

O build do Render executará o gate não-browser antes de publicar. O gate completo com Playwright continuará sendo obrigatório localmente antes de concluir mudanças relevantes.

## 26. Scripts previstos

```text
npm run start
npm run build
npm run lint
npm run test
npm run test:ci
npm run test:e2e
npm run content:validate
npm run content:build
npm run verify
npm run ci
```

`verify` será o gate local recomendado antes de considerar uma tarefa concluída.

## 27. Unit and component testing

O runner padrão será **Vitest**, alinhado ao tooling atual do Angular.

Cobertura prioritária:

- content parser;
- schema validation;
- SEO services;
- content queries;
- route helpers;
- componentes com lógica real.

Não perseguir cobertura artificial de templates triviais.

Referência oficial:

- https://angular.dev/guide/testing

## 28. E2E

E2E utilizará **Playwright**.

Fluxos mínimos:

1. Home carrega e possui conteúdo principal;
2. navegação principal funciona;
3. abrir case study;
4. abrir artigo;
5. abrir ADR;
6. abrir Lab;
7. canonical e metadata essenciais existem;
8. links de contato existem;
9. página 404 funciona;
10. locale routing funciona.

## 29. Accessibility testing

Meta: **WCAG 2.2 AA**.

Estratégia:

- HTML semântico primeiro;
- navegação completa por teclado;
- foco visível;
- skip link;
- headings consistentes;
- `prefers-reduced-motion`;
- contraste validado;
- axe integrado aos testes Playwright;
- validação manual com teclado e leitor de tela em pontos críticos.

Acessibilidade não será tratada apenas como score Lighthouse.

## 30. Performance budgets

Objetivos do PRD permanecem:

```text
Lighthouse Performance      >= 90
Accessibility               >= 95
Best Practices              >= 95
SEO                         >= 95
```

Além disso:

- evitar dependências client-side grandes;
- lazy loading de features não essenciais;
- não carregar runtime para conteúdo que pode ser estático;
- medir bundle budgets durante implementação.

## 31. Security

A arquitetura estática já remove diversas classes de risco, mas ainda haverá hardening.

Princípios:

- nenhum secret no frontend;
- nenhum token privado no repositório;
- Markdown sanitizado;
- links externos com política adequada;
- dependências mantidas atualizadas;
- Content Security Policy;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy` restritiva;
- `Permissions-Policy` mínima;
- `frame-ancestors 'none'`;
- HTTPS obrigatório;
- HSTS no domínio de produção.

Render Static Sites permite configurar headers diretamente no Blueprint `render.yaml` ou no Dashboard.

Referências:

- https://angular.dev/best-practices/security
- https://render.com/docs/static-site-headers

## 32. CSP

A política CSP definitiva só será congelada após inspecionar o output real do build e os recursos externos utilizados.

Objetivo:

```text
script-src restrito
frame-ancestors 'none'
object-src 'none'
base-uri 'self'
```

Se qualquer analytics externo for habilitado futuramente, seus endpoints deverão ser explicitamente incluídos em `script-src` / `connect-src` conforme necessário.

Evitar liberar domínios através de wildcards amplos.

## 33. Contact

O MVP não terá formulário próprio.

A página Contact utilizará:

- email;
- LinkedIn;
- GitHub.

Isso evita introduzir:

- API;
- armazenamento;
- CAPTCHA;
- spam protection;
- tratamento de PII;

sem benefício suficiente para a primeira versão.

Um formulário poderá ser adicionado posteriormente se houver evidência de necessidade.

## 34. PWA

O site **não será PWA no MVP**.

Não existe requisito relevante de:

- operação offline;
- instalação;
- background sync;
- push notifications.

Adicionar Service Worker agora aumentaria complexidade de cache e atualização sem benefício proporcional.

## 35. Search

Busca fica fora do MVP.

Critério de reavaliação:

- articles > 20;
- ADRs > 15;
- Labs > 10;
- ou evidência de dificuldade real de navegação.

Quando necessária, a primeira alternativa deverá ser índice estático client-side gerado no build antes de introduzir serviço externo.

## 36. CMS

Não haverá CMS no MVP.

Workflow editorial:

```text
Markdown
 ↓
Git
 ↓
Review
 ↓
Build
 ↓
Publish
```

Um CMS só será avaliado quando edição por Git se tornar um gargalo real.

## 37. Backend

Nenhum backend dedicado será criado.

Se futuramente surgir necessidade de pequenas funções dinâmicas, avaliar primeiro:

- Render Web Service pequeno;
- APIs serverless pequenas;

antes de introduzir uma aplicação backend permanente.

## 38. Observability

Como produto estático, observability será simples.

Inicialmente:

- Render deployment status;
- Web Analytics / RUM apenas se futuramente habilitado;
- Core Web Vitals;
- build logs;
- E2E de produção opcional;
- monitor de disponibilidade apenas quando necessário.

Não utilizar stack de observabilidade de aplicação distribuída para um site estático.

## 39. Repository structure

Estrutura-alvo:

```text
/
├── docs/
├── public/
├── src/
│   ├── app/
│   ├── content/
│   ├── generated/
│   ├── styles/
│   ├── index.html
│   └── main.ts
├── tools/
│   └── content/
├── e2e/
├── angular.json
├── package.json
├── tsconfig.json
├── .nvmrc
└── README.md
```

## 40. Generated content

Arquivos derivados de Markdown não devem virar fonte de verdade.

Decisão preferencial:

- `src/content` é source of truth;
- `src/generated` é recriado no build;
- arquivos gerados serão ignorados pelo Git quando possível.

Isso reduz drift entre conteúdo e manifestos.

## 41. Dependencies policy

Uma dependência só deverá ser adicionada quando resolver problema concreto melhor do que uma implementação simples local.

Antes de adicionar biblioteca, avaliar:

- bundle impact;
- manutenção;
- segurança;
- necessidade real;
- capacidade nativa do Angular/browser.

Evitar uma dependência para funcionalidades pequenas que podem ser implementadas com plataforma web nativa.

## 42. Quality gate

Nenhuma entrega será considerada pronta apenas porque compila.

Gate mínimo para implementação:

```text
content validation
       ↓
lint
       ↓
unit tests
       ↓
production build
       ↓
prerender validation
       ↓
critical E2E
       ↓
accessibility checks
```

Antes do launch será adicionado:

```text
SEO validation
security headers
broken links
Lighthouse
responsive review
confidentiality review
```

## 43. Branching

Manter estratégia simples:

```text
main
 ↑
feature/*
```

Mudanças relevantes devem ser feitas em branch e revisadas antes do merge.

Render PR Previews fornecerá URL temporária `onrender.com` para validação de pull requests.

## 44. Environment configuration

O site deverá possuir quase nenhuma configuração de ambiente.

Possíveis valores públicos:

- base URL;
- analytics token/site id quando aplicável;
- build version;
- release SHA.

Nada sensível será exposto através de environment files enviados ao browser.

## 45. Decisões explicitamente adiadas

Fora da baseline inicial:

- runtime SSR;
- backend .NET;
- Supabase;
- database;
- authentication;
- CMS;
- PWA;
- service worker;
- search service;
- newsletter;
- comments;
- user accounts;
- real-time features;
- microservices.

Nenhum deles está proibido para sempre.

Eles apenas não resolveriam problema atual suficiente para pagar sua complexidade.

## 46. Consequências positivas

Esta arquitetura produz:

- deploy simples;
- excelente indexação;
- baixo custo;
- conteúdo auditável por Git;
- baixa superfície operacional;
- arquitetura familiar ao owner;
- caminho claro para internacionalização;
- ótima compatibilidade com CDN;
- evolução incremental.

## 47. Trade-offs

### Build time cresce com conteúdo

Aceitável no volume previsto.

### Conteúdo exige Git

Aceitável enquanto o autor principal é técnico.

### Alteração editorial exige novo deploy

Deliberado e desejável no início.

### Sem backend limita recursos dinâmicos

Não há requisito atual que justifique backend.

### SSG exige que rotas estejam conhecidas no build

Exatamente o modelo atual do conteúdo.

## 48. Triggers de reavaliação

Revisar esta arquitetura se ocorrer um dos seguintes:

1. conteúdo for editado regularmente por pessoas sem Git;
2. existirem dados personalizados por visitante;
3. conteúdo precisar ser publicado sem rebuild;
4. search estático deixar de atender;
5. houver autenticação;
6. surgirem comentários ou comunidade;
7. houver necessidade real de APIs privadas;
8. build time se tornar operacionalmente relevante;
9. internacionalização exigir workflow editorial mais complexo.

## 49. Fases de implementação

### Phase 1 — Bootstrap

- criar Angular 22;
- strict;
- SSR/prerender support;
- estrutura de pastas;
- lint;
- Vitest;
- Playwright;
- scripts de quality gate.

### Phase 2 — Content Engine

- front matter schemas;
- Markdown parser;
- sanitization;
- manifest generation;
- content queries;
- prerender params.

### Phase 3 — Application Shell

- routing;
- header/footer;
- locale structure;
- SEO infrastructure;
- layout base.

### Phase 4 — Content Integration

- Home;
- About;
- Work;
- Engineering;
- Writing;
- Labs;
- Now;
- Contact.

### Phase 5 — Design System

- tokens;
- typography;
- layout;
- cards;
- content components;
- diagrams;
- motion.

### Phase 6 — Quality

- accessibility;
- E2E;
- Lighthouse;
- SEO;
- security headers;
- links;
- confidentiality review.

### Phase 7 — Deployment

- Render Static Site;
- GitHub integration;
- previews;
- custom domain;
- analytics;
- production launch.

## 50. Definition of Done da arquitetura técnica

Este documento será considerado implementado quando:

- Angular 22 estiver criado;
- prerender estiver funcionando;
- conteúdo Markdown estiver validado e publicado pelo pipeline;
- rotas editoriais forem geradas;
- locale base estiver implementado;
- SEO e structured data estiverem presentes;
- testes definidos estiverem executáveis;
- build estático puder ser hospedado no Render;
- nenhum backend estiver sendo mantido sem requisito;
- quality gate bloquear deploy inválido.

## 51. Decisão final

A arquitetura do site será deliberadamente simples no runtime e rica no build.

A complexidade necessária ficará concentrada onde gera valor:

```text
Content Modeling
SEO
Accessibility
Design
Build-time Validation
```

E não onde não existe necessidade atual:

```text
Servers
Databases
Authentication
Runtime APIs
Distributed Infrastructure
```

Princípio final:

> **Build a rich website, not a complex runtime.**
