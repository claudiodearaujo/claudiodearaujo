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
