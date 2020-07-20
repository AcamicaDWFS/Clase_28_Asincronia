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
    return;
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

    showAlertAñadir();
  });
}

function showAlertAñadir() {
  Swal.fire({
    icon: "success",
    text: "Producto Añadido",
    timer: 2000,
  });
}

function addDeleteListener(button) {
  button.addEventListener("click", (evt) => {
    showAlertDelete(evt);
  });
}

function showAlertDelete(evt) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "El producto se eliminará de tu lista de compras",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.value) {
      deleteFromCart(evt);
    }
  });
}

function deleteFromCart(evt) {
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
}

cartBtn.addEventListener("click", () => {
  cart.length !== 0
    ? showCart()
    : Swal.fire({
        text: "Aún no hay productos en el carrito.",
        icon: "error",
      });
});

closeButton.addEventListener("click", () => {
  hideCart();
});

// Check if values are stored in browser's local storage if so it updates the
// cart.
checkLocalStorage();
