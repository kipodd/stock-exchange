class CompanyInfo {
  constructor(parentElement, symbol) {
    this.parentElement = parentElement;
    this.symbol = symbol;

    this.loadHTML();
    this.getCompanyDetails();
    this.getGraph();
  }

  loadHTML() {
    this.parentElement.insertAdjacentHTML(
      `beforeend`,
      `
            <div class="row mt-5">
                <div class="col-12">
                    <img class="invisible" id="${this.symbol}companyImage" alt="Company image"/>
                    <a class="ml-3" id="${this.symbol}companyName"></a>
                </div>
            </div>
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
                    <div id="${this.symbol}companyDataSpinner" class="spinner-grow" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12">
                    <span id="${this.symbol}stockPriceText" class="invisible">Stock price:</span>
                    <span id="${this.symbol}companyPrice"></span>
                    <span id="${this.symbol}changesPercentage"></span>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <span id="${this.symbol}companyDescription"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
                    <div id="${this.symbol}historicalPriceChartSpinner" class="spinner-grow text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12">
                    <canvas id="${this.symbol}historicalPriceChart"></canvas>
                </div>
            </div>
      `
    );
  }

  async getCompanyDetails() {
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}?apikey=4c4b4a6db91e54a7db74a9de8c1895b6`,
        {mode: `no-cors`}
      );
      const data = await response.json();
      this.displayCompanyData(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getGraph() {
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${this.symbol}?serietype=line&apikey=4c4b4a6db91e54a7db74a9de8c1895b6`,
        {mode: `no-cors`}
      );
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
    this.addClass(`${this.symbol}historicalPriceChartSpinner`, `d-none`);

    const ctx = document
      .getElementById(`${this.symbol}historicalPriceChart`)
      .getContext(`2d`);

    const historicalPriceLength = historicalPrice.length;
    const dates = [historicalPrice[0].date];
    const prices = [historicalPrice[0].close];
    for (let i = 0; i <= 1; i += 0.1) {
      const historicalIndex = Math.floor(historicalPriceLength * i);

      dates.push(historicalPrice[historicalIndex].date);
      prices.push(historicalPrice[historicalIndex].close);
    }
    dates.push(historicalPrice[historicalPriceLength - 1].date);
    prices.push(historicalPrice[historicalPriceLength - 1].close);

    new Chart(ctx, {
      type: `line`,
      data: {
        labels: dates,
        datasets: [
          {
            label: `Stock Price History`,
            backgroundColor: `rgb(255, 99, 132)`,
            borderColor: `rgb(255, 99, 132)`,
            data: prices,
          },
        ],
      },
    });
  }

  displayCompanyData(companyData) {
    this.addClass(`${this.symbol}companyDataSpinner`, `d-none`);

    const name = companyData.profile.companyName;
    const imageUrl = companyData.profile.image;
    const description = companyData.profile.description;
    const websiteUrl = companyData.profile.website;
    const price = companyData.profile.price;
    const changesPercentage = companyData.profile.changesPercentage;
    const industry = companyData.profile.industry;

    const imageElement = document.getElementById(`${this.symbol}companyImage`);
    const nameElement = document.getElementById(`${this.symbol}companyName`);
    const priceElement = document.getElementById(`${this.symbol}companyPrice`);
    const changesPercentageElement = document.getElementById(
      `${this.symbol}changesPercentage`
    );
    const descriptionElement = document.getElementById(
      `${this.symbol}companyDescription`
    );

    const nameElementText = document.createTextNode(`${name} (${industry})`);
    const priceElementText = document.createTextNode(price);
    const changesPercentageElementText = document.createTextNode(
      changesPercentage
    );
    const descriptionElementText = document.createTextNode(description);

    imageElement.classList.remove(`invisible`);

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
