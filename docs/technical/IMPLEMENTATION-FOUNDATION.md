# Implementation Foundation v1

**Status:** Implemented and validated
**Data:** 17/09/2026
**Branch:** `feat/implementation-foundation`

## Objetivo

Transformar as decisões de produto, arquitetura, UX e visual design em uma base executável, pequena e verificável para a implementação incremental do site.

A fundação evita introduzir backend, CMS, autenticação ou infraestrutura de runtime sem requisito real.

## Baseline implementada

- Angular 22 standalone e strict;
- aplicação zoneless;
- prerender/SSG com `outputMode: static`;
- SCSS + CSS Custom Properties;
- dark/light theme sem dependência de biblioteca;
- shell com skip link, header, footer e navegação responsiva;
- rotas públicas sob `/pt`;
- Home inicial seguindo o wireframe e a direção visual;
- páginas estruturais para Work, Engineering, Labs, Writing, About, Now e Contact;
- fallback 404;
- lazy loading das páginas principais.

## Content pipeline

`docs/` permanece como histórico de produto e decisão.

`src/content/` é a fonte de publicação do site.

O pipeline atual:

```text
Markdown + front matter
        ↓
Zod validation
        ↓
Markdown parse validation
        ↓
Generated content manifest
        ↓
Angular build / prerender
```

Foram migrados 11 conteúdos reais: 3 cases, 3 artigos, 2 Labs e 3 ADRs.
## Quality gates

O projeto possui um gate local único:

```bash
npm run validate:full
```

Ele executa, nesta ordem:

1. content validation;
2. Prettier check;
3. ESLint;
4. TypeScript typecheck;
5. Vitest;
6. Angular production build;
7. Playwright E2E.

Uma tarefa não deve ser considerada 100% concluída quando alterações de código ou conteúdo público relevante não passaram por esse gate.

## Estado validado da fundação

- 11/11 conteúdos válidos;
- Prettier sem divergências;
- ESLint sem erros;
- TypeScript sem erros;
- 2/2 unit tests verdes;
- 3 smoke tests E2E previstos, cobrindo desktop, navegação e mobile;
- 9 rotas prerenderizadas;
- bundle inicial aproximado de 75 kB transferidos;
- `npm audit` sem vulnerabilidades no momento da criação da fundação.

## Boundaries preservados

Não foram adicionados ao MVP:

- backend dedicado;
- banco de dados;
- autenticação;
- CMS;
- state store global;
- PWA/service worker;
- runtime SSR;
- GitHub Actions obrigatório.

Esses itens somente devem entrar quando um requisito concreto justificar a complexidade.
## Próxima etapa

A fundação encerra decisões de infraestrutura básica. O próximo trabalho passa a ser implementação incremental das experiências do MVP:

1. renderer de conteúdo tipado;
2. Work landing;
3. Case Study template e rotas individuais;
4. Engineering landing e Principles;
5. ADR index/template;
6. Writing index/article template;
7. Labs index/Lab template;
8. About, Now e Contact completos;
9. SEO metadata/JSON-LD/sitemap;
10. acessibilidade e performance gates;
11. Cloudflare Pages preview;
12. launch readiness.

## Regra para agentes

Antes de encerrar uma tarefa de implementação:

```text
Change
  ↓
Content validation
  ↓
Format + Lint
  ↓
Typecheck
  ↓
Unit tests
  ↓
Production build
  ↓
Relevant E2E
  ↓
Task complete
```

A baseline deve permanecer simples: **build a rich website, not a complex runtime.**
