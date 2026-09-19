# Pendências técnicas em aberto

Itens conhecidos, deliberadamente não resolvidos, com o critério de pronto de cada um.
Fechar um item aqui significa removê-lo desta lista junto com a mudança que o resolve.

## 1. CSP endurecida não foi verificada contra o Render real

**Status:** em aberto
**Desde:** PR #11
**Impacto se estiver errado:** alto — site sem estilo e sem hidratação em produção

O `script-src` do `render.yaml` deixou de usar `'unsafe-inline'` e passou a liberar cada
script inline por hash SHA-256. A política foi verificada em Chromium contra o output real
do build, servido com os headers extraídos do próprio `render.yaml`: seis rotas, sem
violações de CSP, estilos aplicados e hidratação intacta.

O que **não** foi verificado é se o Render aplica os headers declarados exatamente como
escritos. A validação foi feita contra uma simulação local porque o ambiente de
desenvolvimento onde a mudança foi produzida não tem saída para a internet pública.

**Critério de pronto:** rodar, de uma máquina com acesso à internet,

```bash
TARGET_ORIGIN=https://claudiodearaujo.dev.br npm run validate:launch:live
```

O gate confere que `script-src` não contém `'unsafe-inline'`, que há pelo menos um hash
declarado, e roda a suíte E2E contra a origem remota.

**Sintoma de falha:** `Refused to execute inline script` no console do navegador e a página
renderizada sem estilo.

**Rollback:** devolver `'unsafe-inline'` ao `script-src` no `render.yaml`. É uma linha, e
não exige reverter nada além dela — o restante da política continua válido.

**Observação sobre manutenção:** os hashes cobrem o boot de tema do `index.html` e o
bootstrap de hidratação do Angular. Um upgrade do Angular pode mudar o segundo. Isso não
quebra a produção silenciosamente: `postbuild` roda `tools/launch/csp-hashes.mjs`, que
recalcula os hashes do `dist` e falha o build quando eles divergem. Depois de uma mudança
intencional, `npm run csp:update` regrava a lista e imprime os valores para o `render.yaml`.

## 2. Alvos de toque de links inline abaixo de 44pt

**Status:** em aberto, aguardando decisão de design
**Desde:** revisão de responsividade mobile

Os controles do header (tema e menu) foram ajustados para 44×44, o mínimo das iOS Human
Interface Guidelines. Os links de chamada dentro do conteúdo — "Explorar projeto",
"Ver todos", "Conheça minha trajetória" — continuam com 17 a 26px de altura, porque
aumentá-los altera o ritmo vertical do design em todas as larguras, não só no mobile.

Passam no WCAG 2.5.8 (mínimo de 24×24 para AA), que a suíte axe já verifica. Não atingem o
2.5.5 (44×44, AAA) nem a recomendação da Apple.

**Critério de pronto:** decidir entre dar `min-height` a `.text-link` globalmente, fazê-lo
apenas abaixo de um breakpoint, ou manter como está e registrar a escolha aqui.

## 3. Gates de CI não enxergam a página renderizada

**Status:** em aberto, adiado deliberadamente
**Desde:** trilha E8 do `SITE-EVOLUTION-PLAN.md`, pulada a pedido

O CI hoje roda `npm run validate` (format, lint, typecheck, testes de tools e unitários,
build) e a suíte E2E. Isso cobre correção de código e comportamento, mas não cobre
regressão de **performance, orçamento visual e links**.

A trilha E8 previa sete entregas. Nenhuma foi feita:

1. Lighthouse CI no workflow, com as metas do `PRD.md` §40 como budget que falha o build;
2. axe em **todas** as rotas públicas, geradas a partir de `public-routes.generated.json`,
   em vez das 4 rotas que a suíte cobre hoje;
3. regressão visual com screenshots dos templates canônicos, nos dois temas, em 390px e
   1440px;
4. link checker sobre o output do build — interno, e externo com allowlist;
5. `npm audit --audit-level=high` no CI;
6. Dependabot ou Renovate para Angular e toolchain;
7. testes unitários do pipeline de conteúdo: schema inválido, rota duplicada, `related`
   apontando para rota inexistente, âncoras duplicadas.

**O que já existe, e que reduz o risco de alguns itens.** O item 7 é o mais coberto na
prática: o build de conteúdo valida o schema com Zod, quebra em rota duplicada e verifica
cada `related` contra o manifesto — o que falta é fixar esses comportamentos em teste, não
implementá-los. O item 2 foi executado **manualmente** durante a revisão das fases 1–4:
axe (WCAG 2.2 AA) nas 33 rotas então publicadas, em tema claro e escuro, sem violações. O
que não existe é isso rodando sozinho a cada push.

**Impacto se ficar como está:** médio e cumulativo. Os defeitos que motivaram o plano —
`h1` sem tamanho, fontes não carregadas, índice lateral sumindo no mobile, ausência de
imagem social — existiram em produção com o CI verde. Eles voltam a ser possíveis pelo
mesmo motivo de sempre: nenhum gate olha a página renderizada.

**Critério de pronto:** os itens acima no workflow, e a verificação que o plano propõe —
reverter cada uma das correções de D1, D2, D3 e D4 isoladamente deve produzir uma falha
vermelha. Um gate que não falha quando o bug volta não é um gate.

**Ordem sugerida, por retorno sobre esforço:** item 2 primeiro (a lista de rotas já é
gerada, e o custo é escrever um `for`), depois 5 e 7, depois 1, e por último 3 e 4, que são
os mais caros de manter — uma suíte de regressão visual mal calibrada produz falha falsa
com frequência suficiente para ser desligada.
