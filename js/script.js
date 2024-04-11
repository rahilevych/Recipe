createNav(createElem);
createWrapper(createElem);
createNavLinks(createElem);

function createElem(parentElem, type, className, content) {
  const newElem = document.createElement(type);
  newElem.innerText = content;
  for (let i = 0; i < className.length; i++) {
    newElem.classList.add(className[i]);
  }

  parentElem.appendChild(newElem);
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
function createListElem(createElem) {
  const parentElem = document.querySelector('.nav__container');
  const type = 'li';
  const className = ['nav__list'];
  const content = null;
  createElem(parentElem, type, className, content);
}
function createNavLinks(createElem) {
  const parentElem = document.querySelector('.nav__container');
  const type = 'ul';
  const className = ['nav', 'justify-content-end'];
  const content = null;
  createElem(parentElem, type, className, content);
}
