# Final Domain Cutover — claudiodearaujo.dev.br

**Status:** ✅ Cutover complete — v1.0 Launch Candidate
**Final origin:** `https://claudiodearaujo.dev.br`
**Production origin:** `https://claudiodearaujo.dev.br`
**Fallback origin:** `https://claudiodearaujo-site.onrender.com`

## Objective

Record and validate the completed production-domain transition to the final public origin.

## Blueprint

The final root domain is declared in `render.yaml`:

```yaml
domains:
  - claudiodearaujo.dev.br
```

The custom-domain association is active. Registro.br DNS resolves to Render and HTTPS/TLS is valid on the final origin.

For a root domain, Render also manages the corresponding `www` hostname and redirects it to the root domain.

## Cutover sequencing rule — completed

The production environment now uses:

```text
SITE_ORIGIN=https://claudiodearaujo.dev.br
```

This was applied only after all of the following became true:

1. Registro.br allows DNS configuration;
2. the required DNS records point to Render;
3. Render reports the custom domain as verified;
4. HTTPS works with a valid certificate at `https://claudiodearaujo.dev.br`.

Canonical, Open Graph, JSON-LD, robots and sitemap now use the final domain. The `onrender.com` origin remains enabled as a fallback.

## Automated live validation

The repository now includes:

```text
tools/launch/validate-deployment.mjs
playwright.live.config.ts
```

Commands:

```bash
npm run validate:deployment
npm run test:e2e:live
npm run validate:launch:live
```

The HTTP deployment validator checks:

- production page returns 200;
- CSP;
- X-Frame-Options;
- X-Content-Type-Options;
- Referrer-Policy;
- Permissions-Policy;
- absence of production `noindex`;
- canonical URL;
- `og:url`;
- robots;
- sitemap origin;
- a sitemap whose URLs match the content build exactly;
- favicon;
- real HTTP 404 serving the application's own 404 page.

The live Playwright gate runs the full application E2E suite against a remote origin, including the 404 test: publishing `404.html` from the client-side rendering shell lets the static CDN keep answering HTTP 404 while the router resolves the `**` route on the client.

## Current-origin rehearsal

The same final gate can be executed against the current Render origin without any environment variables:

```bash
npm run validate:launch:live
```

This rehearsal passed before DNS cutover, and the same gate passed again after the final-domain cutover.

## Final cutover — PowerShell

After DNS and TLS are ready:

```powershell
$env:TARGET_ORIGIN='https://claudiodearaujo.dev.br'
$env:EXPECTED_ORIGIN='https://claudiodearaujo.dev.br'
$env:LIVE_BASE_URL='https://claudiodearaujo.dev.br'
$env:WWW_ORIGIN='https://www.claudiodearaujo.dev.br'
npm run validate:launch:live
```

Before this command can pass, production must already have been rebuilt with:

```text
SITE_ORIGIN=https://claudiodearaujo.dev.br
```

## Final cutover procedure — completed

Completed on 18/09/2026:

1. configure the DNS records exactly as shown by Render;
2. wait for the Render custom-domain verification state;
3. confirm HTTPS certificate availability;
4. set the production environment variable:
   `SITE_ORIGIN=https://claudiodearaujo.dev.br`;
5. allow the environment-variable change to trigger a production rebuild;
6. run the final-domain validation command above;
7. verify the root domain returns 200;
8. verify `www` redirects to the root domain;
9. verify canonical and `og:url` point to the final root domain;
10. verify robots points to `https://claudiodearaujo.dev.br/sitemap.xml`;
11. verify all 21 sitemap URLs use the final domain;
12. verify security headers;
13. verify 17 live application E2E tests;
14. verify an unknown route returns HTTP 404;
15. mark the release as v1.0 Launch Candidate.

## Rollback

If the final domain has a DNS or TLS problem after `SITE_ORIGIN` is changed:

1. remove or restore `SITE_ORIGIN` to the working Render origin;
2. redeploy;
3. keep the `onrender.com` subdomain enabled;
4. repair DNS;
5. repeat the cutover only after HTTPS is healthy.

Do not disable the Render subdomain during the initial cutover.

## Launch state

```text
Git Provider / auto deploy      ✅
PR previews                     ✅
Build validation gate           ✅
Security headers                ✅
Launch polish                   ✅
Automated deployment validator  ✅
Automated live E2E              ✅
Final domain declared           ✅
Registro.br DNS                 ✅
Render domain verification      ✅
TLS on final domain             ✅
SITE_ORIGIN final               ✅
Final-domain gate               ✅
v1.0 Launch Candidate           ✅
```
