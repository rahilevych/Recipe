createNav();
createWrapper();
createLogo();
createNavLinks();
createLogin();

function createElem(parentElem, options) {
  const { type, className, content } = options;
  const newElem = document.createElement(type);
  newElem.innerText = content;
  if (className) {
    newElem.classList.add(...className);
  }

  parentElem.appendChild(newElem);
  return newElem;
}

function createWrapper() {
  const options = {
    type: 'div',
    className: ['container', 'nav__container'],
    content: '',
  };
  const parentElem = document.querySelector('.nav__block');
  createElem(parentElem, options);
}
function createNav() {
  const parentElem = document.querySelector('.wrapper');
  const options = {
    type: 'nav',
    className: ['nav__block'],
    content: '',
  };
  createElem(parentElem, options);
}

function createNavLinks() {
  const parentElem = document.querySelector('.nav__container');
  const optionsUl = {
    type: 'ul',
    className: ['nav__list'],
    content: '',
  };

  createElem(parentElem, optionsUl);
  const ul = document.querySelector('.nav__list');
  const arrLinks = [
    'Home',
    'Recipe',
    'Categories',
    'Surprise Me',
    'Saved Recipe',
  ];
  for (let i = 0; i < arrLinks.length; i++) {
    const optionsLi = {
      type: 'li',
      className: ['nav__item'],
      content: '',
    };
    createElem(ul, optionsLi);
    const li = document.querySelectorAll('.nav__item')[i];
    const optionsA = {
      type: 'a',
      className: ['nav__link'],
      content: arrLinks[i],
    };

    createElem(li, optionsA);
  }
}
function createLogo() {
  const parentContainer = document.querySelector('.nav__container');
  const optionsDiv = {
    type: 'div',
    className: ['nav__logo'],
    content: '',
  };
  const optionsI = {
    type: 'i',
    className: ['ph', 'ph-fork-knife'],
    content: '',
  };
  const optionsP = {
    type: 'p',
    className: '',
    content: 'COOK',
  };
  createElem(parentContainer, optionsDiv);
  const divLogo = document.querySelector('.nav__logo');
  createElem(divLogo, optionsI);
  createElem(divLogo, optionsP);
}
function createLogin() {
  const parentContainer = document.querySelector('.nav__container');
  const optionsDiv = {
    type: 'div',
    className: ['nav__login'],
    content: '',
  };
  const optionsI = {
    type: 'i',
    className: ['ph', 'ph-user'],
    content: '',
  };

  createElem(parentContainer, optionsDiv);
  const divLogin = document.querySelector('.nav__login');
  createElem(divLogin, optionsI);
}
