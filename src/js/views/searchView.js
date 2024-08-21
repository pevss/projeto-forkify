class SearchView {
    _parentElement = document.querySelector(".search");
    _searchInput = this._parentElement.querySelector(".search__field");
    _query;

    getQuery() {
        this._query = this._searchInput.value;
        this._clearInput();
        return this._query;
    };

    addHandlerSearch(func) {
        this._parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            func();
        });
    };

    _clearInput() {
        this._searchInput.value = "";
    };
};

export default new SearchView();
