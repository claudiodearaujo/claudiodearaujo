# Visual Design / Design System Foundation

**Status:** Accepted for Implementation  
**Data:** 17/09/2026  
**Owner:** Cláudio Araújo  
**Escopo:** MVP responsivo

## 1. Objetivo

Definir a linguagem visual do site pessoal antes da implementação, garantindo coerência entre posicionamento, conteúdo, UX, acessibilidade e engenharia.

A identidade deve transmitir:

- engenharia;
- inteligência;
- precisão;
- maturidade;
- profundidade;
- curiosidade;
- confiança tranquila.

A estética não deve comunicar “hacker”, “cyberpunk”, “AI hype” ou portfólio genérico de desenvolvedor.

Princípio visual:

> **Calm intelligence. Precise engineering.**

---

## 2. Direção estética

A direção será **editorial-tech sofisticada**.

Referências conceituais, não cópias:

- publicações técnicas de alta qualidade;
- documentação de engenharia bem desenhada;
- interfaces de pesquisa;
- produtos B2B premium;
- visualização de sistemas e arquitetura.

Características:

- grande uso de espaço negativo;
- tipografia forte;
- hierarquia clara;
- superfícies discretas;
- linhas e boundaries como elemento gráfico;
- diagramas como parte da identidade;
- cor usada com intenção, não como decoração;
- motion mínimo e funcional.

---

## 3. O que evitar

Não utilizar como linguagem central:

- matrix rain;
- neon verde;
- robôs genéricos;
- cérebros digitais;
- circuitos decorativos;
- partículas aleatórias;
- glassmorphism excessivo;
- gradientes multicoloridos;
- sombras pesadas;
- cards para absolutamente tudo;
- skill bars;
- badges de proficiência;
- estética gamer;
- hero com terminal fake.

O site deve parecer de alguém que **projeta sistemas**, não de alguém tentando provar que programa.

---

## 4. Conceito de marca

A identidade parte de três ideias:

```text
Structure
+
Intelligence
+
Evolution
```

O motivo gráfico principal será **boundary / connection**.

Linhas, nós e blocos podem sugerir:

- arquitetura;
- relações;
- fluxo;
- sistemas;
- evolução.

Sem representar literalmente uma rede neural.

---

## 5. Marca “CA”

A assinatura curta será `CA`.

### Direção do monograma

- geométrico;
- simples;
- legível em 16–24 px;
- funciona monocromático;
- sem símbolo de código como `</>`;
- sem cérebro, chip ou raio;
- pode explorar duas formas conectadas por uma linha/boundary.

### Uso

- favicon;
- header compacto;
- Open Graph discreto;
- avatar técnico em contextos sem fotografia.

### Wordmark

Em contextos maiores:

**Cláudio Araújo**

A marca nunca deve substituir o nome completo na experiência principal.

---

## 6. Theme strategy

O sistema terá suporte a **dark e light** desde a fundação.

### Comportamento

1. primeira visita respeita `prefers-color-scheme`;
2. usuário pode alternar manualmente;
3. preferência manual é salva localmente;
4. não existe dependência de backend;
5. conteúdo e identidade funcionam plenamente nos dois temas.

A linguagem de marca é concebida **dark-first**, mas não dark-only.

Isso preserva a atmosfera técnica sem sacrificar legibilidade, preferência pessoal, impressão ou contexto profissional.

---

## 7. Paleta — Dark

### Canvas

```text
Background 0      #090B10
Background 1      #0E1118
Surface           #141923
Surface Raised    #191F2B
```

### Text

```text
Text Primary      #F3F6FA
Text Secondary    #AAB4C3
Text Muted        #748094
```

### Lines

```text
Border Subtle     #202836
Border Strong     #334055
```

### Brand accent

```text
Accent Primary    #6EA8FE
Accent Strong     #8BB9FF
Accent Soft       #1A2C47
```

### Semantic

```text
Success           #63C995
Warning           #E4B563
Danger            #E07A86
Info              #6EA8FE
```

---

## 8. Paleta — Light

### Canvas

```text
Background 0      #F7F9FC
Background 1      #FFFFFF
Surface           #FFFFFF
Surface Raised    #F1F4F8
```

### Text

```text
Text Primary      #111722
Text Secondary    #495568
Text Muted        #6E7A8D
```

### Lines

```text
Border Subtle     #E2E7EF
Border Strong     #C6D0DE
```

### Brand accent

```text
Accent Primary    #2766D0
Accent Strong     #174EAE
Accent Soft       #E7F0FF
```

### Semantic

Cores semânticas terão equivalentes ajustados para contraste AA.

---

## 9. Regras de cor

O azul é **acento**, não fundo dominante.

Usar accent para:

- links;
- foco;
- pequenos highlights;
- nós de diagramas;
- estados selecionados;
- CTA primário.

Evitar telas inteiras azuis ou glow constante.

A maior parte da interface deve ser composta por neutros.

---

## 10. Gradientes

Permitidos apenas de forma sutil.

Exemplo de uso:

- hero ambient light;
- separador de seção;
- detalhes de diagrama.

Nunca usar gradiente como preenchimento padrão de todos os botões ou cards.

---

## 11. Tipografia

### Display / Headings

**Manrope Variable**

Motivos:

- moderna sem parecer futurista demais;
- excelente em títulos grandes;
- geometria limpa;
- boa legibilidade;
- personalidade suficiente para diferenciar o site.

### Body / UI

**Inter Variable**

Motivos:

- ótima leitura em interfaces e textos longos;
- excelente suporte de caracteres;
- comportamento previsível em diferentes tamanhos.

### Code / Metadata

**JetBrains Mono Variable**

Uso apenas em:

- código;
- labels técnicos;
- metadata seletiva;
- diagram labels quando fizer sentido.

### Carregamento

- self-host quando possível;
- apenas pesos/axes necessários;
- `font-display: swap`;
- fallbacks robustos.

---

## 12. Escala tipográfica

Escala fluida com `clamp()`.

Referência desktop:

```text
Display XL    64–72px
Display L     48–56px
H1            44–52px
H2            32–40px
H3            24–28px
H4            20–22px
Body L        19–21px
Body          16–18px
Small         14–15px
Meta          12–13px
```

Mobile reduz escala sem destruir hierarquia.

Títulos grandes usam line-height compacto; corpo editorial usa line-height confortável.

---

## 13. Largura de leitura

Texto editorial principal:

```text
65–75ch
```

Introduções e leads:

```text
50–65ch
```

Diagramas e imagens podem ultrapassar a coluna de texto dentro do container de conteúdo.

---

## 14. Spacing system

Base de 4 px, com escala principal:

```text
4
8
12
16
24
32
48
64
96
128
```

Sections usam respiro amplo.

Não utilizar espaços arbitrários quando um token existente atender.

---

## 15. Grid

### Wide desktop

- max content canvas aproximado: 1280–1440 px;
- 12 colunas;
- gutters 24–32 px.

### Desktop editorial

- coluna de leitura central;
- áreas laterais reservadas para TOC, metadata ou breathing room.

### Tablet

- 8 colunas.

### Mobile

- 4 colunas conceituais;
- padding lateral 20–24 px.

Breakpoints finais serão definidos por comportamento do conteúdo.

---

## 16. Radius

A interface não será excessivamente arredondada.

```text
Radius XS    4px
Radius S     8px
Radius M     12px
Radius L     16px
```

Cards editoriais tendem a usar 12–16 px.

Botões podem usar 8–10 px, não pill por padrão.

---

## 17. Shadows

Sombras devem ser discretas.

No dark theme, preferência por:

- contraste de surface;
- border;
- ambient shadow leve.

No light theme, sombra baixa apenas para superfícies realmente elevadas.

A hierarquia não deve depender de sombra pesada.

---

## 18. Borders

Borders são parte importante da identidade.

Usar linhas para:

- separar áreas;
- representar boundaries;
- construir cards;
- formar diagramas;
- reforçar arquitetura visual.

Espessura predominante: 1 px.

Accent border apenas em foco ou conteúdo destacado.

---

## 19. Botões

### Primary

- accent solid;
- texto com contraste forte;
- usado apenas para ação principal da seção.

### Secondary

- transparente ou surface;
- border discreta.

### Tertiary / text

- link textual com tratamento claro.

Estados obrigatórios:

- hover;
- focus-visible;
- active;
- disabled.

Botões não usam efeitos 3D ou glow intenso.

---

## 20. Links

Links editoriais devem ser obviamente interativos sem depender só de cor.

Possíveis tratamentos:

- underline controlado;
- underline no hover/focus;
- seta contextual em CTAs.

Links externos podem usar pequeno indicador quando isso melhora clareza.

---

## 21. Focus

Focus ring consistente e forte.

```text
2px accent
+
offset visível
```

Nunca remover outline sem substituto equivalente.

---

## 22. Cards

Cards existem quando agrupam informação com boundary real.

Não transformar cada seção em card.

### Project Card

```text
Category / status
Project name
Short thesis
2–4 line summary
Key themes
CTA
```

### Article Card

Mais editorial, com menos chrome.

```text
Category
Title
Summary
Reading time
```

### Lab Card

Deve mostrar explicitamente:

- status;
- research question;
- related project.

### Principle Card

Somente na Home/landing. Na página completa, princípios viram seções editoriais.

---

## 23. Project cards — destaque

LucyOS, Invest Lucy e Livrya devem ter tratamento visual próprio, mas coerente.

Não usar logos improvisados diferentes para cada projeto no MVP.

Diferenciação pode vir por:

- diagrama miniatura;
- motivo geométrico;
- metadados;
- arquitetura representativa.

---

## 24. Hero

O Hero deve comunicar posicionamento antes de qualquer efeito visual.

### Estrutura

```text
Eyebrow opcional
Name
Positioning statement
Supporting copy
Primary CTA + Secondary CTA
Visual system motif
```

O motivo visual pode usar:

- nodes;
- boundaries;
- linhas;
- labels como Architecture / AI / Agents / Leadership.

Não usar avatar 3D, terminal fake ou ilustração genérica de IA.

---

## 25. Motivo visual de sistemas

A assinatura gráfica do site pode utilizar estruturas como:

```text
[Software]
     │
     ├──── [Architecture]
     │          │
     │          └──── [AI]
     │                    │
     └──────────────── [Agents]
```

Linhas devem ser finas, precisas e discretas.

Nós de destaque usam accent.

Esse sistema pode aparecer em:

- hero;
- Open Graph;
- divisores;
- case headers;
- backgrounds muito sutis.

---

## 26. Diagramas

Diagramas são componentes de primeira classe da identidade.

### Regras

- fundo simples;
- labels legíveis;
- cor semântica controlada;
- linhas consistentes;
- orientação clara;
- descrição textual equivalente;
- não depender de cor para significado.

### Estilo

Preferir diagramas customizados em HTML/SVG ou Mermaid estilizado no build, desde que o resultado preserve identidade e acessibilidade.

Evitar screenshots de diagramas quando houver alternativa vetorial/semântica.

---

## 27. Code blocks

Code block deve parecer ferramenta editorial, não terminal de hacker.

### Estrutura

```text
[language]                     [copy]
─────────────────────────────────────
code
```

Características:

- surface distinta;
- mono legível;
- padding confortável;
- scroll horizontal isolado;
- syntax highlighting de baixo ruído;
- botão copy acessível.

---

## 28. Callouts

Tipos:

- Note;
- Decision;
- Evidence;
- Warning;
- Principle.

Cada tipo possui ícone/label + cor semântica discreta.

Callouts não devem se transformar em blocos gigantes coloridos.

---

## 29. Metadata

Metadata técnica pode usar JetBrains Mono seletivamente.

Exemplos:

```text
ACTIVE
SEP 2026
8 MIN READ
ADR-001
```

Sempre em caixa legível; evitar uso excessivo de uppercase em frases longas.

---

## 30. Status

Status deve combinar texto + forma/símbolo e nunca depender apenas de cor.

Exemplos:

- Active;
- Research;
- Accepted;
- Completed;
- Archived.

Visual compacto, sem aparência de dashboard corporativo pesado.

---

## 31. Navigation

Header visualmente leve.

### Desktop

- background translúcido opcional somente se contraste for garantido;
- border inferior sutil ao scroll;
- active state discreto;
- altura compacta.

### Mobile

Menu full-height ou large sheet com tipografia grande e navegação simples.

Não usar nested hamburger menus complexos no MVP.

---

## 32. Table of Contents

TOC de deep dives deve ser discreto.

Desktop:

- sticky;
- active heading indicado por linha/accent;
- tipografia pequena.

Mobile:

- disclosure `On this page`;
- sem sidebar comprimida.

---

## 33. Editorial content

### H2

Deve criar pausas claras no artigo.

### H3

Subdivisão sem competir com H2.

### Paragraph

Espaçamento consistente; evitar blocos longos demais.

### Lists

Uso moderado; não transformar todo texto em bullet list.

### Pull quote

Pode destacar uma tese-chave, mas apenas uma ou duas por deep dive.

---

## 34. Homepage visual rhythm

Alternar seções de forma sutil, não “zebra” forte.

Possível ritmo:

```text
Hero                open canvas
Journey             constrained
Selected Work       surface/cards
Principles          editorial grid
Featured Case       wide/high emphasis
Idea to Production  diagram-led
Leadership          text-led
Exploring           compact
Writing             editorial
Closing             open canvas
```

Isso cria variedade sem parecer uma coleção de templates diferentes.

---

## 35. Case Study visual language

Case Study usa mais diagramas e metadata que artigo.

Hierarquia:

```text
Thesis
 ↓
Context
 ↓
Architecture
 ↓
Decisions
 ↓
Evidence / Lessons
 ↓
Related
```

Architecture diagram deve ser um momento visual forte.

---

## 36. Writing visual language

Writing é mais editorial e silencioso.

Menos cards, menos chrome, foco em:

- título;
- lead;
- leitura;
- diagramas quando necessários.

---

## 37. Labs visual language

Labs podem utilizar elementos que indiquem investigação:

- status;
- hypothesis label;
- experiment number;
- open questions;
- next steps.

Sem transformar a página em dashboard científico.

---

## 38. ADR visual language

ADR deve parecer documento de decisão.

Destaques:

- ADR id;
- status;
- context;
- decision;
- alternatives;
- consequences.

Layout deliberadamente racional e direto.

---

## 39. Photography

Fotografia é opcional no MVP.

Se usada:

- portrait natural/profissional;
- tratamento discreto;
- sem stock aesthetic;
- preferencialmente About;
- Hero pode funcionar sem fotografia.

A marca deve continuar reconhecível sem rosto.

---

## 40. Icons

Ícones lineares, simples, mesma família.

Uso:

- external link;
- GitHub;
- LinkedIn;
- email;
- theme;
- menu;
- callouts.

Não utilizar ícones decorativos em todos os headings.

---

## 41. Motion

Motion é funcional.

### Duração

```text
Fast       120–160ms
Standard   180–240ms
Slow       300–400ms
```

### Easing

Curvas suaves, sem bounce.

### Permitido

- hover;
- focus transition;
- nav sheet;
- disclosure;
- theme transition cuidadosamente limitada;
- pequenas animações de diagramas apenas se não forem essenciais.

### Evitar

- scroll hijacking;
- parallax intenso;
- cursor customizado;
- reveals em toda seção;
- animações contínuas de background.

`prefers-reduced-motion` remove movimento não essencial.

---

## 42. Theme transition

Não animar toda a página lentamente ao trocar tema.

A mudança deve parecer imediata ou usar transição curta em propriedades selecionadas.

Evitar flashes de tema incorreto durante hydration.

---

## 43. Tokens conceituais

Estrutura prevista:

```text
color.*
type.*
space.*
radius.*
border.*
shadow.*
motion.*
layout.*
z.*
```

Separar primitive tokens de semantic tokens.

Exemplo:

```text
--blue-500
        ↓
--color-accent
        ↓
--button-primary-bg
```

Isso facilita temas e evolução.

---

## 44. Semantic token examples

```text
--color-bg
--color-surface
--color-surface-raised
--color-text
--color-text-secondary
--color-text-muted
--color-border
--color-border-strong
--color-accent
--color-focus
--color-success
--color-warning
--color-danger
```

Evitar componentes referenciando cores primitivas diretamente quando existe semântica adequada.

---

## 45. Component token examples

Apenas quando necessário:

```text
--header-height
--content-max-width
--prose-max-width
--card-padding
--button-height
```

Não criar token para cada propriedade CSS.

---

## 46. Accessibility visual requirements

- WCAG 2.2 AA no mínimo;
- body text com contraste confortável, não apenas mínimo matemático;
- focus ring visível nos dois temas;
- links diferenciáveis;
- text muted ainda legível;
- status não depende de cor;
- hover nunca é único meio de revelar informação;
- targets de toque adequados;
- zoom de navegador preservado.

---

## 47. Open Graph visual system

Cards sociais devem usar a mesma identidade.

Estrutura:

```text
CA / Cláudio Araújo
Category
Title
Short supporting line
System motif
```

Variações por tipo:

- Project;
- Article;
- ADR;
- Lab.

Manter alto contraste e títulos legíveis em miniatura.

---

## 48. Favicon

Usar monograma CA simplificado.

Precisa funcionar em:

- 16×16;
- 32×32;
- pinned tab / app icon quando necessário.

Não incluir detalhes finos impossíveis de ler em tamanho reduzido.

---

## 49. Home — composição visual aprovada

### Hero

- copy à esquerda em desktop;
- system motif à direita;
- sem fotografia obrigatória;
- fundo com leve variação tonal, não imagem pesada.

### Journey

- timeline horizontal desktop;
- vertical mobile;
- nodes pequenos em accent.

### Selected Work

- 2 colunas desktop;
- cards com boundaries fortes e surface baixa;
- sem screenshots obrigatórias no primeiro release.

### Principles

- grid editorial de 2–3 colunas;
- números ou small labels ajudam ritmo.

### Featured Invest Lucy

- bloco visual mais marcante depois do Hero;
- pipeline como diagrama central.

### Leadership

- layout de texto forte, menos chrome.

### Writing

- tratamento editorial, não product-card pesado.

---

## 50. Templates visuais prioritários

Antes de implementar todas as páginas, validar visualmente quatro templates:

1. Home;
2. Case Study;
3. Article;
4. Lab/ADR.

Se esses quatro funcionarem, o restante deriva do sistema.

---

## 51. Definition of Done — Visual Design Foundation

A fundação visual está pronta para implementação quando:

- theme strategy definida;
- paleta dark/light definida;
- tipografia definida;
- escala e spacing definidos;
- grid definido;
- marca CA direcionada;
- tokens conceituais definidos;
- estados de botão/link/focus definidos;
- cards diferenciados por função;
- diagramas possuem linguagem própria;
- código possui tratamento editorial;
- motion possui limites claros;
- acessibilidade incorporada;
- Home, Case Study, Article e Lab/ADR possuem composição visual especificada.

---

## 52. Decisão final

O site terá uma estética técnica sofisticada, editorial e calma.

Ele deve parecer:

> uma publicação pessoal de engenharia e inteligência aplicada.

Não:

> um template de portfólio de desenvolvedor.

Assinatura visual:

**Deep neutral surfaces + precise typography + structural lines + controlled blue accent + architecture as visual language.**

---

## 53. Próxima etapa

Com Product, Content, Technical Architecture, UX e Visual Design definidos, a próxima etapa é **Implementation Foundation**:

1. inicializar Angular 22;
2. configurar strict mode;
3. configurar prerender/SSG;
4. criar design tokens;
5. criar application shell;
6. criar theme service sem FOUC;
7. criar content pipeline;
8. configurar Markdown/front matter;
9. criar route/content manifest;
10. implementar Home skeleton;
11. implementar primeiros componentes do design system;
12. adicionar Vitest e Playwright;
13. configurar lint/format/typecheck;
14. preparar Render Static Site;
15. migrar conteúdo aprovado de `docs/` para `src/content`.
