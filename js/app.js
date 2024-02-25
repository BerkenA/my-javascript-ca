fetchJackets();

let cart = [];

function addToCart(jacketID) {
    cart.push(jacketID);
    console.log(JSON.stringify(cart));
}

async function fetchJackets() {
  const content = document.querySelector(".mainContainer");
  content.innerHTML = "<p>Loading...</p>";
  const data = await fetch("https://api.noroff.dev/api/v1/rainy-days");
  jacketList = await data.json();
  content.innerHTML = "";
  renderJackets(jacketList);
}
fetchJackets();

function renderJackets(jackets) {
  const content = document.querySelector(".mainContainer");
  content.innerHTML = ""; // Clear previous content
  jackets.forEach((jacket) => {
      if (jacket.onSale === true) {
          content.innerHTML += `
              <a href="product.html?id=${jacket.id}">
                  <h2>${jacket.title}</h2>
                  <img src="${jacket.image}" />
                  <p class="formerPrice">${jacket.price}</p>
                  <p class="discountPrice">${jacket.discountedPrice}</p>
              </a>`;
      } else {
          content.innerHTML += `
              <a href="product.html?id=${jacket.id}">
                  <h2>${jacket.title}</h2>
                  <img src="${jacket.image}" />
                  <p class="newPrice">${jacket.price}</p>
              </a>`;
      }
  });
}

function filterByGender(gender) {
  const genderJackets = jacketList.filter((jacket) => jacket.gender.toLowerCase() === gender.toLowerCase());
  renderJackets(genderJackets);
}

function filterBySale() {
  const saleJackets = jacketList.filter((jacket) => jacket.onSale === true);
  renderJackets(saleJackets);
}