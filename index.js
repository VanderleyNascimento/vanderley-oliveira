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

headerLogoContainer.addEventListener('click', () => {
  location.href = 'index.html';
});

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
  const charCode = event.keyCode || event.which;
  const isSpace = charCode == 32;
  const isBackspace = charCode == 8;
  const isUppercaseChars = charCode > 64 && charCode < 91;
  const isLowercaseChars = charCode > 96 && charCode < 123;
  return (isUppercaseChars || isLowercaseChars || isBackspace || isSpace);
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


