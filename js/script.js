createNav(createElem);
createWrapper(createElem);
createLogo(createElem);
createNavLinks(createElem);
createLogin(createElem);

function createElem(parentElem, type, className, content) {
  const newElem = document.createElement(type);
  newElem.innerText = content;
  if (className) {
    for (let i = 0; i < className.length; i++) {
      newElem.classList.add(className[i]);
    }
  }

  parentElem.appendChild(newElem);
  return newElem;
}

function createWrapper(createElem) {
  const parentElem = document.querySelector('.nav__block');
  const type = 'div';
  const className = ['container', 'nav__container'];
  const content = null;
  createElem(parentElem, type, className, content);
}
function createNav(createElem) {
  const parentElem = document.querySelector('.wrapper');
  const type = 'nav';
  const className = ['nav__block'];
  const content = null;
  createElem(parentElem, type, className, content);
}

function createNavLinks(createElem) {
  const parentElem = document.querySelector('.nav__container');
  const typeParent = 'ul';
  const classNameParent = ['nav__list'];
  const contentParent = null;

  createElem(parentElem, typeParent, classNameParent, contentParent);
  const ul = document.querySelector('.nav__list');
  const arrLinks = [
    'Home',
    'Recipe',
    'Categories',
    'Surprise Me',
    'Saved Recipe',
  ];
  for (let i = 0; i < arrLinks.length; i++) {
    const typeLi = 'li';
    const classNameLi = ['nav__item'];
    const contentLi = null;
    createElem(ul, typeLi, classNameLi, contentLi);
    const li = document.querySelectorAll('.nav__item')[i];
    const typeA = 'a';
    const classNameA = ['nav__link'];
    const contentA = arrLinks[i];
    createElem(li, typeA, classNameA, contentA);
  }
}
function createLogo(createElem) {
  const parentContainer = document.querySelector('.nav__container');
  const typeDiv = 'div';
  const classNameDiv = ['nav__logo'];
  const contentDiv = null;
  const typeI = 'i';
  const classNameI = ['ph', 'ph-fork-knife'];
  const contentI = '';
  createElem(parentContainer, typeDiv, classNameDiv, contentDiv);
  const divLogo = document.querySelector('.nav__logo');
  createElem(divLogo, typeI, classNameI, contentI);
  const typeP = 'p';
  const classNameP = null;
  const contentP = 'COOK';
  createElem(divLogo, typeP, classNameP, contentP);
}
function createLogin(createElem) {
  const parentContainer = document.querySelector('.nav__container');
  const typeDiv = 'div';
  const classNameDiv = ['nav__login'];
  const contentDiv = null;
  const typeI = 'i';
  const classNameI = ['ph', 'ph-user'];
  const contentI = '';
  createElem(parentContainer, typeDiv, classNameDiv, contentDiv);
  const divLogin = document.querySelector('.nav__login');
  createElem(divLogin, typeI, classNameI, contentI);
}
