---
title: Legacy Profit Research
slug: legacy-profit-research
locale: pt
type: lab
summary: Reprodução científica de estratégias históricas para separar memória, código, fonte de dados e evidência antes de reutilizar qualquer tese.
status: Active Research
tags: [Research, Evidence, Trading Systems, Reproducibility]
category: Scientific Reproduction
publishedAt: 2026-09-26
related:
  - /pt/work/invest-lucy
  - /pt/writing/evidence-before-autonomy
---

# Legacy Profit Research

## Quando código antigo vira evidência — e quando não vira

Antes de Invest Lucy existir como sistema científico, houve anos de hipóteses, estratégias e experimentos construídos em outras ferramentas.

Parte desse material sobreviveu como código NTSL.

Mas possuir código histórico não significa possuir evidência histórica.

Legacy Profit Research nasceu para responder uma pergunta específica:

**o que dessas estratégias antigas consegue ser reproduzido hoje de forma suficientemente controlada para gerar conhecimento confiável?**

## Scientific Archaeology

O primeiro trabalho não foi otimizar estratégia.

Foi reconstruir linhagem.

Foram recuperadas 23 estratégias históricas e organizadas em famílias como:

```text
GAMA
Serena
Serena Dólar
Theta
...
```

O objetivo é preservar:

- código original;
- variações;
- parentesco entre versões;
- parâmetros conhecidos;
- contexto disponível;
- resultados de reprodução;
- divergências entre fontes.

Esse arquivo funciona como registro histórico imutável.

Experimentos novos não reescrevem o passado.

## Reproduction Before Improvement

Existe uma tentação natural ao encontrar uma estratégia antiga: corrigir, otimizar e testar novamente.

Isso destrói uma informação importante.

Se o comportamento original não pode ser reproduzido, qualquer melhoria posterior mistura duas perguntas:

1. o que a estratégia antiga realmente fazia?
2. o que a nova estratégia faz?

Por isso a ordem é:

```text
Recover
   ↓
Classify
   ↓
Freeze
   ↓
Reproduce
   ↓
Compare
   ↓
Explain divergence
   ↓
Only then create a new hypothesis
```

## Data Source Is Part of the Experiment

Uma das descobertas mais importantes foi que a fonte de dados não pode ser tratada como detalhe operacional.

A mesma lógica pode produzir resultados diferentes quando muda:

- histórico disponível;
- construção do contrato;
- sessão;
- ajuste;
- granularidade;
- tratamento de gaps;
- caudas da distribuição.

Isso significa que “a estratégia funcionava” é uma afirmação incompleta.

A pergunta correta é:

**em qual dataset, sob quais regras e com qual pipeline ela produziu aquele resultado?**

## GAMA V5

A reprodução de GAMA V5 mostrou que o resultado não é invariável à fonte.

O comportamento depende de características do dataset e possui sensibilidade relevante às caudas.

Isso muda a interpretação.

Em vez de procurar confirmação de uma memória antiga, o experimento passa a investigar **quais condições explicam a divergência**.

## Serena V4

Serena V4 permaneceu negativa mesmo depois de controles adicionais por contratos.

Esse resultado também é útil.

Uma pesquisa não falha porque a hipótese não sobrevive.

Ela falha quando o processo é incapaz de mostrar por que acreditamos no resultado.

## Negative Evidence Is Still Evidence

Essa trilha reforçou uma ideia que hoje aparece em vários dos meus projetos:

> Resultado negativo reduz espaço de hipótese.

Quando uma reprodução controlada contradiz a lembrança ou expectativa original, existem duas opções ruins:

- ajustar o experimento até ele confirmar a história;
- descartar o resultado porque ele não é interessante.

A opção útil é registrar a divergência.

## Pre-Registration

Experimentos seguintes passaram a ser definidos antes da leitura do resultado.

O pré-registro pode incluir:

- hipótese;
- estratégia/família;
- dataset;
- contratos;
- período;
- regras de sessão;
- parâmetros;
- métricas;
- critérios de interpretação.

Isso reduz a liberdade de explicar qualquer resultado depois que ele já é conhecido.

## Versioned Evidence

Cada etapa relevante deve deixar artefato.

```text
Historical Source
      ↓
Immutable Archive
      ↓
Reproduction Spec
      ↓
Execution Artifact
      ↓
Result
      ↓
Interpretation
      ↓
Next Hypothesis
```

Código, dados, parâmetros e interpretação precisam continuar distinguíveis.

## Relationship with Invest Lucy

Legacy Profit Research e Invest Lucy não são o mesmo projeto.

Invest Lucy parte de uma arquitetura científica e operacional construída deliberadamente para evidência prospectiva, shadow outcomes, calibration e autonomia progressiva.

Legacy Profit Research olha para trás.

Ele tenta descobrir quais ideias históricas merecem ser:

- descartadas;
- explicadas;
- reproduzidas;
- transformadas em novas hipóteses.

A ponte entre os dois é controlada.

Nenhuma estratégia antiga recebe autoridade apenas porque existiu ou porque um backtest histórico parece atraente.

## Current Research

A trilha atual continua investigando famílias Serena e Serena Dólar e hipóteses relacionadas a regime, pullback, tipo de ordem, reversão e sessão operacional.

Essas hipóteses são pesquisa, não recomendações operacionais.

## What This Research Changed

O principal resultado até agora não é uma estratégia.

É um método.

```text
Memory is not evidence.
Code is not evidence.
A backtest is not evidence by itself.

Reproducibility
+ provenance
+ versioning
+ explicit hypotheses
= a better starting point
```

## Why It Matters Beyond Trading

O problema é mais geral.

Sistemas de software acumulam decisões antigas, benchmarks, scripts, heurísticas e histórias sobre “o que funcionava”.

Quando tentamos reutilizar isso anos depois, precisamos distinguir:

- fato;
- memória;
- artefato;
- interpretação;
- contexto perdido.

Legacy Profit Research é um laboratório sobre trading, mas a disciplina é de engenharia:

**antes de reutilizar uma conclusão antiga, reconstrua as condições que a tornavam verdadeira.**
