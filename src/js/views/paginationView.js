import View from "./View";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(func) {
        this._parentElement.addEventListener("click", function (e) {
            const target = e.target.closest(".btn--inline");
            if (!target) return;

            const goToPage = +target.dataset.goto;

            func(goToPage);
        });
    };

    _generateMarkup() {
        const { page: currentPage, results, resultsPerPage } = this._data;

        const numPages = Math.ceil(results.length / resultsPerPage);

        // at page 1, and there are no other pages
        if (currentPage === 1 && numPages === 1) {
            return "";
        };

        // at page 1, and there are other pages
        if (currentPage === 1 && numPages > 1) {
            return this._generateMarkupNextButton();
        };

        // last page
        if (currentPage === numPages) {
            return this._generateMarkupPrevButton();
        };

        // middle page
        return this._generateMarkupPrevButton() + this._generateMarkupNextButton()
    };

    _generateMarkupNextButton() {
        const { page: currentPage } = this._data;

        return `
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>

                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    };

    _generateMarkupPrevButton() {
        const { page: currentPage } = this._data;

        return `
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>

                <span>Page ${currentPage - 1}</span>
            </button>
        `;
    };
};

export default new PaginationView();
