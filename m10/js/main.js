function displayMarquee() {
    const MyMarquee = new Marquee(document.getElementById(`stockMarqueeWrapper`));
    MyMarquee.getRealTimePrices();
}

function displayContent() {
    const searchButton = document.getElementById(`searchButton`);
    const searchInput = document.getElementById(`searchInput`);
    const resultsList = document.getElementById(`resultsList`);
    const stocksComparisionBar = document.getElementById(`stocksComparisionBar`);

    new SearchForm(searchButton, searchInput, resultsList, stocksComparisionBar);
}

function loadHTML() {
    const mainCotainer = document.getElementById(`mainContainer`);
    mainCotainer.insertAdjacentHTML(`beforeend`, `
        <div class="row">
            <div class="col-12">
                <div class="stockMarqueeWrapperParent">
                    <div id="stockMarqueeWrapper" class="text-nowrap"></div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="offset-2 col-8 d-flex justify-content-center">
                <h1 class="display-3">Search Nasdaq Stocks</h1>
            </div>
        </div>
        <div class="row mt-5">
            <div class="offset-2 col-8">
                <div class="input-group mb-3">
                    <input type="text" id="searchInput" class="form-control" aria-label="Stock Symbol">
                    <div class="input-group-append">
                        <button id="searchButton" class="btn btn-outline-secondary" type="button">Search</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="offset-2 col-8">
                <span id="stocksComparisionBar"></span>
                <button id="compareCompaniesButton" type="button" class="btn btn-link float-right invisible"></button>
            </div>
        </div>
        <div class="row">
            <div class="offset-2 col-8 d-flex justify-content-center">
                <div id="stockSearchSpinner" class="spinner-grow invisible" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="offset-2 col-8 d-flex justify-content-center">
                <p id="noResults" class="d-none">We searched far and wide. Unfortunately, no results were found.</p>
            </div>
        </div>
        <div class="row">
            <div class="offset-2 col-8">
                <ul id="resultsList" class="list-group list-group-flush"></ul>
            </div>
        </div>
    `);
}

loadHTML();
displayMarquee();
displayContent();