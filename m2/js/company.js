async function getCompanyDetails(symbol) {
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`);
        const data = await response.json();
        displayCompanyData(data);
    } catch (error) {
        console.error(error);
    }
}

async function getGraph(symbol) {
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line`);
        const data = await response.json();
        displayGraph(data);
    } catch (error) {
        console.error(error);
    }
}

function displayGraph(historicalPrice) {
    console.log(historicalPrice);
}

function displayCompanyData(companyData) {
    const name = companyData.profile.companyName;
    const imageUrl = companyData.profile.image;
    const description = companyData.profile.description;
    const websiteUrl = companyData.profile.website;
    const price = companyData.profile.price;
    const changesPercentage = companyData.profile.changesPercentage;
    const industry = companyData.profile.industry;

    const imageElement = document.getElementById("companyImage");
    const nameElement = document.getElementById("companyName");
    const priceElement = document.getElementById("companyPrice");
    const changesPercentageElement = document.getElementById("changesPercentage");
    const descriptionElement = document.getElementById("companyDescription");

    const nameElementText = document.createTextNode(name + " (" + industry + ")");
    const priceElementText = document.createTextNode(price);
    const changesPercentageElementText = document.createTextNode(changesPercentage);
    const descriptionElementText = document.createTextNode(description);

    imageElement.setAttribute("src", imageUrl);
    nameElement.appendChild(nameElementText);
    nameElement.setAttribute("href", websiteUrl);
    priceElement.appendChild(priceElementText);
    changesPercentageElement.appendChild(changesPercentageElementText);
    descriptionElement.appendChild(descriptionElementText);

    if (changesPercentage.includes("+")) {
        changesPercentageElement.classList.add("text-success");
    } else if (changesPercentage.includes("-")){
        changesPercentageElement.classList.add("text-danger");
    }
}

const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');
getCompanyDetails(symbol);
getGraph(symbol);