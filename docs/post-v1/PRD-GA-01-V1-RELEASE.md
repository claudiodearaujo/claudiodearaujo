# PRD GA-01 — v1.0 Release & Closure

Status: **Completed**
Priority: **P0**  
Depends on: current production baseline

## 1. Problem

Na abertura desta trilha, o site estava tecnicamente e editorialmente pronto para v1, mas ainda era documentado como **v1.0 Launch Candidate** e o pacote declarava versão `0.0.0`.

Sem um fechamento formal, não existe um marco imutável que separe MVP, pós-v1 e evoluções futuras.

## 2. Objective

Criar um release reproduzível e auditável `v1.0.0`, atualizar a documentação para estado Released e preservar evidência de que o domínio final estava saudável no momento do release.

## 3. Scope

- reconciliar versão do projeto para `1.0.0`;
- atualizar documentação que ainda diga Launch Candidate;
- produzir release notes;
- validar `main` e produção;
- criar tag Git `v1.0.0`;
- publicar GitHub Release associado à tag;
- registrar commit, deploy e resultados dos gates;
- confirmar worktree limpa após fechamento.

## 4. Release gates

Antes da tag:

- `npm run validate:full` verde;
- CI remoto Validate verde;
- CI remoto E2E verde;
- GitGuardian verde;
- Render do commit candidato em estado live;
- `validate:launch:live` verde no domínio final;
- sitemap, robots, canonical, OG, CSP e 404 validados;
- nenhuma alteração não commitada;
- nenhuma credencial ou segredo no diff.

A tag só pode apontar para o commit efetivamente validado em produção.

## 5. Versioning

Adotar Semantic Versioning para marcos públicos do site.

- `1.0.0`: baseline pública inicial;
- patch: correção sem mudança editorial/arquitetural relevante;
- minor: nova capability ou conjunto editorial relevante compatível;
- major: mudança incompatível de arquitetura pública, URL strategy ou contrato de conteúdo.

Não criar versões apenas por cada novo artigo.

## 6. Release notes

As notas de v1.0.0 devem resumir produto, arquitetura, conteúdo, qualidade, SEO, acessibilidade e deployment sem transformar changelog em currículo.

## 7. Documentation updates

Atualizar pelo menos:

- `docs/README.md`;
- documentação de launch/readiness que trate o estado como candidato;
- package metadata/version;
- eventual referência pública de versão, apenas se trouxer valor ao visitante.

Não adicionar badge ou número de versão visual na Home apenas para provar que existe release.

## 8. Validation record

Criar um registro final contendo:

- SHA da `main`;
- tag;
- GitHub Release;
- Render deploy ID;
- timestamp;
- domínio validado;
- quantidade de rotas;
- resultados CI/E2E;
- warnings conhecidos aceitos.

Warnings preexistentes devem ser explicitamente registrados, não ocultados.

## 9. Out of scope

- redesign;
- novo conteúdo;
- inglês;
- Search Console;
- analytics;
- refatoração sem relação com release;
- correção oportunista de dívida que não bloqueie v1.

## 10. Rollback

Se produção falhar após tag/release, preservar a tag como registro histórico e publicar correção patch. Não mover silenciosamente uma tag pública para outro commit.

## 11. Acceptance criteria

- versão `1.0.0` consistente no projeto;
- documentação não chama mais a baseline atual de Launch Candidate;
- tag `v1.0.0` existe no commit validado;
- GitHub Release existe e referencia a tag;
- release notes descrevem a baseline;
- CI e live validation estão verdes;
- registro de validação identifica commit/deploy;
- `main` está limpa e sincronizada.

## 12. Definition of Done

GA-01 termina somente quando o release estiver verificável a partir do repositório e da produção. Criar a tag sem validar produção não conclui o PRD.

**Concluído em 26/09/2026.** Evidências: [GA-01 — v1.0 Release Validation Record](./GA-01-V1-RELEASE-VALIDATION.md).
