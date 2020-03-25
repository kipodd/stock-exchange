class SearchForm {
    constructor(searchButton, searchInput, resultsList, stocksComparisionBar) {
        this.searchButton = searchButton;
        this.searchInput = searchInput;
        this.resultsList = resultsList;
        this.stocksComparisionBar = stocksComparisionBar;
        this.userInputListen()
    }

    debounce(func, wait) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait)
        }
    }

    userInputListen() {
        document.getElementById(`searchButton`).addEventListener(`click`, this.getSearchInput);
        document.getElementById(`searchInput`).addEventListener(`keyup`, this.debounce(this.getSearchInput, 500));
    }

    getSearchInput() {
        this.ResultsClass = new SearchResults(resultsList, stocksComparisionBar);
        this.ResultsClass.getResults(searchInput.value);
    }
}