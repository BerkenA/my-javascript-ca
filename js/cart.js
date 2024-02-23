let jacketData = JSON.parse(localStorage.getItem(`cartItems`));
const jacketCart = document.querySelector(".cartProduct");

console.log(jacketData);

function displayJacket() {
    for (let i = 0; i < jacketData.length; i++) {
        jacketCart.innerHTML += `
        <div>
            <h2>${jacketData[i].title}</h2>
            <img src="${jacketData[i].image}" />
            <p>${jacketData[i].description}</p>
            <p>${jacketData[i].baseColor}</p>
            <p class="discountPrice">${jacketData[i].discountedPrice}</p>
            <button onclick="removeItem(${i})">Remove</button>
        </div>`;
    }
}

function removeItem(index) {
    jacketData.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(jacketData));
    jacketCart.innerHTML = "";
    displayJacket();
}

displayJacket();
