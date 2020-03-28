class SearchResults {
    constructor(resultsList, stocksComparisionBar, compareCompaniesButton) {
        this.resultsList = resultsList;
        this.stocksComparisionBar = stocksComparisionBar;
    }

    clearStockList() {
        while (this.resultsList.firstChild) {
            this.resultsList.removeChild(this.resultsList.lastChild);
        }
        this.addClass(`noResults`, (`d-none`));
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

    splitIntoChildArrays(arr, size) {
        let it = arr.values();
        let parentArray = [];
        let childArray = [];
        let result = it.next();

        while (!result.done) {
            childArray.push(result.value);
            result = it.next();

            if (childArray.length > size || result.done) {
                parentArray.push(childArray);
                childArray = [];
            }
        }

        return parentArray;
    }

    async fetchRestults(companyTriplets) {
        const promiseContainer = companyTriplets.map(async triplet => {
            const tripletsSymbols = triplet.map(triplet => triplet.symbol).join();
            const tripletProfileResponse = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${tripletsSymbols}`);
            return await tripletProfileResponse.json();
        });

        return await Promise.all(promiseContainer).then(values => {
            return values;
        });
    }

    async createResults(companyData, query) {
        const pattern = new RegExp(`${query}`, `i`);
        const ResultsCompaniesComparer = new CompaniesComparer(this.stocksComparisionBar);

        if (!companyData.length) {
            this.removeClass(`noResults`, `d-none`)
        }

        // TODO
        //  from companyData create arrays of maximum 3 companies
        //  fetch with Promise.all using the symbols from companies
        //  loop for every triplet, and assign fetched data to the company objects inside triplets
        //  join companies
        //  change code to accept the change the data received from fetches
        //  draft:  can i extract symbol without another loop?

        const companyTriplets = this.splitIntoChildArrays(companyData, 2);
        let companyProfileTriplet = await this.fetchRestults(companyTriplets);
        console.log(companyProfileTriplet);

        // companyData.map(async company => {
        //     if (!company.name) {
        //         company.name = ``;
        //     }
        //     const companyProfileResponse = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`);
        //     const companyProfileData = await companyProfileResponse.json();
        //
        //
        //     // company.profile = await Promise.all([companyProfileData]).then(companyProfileData => {
        //     //     return (companyProfileData[0].profile);
        //     // });
        //
        //           company.profile = companyProfileData.profile;
        //           console.log(company.profile);
        //
        //     const highlightedName = company.name.replace(pattern, `<span class="highlight">$&</span>`);
        //     const highlightedSymbol = company.symbol.replace(pattern, `<span class="highlight">$&</span>`);
        //     const url = `company.html?symbol=${company.symbol}`;
        //
        //     this.resultsList.insertAdjacentHTML(`beforeend`, `
        //         <div class="list-group-item">
        //             <img src="${company.profile.image}" height="25px" alt="Company Image"/>
        //             <a class="ml-1" href="${url}">${highlightedName} ${highlightedSymbol}</a>
        //             <span id="changesPercentage${company.symbol}" class="ml-1">${company.profile.changesPercentage}</span>
        //             <button id="${company.symbol}CompareButton" type="button" class="btn btn-light float-right">Compare</button>
        //         </div>
        //     `);
        //
        //     const changesPercentageElement = document.getElementById(`changesPercentage${company.symbol}`);
        //     const compareButton = document.getElementById(`${company.symbol}CompareButton`);
        //
        //     if (company.profile.changesPercentage.includes(`+`)) {
        //         changesPercentageElement.classList.add(`text-success`);
        //     } else if (company.profile.changesPercentage.includes(`-`)) {
        //         changesPercentageElement.classList.add(`text-danger`);
        //     }
        //
        //     compareButton.addEventListener(`click`, () => {
        //         ResultsCompaniesComparer.addCompany(company);
        //     });
        // });

        this.addClass(`stockSearchSpinner`, `invisible`);
    }
}