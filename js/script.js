import * as keyAPI from '../config/keyAPI.js';
import { createElem } from './createElem.js';
createNav();
createWrapper();
createLogo();
createNavLinks();
createLogin();
createMainBlock();
//createMainRecipeNewSection();

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
  const parentElem = document.querySelector('.main__container');
  const options = {
    type: 'section',
    className: ['new'],
  };
  createElem(parentElem, options);
  const parentElemItemsTitle = document.querySelector('.new');
  const optionsItemsTitle = {
    type: 'h2',
    className: ['title'],
    content: 'Try something new',
  };
  createElem(parentElemItemsTitle, optionsItemsTitle);
  const parentElemItemsBlock = document.querySelector('.new');
  const optionsItemsBlock = {
    type: 'div',
    className: ['new__items'],
  };
  createElem(parentElemItemsBlock, optionsItemsBlock);
  for (let i = 0; i < 12; i++) {
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
    src: data.recipes[i].image,
  };
  createElem(parentElemImg, optionsImg);
  const parentElemTitle = document.querySelectorAll('.new__item')[i];
  const optionsTitle = {
    type: 'p',
    className: ['new__title'],
    content: data.recipes[i].title,
  };
  createElem(parentElemTitle, optionsTitle);
  const parentElemDeskr = document.querySelectorAll('.new__item')[i];
  const optionsDeskr = {
    type: 'p',
    className: ['new__deskr'],
    content: limitCharacters(removeHtmlTags(data.recipes[i].summary), 200),
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
  //const url = `https://api.edamam.com/search?q=chicken&app_id=${id}&app_key=${key}`;
  //const limit = 9; // Здесь указываете желаемое количество рецептов
  const url = `https://api.spoonacular.com/recipes/random?number=1000&apiKey=${key}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    createMainRecipeNewSection(data);
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
  } catch (error) {}
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
getRecipeFromAPI(keyAPI.key);
//getPopularCategoryFromAPI(keyAPI.key);
