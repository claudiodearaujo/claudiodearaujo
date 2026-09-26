# PRD GA-03 — English Experience /en

Status: **Planned**  
Priority: **P1**  
Depends on: **GA-01**, stable SEO baseline; GA-02 recommended

## 1. Problem

O site foi arquiteturalmente preparado para múltiplos locales, mas somente português está publicado.

A fundação atual já possui:

- `Locale = pt | en`;
- rotas derivadas de `publishedLocales`;
- conteúdo com locale no front matter;
- tópicos isolados por locale;
- `UI_STRINGS` tipado;
- locale navigation preparada;
- geração de canonical/locale;
- scaffolding de `hreflang` e `x-default`.

O trabalho restante é transformar essa fundação em uma experiência inglesa real, editorialmente equivalente e tecnicamente consistente.

## 2. Objective

Publicar `/en` como experiência completa para audiência internacional, preservando a voz profissional, arquitetura de informação, SEO, acessibilidade e relações editoriais do site em português.

## 3. Translation baseline

No início da execução, congelar um inventário do conteúdo publicado.

A baseline inglesa deve incluir:

- Home;
- About;
- Now;
- Contact;
- Work index;
- Engineering index;
- Writing index;
- Labs index;
- Decisions index;
- todos os conteúdos públicos existentes na data de corte;
- labels, breadcrumbs, navegação, footer e mensagens de UI;
- topics gerados para conteúdo inglês.

Conteúdo criado **depois** da data de corte segue a política editorial multilíngue e não pode expandir silenciosamente o escopo da entrega.

## 4. Translation quality

Tradução não deve ser literal quando isso piorar clareza.

Preservar:

- significado técnico;
- tom maduro e direto;
- primeira pessoa;
- distinção entre fato, hipótese e pesquisa;
- termos técnicos consagrados em inglês;
- claims e guardrails do conteúdo original.

Não “internacionalizar” inventando experiências, títulos, métricas ou resultados.

## 5. UI localization

Adicionar implementação `en` completa ao contrato `UiStrings`.

Eliminar copy portuguesa restante em componentes compartilhados que apareça sob `/en`.

Home e outras páginas com copy estrutural em TypeScript/template devem receber estratégia locale-aware sem duplicar componentes inteiros.

Guardrail:

> compartilhar estrutura; localizar conteúdo.

Não criar uma árvore Angular paralela para inglês.

## 6. Route parity

A estratégia preferencial para o lançamento é paridade de rotas entre a baseline PT e EN.

```text
/pt/work/lucyos
/en/work/lucyos

/pt/about
/en/about
```

Se algum conteúdo não puder ser traduzido, ele deve ser explicitamente excluído da baseline e o sistema de alternates deve apontar apenas para pares que realmente existam.

Nenhum `hreflang` pode apontar para 404.

## 7. Language switcher

Quando dois locales estiverem publicados:

- exibir seletor PT / EN;
- em uma página com equivalente, trocar para a rota equivalente;
- preservar contexto sempre que possível;
- se não houver equivalente, usar Home do locale alvo somente como fallback explícito;
- estado atual deve ser semanticamente identificável;
- navegação por teclado e leitor de tela deve funcionar.

O switcher não deve depender de geolocalização nem redirecionar automaticamente com base em IP.

A raiz `/` continua seguindo a política explícita de default locale até decisão contrária.

## 8. SEO multilingual

Validar:

- `<html lang>` correto;
- canonical próprio por locale;
- `og:locale` correto;
- alternates `hreflang` apenas para rotas existentes;
- `x-default` consistente;
- sitemap contendo PT e EN;
- structured data com `inLanguage`;
- OG cards em inglês para conteúdo inglês;
- RSS com política de idioma documentada.

## 9. Content relationships

`related`, breadcrumbs, topics e links internos precisam permanecer dentro do locale sempre que existir equivalente.

Links editoriais explícitos não podem mandar silenciosamente o leitor inglês para português sem indicação.

Criar validação build-time para relações inválidas entre locales quando aplicável.

## 10. Testing

Adicionar/atualizar testes para:

- `publishedLocales = ['en', 'pt']`;
- rotas `/en`;
- UI strings sem fallback involuntário para PT;
- language switcher;
- canonical;
- `hreflang` + `x-default`;
- sitemap multilíngue;
- topics EN;
- related content;
- accessibility;
- hydration;
- mobile overflow;
- 404 EN;
- live E2E em amostra representativa dos dois idiomas.

O gate deve falhar se uma URL alternate publicada não existir.

## 11. Editorial review

Antes do merge final:

- revisar títulos e summaries;
- revisar termos de arquitetura/IA;
- verificar falsos cognatos e tradução literal;
- conferir links;
- comparar claims PT × EN;
- verificar que nenhum conteúdo sensível entrou durante tradução.

A revisão pode usar IA como apoio, mas a versão pública precisa de revisão humana final.

## 12. Out of scope

- terceiro idioma;
- localização regional complexa;
- tradução automática em runtime;
- serviço externo de tradução;
- detecção por IP;
- CMS;
- duplicação de aplicação;
- alteração da narrativa profissional apenas para “parecer internacional”.

## 13. Performance and architecture guardrails

A inclusão de inglês não pode:

- introduzir backend;
- introduzir runtime translation;
- duplicar bundles de forma desnecessária;
- quebrar SSG;
- remover CSP;
- reduzir metas de acessibilidade;
- transformar locale em estado global complexo.

## 14. Acceptance criteria

- `/en` responde 200 e possui Home inglesa;
- baseline editorial traduzida;
- UI compartilhada localizada;
- language switcher funcional;
- nenhuma rota alternate quebrada;
- sitemap contém ambos os locales;
- canonical/hreflang/x-default corretos;
- structured data usa idioma correto;
- índices, topics e related funcionam em EN;
- CI completo verde;
- live E2E verde nos dois idiomas;
- revisão editorial humana registrada.

## 15. Definition of Done

GA-03 termina quando inglês puder ser usado como experiência independente, e não como demonstração parcial de i18n.

Um visitante que entre diretamente em `/en` deve conseguir compreender quem é Cláudio, navegar pelos principais projetos e conteúdos e permanecer no idioma escolhido sem cair involuntariamente em português.
