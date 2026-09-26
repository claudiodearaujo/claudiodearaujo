# GA-01 — v1.0 Release Validation Record

Status: **Completed**
Release: **v1.0.0**
Validated on: **2026-09-26**
Production origin: `https://claudiodearaujo.dev.br`

## Immutable release identity

- Release commit: `b16a491927fc203ce3a8cc3a4750d14d6a83fe98`
- Tag: `v1.0.0`
- Tag target: `b16a491927fc203ce3a8cc3a4750d14d6a83fe98`
- GitHub Release: `https://github.com/claudiodearaujo/claudiodearaujo/releases/tag/v1.0.0`
- Release PR: `#21 — release: formalize v1.0.0`
- Package version: `1.0.0`

The public tag is immutable. Any correction after this baseline must use a new patch/minor/major version rather than moving `v1.0.0`.

## Production deployment

- Render service: `claudiodearaujo-site`
- Render service ID: `srv-dam8pdh42hec738nlvrg`
- Render deploy ID: `dep-das5g1ivcj2c73airr80`
- Deploy commit: `b16a491927fc203ce3a8cc3a4750d14d6a83fe98`
- Deploy status: `live`
- Deploy finished at: `2026-09-26T23:41:41.968667Z`

## Baseline

- Published content entries: **21**
- Prerendered/SSG routes: **40**
- Content OG images: **21**
- Site OG images: **6**
- Self-hosted font files: **3**
- Initial bundle: **320.82 kB raw / 87.27 kB estimated transfer**
- CSP inline script hashes verified: **3**

## Local release gates

`npm run validate:full` completed with exit code 0.

- content build: passed;
- formatting: passed;
- lint: passed;
- typecheck: passed;
- tools tests: **48/48 passed**;
- unit tests: **59/59 passed**;
- production build: passed;
- local E2E: **45/45 passed**;
- accessibility, mobile, hydration, SEO/distribution and launch contracts: passed.

## Remote CI gates

GitHub Actions run: `36280067880`.

- Validate: **passed**;
- End-to-end: **passed**;
- GitGuardian Security Checks: **passed**.

## Production validation

`npm run validate:launch:live` completed with exit code 0 against the final domain.

HTTP validation:

- security headers: passed;
- CSP without `unsafe-inline` scripts: passed;
- canonical and `og:url`: passed;
- robots and sitemap: **40 URLs matching the content build**;
- favicon: passed;
- HTTP 404 serving the application 404 page: passed.

Live Playwright:

- **45/45 E2E passed** against `https://claudiodearaujo.dev.br`.

## Accepted warning

The release keeps one pre-existing non-blocking build warning:

- `src/app/features/home/home.page.scss`: **6.53 kB**;
- warning budget: **6.00 kB**;
- delta: **+534 bytes**.

This warning does not break the build, accessibility, E2E, deployment or live production gates and is explicitly accepted for v1.0.0. It is not silently treated as resolved.

## GA-01 closure

GA-01 is complete because the version, documentation, immutable tag, GitHub Release, CI evidence, Render deployment and final-domain validation all point to the same validated public baseline.
