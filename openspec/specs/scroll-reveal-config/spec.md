## ADDED Requirements

### Requirement: ScrollReveal configurado sem reset e sem race condition
O ScrollReveal SHALL ser inicializado após a biblioteca estar disponível no DOM, com `reset: false`, `viewFactor: 0.15`, `distance: '30px'`, `duration: 900`, `easing: 'cubic-bezier(0.5, 0, 0, 1)'`, e `delay: 200`.

#### Scenario: Script carregado na ordem correta
- **WHEN** o `index.html` é carregado pelo browser
- **THEN** o `<script src="scrollreveal">` SHALL aparecer antes de `<script src="./index.js">` no DOM

#### Scenario: ScrollReveal sem re-animação
- **WHEN** o usuário rola a página para baixo e depois para cima
- **THEN** elementos já revelados SHALL permanecer visíveis e NÃO re-animar

---

### Requirement: Animações aplicadas somente em elementos leaf
O ScrollReveal SHALL aplicar efeitos apenas em elementos de conteúdo específicos, nunca em `<section>` ou contêineres que abrangem mais de 60% da viewport.

#### Scenario: Seção "Sobre" sem animação horizontal de seção
- **WHEN** o usuário rola até a seção "Sobre"
- **THEN** a `<section>` em si SHALL NÃO possuir classes `sr-left` ou `sr-right`
- **THEN** o heading e o conteúdo interno SHALL animar com `sr-bottom` individualmente

#### Scenario: Seção "Projetos" sem animação horizontal de seção
- **WHEN** o usuário rola até a seção "Projetos"
- **THEN** a `<section id="projects">` SHALL NÃO possuir classes `sr-left` ou `sr-right`
- **THEN** cada `.projects__row` SHALL animar individualmente com `sr-bottom` e `interval: 150`

---

### Requirement: Hero animado corretamente sem `sr-active` hardcoded
Os elementos do hero (`home-hero__eyebrow`, `heading-primary`, `home-hero__lead`) SHALL receber animações reais sem `sr-active` pré-definido no HTML.

#### Scenario: Hero sem sr-active hardcoded
- **WHEN** o HTML do `index.html` é inspecionado
- **THEN** nenhum elemento COM classes `sr-top`, `sr-bottom`, `sr-left` ou `sr-right` SHALL conter `sr-active` no atributo class estático do HTML

#### Scenario: Hero anima ao carregar a página
- **WHEN** a página carrega e o DOMContentLoaded dispara
- **THEN** o ScrollReveal SHALL revelar os elementos do hero com efeito `sr-top` para eyebrow e `sr-bottom` para h1 e lead

---

### Requirement: Páginas de detalhe de projeto sem overhead de ScrollReveal
As páginas `project-1.html`, `project-2.html`, `project-3.html` SHALL NÃO carregar o script do ScrollReveal nem conter classes `sr-*`.

#### Scenario: Páginas de projeto sem classes sr-*
- **WHEN** qualquer arquivo `project-N.html` é inspecionado
- **THEN** nenhum elemento SHALL conter classe `sr-top`, `sr-bottom`, `sr-left` ou `sr-right`

#### Scenario: Páginas de projeto sem script da CDN
- **WHEN** qualquer arquivo `project-N.html` é inspecionado
- **THEN** o script tag `https://unpkg.com/scrollreveal` SHALL estar ausente

---

### Requirement: Suporte a prefers-reduced-motion
O CSS do ScrollReveal SHALL respeitar a preferência de acessibilidade do sistema operacional para redução de animações.

#### Scenario: Animações desativadas com prefers-reduced-motion
- **WHEN** o SO do usuário está configurado com `prefers-reduced-motion: reduce`
- **THEN** os elementos `.sr-top, .sr-bottom, .sr-left, .sr-right` SHALL ter `transition: none`, `opacity: 1` e `transform: none`
