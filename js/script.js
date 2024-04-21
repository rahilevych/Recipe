import * as keyAPI from '../config/keyAPI.js';
import { createElem } from './createElem.js';

//createDishTypeDropDown();
//createCuisineDropDown();

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

function createMainCategorySection(categoriesWithImages) {
  const parentElem = document.querySelector('.main__container');
  const options = {
    type: 'section',
    className: ['popular-categories'],
  };
  createElem(parentElem, options);
  const parentElemItemsTitle = document.querySelector('.popular-categories');
  const optionsItemsTitle = {
    type: 'h2',
    className: ['title'],
    content: 'Popular Categories',
  };
  createElem(parentElemItemsTitle, optionsItemsTitle);
  const parentElemItemsBlock = document.querySelector('.popular-categories');
  const optionsItemsBlock = {
    type: 'div',
    className: ['popular-categories__block'],
  };
  createElem(parentElemItemsBlock, optionsItemsBlock);
  for (let i = 0; i < 8; i++) {
    createCategory(i, categoriesWithImages);
  }
}
function createCategory(i, categoriesWithImages) {
  const parentElem = document.querySelector('.popular-categories__block');
  const options = {
    type: 'a',
    className: ['popular-categories__item'],
  };
  createElem(parentElem, options);

  const parentElemImg = document.querySelectorAll('.popular-categories__item')[
    i
  ];
  const optionsImg = {
    type: 'img',
    src: categoriesWithImages[i].image,
  };
  createElem(parentElemImg, optionsImg);
  const parentElemTitle = document.querySelectorAll(
    '.popular-categories__item'
  )[i];
  const optionsTitle = {
    type: 'p',
    className: ['.popular-categories__title'],
    content: categoriesWithImages[i].category,
  };
  createElem(parentElemTitle, optionsTitle);
}
async function getPopularCategoryFromAPI(key) {
  const url = 'https://all-in-one-recipe-api.p.rapidapi.com/categories';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'all-in-one-recipe-api.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
function createMainRecipeNewSection(data) {
  /* const parentElem = document.querySelector('.main__container');
  const options = {
    type: 'section',
    className: ['new'],
  };
  createElem(parentElem, options);*/
  /* const parentElemItemsTitle = document.querySelector('.new');
  const optionsItemsTitle = {
    type: 'h2',
    className: ['title'],
    content: 'Try something new',
  };
  createElem(parentElemItemsTitle, optionsItemsTitle);*/

  const parentElemItemsBlock = document.querySelector('.new');

  const optionsItemsBlock = {
    type: 'div',
    className: ['new__items'],
  };
  createElem(parentElemItemsBlock, optionsItemsBlock);
  let c = 0;
  for (let i = 0; i < data.length; i++) {
    createCard(i, data);
  }
  console.log(c);
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
    src: data[i].image,
  };
  createElem(parentElemImg, optionsImg);
  const parentElemCuisine = document.querySelectorAll('.new__item')[i];
  const optionsCuisine = {
    type: 'p',
    className: ['new__cuisine'],
    content: data[i].cuisines.join(' \u2736 '),
  };
  createElem(parentElemCuisine, optionsCuisine);
  const parentElemTitle = document.querySelectorAll('.new__item')[i];
  const optionsTitle = {
    type: 'p',
    className: ['new__title'],
    content: data[i].title,
  };
  createElem(parentElemTitle, optionsTitle);

  const parentElemDish = document.querySelectorAll('.new__item')[i];
  const optionsDish = {
    type: 'p',
    className: ['new__dish'],
    content: data[i].dishTypes.join(' \u2736 '),
  };
  createElem(parentElemDish, optionsDish);
  /* const parentElemDeskr = document.querySelectorAll('.new__item')[i];
  const optionsDeskr = {
    type: 'p',
    className: ['new__deskr'],
    content: limitCharacters(removeHtmlTags(data[i].summary), 200),
  };
  createElem(parentElemDeskr, optionsDeskr);*/

  /*const parentElemCuisine = document.querySelectorAll('.new__item')[i];
  const optionsCuisine = {
    type: 'p',
    className: ['new__cuisine'],
    content: data[i].cuisines.array.forEach((element) => {
      element;
    }),
  };
  createElem(parentElemCuisine, optionsCuisine);*/
  /*
  const parentElemBtn = document.querySelectorAll('.new__item')[i];
  const optionsBtn = {
    type: 'a',
    className: ['new__btn'],
    content: 'READ MORE',
  };
  createElem(parentElemBtn, optionsBtn);*/
}
/*async function getRecipeFromAPI(key, key2, id) {
  //const url = `https://api.edamam.com/search?q=chicken&app_id=${id}&app_key=${key}`;
  //const limit = 9; // 
  const url = `https://api.spoonacular.com/recipes/random?number=150&apiKey=${key}`;
  //const url2 = `https://api.spoonacular.com/recipes/random?number=2000&apiKey=${key2}`;
  try {
    //const response = await fetch('../data.json');
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    createMainRecipeNewSection(data.recipes);
    //search(data.recipes);
    filterData(data.recipes);
    /*const categoriesWithImages = [];
    const uniqueCategories = new Set();

    for (let i = 0; i < data.recipes.length; i++) {
      const recipe = data.recipes[i];
      recipe.dishTypes.forEach((category) => {
        if (!uniqueCategories.has(category)) {
          uniqueCategories.add(category);
          categoriesWithImages.push({
            category: category,
            image: recipe.image,
          });
        }
      });
    }
    createMainCategorySection(categoriesWithImages);*/
//  console.log(categoriesWithImages);
// } catch (error) {}
//}
//*/
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
    createDishTypeDropDown(newD);
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
function limitCharacters(input, limit) {
  if (input.length > limit) {
    return input.slice(0, limit) + '...';
  }
  return input;
}

function removeHtmlTags(input) {
  return input.replace(/<[^>]*>?/gm, '');
}
getRecipeFromAPI(keyAPI.key, keyAPI.key2);
//getPopularCategoryFromAPI(keyAPI.key);
function createSearch() {
  const parentElem = document.querySelector('.main__container');
  const options = {
    type: 'section',
    className: ['search'],
  };
  createElem(parentElem, options);
  const parentElemForm = document.querySelector('.search');
  const optionsForm = {
    type: 'form',
    className: ['search__form'],
  };
  createElem(parentElemForm, optionsForm);
  const parentElemBlock = document.querySelector('.search__form');
  const optionsBlock = {
    type: 'div',
    className: ['form-group', 'input-block'],
  };
  createElem(parentElemBlock, optionsBlock);
  const parentElemLabel = document.querySelector('.form-group');
  /*const optionsLabel = {
    type: 'label',
    forAttribute: 'search',
  };
  createElem(parentElemLabel, optionsLabel);*/

  const optionsInput = {
    type: 'input',
    nameAttr: 'search',
    className: ['search-input'],
    placeholder: 'Search',
    typeAttr: 'text',
  };
  createElem(parentElemLabel, optionsInput);
  /*const optionsBtn = {
    type: 'button',
    className: ['form-btn'],
  };
  createElem(parentElemLabel, optionsBtn);*/

  const parentElemI = document.querySelector('.input-block');
  const optionsI = {
    type: 'i',
    className: ['ph', 'ph-magnifying-glass'],
  };
  createElem(parentElemI, optionsI);
}
function createFilterBlock() {
  const parentElemBlock = document.querySelector('.search__form');
  const optionsBlock = {
    type: 'div',
    className: ['drop-list__block'],
  };
  createElem(parentElemBlock, optionsBlock);
}
function search(data) {
  const input = document.querySelector('.search-input');
  const closeBtn = document.querySelector('.close');
  const filterCuisine = document.querySelector('#cuisine');
  const filterType = document.querySelector('#type');
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

    filterType.value = 'Sort by dish type';
    filterCuisine.value = 'Sort by cuisine';
    clearHtml('.new');
    createMainRecipeNewSection(result);
  });
}
clearInput();
function clearInput() {
  const input = document.querySelector('.search-input');
  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    if (input.value !== '') {
      input.value = '';
      closeBtn.style.display = 'none';
      getRecipeFromAPI();
    }
  });
}
function clearHtml(elem) {
  document.querySelector(`${elem}`).innerHTML = '';
}

function createListUnique(data) {
  const uniqueItems = new Set();
  for (let i = 0; i < data.length; i++) {
    const recipe = data[i];
    recipe.dishTypes.forEach((dishType) => {
      if (!uniqueItems.has(dishType)) {
        uniqueItems.add(dishType);
      }
    });
  }
  return uniqueItems;
}

function createDishTypeDropDown(data) {
  let variants = createListUnique(data);
  const parentElemBlock = document.querySelector('.drop-list__block');
  const optionsBlock = {
    type: 'div',
    className: ['form-group'],
  };
  createElem(parentElemBlock, optionsBlock);

  const parentElemLabel = document.querySelector('.form-group');
  const optionsTitle = {
    type: 'div',
    className: ['form-title'],
  };
  createElem(parentElemLabel, optionsTitle);

  const parentElemP = document.querySelector('.form-title');
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

  const parentElemOption = document.querySelector('.form-group');
  variants.forEach((variant, index) => {
    const optionsLabel = {
      type: 'label',
    };
    const label = createElem(parentElemOption, optionsLabel);
    const optionsOptionLab = {
      type: 'input',
      value: variant,
      typeAttr: 'checkbox',
      nameAttr: 'check',
    };
    createElem(label, optionsOptionLab);
    const labelText = document.createTextNode(variant);
    label.appendChild(labelText);
  });
}

/*function filterByDishType(data, callback) {
  const list = document.querySelector('#type');

  list.addEventListener('change', (e) => {
    let result = data.filter((recipe) =>
      recipe.dishTypes.includes(e.target.value.toLowerCase())
    );
    console.log(result);
    let flag1 = true;
    if (typeof callback === 'function') {
      callback(result, flag1);
    }
    clearHtml('.new');
    createMainRecipeNewSection(result);
  });
}*/

function createCuisineDropDown() {
  const variants = [
    'Sort by cuisine',
    'African',
    'Asian',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese',
  ];
  const parentElemBlock = document.querySelector('.drop-list__block');
  const optionsBlock = {
    type: 'div',
    className: ['form-group', 'dropdown-cuisine'],
  };
  createElem(parentElemBlock, optionsBlock);
  const parentElemLabel = document.querySelector('.dropdown-cuisine');
  /* const optionsLabel = {
    type: 'label',
    forAttribute: 'cuisine',
    content: 'Choose cuisine',
  };
  createElem(parentElemLabel, optionsLabel);*/
  const optionsSelect = {
    type: 'select',
    nameAttr: 'cuisine',
    id: 'cuisine',
  };
  createElem(parentElemLabel, optionsSelect);
  const parentElemOption = document.querySelector('#cuisine');
  for (let i = 0; i < variants.length; i++) {
    const optionsOption = {
      type: 'option',
      value: variants[i],
      content: variants[i],
    };
    createElem(parentElemOption, optionsOption);
  }
}
/*function filterByCuisine(data, callback) {
  const list = document.querySelector('#cuisine');

  list.addEventListener('change', (e) => {
    let result = data.filter((recipe) => {
      return recipe.cuisines.includes(e.target.value);
    });
    console.log(result);
    let flag2 = true;
    if (typeof callback === 'function') {
      callback(result, flag2);
    }
    clearHtml('.new');
    createMainRecipeNewSection(result);
  });
}*/

/*function filterData(data) {
  filterByDishType(data, (result, flag1) => {
    if (flag1) {
      filterByCuisine(result, (flag2) => {
        flag1 = false;
        flag2 = false;
      });
    } else {
      filterByCuisine(data, (result) => {});
    }
  });

  filterByCuisine(data, (result, flag2) => {
    if (flag2) {
      filterByDishType(result, (flag2) => {
        flag2 = false;
        flag2 = false;
      });
    } else {
      filterByDishType(data, (result) => {});
    }
  });
}*/
/*function filterByDishType(data) {
  const list = document.querySelector('#type');

  list.addEventListener('change', () => {
    applyFilters(data);
  });
}

function filterByCuisine(data) {
  const list = document.querySelector('#cuisine');

  list.addEventListener('change', () => {
    applyFilters(data);
  });
}

function applyFilters(data) {
  let selectedDishType = document.querySelector('#type').value.toLowerCase();
  let selectedCuisine = document.querySelector('#cuisine').value;

  let result = data;

  if (selectedDishType != 'Sort by dish type') {
    console.log(selectedCuisine);
    result = result.filter((recipe) =>
      recipe.dishTypes.includes(selectedDishType)
    );
    console.log(result);
  }

  if (selectedCuisine != 'Sort by cuisine') {
    console.log(selectedCuisine);
    result = result.filter((recipe) =>
      recipe.cuisines.includes(selectedCuisine)
    );
    console.log(result);
  }

  clearHtml('.new');
  createMainRecipeNewSection(result);
}*/

function filterByDishType(data) {
  const checkboxes = document.querySelectorAll('input[name="check"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      applyFilters(data);
    });
  });
}

function filterByCuisine(data) {
  const checkboxes = document.querySelectorAll('input[name="check-cuisine"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      applyFilters(data);
    });
  });
}

function applyFilters(data) {
  const selectedDishTypes = Array.from(
    document.querySelectorAll('input[name="check"]:checked')
  ).map((checkbox) => checkbox.value.toLowerCase());
  // const selectedCuisines = Array.from(document.querySelectorAll('input[name="check-cuisine"]:checked')).map((checkbox) => checkbox.value);

  let result = data;

  if (selectedDishTypes.length > 0) {
    result = result.filter((recipe) =>
      selectedDishTypes.some((dishType) => recipe.dishTypes.includes(dishType))
    );
  }

  /* if (selectedCuisines.length > 0) {
    result = result.filter((recipe) => selectedCuisines.some((cuisine) => recipe.cuisines.includes(cuisine)));
  }*/

  clearHtml('.new');
  createMainRecipeNewSection(result);
}

function filterData(data) {
  filterByDishType(data);
  //filterByCuisine(data);
}
function openFilters() {
  const filterBtn = document.querySelector('.filter__btn');
  const filterBlock = document.querySelector('.drop-list__block');
  filterBtn.addEventListener('click', () => {
    if (filterBlock.style.display === 'flex') {
      filterBlock.style.display = 'none';
    } else {
      filterBlock.style.display = 'flex';
    }
  });
}
openFilters();
