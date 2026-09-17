---
title: Evaluating Agentic Systems
slug: evaluating-agentic-systems
locale: pt
type: lab
summary: Como avaliar comportamento de agentes completos além da resposta final.
status: Active Research
tags: [AI, Agents, Evaluation]
---

# Evaluating Agentic Systems

## Como saber se um agente está realmente melhorando

**Status:** Active Research
**Categoria:** AI Evaluation / Agentic Systems
**Relacionado a:** LucyOS, Invest Lucy

## Research Question

Como avaliar sistemas agentic de forma suficientemente objetiva quando o resultado depende não apenas da resposta final, mas também de contexto, uso de ferramentas, decisões intermediárias, custo, recuperação de falhas e grau de autonomia?

Para um chatbot simples, podemos perguntar: “A resposta estava correta?”

Para um agente, isso não é suficiente.

## Why This Matters

Considere um agente encarregado de analisar projeto e corrigir problema.

Ele pode localizar arquivos, compreender arquitetura, identificar causa, modificar código, executar testes, interpretar falhas, corrigir novamente e entregar resultado.

Mesmo se a mudança final estiver correta, outras perguntas importam:

- modificou arquivos desnecessários?
- executou ferramentas perigosas?
- utilizou contexto correto?
- precisou de muitas tentativas?
- deixou efeitos colaterais?
- gastou recursos demais?
- ignorou testes falhando?
- precisou de intervenção humana?

Avaliar apenas o resultado final esconde grande parte do comportamento.

## Hypothesis

> Sistemas agentic precisam ser avaliados em múltiplas dimensões e ao longo do workflow completo.

```text
Agent Quality =
Task Success
+
Decision Quality
+
Tool Quality
+
Efficiency
+
Reliability
+
Recoverability
+
Safety
```

Não necessariamente como soma matemática, mas como dimensões independentes.

## Unit of Evaluation

```text
Response
Action
Step
Workflow
Session
Long-term Behavior
```

Cada nível responde perguntas diferentes.

## Response Evaluation

Factuality, relevance, clarity e completeness. Útil, mas cobre pequena parte dos agentes.

## Action Evaluation

Perguntas: ferramenta correta? argumentos corretos? ação autorizada? havia alternativa mais segura?

## Step Evaluation

```text
Context
+
Decision
+
Action
+
Observation
```

Permite avaliar decisões intermediárias.

## Workflow Evaluation

```text
Task
 ↓
Plan
 ↓
Inspect
 ↓
Modify
 ↓
Test
 ↓
Validate
 ↓
Complete
```

Provavelmente o nível mais importante para agentes operacionais.

## Long-Term Evaluation

Alguns comportamentos só aparecem ao longo do tempo: memória degrada? repete erros? acumula contexto ruim? melhora após feedback? cria inconsistências?

## Task Success

Possíveis estados:

```text
SUCCESS
PARTIAL
FAILED
INVALID
```

É importante distinguir workflow completed de task succeeded.

## Partial Success

Código corrigido com testes unitários passando, mas integração quebrada, não deveria ser tratado como sucesso total.

## Tool Selection

Avaliar se a ferramenta correta foi utilizada, se era necessária, se read-only seria suficiente e se o agente utilizou autoridade maior do que precisava.

## Minimal Authority Principle

Um agente deveria preferir a menor capability necessária.

`read_query` é preferível a `arbitrary_database_admin` quando ambas resolvem a tarefa.

## Tool Execution Quality

Distinguir ferramenta correta com argumentos errados de ferramenta errada. Os problemas exigem correções diferentes.

## Decision Quality

Algumas decisões podem ser ruins mesmo quando o resultado final dá certo. Exemplo: modificar produção diretamente pode ser processo perigoso apesar de eventual sucesso.

## Outcome Bias

Bons resultados às vezes surgem de processos perigosos. Avaliação agentic precisa evitar julgar decisões apenas pelo outcome.

## Efficiency

Dois agentes podem resolver a mesma tarefa com custos muito diferentes.

Métricas: tool calls, tokens, latency, model cost, retries e unnecessary steps.

## Efficiency vs Quality

Não otimizar eficiência isoladamente. Agente econômico que erra frequentemente não é melhor.

## Reliability

Avaliar comportamento em múltiplas execuções: success rate, variance, failure modes e consistency.

## Determinism Is Not Required

Agentes não precisam produzir caminho idêntico, mas deveriam produzir distribuição aceitável de comportamento.

## Recoverability

Pergunta: o que o agente faz depois de um erro?

```text
Tool fails
 ↓
Agent retries safely
 ↓
Recovers
```

é muito diferente de repetir a mesma ação indefinidamente.

## Failure Classification

- Reasoning Failure
- Tool Failure
- Context Failure
- Data Failure
- Permission Failure
- Infrastructure Failure
- Policy Failure

Isso evita atribuir todos os erros ao modelo.

## Context Quality

Avaliar se contexto era suficiente, relevante, atualizado, não contraditório e sem ruído excessivo.

## Memory Evaluation

Métricas:

- Relevant Recall;
- Irrelevant Recall;
- Stale Memory Usage;
- Cross-Scope Leakage.

## Safety Evaluation

Um agente pode cumprir tarefa e ainda se comportar de maneira insegura: exposição de segredo, comando destrutivo, ação não autorizada ou modificação fora de scope.

Task Success não pode substituir Safe Task Success.

## Policy Compliance

Avaliar Allowed Actions, Denied Actions, Approval Requirements e Scope Limits.

Um sistema precisa ser testado não apenas para saber se faz coisas permitidas, mas se evita coisas proibidas.

## Negative Evaluation

Muitos benchmarks perguntam se o agente consegue fazer X. Também precisamos perguntar se consegue evitar Y.

Exemplos: não fazer merge sem aprovação, não deletar dados, não executar ação financeira, não expor credenciais.

Capacidade de recusa correta também é competência.

## Human Intervention Rate

Intervenção humana não é automaticamente ruim.

Distinguir Expected Approval de Unexpected Rescue.

## Expected vs Unexpected Human Involvement

`Agent prepares deployment → Human approves → Agent deploys` é fluxo esperado.

`Agent gets stuck → Human manually fixes state` é intervenção não planejada.

## Evaluation Dataset

Tarefas representativas devem incluir Normal, Ambiguous, Incomplete, Conflicting, Failure, Unauthorized, High-risk e Adversarial.

## Scenario-Based Evaluation

Cada cenário pode definir Initial State, Goal, Available Tools, Allowed Actions, Forbidden Actions, Expected Evidence e Success Criteria.

## Deterministic Checks

Sempre que possível, usar verificações determinísticas: arquivo existe, testes passam, status correto, log contém evento, recurso proibido foi acessado.

LLM-as-judge deve complementar, não substituir, verificações objetivas.

## LLM-as-Judge

Pode ajudar em qualidade de explicação, relevância, coerência e completude, mas introduz novas incertezas.

Idealmente combinar Deterministic Evaluation + Model-Based Evaluation + Human Review.

## Judge Calibration

Um judge também precisa ser avaliado: concorda com humanos? possui viés de estilo? prefere respostas longas? varia muito?

## Baselines

Possíveis referências: Human, Previous Agent Version, Simpler Model, No Memory, No Tools e Rule-Based Approach.

Sem baseline, melhoria é difícil de demonstrar.

## Regression Testing

Cenários já resolvidos podem entrar em suíte de regressão:

```text
Known Behavior
      ↓
Agent Change
      ↓
Evaluation Suite
      ↓
Regression Detection
```

Mudanças em prompts, modelos ou tools podem afetar comportamentos inesperados.

## Versioning

Registrar model, prompt version, agent version, tool version, memory configuration e evaluator version.

## Experiment 1 — Multi-Dimensional Scorecard

Dimensões: Success, Safety, Tool Accuracy, Efficiency, Recovery e Policy Compliance.

Comparar agentes com mesma success rate.

## Experiment 2 — Failure Recovery Benchmark

Criar ferramentas que falham propositalmente: timeout, rate limit, malformed response, stale data e unavailable service.

Avaliar retry, fallback, escalation e infinite loop avoidance.

## Experiment 3 — Minimal Authority

Oferecer Safe Read Tool e Powerful Admin Tool capazes de resolver a tarefa e avaliar escolha.

## Experiment 4 — Memory Noise

Adicionar memórias irrelevantes e medir impacto em task success, latency, tool selection e hallucination.

## Experiment 5 — Negative Constraints

Tarefas onde sucesso exige não executar determinada ação. Exemplo: analisar problema sem alterar arquivos.

## Experiment 6 — Human Approval Boundary

Capability exige aprovação. Avaliar se o agente prepara, solicita aprovação, espera e só executa depois. Tentativa de bypass é falha crítica.

## Proposed Evaluation Framework

```text
Task
 ↓
Agent Run
 ↓
Trace
 ├── Context
 ├── Decisions
 ├── Tools
 ├── Results
 └── Errors
 ↓
Evaluators
 ├── Deterministic
 ├── Policy
 ├── Model Judge
 └── Human
 ↓
Scorecard
```

## Trace as Evidence

Uma boa avaliação depende de boa trace. Capturar input, tool calls, tool outputs, state transitions, approvals, errors e final output sem depender de raciocínio interno privado do modelo.

## Core Metrics Candidate

- Task Success
- Correctness
- Tool Precision
- Policy Compliance
- Intervention Rate
- Recovery Rate
- Cost
- Latency

## Composite Scores

Uma nota única pode esconder trade-offs. Inicialmente prefiro dashboards multidimensionais.

## Evaluation by Risk

Critérios mudam conforme impacto. Pesquisa pode privilegiar correctness e relevance; operação financeira deve dar peso maior a safety, authorization e auditability.

## Evaluation and Autonomy

```text
Evaluation
   ↓
Evidence
   ↓
Confidence
   ↓
Autonomy Decision
```

Sem avaliação, autonomia se torna baseada em percepção subjetiva.

## Agent Evaluation vs Model Evaluation

Model evaluation pergunta quão bom é o modelo. Agent evaluation pergunta quão bem o sistema inteiro realiza trabalho.

O segundo inclui Model + Prompt + Context + Memory + Tools + Policies + Workflow.

Um modelo melhor não garante automaticamente um agente melhor.

## Current Position

**agent evaluation should measure behavior, not just answers.**

Quanto mais capacidade operacional o agente recebe, menos suficiente se torna avaliar somente a resposta final.

## Next Steps

1. Definir schema de agent trace.
2. Definir primeiros cenários de benchmark.
3. Criar baseline sem memória.
4. Criar baseline sem tools avançadas.
5. Implementar deterministic evaluators.
6. Definir policy evaluator.
7. Experimentar LLM-as-judge.
8. Medir recovery.
9. Criar negative scenarios.
10. Construir scorecard multidimensional.
11. Conectar avaliação a gates de autonomia.

## Related Work

Projetos: LucyOS, Invest Lucy.
Princípios: Evidence Before Autonomy, Observability by Design, Tools Create Responsibility, Human-in-the-loop, Safe Defaults.
Writing: AI Agents Need Architecture, Not Just Prompts; Evidence Before Autonomy; From Automation to Autonomy.
ADRs: Why Human Control Belongs in the Architecture?; Why Shadow Mode Before Autonomy?; Why MCP-first?

## Closing

Avaliar agentes exige mudança de perspectiva.

A pergunta não pode ser apenas “A resposta ficou boa?”. Precisamos perguntar se o agente escolheu o caminho certo, utilizou a autoridade correta, recuperou-se das falhas, respeitou políticas, quanto custou e se consegue repetir esse comportamento.

À medida que agentes deixam de ser interfaces e passam a executar trabalho, avaliação deixa de ser apenas benchmark de IA.

Ela se torna parte da arquitetura de confiança.

**If agents are going to act, evaluation must measure how they act.**
