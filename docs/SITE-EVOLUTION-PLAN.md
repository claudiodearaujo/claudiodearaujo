# Site Evolution Plan — v2

**Status:** Proposta para aprovação
**Data:** 19/09/2026
**Owner:** Cláudio Araújo
**Escopo:** evolução do site v1.0 Launch Candidate para uma plataforma editorial madura
**Baseline auditada:** `main` — Angular 22, SSG, 15 conteúdos, 21 rotas prerenderizadas

## 1. Objetivo

O site está live, válido e arquiteturalmente correto. A fundação de produto, UX, visual design e arquitetura técnica está documentada em 11.230 linhas dentro de `docs/`.

A implementação tem 2.008 linhas em `src/app/`.

Essa proporção é o problema central deste plano: **o site publicado entrega uma fração do que a própria documentação do projeto já decidiu**. Não há aqui um erro de arquitetura a corrigir — há um débito de implementação a liquidar, e alguns defeitos concretos que a suíte de testes atual não é capaz de enxergar.

Este documento:

- audita a distância entre o que está decidido em `docs/` e o que está em `src/`;
- registra defeitos reais encontrados na leitura do código;
- propõe nove trilhas de evolução com Definition of Done verificável;
- define uma sequência que prioriza retorno visível sobre reescrita.

Este documento **não** reabre decisões de TAD-001. SSG continua sendo a estratégia, `src/content` continua sendo a fonte de verdade, e nenhum backend é introduzido.

## 2. Método

A auditoria foi feita por leitura completa de `docs/` e do código-fonte, sem executar build. Cada afirmação de defeito abaixo aponta para arquivo e linha.

O que foi lido:

```text
docs/                           29 arquivos, 11.230 linhas
src/app/                        41 arquivos,  2.008 linhas
src/content/pt/                 15 arquivos,  4.851 linhas
src/styles/                      2 arquivos,    241 linhas
tools/                           5 arquivos
e2e/                             4 arquivos,    205 linhas
```

## 3. Diagnóstico

### 3.1 Defeitos visíveis em produção

Estes não são melhorias. São regressões silenciosas em relação ao que os documentos aprovaram.

#### D1 — Hierarquia tipográfica invertida em 20 das 21 rotas

`src/styles/_base.scss:33` agrupa `h1, h2, h3, h4` para `margin` e família, mas define `font-size` apenas para `h2` (linha 43, até `3.4rem`) e `h3` (linha 49). **`h1` nunca recebe tamanho.**

Só existem duas exceções locais: `.hero h1` (`home.page.scss:10`) e `.section-placeholder h1` (`_base.scss:136`, usado pelo 404).

Consequência: em `/pt/work`, `/pt/engineering`, `/pt/writing`, `/pt/labs` e em todos os 15 deep dives, o `h1` renderiza no default do browser (`2em`, 32px) enquanto os `h2` das seções seguintes chegam a 54px. **O título da página é menor que os subtítulos dela.**

Isso contradiz diretamente `VISUAL-DESIGN-SYSTEM.md` §12, que especifica H1 em 44–52px e H2 em 32–40px.

#### D2 — A tipografia do design system não está carregada

`_tokens.scss:3-5` declara:

```scss
--font-display: 'Manrope Variable', 'Manrope', system-ui, sans-serif;
--font-body: 'Inter Variable', 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace;
```

Não existe nenhum `@font-face`, nenhum `<link>` de fonte em `src/index.html`, e `public/` contém um único arquivo (`favicon.svg`).

Consequência: **o site inteiro renderiza em `system-ui`**. A assinatura visual aprovada — "precise typography" — não existe na página publicada. A CSP já permite `font-src 'self'`, então o self-host decidido em §11 do design system só precisa ser executado.

#### D3 — Table of contents desaparece no mobile

`content-detail.page.scss:97` aplica `display: none` ao TOC abaixo de 900px.

Os deep dives têm entre 136 e 628 linhas; LucyOS sozinho tem 28 seções `h2`. No mobile o leitor recebe um documento longo **sem nenhum mecanismo de navegação interna**.

`UX-WIREFRAMES.md` §7 e §13 e `VISUAL-DESIGN-SYSTEM.md` §32 especificam explicitamente um disclosure "On this page" no mobile — não a remoção do componente.

#### D4 — Nenhuma imagem social

`seo.service.ts` publica `twitter:card: summary` (linha 29) e **nenhum `og:image`**.

Todo link do site compartilhado no LinkedIn, WhatsApp ou Slack aparece sem imagem. Para um produto cujo objetivo declarado é autoridade profissional, é a falha de maior alcance da lista.

`PRD.md` §39 e `VISUAL-DESIGN-SYSTEM.md` §47 definem um sistema de OG cards por tipo de conteúdo. Nada disso foi implementado.

#### D5 — Bloco de tema claro incompleto

`_tokens.scss:42-53` redefine 8 tokens sob `@media (prefers-color-scheme: light)`, enquanto `html[data-theme='light']` redefine 13.

Ficam de fora: `--color-bg-alt`, `--color-surface-raised`, `--color-text-muted`, `--color-accent-strong`, `--color-accent-soft`.

Na prática o script de boot em `index.html` sempre grava `data-theme`, então o bloco só atua sem JavaScript — mas nesse caminho o usuário recebe um híbrido quebrado (fundo claro com `surface-raised` `#191f2b`). Ou o bloco é completado, ou é removido como código morto.

#### D6 — Tabelas perdem semântica de tabela

`_base.scss:178-182` aplica `display: block` a `.prose table` para conseguir scroll horizontal.

`display: block` remove o papel de tabela na árvore de acessibilidade de parte dos leitores de tela. O padrão correto é um container com `overflow-x` e `role="region"` + `tabindex="0"` + `aria-label`, mantendo `display: table` no elemento.

Hoje o conteúdo publicado não tem tabelas (0 ocorrências), então a correção é preventiva e barata.

### 3.2 Débito estrutural

#### D7 — A Home duplica o manifesto de conteúdo

`home.page.ts:23`, `:50` e `:90` declaram arrays literais de projetos, princípios e artigos — com títulos, resumos e rotas escritos à mão.

Os mesmos dados já existem, tipados e validados, em `content-manifest.generated.ts`.

Consequência: publicar um artigo novo exige editar TypeScript. O princípio "content-first" de TAD-001 §55 está quebrado na página mais importante do site, e nada impede que Home e manifesto divirjam silenciosamente.

#### D8 — O schema de conteúdo é muito mais pobre que o modelo aprovado

`build-content.mjs:20-32` valida 10 campos. `PRD.md` §50–52 e `TAD-001` §10 especificam modelos com `featured`, `category`, `readingTime`, `cover`, `related`, `role`, `year`, `technologies`, `alternatives`, `consequences`.

Consequências concretas:

- **nenhum conteúdo tem data.** Nenhum dos 3 artigos declara `publishedAt`. Os índices ordenam por `route.localeCompare()` (`build-content.mjs:87`), ou seja, **alfabeticamente**;
- não há tempo de leitura, embora `UX-WIREFRAMES.md` §12 e §13 o exijam nos cards e no header de artigo;
- "Related Content" é apenas interseção de tags livres (`content.repository.ts:14-25`). Não há relação editorial explícita;
- não existe `featured`, então nada pode ser promovido por conteúdo — só por código (ver D7).

#### D9 — Quatro páginas usam o template errado

`/pt/about`, `/pt/now`, `/pt/contact` e `/pt/engineering/principles` são `type: page` e caem no `ContentDetailPage` genérico.

Elas recebem breadcrumb "Voltar / page", um chip com a palavra `page` e uma fileira de tags — quando `UX-WIREFRAMES.md` §9, §16, §17 e §18 especificam templates próprios: About com timeline de carreira, Now com seções Building/Researching/Writing/Learning, Contact com áreas de conversa e links diretos, Principles com índice de jump links e agrupamento temático.

`engineering-principles.md` tem 468 linhas renderizadas como um artigo corrido. O wireframe §9 diz literalmente: *"Não renderizar 38 princípios como cards idênticos"* — mas também não como um texto único sem índice.

#### D10 — Rota de índice de ADRs não existe

`markdown.mjs:63` gera `/pt/engineering/decisions/:slug`, mas `/pt/engineering/decisions` não está em `app.routes.ts`.

O wireframe §10 especifica essa página como lista editorial densa. Hoje os ADRs só aparecem como cards genéricos na landing de Engineering, e o breadcrumb do detalhe volta para `/pt/engineering`.

#### D11 — Breadcrumb não é breadcrumb

`content-detail.page.html:3` renderiza `<a>Voltar</a> / <span>{{ entry.type }}</span>`.

O esperado (`UX-WIREFRAMES.md` §7, §31) é `Work / LucyOS`, com `BreadcrumbList` em JSON-LD conforme `PRD.md` §38 e `TAD-001` §21. Nenhum dos dois existe.

#### D12 — Três cards mortos em `/work`

`work.page.ts:20-34` publica Argos, Enterprise AI e Financial Systems como cards **sem link**.

`UX-WIREFRAMES.md` §26 é explícito: *"No MVP, evitar áreas vazias com 'Coming Soon'"*. Ou esses três viram cases curtos, ou saem da página.

#### D13 — 136 blocos de diagrama, zero tratamento visual

O conteúdo publicado tem **136 code fences** — em sua maioria diagramas ASCII (`invest-lucy.md` tem 50, `livrya.md` 34) — e **zero imagens**.

`VISUAL-DESIGN-SYSTEM.md` §26 define diagramas como "componentes de primeira classe da identidade" e `PRD.md` §58 os coloca como elemento central. O que existe hoje é `pre` com borda de 1px (`content-detail.page.scss:73`), sem label de linguagem, sem legenda, sem descrição textual equivalente, sem distinção entre "isto é código" e "isto é arquitetura".

Este é o maior gap de **apresentação** do site: um produto que fala sobre arquitetura apresenta arquitetura como texto monoespaçado.

#### D14 — O design system é 35 tokens e 41 valores soltos

`_tokens.scss` define 35 custom properties: cores, 3 famílias, 3 raios, 3 medidas de layout.

Não existem tokens de **espaçamento** (`VISUAL-DESIGN-SYSTEM.md` §14 define a escala 4→128), **escala tipográfica** (§12), **border**, **shadow**, **motion** (§41: durações 120/180/300ms e easings) ou **z-index**. Não há separação primitive → semantic (§43).

Em compensação, os componentes usam **41 valores `rem` distintos** escritos à mão (`0.72rem`, `0.85rem`, `1.4rem`, `2.9rem`, `clamp(4rem, 9vw, 7rem)`…). É exatamente o que §14 proíbe: *"Não utilizar espaços arbitrários quando um token existente atender"*.

#### D15 — Componentes do design system que não existem

Especificados em `UX-WIREFRAMES.md` §20 e `VISUAL-DESIGN-SYSTEM.md` §22–§30, ausentes no código:

```text
Callout (Note / Decision / Evidence / Warning / Principle)   §28
Code block com label de linguagem e botão copy              §27
Diagram Frame                                               §26
Pull quote                                                  §33
Status component (texto + forma, não só cor)                §30
Metadata row                                                §29
Project / Article / Lab cards diferenciados                 §22
ADR row (lista densa)                                       §10 UX
Tag / Topic navegável                                       §20 UX
```

Existe **um** `ContentCard` genérico para projeto, artigo, lab e ADR (`shared/content-card/`). As tags são `<span>` não clicáveis — afordância visual de filtro sem destino.

#### D16 — Estilos de prosa presos em `::ng-deep`

`content-detail.page.scss:60-90` usa `:host ::ng-deep` para estilizar o HTML injetado por `innerHTML`.

Esses estilos são globais por natureza (o HTML vem do pipeline, não do template). `::ng-deep` está depreciado e a regra correta é um partial global `_prose.scss`. A correção também remove a dependência de encapsulamento para conteúdo que nunca foi encapsulado.

### 3.3 Renderização e hydration

#### D17 — Hydration está na configuração mínima

`app.config.ts:10` chama `provideClientHydration()` sem features.

Event replay já vem ligado por padrão desde o Angular 19, então esse ponto está coberto. O que **não** está:

- `withIncrementalHydration()` não é usado;
- **existem 0 blocos `@defer` em todo o projeto**.

`TAD-001` §6 planejou exatamente isso:

> Uso de `@defer` será considerado para componentes abaixo da dobra, diagramas pesados, experiências interativas (...) Princípio: **Static first. Hydrate only what needs interaction.**

Hoje o oposto acontece: em um case study de 628 linhas, **100% da árvore hidrata** — incluindo prosa estática, TOC, related grid e footer — para servir exatamente três ilhas interativas: toggle de tema, menu mobile e os `routerLink`.

O custo é real: ~283 kB de JS inicial (bruto) e trabalho de hydration proporcional ao tamanho do documento, em páginas cujo conteúdo é imutável.

#### D18 — Mismatch de hydration no toggle de tema

`theme.service.ts:12` inicializa o signal em `'dark'` e só lê `data-theme` no browser (`:15-17`).

O prerender portanto emite sempre `☀` e `aria-label="Ativar tema claro"` (`site-header.html:26-29`). Um visitante com preferência clara recebe HTML que discorda do estado real até a hydration reconciliar — um mismatch de nó de texto no caminho mais visível do header.

A correção certa não é lógica: é renderizar um controle **estável e agnóstico de tema**, cuja aparência é trocada por CSS (`html[data-theme='light'] .theme-toggle`), com rótulo acessível fixo do tipo "Alternar tema".

#### D19 — Navegação SPA não move foco nem anuncia

Não há `RouterOutlet` handler, `aria-live` ou gestão de foco na troca de rota (`app.ts`, `app.html`).

Em navegação client-side o leitor de tela permanece no contexto anterior; o foco fica onde estava. Para um site cujo padrão de uso é exploração lateral (`UX-WIREFRAMES.md` §30), isso importa mais que a média.

#### D20 — `/` depende de redirect no cliente

`app.routes.ts:5` faz `redirectTo: 'pt'`. O prerender emite um `index.html` cuja única função é executar o router e redirecionar.

Crawlers e previews de link recebem um shell antes do redirect. O correto num static host é um redirect de borda declarado no `render.yaml`, mantendo o prerender de `/pt` como destino canônico.

### 3.4 SEO e alcance

| Item | Decidido em | Estado |
| --- | --- | --- |
| `og:image` por tipo de conteúdo | PRD §39, Visual §47 | ausente |
| `WebSite` JSON-LD | TAD §21 | ausente |
| `BreadcrumbList` JSON-LD | PRD §38, TAD §21 | ausente |
| `Article` com `datePublished` / `dateModified` | PRD §51 | ausente (não há datas) |
| `sitemap.xml` com `lastmod` | TAD §20 | sem `lastmod` |
| RSS / Atom | PRD §70 | ausente |
| `hreflang` / `x-default` | TAD §14 | ausente |
| Locale como parâmetro de rota | TAD §13 | `/pt` hardcoded em ~20 lugares |

O `en` não é um item de tradução — é um item de **arquitetura de rotas**. Hoje `markdown.mjs:63`, `app.routes.ts`, `site-header.ts:22-29`, `site-footer.html` e `home.page.ts` embutem `/pt` literalmente. Publicar inglês sem refatorar isso significaria duplicar tudo.

### 3.5 Gates de qualidade

O gate `validate:full` é sólido no que cobre. O que ele não cobre:

- **Lighthouse.** `PRD.md` §40 define metas (Performance ≥90, A11y ≥95, Best Practices ≥95, SEO ≥95) e **nada as mede**, nem local nem em CI;
- **axe roda em 4 rotas** (`accessibility.spec.ts:4-9`) de 21;
- não há regressão visual — num produto cuja tese é design system, a suíte não enxerga D1, D2 nem D3;
- não há link checker, `npm audit` no CI, nem automação de atualização de dependências.

É por isso que os seis defeitos da seção 3.1 passaram por um gate de 7 etapas: **nenhuma etapa olha para a página renderizada**.

## 4. Princípios da evolução

Os princípios do projeto continuam valendo. Estes quatro orientam especificamente este plano:

**P1 — Liquidar débito antes de adicionar escopo.**
Nenhuma feature nova entra antes que a fundação visual decidida em 2026-09-17 esteja implementada. O site não precisa de mais seções; precisa que as que existem pareçam o que foi projetado.

**P2 — O gate precisa enxergar o que o visitante enxerga.**
Todo defeito da seção 3.1 gera, junto com a correção, um teste que teria falhado antes dela.

**P3 — Complexity must pay rent.**
Incremental hydration, geração de OG images e pipeline de diagramas entram porque há problema medido. Search, CMS, backend e PWA continuam fora.

**P4 — Conteúdo é a fonte, código é o renderizador.**
Depois deste plano, publicar conteúdo não deve exigir editar TypeScript em nenhum caso.

## 5. Trilhas

### E1 — Fundação visual

**Problema:** D1, D2, D5, D14.

**Entregas:**

1. `_tokens.scss` reescrito em duas camadas: primitives (`--blue-500`, `--space-4`) e semantics (`--color-accent`, `--section-gap`), conforme Visual §43;
2. escala de espaçamento 4→128 (§14), escala tipográfica fluida com `clamp()` (§12), tokens de border, shadow, motion (§41) e z-index;
3. **`h1` recebe sua escala** (44–52px) — corrige D1;
4. fontes variáveis self-hosted em `public/fonts/`: Manrope (display), Inter (body), JetBrains Mono (mono), subset latin + latin-ext, `font-display: swap`, `<link rel="preload">` para os dois pesos críticos — corrige D2;
5. bloco `prefers-color-scheme` completado ou removido — corrige D5;
6. os 41 valores `rem` soltos migrados para tokens.

**Riscos:** as fontes entram no budget de transferência; `font-src 'self'` já está na CSP, mas o `preload` altera o HTML e os hashes de script não são afetados — confirmar com `npm run csp:update` mesmo assim.

**DoD:**

- nenhuma família resolve para `system-ui` na página publicada (asserção E2E via `getComputedStyle`);
- em todas as 21 rotas, `fontSize(h1) > fontSize(primeiro h2)` (teste E2E);
- grep de valores `rem` literais em `src/app/**/*.scss` retorna apenas exceções documentadas;
- baseline de regressão visual dos 4 templates canônicos criada.

### E2 — Camada editorial

**Problema:** D3, D6, D11, D15, D16.

**Entregas:**

1. `src/styles/_prose.scss` global; `::ng-deep` eliminado — corrige D16;
2. **TOC como componente próprio**: `<nav>` semântico, heading ativo via `IntersectionObserver`, e disclosure `On this page` no mobile em vez de `display: none` — corrige D3;
3. breadcrumb real (`Work / LucyOS`) com `BreadcrumbList` JSON-LD — corrige D11;
4. componentes do design system: `Callout`, `CodeBlock` (label de linguagem + copy), `DiagramFrame`, `PullQuote`, `StatusBadge` (texto + forma), `MetadataRow`;
5. cards especializados: `ProjectCard`, `ArticleCard` (data + tempo de leitura), `LabCard` (status + research question), `AdrRow` (lista densa);
6. tabelas em container com scroll acessível — corrige D6;
7. âncoras visíveis em headings (`#` no hover/focus, com `aria-label`).

**Dependência:** E1 (os componentes consomem os tokens novos).

**DoD:** axe limpo nas 21 rotas; TOC operável por teclado em 390px; contraste AA verificado nos dois temas para todo componente novo.

### E3 — Diagramas e imagem social

**Problema:** D4, D13.

Esta é a trilha de maior impacto na percepção do site.

**Entregas:**

1. **Sintaxe de diagrama no Markdown.** Um fence anotado (```` ```diagram title="Evidence pipeline"````) passa a gerar `<figure>` + `<figcaption>` + descrição textual equivalente, em vez de `<pre>` cru;
2. **Diagramas autorais em SVG inline**, com tokens de cor (funcionam nos dois temas), `<title>`/`<desc>` e fallback textual. Prioridade: pipeline de evidência do Invest Lucy, camadas do LucyOS, Idea → Production. Zero runtime no browser — nada de Mermaid client-side, conforme TAD §19;
3. **Syntax highlighting em build time** (Shiki, dois temas) para os fences que são realmente código. Nenhum highlighter vai para o bundle;
4. **Geração de OG images no build** — corrige D4. Template por tipo (Project / Article / ADR / Lab) seguindo Visual §47, renderizado com Satori + resvg no `postbuild`, gravado em `public/og/<type>/<slug>.png`, referenciado por `og:image` e `twitter:card: summary_large_image`.

**Riscos:** Satori/resvg adicionam dependências de build (não de runtime) e alguns segundos ao build. Aceitável — é exatamente o trade-off "rich build, simple runtime" de TAD §51. Requer as fontes de E1 já disponíveis como arquivo.

**DoD:** todo conteúdo publicado tem `og:image` absoluta e válida; validação por Card Validator do LinkedIn em 3 amostras; os 3 diagramas prioritários legíveis em 390px e nos dois temas; descrição textual presente para cada um.

### E4 — Modelo de conteúdo

**Problema:** D7, D8, D9, D10, D12.

**Entregas:**

1. **Schema estendido** em `build-content.mjs`: `featured`, `category`, `publishedAt` (obrigatório para `article`/`lab`/`decision`), `updatedAt`, `cover`, `related` (rotas explícitas, validadas contra o manifesto — link quebrado derruba o build), e campos por tipo (`role`/`year`/`stack` para projeto; `adrStatus` enum para decisão; `researchQuestion`/`hypothesis` para lab);
2. `readingTime` calculado no build a partir da contagem de palavras;
3. **ordenação por data** nos índices, substituindo `localeCompare` de rota;
4. **Home derivada do manifesto** — os três arrays literais de `home.page.ts` saem; o que aparece na Home passa a ser decidido por `featured` no front matter — corrige D7 e fecha P4;
5. rota `/pt/engineering/decisions` como lista editorial densa — corrige D10;
6. **templates dedicados** para About, Now, Contact e Principles, conforme wireframes §9, §16, §17, §18 — corrige D9. Principles ganha índice de jump links e agrupamento temático;
7. tags viram destino navegável (`/pt/topics/:tag`) ou perdem a afordância de clique — decisão a tomar; recomendação: destino navegável, já que resolve descoberta lateral sem introduzir search;
8. Argos, Enterprise AI e Financial Systems: publicar como cases curtos ou remover de `/work` — corrige D12. Recomendação: publicar curtos, o material sanitizado já existe em `docs/`.

**DoD:** publicar um artigo novo não toca nenhum `.ts`; front matter inválido derruba o build (teste no `vitest.tools`); `related` aponta apenas para rotas existentes.

### E5 — Rendering e hydration

**Problema:** D17, D18, D19, D20.

**Entregas:**

1. `withIncrementalHydration()` em `app.config.ts`;
2. **fronteiras de hydration explícitas** por página:

```text
Header (menu + tema)     @defer (hydrate on interaction)
Prosa do conteúdo        @defer (hydrate never)
TOC                      @defer (hydrate on viewport)
Related grid             @defer (hydrate on viewport)
Footer                   @defer (hydrate never)
Diagramas SVG            @defer (hydrate never)
```

   O corpo de um case study de 628 linhas deixa de hidratar;
3. **toggle de tema estável no SSR** — controle agnóstico de tema com aparência trocada por CSS e rótulo fixo — corrige D18;
4. **anúncio e foco na troca de rota**: mover foco para `#main-content` e publicar o título da nova página em um `aria-live="polite"` — corrige D19;
5. `/` como redirect de borda no `render.yaml`, removendo o `redirectTo` do cliente — corrige D20;
6. `PrerenderFallback.None` explícito em `app.routes.server.ts`;
7. reavaliar `inlineCritical` depois que as fontes existirem. O motivo documentado para desligá-lo (o handler `onload` do Beasties versus `script-src` sem `'unsafe-hashes'`) continua válido; com CSS crítico maior, vale medir se um pós-processamento que substitua esse handler por um script com hash compensa.

**Métrica de aceite:** custo de hydration em `/pt/work/invest-lucy` (a página mais pesada) medido antes e depois via Performance API; meta de redução ≥60% no tempo de hydration e JS inicial abaixo de 200 kB brutos.

**DoD:** benchmark antes/depois registrado neste documento; nenhum aviso de hydration mismatch no console em nenhuma das 21 rotas (asserção E2E).

### E6 — SEO e distribuição

**Problema:** seção 3.4.

**Entregas:**

1. `WebSite` e `BreadcrumbList` em JSON-LD; `Article` com `datePublished`, `dateModified`, `author`, `wordCount` (viabilizado por E4);
2. `sitemap.xml` com `lastmod` derivado de `updatedAt`;
3. **RSS/Atom** em `/rss.xml`, gerado no build a partir do manifesto;
4. `twitter:card: summary_large_image` (depende de E3);
5. scaffolding de `hreflang` e `x-default`, ativado quando `en` existir.

**DoD:** Rich Results Test sem erro em uma amostra por tipo; feed validado pelo W3C Feed Validator.

### E7 — Prontidão para `en`

**Problema:** `/pt` hardcoded.

**Entregas:**

1. locale como parâmetro de rota e chave do manifesto; `routeFor` passa a derivar de `meta.locale`;
2. um helper de link (`localizedPath()`) substitui as ~20 ocorrências literais de `/pt`;
3. chrome da UI extraído para um catálogo de strings;
4. seletor de idioma no header, visível apenas quando houver mais de um locale publicado (wireframe §3).

**Fora desta trilha:** traduzir os 4.851 linhas de conteúdo. A trilha entrega a **capacidade**; a tradução é decisão editorial separada. Recomendação para a primeira leva em `en`: Home, About e os 3 artigos.

**DoD:** grep por `'/pt` em `src/app` retorna zero ocorrências fora do helper e da configuração de locale padrão.

### E8 — Gates que enxergam a página

**Problema:** seção 3.5.

**Entregas:**

1. **Lighthouse CI** no workflow, com as metas do PRD §40 como budget que falha o build;
2. **axe nas 21 rotas** (geradas a partir de `public-routes.generated.json`, que já existe), não em 4;
3. **regressão visual** com screenshots Playwright dos 4 templates canônicos, nos dois temas, em 390px e 1440px;
4. link checker sobre o output do build (interno + externo com allowlist);
5. `npm audit --audit-level=high` no CI;
6. Dependabot ou Renovate para Angular e toolchain;
7. testes unitários do pipeline: schema inválido, rota duplicada, `related` quebrado, anchors duplicados.

**DoD:** os defeitos D1, D2, D3 e D4 são detectáveis por CI. Verificação: reverter cada correção isoladamente deve produzir uma falha vermelha.

### E9 — Profundidade editorial

`docs/` guarda 2.889 linhas de conteúdo editorial aprovado que não está publicado.

**Entregas sugeridas, sem bloqueio técnico:**

- cases curtos de Argos, Enterprise AI e Financial Systems (fecha D12);
- ADRs 004+ (`PRD.md` §22 lista oito candidatos);
- cadência de escrita — o `Content Strategy Loop` do PRD §49 só funciona com publicação contínua;
- fotografia profissional no About (Visual §39), opcional.

## 6. Sequência

```text
Fase 1 — Fundação visível        E1 + E8(3)
         corrige D1, D2, D5, D14 e cria a rede de regressão visual

Fase 2 — Camada editorial        E2
         corrige D3, D6, D11, D15, D16

Fase 3 — Identidade e alcance    E3
         corrige D4, D13  ← maior salto de percepção

Fase 4 — Modelo de conteúdo      E4
         corrige D7, D8, D9, D10, D12

Fase 5 — Rendering               E5
         corrige D17, D18, D19, D20

Fase 6 — Distribuição            E6 + E7

Contínuo — E8 (restante), E9
```

Racional da ordem:

- **E1 primeiro** porque D1 e D2 são os defeitos de maior visibilidade por unidade de esforço, e porque todas as trilhas seguintes consomem os tokens;
- **E3 antes de E4** porque o gap de apresentação (texto monoespaçado onde deveria haver arquitetura, previews sociais em branco) custa mais caro ao objetivo de autoridade do que o gap de modelo de dados;
- **E5 depois de E2/E3** porque as fronteiras de `@defer` só ficam estáveis quando os componentes finais existem — delimitar hydration antes seria refazer o trabalho;
- **E7 antes de qualquer tradução**, pela razão em 3.4.

Cada fase é uma branch, passa por `npm run validate:full` e por PR preview do Render antes do merge, conforme TAD §25 e §43.

## 7. Métricas

| Métrica | Hoje | Meta |
| --- | --- | --- |
| Lighthouse Performance | não medido | ≥ 90, medido em CI |
| Lighthouse Accessibility | não medido | ≥ 95, medido em CI |
| Lighthouse SEO | não medido | ≥ 95, medido em CI |
| JS inicial (bruto) | ~283 kB | < 200 kB |
| Tempo de hydration em `/pt/work/invest-lucy` | não medido | −60% vs. baseline |
| Rotas cobertas por axe | 4 / 21 | 21 / 21 |
| Conteúdos com `og:image` | 0 / 15 | 15 / 15 |
| Famílias tipográficas do DS ativas | 0 / 3 | 3 / 3 |
| Conteúdos com data de publicação | 0 / 15 | 15 / 15 |
| Publicar conteúdo exige editar `.ts` | sim | não |

## 8. Continua fora de escopo

Nada aqui muda as decisões de TAD-001 §45. Permanecem adiados, pelos mesmos motivos:

```text
runtime SSR          backend            banco de dados
autenticação         CMS                PWA / service worker
search service       newsletter         comentários
analytics invasivo   store global       microsserviços
```

Duas observações sobre critérios de reavaliação já definidos:

- **Search** (`PRD` §63, `TAD` §35): o gatilho é 20 artigos / 15 ADRs / 10 Labs. Estamos em 3 / 3 / 2. Longe. Quando chegar, a primeira alternativa continua sendo índice estático gerado no build;
- **Analytics** (`TAD` §23): continua não sendo necessário. As métricas da seção 7 são todas de build e de CI, não de visitante — nenhuma delas justifica um tracker.

## 9. Riscos

| Risco | Mitigação |
| --- | --- |
| Fontes + OG images estouram o budget de 350 kB | subset agressivo; OG images são arquivos estáticos, não entram no bundle; budget verificado em cada fase |
| CSP quebra ao mexer em `index.html` | `npm run csp:update` e cópia dos hashes para `render.yaml` a cada alteração de script inline, conforme TAD §32 |
| `@defer (hydrate never)` congela algo que deveria ser interativo | fronteiras definidas por componente, não por página; E2E de interação em cada ilha que permanece hidratada |
| Refatorar a Home quebra a narrativa aprovada | `launch.spec.ts` já cobre a narrativa completa da Home; o teste é o contrato |
| Escopo cresce durante E3 | limite explícito: 3 diagramas autorais nesta trilha; os demais fences seguem como `DiagramFrame` textual |

## 10. Definition of Done do plano

Este plano estará concluído quando:

- os 20 defeitos de D1 a D20 estiverem corrigidos ou explicitamente aceitos com justificativa registrada;
- `VISUAL-DESIGN-SYSTEM.md`, `UX-WIREFRAMES.md` e `TAD-001` não tiverem nenhuma seção "Accepted for Implementation" sem contrapartida no código;
- as metas da seção 7 estiverem medidas em CI, não estimadas;
- publicar conteúdo não exigir editar TypeScript;
- o site publicado puder ser comparado lado a lado com `docs/design/VISUAL-DESIGN-SYSTEM.md` §49 sem divergência visível.

## 11. Decisão final

A arquitetura escolhida em setembro de 2026 estava certa e continua certa. Este plano não a revisa.

O que ele corrige é uma assimetria: o projeto documentou um design system, especificou uma linguagem editorial e definiu uma estratégia de renderização — e publicou uma versão dessas decisões que ainda não as demonstra.

Para um site cuja tese é *"demonstrar em vez de afirmar"* (`PRD.md` §10), essa assimetria é o defeito mais caro de todos.

> **O site já diz como Cláudio pensa. Falta ele mostrar.**
