const queryString = window.location.search;
const paramUrl = new URLSearchParams(queryString);
const idJacket = paramUrl.get("id");
const jacketsContainer = document.querySelector(".displayMyJackets");
const addMeToCart = document.querySelector(".addToBasket")
const content = document.querySelector(".displayMyJackets")
const cartButton = document.querySelector(".cartAnchor")

let jacketData = [];


async function fetchJacketId() {
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        dataResult = await response.json();
        jacketData = dataResult;
        let found = false;
        for (let i = 0; i < jacketData.length; i++) {
            if (jacketData[i].id === idJacket) {
                displayJacket(jacketData[i]);
                found = true;
                break;
            }
        }
        if (!found) {
            content.innerHTML = "Jacket not found";
        }
    } catch (error) {
        content.innerHTML = "Error fetching data: " + error.message;
        cartButton.style.display = "none";
    }
}
console.log(jacketData)

    fetchJacketId();

    function displayJacket(jacketData){
        if(jacketData.onSale === false){
            jacketsContainer.innerHTML = `
            <div>
                <h2>${jacketData.title}</h2>
                <img src="${jacketData.image}" />
                <p>${jacketData.description}</p>
                <p>${jacketData.gender}</p>
                <p>${jacketData.sizes}</p>
                <p>${jacketData.baseColor}</p>
                <p>${jacketData.price}</p>
                <p>${jacketData.tags}</p>
            </div>`
        } if (jacketData.onSale === true){
                jacketsContainer.innerHTML = `
                <div>
                    <h2>${jacketData.title}</h2>
                    <img src="${jacketData.image}"/>
                    <p>${jacketData.description}</p>
                    <p>${jacketData.gender}</p>
                    <p>${jacketData.sizes}</p>
                    <p>${jacketData.baseColor}</p>
                    <p class="formerPrice">${jacketData.price}</p>
                    <p class="discountPrice">${jacketData.discountedPrice}</p>
                    <p>${jacketData.tags}</p>
                </div>`}
};

addMeToCart.addEventListener("click", () => {
    const selectedJacket = jacketData.find(jacket => jacket.id === idJacket);
    if (selectedJacket) {
        saveToLocalStorage(selectedJacket);
    }
});

function saveToLocalStorage(selectedJacket) {
    if (localStorage.getItem("cartItems") === null) {
        localStorage.setItem("cartItems", "[]");
    }
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems.push(selectedJacket);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}


// Gamle måten jeg pusha til kart på.
// let cart = [];
// function addToCart(jacketID) {
//     cart.push(jacketID);
//     console.log(JSON.stringify(cart));
// }