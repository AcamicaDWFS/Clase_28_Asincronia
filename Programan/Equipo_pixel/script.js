class Product {
  constructor(product, brand, model, price, imgSrc) {
    this.product = product;
    this.brand = brand;
    this.model = model;
    this.price = price;
    this.imgSrc = imgSrc;
  }

  createCartItem() {
    const item = document.createElement("article");
    item.classList.add("item");

    const img = document.createElement("img");
    img.src = this.imgSrc;
    img.setAttribute("alt", "Cart item");

    const container = document.createElement("div");
    container.classList.add("description");

    const productName = createTextElement("h4", this.product);
    const brand = createTextElement("p", `Marca: ${this.brand}`);
    const model = createTextElement("p", `Modelo: ${this.model}`);
    const price = createTextElement("p", `Precio: $${formatNum(this.price)}`);

    container.append(productName, brand, model, price);

    const deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fas", "fa-trash-alt");

    item.append(img, container, deleteBtn);

    this.htmlCartItem = item;
  }
}

const formatNum = (num) => num.toLocaleString("en");

const getPrice = (price) => parseFloat(price.split(",").join(""));

function getTotal(cart) {
  const prices = cart.map((product) => product.price);
  return prices.reduce((acc, curr) => acc + curr);
}

function createProduct(evt) {
  const selectedCard = evt.target.parentElement;

  const product = selectedCard.querySelector("h3").innerText;
  const brand = selectedCard.querySelector(".brand").innerText;
  const model = selectedCard.querySelector(".model").innerText;
  const price = getPrice(selectedCard.querySelector(".price").innerText);
  const imgSrc = selectedCard.querySelector("img").getAttribute("src");

  const currItem = new Product(product, brand, model, price, imgSrc);

  return currItem;
}

function createTextElement(type, text) {
  const newElement = document.createElement(type);
  newElement.innerText = text;

  return newElement;
}

function hideCart() {
  cartBox.style.display = "none";
  document.body.style.overflowY = "visible";
}

function showCart() {
  cartBox.style.display = "block";
  document.body.style.overflowY = "hidden";
}

function checkLocalStorage() {
  if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", "[]");
  }

  if (localStorage.getItem("cart") !== "[]") {
    cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((item) => (item.__proto__ = Product.prototype));

    notification.innerText = cart.length;
    total.innerText = `$${formatNum(getTotal(cart))}`;

    for (let item of cart) {
      item.createCartItem();

      cartContainer.append(item.htmlCartItem);

      const rmButton = item.htmlCartItem.querySelector("i");
      addDeleteListener(rmButton);
    }
  }
}

const buttons = document.querySelectorAll(".card button");

const total = document.querySelector("#total span");
const cartBtn = document.querySelector(".carrito");
const cartBox = document.querySelector("#cart-box");
const cartContainer = document.querySelector("#cart-container");
const closeButton = document.querySelector(".close");
const notification = document.querySelector("#number");
let cart = [];

for (let button of buttons) {
  button.addEventListener("click", (evt) => {
    const product = createProduct(evt);

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    product.createCartItem();

    cartContainer.append(product.htmlCartItem);
    notification.innerText = cart.length;

    total.innerText = `$${formatNum(getTotal(cart))}`;

    const rmButton = product.htmlCartItem.querySelector("i");
    addDeleteListener(rmButton);
  });
}

function addDeleteListener(button) {
  button.addEventListener("click", (evt) => {
    const productToRemove = evt.target.parentElement;
    const nodes = Array.prototype.slice.call(cartContainer.children);
    const pos = nodes.indexOf(productToRemove);

    productToRemove.remove();
    cart.splice(pos, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    notification.innerText = cart.length;

    cart.length === 0
      ? hideCart()
      : (total.innerText = `$${formatNum(getTotal(cart))}`);
  });
}

cartBtn.addEventListener("click", () => {
  cart.length !== 0
    ? showCart()
    : alert("Aún no hay productos en el carrito.");
});

closeButton.addEventListener("click", () => {
  hideCart();
});

// Check if values are stored in browser's local storage if so it updates the
// cart.
checkLocalStorage();
