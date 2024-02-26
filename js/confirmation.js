const orderSuccess = document.getElementById("confirmation");
const successImage = document.getElementById("successImage");

let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function orderComplete() {
  if (!cart || cart.length === 0) {
    window.location.href = "../index.html";
  } else {
    orderSuccess.innerHTML += `
        <h1>SUCCESS! Your order has been confirmed and your shipment will arrive in 3-5 work days. Thank you for your order.</h1>`;
    cart.forEach((jacket) => {
      successImage.innerHTML += `
            <h2>${jacket.title}</h2>
            <img src="${jacket.image}" alt="${jacket.title}">`;
    });
  }
}

orderComplete();

localStorage.clear();
