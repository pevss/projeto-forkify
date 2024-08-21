import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    render(data, render = true) {
        if (!data || (Array.isArray(data) && !data.length)) return this.renderError();

        this._data = data;

        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clearParent();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    };

    update(data) {
        // if (!data || (Array.isArray(data) && !data.length)) return this.renderError();

        this._data = data;

        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const currentElements = Array.from(this._parentElement.querySelectorAll("*"));

        newElements.forEach((newElement, i) => {
            const currentElement = currentElements[i];

            //update changed text
            if (!newElement.isEqualNode(currentElement) && newElement.firstChild?.nodeValue.trim() !== "") {
                currentElement.textContent = newElement.textContent;
            };

            //update changed attributes
            if (!newElement.isEqualNode(currentElement)) {
                Array.from(newElement.attributes).forEach(attribute => {
                    currentElement.setAttribute(attribute.name, attribute.value);
                });
            };
        });
    };

    renderSpinner() {
        const spinnerHTML = `
            <div class="spinner">
                <svg>
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;

        this._clearParent();
        this._parentElement.insertAdjacentHTML("afterbegin", spinnerHTML);
    };

    renderError(message = this._errorMessage) {
        const errorHTML = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `;

        this._clearParent();
        this._parentElement.insertAdjacentHTML("afterbegin", errorHTML);
    };

    renderMessage(message = this._message) {
        const messageHTML = `
            <div class="message">
            <div>
                <svg>
                <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
            </div>
        `;

        this._clearParent();
        this._parentElement.insertAdjacentHTML("afterbegin", messageHTML);
    };

    _clearParent() {
        this._parentElement.innerHTML = "";
    };
};
