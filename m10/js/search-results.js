class SearchResults {
    constructor(resultsList, stocksComparisionBar, compareCompaniesButton) {
        this.resultsList = resultsList;
        this.stocksComparisionBar = stocksComparisionBar;
        this.compareCompaniesButton = compareCompaniesButton;
    }

    clearStockList() {
        while (this.resultsList.firstChild) {
            this.resultsList.removeChild(this.resultsList.lastChild);
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
            let highlightedName;
            let highlightedSymbol;
            if(company.name) {
                highlightedName = company.name.replace(pattern, `<span class="highlight">$&</span>`);
                highlightedSymbol = company.symbol.replace(pattern, `<span class="highlight">$&</span>`);
            }
            const companyProfileResponse = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`);
            const companyProfileData = await companyProfileResponse.json();
            company.profile = companyProfileData.profile;

            this.resultsList.insertAdjacentHTML(`beforeend`, `
                <div class="list-group-item">
                    <img src="${company.profile.image}" height="25px" alt="Company Image"/>
                    <a class="ml-1" href="${url}">${highlightedName} ${highlightedSymbol}</a>
                    <span id="changesPercentage${company.symbol}" class="ml-1">${company.profile.changesPercentage}</span>
                    <button id="${company.symbol}CompareButton" type="button" class="btn btn-light float-right">Compare</button>
                </div>
            `);

            const changesPercentageElement = document.getElementById(`changesPercentage${company.symbol}`);
            const button = document.getElementById(`${company.symbol}CompareButton`);
            button.companyObject = company;
            button.myCount = 0;

            if (company.profile.changesPercentage.includes(`+`)) {
                changesPercentageElement.classList.add(`text-success`);
            } else if (company.profile.changesPercentage.includes(`-`)) {
                changesPercentageElement.classList.add(`text-danger`);
            }

            button.addEventListener(`click`, this.getCompanyOnClick);
        });

        this.addClass(`stockSearchSpinner`, `invisible`);
    }

    getCompanyOnClick(event) {
        const companyObject = event.currentTarget.companyObject;
        console.log(event.currentTarget.myCount);
        event.currentTarget.myCount += 2;
        console.log(event.currentTarget.myCount);
        event.currentTarget.myCount += 2;
        console.log(event.currentTarget.myCount);
        console.log(companyObject);
        stocksComparisionBar.insertAdjacentHTML(`beforeend`, `
            <button type="button" class="btn btn-light">${companyObject.symbol} &times;</button>
        `);

        compareCompaniesButton.textContent = `Compare`;
    }
}