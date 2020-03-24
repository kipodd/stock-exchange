function displayMarquee() {
    const MyMarquee = new Marquee(document.getElementById(`stockMarqueeWrapper`));
    MyMarquee.getRealTimePrices();
}

function displayContent() {
    const searchButton = document.getElementById(`searchButton`);
    const searchInput = document.getElementById(`searchInput`);
    const resultsList = document.getElementById(`resultsList`);
    const stocksComparisionBar = document.getElementById(`stocksComparisionBar`);
    const Form = new SearchForm(searchButton, searchInput, resultsList, stocksComparisionBar);

    Form.userInputListen();
}

displayMarquee();
displayContent();