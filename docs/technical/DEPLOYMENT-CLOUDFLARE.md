# Cloudflare Pages — Deployment Readiness

**Status:** Ready for project connection
**Data:** 17/09/2026
**Escopo:** build estático, preview e produção

## Objetivo

Publicar o site Angular prerenderizado sem runtime Node, Functions ou backend.

A saída de produção validada localmente é:

```text
dist/claudiodearaujo/browser
```

O Pages deve servir os arquivos estáticos diretamente do CDN.

## Configuração do projeto

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist/claudiodearaujo/browser`
- Root directory: raiz do repositório
- Node: fixado por `.node-version`
- Pages Functions: não utilizadas
## Variáveis

### Produção

Configurar:

```text
SITE_ORIGIN=https://<dominio-final>
```

O valor não deve conter barra final.

Quando `SITE_ORIGIN` existe, o build gera:

- canonical URLs;
- `og:url`;
- URLs de JSON-LD;
- `sitemap.xml`;
- referência ao sitemap em `robots.txt`.

### Preview

Não configurar `SITE_ORIGIN` para branches de preview.

Em Cloudflare Pages, quando `CF_PAGES=1` e não existe `SITE_ORIGIN`, o build gera:

```text
User-agent: *
Disallow: /
```

e o frontend adiciona `noindex, nofollow`.
## Comportamento de rotas

O site possui um `404.html` de topo.

Isso é deliberado: Cloudflare Pages trata sites sem `404.html` como SPA e pode redirecionar rotas inexistentes para a raiz.

Como o projeto usa SSG, cada rota publicada deve possuir um HTML prerenderizado próprio.

O arquivo `public/_redirects` contém apenas:

```text
/ /pt 301
```

Rotas publicadas são resolvidas pelos arquivos gerados pelo Angular.

## Security headers

`public/_headers` adiciona:

- `X-Frame-Options: DENY`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- Content Security Policy.
A CSP permite apenas:

- assets da própria origem;
- inline necessário ao bootstrap estático;
- Cloudflare Web Analytics, caso habilitado pelo dashboard.

Não foram adicionadas regras customizadas de cache.

Cloudflare Pages já possui caching próprio otimizado e custom cache headers poderiam produzir conteúdo stale após deploy.

## Web Analytics

Cloudflare Web Analytics pode ser habilitado no dashboard.

O site não depende dele para funcionar.

A CSP já permite os endpoints necessários do Cloudflare Insights.

## Preview deployments

Recomendação:

- produção automática somente a partir de `main`;
- previews para branches não-main;
- usar a URL de preview para review visual e E2E manual quando necessário;
- nunca usar URL de preview como canonical.
## Quality gate anterior ao deploy

Antes de considerar uma mudança pronta:

```bash
npm run validate:full
```

O gate cobre:

1. geração e validação dos conteúdos;
2. Prettier;
3. ESLint;
4. TypeScript;
5. Vitest;
6. build SSG;
7. Playwright desktop/mobile e rotas profundas.

## Validação de SEO de produção

Antes do primeiro deploy real, executar localmente com um domínio de teste controlado:

```bash
SITE_ORIGIN=https://example.invalid npm run build
```

Verificar geração de canonical, sitemap e robots.

Depois limpar a variável e regenerar os artefatos locais.
## Launch blockers externos

O código não precisa de mudança para criar o projeto Pages.

Restam decisões/ações externas:

1. conectar o repositório ao Cloudflare Pages;
2. definir o domínio final;
3. cadastrar `SITE_ORIGIN` somente no ambiente de produção;
4. habilitar Web Analytics, se desejado;
5. validar preview;
6. apontar domínio customizado;
7. validar headers e sitemap no domínio real.

## Referências oficiais

- https://developers.cloudflare.com/pages/configuration/build-configuration/
- https://developers.cloudflare.com/pages/configuration/serving-pages/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://developers.cloudflare.com/pages/get-started/git-integration/
