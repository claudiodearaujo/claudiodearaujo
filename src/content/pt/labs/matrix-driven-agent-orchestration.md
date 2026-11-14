---
title: "MatrixOps — Orquestração multiagente orientada por matriz e evidências"
slug: matrix-driven-agent-orchestration
locale: pt
type: lab
summary: "Pesquisa aplicada sobre como combinar matriz de trabalho, agentes especializados, Git, execução controlada e evidências para coordenar projetos complexos."
status: Active Research
tags: [AI, Agents, Orchestration, Governance, Git]
category: Agentic Systems
publishedAt: 2026-11-14
related:
  - /pt/labs/evaluating-agentic-systems
  - /pt/writing/evidence-before-autonomy
  - /pt/engineering/decisions/human-control-in-architecture
---

# MatrixOps — Orquestração multiagente orientada por matriz e evidências

## Transformar agentes isolados em um sistema de execução governável

**Status:** Active Research  
**Área:** Agentic Systems / Software Engineering / Governance  
**Origem:** aprendizado aplicado em projetos próprios, incluindo a Livrya.

Ao trabalhar com vários agentes de IA, encontrei uma limitação que não é resolvida apenas com prompts melhores: cada agente consegue produzir resultados locais, mas o projeto precisa manter uma visão coerente de **prioridades, dependências, responsabilidades, evidências e critérios de conclusão**.

Quando isso vive somente no histórico da conversa, a operação fica vulnerável a perda de contexto, duplicação de trabalho, decisões contraditórias e declarações prematuras de sucesso.

Minha investigação parte de outra premissa:

> A orquestração deve ser uma capacidade arquitetural do projeto, não apenas uma sequência de mensagens para agentes.

Chamo provisoriamente essa linha de pesquisa de **MatrixOps**. Não se trata de um framework publicado ou de uma técnica já validada universalmente, mas de uma metodologia em formalização.

## Research Question

Como permitir que agentes especializados executem trabalho útil, individualmente ou em cadeia, sem perder a direção do produto e mantendo trilha verificável de decisões, permissões, bloqueios e resultados?

A resposta que estou explorando combina seis elementos:

1. **Matriz de execução:** tarefas relacionadas a objetivos e requisitos verificáveis.
2. **Papéis especializados:** responsáveis por diagnóstico, implementação, integração, revisão e aceite.
3. **Git como memória operacional:** histórico, issues, branches, pull requests e evidências endereçáveis.
4. **Executor com ferramentas:** interface autorizada com código, testes e sistemas externos.
5. **Governança explícita:** autoridade, exclusão mútua, isolamento e controle humano.
6. **Medição por resultado:** avanço dos requisitos, não apenas volume de tarefas processadas.

## Architecture

```text
Product Goal / PRD
       |
       v
Execution Matrix (Git / Issues)
  - requirements & acceptance
  - owners & dependencies
  - permissions & blockers
  - evidence & next action
       |
       v
Orchestrator / Scheduler
  - reconcile state
  - choose eligible work
  - acquire execution claim
  - enforce gates
       |
       v
Specialist Agent + Tools
  - inspect
  - implement
  - test
  - verify
       |
       v
Evidence + Handoff
       |
       +------> Update matrix and select next task
```

A distinção mais importante está entre **orquestração**, **execução** e **registro de estado**.

Uma issue informa o que precisa acontecer e qual é seu estado conhecido. Ela não executa a tarefa sozinha. Um agendador dispara uma tentativa de execução, mas não garante exclusividade nem conclusão. E dar um nome diferente a cada agente não significa, necessariamente, que existam processos independentes: um único executor pode assumir papéis especializados em sequência.

Essa separação evita atribuir capacidades que o sistema ainda não demonstrou.

## A matriz como fonte de coordenação

Em vez de uma lista plana de tarefas, cada unidade deve estar ligada a uma entrega que faça diferença para o produto.

| Campo | Função |
|---|---|
| Objective / Requirement | Qual resultado do produto está sendo perseguido |
| Task ID | Identificador estável da unidade de execução |
| Owner / Executor | Quem responde pela entrega e quem atua |
| Dependencies | O que precisa estar liberado antes de começar |
| State | Situação operacional verificável |
| Permissions | Ações autorizadas e aprovações necessárias |
| Evidence | Testes, commits, diffs e validações |
| Next Action | Próximo elo da cadeia, com condição de entrada |

Estados como `PENDING`, `IN_PROGRESS`, `BLOCKED`, `READY_FOR_REVIEW` e `DONE` só são úteis quando possuem semântica clara.

Em particular, **DONE não significa que o agente afirmou ter concluído**. Significa que os critérios de aceite foram comprovados.

## Contrato de cada agente

Um agente recebe mais do que um objetivo em linguagem natural. O contrato mínimo contém missão, escopo, fonte confiável de contexto, limites de autoridade, ambiente de execução, evidências necessárias e destino do próximo handoff.

Essa estrutura ajuda a responder questões que normalmente ficam implícitas: quem pode editar determinado arquivo? Quem faz a revisão independente? O que acontece quando uma dependência está bloqueada? Quais operações exigem aprovação humana?

Ela também possibilita substituir um agente por outro sem reconstruir toda a operação a partir de conversas antigas.

## From Trigger to Verified Outcome

```text
Trigger
  -> Reconcile current state
  -> Claim execution safely
  -> Select eligible task
  -> Dispatch specialist role
  -> Execute within policy
  -> Validate and record evidence
  -> Update matrix
  -> Handoff to next eligible role
  -> Finish or stop at a real gate
```

A cadeia pode seguir automaticamente entre tarefas já autorizadas. Isso reduz o custo de pedir um novo comando humano a cada etapa.

Mas **autonomia de continuidade não equivale a autoridade irrestrita**. Uma decisão que exige aprovação continua exigindo aprovação, mesmo quando o orquestrador já conhece o próximo passo.

## Two Different Concurrency Problems

### Sobreposição de execuções

Um agendamento periódico pode iniciar outra execução enquanto a anterior ainda está trabalhando. A periodicidade, sozinha, não resolve o problema.

Nesse caso, é necessário um mecanismo explícito de exclusão: uma aquisição atômica de claim ou lock, associada à identidade da execução e acompanhada de uma estratégia de recuperação.

Locks cooperativos também têm limites: não impedem alterações feitas por executores que não os respeitam.

### Colisão de recursos

O segundo problema é diferente: agentes independentes podem editar o mesmo arquivo, usar a mesma configuração global ou disputar um recurso externo.

Não faz sentido serializar todo o projeto quando duas tarefas podem avançar isoladamente. Branches e worktrees permitem separar parte do trabalho, enquanto recursos compartilhados exigem regras próprias de ownership, revisão e integração.

**O objetivo não é eliminar paralelismo, mas reconhecer exatamente onde existe conflito real.**

## Evidence Before Completion

Para cada etapa, procuro distinguir:

- **Action performed:** uma ferramenta foi utilizada.
- **Result observed:** existe recibo, diff, teste ou estado verificável.
- **Result accepted:** a prova satisfaz o critério do requisito.
- **Product outcome:** a funcionalidade ou jornada desejada está efetivamente coberta.

Um painel pode registrar centenas de execuções e ainda representar pouco progresso de produto. Por isso, a observabilidade precisa relacionar tarefas com critérios de aceite, requisitos pendentes, bloqueios e risco residual.

Também há uma separação útil entre agentes que **executam** e monitores que apenas **observam**. Um painel de status não deveria alterar o sistema que está medindo.

## Failure and Recovery

Uma metodologia reproduzível precisa funcionar também quando as coisas dão errado.

O que acontece se o executor perder a conexão depois de escrever um arquivo, mas antes de registrar o recibo? E se o mesmo evento for processado duas vezes? E se o estado declarado na issue não corresponder ao repositório?

Os princípios que estou testando são reconciliação antes de retry, operações idempotentes onde possível, checkpoints verificáveis e encerramento explícito da execução.

Git oferece uma trilha útil para o código. Não oferece, sozinho, transações atômicas entre código, banco de dados e serviços externos.

## Research Plan

<escape>**E1 — Reproducibility.**</escape> Inicializar um projeto fictício sem depender do histórico de conversas do caso original.

<escape>**E2 — Concurrency.**</escape> Executar tarefas independentes e concorrentes sobre recursos compartilhados, medindo conflitos e bloqueios desnecessários.

<escape>**E3 — Recovery.**</escape> Interromper a execução entre efeito e confirmação e testar a retomada sem duplicidade.

<escape>**E4 — Authority.**</escape> Verificar se uma cadeia automática para corretamente diante de ações que exigem aprovação.

<escape>**E5 — Outcome measurement.**</escape> Comparar o número de tarefas concluídas com o percentual real de requisitos aceitos.

Esses experimentos são parte do plano de validação; não devem ser interpretados como resultados já demonstrados.

## Generalização

O método não depende de uma estrutura de comando específica, de um provedor de modelos ou do nome de determinada ferramenta. Os papéis podem ser descritos como **Owner, Orchestrator, Lead, Specialist e Reviewer**. A matriz pode ser implementada em GitHub Issues ou outro sistema com contratos equivalentes.

O que precisa permanecer são os invariantes: responsabilidade clara, estado durável, decisões rastreáveis, acesso limitado, isolamento de trabalho, evidência e critérios de parada.

O projeto mais interessante não é aquele no qual mais agentes estão ocupados. É aquele no qual conseguimos demonstrar **quanto do objetivo foi realmente entregue, com quais riscos e sob quais autorizações**.

## Current Status

**Pesquisa aplicada em evolução.** A metodologia está sendo consolidada em procedimentos e templates reutilizáveis. A validação controlada em projetos independentes ainda está pendente.

Este registro público descreve princípios e experimentos. Não expõe configurações privadas, credenciais, detalhes operacionais sensíveis nem afirma autonomia ou eficácia não demonstradas.
