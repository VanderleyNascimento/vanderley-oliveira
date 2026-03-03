// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

const headerLogoContainer = document.querySelector('.header__logo-container');

if (headerLogoContainer) {
  headerLogoContainer.addEventListener('click', () => {
    const isHomePage =
      location.pathname.endsWith('/index.html') ||
      location.pathname.endsWith('\\index.html') ||
      location.pathname === '/' ||
      location.pathname === '';

    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', '#');
      return;
    }

    location.href = 'index.html';
  });
}

const footerYearRange = document.getElementById('footer-year-range');

if (footerYearRange) {
  const startYear = Number(footerYearRange.dataset.startYear) || new Date().getFullYear();
  const currentYear = new Date().getFullYear();
  footerYearRange.textContent =
    startYear < currentYear ? `${startYear}-${currentYear}` : `${currentYear}`;
}

const mouseScrollHint = document.querySelector('.home-hero__mouse-scroll-cont');

if (mouseScrollHint) {
  const IDLE_DELAY_MS = 1200;
  const VISIBLE_DURATION_MS = 2600;
  let idleTimer = null;
  let hideTimer = null;

  const canShowHint = () => window.scrollY < window.innerHeight * 0.85;

  const hideHint = () => {
    mouseScrollHint.classList.remove('is-visible');
  };

  const showHint = () => {
    if (!canShowHint()) {
      hideHint();
      return;
    }

    mouseScrollHint.classList.add('is-visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideHint, VISIBLE_DURATION_MS);
  };

  const scheduleHint = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(showHint, IDLE_DELAY_MS);
  };

  const handleUserScroll = () => {
    hideHint();
    scheduleHint();
  };

  window.addEventListener('scroll', handleUserScroll, { passive: true });
  window.addEventListener('resize', handleUserScroll);

  scheduleHint();
}

const projectsData = {
  'project-1': {
    title: 'Portfolio: HTML5, CSS3 e JavaScript',
    description:
      'Primeiro portfolio desenvolvido com foco em estrutura sem framework, layout responsivo e interacoes basicas de navegacao e formulario.',
    image: './assets/img-projetos/img-portifolio1.jpeg',
    live: 'https://vanderleynascimento.github.io/Portfolio/',
    repo: 'https://github.com/VanderleyNascimento/Portfolio',
    tools: ['HTML', 'CSS', 'JavaScript', 'GIT/GitHub']
  },
  'project-2': {
    title: 'Apeperia: design responsivo e mobile-first',
    description:
      'Landing page da Apeperia usando mobile-first e Sass, com estrutura focada em performance visual e boa experiencia em diferentes telas.',
    image: 'assets/img-projetos/tela-apeperia.png',
    live: 'https://vanderleynascimento.github.io/projeto-apeperia/',
    repo: 'https://github.com/VanderleyNascimento/projeto-apeperia/tree/Versao-1.0',
    tools: ['HTML', 'CSS', 'JavaScript', 'SASS', 'GIT']
  },
  'project-3': {
    title: 'Sistema de Gerenciamento de Produtos',
    description:
      'Aplicacao para operacoes de CRUD com React e Supabase, com foco em gerenciamento de produtos de forma simples e segura.',
    image: './assets/png/gerenciadorDeProduto.png',
    live: 'https://gerenciador-de-produto-khaki.vercel.app/',
    repo: 'https://github.com/VanderleyNascimento/Gerenciador-de-Produto',
    tools: ['React', 'Supabase', 'SCSS', 'JavaScript', 'Tailwind', 'GIT']
  }
};

const projectOpenButtons = document.querySelectorAll('[data-open-project]');
const projectDetailsSection = document.getElementById('project-details-inline');
const projectDetailTitle = document.getElementById('project-detail-title');
const projectDetailDescription = document.getElementById('project-detail-description');
const projectDetailImage = document.getElementById('project-detail-image');
const projectDetailTools = document.getElementById('project-detail-tools');
const projectDetailLive = document.getElementById('project-detail-live');
const projectDetailRepo = document.getElementById('project-detail-repo');
const projectDetailClose = document.getElementById('project-detail-close');
const projectDetailContext = document.getElementById('project-detail-context');
const projectsSection = document.getElementById('projects');
const projectHeaderLinks = document.querySelectorAll('a[href="#projects"]');
const defaultPageTitle = document.title;

const renderProjectDetails = (projectId) => {
  const project = projectsData[projectId];
  if (!project || !projectDetailsSection) return false;

  projectDetailTitle.textContent = project.title;
  projectDetailDescription.textContent = project.description;
  projectDetailImage.src = project.image;
  projectDetailImage.alt = `Preview do projeto ${project.title}`;
  projectDetailLive.href = project.live;
  projectDetailRepo.href = project.repo;
  projectDetailTools.innerHTML = project.tools
    .map((tool) => `<div class="skills__skill">${tool}</div>`)
    .join('');

  return project;
};

const setProjectModeUi = (isOpen, projectTitle = '') => {
  document.body.classList.toggle('is-project-open', isOpen);
  projectHeaderLinks.forEach((link) => {
    if (link.classList.contains('header__link') || link.closest('.header__sm-menu-link')) {
      link.classList.toggle('header__link--active', isOpen);
    }
  });

  if (projectDetailContext) {
    projectDetailContext.textContent = isOpen ? projectTitle : '';
  }

  document.title = isOpen && projectTitle ? `Projeto | ${projectTitle}` : defaultPageTitle;
};

const openProjectDetails = (projectId, updateHash = true) => {
  const project = renderProjectDetails(projectId);
  if (!project) return;

  projectDetailsSection.classList.remove('d-none');
  setProjectModeUi(true, project.title);
  projectDetailsSection.scrollTop = 0;

  if (updateHash) {
    history.replaceState(null, '', `#${projectId}`);
  }
};

const closeProjectDetails = () => {
  if (!projectDetailsSection) return;
  projectDetailsSection.classList.add('d-none');
  setProjectModeUi(false);
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  history.replaceState(null, '', '#projects');
};

if (projectOpenButtons.length > 0 && projectDetailsSection) {
  projectOpenButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openProjectDetails(button.dataset.projectId);
    });
  });

  if (projectDetailClose) {
    projectDetailClose.addEventListener('click', closeProjectDetails);
  }

  window.addEventListener('hashchange', () => {
    const projectIdFromHash = location.hash.replace('#', '');
    if (projectsData[projectIdFromHash]) {
      openProjectDetails(projectIdFromHash, false);
      return;
    }

    projectDetailsSection.classList.add('d-none');
    setProjectModeUi(false);
  });

  const projectIdFromHash = location.hash.replace('#', '');
  if (projectsData[projectIdFromHash]) {
    openProjectDetails(projectIdFromHash, false);
  }
}

// ScrollReveal
document.addEventListener("DOMContentLoaded", function() {
  // Verifique se o ScrollReveal está carregado
  if (typeof ScrollReveal !== 'undefined') {
    console.log("ScrollReveal está carregado");

    // Configuração do ScrollReveal
    ScrollReveal().reveal('.sr-top, .sr-bottom, .sr-left, .sr-right', {
      delay: 300, // Usar o valor de $sr-delay em milissegundos
      distance: '30px', // Usar o valor de $sr-distance
      duration: 1000, // Usar o valor de $sr-duration em milissegundos
      easing: 'ease', // Usar o valor de $sr-easing
      reset: true, // Para permitir que as animações se repitam ao rolar para cima e para baixo
      afterReveal: function(el) {
        el.classList.add('sr-active');
      },
      afterReset: function(el) {
        el.classList.remove('sr-active');
      }
    });

    console.log("ScrollReveal está configurado");
  } else {
    console.log("ScrollReveal não está carregado");
  }
});

//--- Formulario

const numberOnly = (evt) => {
  const theEvent = evt || window.event;
  const key = theEvent.keyCode || theEvent.which;
  const keyValue = String.fromCharCode(key);

  // Verifica se o caractere é um número
  const regex = /^[0-9]+$/;
  if (!regex.test(keyValue)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
    return false;
  }
  return true;
};

const lettersOnly = (evt) => {
  const event = evt || window.event;
  const key = event.key;

  // Allow control/navigation keys (Backspace, Tab, Arrow keys, etc.)
  if (!key || key.length !== 1) {
    return true;
  }

  // Accept unicode letters (including accents) and space.
  return /^[\p{L}\s]$/u.test(key);
};

 function ValidateEmail() {
  var email = document.getElementById("email").value;
  var lblError = document.getElementById("lblError");
  lblError.innerHTML = "";
  var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (!expr.test(email)) {
      lblError.innerHTML = "E-mail invalido. Digite seu melhor e-mail.";
  }
}


