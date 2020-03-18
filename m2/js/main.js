async function getResults(query) {
    const stockSearchSpinner = document.getElementById("stockSearchSpinner");
    stockSearchSpinner.classList.remove("d-none");

    let response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`);
    let data = await response.json();

    createResults(data);
}

function createResults(data){
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

    stockSearchSpinner.classList.add("d-none");
}

function searchButtonClick() {
    const searchInput = document.getElementById("searchInput").value;
    getResults(searchInput);
}

document.getElementById("searchButton").addEventListener("click", searchButtonClick);