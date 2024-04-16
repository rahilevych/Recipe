export function createElem(parentElem, options) {
  const {
    type,
    className,
    content,
    href,
    src,
    forAttribute,
    typeAttr,
    id,
    nameAttr,
    placeholder,
    value,
  } = options;
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
  if (forAttribute) {
    newElem.setAttribute('for', forAttribute);
  }
  if (typeAttr) {
    newElem.setAttribute('type', typeAttr);
  }
  if (nameAttr) {
    newElem.setAttribute('name', nameAttr);
  }
  if (id) {
    newElem.setAttribute('id', id);
  }
  if (value) {
    newElem.setAttribute('value', value);
  }
  if (placeholder) {
    newElem.setAttribute('placeholder', placeholder);
  }
  if (className) {
    newElem.classList.add(...className);
  }

  parentElem.appendChild(newElem);
  return newElem;
}
