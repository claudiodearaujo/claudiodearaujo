---
title: Long-Term Memory for Agents
slug: long-term-memory-for-agents
locale: pt
type: lab
summary: Como construir memória útil sem transformar contexto acumulado em ruído.
status: Active Research
tags: [AI, Agents, Memory]
category: Memory
publishedAt: 2026-08-20
related:
  - /pt/work/lucyos
  - /pt/writing/ai-agents-need-architecture
---

# Long-Term Memory for Agents

## Como construir memória útil sem transformar contexto acumulado em ruído

**Status:** Active Research
**Categoria:** Agentic Systems / Memory
**Relacionado a:** LucyOS

## Research Question

Como um agente pode manter memória de longo prazo de forma útil, contextual e segura sem transformar todo o histórico acumulado em um contexto cada vez maior, mais caro e menos relevante?

Essa pergunta envolve seleção, relevância, tempo, conflito, atualização, esquecimento, identidade, privacidade e recuperação contextual.

O problema real não é “Como armazenar mais informações?”, mas:

**Como lembrar melhor?**

## Why This Matters

Grande parte das aplicações atuais de IA trata memória como extensão do histórico de conversa:

```text
Conversation
   ↓
Store Messages
   ↓
Retrieve Previous Messages
   ↓
Add to Prompt
```

Isso funciona em interações curtas, mas começa a apresentar limitações quando o agente acompanha uma pessoa, empresa ou projeto durante meses ou anos.

Com o tempo surgem milhares de informações. Nem todas continuam relevantes. Algumas ficam desatualizadas, outras se contradizem e muitas pertencem a contextos diferentes.

Simplesmente recuperar mais informação pode diminuir, em vez de aumentar, a qualidade da decisão.

## Hypothesis

> Memória útil para agentes precisa funcionar como um sistema de informação com lifecycle próprio, e não como um histórico infinito de mensagens.

```text
Capture
   ↓
Classify
   ↓
Consolidate
   ↓
Retrieve
   ↓
Update
   ↓
Forget
```

O agente não deveria consumir tudo que foi armazenado. Deveria receber apenas aquilo que é relevante para o contexto atual.

## Memory Is Not History

History responde: **O que aconteceu?**

Memory responde: **O que continua importante sobre o que aconteceu?**

Uma conversa pode conter cem mensagens, mas talvez apenas duas informações devam permanecer disponíveis meses depois.

## Initial Memory Model

```text
Memory
 ├── Working
 ├── Episodic
 ├── Semantic
 ├── Personal
 └── Project
```

### Working Memory

Contexto temporário da tarefa atual: objetivo, dados intermediários, plano e ferramentas utilizadas.

### Episodic Memory

Acontecimentos com forte componente temporal.

### Semantic Memory

Conhecimento relativamente estável.

### Personal Memory

Preferências e informações duradouras relevantes, com cuidados extras de privacidade e atualização.

### Project Memory

Conhecimento explicitamente associado a um projeto.

## Context Isolation

Sem isolamento, podemos terminar com:

```text
All Memories
    ↓
One Retrieval Layer
    ↓
Every Conversation
```

Isso aumenta risco de context contamination, irrelevant retrieval, privacy leakage e contradictory information.

Uma arquitetura melhor:

```text
Current Context
      ↓
Context Boundary
      ↓
Relevant Memory Domains
      ↓
Retrieval
```

## Memory Scope

Possíveis scopes:

```text
GLOBAL
PERSON
PROJECT
TASK
SESSION
```

Scope pode ser utilizado antes mesmo de busca semântica.

## Temporal Context

Informações mudam. Uma memória pode precisar de `createdAt`, `updatedAt`, `validFrom`, `validUntil` e `lastConfirmedAt` ou equivalentes.

Isso permite diferenciar fact de historical fact.

## Memory Conflict

Duas memórias podem entrar em conflito por mudança de preferência, contextos diferentes, informação incorreta ou relação hierárquica.

O sistema não deveria simplesmente escolher a de maior similaridade vetorial.

## Conflict Resolution

```text
New Information
      ↓
Conflict Detection
      ↓
Same Scope?
      ↓
Temporal Comparison
      ↓
Replace / Merge / Preserve History
```

A resolução pode depender de origem, timestamp, confidence, scope e confirmation.

## Consolidation

Agentes provavelmente não deveriam preservar cada experiência com o mesmo nível de detalhe.

```text
Event 1
Event 2
Event 3
Event 4
   ↓
Consolidation
   ↓
Stable Memory
```

O agente pode recuperar uma conclusão consolidada mantendo referências para as evidências originais.

## Provenance

Possíveis fontes:

- User Statement;
- Document;
- Project File;
- Tool Result;
- Derived Summary;
- Agent Inference.

Essas origens não possuem a mesma autoridade.

## Confidence

Algumas memórias podem possuir nível de confiança para tratar inferências como inferências, não como fatos absolutos.

## Retrieval

Uma estratégia baseada apenas em similaridade semântica pode recuperar informação parecida, mas irrelevante.

Retrieval pode considerar:

```text
Semantic Similarity
+
Scope
+
Recency
+
Importance
+
Confidence
+
Relationship
```

## Retrieval Score

Modelo experimental:

```text
MemoryScore =
semantic_relevance
× scope_weight
× freshness_weight
× importance_weight
× confidence
```

Não necessariamente como equação literal, mas como retrieval multidimensional.

## Importance

Nem todas as memórias deveriam possuir o mesmo peso.

“User said hello” e “Project autonomy must remain disabled until scientific validation completes” possuem relevância muito diferente.

## Memory Decay

Uma hipótese é reduzir gradualmente o peso de memórias antigas sem necessariamente apagá-las.

## Forgetting

Esquecer pode ser capacidade essencial.

Formas possíveis:

- Hard Delete;
- Archive;
- Decay;
- Supersede.

## Explicit User Control

Memória pessoal deveria permitir visualizar, corrigir, substituir, restringir, remover e impedir determinadas categorias de armazenamento.

## Memory vs Knowledge

```text
Memory
≠
Knowledge Base
```

Memory trata quem/o que mudou ao longo do tempo. Knowledge trata referência recuperável.

## Memory vs State

Estado operacional também não deveria ser confundido com memória.

`Current workflow status = PROCESSING` é estado, não memória.

## Proposed Architecture

```text
                    Agent
                      │
                      ↓
              Context Builder
                      │
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
      Memory       Knowledge      Runtime
        │
        ↓
 Memory Retrieval
        │
        ↓
 Scope + Relevance
        │
        ↓
 Selected Memories
```

## Write Pipeline

```text
Interaction
    ↓
Candidate Extraction
    ↓
Sensitivity Check
    ↓
Classification
    ↓
Conflict Detection
    ↓
Consolidation
    ↓
Persistence
```

Nem toda interação gera memória.

## Read Pipeline

```text
Current Task
    ↓
Determine Scope
    ↓
Query Candidates
    ↓
Rank
    ↓
Filter
    ↓
Inject Selected Context
```

O objetivo não é recuperar muito, mas recuperar corretamente.

## Experiment 1 — Scope-Aware Retrieval

**Hypothesis:** filtrar por scope antes da busca semântica reduz informação irrelevante.

Comparar Vector Retrieval Only vs Scope + Vector Retrieval.

Medir precision, irrelevant memories, token consumption e answer quality.

## Experiment 2 — Temporal Supersession

Testar informações que mudam ao longo do tempo e comparar recuperação atual com consultas históricas.

## Experiment 3 — Consolidation

Comparar raw episodic memories com consolidated semantic memory medindo tokens, factual retention e retrieval precision.

## Experiment 4 — Memory Decay

Avaliar funções de decay para reduzir ruído sem perda significativa de informação importante.

## Experiment 5 — Retrieval Explanation

Investigar se o sistema deveria conseguir explicar por que determinada memória foi recuperada, por exemplo scope match + semantic similarity + recent confirmation.

## Evaluation

Métricas possíveis:

- Retrieval Precision;
- Recall;
- Context Efficiency;
- Contradiction Rate;
- Staleness Rate;
- Task Success.

## Privacy

Memória de longo prazo cria riscos de sensibilidade, retenção, scope, exclusão, consentimento e uso futuro.

Persistência não deveria acontecer apenas porque tecnicamente é possível.

## Security

Memory poisoning é risco. Possíveis controles: source trust, confirmation, confidence, provenance e write permissions.

## Open Questions

- Quanto deve ser automático?
- Memórias importantes deveriam exigir confirmação?
- Quando memórias devem se fundir?
- Quando expiram?
- Como representar contradições?
- Agentes podem criar suas próprias memórias? Com quais limites?

## Current Position

**memory should be curated context, not accumulated history.**

Uma arquitetura agentic madura provavelmente precisará tratar memória como produto próprio, com lifecycle, policies e avaliação independentes.

## Next Steps

1. Definir schema mínimo de memória.
2. Implementar scopes.
3. Registrar provenance.
4. Criar retrieval multidimensional.
5. Implementar conflict detection inicial.
6. Testar temporal supersession.
7. Criar benchmark de retrieval.
8. Experimentar consolidation.
9. Medir token efficiency.
10. Definir controles explícitos de usuário.

## Related Work

Projeto: LucyOS.
Princípios: Context Is a Resource, Memory Requires Curation, Human Control, Evidence Before Autonomy.
Writing: AI Agents Need Architecture, Not Just Prompts; Memory in Agentic Systems.
ADRs: Why MCP-first?; Why Human Control Belongs in the Architecture?

## Closing

O problema de memória em agentes não é descobrir como salvar mais informações.

É descobrir como manter continuidade sem transformar o passado em ruído.

A memória ideal provavelmente não será aquela que lembra tudo.

Será aquela que consegue responder:

**o que realmente importa agora?**
