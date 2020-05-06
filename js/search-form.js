class SearchForm {
  constructor(searchButton, searchInput, resultsList, stocksComparisionBar) {
    this.searchButton = searchButton;
    this.searchInput = searchInput;
    this.resultsList = resultsList;
    this.stocksComparisionBar = stocksComparisionBar;
    this.ResultsClass = new SearchResults(
      this.resultsList,
      this.stocksComparisionBar
    );

    this.searchQueryString();
    this.userInputListen();
  }

  searchQueryString() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(`query`)) {
      this.ResultsClass.getResults(urlParams.get(`query`));
    }
  }

  debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  userInputListen() {
    document.getElementById(`searchButton`).addEventListener(`click`, () => {
      this.getSearchInput();
    });
    document.getElementById(`searchInput`).addEventListener(
      `keyup`,
      this.debounce(() => {
        this.getSearchInput();
      }, 500)
    );
  }

  getSearchInput() {
    this.updateQueryString(this.searchInput.value);
    this.ResultsClass.getResults(this.searchInput.value);
  }

  updateQueryString(queryString) {
    const pageUrl = `?query=${queryString}`;
    window.history.pushState(null, null, pageUrl);
  }
}
