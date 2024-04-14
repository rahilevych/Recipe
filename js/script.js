import * as keyAPI from '../config/keyAPI.js';
createNav();
createWrapper();
createLogo();
createNavLinks();
createLogin();
createMainBlock();
//createMainRecipeNewSection();

function createElem(parentElem, options) {
  const { type, className, content, href, src } = options;
  const newElem = document.createElement(type);

  if (content) {
    newElem.innerText = content;
  }

  if (href) {
    newElem.setAttribute('href', href);
  }
  if (src) {
    newElem.setAttribute('src', src);
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
function createMainRecipeNewSection(data) {
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
  for (let i = 0; i < data.hits.length; i++) {
    createCard(i, data);
  }
}
function createCard(i, data) {
  const parentElem = document.querySelector('.new__items');
  const options = {
    type: 'div',
    className: ['new__item'],
  };
  createElem(parentElem, options);
  const parentElemDiv = document.querySelectorAll('.new__item')[i];
  const optionsDiv = {
    type: 'div',
    className: ['new__img'],
  };
  createElem(parentElemDiv, optionsDiv);
  const parentElemImg = document.querySelectorAll('.new__img')[i];
  const optionsImg = {
    type: 'img',
    src: data.hits[i].recipe.image,
  };
  createElem(parentElemImg, optionsImg);
  const parentElemTitle = document.querySelectorAll('.new__item')[i];
  const optionsTitle = {
    type: 'p',
    className: ['new__title'],
    content: data.hits[i].recipe.label,
  };
  createElem(parentElemTitle, optionsTitle);
  const parentElemDeskr = document.querySelectorAll('.new__item')[i];
  const optionsDeskr = {
    type: 'p',
    className: ['new__deskr'],
    content:
      'Lrem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text everscrambled it to make a type specimen book.',
  };
  createElem(parentElemDeskr, optionsDeskr);
  const parentElemBtn = document.querySelectorAll('.new__item')[i];
  const optionsBtn = {
    type: 'a',
    className: ['new__btn'],
    content: 'READ MORE',
  };
  createElem(parentElemBtn, optionsBtn);
}
async function getRecipeFromAPI(key, id) {
  const url = `https://api.edamam.com/search?q=chicken&app_id=${id}&app_key=${key}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    createMainRecipeNewSection(data);
  } catch (error) {}
}
function getData(data) {
  console.log(data);
}
getRecipeFromAPI(keyAPI.key, keyAPI.id);
