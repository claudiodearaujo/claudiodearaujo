---
title: Why Shadow Mode Before Autonomy?
slug: shadow-mode-before-autonomy
locale: pt
type: decision
summary: Como construir evidência prospectiva antes de permitir autonomia operacional.
status: Accepted
tags: [Autonomy, Evidence, Research]
---

# ADR 002 — Why Shadow Mode Before Autonomy?

## Status

Accepted

## Context

Um sistema pode tecnicamente produzir decisões antes de sabermos se essas decisões são suficientemente confiáveis para execução autônoma.

Backtests ajudam, mas podem sofrer overfitting, look-ahead, leakage e seleção de períodos.

Precisamos observar decisões em condições futuras sem necessariamente executar seus efeitos reais.

## Problem

Como gerar evidência prospectiva sobre o comportamento de um sistema antes de conceder autonomia?

Precisamos separar **Decision capability** de **Execution authority**.

## Decision

Toda estratégia candidata a autonomia deve passar por **Shadow Mode** antes de receber autorização operacional equivalente.

```text
Market State
     ↓
Strategy
     ↓
Recommendation
     ↓
Shadow Record
     ↓
Future Outcome
     ↓
Evidence
```

A recomendação é registrada no momento em que seria tomada. Nenhuma execução real é necessária. Depois, o resultado futuro é observado.

## Why

Shadow Mode cria algo que backtests não conseguem reproduzir completamente: **uma decisão registrada antes de conhecermos o futuro.**

Isso produz evidência prospectiva.

## Matured Outcomes

```text
Recommendation
     ↓
Pending
     ↓
Matured Outcome
```

Somente outcomes maduros devem contribuir para determinadas avaliações.

## Minimum Evidence

Nenhum número mínimo isolado garante validade científica. No Invest Lucy, `≥ 20 matured outcomes` funciona como gate operacional inicial, não prova definitiva.

## Calibration

Shadow Mode permite avaliar não apenas acerto, mas relação entre confiança declarada e frequência observada.

## Alternative 1 — Backtest Only

Rápido, barato e com grande volume histórico, mas pode ser contaminado por conhecimento retrospectivo e não testa comportamento operacional presente.

Backtests continuam necessários, mas não suficientes para autonomia.

## Alternative 2 — PAPER Immediately

Testa pipeline operacional, mas mistura perguntas científicas e operacionais e pode gerar pressão prematura para runtime.

PAPER pode existir posteriormente. Shadow Evidence permanece etapa anterior.

## Alternative 3 — Real Capital with Small Position

Produz feedback real, mas usa risco financeiro como mecanismo de validação. Rejected como mecanismo inicial.

## Separation from Runtime

```text
Research
   ↓
Shadow
   ↓
Evidence
```

Shadow não deve possuir autoridade implícita sobre Runtime.

## Scientific Pipeline

```text
Scientific Evidence Accumulation
              ↓
Shadow Outcomes
              ↓
Calibration
              ↓
Matured Evidence
              ↓
Hypotheses
              ↓
Experiments
              ↓
Walk-forward
              ↓
OOS
              ↓
Monte Carlo
              ↓
Human Review
```

## Operational Requirements

Registrar strategy version, asset, timestamp, market context, recommendation, confidence, reference price, evaluation horizon e correlation id.

## Immutability

Recomendações históricas não devem ser alteradas silenciosamente depois que outcome é conhecido.

## Same-Candle Protection

```text
Candle N closes
      ↓
Signal
      ↓
Eligible execution from N+1
```

Preservar causalidade temporal.

## Consequences

Shadow Mode adiciona tempo ao processo. Isso é intencional.

Preferir **slower evidence** a **faster unsupported autonomy**.

## What Shadow Mode Does Not Prove

Não prova sozinho robustez, lucratividade futura, estabilidade em outros regimes, segurança operacional ou ausência de overfitting.

É uma camada de evidência, não o veredito final.

## Promotion Gate

```text
Shadow
+
Calibration
+
Walk-forward
+
OOS
+
Monte Carlo
+
Risk
+
Human Review
```

Nenhum resultado shadow deveria promover automaticamente uma estratégia.

## What Would Make This Decision Change?

Poderia ser revista em domínios sem consequência relevante de execução, sem diferença material entre observação e execução ou se outro método oferecer evidência prospectiva equivalente com menor complexidade.

## Summary

Shadow Mode cria espaço entre **ser capaz de decidir** e **ter permissão para agir**.

**Autonomy should follow observation, not precede it.**
