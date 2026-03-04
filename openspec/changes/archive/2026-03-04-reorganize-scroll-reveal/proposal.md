## Why

O ScrollReveal está aplicado de forma inconsistente e com efeitos prejudiciais à experiência do usuário: seções inteiras recebem a classe `sr-left` (tornando o conteúdo invisível por 1s antes de aparecer), `sr-active` está hardcoded no HTML (contornando o mecanismo de animação), `reset: true` faz elementos re-animarem ao rolar para cima sem propósito narrativo, e o script do ScrollReveal é carregado *depois* do `index.js` (criando race condition). É necessário reorganizar, restringir e aplicar os efeitos com critério.

## What Changes

- **Remover** `sr-active` hardcoded de todos os elementos nos arquivos HTML (`index.html`, `project-1/2/3.html`) — isso estava neutralizando as animações e causando inconsistência
- **Remover** `sr-left` e `sr-right` de seções inteiras (`<section>` e contêineres pai grandes) — efeitos horizontais em blocos grandes causam layout shift e são visualmente ruins
- **Desativar** `reset: true` no ScrollReveal — o efeito de re-animação ao rolar para cima é distrator e antipadrão em portfolios profissionais
- **Mover** o `<script src="scrollreveal">` para **antes** do `index.js` em todos os HTMLs — eliminar a race condition
- **Aplicar** efeitos apenas em elementos de conteúdo leaf (headings, cards de projeto, botões CTA) com direções semanticamente corretas
- **Adicionar delay escalonado** (`interval`) nos cards de projetos para entrada em cascata
- **Preservar** o efeito `sr-bottom` no hero apenas nos elementos do hero que já funcionam corretamente (eyebrow, h1, lead)
- **Remover** completamente as classes `sr-*` das páginas `project-1/2/3.html` — a animação é irrelevante em páginas de detalhes que já abrem no topo

## Capabilities

### New Capabilities

- `scroll-reveal-config`: Configuração centralizada e semântica do ScrollReveal com `reset: false`, delays escalonados por seção e aplicação restrita a elementos leaf

### Modified Capabilities

- (nenhuma — não há specs existentes para ScrollReveal em `openspec/specs/`)

## Impact

- **index.html**: remoção de `sr-active` hardcoded e redistribuição das classes `sr-*` com semântica correta
- **project-1.html**, **project-2.html**, **project-3.html**: remoção total das classes `sr-*` e reposicionamento do script
- **index.js**: bloco ScrollReveal reescrito com `reset: false`, `viewFactor: 0.15`, e delays escalonados por selector
- **_scrollReveal.scss**: sem alteração estrutural, mas pode-se adicionar `@media (prefers-reduced-motion)` para acessibilidade
- **Nenhuma dependência externa nova** — ScrollReveal já é carregado via CDN
