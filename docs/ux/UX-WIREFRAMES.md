# UX Wireframes — Site Pessoal Cláudio Araújo

**Status:** Accepted for Visual Design  
**Data:** 17/09/2026  
**Owner:** Cláudio Araújo  
**Escopo:** MVP responsivo

## 1. Objetivo

Transformar a arquitetura editorial e técnica já aprovadas em uma estrutura de experiência navegável, clara e responsiva antes da definição visual final.

Este documento define:

- hierarquia de informação;
- fluxo de navegação;
- templates de página;
- wireframes desktop e mobile;
- padrões reutilizáveis;
- comportamento responsivo;
- regras de leitura e profundidade;
- estados essenciais de interação;
- critérios de acessibilidade e usabilidade.

Este documento **não** define ainda:

- paleta de cores;
- tipografia final;
- iconografia final;
- ilustrações;
- tratamento visual de diagramas;
- motion design detalhado.

Esses itens pertencem à etapa de Visual Design.

---

## 2. Princípios de UX

### 2.1 Scan first, depth on demand

A experiência deve permitir três níveis de leitura:

```text
Scan
 ↓
Understand
 ↓
Deep Dive
```

A Home e as landings devem ser escaneáveis em segundos. Cases, artigos, ADRs e Labs oferecem profundidade sem sobrecarregar a primeira camada.

### 2.2 Content before decoration

Nenhum elemento visual deve competir com a mensagem principal.

### 2.3 Navigation should reveal structure

A navegação deve deixar evidente que o site possui quatro grandes áreas:

- trabalho;
- engenharia;
- pesquisa/experimentos;
- escrita.

### 2.4 Progressive disclosure

Detalhes aparecem conforme o visitante demonstra intenção de aprofundar.

### 2.5 Mobile is a first-class experience

Nada essencial dependerá de hover, largura desktop ou múltiplas colunas.

### 2.6 Accessibility by default

Hierarquia semântica, foco visível, navegação por teclado, contraste e reduced motion serão requisitos, não melhorias posteriores.

---

## 3. Navegação global

### Desktop

```text
┌─────────────────────────────────────────────────────────────────────┐
│ CA / Cláudio Araújo   Work  Engineering  Labs  Writing  About Now │ Contact │
└─────────────────────────────────────────────────────────────────────┘
```

Regras:

- header persistente, compacto;
- logo/nome retorna à Home;
- item ativo visualmente indicado;
- Contact funciona como CTA discreto;
- GitHub e LinkedIn ficam no footer e podem aparecer como ações secundárias;
- seletor de idioma entra apenas quando `en` estiver publicado.

### Mobile

```text
┌────────────────────────────┐
│ CA / Cláudio Araújo    ☰   │
└────────────────────────────┘
```

Menu expandido:

```text
Work
Engineering
Labs
Writing
About
Now
────────────
Contact
GitHub
LinkedIn
```

O menu deve:

- ocupar overlay ou sheet acessível;
- prender foco enquanto aberto;
- fechar por Escape;
- retornar foco ao botão ao fechar.

---

## 4. Sistema de layout

### Desktop

- container principal centralizado;
- largura de leitura longa limitada para conteúdo editorial;
- páginas de case podem utilizar faixa mais larga para diagramas;
- grid base de 12 colunas;
- sections com espaçamento vertical generoso;
- conteúdo principal nunca encostado às bordas.

### Tablet

- 8 colunas;
- cards podem alternar entre 2 colunas e 1 coluna;
- sidebars editoriais tornam-se blocos inline quando necessário.

### Mobile

- 4 colunas conceituais;
- uma única coluna de leitura;
- paddings consistentes;
- CTAs com alvos de toque confortáveis;
- tabelas extensas devem ser evitadas ou convertidas em cards/listas.

---

## 5. Home — `/`

A Home deve responder em ordem:

1. Quem é Cláudio?
2. O que ele faz hoje?
3. Como sua trajetória evoluiu?
4. Que trabalhos provam isso?
5. Como ele pensa engenharia?
6. O que está estudando agora?
7. Como aprofundar ou entrar em contato?

### Wireframe desktop

```text
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
├─────────────────────────────────────────────────────────────┤
│ HERO                                                        │
│ Cláudio Araújo                                              │
│ Software Engineer · AI Engineering · Technical Leadership   │
│ [supporting copy]                                           │
│ [Explore my work] [How I Engineer]                          │
│                                                             │
│                                  [visual/system motif]       │
├─────────────────────────────────────────────────────────────┤
│ ENGINEERING JOURNEY                                         │
│ Web → Enterprise → Architecture → AI → Agents → Autonomy   │
├─────────────────────────────────────────────────────────────┤
│ SELECTED WORK                                               │
│ [LucyOS]       [Invest Lucy]                                │
│ [Livrya]       [Enterprise AI]                              │
├─────────────────────────────────────────────────────────────┤
│ HOW I ENGINEER                                              │
│ [Principle] [Principle] [Principle]                         │
│ [Principle] [Principle] [Principle]                         │
├─────────────────────────────────────────────────────────────┤
│ FEATURED CASE — INVEST LUCY                                 │
│ [narrative]                  [evidence pipeline diagram]     │
├─────────────────────────────────────────────────────────────┤
│ FROM IDEA TO PRODUCTION                                     │
│ Problem → Product → Architecture → ... → Production        │
├─────────────────────────────────────────────────────────────┤
│ TECHNICAL LEADERSHIP                                       │
│ [copy]                         [capabilities/list]           │
├─────────────────────────────────────────────────────────────┤
│ CURRENTLY EXPLORING                                        │
│ tags / compact topics                                      │
├─────────────────────────────────────────────────────────────┤
│ WRITING                                                     │
│ [Article] [Article] [Article]                               │
├─────────────────────────────────────────────────────────────┤
│ BEYOND TECHNOLOGY                                           │
├─────────────────────────────────────────────────────────────┤
│ CLOSING CTA                                                 │
│ [Explore my work] [Contact]                                 │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### Mobile order

```text
Header
Hero
Primary CTA
Secondary CTA
Journey (vertical)
Selected Work (stack)
How I Engineer (stack)
Featured Case
Idea to Production (vertical)
Leadership
Currently Exploring
Writing
Beyond Technology
Closing CTA
Footer
```

### Home UX notes

- Hero não deve exigir scroll horizontal ou animação para revelar a proposta principal;
- Selected Work usa cards com descrição curta, não trechos longos dos cases;
- Engineering Journey vira timeline vertical no mobile;
- How I Engineer mostra 4–6 princípios prioritários e link para todos;
- Featured Case deve ser o bloco de maior profundidade da Home;
- artigos exibem tempo de leitura e categoria;
- Home não deve repetir parágrafos completos existentes em páginas internas.

---

## 6. Work — `/work`

Objetivo: apresentar projetos como prova de capacidade, não como galeria decorativa.

### Wireframe

```text
Header

Page Hero
Selected Work
[short framing copy]

Featured Projects
┌──────────────────────────┐ ┌──────────────────────────┐
│ LucyOS                   │ │ Invest Lucy              │
│ category / status        │ │ category / status        │
│ short summary            │ │ short summary            │
│ key themes               │ │ key themes               │
└──────────────────────────┘ └──────────────────────────┘

┌──────────────────────────┐
│ Livrya                   │
└──────────────────────────┘

Additional Work
[Argos]
[Enterprise AI]
[Financial Systems]

CTA / Related
Footer
```

Regras:

- os três cases completos recebem maior hierarquia;
- projetos sem case completo aparecem como cards menores;
- filtros não entram no MVP enquanto o volume for pequeno;
- cards exibem no máximo 3–5 temas técnicos para evitar badge wall;
- status de projeto deve ser factual: Active, Research, Completed, Archived.

---

## 7. Template de Case Study — `/work/:slug`

Usado por LucyOS, Invest Lucy e Livrya.

### Estrutura desktop

```text
Header

Breadcrumb
Work / Project

Case Hero
[Category] [Status]
Project name
One-line thesis
Summary
[Repository?] [Related links?]

At-a-glance strip
Role | Scope | Core themes | Status

Context / Problem

Architecture
┌─────────────────────────────────────────────────────────────┐
│ wide architecture diagram                                  │
└─────────────────────────────────────────────────────────────┘

Key Decisions
[Decision card]
[Decision card]
[Decision card]

Deep-dive sections
[content + code/diagram/callout]

Lessons Learned

Related Engineering Principles

Related ADRs

Related Writing / Labs

Previous / Next case
Footer
```

### Sticky table of contents

Desktop largo pode ter TOC lateral:

```text
Overview
Problem
Architecture
Decisions
Lessons
Related
```

Em tablet/mobile, TOC vira disclosure ou bloco horizontal rolável acessível.

### Regras

- hero deve explicar o projeto sem exigir conhecimento prévio;
- diagrams podem ocupar largura maior que o corpo de leitura;
- sections longas devem ter headings claros e anchors;
- Related Content fecha o case e cria navegação em grafo;
- não publicar métricas ou detalhes confidenciais sem revisão.

---

## 8. Engineering — `/engineering`

Landing que conecta Principles + Architecture Decisions.

```text
Header
Page Hero — How I Engineer
Intro

Core Principles
[6 featured principles]
[View all principles]

Architecture Decisions
[ADR 001]
[ADR 002]
[ADR 003]
[View all decisions]

Projects that shaped these principles
[LucyOS] [Invest Lucy] [Livrya]

Related Writing
Footer
```

Objetivo: funcionar como ponte entre portfólio e pensamento técnico.

---

## 9. Engineering Principles — `/engineering/principles`

### Wireframe

```text
Header
Hero
Intro

Principle Index / Jump links
01 Evidence Before Autonomy
02 AI Is a System, Not a Prompt
03 Human-in-the-loop Is Architecture
...

Principle sections
┌─────────────────────────────────────────────────────────────┐
│ Number + Principle                                          │
│ Short thesis                                                │
│ Why                                                        │
│ How I apply it                                              │
│ Example                                                     │
│ Related project                                             │
└─────────────────────────────────────────────────────────────┘

Closing
Footer
```

Não renderizar 38 princípios como cards idênticos. A página deve favorecer leitura editorial com índice e agrupamentos temáticos.

Agrupamentos possíveis:

- Autonomy & AI;
- Architecture & Boundaries;
- Reliability & Failure;
- Research & Evidence;
- Context & Memory;
- Leadership & Communication.

---

## 10. ADR index — `/engineering/decisions`

```text
Header
Hero — Architecture Decisions
Intro

ADR list
001  Why MCP-first?                      Accepted
002  Why Shadow Mode Before Autonomy?    Accepted
003  Why Human Control...?               Accepted

Related principles
Footer
```

Evitar cards grandes. ADRs funcionam melhor como lista editorial densa e escaneável.

---

## 11. ADR detail — `/engineering/decisions/:slug`

```text
Breadcrumb
Architecture Decisions / ADR 001

Title
Status · Date · Related project

Context
Problem
Decision
Alternatives
Consequences
What would change this decision?
Summary

Related
Footer
```

Status deve ser semanticamente visível, não depender apenas de cor.

---

## 12. Writing — `/writing`

```text
Header
Hero — Writing
Intro

Featured article
[large editorial card]

Latest
[article row]
[article row]
[article row]

Categories
AI Engineering · Agentic Systems · Architecture · Leadership

Footer
```

No MVP não haverá filtros complexos. Categorias podem ser links simples preparados para expansão futura.

---

## 13. Article detail — `/writing/:slug`

```text
Header
Breadcrumb

Article Header
Category
Title
Summary
Published / Updated · Reading time

Article body
- headings
- callouts
- code blocks
- diagrams
- quotes

Related projects / ADRs
Related articles
Footer
```

### Reading UX

- largura de texto controlada;
- progress bar é opcional e não entra no MVP;
- headings devem permitir deep links;
- código deve ter scroll horizontal isolado no mobile;
- notas laterais viram inline no mobile.

---

## 14. Labs — `/labs`

Labs precisam parecer pesquisa em andamento, não artigos comuns.

```text
Header
Hero — Labs
Intro

Active Research
[Long-Term Memory for Agents]
[Evaluating Agentic Systems]

Research Areas
Agents
Memory
Evaluation
MCP
Autonomous Systems

How Labs Work
Question → Hypothesis → Experiment → Observation → Next Step

Footer
```

Cada card precisa exibir status de forma explícita.

---

## 15. Lab detail — `/labs/:slug`

```text
Breadcrumb
Labs / Research area

Lab Header
Status
Title
Research Question
Related project

Hypothesis
Why This Matters
Proposed Architecture / Model
Experiments
Evaluation
Open Questions
Current Position
Next Steps
Related Work
Footer
```

Distinção visual futura entre:

- hipótese;
- observação;
- conclusão;
- questão em aberto.

Essa distinção deve existir semanticamente desde o HTML.

---

## 16. About — `/about`

A página deve contar trajetória sem parecer CV duplicado.

### Wireframe

```text
Header

Hero
Engineering, intelligence and curiosity
[portrait optional]

Narrative blocks
The Beginning
From Applications to Systems
Enterprise Engineering
Architecture
Artificial Intelligence
Agentic Systems
Technical Leadership

Career Journey
vertical/horizontal timeline

How I Think About Leadership
[principles]

Beyond the Code

Where I Am Now

Closing
Footer
```

A fotografia, se usada, deve humanizar; não dominar o hero.

---

## 17. Now — `/now`

Página deliberadamente curta e atual.

```text
Header
Hero — Now
Last updated

Building
[LucyOS]
[Invest Lucy]
[Livrya]

Researching
[topics]

Writing
[current pieces]

Learning
[current study]

Footer
```

Não deve se transformar em changelog detalhado.

---

## 18. Contact — `/contact`

MVP sem formulário.

```text
Header

Hero
Let's talk
short copy

Conversation Areas
Engineering
AI
Technical Leadership
Research & Collaboration

Professional Opportunities

Direct Links
LinkedIn
GitHub
Email

Closing note
Footer
```

A ausência de formulário reduz backend, spam, consentimento e superfície de segurança.

---

## 19. Footer global

```text
Cláudio Araújo
Software Engineering · AI Engineering · Technical Leadership

Work · Engineering · Labs · Writing · About · Now
GitHub · LinkedIn · Email

© year
```

Footer não precisa reproduzir toda a navegação mobile em formato complexo.

---

## 20. Componentes UX reutilizáveis

### Navigation
- App Header
- Mobile Navigation
- Breadcrumbs
- Footer

### Content discovery
- Project Card
- Article Card
- Lab Card
- ADR Row
- Related Content
- Tag / Topic

### Editorial
- Page Hero
- Section Header
- Prose Container
- Table of Contents
- Callout
- Quote
- Code Block
- Diagram Frame

### Evidence / status
- Project Status
- ADR Status
- Lab Status
- Metadata Row

### Action
- Primary CTA
- Secondary CTA
- Text Link
- External Link

---

## 21. Estados de interação

Todo elemento interativo precisa definir:

- default;
- hover;
- focus-visible;
- active;
- visited quando apropriado;
- disabled apenas onde fizer sentido.

Links externos devem ser distinguíveis semanticamente; não é obrigatório usar ícone em todos.

---

## 22. Motion

No MVP, motion serve apenas para orientação e feedback.

Permitido:

- transições discretas de hover/focus;
- entrada suave de menu;
- microinterações leves;
- transições de disclosure.

Evitar:

- parallax essencial;
- scroll hijacking;
- textos surgindo um por um;
- animações que atrasem leitura;
- motion necessário para compreender conteúdo.

Respeitar `prefers-reduced-motion`.

---

## 23. Responsividade

Breakpoints serão derivados do conteúdo, não de dispositivos específicos.

Comportamentos principais:

### Wide
- múltiplas colunas;
- TOC lateral quando útil;
- diagramas largos;
- project cards 2 colunas.

### Medium
- redução de gutters;
- 2 colunas seletivas;
- TOC deixa sidebar.

### Narrow
- uma coluna;
- timeline vertical;
- cards empilhados;
- CTAs empilhados quando necessário;
- menu mobile;
- diagramas com overflow controlado ou versão responsiva.

---

## 24. Acessibilidade de conteúdo

- apenas um `h1` por página;
- headings não pulam níveis sem motivo;
- landmarks `header`, `nav`, `main`, `footer`;
- links com texto descritivo;
- imagens informativas com alt text;
- imagens decorativas ignoradas por leitores de tela;
- diagramas complexos precisam de descrição textual equivalente;
- foco nunca oculto;
- menu mobile acessível por teclado;
- status nunca comunicado apenas por cor;
- contraste mínimo WCAG 2.2 AA.

---

## 25. SEO + UX

A experiência deve preservar uma hierarquia semântica que também favoreça indexação:

```text
Page title
 ↓
Clear H1
 ↓
Logical H2/H3
 ↓
Related internal links
 ↓
Breadcrumbs
```

Não usar componentes visualmente sofisticados que removam conteúdo importante do HTML prerenderizado.

---

## 26. Empty / future states

No MVP, evitar áreas vazias com “Coming Soon”.

Se uma categoria ainda não possui conteúdo suficiente, ela não deve aparecer na navegação principal.

Quando houver apenas três artigos, mostrar três artigos — não uma grade artificial com espaços vazios.

---

## 27. 404

Página 404 simples:

```text
Page not found
The page may have moved or never existed.

[Go home] [Explore work]
```

Manter header/footer para recuperação de navegação.

---

## 28. Loading states

Como o MVP será predominantemente prerenderizado, estados de loading devem ser raros.

Não utilizar skeletons para conteúdo estático já presente no HTML.

Loading só deve aparecer em funcionalidades futuras realmente assíncronas.

---

## 29. Error states

Conteúdo estático não deve renderizar erro de fetch em runtime.

Falhas de conteúdo devem ser detectadas no build.

Links externos naturalmente podem falhar, mas não precisam de tratamento de aplicação.

---

## 30. Content graph UX

Todo conteúdo de profundidade deve terminar com relações úteis.

Exemplo:

```text
Case Study
   ↓
Related Principles
   ↓
Related ADRs
   ↓
Related Writing / Labs
```

O objetivo é permitir exploração lateral, não apenas voltar para o índice.

---

## 31. URLs e breadcrumbs

Exemplos:

```text
/pt/work/lucyos
/pt/engineering/decisions/why-mcp-first
/pt/writing/ai-agents-need-architecture
/pt/labs/long-term-memory-for-agents
```

Breadcrumbs aparecem em páginas de profundidade, não necessariamente na Home ou landings simples.

---

## 32. Critérios de UX para o MVP

A etapa de UX é considerada concluída quando:

- todas as rotas do MVP possuem template definido;
- Home possui ordem narrativa fechada;
- experiência mobile está especificada;
- padrões de navegação estão definidos;
- relações entre conteúdos estão representadas;
- estados interativos essenciais estão definidos;
- requisitos de acessibilidade estão incorporados;
- nenhuma feature depende de backend sem necessidade;
- o documento fornece insumo suficiente para Visual Design e implementação.

---

## 33. Fluxos principais

### Recrutador / líder técnico

```text
Home
 ↓
Selected Work
 ↓
Case Study
 ↓
Engineering Principles
 ↓
About
 ↓
Contact / LinkedIn
```

### Visitante técnico vindo de busca

```text
Article / ADR
 ↓
Related Principle
 ↓
Related Project
 ↓
GitHub / Work
```

### Visitante interessado em IA

```text
Home
 ↓
LucyOS
 ↓
Lab
 ↓
ADR MCP
 ↓
Writing
```

### Visitante interessado em liderança

```text
Home
 ↓
Technical Leadership
 ↓
About
 ↓
Engineering Principles
 ↓
Contact
```

---

## 34. Prioridade visual futura

Embora a estética ainda não esteja definida, a hierarquia visual deve respeitar esta ordem:

1. mensagem;
2. projeto/evidência;
3. arquitetura/decisão;
4. navegação contextual;
5. decoração.

O design não deve inverter essa prioridade.

---

## 35. Decisões deliberadamente adiadas

Ficam para Visual Design:

- light/dark default;
- paleta;
- famílias tipográficas;
- identidade “CA”;
- estilo de cards;
- estilo de diagramas;
- fotografia;
- grid visual final;
- ornamentação;
- motion polish.

Ficam para implementação:

- breakpoints exatos;
- componentes Angular concretos;
- tokens CSS;
- primitives de layout;
- comportamento técnico do menu;
- geração do TOC;
- rendering dos diagramas.

---

## 36. Decisão final

A experiência será orientada por conteúdo e profundidade progressiva.

A Home funciona como mapa narrativo. Landings funcionam como descoberta. Cases, ADRs, artigos e Labs funcionam como deep dives.

Princípio central:

> **Make depth available without making complexity mandatory.**

---

## 37. Próxima etapa

Com os wireframes estruturais definidos, a próxima fase é **Visual Design / Design System Foundation**, cobrindo:

- direção estética;
- identidade visual;
- tipografia;
- paleta;
- tokens;
- grids;
- componentes;
- cards;
- diagramas;
- código;
- motion;
- dark/light strategy;
- protótipo visual da Home e dos principais templates.
