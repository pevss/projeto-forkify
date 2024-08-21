import View from './View';
import icons from 'url:../../img/icons.svg';
import fracty from "fracty";

class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    _errorMessage = "We could not find that recipe. Please try again.";
    _message = "";

    addHandlerRender(func) {
        ["hashchange", "load"].forEach(event => window.addEventListener(event, func));
    };

    addHandlerUpdateServings(func) {
        this._parentElement.addEventListener("click", function (e) {
            const clickedButton = e.target.closest(".btn--update-servings");

            if (!clickedButton) return;

            const updateTo = +clickedButton.dataset.updateTo;

            if (updateTo === 0) return;

            func(updateTo);
        });
    };

    addHandlerToggleBookmark(func) {
        this._parentElement.addEventListener("click", function (e) {
            const clickedButton = e.target.closest(".btn--bookmark");

            if (!clickedButton) return;

            func();
        });
    };

    _generateMarkup() {
        const { title, publisher, sourceUrl, image, servings, cookingTime, ingredients, isBookmarked = false, key } = this._data;

        return `
            <figure class="recipe__fig">
                <img src="${image}" alt="${title}" class="recipe__img"/>

                <h1 class="recipe__title">
                    <span>${title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="${icons}#icon-clock"></use>
                    </svg>

                    <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>

                    <span class="recipe__info-text">minutes</span>
                </div>

                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="${icons}#icon-users"></use>
                    </svg>

                    <span class="recipe__info-data recipe__info-data--people">${servings}</span>

                    <span class="recipe__info-text">servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn--tiny btn--update-servings" data-update-to="${servings - 1}">
                            <svg>
                                <use href="${icons}#icon-minus-circle"></use>
                            </svg>
                        </button>
                        <button class="btn--tiny btn--update-servings" data-update-to="${servings + 1}">
                            <svg>
                                <use href="${icons}#icon-plus-circle"></use>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="recipe__user-generated ${key ? "" : "hidden"}">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </div>
                
                <button class="btn--round btn--bookmark">
                    <svg>
                        <use href="${icons}#${isBookmarked ? "icon-bookmark-fill" : "icon-bookmark"}"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${ingredients.map(this._generateMarkupIngredient).join("")}
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__publisher">${publisher}</span>. Please check out
                    directions at their website.
                </p>
                <a
                    class="btn--small recipe__btn"
                    href="${sourceUrl}"
                    target="_blank"
                >
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </a>
            </div>
        `;
    };

    _generateMarkupIngredient(ingredient) {
        const { quantity, unit, description } = ingredient;

        return `
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                </svg>

                <div class="recipe__quantity">${quantity ? fracty(quantity) : ""}</div>

                <div class="recipe__description">
                    <span class="recipe__unit">${unit}</span>
                    ${description}
                </div>
            </li>
        `;
    };
};

export default new RecipeView();
