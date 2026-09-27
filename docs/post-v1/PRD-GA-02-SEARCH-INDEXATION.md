# PRD GA-02 — Search Indexation & Discoverability

Status: **In Progress**
Priority: **P1**  
Depends on: **GA-01 v1.0 Release**

## 1. Problem

O site possui SEO técnico, sitemap, robots, canonical, metadata social e conteúdo SSG, mas isso não equivale a possuir uma propriedade de busca verificada nem uma baseline observável de indexação.

## 2. Objective

Registrar o domínio nos mecanismos de webmaster, submeter o sitemap canônico e criar uma rotina mínima de verificação de cobertura sem introduzir tracking invasivo no site.

## 3. Primary scope — Google

Usar preferencialmente uma **Domain Property** para `claudiodearaujo.dev.br`.

Essa modalidade agrega protocolos e subdomínios e requer verificação por DNS.

Entregas:

- criar/adicionar a propriedade;
- obter token DNS de verificação;
- adicionar o registro solicitado no provedor DNS;
- confirmar ownership;
- manter o registro de verificação após sucesso;
- submeter o sitemap canônico;
- confirmar que o sitemap foi aceito/processado;
- registrar baseline inicial de indexação e problemas reportados.

## 4. Sitemap contract

Fonte canônica:

`/sitemap.xml`

Antes da submissão:

- HTTP 200;
- XML válido;
- apenas URLs canônicas públicas;
- nenhuma URL de preview;
- nenhuma URL de ambiente Render;
- nenhum redirect como destino;
- `lastmod` consistente quando disponível;
- quantidade compatível com o manifesto publicado.

O sitemap continua gerado pelo build. Search Console não vira fonte de verdade das URLs.

## 5. Ownership boundary

A criação/autorização da propriedade e alterações DNS podem exigir ação explícita do proprietário da conta/domínio.

O agente pode:

- validar DNS depois da alteração;
- validar sitemap e URLs;
- documentar o token sem expô-lo indevidamente;
- confirmar estado técnico observável.

O PRD não deve ser marcado como concluído apenas porque a configuração local está pronta se a verificação externa ainda estiver pendente.

## 6. Indexation baseline

Depois da verificação, registrar:

- propriedade;
- data de submissão;
- sitemap submetido;
- URLs descobertas reportadas;
- páginas indexadas quando os dados estiverem disponíveis;
- páginas excluídas e respectivos motivos;
- erros de crawling;
- problemas de canonical;
- problemas de structured data relevantes.

Ausência de dados imediatamente após configuração não é falha automática: mecanismos de busca processam e coletam dados de forma assíncrona.

Não prometer prazo de indexação.

## 7. Bing — optional but planned

Depois do Google estar verificado, avaliar Bing Webmaster Tools.

Fluxo preferencial:

- importar a propriedade já verificada do Google Search Console;
- importar/confirmar sitemap;
- validar ownership;
- registrar a propriedade no mesmo validation record.

Bing não bloqueia o DoD principal de GA-02; deve ser marcado como `completed`, `deferred` ou `not applicable`, nunca simplesmente esquecido.

## 8. Search hygiene

Durante a execução:

- não usar técnicas de indexação artificial;
- não gerar páginas thin apenas para keywords;
- não duplicar conteúdo PT em URLs alternativas;
- não solicitar indexação em massa sem necessidade;
- não adicionar scripts de terceiros apenas para provar ownership;
- não confundir posição/ranking com Definition of Done.

A métrica inicial é **discoverability técnica**, não ranking.

## 9. Validation artifact

Criar registro versionado com:

- data;
- release/tag de referência;
- sitemap;
- método de ownership;
- status Google;
- status Bing;
- observações de cobertura;
- ações futuras identificadas.

Não armazenar cookies, credenciais ou tokens de sessão no repositório.

## 10. Out of scope

- SEO content farm;
- compra de backlinks;
- ranking garantido;
- Google Analytics;
- tracking de visitante;
- search interno;
- campanhas pagas;
- schema novo sem caso de uso;
- tradução inglesa, tratada em GA-03.

## 11. Acceptance criteria

- Domain Property do Google verificada;
- sitemap canônico submetido;
- sitemap sem erro técnico conhecido;
- baseline de indexação documentada quando disponível;
- problemas reportados classificados;
- Bing explicitamente resolvido como completed/deferred/not applicable;
- nenhuma dependência de tracker adicionada ao bundle.

## 12. Definition of Done

GA-02 termina quando ownership e sitemap estiverem efetivamente confirmados no provedor e a configuração estiver documentada. Preparar instruções sem concluir a verificação externa não satisfaz o DoD.

Preflight e dependência externa atual: [GA-02 — Search Indexation Validation Record](./GA-02-SEARCH-INDEXATION-VALIDATION.md).
