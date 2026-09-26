---
title: Therapist Platform
slug: therapist-platform
locale: pt
type: project
summary: SaaS multi-tenant para terapeutas e profissionais de atendimento, evoluído de uma implementação especializada para um core configurável e seguro.
status: Active
tags: [SaaS, Product, Multi-Tenant, Security, Architecture]
category: SaaS Product Engineering
featured: true
related:
  - /pt/engineering/principles
---

# Therapist Platform

## From a Specialized Product to a Reusable SaaS

Therapist Platform é um exercício de product engineering em transformação: como pegar uma aplicação criada para um contexto muito específico e evoluí-la para uma plataforma SaaS reutilizável, configurável e multi-tenant sem simplesmente reescrever tudo.

A pergunta central do projeto é:

**como transformar uma solução feita para uma pessoa em um produto que possa servir profissionais diferentes, especialidades diferentes e organizações diferentes?**

## The Starting Point

O sistema original já possuía bastante superfície funcional: presença digital, serviços, clientes, agenda, pedidos, conteúdo, pagamentos, área do cliente e painel administrativo.

O problema era estrutural.

Muitos conceitos estavam acoplados à identidade, linguagem e regras de uma única especialidade.

Isso funciona para uma implementação dedicada. Não funciona para um produto.

A transformação começou por separar:

```text
What belongs to the platform
            ↓
What belongs to a specialty
            ↓
What belongs to one professional
```

## Productization

A primeira fase removeu dependências de uma pessoa específica e estabeleceu defaults técnicos neutros.

A segunda transformou o domínio em um modelo configurável:

```text
Professional
    ↓
Specialty
    ↓
Service
    ↓
Client
    ↓
Appointment / Delivery
    ↓
Order / Payment
    ↓
Content
```

Conceitos específicos passaram a viver em módulos opcionais de especialidade, em vez de contaminarem o core.

**Generalização não significa apagar diferenças; significa criar o lugar correto para elas existirem.**

## Generic Core + Specialty Modules

O core precisa entender capacidades genéricas:

- profissional;
- workspace;
- especialidade;
- serviço;
- cliente;
- agendamento;
- entrega;
- pedido;
- pagamento;
- conteúdo;
- branding.

Módulos especializados podem adicionar comportamento próprio sem transformar esse comportamento em regra universal.

## SaaS Foundation

Depois da generalização do domínio, o projeto avançou para uma fundação SaaS em cinco etapas.

### v1 — Tenant Foundation

Tenant, memberships e settings tenant-scoped transformaram uma aplicação de contexto único em um sistema com ownership explícito.

### v2 — Data Isolation

Os agregados de negócio passaram a carregar isolamento lógico por tenant, incluindo backfill seguro do legado e reforço das regras de acesso.

### v3 — Onboarding & Branding

O profissional passou a poder criar e configurar seu próprio workspace. Branding deixou de ser código fixo e passou a fazer parte do domínio do tenant.

### v4 — Plans & Billing

O produto passou a modelar catálogo de planos, entitlements e lifecycle de assinatura.

Uma decisão importante foi separar billing SaaS do fluxo comercial entre profissional e cliente.

### v5 — LGPD & Operations

A fundação incorporou direitos do titular, auditoria persistente, retenção controlada e operação de incidentes.

A preocupação passou a incluir não apenas proteção, mas também propósito, retenção, acesso e reconstrução de incidentes.

## Multi-Tenant Is a Domain Concern

Adicionar tenantId em tabelas não cria sozinho um SaaS seguro.

O isolamento precisa atravessar:

```text
Authentication
      ↓
Tenant Context
      ↓
Authorization
      ↓
Queries
      ↓
Storage
      ↓
Audit
```

O tenant não deveria depender de um parâmetro confiado vindo do browser. Identidade e contexto precisam ser derivados da sessão autenticada e reaplicados no backend.

## Design System — Calma Estruturada

A evolução do produto também exigiu abandonar uma estética herdada do sistema especializado e construir uma linguagem visual coerente com uma plataforma profissional.

A direção passou a ser:

**humana, profissional, segura, calma e contemporânea.**

O design system “Calma estruturada” utiliza Sage, Warm Stone, Terracotta e Inter.

> Tecnologia silenciosa para quem precisa estar presente.

## Security Hardening

Com a fundação SaaS concluída, segurança virou trilha explícita.

O hardening inclui sessões revogáveis, refresh protegido, uploads privados, CSP, redução de logs sensíveis, isolamento multi-tenant e testes de integração.

Código e CI avançaram significativamente; alguns gates operacionais e de implantação ainda pertencem à etapa de Production & Commercial Readiness.

## Current State

O projeto está nesta progressão:

```text
Functional application
        ↓
Generic platform
        ↓
Multi-tenant SaaS
        ↓
Secure operation
        ↓
Commercial readiness
```

As próximas perguntas estão menos relacionadas a criar telas e mais a operação, segurança, equipes por tenant, domínio customizado, readiness comercial e uso por profissionais diferentes.

## What This Project Taught Me

### Productization is an architecture problem

Transformar software dedicado em produto exige descobrir o que era regra real e o que era apenas consequência de um cliente específico.

### Multi-tenancy changes every layer

Banco, autenticação, storage, background jobs, billing, auditoria e UX passam a precisar de contexto de tenant.

### White-label is not only CSS

Branding configurável envolve conteúdo, e-mail, assets, SEO, defaults, domínio e experiência.

### Security grows with product ambition

Quando uma aplicação passa de um contexto dedicado para múltiplos clientes, o modelo de ameaça muda.

### A reusable product needs explicit boundaries

Generalização saudável vem de boundaries melhores, não de abstrações genéricas demais.

## What It Demonstrates

Therapist Platform reúne productization, domain modeling, multi-tenant architecture, SaaS foundations, data isolation, onboarding, billing boundaries, LGPD, security hardening, design systems e operação.

Mais do que um sistema para terapeutas, o projeto virou um laboratório prático sobre **como software especializado se transforma em produto**.
