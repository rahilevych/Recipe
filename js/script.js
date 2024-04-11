createWrapper(createElem);

function createElem(parentElem, type, className, content) {
  const newElem = document.createElement(type);
  newElem.innerText = content;
  newElem.className = className;
  parentElem.appendChild(newElem);
}
function createWrapper(createElem) {
  const wrapper = document.querySelector('.wrapper');
  const type = 'div';
  const className = 'container';
  const content = null;
  createElem(wrapper, type, className, content);
}
