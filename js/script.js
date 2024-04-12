createNav();
createWrapper();
createLogo();
createNavLinks();
createLogin();
createMainBlock();
createMainRecipeNewSection();

function createElem(parentElem, options) {
  const { type, className, content, href } = options;
  const newElem = document.createElement(type);

  if (content) {
    newElem.innerText = content;
  }

  if (href) {
    newElem.setAttribute('href', href);
  }
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
  };
  const parentElem = document.querySelector('.nav__block');
  createElem(parentElem, options);
}
function createNav() {
  const parentElem = document.querySelector('.wrapper');
  const options = {
    type: 'nav',
    className: ['nav__block'],
  };
  createElem(parentElem, options);
}

function createNavLinks() {
  const parentElem = document.querySelector('.nav__container');
  const optionsUl = {
    type: 'ul',
    className: ['nav__list'],
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
  };
  const optionsI = {
    type: 'i',
    className: ['ph', 'ph-fork-knife'],
  };
  const optionsP = {
    type: 'p',

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
  };
  const optionsI = {
    type: 'i',
    className: ['ph', 'ph-user'],
  };

  createElem(parentContainer, optionsDiv);
  const divLogin = document.querySelector('.nav__login');
  createElem(divLogin, optionsI);
}
function createMainBlock() {
  const parentElem = document.querySelector('.wrapper');
  const options = {
    type: 'main',
    className: ['main'],
  };
  createElem(parentElem, options);
  const parentElemMain = document.querySelector('.main');
  const optionsContainer = {
    type: 'div',
    className: ['container', 'main__container'],
  };
  createElem(parentElemMain, optionsContainer);
}
function createMainRecipeNewSection() {
  const parentElem = document.querySelector('.main__container');
  const options = {
    type: 'section',
    className: ['new'],
  };
  createElem(parentElem, options);
  const parentElemItemsBlock = document.querySelector('.new');
  const optionsItemsBlock = {
    type: 'div',
    className: ['new__items'],
  };
  createElem(parentElemItemsBlock, optionsItemsBlock);
}
