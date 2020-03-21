class SearchResults {
    constructor(resultsList) {
        this.resultsList = resultsList;
    }

    async getResults(query) {
        this.removeClass("stockSearchSpinner", "invisible");
        this.clearStockList();

        try {
            const companyResponse = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ`);
            const companyData = await companyResponse.json();

            this.createResults(companyData);
        } catch (error) {
            console.error(error);
        }
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

    createResults(companyData) {
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

        this.addClass("stockSearchSpinner", "invisible");
    }
}
