# Render Static Site — Deployment Readiness

**Status:** Ready for service creation
**Data:** 17/09/2026
**Escopo:** build estático, PR previews e produção

## Objetivo

Publicar o site Angular prerenderizado como **Render Static Site**, sem runtime Node, container ou backend.

A saída validada do Angular é:

```text
dist/claudiodearaujo/browser
```

O Render publica esse diretório em CDN global.

## Infraestrutura como código

A configuração está versionada em `render.yaml`.

Decisões principais:

- service name: `claudiodearaujo-site`;
- `type: web`;
- `runtime: static`;
- build: `npm ci && npm run validate`;
- publish path: `./dist/claudiodearaujo/browser`;
- auto deploy por commit;
- PR previews automáticos;
- headers de segurança no Blueprint.
## Dependências e Node

O repositório contém:

```text
.node-version = 24.16.0
```

O Render reconhece `.node-version` como uma das formas oficiais de fixar Node.

Como o build command executa `npm ci` explicitamente, o Blueprint usa:

```text
SKIP_INSTALL_DEPS=true
```

para evitar uma instalação automática duplicada antes do build.

## URLs e SEO

O pipeline entende três situações.

### Local

Sem variáveis do Render:

- `siteOrigin` vazio;
- sem canonical absoluta;
- sem sitemap de produção;
- robots permite indexação apenas para facilitar validação local.

### PR preview

O Render fornece:

```text
IS_PULL_REQUEST=true
RENDER_EXTERNAL_URL=https://<preview>.onrender.com
```

Nesse caso o build deliberadamente ignora qualquer origem de produção:

- `siteOrigin` fica vazio;
- `robots.txt` gera `Disallow: /`;
- o frontend adiciona `noindex, nofollow`.

O Render também envia `X-Robots-Tag: noindex` automaticamente em service previews, oferecendo defesa adicional contra indexação.
### Produção inicial

Quando:

```text
IS_PULL_REQUEST=false
RENDER_EXTERNAL_URL=https://<site>.onrender.com
```

e `SITE_ORIGIN` não foi configurada, o próprio `RENDER_EXTERNAL_URL` vira origem pública.

Isso permite que o primeiro deploy em `onrender.com` já gere corretamente:

- canonical;
- `og:url`;
- JSON-LD;
- `sitemap.xml`;
- referência ao sitemap no robots.

### Domínio customizado

Depois que o domínio definitivo estiver configurado no Render, definir:

```text
SITE_ORIGIN=https://<dominio-final>
```

Essa variável tem precedência sobre `RENDER_EXTERNAL_URL`.

PR previews continuam ignorando `SITE_ORIGIN` para nunca apontarem canonical para produção.
## Rotas

O site é SSG, não uma SPA pura.

O build produz HTML estático para cada rota pública conhecida.

Por isso **não adicionamos** o rewrite comum:

```text
/* -> /index.html
```

Esse rewrite é útil para SPAs client-side, mas é desnecessário para as rotas prerenderizadas e faria URLs inexistentes tenderem a retornar HTML da aplicação em vez de um 404 real.

As 21 rotas conhecidas são produzidas pelo Angular durante o build.

## Headers

Os headers ficam em `render.yaml`, porque Static Sites no Render suportam response headers diretamente na configuração do serviço.

Baseline:

- `X-Frame-Options: DENY`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy` mínima;
- CSP restrita ao próprio site.

A CSP atual não permite trackers ou analytics externos.

Se uma ferramenta externa for adicionada no futuro, a allowlist deverá ser revisada explicitamente.
## PR previews

O Blueprint usa:

```yaml
previews:
  generation: automatic
```

Assim, pull requests contra a branch vinculada podem receber uma URL `onrender.com` própria.

Cada preview deve ser usado para:

- review visual;
- validação mobile;
- navegação profunda;
- links;
- headers;
- comportamento de SEO/noindex.

## Build e deploy

Fluxo esperado:

```text
Pull Request
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
Quality gate + Angular prerender
    ↓
Atomic static deploy
```

Render invalida o cache de CDN quando o novo deploy é publicado com sucesso.
## Quality gate local

Antes de uma mudança ser considerada pronta:

```bash
npm run validate:full
```

O gate cobre:

1. conteúdo;
2. Prettier;
3. ESLint;
4. TypeScript;
5. Vitest;
6. production build;
7. SSG;
8. Playwright;
9. axe WCAG;
10. mobile overflow.

O Render não substitui esse gate.

## Primeiro deploy

Passos:

1. fazer merge desta configuração em `main`;
2. no Render, criar um **Blueprint** apontando para o repositório;
3. selecionar o `render.yaml` da raiz;
4. revisar o serviço `claudiodearaujo`;
5. aplicar o Blueprint;
6. aguardar o primeiro build;
7. abrir a URL `onrender.com`;
8. validar rotas diretas e refresh;
9. validar headers;
10. validar `robots.txt` e `sitemap.xml`.

## Domínio customizado

Após validar o deploy `onrender.com`:

1. adicionar o domínio no serviço;
2. configurar DNS conforme instruções do Render;
3. definir `SITE_ORIGIN` com a URL definitiva;
4. rebuild/redeploy;
5. validar canonical;
6. validar sitemap;
7. validar Open Graph e JSON-LD;
8. opcionalmente desabilitar o subdomínio `onrender.com` após estabilização.
## Primeiro deploy real — concluído

O primeiro Static Site está live em:

```text
https://claudiodearaujo-site.onrender.com
```

A validação completa está documentada em [Render Live Deployment Validation](./RENDER-LIVE-VALIDATION.md).

A aplicação, SEO, sitemap, 404 e E2E live passaram. Headers adicionais e PR previews ainda dependem da sincronização via Blueprint.

## Launch blockers externos

O código ficará pronto para Render após esta trilha.

Permanecem ações externas:

- criar/sincronizar o Blueprint no workspace Render;
- validar o primeiro deploy real;
- escolher/configurar domínio customizado;
- revisar o site visualmente no CDN real;
- executar launch validation.

## Referências oficiais

- https://render.com/docs/static-sites
- https://render.com/docs/blueprint-spec
- https://render.com/docs/environment-variables
- https://render.com/docs/service-previews
- https://render.com/docs/static-site-headers
- https://render.com/docs/redirects-rewrites
- https://render.com/docs/node-version
- https://render.com/docs/custom-domains
