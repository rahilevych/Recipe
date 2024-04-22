import * as keyAPI from '../config/keyAPI.js';
import { createElem } from './createElem.js';

clearInput();
getRecipeFromAPI(keyAPI.key, keyAPI.key2);

async function getRecipeFromAPI(key1, key2) {
  try {
    /* const [data1] = await Promise.all([
      fetch(
        `https://api.spoonacular.com/recipes/random?number=150&apiKey=${key1}`
      ).then((response) => response.json),
      /* fetch(
        `https://api.spoonacular.com/recipes/random?number=150&apiKey=${key2}`
      ).then((response) => response.json),  ])*/
    const url = `https://api.spoonacular.com/recipes/random?number=150&apiKey=${key1}`;
    const url1 = `https://api.spoonacular.com/recipes/random?number=150&apiKey=${key2}`;

    // const response = await fetch(url);
    const response = await fetch('data.json');
    const data = await response.json();
    /*const response1 = await fetch(url1);
    const data1 = await response1.json();

    console.log(data);
    console.log(data1);
    const car = [...data.recipes, ...data1.recipes];
    const uData = [...new Set(car)]; //new Set(car);
    let arr = Array.from(uData);

    console.log(arr);
    createMainRecipeNewSection(arr);*/
    let newD = [];
    data.recipes.forEach((element) => {
      if (element.cuisines.length > 0) {
        newD.push(element);
      }
    });
    console.log(newD);
    createDishCheckbox(newD);
    createCuisineCheckbox(newD);
    createMainRecipeNewSection(newD);

    //search(arr);
    //filterData(arr);
    search(newD);
    filterData(newD);

    //return uData;
  } catch (error) {
    console.error(error);
  }
}

function createMainRecipeNewSection(data) {
  for (let i = 0; i < data.length; i++) {
    createCard(i, data);
  }
}

function createCard(i, data) {
  const parentElem = document.querySelector('.recipe__items');
  const options = {
    type: 'div',
    className: ['recipe__item'],
  };
  createElem(parentElem, options);

  const parentElemDiv = document.querySelectorAll('.recipe__item')[i];

  const optionsDiv = {
    type: 'div',
    className: ['recipe__img'],
  };
  createElem(parentElemDiv, optionsDiv);
  const parentElemImg = document.querySelectorAll('.recipe__img')[i];
  const optionsImg = {
    type: 'img',
    src: data[i].image,
  };
  createElem(parentElemImg, optionsImg);
  const parentElemCuisine = document.querySelectorAll('.recipe__item')[i];
  const optionsCuisine = {
    type: 'p',
    className: ['recipe__cuisine'],
    content: data[i].cuisines.join(' \u2736 '),
  };
  createElem(parentElemCuisine, optionsCuisine);
  const parentElemTitle = document.querySelectorAll('.recipe__item')[i];
  const optionsTitle = {
    type: 'p',
    className: ['recipe__title'],
    content: data[i].title,
  };
  createElem(parentElemTitle, optionsTitle);

  const parentElemDish = document.querySelectorAll('.recipe__item')[i];
  const optionsDish = {
    type: 'p',
    className: ['recipe__dish'],
    content: data[i].dishTypes.join(' \u2736 '),
  };
  createElem(parentElemDish, optionsDish);
}

function search(data) {
  const input = document.querySelector('.search-input');
  const closeBtn = document.querySelector('.close');

  input.addEventListener('input', () => {
    let result = data.filter((recipe) =>
      recipe.title.toLowerCase().includes(input.value.toLowerCase())
    );
    console.log(result);
    if (input.value !== '') {
      closeBtn.style.display = 'block';
    } else {
      closeBtn.style.display = 'none';
    }

    clearHtml('.recipe__items');
    createMainRecipeNewSection(result);
  });
}

function createListUniqueDish(data) {
  const uniqueItems = new Set();

  for (let i = 0; i < data.length; i++) {
    const recipe = data[i].dishTypes;

    recipe.forEach((dish) => {
      if (!uniqueItems.has(dish)) {
        uniqueItems.add(dish);
      }
    });
  }
  return uniqueItems;
}
function createListUniqueCuisines(data) {
  const uniqueItems = new Set();

  for (let i = 0; i < data.length; i++) {
    const recipe = data[i].cuisines;

    recipe.forEach((dish) => {
      if (!uniqueItems.has(dish)) {
        uniqueItems.add(dish);
      }
    });
  }
  return uniqueItems;
}

function createDishCheckbox(data) {
  let variants = createListUniqueDish(data);
  const parentElemBlock = document.querySelector('.filters__block');
  const optionsBlock = {
    type: 'div',
    className: ['filter__group', 'filter__dish'],
  };
  createElem(parentElemBlock, optionsBlock);

  const parentElemLabel = document.querySelector('.filter__dish');
  const optionsTitle = {
    type: 'div',
    className: ['filter-title', 'filter__dish-title'],
  };
  createElem(parentElemLabel, optionsTitle);

  const parentElemP = document.querySelector('.filter__dish-title');
  const optionsLabel = {
    type: 'p',
    content: 'Choose dish type',
  };
  createElem(parentElemP, optionsLabel);

  const optionsSelect = {
    type: 'i',
    className: ['ph', 'ph-caret-down'],
  };
  createElem(parentElemP, optionsSelect);

  const parentElemOption = document.querySelector('.filter__dish');
  variants.forEach((variant, index) => {
    const optionsLabel = {
      type: 'label',
    };
    const label = createElem(parentElemOption, optionsLabel);
    const optionsOptionLab = {
      type: 'input',
      value: variant,
      typeAttr: 'checkbox',
      nameAttr: 'dish',
    };
    createElem(label, optionsOptionLab);
    const labelText = document.createTextNode(variant);
    label.appendChild(labelText);
  });
}

function createCuisineCheckbox(data) {
  let variants = createListUniqueCuisines(data);

  const parentElemBlock = document.querySelector('.filters__block');
  const optionsBlock = {
    type: 'div',
    className: ['filter__group', 'filter__cuisine'],
  };
  createElem(parentElemBlock, optionsBlock);

  const parentElemLabel = document.querySelector('.filter__cuisine');
  const optionsTitle = {
    type: 'div',
    className: ['filter-title', 'filter__cuisine-title'],
  };
  createElem(parentElemLabel, optionsTitle);

  const parentElemP = document.querySelector('.filter__cuisine-title');
  const optionsLabel = {
    type: 'p',
    content: 'Choose cuisine',
  };
  createElem(parentElemP, optionsLabel);

  const optionsSelect = {
    type: 'i',
    className: ['ph', 'ph-caret-down'],
  };
  createElem(parentElemP, optionsSelect);

  const parentElemOption = document.querySelector('.filter__cuisine');
  variants.forEach((variant, index) => {
    const optionsLabel = {
      type: 'label',
    };
    const label = createElem(parentElemOption, optionsLabel);
    const optionsOptionLab = {
      type: 'input',
      value: variant,
      typeAttr: 'checkbox',
      nameAttr: 'cuisine',
    };
    createElem(label, optionsOptionLab);
    const labelText = document.createTextNode(variant);
    label.appendChild(labelText);
  });
}

function filterByDishType(data) {
  const checkboxes = document.querySelectorAll('input[name="dish"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      applyFilters(data);
    });
  });
}

function filterByCuisine(data) {
  const checkboxes = document.querySelectorAll('input[name="cuisine"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      applyFilters(data);
    });
  });
}

function applyFilters(data) {
  const selectedDishTypes = Array.from(
    document.querySelectorAll('input[name="dish"]:checked')
  ).map((checkbox) => checkbox.value.toLowerCase());
  const selectedCuisines = Array.from(
    document.querySelectorAll('input[name="cuisine"]:checked')
  ).map((checkbox) => checkbox.value);

  let result = data;

  if (selectedDishTypes.length > 0) {
    result = result.filter((recipe) =>
      selectedDishTypes.some((dishType) => recipe.dishTypes.includes(dishType))
    );
  }

  if (selectedCuisines.length > 0) {
    result = result.filter((recipe) =>
      selectedCuisines.some((cuisine) => recipe.cuisines.includes(cuisine))
    );
  }

  clearHtml('.recipe__items');
  createMainRecipeNewSection(result);
}

function filterData(data) {
  filterByDishType(data);
  filterByCuisine(data);
}

function clearInput() {
  const input = document.querySelector('.search-input');
  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    if (input.value !== '') {
      input.value = '';
      closeBtn.style.display = 'none';
      clearHtml('.filters__block');
      clearHtml('.recipe__items');
      getRecipeFromAPI();
    }
  });
}

function clearHtml(elem) {
  document.querySelector(`${elem}`).innerHTML = '';
}
