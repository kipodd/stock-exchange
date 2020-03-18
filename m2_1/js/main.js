async function getResults(query) {
    removeClass("stockSearchSpinner", "invisible");

    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`);
        const data = await response.json();
        createResults(data);
    } catch (error) {
        console.error(error);
    }
}

function addClass(elementName, className) {
    const element = document.getElementById(elementName);
    element.classList.add(className);
}

function removeClass(elementName, className) {
    const element = document.getElementById(elementName);
    element.classList.remove(className);
}

function debounce(func, delay) {
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

function createResults(data) {
    const resultsList = document.getElementById("resultsList");

    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.lastChild);
    }

    for (const company in data) {
        const name = `${data[company].name}`;
        const symbol = `${data[company].symbol}`;
        const url = "company.html?symbol=" + symbol;
        resultsList.insertAdjacentHTML("beforeend", `<a href="${url}" class="list-group-item">${name} ${symbol}</a>`);
    }

    addClass("stockSearchSpinner", "invisible");
}

function getSearchInput() {
    const searchInput = document.getElementById("searchInput").value;
    getResults(searchInput);
}

document.getElementById("searchButton").addEventListener("click", getSearchInput);
document.getElementById("searchInput").addEventListener("keyup", debounce(getSearchInput, 1000));