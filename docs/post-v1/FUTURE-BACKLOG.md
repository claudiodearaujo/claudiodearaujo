# Future Backlog — Site pessoal

Status: **Deferred / trigger-based**

Este arquivo registra evoluções deliberadamente fora de GA-01/02/03.

Estar neste backlog não significa compromisso de implementação. Cada item precisa justificar seu custo quando o gatilho existir.

## FUT-01 — Continuous Editorial Authority

### Intent

Transformar a publicação de conteúdo em processo contínuo depois da v1, sem reabrir indefinidamente o projeto de construção do site.

### Candidate work

- novos case studies quando projetos atingirem maturidade pública;
- ADRs derivados de decisões reais;
- Labs para pesquisa em andamento;
- Writing para teses técnicas;
- atualização periódica de Now;
- evolução de cases existentes quando a arquitetura/produto mudar;
- registro de hipóteses que falharam e mudanças de direção.

### Editorial rule

> Publicar quando existe algo que demonstra pensamento, construção ou liderança — não para cumprir calendário.

### Trigger

FUT-01 começa como operação editorial após GA-01.

Não exige sprint permanente de desenvolvimento.

### Possible cadence

Revisão mensal ou por evento relevante:

- release importante de projeto;
- conclusão de pesquisa;
- decisão arquitetural relevante;
- nova tese suficientemente madura;
- mudança material de direção profissional.

### Guardrails

- qualidade > frequência;
- não publicar conteúdo corporativo confidencial;
- não inflar portfólio com experimentos sem substância;
- não transformar cada commit em artigo;
- preservar rastreabilidade de claims.

## FUT-02 — Analytics & Editorial Observability

### Intent

Medir se o site está cumprindo sua função de autoridade profissional quando houver uma pergunta real que dados de audiência possam responder.

### Current decision

**Deferred.**

A baseline atual consegue validar build, SEO técnico, acessibilidade, performance e disponibilidade sem tracker de visitante.

Adicionar analytics apenas porque “sites têm analytics” viola o princípio **complexity must pay rent**.

### Re-evaluation triggers

Reavaliar quando pelo menos uma destas perguntas se tornar operacionalmente importante:

- quais cases geram interesse qualificado?
- quais artigos trazem descoberta orgânica?
- visitantes internacionais justificam priorização editorial?
- quais rotas levam a contato profissional?
- mudanças de conteúdo melhoraram descoberta?

### Preferred properties

Se implementado:

- privacy-first;
- coleta mínima;
- sem fingerprinting;
- sem advertising profile;
- sem dados pessoais desnecessários;
- consentimento quando juridicamente necessário;
- documentação explícita de finalidade e retenção.

### Metrics candidates

Somente depois de existir hipótese:

- page views por conteúdo;
- entradas orgânicas;
- referrer agregado;
- país/região em granularidade não identificável;
- idioma;
- outbound clicks relevantes;
- conversões para contato, se houver base legal e necessidade real.

Métrica sem decisão associada não justifica coleta.

## Other deferred capabilities

Continuam sujeitos aos gatilhos já definidos na arquitetura:

- search interno;
- newsletter;
- comentários;
- CMS;
- PWA/service worker;
- backend dedicado;
- social proof avançado;
- vídeos/podcasts/speaking;
- terceiro idioma.

Esses itens não devem entrar em GA-01/02/03 por conveniência.
