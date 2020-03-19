async function getResults(query) {
    removeClass("stockSearchSpinner", "invisible");

    try {
        const companysResponse = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`);
        const companysData = await companysResponse.json();

        await createResults(companysData);
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

async function createResults(data) {
    const resultsList = document.getElementById("resultsList");

    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.lastChild);
    }

    for (const company in data) {
        const name = `${data[company].name}`;
        const symbol = `${data[company].symbol}`;
        const url = "company.html?symbol=" + symbol;

        const companyDetailsResponse = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`);
        const companyDetailsData = await companyDetailsResponse.json();

        const companyDetailsArray = [companyDetailsData];
        // console.log(companyDetailsArray);

        const imageUrl = companyDetailsArray.map(companyDetails => {
            return companyDetails.profile.image;
        });
        const arr = [1,2,3];
        console.log(Array.isArray(arr));
        // console.log(typeof imageUrl);

        resultsList.insertAdjacentHTML("beforeend", `<a href="${url}" class="list-group-item">${name} ${symbol}</a>`);
    }

    addClass("stockSearchSpinner", "invisible");
}

function getSearchInput() {
    const searchInput = document.getElementById("searchInput").value;
    getResults(searchInput);
}

document.getElementById("searchButton").addEventListener("click", getSearchInput);
// document.getElementById("searchInput").addEventListener("keyup", debounce(getSearchInput, 1000));