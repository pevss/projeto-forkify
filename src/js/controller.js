import * as model from "./model.js";
import { MODAL_CLOSE_SECONDS } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

const controlRecipe = async function () {
    try {
        const recipeID = window.location.hash.slice(1);
        if (!recipeID) return;

        recipeView.renderSpinner();

        //0- Update results view to mark selected search result
        resultsView.update(model.loadSearchResultsPage());
        bookmarksView.update(model.state.bookmarks);

        //1- Load recipe
        await model.loadRecipe(recipeID);
        const { recipe } = model.state;

        //2- Render recipe
        recipeView.render(recipe);
    } catch (err) {
        recipeView.renderError();
    };
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        //1- Get query
        const query = searchView.getQuery();

        if (!query) return;

        //2- Load search results
        await model.loadSearchResults(query);
        const results = model.loadSearchResultsPage();

        //3- Render results
        resultsView.render(results);

        //4- Render initial pagination
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    };
};

const controlPagination = function (goToPage) {
    const pageContent = model.loadSearchResultsPage(goToPage);

    // 1- Render NEW results
    resultsView.render(pageContent);

    // 2- Render NEW pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
    // 1- Update the recipe servings (in state)
    model.updateServings(newServings);

    // 2- Update recipe view
    recipeView.update(model.state.recipe);
};

const controlToggleBookmark = function () {
    // 1- Add or remove bookmark
    if (!model.state.recipe.isBookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);

    recipeView.update(model.state.recipe);

    // 2- Render bookmark
    bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (recipeData) {
    try {
        addRecipeView.renderSpinner();

        await model.uploadRecipe(recipeData);

        addRecipeView.renderMessage();
        recipeView.render(model.state.recipe);
        bookmarksView.render(model.state.bookmarks);
        window.history.pushState(null, "", `#${model.state.recipe.id}`);
        setTimeout(() => addRecipeView.closeWindow(), MODAL_CLOSE_SECONDS * 1000);
    } catch (err) {
        addRecipeView.renderError(err.message);
    };
};

const newFeature = function () {
    console.log("Welcome!");
};

const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerToggleBookmark(controlToggleBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView.addHandlerUpload(controlAddRecipe);
    newFeature();
};

init();
