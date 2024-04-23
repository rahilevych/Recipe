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

    const response = await fetch(url);
    const data = await response.json();
    //const response = await fetch('data.json');
    //const data = await response.json();
    const response1 = await fetch(url1);
    const data1 = await response1.json();

    console.log(data);
    console.log(data1);
    const car = [...data.recipes, ...data1.recipes];
    const uData = [...new Set(car)]; //new Set(car);
    let arr = Array.from(uData);

    console.log(arr);
    //createMainRecipeNewSection(arr);
    let newD = [];
    arr.forEach((element) => {
      if (element.cuisines.length > 0) {
        newD.push(element);
      }
    });
    console.log(newD);

    createDishCheckbox(newD);
    createCuisineCheckbox(newD);
    clickArrowDish();
    clickArrowCuisine();
    // createMainRecipeNewSection(newD);
    showLimitedItemsProPage(newD, 1);

    //search(arr);
    //filterData(arr);
    search(newD);
    filterData(newD);

    //return uData;
  } catch (error) {
    console.error(error);
  }
}

/*function createMainRecipeNewSection(data) {
  for (let i = 0; i < data.length; i++) {
    createCard(i, data);
  }
}*/

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
function createNo() {
  const parentElem = document.querySelector('.recipe__items');
  const options = {
    type: 'div',
    className: ['recipe__no'],
  };
  createElem(parentElem, options);

  const parentElemI = document.querySelector('.recipe__no');

  const optionsI = {
    type: 'i',
    className: ['ph', 'ph-smiley-sad'],
  };
  createElem(parentElemI, optionsI);

  const optionsP = {
    type: 'p',
    content: 'No matches',
  };
  createElem(parentElemI, optionsP);
}
function search(data) {
  const input = document.querySelector('.search-input');
  const inputRecipe = document.querySelector('.recipe__input');
  const closeBtn = document.querySelector('.close');
  const recipeBlock = document.querySelector('.recipe__items');
  const recipeFiltering = document.querySelector('.recipe__filtering');
  const checkboxesDish = document.querySelectorAll('input[name="dish"]');
  const checkboxesCuisine = document.querySelectorAll('input[name="cuisine"]');
  input.addEventListener('input', () => {
    let result = data.filter((recipe) =>
      recipe.title.toLowerCase().includes(input.value.toLowerCase())
    );
    checkboxesDish.forEach((checkbox) => {
      checkbox.checked = false;
    });
    checkboxesCuisine.forEach((checkbox) => {
      checkbox.checked = false;
    });
    if (input.value !== '') {
      closeBtn.style.display = 'block';
      inputRecipe.style.paddingLeft = '3rem';
    } else {
      closeBtn.style.display = 'none';
      inputRecipe.style.paddingLeft = '0rem';
    }
    console.log(result);

    if (result.length > 0) {
      clearHtml('.recipe__items');
      clearHtml('.recipe__pagination');

      recipeBlock.style.justifyContent = 'space-between';
      recipeFiltering.style.alignItems = 'start';
      showLimitedItemsProPage(result, 1);
    } else {
      clearHtml('.recipe__items');
      clearHtml('.recipe__pagination');
      recipeBlock.style.justifyContent = 'center';
      recipeFiltering.style.alignItems = 'center';

      createNo();
    }
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
    className: ['ph', 'ph-caret-down', 'arrow'],
  };
  createElem(parentElemP, optionsSelect);
  const optionsDiv = {
    type: 'div',
    className: ['filter__dishes', 'filter__block'],
  };
  createElem(parentElemLabel, optionsDiv);

  const parentElemOption = document.querySelector('.filter__dishes');
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
    className: ['ph', 'ph-caret-down', 'arrow__cuisine'],
  };
  createElem(parentElemP, optionsSelect);

  const optionsDiv = {
    type: 'div',
    className: ['filter__cuisines', 'filter__block'],
  };
  createElem(parentElemLabel, optionsDiv);

  const parentElemOption = document.querySelector('.filter__cuisines');
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
function clickArrowDish() {
  const arrow = document.querySelector('.arrow');
  const filterBlock = document.querySelector('.filter__dishes');

  arrow.addEventListener('click', () => {
    if (filterBlock.style.display === 'flex') {
      filterBlock.style.display = 'none';
    } else {
      filterBlock.style.display = 'flex';
    }
  });
}
function clickArrowCuisine() {
  const arrow = document.querySelector('.arrow__cuisine');
  const filterBlock = document.querySelector('.filter__cuisines');

  arrow.addEventListener('click', () => {
    if (filterBlock.style.display === 'flex') {
      filterBlock.style.display = 'none';
    } else {
      filterBlock.style.display = 'flex';
    }
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
  const recipeBlock = document.querySelector('.recipe__items');
  const recipeFiltering = document.querySelector('.recipe__filtering');
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
  if (result.length > 0) {
    clearHtml('.recipe__items');
    clearHtml('.recipe__pagination');

    recipeBlock.style.justifyContent = 'space-between';
    recipeFiltering.style.alignItems = 'start';
    showLimitedItemsProPage(result, 1);
  } else {
    clearHtml('.recipe__items');
    clearHtml('.recipe__pagination');
    recipeBlock.style.justifyContent = 'center';
    recipeFiltering.style.alignItems = 'center';

    createNo();
  }
}

function filterData(data) {
  filterByDishType(data);
  filterByCuisine(data);
}

function clearInput() {
  const input = document.querySelector('.search-input');
  const inputRecipe = document.querySelector('.recipe__input');
  const closeBtn = document.querySelector('.close');
  const recipeFiltering = document.querySelector('.recipe__filtering');
  closeBtn.addEventListener('click', () => {
    if (input.value !== '') {
      input.value = '';
      inputRecipe.style.paddingLeft = '0rem';
      closeBtn.style.display = 'none';
      clearHtml('.filters__block');
      clearHtml('.recipe__items');
      clearHtml('.recipe__pagination');
      recipeFiltering.style.alignItems = 'start';
      getRecipeFromAPI();
    }
  });
}

function clearHtml(elem) {
  document.querySelector(`${elem}`).innerHTML = '';
}

function devideDataForPagination(data) {
  const numberOfElementsProPage = 12;
  const pagesAmount = Math.ceil(data.length / numberOfElementsProPage);

  return pagesAmount;
}

function createNavPagination(data) {
  const pages = devideDataForPagination(data);

  const parentElem = document.querySelector('.recipe');
  const options = {
    type: 'div',
    className: ['recipe__pagination'],
  };
  if (!document.querySelector('.recipe__pagination')) {
    createElem(parentElem, options);
  }

  for (let i = 0; i < pages; i++) {
    const parentElemBtn = document.querySelector('.recipe__pagination');
    const optionsBtn = {
      type: 'div',
      className: ['recipe__pagination-btn'],
      content: `${i + 1}`,
    };
    createElem(parentElemBtn, optionsBtn);
  }
}

function clickPaginationBtn(data) {
  const elementToRemove = document.querySelector('.recipe__pagination');
  const btns = document.querySelectorAll('.recipe__pagination-btn');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      let content = btn.textContent;

      clearHtml('.recipe__items');
      clearHtml('.recipe__pagination');
      elementToRemove.remove();
      showLimitedItemsProPage(data, content);
      console.log(content);

      /*   if ((btn.style.backgroundColor = 'white')) {
        btn.style.backgroundColor = '#d7e3ae';
      } else {
        btn.style.backgroundColor = 'white';
      }*/
    });
  });
}
function showLimitedItemsProPage(data, index) {
  createNavPagination(data);
  clickPaginationBtn(data);
  const numberItems = 12;
  let startPoint = (index - 1) * numberItems;
  let endPoint = startPoint + numberItems;
  let arr = data.slice(startPoint, endPoint);
  const pages = devideDataForPagination(data);
  for (let i = 0; i < arr.length; i++) {
    createCard(i, arr);
  }
}
