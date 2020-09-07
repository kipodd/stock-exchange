import {APIKey} from "./api-key.js";
class Marquee {
  constructor(stockMarqueeWrapper, APIKEY) {
    this.stockMarqueeWrapper = stockMarqueeWrapper;
    this.APIKEY = APIKEY;
    this.getRealTimePrices();
  }

  async getRealTimePrices() {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/stock/real-time-price?apikey=${APIKey}`
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
