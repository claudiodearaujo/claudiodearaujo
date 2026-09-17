---
title: AI Agents Need Architecture, Not Just Prompts
slug: ai-agents-need-architecture
locale: pt
type: article
summary: Por que agentes confiáveis exigem muito mais do que bons prompts.
tags: [AI, Agents, Architecture]
---

# AI Agents Need Architecture, Not Just Prompts

## Por que agentes confiáveis exigem muito mais do que bons prompts

Nos primeiros experimentos com inteligência artificial, é natural concentrar quase toda a atenção no prompt.

Mas existe uma mudança importante quando deixamos de construir uma interface de conversa e começamos a construir um agente.

O agente não apenas responde. Ele pode consultar dados, utilizar ferramentas, recuperar memória, modificar arquivos, chamar APIs, executar workflows, delegar tarefas e produzir efeitos externos.

Nesse momento, o principal problema deixa de ser “Como escrever o prompt correto?” e passa a ser:

**Como projetar um sistema capaz de utilizar inteligência probabilística de forma confiável?**

É aí que arquitetura passa a importar mais do que prompt engineering.

## A diferença entre um chatbot e um agente

Um chatbot tradicional possui ciclo relativamente simples:

```text
Input
  ↓
Model
  ↓
Response
```

Um agente adiciona:

```text
Input
  ↓
Context
  ↓
Reasoning
  ↓
Tool Selection
  ↓
Action
  ↓
Observation
  ↓
Next Decision
```

A cada nova etapa surgem novos tipos de falha: ferramenta indisponível, contexto incompleto, informação antiga, execução duplicada ou autoridade inadequada.

Esses problemas não são resolvidos apenas melhorando o prompt.

## Prompts não representam autoridade

Imagine um agente com ferramenta `send_email`.

Podemos instruir no prompt: “Nunca envie um email sem aprovação do usuário.”

Isso ajuda, mas a regra ainda vive no mesmo componente que toma a decisão.

Se o envio for sensível, a arquitetura deveria representar a restrição:

```text
Agent
  ↓
Prepare Email
  ↓
Approval Gate
  ↓
Send
```

Agora existe diferença estrutural entre **capacidade** e **autoridade**.

## Ferramentas mudam o risco do sistema

```text
Read
↓
Suggest
↓
Prepare
↓
Write
↓
Execute
```

Cada etapa amplia impacto potencial.

Toda nova ferramenta deveria levantar perguntas sobre scope, autorização, reversibilidade, auditoria, idempotência, timeout e duplicação.

O prompt não deveria carregar sozinho todas essas responsabilidades.

## Memory também é arquitetura

Colocar todo histórico de conversa no contexto funciona durante algum tempo. Depois o contexto cresce, informações antigas entram em conflito, dados irrelevantes competem por atenção e conhecimento de um projeto aparece em outro.

Memória precisa deixar de ser “mensagens antigas” e passar a ser capacidade própria:

```text
Conversation Memory
Personal Memory
Project Memory
Knowledge
Operational State
```

## Contexto é um recurso limitado

Mais contexto também pode produzir mais ruído, custo, conflitos e maior superfície para informação desatualizada.

A pergunta correta passa a ser:

**Qual é o menor conjunto de contexto necessário para tomar uma boa decisão?**

Isso exige seleção, ranking, isolamento, freshness e relevância.

## Tools precisam de boundaries

Sem boundaries, um sistema cresce com integrações diretas:

```text
Agent
 ├── GitHub SDK
 ├── Database Driver
 ├── Filesystem
 ├── Calendar API
 ├── Browser API
 └── Internal APIs
```

Uma alternativa:

```text
Agent
  ↓
Capability Boundary
  ↓
External Systems
```

Protocolos como MCP são interessantes porque ajudam a criar essa separação.

## Falhas fazem parte do comportamento

Agentes utilizam muitos componentes probabilísticos e distribuídos.

Precisamos decidir:

```text
Retry?
Cancel?
Compensate?
Reconcile?
Escalate?
DLQ?
```

Nenhuma dessas decisões deveria depender exclusivamente de uma frase escondida em prompt.

## Observability é parte da inteligência operacional

Quanto mais um agente pode fazer, mais importante é compreender o que fez.

Um sistema deveria conseguir responder qual era o objetivo, qual contexto foi montado, qual ferramenta foi escolhida, quais argumentos foram enviados, qual resposta retornou, qual decisão aconteceu depois, se houve aprovação humana e qual foi o efeito final.

Isso registra comportamento operacional, não raciocínio privado do modelo.

## Evaluation também precisa de arquitetura

Um agente pode parecer bom em demos e não ser confiável.

Precisamos avaliar task success, tool selection, hallucination, latency, cost, recovery, safety e consistency.

Em workflows longos, avaliar o ciclo inteiro e não apenas resposta final.

## Agentes especializados

Um único agente pode acumular ferramentas, instruções, responsabilidades e contexto demais.

```text
Orchestrator
 ├── Research Agent
 ├── Engineering Agent
 ├── Documentation Agent
 └── Operations Agent
```

Especialização reduz superfície, mas cria novos problemas de delegação, coordenação, estado compartilhado, ownership e observabilidade.

Multi-agent também é problema de arquitetura.

## Human-in-the-loop

Sistemas agentic não precisam escolher entre manual e fully autonomous.

```text
Observe
↓
Recommend
↓
Prepare
↓
Execute with Approval
↓
Execute Within Policy
```

Isso permite ampliar capacidade progressivamente à medida que acumula evidência, confiabilidade, controles e observabilidade.

## AI is a system, not a prompt

Uma aplicação agentic real combina:

```text
Model
+
Context
+
Memory
+
Knowledge
+
Tools
+
Policies
+
Observability
+
Evaluation
+
Human Control
```

O prompt continua importante, mas é apenas uma parte.

## O papel do prompt continua importante

Prompts continuam úteis para role definition, constraints, output format, task framing, reasoning scaffolds e tool guidance.

Mas devemos evitar transformar prompt no lugar onde todas as regras vivem.

Se uma regra protege dados, dinheiro ou efeitos externos, provavelmente ela também precisa existir estruturalmente.

## Uma heurística simples

> Se o modelo ignorasse esta instrução, o sistema continuaria seguro?

Se a resposta for não, provavelmente aquela regra não deveria existir apenas no prompt.

## Closing

Prompt engineering continua relevante, mas à medida que sistemas de IA recebem memória, ferramentas e autoridade, os problemas mais importantes passam a envolver boundaries, state, authorization, failure handling, evaluation, observability e governance.

Em outras palavras, passam a parecer novamente com engenharia de software.

**AI agents need architecture, not just prompts.**
