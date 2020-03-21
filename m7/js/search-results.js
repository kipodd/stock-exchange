class SearchResults {
    constructor(resultsList) {
        this.resultsList = resultsList;
    }

    clearStockList() {
        while (resultsList.firstChild) {
            resultsList.removeChild(resultsList.lastChild);
        }
    }

    addClass(elementName, className) {
        const element = document.getElementById(elementName);
        element.classList.add(className);
    }

    removeClass(elementName, className) {
        const element = document.getElementById(elementName);
        element.classList.remove(className);
    }

    async getResults(query) {
        this.removeClass(`stockSearchSpinner`, `invisible`);
        this.clearStockList();

        try {
            const companyResponse = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`);
            const companyData = await companyResponse.json();

            this.createResults(companyData, query);
        } catch (error) {
            console.error(error);
        }
    }

    createResults(companyData, query) {
        const pattern = new RegExp(`${query}`, `i`);

        companyData.map(async company => {
            const url = `company.html?symbol=${company.symbol}`;
            const highlightedName = company.name.replace(pattern, `<span class="highlight">$&</span>`);
            const highlightedSymbol = company.symbol.replace(pattern, `<span class="highlight">$&</span>`);

            const companyProfileResponse = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`);
            const companyProfileData = await companyProfileResponse.json();
            company.profile = companyProfileData.profile;

            resultsList.insertAdjacentHTML(`beforeend`, `
                <div class="list-group-item">
                    <img src="${company.profile.image}" height="25px" alt="Company Image"/>
                    <a class="ml-1" href="${url}">${highlightedName} ${highlightedSymbol}</a>
                    <span id="changesPercentage${company.symbol}" class="ml-1">${company.profile.changesPercentage}</span>
                </div>
        `);

            const changesPercentageElement = document.getElementById(`changesPercentage${company.symbol}`);
            if (company.profile.changesPercentage.includes(`+`)) {
                changesPercentageElement.classList.add(`text-success`);
            } else if (company.profile.changesPercentage.includes(`-`)) {
                changesPercentageElement.classList.add(`text-danger`);
            }
        });

        this.addClass(`stockSearchSpinner`, `invisible`);
    };
}