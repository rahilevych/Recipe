const KEY = 'd5cf441e972845a2a6ae915a2c114edc';

controller(KEY);

async function getRecipeFromAPI(key) {
  try {
    const url = `https://api.spoonacular.com/recipes/random?number=150&apiKey=${key}`;
    const response = await fetch(url);
    //const response = await fetch('../data.json');
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Requested resource not found.');
      } else if (response.status === 400) {
        throw new Error(
          'Sorry, the server is not available. Please try again later'
        );
      } else if (response.status === 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error('Something goes wrong. Please try later');
      }
    }
    return data;
  } catch (error) {
    console.error(error);
    alert(error);
  }
}

async function controller(key) {
  createLoader();
  let loader = document.querySelector('.loader');
  loader.style.display = 'block';
  const data = await getRecipeFromAPI(key);
  if (data) {
    loader.style.display = 'none';
    let newDataArr = filterDataWithCuisine(data.recipes);
    console.log(newDataArr);

    createDishCheckbox(newDataArr);
    createCuisineCheckbox(newDataArr);
    createDietsCheckbox(newDataArr);
    clickArrow('.arrow__dish', '.filter__dishs');
    clickArrow('.arrow__cuisine', '.filter__cuisines');
    clickArrow('.arrow__diet', '.filter__diets');

    showLimitedItemsProPage(newDataArr, 1);
    searchByTitle(newDataArr);
    filterByDishType(newDataArr);
    filterByCuisine(newDataArr);
    filterByDiets(newDataArr);
  }
  goToSearch();
  clearInput();
}
function goToSearch() {
  const btn = document.querySelector('.to-search');
  btn.addEventListener('click', () => {
    location.href = '#search';
  });
}
function filterDataWithCuisine(data) {
  return data.filter((element) => element.cuisines.length > 0);
}

function createLoader() {
  const recipeItems = document.querySelector('.recipe__items');
  const loader = document.createElement('div');
  loader.classList.add('loader');
  recipeItems.appendChild(loader);
}
function createNoMatchesBlock() {
  const recipeItems = document.querySelector('.recipe__items');
  const noRecipe = document.createElement('div');

  noRecipe.classList.add('recipe__no');
  recipeItems.appendChild(noRecipe);

  const icon = document.createElement('i');
  icon.classList.add('ph', 'ph-smiley-sad');
  noRecipe.appendChild(icon);

  const p = document.createElement('p');
  p.textContent = 'No matches';
  noRecipe.appendChild(p);
}

function createRecipeItem(data) {
  const recipeItems = document.querySelector('.recipe__items');
  console.log(data);
  data.forEach((element) => {
    const recipeItem = document.createElement('div');
    recipeItem.classList.add('recipe__item');
    recipeItems.appendChild(recipeItem);

    const recipeImg = document.createElement('div');
    recipeImg.classList.add('recipe__img');
    recipeItem.appendChild(recipeImg);

    const img = document.createElement('img');
    img.setAttribute('src', element.image);
    recipeImg.appendChild(img);

    const recipeCuisine = document.createElement('p');
    recipeCuisine.classList.add('recipe__cuisine');
    recipeCuisine.textContent = element.cuisines.join(' \u2736 ');
    recipeItem.appendChild(recipeCuisine);

    const recipeTitle = document.createElement('p');
    recipeTitle.classList.add('recipe__title');
    recipeTitle.textContent = element.title;
    recipeItem.appendChild(recipeTitle);

    const recipeDish = document.createElement('p');
    recipeDish.classList.add('recipe__dish');
    recipeDish.textContent = element.dishTypes.join(' \u2736 ');
    recipeItem.appendChild(recipeDish);
  });
}

function searchByTitle(data) {
  const searchInput = document.querySelector('.search-input');
  const inputRecipe = document.querySelector('.recipe__input');
  const closeBtn = document.querySelector('.close');
  const checkboxesDish = document.querySelectorAll('input[name="dish"]');
  const checkboxesCuisine = document.querySelectorAll('input[name="cuisine"]');
  const checkboxesDiet = document.querySelectorAll('input[name="diet"]');

  searchInput.addEventListener('input', () => {
    let result = data.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    checkboxesDish.forEach((checkbox) => {
      checkbox.checked = false;
    });

    checkboxesCuisine.forEach((checkbox) => {
      checkbox.checked = false;
    });
    checkboxesDiet.forEach((checkbox) => {
      checkbox.checked = false;
    });

    if (searchInput.value !== '') {
      closeBtn.style.display = 'block';
      inputRecipe.style.paddingLeft = '3rem';
    } else {
      closeBtn.style.display = 'none';
      inputRecipe.style.paddingLeft = '0rem';
    }

    if (result.length > 0) {
      clearHtml('.recipe__items');
      clearHtml('.recipe__pagination');
      showLimitedItemsProPage(result, 1);
    } else {
      clearHtml('.recipe__items');
      clearHtml('.recipe__pagination');
      createNoMatchesBlock();
    }
  });
}

function createUniqueListVariants(data, property) {
  const uniqueVariants = new Set();
  for (let i = 0; i < data.length; i++) {
    const recipe = data[i][property];

    recipe.forEach((item) => {
      if (!uniqueVariants.has(item)) {
        uniqueVariants.add(item);
      }
    });
  }
  return uniqueVariants;
}

function createListUniqueDish(data) {
  return createUniqueListVariants(data, 'dishTypes');
}

function createListUniqueCuisines(data) {
  return createUniqueListVariants(data, 'cuisines');
}

function createListUniqueDiets(data) {
  return createUniqueListVariants(data, 'diets');
}

function createCheckboxGroup(data, groupClass, titleText, nameAttr) {
  const variants = data;
  const recipeBlock = document.querySelector('.filters__block');
  const groupElem = document.createElement('div');
  groupElem.classList.add('filter__group', groupClass);
  recipeBlock.appendChild(groupElem);

  const titleElem = document.createElement('div');
  titleElem.classList.add('filter-title');
  groupElem.appendChild(titleElem);

  const titleTextElem = document.createElement('p');
  titleTextElem.textContent = titleText;
  titleElem.appendChild(titleTextElem);

  const arrowElem = document.createElement('i');
  arrowElem.classList.add('ph', 'ph-caret-down', `arrow__${groupClass}`);
  titleElem.appendChild(arrowElem);

  const optionsDiv = document.createElement('div');
  optionsDiv.classList.add('filter__block', `filter__${groupClass}s`);
  groupElem.appendChild(optionsDiv);

  variants.forEach((variant) => {
    const label = document.createElement('label');
    optionsDiv.appendChild(label);

    const optionLab = document.createElement('input');
    optionLab.setAttribute('type', 'checkbox');
    optionLab.setAttribute('name', nameAttr);
    optionLab.value = variant;
    label.appendChild(optionLab);

    const labelText = document.createTextNode(variant);
    label.appendChild(labelText);
  });
}

function createDishCheckbox(data) {
  const variants = createListUniqueDish(data);
  createCheckboxGroup(variants, 'dish', 'Choose dish type', 'dish');
}

function createCuisineCheckbox(data) {
  const variants = createListUniqueCuisines(data);
  createCheckboxGroup(variants, 'cuisine', 'Choose cuisine', 'cuisine');
}

function createDietsCheckbox(data) {
  const variants = createListUniqueDiets(data);
  createCheckboxGroup(variants, 'diet', 'Choose diets', 'diet');
}

function clickArrow(arrowClass, filterBlockClass) {
  const arrow = document.querySelector(arrowClass);
  const filterBlock = document.querySelector(filterBlockClass);

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

      //createChosenFilter(checkbox.value);
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
function filterByDiets(data) {
  const checkboxes = document.querySelectorAll('input[name="diet"]');
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
  const selectedDiets = Array.from(
    document.querySelectorAll('input[name="diet"]:checked')
  ).map((checkbox) => checkbox.value);
  console.log(selectedDiets);
  const result = data.filter(
    (recipe) =>
      (!selectedDishTypes.length ||
        selectedDishTypes.some((dishType) =>
          recipe.dishTypes.includes(dishType)
        )) &&
      (!selectedCuisines.length ||
        selectedCuisines.some((cuisine) =>
          recipe.cuisines.includes(cuisine)
        )) &&
      (!selectedDiets.length ||
        selectedDiets.some((diet) => recipe.diets.includes(diet)))
  );

  if (result.length > 0) {
    clearHtml('.recipe__items');
    clearHtml('.recipe__pagination');
    showLimitedItemsProPage(result, 1);
  } else {
    clearHtml('.recipe__items');
    clearHtml('.recipe__pagination');
    createNoMatchesBlock();
  }
}

function clearInput() {
  const input = document.querySelector('.search-input');
  const inputRecipe = document.querySelector('.recipe__input');
  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    if (input.value !== '') {
      input.value = '';
      inputRecipe.style.paddingLeft = '0rem';
      closeBtn.style.display = 'none';
      clearHtml('.filters__block');
      clearHtml('.recipe__items');
      clearHtml('.recipe__pagination');
      controller(keyAPI.key);
    }
  });
}

function clearHtml(elem) {
  document.querySelector(`${elem}`).innerHTML = '';
}

function devideDataForPagination(data) {
  const numberOfElementsProPage = 6;
  const pagesAmount = Math.ceil(data.length / numberOfElementsProPage);

  return pagesAmount;
}

function createNavPagination(data) {
  const recipe = document.querySelector('.recipe');
  let recipePagination = document.querySelector('.recipe__pagination');

  if (!recipePagination) {
    recipePagination = document.createElement('div');
    recipePagination.classList.add('recipe__pagination');
    recipe.appendChild(recipePagination);
  }

  const pages = devideDataForPagination(data);
  for (let i = 0; i < pages; i++) {
    const pageBtn = document.createElement('div');
    pageBtn.classList.add('recipe__pagination-btn');
    pageBtn.textContent = `${i + 1}`;
    recipePagination.appendChild(pageBtn);
  }
}

function clickPaginationBtn(data) {
  const btns = document.querySelectorAll('.recipe__pagination-btn');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      let content = +btn.textContent;
      clearHtml('.recipe__items');
      clearHtml('.recipe__pagination');
      btn.classList.remove('active');

      showLimitedItemsProPage(data, content);
    });
  });
}
function showLimitedItemsProPage(data, index) {
  createNavPagination(data);
  clickPaginationBtn(data);
  const btn = document.querySelectorAll('.recipe__pagination-btn')[index - 1];
  btn.classList.add('active');
  const numberItems = 6;
  let startPoint = (index - 1) * numberItems;
  let endPoint = startPoint + numberItems;
  let arr = data.slice(startPoint, endPoint);
  devideDataForPagination(data);
  clearHtml('.recipe__items');
  createRecipeItem(arr);
}
/*
function createChosenFilter(value) {
  const filters = document.querySelector('.filters__block');
  let chosenFiltersBlock = document.querySelector('.filters__chosen');

  if (!chosenFiltersBlock) {
    chosenFiltersBlock = document.createElement('div');
    chosenFiltersBlock.classList.add('filters__chosen');
    filters.appendChild(chosenFiltersBlock);
  }
  const filter = document.createElement('div');
  filter.classList.add('filter__block-chosen');
  filter.setAttribute('value', value);
  chosenFiltersBlock.appendChild(filter);

  const p = document.createElement('p');
  p.classList.add('chosen__filter');
  p.textContent = value;
  filter.appendChild(p);

  const i = document.createElement('i');
  i.classList.add('ph', 'ph-x', 'clear-filter');

  filter.appendChild(i);
  clearFilter(value);
}
function clearFilter(value) {
  const filter = document.querySelectorAll(`div[value="${value}"]`)[0];

  filter.addEventListener('click', () => {
    filter.remove();
    const checkboxesDish = document.querySelectorAll('input[name="dish"]');
    checkboxesDish.forEach((checkbox) => {
      if (filter === value) {
        checkbox.checked = false;
      }
    });
  });
}
*/
