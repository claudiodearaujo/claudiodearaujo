---
title: Why This Site Intercepts Its Own Fragment Links?
slug: intercepting-fragment-links
locale: pt
type: decision
summary: Uma tag que o framework exige quebrou o link mais importante da página para quem navega por teclado.
status: Accepted
tags: [Architecture, Engineering, Accessibility]
category: Architecture
publishedAt: 2026-09-18
related:
  - /pt/engineering/principles
  - /pt/engineering/decisions/measuring-incremental-hydration
---

# ADR 004 — Why This Site Intercepts Its Own Fragment Links?

## Status

Accepted

## Context

Este site é prerenderizado: cada rota é um documento HTML completo, servido por um host estático sem processo Node atrás dele.

Para que uma página em `/pt/writing/algum-artigo` consiga resolver os `<script>` e `<link>` que o build emite como URLs relativas ao documento, o `index.html` declara:

```text title="Base URL"
<base href="/">
```

Essa tag é load-bearing. Sem ela, a página aninhada procuraria `main-XXX.js` em `/pt/writing/main-XXX.js` e receberia 404.

## Problem

O mesmo `<base href>` muda como o navegador resolve **qualquer** referência relativa — inclusive uma que é só um fragmento.

Um link escrito como `href="#main-content"` não resolve contra a página atual. Resolve contra a base:

```text title="Resolução real, medida no navegador"
Página atual   /pt/writing/ai-agents-need-architecture
Link           href="#main-content"
Resolvido      /#main-content
Destino        /  →  redirect  →  /pt
```

O efeito prático: **o skip link levava o leitor para a home**.

Alguém navegando por teclado, na primeira tecla Tab de um artigo, pedia para pular para o conteúdo e era retirado do artigo. Isso é uma falha direta do WCAG 2.4.1 (Bypass Blocks) — o critério existe precisamente para permitir contornar a navegação repetida.

O mesmo acontecia com as âncoras de heading e com todos os links do índice lateral.

## Why It Went Unnoticed

A suíte de testes cobria esses elementos. Verificava que o skip link existia, que recebia foco e que ficava visível ao ser focado.

Nenhum teste **ativava** o link e verificava onde o leitor parava.

Um componente pode estar presente, focável, rotulado e visível — e ainda assim não fazer o que promete.

## Decision

Interceptar o clique em links de fragmento no componente raiz da aplicação e fazer a navegação manualmente:

```text title="Fluxo da interceptação"
clique em <a href="#id">
   ↓
handler no componente raiz
   ↓
preventDefault()
   ↓
history.pushState(caminho atual + #id)
   ↓
scrollIntoView() + foco no destino
```

O handler fica na raiz, não no componente de conteúdo. Eventos de clique sobem pela árvore, então um único listener cobre o skip link do layout, as âncoras de heading dentro do HTML injetado e o índice lateral — de uma vez.

## Alternative 1 — Remover o `<base href>`

Angular aceita `APP_BASE_HREF` como provider no lugar da tag. Sem a tag, o navegador resolveria os fragmentos contra a página atual e o problema desapareceria na origem.

Problema: o CLI emite os `<script>` e `<link>` do build como caminhos relativos ao documento, contando com a base para resolvê-los. Removê-la quebraria o carregamento de assets em toda rota aninhada — que são todas, menos a raiz.

Trocar uma falha de acessibilidade por uma falha de carregamento não é progresso.

## Alternative 2 — Emitir hrefs absolutos no build

O pipeline de conteúdo conhece a rota de cada documento, então poderia emitir `href="/pt/writing/x#secao"` em vez de `href="#secao"`.

Resolveria as âncoras de heading e o índice lateral.

Não resolveria o skip link, que vive no layout e não sabe em qual rota está sendo renderizado. E deixaria o site com duas convenções para a mesma coisa.

## Consequences

A navegação por fragmento passa a depender de JavaScript.

Isso é menos grave do que parece: sem JavaScript, os links já estavam quebrados — resolviam para a raiz do site. A interceptação não introduz a dependência, ela corrige o caminho que já era o único funcional.

O handler também move o foco para o destino e aplica `tabindex="-1"` quando o elemento não é focável por natureza. Sem isso o Tab seguinte recomeçaria do topo do documento em vez de continuar da seção para onde o leitor acabou de pular.

## Lessons

Um teste que verifica presença não verifica comportamento.

A correção veio acompanhada de dois testes que **ativam** o link e verificam a URL e o foco resultantes. Antes de considerá-los prontos, ambos foram executados contra o código sem a correção, para confirmar que falhavam. Um teste de regressão que nunca viu o bug acontecer não é um teste de regressão — é uma suposição.

## What Would Make This Decision Change?

Reavaliar se o processo de build passar a emitir caminhos absolutos para os assets, tornando o `<base href>` dispensável. Nesse cenário a interceptação vira código morto e deve sair.

## Summary

**uma tag exigida pela ferramenta pode quebrar silenciosamente o contrato de acessibilidade da página.**
