# Content Architecture + Sitemap — Site Pessoal Cláudio Araújo

**Versão:** 1.0  
**Status:** Base estrutural aprovada para evolução  
**Produto:** Site pessoal / Professional Authority Platform  
**Owner:** Cláudio Araújo  
**Data:** Setembro de 2026

## 1. Objetivo

Transformar o PRD do site pessoal em uma arquitetura concreta de conteúdo, definindo páginas, função de cada página, seções, ordem narrativa, conteúdos necessários, relações entre conteúdos, escopo do MVP e crescimento futuro.

O site deverá combinar:

**Professional Identity + Engineering Portfolio + Technical Knowledge Base + AI Engineering Lab + Authority Platform**

## 2. Objetivo narrativo

```text
Who is Cláudio?
        ↓
What does he build?
        ↓
How does he think?
        ↓
What has he built?
        ↓
How deep is his engineering experience?
        ↓
What is he exploring now?
        ↓
Why should I follow/contact/work with him?
```

## 3. Narrativa principal

```text
20+ years building software
            ↓
Enterprise engineering
            ↓
Software architecture
            ↓
Artificial intelligence
            ↓
Agentic systems
            ↓
Autonomous systems
            ↓
Technical leadership
```

## 4. Sitemap principal

```text
/
├── /about
├── /work
│   ├── /work/lucyos
│   ├── /work/invest-lucy
│   ├── /work/livrya
│   ├── /work/argos
│   ├── /work/enterprise-ai
│   └── /work/financial-systems
├── /labs
│   ├── /labs/agents
│   ├── /labs/mcp
│   ├── /labs/memory
│   ├── /labs/rag
│   └── /labs/autonomous-systems
├── /engineering
│   ├── /engineering/principles
│   └── /engineering/decisions
│       └── /engineering/decisions/:slug
├── /writing
│   └── /writing/:slug
├── /now
└── /contact
```

Evoluções possíveis: `/research`, `/speaking`, `/open-source`, `/resume`.

## 5. Navegação principal

Menu recomendado: Work, Engineering, Labs, Writing, About, Now. CTA separado: Contact. GitHub e LinkedIn como links externos.

## 6. Hierarquia

Nível 1: Home, Work, Engineering.  
Nível 2: About, Labs, Writing.  
Nível 3: Now, Contact.

## 7. Home

A homepage será síntese do site inteiro, não currículo nem lista completa de projetos.

### Hero

- Cláudio Araújo
- Software Engineer · AI Engineering · Technical Leadership
- Introdução sobre mais de duas décadas em software e foco atual em arquitetura, IA, agentes e liderança
- CTA principal: Explore my work
- CTA secundário: How I Engineer
- Links GitHub e LinkedIn

### Engineering Journey

**20+ Years Building Software**

```text
Web
 ↓
Enterprise
 ↓
Architecture
 ↓
AI
 ↓
Agents
 ↓
Autonomous Systems
```

### Selected Work

LucyOS, Invest Lucy, Livrya e Enterprise AI como destaques principais.

### How I Engineer

Cards: Evidence Before Autonomy, AI is a System Not a Prompt, Observability by Design, Human-in-the-loop, Replaceable Boundaries, Documentation is Engineering.

### Featured Case

Invest Lucy — **Engineering Autonomy Through Evidence**.

### From Idea to Production

```text
Problem
 ↓
Product
 ↓
Architecture
 ↓
Frontend
 ↓
Backend
 ↓
Data
 ↓
Infrastructure
 ↓
Observability
 ↓
Governance
 ↓
Production
```

### Technical Leadership

Mensagem: **Engineering is also direction**.

### Currently Exploring

Agentic AI, MCP, AI Memory, Autonomous Systems, AI Evaluation, AI Governance e Human-AI Collaboration.

### Writing

Mostrar três artigos mais recentes.

### Closing

CTA para Work e Contact.

## 8. About

A página deve contar uma trajetória, sem replicar LinkedIn.

Seções:

- Engineering, intelligence and curiosity;
- The Beginning;
- Enterprise Engineering;
- Architecture;
- Artificial Intelligence;
- Agentic Systems;
- Technical Leadership;
- Beyond the Code;
- Career Timeline.

Timeline resumida:

```text
Early Web
↓
Enterprise Software
↓
Financial Systems
↓
Architecture
↓
AI Engineering
↓
Agentic Systems
↓
Technical Leadership
```

## 9. Work

Página de portfólio principal com ordem inicial:

1. LucyOS
2. Invest Lucy
3. Livrya
4. Argos
5. Enterprise AI
6. Financial Systems

Categorias possíveis: AI Systems, Platforms, Enterprise, Research, Experiments.

Cada projeto terá: Name, Category, One-line description, Status, Year, Role, Problem, Architecture, Key decisions, Challenges, Results, Lessons, Technologies, Related writing, Repository e External links.

## 10. LucyOS

Hero: **LucyOS — Personal Agentic AI Platform**.

Seções: Problem, Vision, Architecture, Principles, Key Decisions, Current State, Lessons, Related Content.

Arquitetura conceitual:

```text
Interface
   ↓
Lucy
   ↓
Agent Runtime
   ↓
Memory
Knowledge
Tools
MCP
Specialists
```

## 11. Invest Lucy

Hero: **Invest Lucy — Evidence-driven Autonomous Investment Research**.

Core Principle: **Evidence Before Autonomy**.

Pipeline:

```text
Market Data
    ↓
Strategy
    ↓
Shadow Recommendation
    ↓
Outcome
    ↓
Calibration
    ↓
Experiment
    ↓
Walk-forward
    ↓
OOS
    ↓
Monte Carlo
```

Runtime Safety: autonomy disabled by default, human review, kill switch, immutable audit, reconciliation, DLQ e recovery.

## 12. Livrya

Hero: **Livrya — AI-Powered Publishing Platform**.

Product Flow:

```text
Create
 ↓
Write
 ↓
Collaborate
 ↓
AI Assist
 ↓
Narration
 ↓
Publish
 ↓
Read
```

Arquitetura com frontend, backend, database, AI services, async processing, publication model e audio pipeline.

## 13. Argos

Posicionamento: **AI Engineering Assistant**, com foco em knowledge, developer productivity, AI-assisted engineering e technical context.

## 14. Enterprise AI

Case sanitizado para experiência em RAG, semantic retrieval, embeddings, enterprise knowledge, .NET, Python e PostgreSQL.

## 15. Financial Systems

Case agregado com foco em credit, integrations, APIs, security, enterprise workflows e critical systems.

## 16. Engineering

Landing page **How I Engineer**, apresentando princípios, ADRs, artigos relacionados e projetos que demonstram cada princípio.

### Principles

1. Evidence Before Autonomy
2. Human-in-the-loop
3. Observability by Design
4. Replaceable Boundaries
5. AI is a System, Not a Prompt
6. Incremental Evolution
7. Documentation is Engineering
8. Simplicity Before Infrastructure
9. Failure is Part of the Architecture
10. Decisions Need Context

Cada princípio: Principle, Why, How I apply it, Example, Related project.

### Architecture Decisions

Índice de ADRs públicos com formato Context, Problem, Decision, Alternatives, Consequences, What changed later e Related Projects.

Backlog inicial:

1. Why MCP-first?
2. Why Local-first for Personal AI?
3. Why Shadow Mode Before Autonomy?
4. Why Append-only Financial Audit?
5. Why Agent Memory Must Be Explicit?
6. Why Human Review Belongs in the Architecture?
7. Why External Tools Need Replaceable Boundaries?
8. Why Published Content Should Be Immutable?
9. Why Async Pipelines Need Cooperative Cancellation?
10. Why Health Checks Must Reflect Runtime Context?

## 17. Labs

Landing page para experimentos, pesquisas e protótipos.

Categorias: Agents, MCP, Memory, RAG, Autonomous Systems e Interfaces.

Cada Lab: Title, Question, Hypothesis, Experiment, Architecture, Observations, Result, Next step, Status.

## 18. Writing

Categorias: AI Engineering, Agentic Systems, Architecture, Technical Leadership, Systems Thinking e Lessons Learned.

Template de artigo: Context, Main argument, Technical explanation, Examples, Trade-offs, Conclusion e Related Work.

Prioridade:

1. AI Agents Need Architecture, Not Just Prompts
2. From Automation to Autonomy
3. Evidence Before Autonomy
4. MCP as an Architectural Boundary
5. Memory in Agentic Systems
6. Human-in-the-loop for Critical Systems
7. AI is a System, Not a Prompt
8. Observability for Autonomous Systems
9. Bringing Enterprise Engineering to AI
10. What 20+ Years of Software Engineering Taught Me About AI

## 19. Now

Página curta e viva com Building, Researching, Writing e Learning.

## 20. Contact

Página simples com Engineering, Architecture, AI, Collaboration, Technical Leadership e Open Source como motivos de contato. Links para email, LinkedIn e GitHub.

## 21. Relações entre conteúdos

O site deverá funcionar como grafo.

Exemplo Invest Lucy:

```text
Invest Lucy
 ├─ Evidence Before Autonomy
 ├─ Shadow Mode ADR
 ├─ Observability Article
 ├─ Autonomous Systems Lab
 └─ Human-in-the-loop Principle
```

Exemplo LucyOS:

```text
LucyOS
 ├─ MCP ADR
 ├─ Agent Memory Article
 ├─ Agents Lab
 ├─ Memory Lab
 └─ Replaceable Boundaries Principle
```

## 22. Taxonomia

Tipos: Project, Case Study, Article, ADR, Lab e Principle.

Tags iniciais: AI, Agents, MCP, RAG, Memory, LLM, Architecture, .NET, Angular, Python, PostgreSQL, Observability, Autonomy, Governance, Research, Leadership.

## 23. Content Graph

```text
Project → Articles
Project → ADRs
Project → Labs
Article → Projects
Article → Principles
ADR → Project
ADR → Principle
Lab → Project
Lab → Article
```

## 24. Conteúdo necessário para MVP

- Home completa;
- About completa;
- Work com seis resumos;
- Cases completos LucyOS, Invest Lucy e Livrya;
- Engineering Principles;
- pelo menos três ADRs;
- Labs index + dois Labs;
- Writing index + três artigos;
- Now;
- Contact.

Mínimo aproximado: 18 peças de conteúdo.

## 25. Estratégia de atualização

```text
Build something
       ↓
Identify a lesson
       ↓
Document decision
       ↓
Write article
       ↓
Update case study
       ↓
Publish insight
```

Meta sustentável: 1–2 artigos por mês, ADR quando decisão relevante surgir, Lab quando experimento produzir aprendizado e Now atualizado mensalmente ou em mudanças importantes.

## 26. Tom editorial

Maturidade, profundidade, clareza, curiosidade, confiança e pragmatismo. Evitar arrogância, hype, marketing exagerado e jargão vazio.

## 27. Voz

Preferência por primeira pessoa em textos autorais. Em estudos corporativos sanitizados, usar voz impessoal quando necessário proteger contexto.

## 28. Idioma

Estrutura preparada para `pt-BR` e `en-US`, mesmo que a primeira versão seja apenas PT-BR.

## 29. SEO e descoberta

Cada categoria atende intenção diferente: About para nome/perfil; Work para portfólio; Engineering para pensamento técnico; Writing para busca orgânica; Labs para pesquisa. Preparar artigos para buscas relacionadas a agent architecture, MCP architecture, AI agent memory, human in the loop, autonomous system evaluation, RAG architecture e AI observability.

## 30. Open Graph

Cada projeto, artigo, ADR e Lab deverá possuir card próprio com título, categoria, descrição curta e autoria.

## 31. Mobile

Ordem principal: Hero → Journey → Selected Work → How I Engineer → Featured Case → Leadership → Current Exploration → Writing → CTA. Nada essencial pode depender de hover.

## 32. Confidencialidade

Antes da publicação, qualquer case corporativo deverá revisar nomes internos, URLs, endpoints, bancos, IDs, topologia, infraestrutura, regras confidenciais, screenshots e nomes de pessoas.

## 33. Indicadores de profundidade

Evitar badges genéricos como Expert/Advanced/10/10. Mostrar autoridade por arquitetura, projetos, decisões, estudos e artigos.

## 34. Integrações profissionais

GitHub destaca projetos, documentação, status e arquitetura. LinkedIn permanece fonte de histórico profissional formal e networking.

## 35. Páginas futuras

- `/research` quando houver massa crítica de experimentos científicos;
- `/open-source` quando aumentarem projetos públicos;
- `/speaking` quando houver talks, apresentações, workshops ou podcasts;
- `/resume` para versão web do currículo.

## 36. Critérios editoriais

Um projeto merece Case Study se demonstrar pelo menos dois de: arquitetura relevante, problema complexo, decisão interessante, resultado mensurável, aprendizado significativo, inovação técnica ou liderança.

Lab: existe pergunta ou hipótese sendo investigada.  
ADR: houve decisão técnica relevante entre alternativas razoáveis.  
Article: existe ideia ou conhecimento útil independentemente do projeto de origem.

## 37. Fluxos de descoberta

Recrutador:

```text
Home → Invest Lucy → Engineering Principles → About → LinkedIn
```

Técnico:

```text
Article → ADR → Project → GitHub
```

Busca/IA:

```text
Search → Article → Engineering → LucyOS → Labs
```

Liderança:

```text
Home → Technical Leadership → Case Studies → Engineering Principles → Contact
```

## 38. Conteúdos excluídos inicialmente

Testimonials, certifications wall, skill progress bars, timeline detalhada de empregos, lista de todas as linguagens, badges de ferramentas, feed automático do GitHub e feed automático do LinkedIn.

## 39. Ordem de produção

Homepage → About → LucyOS → Invest Lucy → Livrya → Engineering Principles → ADRs → artigos.

## 40. Por que conteúdo antes de design

```text
Meaning
 ↓
Content
 ↓
Structure
 ↓
Interaction
 ↓
Visual Design
```

O design deve expressar a narrativa, não tentar descobrir depois o que encaixar.

## 41. North Star editorial

Todo conteúdo deve responder pelo menos uma das três perguntas:

- How do I think?
- What do I build?
- How do I lead?

## 42. Mensagem central

> Cláudio Araújo combina mais de duas décadas de engenharia de software com arquitetura, inteligência artificial e sistemas agentic para construir produtos e plataformas complexas — e transformar essa complexidade em direção técnica clara.

## 43. Resultado esperado

O site deverá funcionar simultaneamente como Portfolio, Knowledge Base, Engineering Journal, Research Lab, Professional Identity e Authority Platform.

## 44. Próxima etapa

**Content Foundation — Homepage**: escrever o conteúdo final da homepage antes de avançar para About e Case Studies.
