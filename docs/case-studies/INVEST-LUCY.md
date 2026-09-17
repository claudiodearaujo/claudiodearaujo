# Invest Lucy

## Evidence-Driven Autonomous Investment Research

Invest Lucy é uma plataforma experimental para pesquisa, validação e evolução controlada de estratégias financeiras.

O projeto começou com uma pergunta aparentemente simples:

**é possível construir um sistema capaz de analisar mercados e executar estratégias automaticamente?**

À medida que a arquitetura amadureceu, a pergunta mais importante mudou:

**como saber quando um sistema realmente possui evidência suficiente para receber autonomia?**

Essa mudança transformou o Invest Lucy de um projeto de automação em um laboratório de engenharia para sistemas autônomos em ambientes de alto risco.

## Overview

Sistemas financeiros são um bom domínio para estudar autonomia porque erros possuem consequências concretas.

Uma estratégia pode parecer correta em backtest, funcionar em um período específico, explorar informação futura, degradar quando o regime de mercado muda, produzir resultados diferentes em produção, falhar por dados ou infraestrutura e continuar tecnicamente operacional mesmo quando deveria parar.

Por isso, Invest Lucy não foi projetado apenas para responder “Qual estratégia funciona?”, mas também:

- Por que acreditamos que ela funciona?
- Em quais condições?
- Com qual evidência?
- Qual o nível de incerteza?
- O comportamento continua válido fora da amostra?
- O sistema consegue detectar quando não deveria operar?

## The Core Principle

### Evidence Before Autonomy

**autonomia precisa ser conquistada por evidência.**

Existe uma separação importante entre:

```text
Can execute
```

e

```text
Should execute
```

O primeiro é problema de software. O segundo é problema de evidência, risco e governança.

## From Trading Bot to Research System

Arquitetura tradicional:

```text
Market Data
     ↓
Strategy
     ↓
Signal
     ↓
Order
     ↓
Broker
```

Arquitetura evoluída:

```text
Market Data
     ↓
Strategy
     ↓
Recommendation
     ↓
Shadow Execution
     ↓
Outcome
     ↓
Scientific Evidence
     ↓
Calibration
     ↓
Validation
     ↓
Human Review
     ↓
Runtime Decision
```

A execução passou a ser apenas uma parte de um ciclo maior de aprendizagem e controle.

## The Research Pipeline

```text
Scientific Evidence Accumulation
              ↓
Shadow Outcomes
              ↓
Calibration
              ↓
≥ 20 Matured Outcomes
              ↓
Strategy Advisor Thesis
              ↓
Hypothesis Experiments
              ↓
Walk-forward
              ↓
Out-of-Sample Validation
              ↓
Monte Carlo
              ↓
Consolidated Evidence
              ↓
Human Review
```

Somente após essa sequência existe espaço para discutir Runtime Handoff e eventual nova campanha PAPER.

## Scientific Evidence Accumulation

A fase atual é centrada em acumulação científica.

O objetivo não é gerar mais sinais, mas construir base de observações consistente para avaliar comportamento da estratégia.

Cada recomendação precisa produzir contexto suficiente: estratégia, ativo, timestamp, contexto de mercado, recomendação, preço de referência, resultado posterior, horizonte e evidência associada.

## Shadow Mode

Shadow Mode é uma peça central.

```text
Market
  ↓
Strategy
  ↓
Recommendation
  ↓
Shadow Execution
  ↓
Observed Outcome
```

O sistema produz recomendação como se estivesse autorizado a operar, mas nenhuma ordem real precisa ser enviada.

Isso permite estudar a diferença entre o que o sistema teria feito e o que realmente aconteceu depois, sem colocar capital real em risco.

## Why Shadow Mode Matters

Backtests são importantes, mas podem sofrer overfitting, leakage, look-ahead bias e seleção de períodos favoráveis.

Shadow Mode introduz uma característica diferente: o futuro ainda não aconteceu quando a decisão é registrada.

Isso diferencia “testing what would have happened” de “recording what we believed before knowing what happened”.

## Matured Outcomes

Uma recomendação precisa atingir seu horizonte de avaliação:

```text
Recommendation
      ↓
Pending Outcome
      ↓
Matured Outcome
```

Somente outcome maduro deve contribuir para determinadas métricas científicas.

## Calibration

Uma estratégia não deveria apenas acertar. Deveria possuir relação coerente entre confiança, decisão e resultado.

Calibration investiga se confiança declarada corresponde à realidade observada.

## Strategy Advisor

Após acumulação suficiente de evidência, o Strategy Advisor pode formular hipóteses baseadas em evidência existente.

Uma tese não significa verdade. Ela gera um experimento.

## Hypothesis-Driven Research

```text
Evidence
   ↓
Observation
   ↓
Hypothesis
   ↓
Experiment
   ↓
Validation
   ↓
Evidence
```

Isso reduz o risco de modificar constantemente estratégia com base nos últimos resultados.

## Walk-Forward Validation

```text
Train
  ↓
Validate
  ↓
Move Window
  ↓
Train
  ↓
Validate
```

O objetivo é aproximar o processo de uma situação real e avaliar estabilidade.

## Out-of-Sample Validation

Pergunta: a hipótese continua funcionando em dados que não participaram de sua construção?

OOS funciona como barreira contra falsa confiança produzida por adaptação excessiva.

## Monte Carlo

Monte Carlo explora distribuições de resultados, drawdowns, variabilidade, cenários desfavoráveis, risco de ruína e sensibilidade à ordem dos eventos.

O objetivo não é prever exatamente o futuro, mas compreender melhor a incerteza.

## Consolidated Evidence

Nenhuma métrica individual deve decidir prontidão.

```text
Performance
+
Stability
+
Calibration
+
Risk
+
OOS
+
Walk-forward
+
Monte Carlo
+
Operational Reliability
```

## Human Review

Mesmo depois das etapas quantitativas, existe uma etapa deliberadamente humana para avaliar coerência econômica, dependência de regime, risco operacional, mudanças recentes, confiabilidade de infraestrutura e motivos para manter autonomia desabilitada.

Human Review não substitui evidência; adiciona julgamento ao final de uma cadeia de evidência.

## Progressive Autonomy

```text
Research
   ↓
Recommendation
   ↓
Shadow
   ↓
Human-approved PAPER
   ↓
Policy-controlled PAPER
   ↓
Possible Future Runtime
```

Cada etapa possui critérios próprios.

## Architecture

```text
               Market Data
                    ↓
            Strategy Engine
                    ↓
             Recommendation
                    ↓
       ┌────────────┴────────────┐
       ↓                         ↓
 Research Pipeline           Runtime Pipeline
       ↓                         ↓
Evidence                    Risk Evaluation
       ↓                         ↓
Calibration                      OMS
       ↓                         ↓
Experiments                 Execution
       ↓                         ↓
Validation                  Portfolio
```

Ambos convergem para Audit, Observability, Reconciliation e Governance.

A separação entre Research e Runtime é deliberada.

## Market Data

Qualidade de dados precisa considerar freshness, gaps, duplicação, ordem temporal, timezone, mercado aberto/fechado e inconsistência entre fontes.

## Strategy Engine

A estratégia produz uma recomendação, não uma ordem:

```text
Strategy
   ↓
Recommendation
```

## Risk Engine

Risk é responsabilidade independente e pode avaliar exposição, posição atual, limites, capital, concentração, horário, estado do sistema e kill switch.

## OMS

```text
Intent
  ↓
Order
  ↓
Submitted
  ↓
Acknowledged
  ↓
Filled / Rejected / Cancelled
```

Uma chamada de API para corretora não equivale a ordem concluída.

## Crash Recovery

Exemplo:

```text
Send Order
   ↓
Broker accepts
   ↓
Application crashes
```

Quando o sistema volta, o estado verdadeiro não pode depender apenas da memória local anterior ao crash.

## Reconciliation

```text
Local OMS
   ↕
Broker State
```

Procura divergências como ordem existente apenas localmente ou externamente, status diferente, fill não registrado e posição inconsistente.

## Retry and Backoff

Retries precisam considerar idempotência, tipo da operação, número de tentativas, backoff, cancellation e correlation.

## Dead-Letter Queue

```text
Failure
   ↓
Retry
   ↓
Retry
   ↓
Persistent Failure
   ↓
DLQ
```

Falha persistente se torna evento operacional visível.

## Auditability

A trilha ideal conecta:

```text
Market Data
   ↓
Strategy Decision
   ↓
Risk Evaluation
   ↓
Order
   ↓
Fill
   ↓
Portfolio Change
```

por correlation id.

## Immutable Events

Eventos financeiros e de governança não deveriam ser reescritos arbitrariamente. Correções geram novos eventos; o passado permanece auditável.

## Observability

Três dimensões:

- Technical Observability: health, errors, latency, database, workers;
- Operational Observability: orders, fills, reconciliation, DLQ, retries;
- Scientific Observability: recommendations, outcomes, calibration, experiments, evidence accumulation.

Um sistema pode estar tecnicamente saudável e cientificamente inútil.

## Kill Switch

Kill switch deve ser capacidade arquitetural, não botão isolado.

```text
New Decisions → blocked
New Orders → blocked
Existing Orders → policy-defined handling
Monitoring → remains active
```

## Safe Defaults

**autonomy defaults to off.**

A ausência de configuração nunca deve resultar em maior liberdade operacional.

## Local Homologation

O ambiente local reproduzível permite validar containers, persistência, banco, TLS, readiness, restart, recovery, reconciliation, backup e restore.

A infraestrutura faz parte das evidências de confiabilidade.

## Deployment Gates

```text
Build
  ↓
Migrations
  ↓
Health
  ↓
Readiness
  ↓
Recovery
  ↓
Reconciliation
  ↓
Backup
```

## Same-Candle Execution

Uma decisão gerada com fechamento do candle N só pode ser elegível a partir do candle seguinte:

```text
Candle N closes
     ↓
Signal generated
     ↓
Execution eligible from N+1
```

Isso preserva causalidade temporal e evita look-ahead bias.

## Scientific Bugs vs Software Bugs

Um software bug pode gerar exception, crash ou resultado incorreto. Um scientific bug pode executar normalmente e produzir evidência inválida.

Exemplos: look-ahead, leakage, seleção inadequada, avaliação prematura e dados fora de ordem.

Qualidade científica exige validar software e metodologia.

## Strategy Isolation

Experimentos precisam preservar baseline:

```text
Baseline
vs
Hypothesis A
vs
Hypothesis B
```

## Financial Domain as a Stress Test

Muitas questões do Invest Lucy são aplicáveis a sistemas autônomos de alto risco em geral: autonomia progressiva, auditabilidade, policy enforcement, human review, evidence accumulation, fail-safe defaults, recovery e decision traceability.

## LucyOS Integration

```text
Lucy
 ↓
Investment Copilot
 ↓
Specialist Agents
 ↓
Research Domain
```

A inteligência conversacional não deve possuir autoridade implícita sobre o sistema financeiro.

## Investment Committee

```text
Research Agent
     +
Risk Agent
     +
Market Agent
     +
Strategy Agent
     ↓
Investment Committee
```

O objetivo é separar perspectivas analíticas, não criar personagens.

## Strategy Advisor

Em vez de apenas responder Buy/Sell, deve ajudar a responder: **O que os dados atuais sugerem que devemos investigar?**

## What the System Should Refuse to Do

O sistema não deveria automaticamente ativar autonomia, aumentar risco, alterar estratégia de produção, ignorar gate científico, promover experimento para runtime, usar capital real sem autorização ou remover proteções operacionais.

## Governance

- Code Governance
- Runtime Governance
- Scientific Governance
- Financial Governance
- Human Governance

## Reproducibility

Uma evidência ideal deve permitir recuperar versão da estratégia, parâmetros, dados, período, metodologia, resultado e código associado.

## The Current Stage

O foco principal deixou de ser infraestrutura e passou para **Scientific Evidence Accumulation**.

A pergunta já não é apenas “O sistema consegue rodar?”, mas “O que estamos aprendendo com o comportamento observado?”.

## Current Research Direction

```text
Scientific Evidence Accumulation
              ↓
Shadow Outcomes
              ↓
Calibration
              ↓
≥20 Matured Outcomes
              ↓
Strategy Advisor Thesis
              ↓
Hypothesis Experiments
              ↓
Walk-forward
              ↓
OOS
              ↓
Monte Carlo
              ↓
Consolidated Evidence
              ↓
Human Review
```

Runtime Handoff é discussão futura, não meta imediata.

## Lessons Learned

1. Automation is easy compared with autonomy.
2. Evidence needs architecture.
3. Scientific correctness is different from software correctness.
4. Runtime and research should be separated.
5. Recovery is a normal state.
6. Auditability increases with autonomy.
7. Risk should not belong to strategy.
8. Human review is not failure.

## What I'm Exploring Next

Scientific Evidence, Calibration, Strategy Advisor, Multi-Strategy Research, Market Regimes, AI-Assisted Research e Explainability.

## Why This Project Matters to Me

Invest Lucy se tornou uma forma prática de explorar uma pergunta cada vez mais relevante:

**como construímos sistemas que podem receber autonomia sem abrir mão de evidência, controle e responsabilidade?**

## Related Engineering Principles

Evidence Before Autonomy · Human-in-the-loop · Observability by Design · Failure Is Part of the Architecture · Documentation Is Engineering · Incremental Evolution · Safe Defaults

## Related Architecture Decisions

Why Shadow Mode Before Autonomy? · Why Research and Runtime Must Be Separate? · Why Financial Audit Should Be Append-Only? · Why Risk Must Be Independent from Strategy? · Why Reconciliation Is Part of Runtime?

## Related Writing

From Automation to Autonomy · Evidence Before Autonomy · Why Shadow Mode Matters · Scientific Bugs in Autonomous Systems · Observability for Autonomous Agents · Human-in-the-loop for Critical Systems · Why AI Systems Need Safe Defaults

## Closing

Invest Lucy não é uma tentativa de construir o sistema que mais rapidamente consiga operar sozinho.

É uma tentativa de construir um sistema que saiba por que ainda **não deveria** operar sozinho.

O objetivo não é maximizar autonomia. É construir um processo no qual autonomia, se algum dia for ampliada, seja consequência de evidência, confiabilidade e revisão consciente.

**Invest Lucy — Autonomy should be earned, not assumed.**
