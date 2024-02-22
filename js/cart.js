let jacketData = JSON.parse(localStorage.getItem(`cartItems`))
const jacketCart = document.querySelector(".cartProduct")

console.log(jacketData);

function displayJacket(){
    for (let i = 0; i < jacketData.length; i++) {
        jacketCart.innerHTML += `
        <div>
        <h2>${jacketData[i].title}</h2>
        <img src="${jacketData[i].image}" />
        <p>${jacketData[i].description}</p>
        <p>${jacketData[i].sizes}</p>
        <p>${jacketData[i].baseColor}</p>
        <p class="formerPrice">${jacketData[i].price}</p>
        <p class="discountPrice">${jacketData[i].discountedPrice}</p>
        </div>`
    }
}


displayJacket();
