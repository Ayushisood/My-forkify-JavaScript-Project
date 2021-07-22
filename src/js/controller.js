import * as models from './model.js';
import recipeViews from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}

// API used in this application - https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//for get recipe from API
const getRecipe = async function () {
  try {
    const id = window.location.hash.slice(1); //for getting the id of url

    if (!id) return;

    //show loading spinner
    recipeViews.renderSpinner();

    //updates results view to mark selected search result
    resultsView.update(models.searchResultsPage());
    bookmarkView.update(models.state.bookmark);

    //loading recipe
    await models.loadRecipe(id);

    //rendering data on UI
    recipeViews.render(models.state.recipe);
  } catch (err) {
    recipeViews.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    //get the search results
    await models.loadSearchResults(query);

    //render results
    resultsView.render(models.searchResultsPage());

    //render pagination
    paginationView.render(models.state.search);
  } catch (err) {
    console.log(err);
  }
};

const paginationControl = function (goto) {
  //render new results
  resultsView.render(models.searchResultsPage(goto));

  //render pagination
  paginationView.render(models.state.search);
};

const controlServing = function (newServings) {
  //update the recipe servings
  models.updateServings(newServings);
  //update the recipe view
  recipeViews.update(models.state.recipe);
};

const controlAddBookmark = function () {
  //add/remove bookmarks
  if (!models.state.recipe.bookmarked) models.addBookMarks(models.state.recipe);
  else models.deleteBookMarks(models.state.recipe.id);

  //update recipe bookmarked
  recipeViews.update(models.state.recipe);

  //render bookmark list
  bookmarkView.render(models.state.bookmark);
};

const controlBookmarks = function () {
  bookmarkView.render(models.state.bookmark);
};

const addRecipeControl = async function (newRecipe) {
  //upload recipe
  try {
    //show loading spinner
    addRecipeView.renderSpinner();

    await models.uploadRecipe(newRecipe);

    //render uploaded recipe
    recipeViews.render(models.state.recipe);

    //succes msg
    addRecipeView.renderMsg();

    //render bookmarkview
    addBookMarks.render(models.state.bookmark);

    //change ID in URL
    window.history.pushState(null, '', `#${models.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeViews.addHandlersRender(getRecipe);
  recipeViews.addHandlersServings(controlServing);
  recipeViews.addHandlersAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(paginationControl);
  addRecipeView.addHandlerUpload(addRecipeControl);
};

init();
//window.addEventListener('hashchange', getRecipe);
//window.addEventListener('load', getRecipe);
