fetchJackets();
// Move to system memory local storage
let cart = [];
const filterItems = []; 

function addToCart(jacketID) {
    cart.push(jacketID);
    console.log(JSON.stringify(cart));
}

async function fetchJackets() {
    const content = document.querySelector(".mainContainer");
    content.innerHTML = "<p>Loading...</p>";
    const data = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    const jacketList = await data.json();
    content.innerHTML = "";
    jacketList.forEach((jacket) => {
    if (jacket.onSale === true) {
        content.innerHTML += `
        <a href="product.html?id=${jacket.id}">
        <div class="card">
        <h2>${jacket.title}</h2>
        <img src=${jacket.image}\>
        <p class="formerPrice">${jacket.price}</p>
        <p class="discountPrice">${jacket.discountedPrice}</p>
        </div>
        </a> `;
    }
    if (jacket.onSale === false) {
        content.innerHTML += `
        <a href="product.html?id=${jacket.id}">
        <div id=${jacket.id}>
        <h2>${jacket.title}</h2>
        <img src=${jacket.image}\>
        <p class="newPrice">${jacket.price}</p>
        </div>
        </a> `;
    }
    });
}

function filterByGenre(genreToFilterBy) {
  return apiData.filter((jacket) => jacket.genre === genreToFilterBy);
}
function renderMovies(jacket) {
  content.innerHTML = "";
  jacket.forEach((data) => {
    const priceHTML = data.onSale
      ? `
    <span class="price"><s>${data.price}</s></span><span class="discounted">${data.discountedPrice}</span>`
      : `<span class="price">${data.price}</span>`;
    content.innerHTML += `
    <a href="movie.html?${data.id}">
      <div id="card">
        <img src="${data.image}" alt="Image of ${data.title}">
        <div id="price">
          ${priceHTML}
        </div>
      </div>
    </a>
    `;
  });
}

function handleFilterClick(genreToFilterBy) {
  const filteredMovies = filterByGenre(genreToFilterBy);
  renderMovies(filteredMovies);
}