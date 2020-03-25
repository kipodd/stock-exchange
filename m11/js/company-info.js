class CompanyInfo {
    constructor(parentElement, symbol) {
        this.parentElement = parentElement;
        this.symbol = symbol;
    }

    loadHTML() {
        this.parentElement.insertAdjacentHTML(`beforeend`, `
            <div class="row mt-5">
                <div class="offset-2 col-8">
                    <img class="invisible" id="companyImage" alt="Company image"/>
                    <a class="ml-3" id="companyName"></a>
                </div>
            </div>
            <div class="row">
                <div class="offset-2 col-8 d-flex justify-content-center">
                    <div id="companyDataSpinner" class="spinner-grow" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="offset-2 col-8">
                    <span id="stockPriceText" class="invisible">Stock price:</span>
                    <span id="companyPrice"></span>
                    <span id="changesPercentage"></span>
                </div>
            </div>
            <div class="row mt-4">
                <div class="offset-2 col-8">
                    <span id="companyDescription"></span>
                </div>
            </div>
            <div class="row">
                <div class="offset-2 col-8 d-flex justify-content-center">
                    <div id="historicalPriceChartSpinner" class="spinner-grow text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="offset-2 col-8">
                    <canvas id="historicalPriceChart"></canvas>
                </div>
            </div>
        `);
    }

    async getCompanyDetails() {
        try {
            const response = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}`);
            const data = await response.json();
            this.displayCompanyData(data);
        } catch (error) {
            console.error(error);
        }
    }

    async getGraph() {
        try {
            const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.symbol}?serietype=line`);
            const data = await response.json();
            this.displayGraph(data.historical);
        } catch (error) {
            console.error(error);
        }
    }

    addClass(elementName, className) {
        const element = document.getElementById(elementName);
        element.classList.add(className);
    }

    displayGraph(historicalPrice) {
        this.addClass(`historicalPriceChartSpinner`, `d-none`);

        const ctx = document.getElementById(`historicalPriceChart`).getContext(`2d`);
        const dates = historicalPrice.map(x => x.date);
        const prices = historicalPrice.map(x => x.close);

        const chart = new Chart(ctx, {
            type: `line`,
            data: {
                labels: dates,
                datasets: [{
                    label: `Stock Price History`,
                    backgroundColor: `rgb(255, 99, 132)`,
                    borderColor: `rgb(255, 99, 132)`,
                    data: prices
                }]
            },
            options: {}
        });
    }

    displayCompanyData(companyData) {
        this.addClass(`companyDataSpinner`, `d-none`);

        const name = companyData.profile.companyName;
        const imageUrl = companyData.profile.image;
        const description = companyData.profile.description;
        const websiteUrl = companyData.profile.website;
        const price = companyData.profile.price;
        const changesPercentage = companyData.profile.changesPercentage;
        const industry = companyData.profile.industry;

        const imageElement = document.getElementById(`companyImage`);
        const nameElement = document.getElementById(`companyName`);
        const priceElement = document.getElementById(`companyPrice`);
        const changesPercentageElement = document.getElementById(`changesPercentage`);
        const descriptionElement = document.getElementById(`companyDescription`);

        const nameElementText = document.createTextNode(`${name} (${industry})`);
        const priceElementText = document.createTextNode(price);
        const changesPercentageElementText = document.createTextNode(changesPercentage);
        const descriptionElementText = document.createTextNode(description);

        imageElement.classList.remove(`invisible`);
        stockPriceText.classList.remove(`invisible`);

        imageElement.setAttribute(`src`, imageUrl);
        nameElement.appendChild(nameElementText);
        nameElement.setAttribute(`href`, websiteUrl);
        priceElement.appendChild(priceElementText);
        changesPercentageElement.appendChild(changesPercentageElementText);
        descriptionElement.appendChild(descriptionElementText);

        if (changesPercentage.includes(`+`)) {
            changesPercentageElement.classList.add(`text-success`);
        } else if (changesPercentage.includes(`-`)) {
            changesPercentageElement.classList.add(`text-danger`);
        }
    }
}