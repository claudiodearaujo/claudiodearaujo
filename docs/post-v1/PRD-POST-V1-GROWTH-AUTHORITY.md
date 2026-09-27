# PRD — Post-v1 Growth & Authority

Status: **In Progress**
Owner: Cláudio Araújo  
Baseline: site pessoal v1 release cycle, September 2026

## 1. Purpose

Encerrar formalmente o ciclo de construção do MVP e iniciar uma fase pós-v1 orientada a distribuição, alcance internacional e autoridade técnica.

Este programa possui três entregas independentes, executadas em ordem:

1. **GA-01 — v1.0 Release & Closure** — ✅ Completed
2. **GA-02 — Search Indexation & Discoverability** — 🚧 In Progress
3. **GA-03 — English Experience /en** — Planned

Cada entrega possui PRD próprio e Definition of Done verificável.

## 2. North Star

> Demonstrar melhor como Cláudio pensa, constrói e lidera sistemas complexos.

Growth não pode degradar essa narrativa nem transformar o site em uma coleção de mecanismos de aquisição.

## 3. Guardrails globais

- static-first e content-first permanecem princípios arquiteturais;
- nenhum backend permanente apenas para growth;
- nenhuma informação privada, corporativa ou não validada deve ser publicada;
- português continua sendo o conteúdo canônico enquanto não existir paridade em inglês;
- traduções devem preservar intenção e voz, não apenas literalidade;
- indexação deve apontar apenas para URLs públicas, canônicas e válidas;
- nenhuma métrica de mercado ou audiência pode ser inventada;
- release não pode mascarar dívida conhecida como concluída;
- analytics invasivo continua fora deste programa.

## 4. Sequência

```text
GA-01 v1.0 Release
        ↓
GA-02 Search Indexation
        ↓
GA-03 English /en
        ↓
Post-v1 continuous authority
```

GA-02 depende de uma baseline versionada. GA-03 depende da fundação de locale e de SEO estável.

## 5. Success criteria

Ao final, o site deve possuir uma versão v1 formalmente identificável, indexação submetida e verificável e uma experiência inglesa navegável com SEO multilíngue correto.

## 6. Child PRDs

- [GA-01 — v1.0 Release & Closure](./PRD-GA-01-V1-RELEASE.md)
- [GA-02 — Search Indexation & Discoverability](./PRD-GA-02-SEARCH-INDEXATION.md)
- [GA-03 — English Experience /en](./PRD-GA-03-ENGLISH-EXPERIENCE.md)

## 7. Explicitly deferred

Não fazem parte deste programa:

- analytics/observabilidade de audiência;
- newsletter;
- comentários;
- search interno;
- CMS;
- PWA;
- conteúdo contínuo futuro;
- novas superfícies de social proof.

Esses itens estão registrados em [Future Backlog](./FUTURE-BACKLOG.md).

## 8. Program Definition of Done

O programa termina quando GA-01, GA-02 e GA-03 estiverem concluídos individualmente, documentação e validações estiverem na `main`, produção estiver saudável e não houver dependência oculta tratada como concluída.

A conclusão de GA-03 não significa que todo conteúdo futuro precisará nascer simultaneamente em dois idiomas. A política editorial multilíngue deverá definir como lidar com conteúdo novo sem bloquear publicação.
