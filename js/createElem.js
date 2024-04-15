export function createElem(parentElem, options) {
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
