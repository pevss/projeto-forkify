import { API_KEY, API_URL, RESULTS_PER_PAGE } from "./config";
import { AJAXCall } from "./helpers";

export const state = {
    recipe: {},
    search: {
        page: 1,
        query: "",
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
    },
    bookmarks: [],
};

const formatRecipe = function (recipe) {
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key }),
    };
};

export const loadRecipe = async function (recipeID) {
    try {
        const { data: { recipe } } = await AJAXCall(`${API_URL}${recipeID}?key=${API_KEY}`);

        state.recipe = formatRecipe(recipe);

        if (state.bookmarks.some(recipe => recipe.id === recipeID)) state.recipe.isBookmarked = true;
        else state.recipe.isBookmarked = false;
    } catch (err) {
        throw err;
    };
};

export const loadSearchResults = async function (query) {
    try {
        const { data: { recipes } } = await AJAXCall(`${API_URL}?search=${query}&key=${API_KEY}`);

        const cleanRecipes = recipes.map(recipe => {
            return {
                id: recipe.id,
                image: recipe.image_url,
                publisher: recipe.publisher,
                title: recipe.title,
                ...(recipe.key && { key: recipe.key })
            };
        });

        state.search.results = cleanRecipes;
        state.search.query = query;
        state.search.page = 1;
    } catch (err) {
        throw err;
    };
};

export const loadSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = ingredient.quantity * newServings / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

const persistBookmarks = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) state.recipe.isBookmarked = true;

    persistBookmarks();
};

export const deleteBookmark = function (recipeID) {
    const bookmarkToBeDeletedIndex = state.bookmarks.findIndex(bookmark => bookmark.id === recipeID);
    state.bookmarks.splice(bookmarkToBeDeletedIndex, 1);

    if (recipeID === state.recipe.id) state.recipe.isBookmarked = false;

    persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].includes("ingredient") && entry[1] !== "")
            .map(ingredient => {
                const ingredientData = ingredient[1].split(",").map(data => data.trim());

                if (ingredientData.length !== 3) throw new Error("Wrong ingredient format. Please use the correct format :)");

                const [quantity, unit, description] = ingredientData;

                return {
                    quantity: +quantity || null,
                    unit,
                    description,
                };
            });

        const recipeData = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };

        const { data: { recipe } } = await AJAXCall(`${API_URL}?key=${API_KEY}`, recipeData);

        state.recipe = formatRecipe(recipe);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    };
};

const init = function () {
    const persistedBookmarks = localStorage.getItem("bookmarks");

    if (persistedBookmarks) state.bookmarks = JSON.parse(persistedBookmarks);
};

init();
