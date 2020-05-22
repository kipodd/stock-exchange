class Marquee {
  constructor(stockMarqueeWrapper) {
    this.stockMarqueeWrapper = stockMarqueeWrapper;
    this.getRealTimePrices();
  }

  async getRealTimePrices() {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/stock/real-time-price?apikey=4c4b4a6db91e54a7db74a9de8c1895b6`,
      {mode: `no-cors`}
    );
    const data = await response.json();

    this.createMarquee(data);
  }

  createMarquee(data) {
    for (let i = 0; i < 1000; i++) {
      const company = data.stockList[i];
      this.stockMarqueeWrapper.insertAdjacentHTML(
        `beforeend`,
        `
            <span>${company.symbol}</span>
            <span class="text-success">${company.price}</span>
        `
      );
    }
  }
}
