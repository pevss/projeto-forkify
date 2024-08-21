import View from "./View";
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
    _message = "Recipe successfully uploaded :)"

    _parentElement = document.querySelector(".upload");
    _windowElement = document.querySelector(".add-recipe-window");
    _overlayElement = document.querySelector(".overlay");
    _btnOpenWindow = document.querySelector(".nav__btn--add-recipe");
    _btnCloseWindow = document.querySelector(".btn--close-modal");

    constructor() {
        super();

        this._addHandlerOpenWindow();
        this._addHandlerCloseWindow();
    };

    _addHandlerOpenWindow() {
        this._btnOpenWindow.addEventListener("click", this._toggleWindow.bind(this));
    };

    _addHandlerCloseWindow() {
        [this._overlayElement, this._btnCloseWindow].forEach(element => {
            element.addEventListener("click", this._toggleWindow.bind(this));
        });

        window.addEventListener("keydown", function (e) {
            const pressedKey = e.key;

            if (pressedKey === "Escape" && !this._overlayElement.classList.contains("hidden")) {
                this.toggleWindow();
            };
        }.bind(this));
    };

    _toggleWindow() {
        this._overlayElement.classList.toggle("hidden");
        this._windowElement.classList.toggle("hidden");
    };

    addHandlerUpload(func) {
        this._parentElement.addEventListener("submit", function (e) {
            e.preventDefault();

            const dataArray = [...new FormData(this)];
            const data = Object.fromEntries(dataArray);

            func(data);
        });
    };

    closeWindow() {
        this._overlayElement.classList.add("hidden");
        this._windowElement.classList.add("hidden");
    };

    _generateMarkup() {
    };
};

export default new AddRecipeView();
