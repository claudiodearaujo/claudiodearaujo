# Content Experience v1

**Status:** ✅ Implementado e validado
**Data:** 17/09/2026
**Branch:** `feat/content-experience`

## Objetivo

Transformar a Implementation Foundation em um MVP editorial navegável, prerenderizado e orientado a conteúdo real.

Esta etapa substitui os placeholders por páginas publicáveis para Work, Engineering, Writing, Labs, About, Now e Contact.

## Entregas

- renderer tipado de Markdown;
- manifesto leve de conteúdo;
- módulos de conteúdo lazy-loaded por rota;
- Work landing;
- template compartilhado de deep dive;
- cases LucyOS, Invest Lucy e Livrya;
- Engineering landing e Engineering Principles;
- três ADRs publicados;
- Writing landing e três artigos;
- Labs landing e dois Labs;
- About, Now e Contact;
- Related Content por tags;
- table of contents;
- breadcrumbs;
- metadata SEO;
- JSON-LD;
- canonical condicionado a ambiente;
- sitemap e robots gerados no build;
- proteção de preview contra indexação;
- configuração estática para Render Static Site.

## Content pipeline

```text
src/content/**/*.md
        ↓
front matter + Zod
        ↓
Markdown parse
        ↓
build-time sanitization
        ↓
typed manifest
        ↓
lazy route module per content
        ↓
Angular SSG
```
O manifesto contém apenas metadata necessária aos índices e relações.

O HTML completo de cada conteúdo é colocado em um módulo lazy independente para evitar que cases e artigos longos inflem o bundle inicial.

## Segurança do renderer

O Markdown publicado é controlado pelo repositório.

Mesmo assim, o pipeline aplica `sanitize-html` no build antes de gerar os módulos.

O Angular recebe apenas o HTML já sanitizado e o trust boundary fica explícito no componente de detail.

HTML arbitrário de runtime não é aceito pelo fluxo editorial.

## SEO e ambientes

Fora do Render, sem `SITE_ORIGIN`:

- nenhuma canonical absoluta é inventada;
- nenhum sitemap de produção é persistido.

Em produção no Render, `RENDER_EXTERNAL_URL` é usado como origem padrão enquanto um domínio customizado não for configurado.

Em produção, com `SITE_ORIGIN`:

- canonical;
- `og:url`;
- URLs em JSON-LD;
- sitemap;
- robots com referência ao sitemap.
Em PR preview no Render, quando `IS_PULL_REQUEST=true`:

- `robots.txt` usa `Disallow: /`;
- páginas recebem `noindex, nofollow`.

A simulação de produção gerou 21 URLs válidas no sitemap.

## Render Static Site

Artefatos de deploy:

- `render.yaml` na raiz;
- `robots.txt` gerado no build;
- headers de segurança descritos no Blueprint;
- PR previews configurados no Blueprint.

O output esperado é:

```text
dist/claudiodearaujo/browser
```

Detalhes: [Deployment Render](./DEPLOYMENT-RENDER.md).
## Quality gates

O gate consolidado permanece:

```bash
npm run validate:full
```

Cobertura atual:

- content validation: 15 conteúdos;
- Prettier;
- ESLint;
- TypeScript;
- Vitest: 5 testes;
- build de produção;
- SSG: 21 rotas;
- Playwright: 13 testes;
- axe WCAG A/AA em páginas representativas;
- mobile overflow;
- budgets de bundle.

## Performance atual

Build validado:

```text
Initial JS       ~282.96 kB raw
Initial total    ~286.82 kB raw
Estimated transfer ~79.51 kB
Prerendered routes 21
```
Conteúdos longos permanecem em lazy chunks independentes.

## Correções encontradas pelos gates

Durante a implementação os testes detectaram e permitiram corrigir:

1. H1 duplicado nos deep dives;
2. encoding/mojibake em conteúdo da Home;
3. sanitização incompleta do HTML Markdown;
4. asserção incorreta de JSON-LD nos E2E;
5. contraste insuficiente do token de texto muted no tema claro;
6. risco de conteúdo longo entrar no bundle inicial;
7. indexação indevida de previews.

## Resultado

A camada editorial do MVP deixa de ser estrutural e passa a ser funcional.

A Content Experience v1 foi mergeada. O hosting definitivo foi ajustado para Render Static Site em trilha posterior de deployment readiness.
