---
title: Engineering, intelligence and curiosity
slug: about
locale: pt
type: page
summary: Minha trajetória entre software, arquitetura, inteligência artificial e liderança técnica.
tags: [Career, Engineering, Leadership]
---

# About — Cláudio Araújo

## Engineering, intelligence and curiosity

Construo software há mais de duas décadas.

Ao longo desse tempo, passei por diferentes fases da engenharia de software: aplicações web, sistemas corporativos, plataformas financeiras, integrações, arquitetura, infraestrutura, inteligência artificial e, mais recentemente, sistemas baseados em agentes e autonomia controlada.

Minha trajetória nunca foi marcada por uma única tecnologia.

Ela foi marcada por uma pergunta recorrente:

**como transformar problemas complexos em sistemas úteis, compreensíveis e capazes de evoluir?**

Essa pergunta continua sendo a base do meu trabalho.

## The Beginning

### Quando a web ainda estava amadurecendo

Comecei a trabalhar com desenvolvimento quando criar aplicações para a web ainda significava lidar com um ecossistema muito diferente do atual.

Frameworks modernos ainda não existiam. Muitas das abstrações que hoje consideramos básicas precisavam ser construídas manualmente.

Foi um período que me ensinou algo que continua relevante:

**tecnologias mudam rapidamente; fundamentos permanecem.**

Desde o início, desenvolvimento significava muito mais do que escrever código. Era necessário entender o problema, encontrar uma forma de representá-lo em software e construir uma solução que outras pessoas realmente conseguissem utilizar.

## From Applications to Systems

À medida que os projetos cresceram, o trabalho também mudou.

Aplicações passaram a possuir mais usuários, integrações, regras, dados, dependências e impacto.

Nesse ponto, desenvolver deixou de ser apenas responder “Como implementamos essa funcionalidade?” e passou a exigir perguntas como:

- O que acontece quando esse sistema cresce?
- Como ele falha?
- Como outros sistemas dependem dele?
- Como conseguimos alterá-lo sem quebrar o restante?
- Quem precisa compreender essa decisão daqui a dois anos?

Esse foi o início de uma mudança importante na forma como passei a enxergar engenharia.

## Enterprise Engineering

Uma parte significativa da minha trajetória aconteceu em ambientes corporativos e financeiros.

Esses ambientes mudam a relação com software. Uma aplicação não precisa apenas funcionar. Ela também precisa conviver com segurança, auditoria, disponibilidade, integrações, processos organizacionais, compliance, sistemas legados, diferentes equipes e riscos operacionais.

Trabalhar nesse contexto me ensinou que uma solução tecnicamente interessante não é necessariamente uma boa solução. Boas soluções também precisam considerar o ambiente em que irão existir.

## Architecture

### O momento em que código deixa de ser o único problema

Com o tempo, minha atenção começou a migrar naturalmente da implementação isolada para o comportamento do sistema como um todo.

Passei a me interessar cada vez mais por boundaries, contratos, responsabilidades, integração entre componentes, dependências, observabilidade, escalabilidade, segurança, confiabilidade e evolução.

Arquitetura, para mim, não significa desenhar diagramas complexos. Significa tomar decisões que permitam que o software continue fazendo sentido quando o contexto mudar.

Toda arquitetura é uma hipótese sobre o futuro. Por isso procuro favorecer sistemas que consigam evoluir sem exigir reconstruções desnecessárias.

## Full-Stack as Systems Thinking

Trabalhar durante muitos anos atravessando frontend, backend, bancos de dados e infraestrutura produziu uma consequência importante: aprendi a observar como decisões locais afetam outras partes do sistema.

Uma escolha no frontend pode modificar contratos de API. Uma decisão de persistência pode limitar uma funcionalidade futura. Uma integração pode alterar disponibilidade. Uma mudança de infraestrutura pode afetar desenvolvimento e operação.

Por isso, embora minha experiência atravesse diferentes camadas tecnológicas, não considero “full-stack” apenas como uma lista de tecnologias conhecidas.

Para mim, significa principalmente:

**conseguir compreender como as diferentes partes de um produto formam um sistema.**

## Artificial Intelligence

### Uma extensão da engenharia, não uma substituição

Minha aproximação com inteligência artificial aconteceu a partir dessa base.

Não enxerguei IA como uma mudança de carreira que exigia abandonar tudo o que havia aprendido anteriormente. O efeito foi praticamente o oposto.

Quanto mais comecei a trabalhar com LLMs, RAG, embeddings e agentes, mais percebi que muitos dos problemas relevantes continuavam sendo problemas clássicos de engenharia: estado, contexto, contratos, dados, segurança, avaliação, observabilidade, falhas, custos, dependências e governança.

O modelo de linguagem é uma parte importante da solução. Mas ele não é o sistema inteiro.

**AI is a system, not a prompt.**

## From RAG to Agents

Os primeiros sistemas inteligentes que explorei estavam fortemente relacionados a conhecimento: recuperação de informação relevante, documentos corporativos, busca semântica e geração.

Essas perguntas naturalmente levaram a RAG, embeddings e sistemas de recuperação.

Depois veio a pergunta seguinte: e se o sistema não apenas recuperasse informação, mas também pudesse utilizar ferramentas, consultar sistemas, executar workflows, manter memória, delegar tarefas e colaborar com outros agentes?

Foi quando minha atenção começou a migrar para sistemas agentic.

## Agentic Systems

Agentes transformam modelos de linguagem em participantes ativos de um sistema. Eles deixam de apenas responder e passam a observar, interpretar, utilizar ferramentas, recuperar conhecimento, decidir próximos passos e executar ações.

Isso aumenta enormemente as possibilidades e também os riscos.

Quanto mais capacidade um sistema recebe, mais importante se torna sua arquitetura.

Perguntas centrais:

- quais ferramentas o agente pode utilizar?
- quais dados ele pode acessar?
- qual memória deve persistir?
- o que precisa de autorização humana?
- como sabemos por que determinada decisão foi tomada?
- o que acontece quando o modelo erra?
- como interrompemos o sistema?
- como substituímos um componente sem reconstruir tudo?

Essas perguntas estão no centro de projetos como LucyOS.

## LucyOS

LucyOS representa grande parte da maneira como penso inteligência artificial atualmente.

O objetivo não é construir simplesmente um chatbot melhor. É explorar a ideia de uma inteligência pessoal composta por memória, conhecimento, ferramentas, agentes especializados, contexto, protocolos e automação.

Princípios: memory as a first-class component, MCP-first integration, replaceable boundaries, human control e incremental evolution.

LucyOS também funciona como meu laboratório de longo prazo para investigar como sistemas inteligentes podem acompanhar pessoas e projetos ao longo do tempo.

## Autonomous Systems

Agentes naturalmente levam a uma pergunta ainda mais difícil:

> Até que ponto um sistema deve poder agir sozinho?

Minha resposta atual é simples:

**autonomia não deve ser concedida apenas porque a tecnologia permite.**

Ela deve ser conquistada através de evidência.

Essa ideia ganhou forma especialmente durante o desenvolvimento do Invest Lucy.

## Evidence Before Autonomy

Invest Lucy começou como projeto de automação financeira, mas a pergunta mais interessante deixou de ser “Como fazer o sistema operar?” e passou a ser “Como saber se ele deveria operar?”.

Antes de discutir autonomia real, o sistema precisa passar por uma trilha de validação:

```text
Scientific Evidence
↓
Shadow Outcomes
↓
Calibration
↓
Hypothesis Experiments
↓
Walk-forward
↓
Out-of-Sample Validation
↓
Monte Carlo
↓
Consolidated Evidence
↓
Human Review
```

Somente depois disso existe espaço para discutir runtime autônomo.

## Human-in-the-loop

Existe uma tendência natural em tecnologia de tratar automação como objetivo final. Não acredito que isso seja universalmente correto.

Há situações em que remover pessoas do processo melhora velocidade e confiabilidade. Há outras em que pessoas precisam continuar participando, especialmente quando existem risco financeiro, impacto humano, baixa previsibilidade ou decisões difíceis de reverter.

Human-in-the-loop não é uma limitação temporária da IA. Em muitos casos, ele é parte deliberada da arquitetura.

## Observability

Sistemas tradicionais já precisam de observabilidade. Sistemas inteligentes precisam ainda mais.

Por isso considero essencial capturar contexto, decisões, ferramentas utilizadas, resultados, eventos, falhas e intervenções humanas.

Quanto mais autonomia existe, maior deve ser a capacidade de reconstruir o que aconteceu.

## Documentation

### Engineering is also communication

Tenho uma relação forte com documentação técnica.

PRDs, ADRs, roadmaps, planos de implementação, documentação arquitetural e protocolos de validação fazem parte do meu processo de trabalho.

Não considero documentação como algo separado da engenharia. Ela é uma das formas de reduzir perda de contexto.

Código registra o comportamento do sistema. Documentação registra a intenção.

## Technical Leadership

Minha trajetória também vem caminhando cada vez mais para liderança técnica.

Não enxergo liderança técnica como posição em que alguém precisa ser a pessoa que mais sabe sobre todos os assuntos. Vejo como a capacidade de criar clareza quando existe complexidade.

Isso inclui entender problemas, decompor sistemas, identificar riscos, estabelecer princípios, orientar arquitetura, apoiar decisões, revisar soluções, compartilhar contexto e desenvolver pessoas.

Um bom líder técnico não precisa produzir todas as respostas. Precisa ajudar a equipe a produzir respostas melhores.

## How I Think About Leadership

### Context Before Direction

Orientação sem contexto cria dependência. Prefiro explicar por que uma decisão faz sentido.

### Principles Before Rules

Regras resolvem situações específicas. Princípios ajudam pessoas a resolver novas situações.

### Ownership Before Control

Equipes fortes precisam entender os problemas suficientemente bem para assumir responsabilidade sobre eles.

### Documentation Before Memory

Informação importante não deveria existir apenas na cabeça de algumas pessoas.

### Systems Before Heroes

Boa engenharia não deveria depender continuamente de pessoas salvando o projeto através de esforço extraordinário. Processos, arquitetura e comunicação devem reduzir essa necessidade.

## Learning

Depois de tantos anos trabalhando com software, uma das poucas certezas que tenho é que a tecnologia continuará mudando.

Atualmente, minha atenção está especialmente concentrada em Agentic AI, MCP, long-term memory, AI evaluation, autonomous systems, AI governance, multimodal systems e human-AI collaboration.

Meu interesse está menos em prever qual tecnologia vencerá e mais em compreender os princípios por trás delas.

## Beyond the Code

Tecnologia é uma parte importante da minha vida intelectual, mas não é a única.

Tenho interesse por temas relacionados a comportamento humano, consciência, filosofia, aprendizagem, relações humanas, criatividade e significado.

Esse interesse também influencia a forma como penso inteligência artificial.

Quanto mais sistemas digitais começam a assumir funções cognitivas, mais perguntas tecnológicas se transformam em perguntas humanas: quando confiar, o que deveria continuar sob controle humano, como tecnologia muda nossa forma de decidir, o que significa delegar julgamento e quando automação deixa de aumentar capacidade e passa a diminuir autonomia humana.

## What I Build

- Enterprise Systems
- AI Engineering
- Agentic Platforms
- Autonomous Systems
- Product Engineering

## What I Value

### Clarity

Complexidade inevitável não precisa produzir software incompreensível.

### Evidence

Decisões importantes devem ser sustentadas por observação e validação.

### Evolution

Arquitetura precisa aceitar que requisitos mudam.

### Responsibility

Quanto maior o poder de um sistema, maior deve ser a atenção aos seus impactos.

### Curiosity

A capacidade de continuar fazendo perguntas é uma das ferramentas mais importantes da engenharia.

## Where I Am Now

Hoje estou em um momento de convergência:

**software engineering + architecture + artificial intelligence + agentic systems + technical leadership**

Meu objetivo não é simplesmente trabalhar com IA. É ajudar a construir sistemas inteligentes utilizando a maturidade acumulada por décadas de engenharia de software.

## Closing

Durante muito tempo, software foi principalmente uma forma de automatizar instruções escritas por pessoas.

Estamos entrando em uma fase em que sistemas começam também a interpretar contexto, escolher ferramentas e participar de decisões.

Isso muda muita coisa, mas não elimina os fundamentos da engenharia. Na verdade, torna esses fundamentos ainda mais importantes.

É exatamente nessa interseção que quero continuar trabalhando:

**construindo sistemas inteligentes sem abandonar aquilo que torna bons sistemas confiáveis, compreensíveis e humanos.**

---

**Cláudio Araújo**

Software Engineering · AI Engineering · Technical Leadership

**20+ years of software engineering meeting intelligent systems.**
