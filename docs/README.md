# Documentação — Site Pessoal Cláudio Araújo

Este diretório contém a fundação de produto, conteúdo, posicionamento, arquitetura técnica, UX e design system do site pessoal de Cláudio Araújo.

## Fundação

- [PRD](./PRD.md)
- [Content Architecture + Sitemap](./CONTENT-ARCHITECTURE.md)
- [Inventário Editorial do MVP](./EDITORIAL-INVENTORY.md)

## Arquitetura técnica

- [TAD-001 — Arquitetura Técnica do Site](./technical/TAD-001-SITE-ARCHITECTURE.md)

## Implementation

- [Implementation Foundation v1](./technical/IMPLEMENTATION-FOUNDATION.md)
- [Content Experience v1](./technical/CONTENT-EXPERIENCE-V1.md)
- [Cloudflare Pages Deployment](./technical/DEPLOYMENT-CLOUDFLARE.md)

## UX

- [UX Wireframes — MVP](./ux/UX-WIREFRAMES.md)

## Visual Design

- [Visual Design / Design System Foundation](./design/VISUAL-DESIGN-SYSTEM.md)

## Conteúdo principal

- [Homepage](./content/HOMEPAGE.md)
- [About](./content/ABOUT.md)
- [Now](./content/NOW.md)
- [Contact](./content/CONTACT.md)

## Case Studies

- [LucyOS](./case-studies/LUCYOS.md)
- [Invest Lucy](./case-studies/INVEST-LUCY.md)
- [Livrya](./case-studies/LIVRYA.md)

## Engineering

- [Engineering Principles](./engineering/PRINCIPLES.md)
- [ADR 001 — Why MCP-first?](./engineering/ADR-001-MCP-FIRST.md)
- [ADR 002 — Why Shadow Mode Before Autonomy?](./engineering/ADR-002-SHADOW-MODE-BEFORE-AUTONOMY.md)
- [ADR 003 — Why Human Control Belongs in the Architecture?](./engineering/ADR-003-HUMAN-CONTROL.md)

## Writing

- [AI Agents Need Architecture, Not Just Prompts](./writing/001-AI-AGENTS-NEED-ARCHITECTURE.md)
- [From Automation to Autonomy](./writing/002-FROM-AUTOMATION-TO-AUTONOMY.md)
- [Evidence Before Autonomy](./writing/003-EVIDENCE-BEFORE-AUTONOMY.md)

## Labs

- [Long-Term Memory for Agents](./labs/001-LONG-TERM-MEMORY-FOR-AGENTS.md)
- [Evaluating Agentic Systems](./labs/002-EVALUATING-AGENTIC-SYSTEMS.md)

## Estado

Estão definidos: Content Foundation v1, Technical Architecture v1, UX/Wireframes v1 e Visual Design / Design System Foundation v1.

Baseline técnica: Angular 22 + prerender/SSG + conteúdo Markdown validado em build time + deploy estático em Cloudflare Pages, sem backend dedicado no MVP.

Princípio de UX: **Make depth available without making complexity mandatory.**

Assinatura visual: **Deep neutral surfaces + precise typography + structural lines + controlled blue accent + architecture as visual language.**

A Content Experience v1 está implementada e validada localmente. A próxima etapa é review/merge do PR e criação do primeiro preview real em Cloudflare Pages.
