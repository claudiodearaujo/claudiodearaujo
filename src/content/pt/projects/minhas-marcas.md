---
title: Minhas Marcas
slug: minhas-marcas
locale: pt
type: project
summary: PWA offline-first de Personal Life Intelligence para transformar registros estruturados do cotidiano em padrões observáveis ao longo do tempo.
status: Active
tags: [Product, Offline-First, Sync, Privacy, Data]
category: Personal Life Intelligence
featured: true
related:
  - /pt/engineering/principles
---

# Minhas Marcas

## Personal Life Intelligence

**Registre as marcas do seu dia. Descubra os padrões da sua vida.**

Minhas Marcas é um diário estruturado que parte de uma insatisfação com o modelo tradicional de diário pessoal.

Texto livre é excelente para expressão. Mas é ruim quando a pergunta muda de “o que eu senti hoje?” para:

**o que vem acontecendo comigo ao longo do tempo?**

O projeto explora como registros cotidianos podem se transformar em sinais comparáveis sem reduzir experiência humana a um dashboard.

## The Product Idea

Em vez de uma página em branco, Minhas Marcas trabalha com entidades estruturadas.

```text
Daily Marks
Dreams
Discussions
Sleep
Emotions
Symptoms
Tags
Attachments
Context
```

Cada registro preserva narrativa suficiente para continuar humano, mas possui estrutura suficiente para permitir observação longitudinal.

A proposta não é diagnosticar. É ajudar alguém a perceber padrões que normalmente ficam espalhados entre memória, sensação e acontecimentos isolados.

## Structured, Not Mechanical

Estruturar experiência pessoal cria um risco: transformar vida em formulário.

Por isso a experiência permite entrada progressiva. Uma marca mínima pode começar com poucos sinais e ganhar detalhes apenas quando fizer sentido.

## Offline-First

Registros pessoais não deveriam depender de conexão perfeita.

A arquitetura V2 foi desenhada para criação, edição e consulta local primeiro:

```text
Angular PWA
    ↓
Dexie / IndexedDB
    ↓
Local State
    ↓
Outbox
    ↓
Sync Engine
    ↓
NestJS API
    ↓
PostgreSQL / Supabase
```

A rede deixa de ser requisito para registrar o momento. Ela passa a ser requisito para sincronizar.

## Sync as a Product Capability

Sincronização parece infraestrutura até o primeiro conflito real.

O Sync Engine V1 modela:

- outbox;
- retry;
- idempotência;
- cursor;
- versões;
- tombstones;
- compare-and-set;
- conflitos;
- escolha explícita de resolução;
- convergência entre dispositivos.

Uma edição offline não pode simplesmente sobrescrever uma versão mais nova sem deixar evidência.

## Daily Marks

A primeira experiência estruturada inclui nota do dia, emoções, sono, sintomas opcionais, tags, busca, edição offline e exclusão com tombstone.

A identidade local também é isolada por usuário para impedir mistura de dados entre contas no mesmo dispositivo.

## Dreams

Sonhos possuem estrutura própria: data, título, descrição, símbolos, tonalidade emocional, intensidade e tags.

A intenção não é interpretar automaticamente. É preservar elementos recorrentes para observação futura.

## Discussions

Discussões também podem ser registradas com pessoa, assunto, resumo, emoção dominante, aprendizado, status e tags.

Isso permite observar recorrência sem transformar relações humanas em uma métrica simplista.

## Privacy by Architecture

O produto lida com informação potencialmente muito pessoal.

Por isso privacidade não é uma página adicionada depois.

A fundação utiliza Supabase Auth, JWT validado no backend, PostgreSQL, RLS e user scoping explícito.

Tabelas privadas não são acessadas diretamente pelo frontend.

```text
Authenticated User
      ↓
Validated Identity
      ↓
NestJS API
      ↓
User Scope
      ↓
RLS
      ↓
Private Data
```

RLS é uma defesa adicional, não substituto para regras explícitas da aplicação.

## Dedicated Data Boundary

Minhas Marcas possui projeto Supabase dedicado.

Ele não reutiliza banco, autenticação ou contexto de outros sistemas. Dados pessoais merecem boundary próprio.

## Attachments

A fase atual leva offline-first para arquivos.

O desenho inclui Blob local em Dexie, lease e retry, quota, limite por marca, upload em partes, retomada por índice, validação de tamanho/MIME, download privado e reconciliação.

A implementação já avançou em código e banco, mas permanece em hardening operacional antes de ser considerada concluída na homologação.

## No AI in the MVP

Uma decisão importante é o que **não** colocar cedo demais.

A V2 não depende de IA generativa para cumprir sua proposta.

Antes de interpretar a vida de alguém, o sistema precisa provar que consegue:

```text
Capture
   ↓
Preserve
   ↓
Synchronize
   ↓
Protect
   ↓
Organize
   ↓
Show patterns
```

IA só faz sentido quando existe problema claro, base confiável e controle sobre o dado.

## Correlation Is Not Causation

Se duas coisas aparecem juntas, isso não prova que uma causou a outra.

Dashboards e correlações futuras precisam comunicar associação sem criar diagnósticos ou certezas falsas.

## Why I Built It

Minhas Marcas toca uma pergunta que me interessa fora da tecnologia:

**quanto da nossa própria vida conseguimos realmente observar sem algum tipo de memória externa?**

Pessoas lembram por narrativa. Sistemas conseguem preservar estrutura.

O desafio é usar estrutura para ampliar consciência, não para substituir interpretação humana.

## Current State

A reconstrução V2 já consolidou arquitetura/ADRs, autenticação e privacidade, RLS, Daily Marks, Dexie offline-first, Sync Engine V1, Dreams, Discussions e ambiente privado de homologação.

O hardening de anexos está em andamento.

As próximas etapas ampliam contexto, visualização e correlações sem quebrar a regra central: **nenhuma causalidade deve ser inferida apenas porque os dados se correlacionam.**

## What It Demonstrates

Minhas Marcas combina product discovery, domain modeling, PWA, offline-first, synchronization protocols, conflict resolution, privacy, RLS, structured personal data, UX progressiva e evidence-aware visualization.

É um produto sobre vida cotidiana, mas também um laboratório de engenharia sobre **memória, observação e confiança em dados pessoais**.
