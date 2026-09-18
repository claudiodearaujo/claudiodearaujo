# Render Live Deployment Validation

**Status:** ✅ Static Site live; ✅ Blueprint active
**Data:** 17/09/2026
**Service:** `claudiodearaujo-site`
**Service ID:** `srv-dam8pdh42hec738nlvrg`
**Deploy ID:** `dep-dam8pe142hec738nm110`
**Commit:** `5f95c542ec45c19c39aba1e55319e0b04b32d742`

## Public URL

```text
https://claudiodearaujo-site.onrender.com
```

The production Static Site was created from `main` after the Render deployment migration was merged.

## Deployment result

The first deployment reached:

```text
status = live
```

The build executed:

```text
npm ci && npm run validate
```

and validated:

- content generation;
- Prettier;
- ESLint;
- TypeScript;
- Vitest;
- Angular production build;
- SSG.

Render used Node `24.16.0` from `.node-version`.

## Production HTTP validation

Validated against the real CDN URL:

```text
/                                          200
/pt                                        200
/pt/work/lucyos                            200
/pt/writing/ai-agents-need-architecture    200
/robots.txt                                200
/sitemap.xml                               200
/rota-que-nao-existe                       404
```

Deep routes work directly without SPA rewrite.

## SEO validation

Production output correctly uses the Render public URL.

Validated:

- canonical URLs;
- `og:url`;
- JSON-LD;
- `robots.txt`;
- `sitemap.xml`.

The sitemap contains **21 URLs**.

Example:

```text
https://claudiodearaujo-site.onrender.com/pt/work/lucyos
```

## Live E2E validation

The complete Playwright suite was executed against the deployed CDN, not localhost.

Result:

```text
13/13 passed
```

Coverage includes:

- Home;
- Work;
- case studies;
- Writing;
- Labs;
- Engineering / ADRs;
- About;
- Now;
- Contact;
- mobile navigation;
- horizontal overflow;
- axe WCAG A/AA checks.

## Security headers

The service currently returns Render's default:

```text
X-Content-Type-Options: nosniff
```

The additional headers declared in `render.yaml` are active on this service:

- `X-Frame-Options`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `Content-Security-Policy`.

Blueprint adoption was completed after the initial direct Static Site creation.

## PR previews

PR previews are enabled on the created service.

The repository configuration already declares:

```yaml
previews:
  generation: automatic
```

and the service now reports automatic preview generation enabled.

## Existing legacy service

A pre-existing Render service named:

```text
claudiodearaujo
```

already exists as a Node Web Service.

It was not modified or deleted.

Because that service owns the shorter Render slug, the new Static Site received:

```text
claudiodearaujo-site.onrender.com
```

This does not block a custom domain.

## Blueprint identity safety

The root `render.yaml` now uses the exact existing Static Site name:

```text
claudiodearaujo-site
```

This is intentional. Render Blueprints match an existing service by name when adopting it into Blueprint management. The previous `claudiodearaujo` name belongs to a separate legacy Node Web Service and must not be targeted by the Static Site Blueprint.

## Remaining launch actions

1. Sync/create the service through the root `render.yaml` Blueprint.
2. Confirm security headers are active.
3. Confirm PR previews are enabled.
4. Decide whether the old Node Web Service should be retired later.
5. Configure the final custom domain.
6. Set `SITE_ORIGIN` to the final domain.
7. Revalidate canonical, sitemap, headers and E2E.
8. Complete visual launch review.

## Current conclusion

The application itself is production-capable on Render:

```text
Build        ✅
Static deploy ✅
Deep routes  ✅
SEO          ✅
Sitemap      ✅ 21 URLs
404 behavior ✅
Live E2E     ✅ 13/13
Accessibility ✅
Headers      ✅ Blueprint active
PR previews  ✅ automatic
Custom domain 🔴 pending
```

## Git Provider verification probe

A minimal documentation change was used on 18/09/2026 to verify Render PR previews and automatic deploys end to end.


## Git Provider verification — ✅

O PR #6 comprovou o fluxo ponta a ponta após a reconexão do Git provider: PR preview automático, preview `noindex`, merge detectado, deploy da `main` com `trigger=new_commit` e build gate `npm ci && npm run validate` executado no Render.
