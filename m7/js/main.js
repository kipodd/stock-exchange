function displayMarquee() {
    const MyMarquee = new Marquee(document.getElementById(`stockMarqueeWrapper`));
    MyMarquee.getRealTimePrices();
}

function displayContent() {
    const searchButton = document.getElementById(`searchButton`);
    const searchInput = document.getElementById(`searchInput`);
    const resultsList = document.getElementById(`resultsList`);
    const Form = new SearchForm(searchButton, searchInput, resultsList);

    Form.userInputListen();
}

displayMarquee();
displayContent();