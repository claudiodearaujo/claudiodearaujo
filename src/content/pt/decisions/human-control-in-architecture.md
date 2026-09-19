---
title: Why Human Control Belongs in the Architecture?
slug: human-control-in-architecture
locale: pt
type: decision
summary: Participação humana deve ser um boundary explícito do sistema.
status: Accepted
tags: [Governance, Human-in-the-loop, Architecture]
---

# ADR 003 — Why Human Control Belongs in the Architecture

## Status

Accepted

## Context

Sistemas inteligentes podem consultar informação, editar conteúdo, executar código, utilizar ferramentas, tomar decisões, modificar sistemas e movimentar recursos.

Quanto maior a capacidade, maior o impacto potencial de um erro.

Adicionar um botão de aprovação no frontend não é suficiente para dizer que existe human-in-the-loop.

Controle humano precisa existir como parte dos contratos do sistema.

## Problem

Como garantir que sistemas inteligentes permaneçam controláveis mesmo à medida que ganham novas capacidades?

Evitar dois extremos: aprovação para tudo, que reduz automação, ou autonomia irrestrita para qualquer capability.

## Decision

Human control será concern arquitetural explícito.

Toda capacidade relevante deverá possuir nível de autoridade definido.

```text title="Authority Levels"
READ
 ↓
SUGGEST
 ↓
PREPARE
 ↓
EXECUTE_WITH_APPROVAL
 ↓
EXECUTE_WITHIN_POLICY
```

A existência de ferramenta não implica automaticamente permissão para utilizá-la em todos os níveis.

## Capability vs Authority

Capability responde: **O sistema consegue fazer isso?**

Authority responde: **O sistema está autorizado a fazer isso nesta situação?**

Esses conceitos devem permanecer separados.

## Example

Um agente pode possuir capability `send_email`, mas policy permitir apenas `prepare_email` até aprovação humana.

## Risk-Based Control

- Low Risk: consultar documentação — pode ser autônomo.
- Moderate Risk: editar arquivo local reversível — pode exigir policy.
- Higher Risk: enviar mensagem externa — pode exigir aprovação.
- Critical Risk: movimentar dinheiro ou realizar ação irreversível — controles muito mais fortes.

## Approval Is Not the Only Form of Human Control

Human control pode incluir approval, rejection, edit before execution, kill switch, policy configuration, limits, audit review, rollback e manual takeover.

## Human Control Before Execution

```text title="Human Control Before Execution"
AI Decision
    ↓
Prepared Action
    ↓
Human Review
    ↓
Execute
```

## Human Control After Execution

Algumas operações podem ser autorizadas dentro de policies, mantendo audit trail e monitoring humano.

## Policy-Controlled Autonomy

Exemplo:

```text title="Policy-Controlled Autonomy"
Allowed:
read repository
create branch
run tests

Requires approval:
merge to main
deploy production
```

## Fail-Safe Defaults

```text title="Fail-Safe Defaults"
Unknown permission
      ↓
Do not execute
```

Nunca assumir autorização em estado desconhecido.

## Kill Switch

Kill switch deve existir na camada que possui autoridade real, não apenas na interface.

```text title="Kill Switch"
Kill Switch ON

New Actions → blocked
Pending Actions → policy-defined
Monitoring → active
Audit → active
```

## Auditability

Controle humano depende de visibilidade. É necessário explicar o que foi feito, quando, por quê, com qual contexto, ferramenta e resultado.

## Explainability

Mesmo sem expor raciocínio interno privado do modelo, o sistema pode explicar comportamento operacional:

```text title="Explainability"
Input
 ↓
Agent Decision
 ↓
Tool Selected
 ↓
Action Prepared
 ↓
Policy Evaluated
 ↓
Approval
 ↓
Execution
```

## Alternative 1 — UI Approval Only

Problema: regra pode ser contornada por outro cliente, API ou workflow.

Aprovação precisa ser validada na camada que possui autoridade real.

## Alternative 2 — Fully Autonomous by Default

Rejected por risco elevado, difícil governança e defaults perigosos.

## Alternative 3 — Human Approval for Everything

Baixo risco de ação não autorizada, porém baixa escalabilidade, pouca automação e fadiga de aprovação.

Human review deve ser proporcional ao risco.

## LucyOS Application

```text title="LucyOS Application"
Observe
 ↓
Suggest
 ↓
Prepare
 ↓
Execute with Approval
 ↓
Execute Within Policy
```

Lucy pode adquirir novas ferramentas sem receber automaticamente nova autoridade.

## Invest Lucy Application

Pesquisa, recommendation e shadow evaluation não implicam autorização para movimentar capital. Human Review permanece gate independente.

## Livrya Application

IA pode sugerir, revisar e gerar artefatos, mas publicação permanece ato editorial explícito.

## Progressive Autonomy

```text title="Progressive Autonomy"
No Autonomy
   ↓
Read Autonomy
   ↓
Recommendation Autonomy
   ↓
Preparation Autonomy
   ↓
Policy-Bounded Execution
```

## Responsibility

Human-in-the-loop não significa transferir responsabilidade para operador. A arquitetura continua responsável por limitar ações, oferecer contexto, preservar evidência, evitar defaults perigosos e manter auditabilidade.

## Approval Fatigue

Controle precisa considerar risco, frequência, reversibilidade e impacto. Operações de baixo risco podem ser policy-controlled; operações críticas permanecem supervisionadas.

## What Would Make This Decision Change?

A forma de controle pode variar conforme risco, reversibilidade, ambiente, maturidade e qualidade da evidência.

O princípio não exige aprovação humana permanente para tudo; exige que retirada de supervisão seja uma decisão explícita de arquitetura.

## Summary

Human-in-the-loop é uma forma de distribuir responsabilidade entre humanos e sistemas.

O objetivo não é impedir autonomia, mas garantir boundaries, autorização, evidência, observabilidade e mecanismo de intervenção.

**Human control should decrease only when evidence justifies increasing machine authority.**
