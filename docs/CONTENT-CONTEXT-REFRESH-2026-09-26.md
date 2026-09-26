# Content Context Refresh — 2026-09-26

## Objective

Refresh the personal site's public narrative against recent project work, imported conversation history and current repository evidence.

This pass updates the **site**, not the GitHub profile.

## Public editorial decisions

### Therapist Platform — promoted to full case

The old dedicated-product framing is no longer canonical.

Public story:

- specialized implementation → generic domain;
- generic domain → multi-tenant SaaS;
- SaaS Foundation v1–v5 completed;
- design system "Calma estruturada";
- current phase: Production & Commercial Readiness;
- security hardening is advanced but operational gates still exist.

Source of truth: `claudiodearaujo/therapist-platform`, especially `docs/PRODUCTIZATION.md`.

### Minhas Marcas — promoted to full case

The product has moved beyond a concept.

Public story:

- Personal Life Intelligence;
- structured personal records rather than free-form diary only;
- Angular PWA + Dexie offline-first;
- NestJS + Prisma + Supabase;
- Auth/RLS and dedicated data boundary;
- Daily Marks;
- Sync Engine V1;
- Dreams + Discussions;
- Attachments in operational hardening;
- no generative AI in MVP;
- correlation must not be presented as causation.

Source of truth: `claudiodearaujo/MinhasMarcas`, especially `docs/IMPLEMENTATION-STATUS.md`.

### Livrya — rewritten to current product architecture

Previous public text over-emphasized the old Angular-centric architecture.

Current canonical story:

- one intelligent editorial platform from creation to publication;
- React owns Product Shell, Writer/Studio and Reader;
- Angular owns Auth/Account, Community, Admin and residual surfaces;
- AI is a transversal capability, not product identity;
- Author Experience, Reader Experience and Growth v1 consolidated;
- Business Model v1 is a hypothesis;
- Market Validation is active;
- finalization spans security/legacy, Design/UX/Brand, investor readiness, experiments/unit economics and CI.

No unvalidated pricing, CAC, LTV or market claims should be published.

### Invest Lucy — current narrative preserved

The existing case already reflects the canonical scientific pipeline.

Current operational framing remains:

- Scientific Evidence Accumulation;
- shadow outcomes;
- calibration;
- matured outcomes;
- hypothesis experiments;
- walk-forward;
- OOS;
- Monte Carlo;
- human review;
- autonomy disabled until evidence gates are satisfied.

### LucyOS — current narrative preserved

The existing case remains aligned with the current architecture:

- MCP-first;
- local-first where useful;
- memory as product;
- specialist agents;
- replaceable boundaries;
- human control;
- observability;
- progressive autonomy.

## About narrative refresh

Recent personal reflections changed the editorial framing of the About page.

Public synthesis:

- learning is not always linear;
- concrete problems, building and validation are stronger learning modes than passive consumption;
- context should be externalized through documentation, tests, memory and artifacts;
- AI acts as cognitive leverage between thought, research, expression and execution;
- patterns should become hypotheses before they become conclusions;
- evidence and measurement are used to challenge intuition.

Private/sensitive detail is intentionally not used as a public label.

## Now page refresh

Current public building list:

1. LucyOS
2. Invest Lucy
3. Livrya
4. Therapist Platform
5. Minhas Marcas

Additional internal/corporate projects can influence the themes of the site without being named publicly when their context is not appropriate for a personal public portfolio.

## Deliberate exclusions

- old IzaCenter identity and case;
- private credentials, test users or infrastructure secrets;
- internal employer project names/details not already intended for public disclosure;
- personal health labels as portfolio identity;
- unvalidated market claims;
- exact financial-performance claims without stable evidence.

## Content count

Before this refresh: 17 Markdown content entries.

After adding Therapist Platform and Minhas Marcas: 19 entries.

## Principle

The site should show not only what was built, but how the underlying thinking evolved.

> Projects are evidence of a method, not just a list of technologies.
