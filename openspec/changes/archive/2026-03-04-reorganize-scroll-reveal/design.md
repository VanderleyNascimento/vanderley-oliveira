## Context

O portfólio usa ScrollReveal (via CDN `unpkg.com/scrollreveal`) para animar elementos ao entrar no viewport. O estado atual tem múltiplos problemas:

1. **`sr-active` hardcoded no HTML**: Elementos aparecem com `.sr-active` desde o HTML estático. Isso faz com que o CSS de transição atue, mas o elemento já começa "visível", então a animação nunca dispara de verdade — os elementos ficam com `opacity: 1` desde o carregamento, mas a classe de animação existe sem efeito real.
2. **Script fora de ordem**: Em todos os HTMLs, `<script src="./index.js">` vem ANTES de `<script src="https://unpkg.com/scrollreveal">`. O `index.js` acessa `ScrollReveal` dentro de `DOMContentLoaded`, o que funciona por coincidência de timing, mas é uma race condition real.
3. **`reset: true`**: Re-anima elementos cada vez que o usuário sobe a página. Em um portfólio profissional, esse comportamento é distrator e diminui a sensação de qualidade.
4. **`sr-left` em seções inteiras**: `<section id="about" class="about sec-pad sr-left">` e `<section id="projects" class="projects sec-pad sr-left">` — seções com 100vw de conteúdo recebem animação horizontal. O resultado é que a seção inteira começa invisível e translada, causando layout shift perceptível e uma experiência visual ruim.
5. **`sr-left` duplicado**: `projects__content sr-left` dentro de `projects sr-left` — hierarquia pai-filho ambos com `sr-left` cria dupla animação no mesmo elemento.
6. **Páginas de projeto (project-1/2/3.html)**: ScrollReveal é inicializado mas os elementos têm `sr-active` hardcoded — não animate nada, apenas carrega a biblioteca CDN desnecessariamente.

## Goals / Non-Goals

**Goals:**
- Animações ScrollReveal funcionam de verdade (sem `sr-active` no HTML)
- Efeitos aplicados apenas em elementos leaf semânticos (não em seções inteiras)
- Sem re-animação ao rolar para cima (`reset: false`)
- Script do ScrollReveal carregado antes do `index.js`
- Cascata staggered nos cards de projeto (`interval`)
- Zero layout shift causado por animações
- Páginas de detalhe de projeto sem overhead de ScrollReveal

**Non-Goals:**
- Mudança no design visual ou identidade do portfólio
- Troca da biblioteca ScrollReveal por outra
- Animações complexas ou parallax

## Decisions

### 1. `reset: false` (versus `reset: true`)
**Decisão**: Desativar reset global.
**Rationale**: Em portfólios profissionais, re-animação a cada scroll up/down é distratora e transmite baixa qualidade de polish. O efeito de "entrada" é mais impactante quando ocorre uma única vez.
**Alternativa considerada**: Manter `reset: true` apenas no hero — descartado porque o hero é a seção acima do fold, onde o usuário raramente sobe para ver de novo.

### 2. Remover `sr-*` das `<section>` — aplicar em elementos filhos
**Decisão**: Classes `sr-*` somente em elementos conteúdo (headings, parágrafos, cards, CTAs).
**Rationale**: Animação em `<section>` cobre 100% da largura da viewport. O `sr-left` translada a seção inteira 30px para a esquerda e ela fica opaca por 1s — isso causa layout shift visual grave e é o principal defeito de UX.
**Alternativa considerada**: Usar `sr-bottom` na seção inteira — também descartado pois seções com muito conteúdo têm tamanho de bloco que torna o efeito artificial.

### 3. Aplicar `interval` apenas nos cards de projeto
**Decisão**: Usar `interval: 150` nos `.projects__row` para entrada em cascata.
**Rationale**: Os cards tematicamente relacionados se beneficiam de entrada sequencial (storytelling visual), diferente do conteúdo da seção "Sobre" que deve entrar de uma vez.

### 4. Remover ScrollReveal das páginas `project-N.html`
**Decisão**: Retirar todas as classes `sr-*` e o script CDN dos HTML de detalhe de projeto.
**Rationale**: As páginas de projeto abrem no topo, o conteúdo é visível imediatamente — não há viewport entry a revelar. Carregar ScrollReveal nessas páginas sem efeito real é overhead sem benefício.
**Alternativa considerada**: Manter ScrollReveal com animação no hero do projeto — descartado porque duplica o hero content que é imediatamente visível no carregamento da página.

### 5. Reordenar scripts
**Decisão**: Mover `<script src="https://unpkg.com/scrollreveal">` para antes de `<script src="./index.js">` no `index.html`.
**Rationale**: Elimina a race condition. O `index.js` depende de `ScrollReveal` estar definido globalmente. Usar CDN antes garante disponibilidade síncrona.

## Risks / Trade-offs

| Risco | Mitigação |
|-------|-----------|
| CDN do ScrollReveal pode falhar (timeout) | O guard `if (typeof ScrollReveal !== 'undefined')` já existe no código — elementos simplesmente ficam visíveis |
| Remover `sr-active` do HTML pode causar flash of invisible content (FOIC) em conexões lentas | ScrollReveal adiciona `sr-revealed` rapidamente; adicionar `.sr-top, .sr-bottom, .sr-left, .sr-right { will-change: opacity, transform }` no CSS minimiza o custo |
| `prefers-reduced-motion` não é respeitado | Adicionar no SCSS: `@media (prefers-reduced-motion: reduce) { .sr-top, .sr-bottom, .sr-left, .sr-right { transition: none !important; opacity: 1 !important; transform: none !important; } }` |
