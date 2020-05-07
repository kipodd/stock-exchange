function getSymbolsQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.getAll(`symbol`);
}

function createCompanyContainers(companyContainerWrapper, symbols) {
  for (const symbol of symbols) {
    companyContainerWrapper.insertAdjacentHTML(
      `beforeend`,
      `<div id="${symbol}Container" class="col"></div>`
    );
    const parentElement = document.getElementById(`${symbol}Container`);
    new CompanyInfo(parentElement, symbol);
  }
}

const symbols = getSymbolsQueryString();
const companyContainerWrapper = document.getElementById(
  `companyContainerWrapper`
);

createCompanyContainers(companyContainerWrapper, symbols);
