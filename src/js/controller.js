import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';

if (module.hot) {
  module.hot.accept();
}

console.log('Test');
console.log('Test again');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    //const { recipe } = model.state;

    //  2) Rendering app
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

//window.addEventListener('hashchange', controlRecipes);

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load Search result
    await model.loadSearchResults(query);

    // 3. Render results
    console.log(model.state.search.results);
    resultView.render(model.state.search.results);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.adHandlerSearch(controlSearchResults);
};
init();
//  ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
