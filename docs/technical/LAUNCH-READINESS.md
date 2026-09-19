# Launch Readiness & Professional Polish

**Status:** ✅ v1.0 Launch Candidate
**Data:** 18/09/2026
**Branch:** `feat/launch-readiness`

## Objetivo

Transformar o MVP tecnicamente funcional em uma versão pública profissionalmente coerente, sem reabrir a arquitetura base.

Esta etapa prioriza:

- narrativa final da Home;
- links profissionais reais;
- identidade mínima de navegador;
- SEO/social metadata;
- acessibilidade de navegação;
- remoção de placeholders;
- validação de lançamento;
- domínio definitivo.

## Auditoria inicial

A revisão do site publicado e da árvore local encontrou:

1. Home ainda sem cinco blocos previstos no wireframe aprovado;
2. `src/index.html` com mojibake em title/description fallback;
3. Contact com placeholders `[LinkedIn]`, `[GitHub]` e `[Email]`;
4. mobile menu sem focus trap e Escape;
5. 404 sem title/robots próprios;
6. metadata social incompleta;
7. favicon ausente;
8. domínio customizado ainda não definido.

## Implementação desta trilha

### Home narrative

Foram incorporadas as seções já aprovadas em `docs/content/HOMEPAGE.md` e `docs/ux/UX-WIREFRAMES.md`:

- From Idea to Production;
- Technical Leadership;
- Currently Exploring;
- Writing;
- Beyond Technology;
- Closing CTA.

A Home agora segue o fluxo:

```text
Identity
↓
Journey
↓
Work
↓
Principles
↓
Evidence
↓
Delivery
↓
Leadership
↓
Exploration
↓
Writing
↓
Human context
↓
Contact
```

## Professional links

Publicados:

- GitHub: `https://github.com/claudiodearaujo`
- LinkedIn: `https://br.linkedin.com/in/claudio-de-araujo`

Nenhum e-mail foi inventado ou publicado sem fonte explícita.

## Browser identity

Adicionado favicon SVG com monograma `CA`.

O fallback HTML foi corrigido para UTF-8 real e recebeu:

- title legível;
- description legível;
- theme color;
- favicon.

## Social / SEO polish

O serviço de SEO passa a publicar:

- `og:site_name`;
- `og:locale`;
- Twitter card `summary`;
- Twitter title/description;
- LinkedIn + GitHub em `sameAs`;
- `inLanguage` em conteúdo editorial.

OG image raster dedicada permanece opcional para evolução posterior.

## 404

A rota Angular de 404 passa a ter:

- title próprio;
- description própria;
- `noindex, nofollow`;
- canonical removida.

O build publica `404.html` a partir do shell client-side, então o Render responde HTTP 404 real para rotas inexistentes **e** serve a página de 404 da própria aplicação, com o title, a description e o `noindex` acima. O `postbuild` gera esse arquivo e a validação de deploy confere que a resposta 404 carrega o shell da aplicação.

## Mobile navigation

O menu mobile agora:

- move foco para o primeiro item ao abrir;
- prende Tab dentro do menu;
- fecha com Escape;
- devolve foco ao trigger.

Isso completa a regra prevista no wireframe de UX.

## Quality gates adicionais

Foram adicionados E2E para:

- narrativa completa da Home;
- GitHub/LinkedIn reais;
- Contact sem placeholders;
- 404 SEO;
- favicon;
- mobile focus trap;
- Escape + focus return.

## Dependências externas restantes

### Custom domain — concluído

Domínio final: `https://claudiodearaujo.dev.br`.

Concluído:

1. domínio adicionado ao Render;
2. DNS configurado no Registro.br;
3. HTTPS/TLS validado;
4. `SITE_ORIGIN=https://claudiodearaujo.dev.br`;
5. canonical, sitemap e Open Graph validados;
6. redirect de `www` para a raiz validado;
7. 17/17 E2E live no domínio final.

## Launch Candidate

A versão poderá ser marcada como **v1.0 Launch Candidate** quando:

```text
validate:full          ✅
Render deploy          ✅
Blueprint              ✅
Security headers       ✅
PR previews            ✅
Professional links     ✅
No placeholders        ✅
Visual/content polish  ✅
Custom domain          ✅
SITE_ORIGIN final      ✅
Live production E2E    ✅ 17/17
```

## Final domain decision — 18/09/2026

O domínio final está definido como `claudiodearaujo.dev.br`. Esta decisão substitui qualquer nota anterior deste documento que trate o domínio como ainda indefinido.

O Blueprint declara o domínio e `SITE_ORIGIN=https://claudiodearaujo.dev.br` está ativo em produção. DNS, HTTPS, canonical, sitemap, Open Graph, headers, redirect de `www`, 404 e E2E live foram validados. O procedimento e evidências estão em [Final Domain Cutover](./FINAL-DOMAIN-CUTOVER.md).
