class SearchForm {
    constructor(searchButton, searchInput, resultsList) {
        this.searchButton = searchButton;
        this.searchInput = searchInput;
        this.resultsList = resultsList;
    }

    debounce(func, delay) {
        let timeoutID;

        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        return function (...args) {
            timeoutID = setTimeout(() => {
                func(...args);
            }, delay);
        }
    }

    userInputListen() {
        document.getElementById(`searchButton`).addEventListener(`click`, this.getSearchInput);
        // document.getElementById(`searchInput`).addEventListener(`keyup`, this.debounce(this.getSearchInput, 1000));
    }

    getSearchInput() {
        this.ResultsClass = new SearchResults(resultsList);
        this.ResultsClass.getResults(searchInput.value);
    }
}