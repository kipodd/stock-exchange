function getSymbolsQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.getAll(`symbol`);
}

function createCompanyContainers(companyContainerWrapper, symbols) {
  const columnsAmount = 12 / symbols.length;

  for (const symbol of symbols) {
    companyContainerWrapper.insertAdjacentHTML(
      `beforeend`,
      `<div id="${symbol}Container" class="col-${columnsAmount}"></div>`
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
