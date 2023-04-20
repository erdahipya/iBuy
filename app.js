var modal = document.getElementById("myModal");
var btn = document.getElementById("cart-button");
var span = document.getElementById("close-button");

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

// Select Elements
const productsEl = document.querySelector(".shop-items");
const cartItemsEl = document.querySelector(".cart-items");
const totalPriceEl = document.querySelector(".total-price");

// Render Products
function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `<div class="shop-item">
    <img class="shop-item-image" src="${product.imgSrc}" />
    <h3 class="shop-item-title">${product.name}</h3>
    <div class="shop-item-details">
      <span class="shop-item-price">$${product.price}</span>
      <button class="cart-button" onClick="addToCart(${product.id})" type="button">add to cart</button>
    </div>
  </div>`;
  });
}

renderProducts();

// Cart Array
let cart = [];

// Add to Cart

function addToCart(id) {
  // check if product already added to the cart
  if (cart.some((item) => item.id === id)) {
    alert("Product already added to the cart");
  } else {
    const item = products.find((product) => product.id === id);

    cart.push(item);

    updateCart();
  }
}

// Update Cart

function updateCart() {
  renderCartItems();
  renderTotalPrice();
}

// calculate SubTotal
function renderTotalPrice() {
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price;
  });

  totalPriceEl.innerHTML = `<div class="total-price">
  <h4>Total Price: $${totalPrice}</h4> <button class="checkout-button" type="button">checkout</button>
  </div>
  `;
}

// Render Cart Items

function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h3>${item.name}</h3>
            </div>
            <div class="item-price">
                <small>$</small>${item.price}
                <button class="remove-button" type="button" onClick="removeItemFromCart(${item.id})">remove</button>
            </div>
        </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}
