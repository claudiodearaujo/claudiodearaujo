# From Automation to Autonomy

## Automatizar uma tarefa e delegar uma decisão são problemas diferentes

Automação não é uma ideia nova. Software existe, em grande parte, para automatizar coisas.

Mas sistemas baseados em inteligência artificial introduzem algo diferente: eles não automatizam apenas instruções previamente especificadas. Começam a participar da escolha sobre **qual ação executar**.

Essa diferença muda completamente o problema.

## Automação tradicional

```text
Condition
   ↓
Rule
   ↓
Action
```

Exemplo: se invoice está overdue, enviar notification.

O comportamento foi definido antecipadamente.

## Sistemas inteligentes

Agora considere:

```text
Market data
   ↓
AI system
   ↓
Should we trade?
```

ou:

```text
Customer request
   ↓
Agent
   ↓
Which action should be executed?
```

A regra não está totalmente codificada antecipadamente. O sistema interpreta contexto e escolhe um caminho.

Não estamos mais apenas automatizando execução. Estamos delegando parte da decisão.

Essa é a fronteira entre automação e autonomia.

## Capability is not authority

Um sistema pode possuir capacidade para executar uma ação sem ter autoridade para fazê-la.

`create production deployment` não implica `deploy whenever the agent wants`.

`submit financial order` não implica `trade autonomously`.

Arquitetura precisa representar essa diferença.

## Um espectro de autonomia

```text
Manual
  ↓
Assist
  ↓
Recommend
  ↓
Prepare
  ↓
Execute with Approval
  ↓
Execute Within Policy
  ↓
Broader Autonomy
```

Cada estágio transfere quantidade diferente de responsabilidade.

A pergunta correta não é “o sistema é autônomo?”, mas:

**Autônomo para fazer o quê, sob quais condições?**

## Assist

IA ajuda a pessoa. Exemplo: resumir documento. O usuário continua responsável por decidir o que fazer.

## Recommend

O sistema sugere decisões. A decisão final continua humana.

## Prepare

O sistema prepara ação concreta, mas ainda não executa o efeito externo.

## Execute with Approval

A ação acontece depois de autorização explícita.

## Execute Within Policy

Algumas ações podem acontecer sem aprovação individual dentro de limites conhecidos.

```text
Allowed:
restart unhealthy worker

Requires approval:
change production configuration
```

## Broad Autonomy

O sistema recebe liberdade maior para escolher ações. Esse nível exige muito mais evidência e governança, especialmente em finanças, saúde, infraestrutura, segurança e operações críticas.

## Por que autonomia muda a arquitetura

Uma automação determinística precisa provar: “O código faz aquilo que especificamos?”

Um sistema autônomo precisa provar algo adicional: “Devemos confiar na escolha produzida pelo sistema?”

Isso exige evaluation, observability, audit, simulation, shadow mode, policy e human review.

## Evidência antes de autoridade

**authority should follow evidence.**

```text
Observe
  ↓
Shadow
  ↓
Evaluate
  ↓
Calibrate
  ↓
Human Review
  ↓
Limited Authority
```

Autonomia é conquistada, não presumida.

## Shadow Mode

```text
State
 ↓
Decision
 ↓
Shadow Record
 ↓
Future Outcome
```

O sistema toma a decisão que tomaria em produção, mas o efeito não é executado.

Isso permite estudar qualidade, consistência, confiança e comportamento sem exposição operacional equivalente.

## Human-in-the-loop

Não considero human-in-the-loop apenas solução temporária até a IA ficar boa o suficiente.

Algumas decisões possuem grande impacto, baixa reversibilidade, componente ético ou contexto difícil de formalizar. Nesses casos, supervisão humana pode ser parte correta do sistema.

## Autonomia e reversibilidade

Quanto menor a reversibilidade de uma ação, maior deve ser o cuidado com autonomia.

Compare `Create draft` com `Send payment`.

## Autonomia e frequência

Pedir aprovação para uma ação crítica semanal pode fazer sentido. Pedir aprovação para dez mil decisões de baixo risco por minuto não faz.

Isso leva naturalmente a policies.

## Policy-bounded autonomy

Autonomia madura provavelmente será menos parecida com “faça tudo sozinho” e mais com “você pode agir sozinho dentro destes limites”.

Exemplos: maximum amount, allowed hours, allowed operations, approved tools, risk threshold e required evidence.

## Observability grows with autonomy

```text
More Autonomy
      ↓
More Observability
      ↓
More Auditability
      ↓
More Governance
```

Autonomia sem visibilidade é apenas perda de controle.

## Safe defaults

Em estados desconhecidos, reduzir autoridade.

```text
Policy unavailable
→ do not execute
```

## Kill switch

Sistemas capazes de agir precisam ser capazes de parar. Kill switch deve impedir novas ações na camada que possui autoridade e preservar monitoring, logs, audit e diagnóstico.

## Autonomia como processo de promoção

```text
Research
  ↓
Evidence
  ↓
Gate
  ↓
Limited Runtime
  ↓
Observation
  ↓
Expanded Runtime
```

Nenhum estágio deveria avançar apenas porque o anterior “parece bom”.

## O caso financeiro

É fácil construir `Signal → Order`. É mais difícil responder se a estratégia possui robustez, se o risco está correto, se existe leakage, se o sistema sabe quando não operar e como reage a falhas de infraestrutura.

## O caso dos agentes pessoais

Assistentes podem começar lendo arquivos e preparando mensagens, depois receber email, calendário, GitHub, terminal e bancos de dados.

Cada nova capability deveria provocar nova discussão sobre authority.

## Uma matriz simples

Avaliar ações por **Impact × Reversibility** e, quando necessário, adicionar confidence, evidence, cost, frequency e privacy.

## O objetivo não é minimizar autonomia

O argumento não é que sistemas não deveriam ser autônomos, mas que autonomia deveria ser deliberada.

## Closing

Automação executa instruções. Autonomia delega parte da decisão.

Quanto mais autoridade transferimos para sistemas inteligentes, mais importantes se tornam evidência, policy, observabilidade, auditabilidade, intervenção humana e safe defaults.

**From automation to autonomy, capability is easy. Trust is the hard part.**
