## 1. Preparação do script (order fix)

- [x] 1.1 Em `index.html`: mover `<script src="https://unpkg.com/scrollreveal">` para antes de `<script src="./index.js">` (linha ~442-443)
- [x] 1.2 Em `project-1.html`: remover o `<script src="https://unpkg.com/scrollreveal">` e o `<script src="./index.js">` (ou manter apenas index.js sem scrollreveal)
- [x] 1.3 Em `project-2.html`: remover o `<script src="https://unpkg.com/scrollreveal">`
- [x] 1.4 Em `project-3.html`: remover o `<script src="https://unpkg.com/scrollreveal">`

## 2. Limpeza do HTML — remover sr-active hardcoded e sr-* em seções

- [x] 2.1 Em `index.html` linha 91: remover `sr-active` da classe `home-hero__eyebrow`
- [x] 2.2 Em `index.html` linha 92: remover `sr-active` da classe `heading-primary`
- [x] 2.3 Em `index.html` linha 94: remover `sr-active` da classe `home-hero__lead`
- [x] 2.4 Em `index.html` linha 158: remover `sr-left sr-active` da `<section id="about">`
- [x] 2.5 Em `index.html` linha 219: remover `sr-left sr-active` da `<section id="projects">`
- [x] 2.6 Em `index.html` linha 229: remover `sr-left sr-active` de `projects__content` (duplicata do pai)
- [x] 2.7 Em `index.html` linha 255: remover `sr-left sr-active` de `projects__row` (será adicionado via JS)
- [x] 2.8 Em `index.html` linha 373: remover `sr-active` de `contact__cta-container`
- [x] 2.9 Em `project-1.html`: remover todas as classes `sr-bottom sr-active` dos elementos (linhas 82, 83, 88, 96, 149, 156)
- [x] 2.10 Em `project-2.html`: remover todas as classes `sr-bottom sr-active` dos elementos
- [x] 2.11 Em `project-3.html`: remover todas as classes `sr-bottom sr-active` dos elementos

## 3. Reconfiguração do bloco ScrollReveal em index.js

- [x] 3.1 Substituir o bloco ScrollReveal atual (linhas 232–256) pela nova configuração com:
  - `reset: false`
  - `viewFactor: 0.15`
  - `distance: '30px'`
  - `duration: 900`
  - `easing: 'cubic-bezier(0.5, 0, 0, 1)'`
  - `delay: 200`
- [x] 3.2 Adicionar reveal separado para hero: `.home-hero__eyebrow` com `sr-top`, `.heading-primary` e `.home-hero__lead` com `sr-bottom` e `delay` escalonado (200, 350, 500)
- [x] 3.3 Adicionar reveal para seção About: `.about .heading-sec__main` e `.about__content-main`, `.about__content-skills` com `sr-bottom`
- [x] 3.4 Adicionar reveal para cards de projeto: `.projects__row` com `sr-bottom` e `interval: 150`
- [x] 3.5 Adicionar reveal para contato: `.contact__cta-container` com `sr-bottom`

## 4. Atualização do SCSS — prefers-reduced-motion

- [x] 4.1 Em `_scrollReveal.scss`: adicionar bloco `@media (prefers-reduced-motion: reduce)` que desativa `transition`, `opacity` e `transform` nas classes `sr-*`

## 5. Verificação visual

- [x] 5.1 Abrir `index.html` no browser via `npx serve .` ou Live Server e rolar a página verificando que animações disparam ao entrar no viewport
- [x] 5.2 Confirmar que elementos NÃO re-animam ao rolar para cima
- [x] 5.3 Confirmar que seções "Sobre" e "Projetos" NÃO piscam/transladam horizontalmente ao entrar no viewport
- [x] 5.4 Inspecionar DOM e confirmar ausência de `sr-active` no HTML estático
- [x] 5.5 Abrir `project-1.html` e confirmar que o conteúdo está visível imediatamente sem animações
- [x] 5.6 Testar com emulação de `prefers-reduced-motion: reduce` no DevTools (Rendering → Emulate CSS media feature)
