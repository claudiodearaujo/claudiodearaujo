---
title: Why MCP-first?
slug: why-mcp-first
locale: pt
type: decision
summary: Agentes devem depender de capacidades, não de implementações específicas.
status: Accepted
tags: [Architecture, MCP, Agents]
---

# ADR 001 — Why MCP-first?

## Status

Accepted

## Context

Sistemas agentic precisam interagir com capacidades externas como arquivos, bancos de dados, APIs, sistemas internos, browsers, calendários, repositórios e ferramentas especializadas.

Uma implementação direta tende a crescer assim:

```text title="Direct Integration"
Agent
 ├── GitHub SDK
 ├── Database Client
 ├── Filesystem
 ├── Browser API
 ├── Calendar API
 └── Internal Services
```

Cada integração adiciona autenticação específica, contratos próprios, formatos diferentes, tratamento de erro, dependência de SDK, lifecycle e políticas de segurança.

## Problem

Precisamos permitir que agentes utilizem capacidades externas sem transformar cada integração em dependência direta do runtime de inteligência.

O sistema deveria conseguir responder **Qual capacidade está disponível?** sem exigir que o agente conheça profundamente como essa capacidade foi implementada.

## Decision

Adotar **MCP-first** como estratégia preferencial de integração para capacidades compatíveis.

```text title="MCP Boundary"
Agent
  ↓
MCP Boundary
  ↓
Capability
  ↓
External System
```

MCP funciona como fronteira entre intenção e implementação.

## Why

O agente deveria interagir com capacidades como `search_repository`, `read_document` ou `query_database`, e não necessariamente conhecer detalhes como versões de APIs, SDKs ou drivers.

Essa separação reduz propagação de detalhes externos para o núcleo do sistema.

## Benefits

- Replaceability
- Discoverability
- Standardization
- Isolation
- Governance
- Portability

## Alternative 1 — Direct SDK Integration

Vantagens: implementação rápida, acesso completo e menos componentes iniciais.

Problema: runtime passa a depender diretamente de detalhes do fornecedor.

Aceitável para protótipos ou capacidades muito específicas, não como estratégia padrão para capacidades centrais.

## Alternative 2 — Custom Internal Tool API

Vantagens: controle completo e contrato otimizado.

Problemas: protocolo proprietário, manutenção própria, menor interoperabilidade e potencial duplicação de padrão já existente.

Usar quando requisitos reais não forem bem atendidos por MCP.

## Consequences

MCP-first não significa MCP-only.

Quando uma capacidade pode ser representada adequadamente por boundary MCP, essa opção deve ser considerada antes de acoplar o agente diretamente à implementação.

## Security Consequences

MCP não elimina necessidade de autenticação, autorização, scope, validação, auditabilidade, rate limiting e isolamento.

O protocolo fornece boundary, não uma política segura automaticamente.

## Tool Design

Preferir ferramenta coerente como `get_project_status` a uma ferramenta excessivamente poderosa como `execute_arbitrary_sql` quando possível.

Quanto mais genérica e poderosa a ferramenta, maior seu risco.

## Read vs Write

Capabilities deveriam deixar claro o impacto: Read-only, Suggest, Write, Execute, High-risk Execute.

## Observability

Toda chamada relevante deveria registrar agente, ferramenta, argumentos relevantes, momento, resultado, erro e correlation id.

## LucyOS Application

```text title="LucyOS Application"
Lucy
 ↓
Agents
 ↓
Capabilities
 ↓
External Systems
```

MCP ajuda a manter identidade e lógica agentic independentes de implementações específicas.

## What Would Make This Decision Change?

Reavaliar se MCP se tornar inadequado, introduzir overhead desproporcional, não representar semântica crítica ou outro padrão oferecer interoperabilidade significativamente superior.

MCP é ferramenta arquitetural, não dogma.

## Summary

**agents should depend on capabilities, not implementations.**
