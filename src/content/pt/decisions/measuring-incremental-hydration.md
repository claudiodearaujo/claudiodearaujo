---
title: Why Keep Incremental Hydration After It Missed Its Target?
slug: measuring-incremental-hydration
locale: pt
type: decision
summary: Cortar 65% do trabalho de hydration comprou 6% de tempo. A distância entre os dois números era o resultado.
status: Accepted
tags: [Architecture, Engineering, Evidence]
category: Architecture
publishedAt: 2026-09-19
related:
  - /pt/engineering/decisions/intercepting-fragment-links
  - /pt/writing/evidence-before-autonomy
  - /pt/engineering/principles
---

# ADR 005 — Why Keep Incremental Hydration After It Missed Its Target?

## Status

Accepted

## Context

O site é prerenderizado e o conteúdo é imutável: um artigo publicado não muda enquanto o leitor o lê.

Ainda assim, a árvore inteira hidratava. Em um case study longo, cada nó do corpo do texto era percorrido e reconciliado pelo framework para servir três ilhas realmente interativas — o toggle de tema, o menu mobile e os links do router.

O plano previa `withIncrementalHydration()` e fronteiras `@defer`, com duas metas de aceite: reduzir o tempo de hydration em 60% e levar o JavaScript inicial para menos de 200 kB brutos.

## Decision

Delimitar as fronteiras na página de conteúdo — prosa como `hydrate never`, índice lateral e grade de relacionados como `hydrate on viewport` — e **manter a mudança**, mesmo tendo falhado nas duas metas como estavam escritas.

## Measurement

Trabalho de hydration, na contagem que o próprio framework reporta:

```text title="Nós e componentes hidratados"
Rota                          antes            depois           nós
/pt/engineering/principles    14 / 442         6 / 150          -66,1%
/pt/work/invest-lucy          16 / 458         7 / 161          -64,8%
/pt/writing/ai-agents...      13 / 296         6 / 150          -49,3%
```

Tempo e bundle, na página mais pesada, com CPU limitada a 1/4 da velocidade:

```text title="Relógio e bytes"
Layout                116,63 ms  ->   94,67 ms     -18,8%
Script                173,06 ms  ->  162,61 ms      -6,0%
Long tasks               411 ms  ->     396 ms      -3,6%
JS inicial            290,65 kB  ->  305,34 kB      +5,1%
```

## The Actual Finding

Cortar dois terços dos nós hidratados comprou seis por cento de tempo de script.

A distância entre as duas tabelas é o resultado útil desta fase. O custo dominante não é a hydration por nó — é o bootstrap do framework e do router, que acontece igual em qualquer rota.

A evidência disso já estava no baseline e passou despercebida na redação do plano: **antes** de qualquer mudança, a página mais pesada do site custava praticamente o mesmo que a página de índice mais magra, ~170 ms de script e ~410 ms de long task. Se o custo fosse proporcional ao tamanho do documento, essas duas medidas não poderiam coincidir.

A meta de 60% foi escrita sobre uma hipótese que o próprio baseline contradizia. Ninguém olhou para ela até haver um número depois para comparar.

## Why Keep It

O trabalho de hydration caiu pela metade em componentes e por dois terços em nós. Isso é real e favorece justamente os aparelhos que menos aparecem em uma medição feita na máquina de quem desenvolve.

O que se paga por isso é ~14,7 kB de runtime, uma vez, em um recurso que o navegador guarda em cache. O que se ganha é menos trabalho de main thread em toda visita, no aparelho de quem lê.

A troca é apertada e foi registrada como tal, não vendida como vitória.

## Alternative 1 — Reverter a trilha inteira

Devolveria os 14,7 kB e removeria a complexidade das fronteiras no template.

Rejeitada porque a redução de trabalho por página é medida e persistente, e porque a decisão de reverter deveria vir de uma medição em aparelho real, não da frustração com uma meta mal formulada.

## Alternative 2 — Diferir também o header e o footer

Era o que o plano previa. Ambos foram implementados e ambos foram revertidos, por motivos diferentes e ambos medidos.

O header mantém o destaque do item de menu ativo. Diferi-lo por interação significaria que, numa navegação disparada de qualquer outro ponto da página, o header não teria hidratado e o destaque ficaria congelado na página anterior.

O footer rendia 15 nós e um componente — e custava aos seus links a navegação por router, transformando cada clique em carga completa de documento. Mau negócio, medido e desfeito.

## Measurement Pitfall

A primeira rodada de números estava contaminada e quase foi publicada.

O servidor de desenvolvimento roda com hot module replacement, e nesse modo o framework avisa que carrega as dependências de `@defer` avidamente. As contagens oscilaram de 312 para 68 nós sem nenhuma mudança de código correspondente.

Refazer tudo com HMR desligado mostrou que os ganhos reais eram **maiores** que os primeiros números sugeriam, não menores. Uma medição instável engana nos dois sentidos.

## Consequences

O orçamento de bundle do build foi ajustado de 300 para 310 kB — não para esconder o custo, que está medido acima, mas para o orçamento voltar a sinalizar crescimento não intencional. O limite de erro não mudou.

Um aviso permanente em todo build treina quem o lê a ignorá-lo, que é exatamente o modo de falha que um orçamento existe para evitar.

## What Would Make This Decision Change?

Reavaliar com medição em aparelho real de gama média, não em CPU limitada artificialmente. Se o ganho de main thread não aparecer lá, os 14,7 kB não se justificam e a trilha sai.

Chegar aos 200 kB brutos exigiria remover código de framework — abrir mão do router, ou emitir as páginas sem framework no cliente. Isso é outra decisão de arquitetura, não uma fronteira de hydration, e deve ser tratada como tal.

## Summary

**uma meta escrita antes da medição mede a confiança de quem a escreveu, não o sistema.**
