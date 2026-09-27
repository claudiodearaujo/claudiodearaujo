# GA-02 — Search Indexation & Discoverability Validation Record

Status: **In Progress — external ownership pending**
Reference release: **v1.0.0**
Preflight date: **2026-09-26**
Production origin: `https://claudiodearaujo.dev.br`

## Current external state

The Google account is connected to GSC Wizard successfully, but no Google Search Console properties are currently registered for the account.

Target property:

- preferred type: **Domain Property**;
- property: `sc-domain:claudiodearaujo.dev.br`;
- ownership status: **not created / not verified yet**;
- Search Console sitemap status: **not submitted yet**;
- indexation baseline: **not available until ownership is verified**.

GSC Wizard can register and operate an existing verified Search Console property, inspect URLs and submit sitemaps, but it does not provision the Google property or perform DNS ownership verification.

## DNS preflight

Authoritative nameservers:

- `d.sec.dns.br`;
- `f.sec.dns.br`.

This confirms the domain DNS is currently authoritative at Registro.br.

TXT lookup at the domain apex found no Google Search Console verification record at preflight time. No DNS change was made automatically.

Required external ownership step:

1. create the Domain Property for `claudiodearaujo.dev.br` in Google Search Console;
2. obtain the Google verification TXT value;
3. add the TXT record in Registro.br DNS;
4. confirm verification in Google Search Console;
5. keep the TXT record after verification.

No verification token, credential, cookie or session value must be committed to this repository.

## Sitemap preflight

Canonical sitemap:

`https://claudiodearaujo.dev.br/sitemap.xml`

Observed state:

- HTTP status: **200**;
- URL entries: **40**;
- duplicate URLs: **0**;
- URLs outside the canonical domain: **0**;
- Render preview/origin URLs: **0**;
- redirect targets in sitemap: **0**;
- non-200 sitemap URLs: **0**;
- URLs with `lastmod`: **12**.

## robots.txt preflight

Published robots contract:

```text
User-agent: *
Allow: /
Sitemap: https://claudiodearaujo.dev.br/sitemap.xml
```

The robots file and sitemap agree on the canonical public origin.

## Next executable steps after ownership

Once the Domain Property is verified:

1. register `sc-domain:claudiodearaujo.dev.br` in the connected Search Console integration;
2. activate the property for querying if required;
3. submit `https://claudiodearaujo.dev.br/sitemap.xml`;
4. confirm the sitemap is accepted/downloaded and classify any warnings/errors;
5. inspect representative URLs, including home, one case study, one article, one engineering page and one institutional page;
6. record the first available indexing baseline;
7. explicitly resolve Bing Webmaster Tools as completed, deferred or not applicable.

## Current GA-02 gate

Technical site readiness is **green**.

GA-02 cannot satisfy its Definition of Done yet because the Google Domain Property does not exist and ownership has not been verified. This is an external account/DNS dependency, not an application defect.

No analytics, visitor tracking, artificial SEO pages or third-party tracking scripts were added.
