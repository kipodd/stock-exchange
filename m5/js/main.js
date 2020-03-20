async function getResults(query) {
    removeClass("stockSearchSpinner", "invisible");
    clearStockList();

    try {
        const companyResponse = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`);
        const companyData = await companyResponse.json();

        createResults(companyData);
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

function clearStockList() {
    const resultsList = document.getElementById("resultsList");
    while (resultsList.firstChild) {
        resultsList.removeChild(resultsList.lastChild);
    }
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

function createResults(companyData) {
    const resultsList = document.getElementById("resultsList");

    companyData.map(async company => {
        const url = `company.html?symbol=${company.symbol}`;

        const companyProfileResponse = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`);
        const companyProfileData = await companyProfileResponse.json();
        company.profile = companyProfileData.profile;

        resultsList.insertAdjacentHTML("beforeend", `
                    <div class="list-group-item">
                        <img src='${company.profile.image}' height="25px" alt="Company Image"/>
                        <a class="ml-1" href="${url}">${company.name} ${company.symbol}</a>
                        <span id="changesPercentage${company.symbol}" class="ml-1">${company.profile.changesPercentage}</span>
                    </div>
        `);

        const changesPercentageElement = document.getElementById(`changesPercentage${company.symbol}`);
        if (company.profile.changesPercentage.includes("+")) {
            changesPercentageElement.classList.add("text-success");
        } else if (company.profile.changesPercentage.includes("-")) {
            changesPercentageElement.classList.add("text-danger");
        }
    });

    addClass("stockSearchSpinner", "invisible");
}

function getSearchInput() {
    const searchInput = document.getElementById("searchInput").value;
    getResults(searchInput);
}

const stockMarqueeWrapper = document.getElementById(`stockMarqueeWrapper`);
myMarquee = new Marquee(stockMarqueeWrapper);
myMarquee.getRealTimePrices();

document.getElementById("searchButton").addEventListener("click", getSearchInput);
// document.getElementById("searchInput").addEventListener("keyup", debounce(getSearchInput, 1000));