function getSymbolQueryString() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(`symbol`);
}

const symbol = getSymbolQueryString();
const parentElement = document.getElementById(`companyInfoContainer`);

const MyCompanyInfo = new CompanyInfo(parentElement, symbol);

MyCompanyInfo.loadHTML();
MyCompanyInfo.getCompanyDetails();
MyCompanyInfo.getGraph();