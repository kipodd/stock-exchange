class CompaniesComparer {
    constructor(stocksComparisionBar) {
        this.stocksComparisionBar = stocksComparisionBar;
        this.symbols = [];
    }

    addCompany(company) {
        if (!this.symbols.includes(company.symbol) && this.symbols.length <= 2) {
            this.symbols.push(company.symbol);
            this.stocksComparisionBar.insertAdjacentHTML(`beforeend`, `
                <button id="${company.symbol}StockButton" type="button" class="btn btn-light">${company.symbol} &times;</button>
            `);
            const stockButton = document.getElementById(`${company.symbol}StockButton`);
            stockButton.addEventListener(`click`, () => {
                this.removeCompany(company.symbol);
            });
        }
        if (this.symbols.length >= 2) {
            const compareCompaniesButton = document.getElementById(`compareCompaniesButton`);
            compareCompaniesButton.innerText = `Compare ${this.symbols.length} companies`;
            compareCompaniesButton.classList.remove(`invisible`);
            this.setCompareUrl(compareCompaniesButton);
        }
    }

    removeCompany(companySymbol) {
        const stockButton = document.getElementById(`${companySymbol}StockButton`);
        this.symbols = this.symbols.filter(symbol => symbol !== companySymbol);
        stockButton.remove();

        const compareCompaniesButton = document.getElementById(`compareCompaniesButton`);
        compareCompaniesButton.innerText = `Compare ${this.symbols.length} companies`;
        if (this.symbols.length <= 1) {
            compareCompaniesButton.classList.add(`invisible`);
        }
    }

    setCompareUrl(compareCompaniesButton) {
        let params = new URLSearchParams();
        for (const symbol of this.symbols) {
            params.append(`symbol`, symbol);
        }

        compareCompaniesButton.href = `company.html?${params.toString()}`;
    }
}