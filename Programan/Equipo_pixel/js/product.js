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

  createCard() {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = this.imgSrc;
    img.setAttribute("alt", this.product);

    const name = createTextElement("h3", this.product);

    const brand = createCardElement("p", "brand", "Marca", this.brand);
    const model = createCardElement("p", "model", "Modelo", this.model);

    const price = document.createElement("p");
    //prettier-ignore
    price.innerHTML = `Precio: $<span class="price">${formatNum(this.price)}</span>`;

    const button = createTextElement("button", "Añadir al carrito");

    card.append(img, name, brand, model, price, button);

    this.htmlCard = card;
  }
}
