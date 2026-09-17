# Evidence Before Autonomy

## Por que sistemas inteligentes deveriam conquistar autoridade através de evidência

Existe uma tendência compreensível em projetos de inteligência artificial: assim que o sistema demonstra uma capacidade, queremos utilizá-la.

Mas existe uma diferença importante entre **demonstrar capacidade** e **demonstrar confiabilidade**.

Essa diferença é o motivo pelo qual considero um princípio especialmente importante:

**Evidence Before Autonomy.**

## Uma demonstração não é evidência suficiente

Demos mostram possibilidades, normalmente em condições favoráveis.

Sistemas reais encontram entradas estranhas, dependências indisponíveis, informação incompleta, contextos novos, mudanças externas e situações não previstas.

Uma decisão sobre autonomia precisa considerar essa diferença.

## Capability

Pergunta: **O sistema consegue fazer isso?**

Exemplos: classificar documento, criar ordem, modificar arquivo, chamar API.

## Reliability

Pergunta: **Com que frequência isso funciona corretamente?**

## Robustness

Pergunta: **Continua funcionando quando o contexto muda?**

## Authority

Pergunta: **Mesmo conseguindo fazer isso, deveria possuir permissão para executar sozinho?**

Essas quatro perguntas não são equivalentes.

## Autonomy as earned authority

```text
Capability
   ↓
Observation
   ↓
Evidence
   ↓
Confidence
   ↓
Authority
```

É muito diferente de `Capability → Production`.

## O que conta como evidência?

Depende do domínio. Exemplos:

- testes;
- avaliação offline;
- simulação;
- shadow execution;
- outcomes observados;
- calibração;
- performance histórica;
- failure rates;
- human review;
- recovery tests.

Nenhum deles isoladamente prova segurança. Juntos podem construir um caso.

## Evidência técnica

Precisamos saber se a plataforma consegue operar: API saudável, workers processando, persistência correta, recovery após restart, backup, reconciliation e retries.

Isso não responde ainda se as decisões são boas.

## Evidência comportamental

Observar quais recomendações o sistema produz, em quais contextos, com qual confiança, qual taxa de erro e quando se abstém.

## Evidência prospectiva

Registrar uma decisão antes de conhecer seu resultado:

```text
Decision at T0
      ↓
Future occurs
      ↓
Outcome at T1
```

Isso reduz ajuste retrospectivo.

## Shadow evidence

```text
Input
 ↓
Decision
 ↓
Shadow Record
 ↓
Observed Outcome
```

O sistema age como se estivesse autorizado, mas o efeito real não ocorre.

## Outcome maturity

```text
Recommendation
 ↓
Pending Outcome
 ↓
Matured Outcome
```

Apenas outcomes maduros deveriam alimentar determinadas métricas.

## Calibration

Acerto não é suficiente. Se um sistema diz estar 95% confiante, esperamos comportamento diferente de uma previsão com 55%.

Calibration compara predicted confidence com observed frequency.

## Evidence needs isolation

Experimentos precisam preservar baseline:

```text
Baseline
   │
   ├── Hypothesis A
   └── Hypothesis B
```

Cada hipótese produz sua própria evidência.

## Scientific correctness

Sistemas de pesquisa possuem bugs perigosos que não produzem exception: look-ahead bias, leakage, cherry-picking, outcome prematuro, uso de dados futuros e seleção inadequada.

O software pode funcionar perfeitamente e ainda produzir evidência inválida.

## Walk-forward

```text
Train
 ↓
Validate
 ↓
Move Window
 ↓
Repeat
```

Ajuda a avaliar comportamento ao longo do tempo.

## Out-of-sample

Uma hipótese construída em determinado conjunto de dados precisa ser testada em dados que não participaram de sua criação.

## Monte Carlo

Ajuda a compreender dispersão, drawdown, cenários ruins, risco de ruína e variabilidade. O objetivo não é prever o futuro, mas entender o espaço de possibilidades.

## Evidence should be multidimensional

```text
Performance
+
Stability
+
Calibration
+
Robustness
+
Operational Reliability
+
Risk
+
Human Review
```

Nenhuma métrica deveria possuir autoridade total.

## Human review

Human Review não substitui evidência. Também não deveria ser tratado como sinal de que o sistema “ainda não está pronto”.

Em domínios importantes, revisão humana pode ser camada permanente para considerar contexto, mudanças externas, eventos excepcionais, coerência econômica e riscos não capturados.

## Evidence decay

Evidência pode envelhecer. Autoridade pode precisar ser mantida através de evidência contínua.

## Autonomy can decrease

```text
Performance degradation
        ↓
Confidence falls
        ↓
Autonomy reduced
        ↓
Investigation
```

Se autonomia pode aumentar por evidência, também deveria diminuir quando evidência enfraquece.

## Evidence is not certainty

Mesmo excelentes evidências não eliminam incerteza.

O objetivo é compreender comportamento, limites, riscos e condições de falha suficientemente bem para decidir conscientemente sobre autoridade.

## A promoção deveria ser explícita

```text
Evidence collected
       ↓
Gate evaluated
       ↓
Human review
       ↓
Authority changed
```

Ampliar autonomia deve ser evento governado, não efeito colateral de deploy.

## Evidence and software engineering

Existem paralelos com canary releases, feature flags, progressive rollout, staging, load testing e chaos testing.

Em todos esses casos evitamos exposição máxima imediatamente: primeiro observamos, depois aumentamos confiança.

## Um framework simples

Antes de ampliar autonomia, considerar:

1. Capability — consegue executar?
2. Reliability — com que frequência corretamente?
3. Observability — conseguimos compreender quando erra?
4. Recoverability — conseguimos limitar ou reparar impacto?
5. Evidence — temos dados suficientes para justificar a autoridade desejada?

Se uma resposta for fraca, talvez a autonomia esteja à frente da maturidade real.

## O objetivo não é desacelerar inovação

Existe diferença entre velocidade de implementação e velocidade segura de adoção.

Colocar algo rapidamente em produção e depois perder confiança pode ser muito mais lento no longo prazo.

## Closing

Capacidade é fácil de demonstrar. Confiabilidade exige observação. Robustez exige tempo. Autoridade exige decisão.

Entre capacidade e autonomia existe um espaço importante. Esse espaço deveria ser preenchido por observação, avaliação, evidência, controle e revisão.

**Autonomy should be earned through evidence.**
