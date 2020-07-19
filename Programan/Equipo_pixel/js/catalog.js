const products = [
  {
    product: "Mouse",
    brand: "Corsair",
    model: "Scimitar Pro RGB",
    price: 1799,
    imgSrc: "images/product1.jpg",
  },

  {
    product: "Teclado",
    brand: "Corsair",
    model: "K70 RGB",
    price: 1899,
    imgSrc: "images/product2.jpg",
  },

  {
    product: "Monitor",
    brand: "Acer",
    model: "K242HQL",
    price: 2299,
    imgSrc: "images/product3.jpg",
  },

  {
    product: "Tarjeta Gráfica",
    brand: "Gigabyte",
    model: "Windforce RTX 2060",
    price: 4599,
    imgSrc: "images/product4.jpg",
  },

  {
    product: "Disipador",
    brand: "Cooler Master",
    model: "Hyper 212 EVO",
    price: 599,
    imgSrc: "images/product5.jpg",
  },

  {
    product: "Memoria RAM",
    brand: "Corsair",
    model: "2x8 Vengeance RGB Pro",
    price: 3299,
    imgSrc: "images/product6.jpg",
  },

  {
    product: "Gabinete",
    brand: "NZXT",
    model: "A363-TB",
    price: 1999,
    imgSrc: "images/product7.jpg",
  },

  {
    product: "Fuente de poder",
    brand: "Antec",
    model: "HCP-850",
    price: 1499,
    imgSrc: "images/product8.jpg",
  },

  {
    product: "Motherboard",
    brand: "MSI",
    model: "Z390-A Prime",
    price: 1699,
    imgSrc: "images/product9.jpg",
  },
];

const sortPriceAsc = (products) => products.sort((a, b) => a.price - b.price);

const sortPriceDesc = (products) => products.sort((a, b) => b.price - a.price);

function sortNameAsc(products) {
  return products.sort((a, b) => {
    if (a.product < b.product) {
      return -1;
    } else if (a.product > b.product) {
      return 1;
    } else {
      return 0;
    }
  });
}

function sortNameDesc(products) {
  return products.sort((a, b) => {
    if (a.product < b.product) {
      return 1;
    } else if (a.product > b.product) {
      return -1;
    } else {
      return 0;
    }
  });
}

function sort(sortFunc) {
  const sortedProducts = sortFunc(products);
  catalogGrid.innerHTML = "";

  sortedProducts.forEach((product) => {
    catalogGrid.append(product.htmlCard);
  });
}

const catalogGrid = document.querySelector(".grid");
const radioPriceAsc = document.querySelector("#sort-price-asc");
const radioPriceDesc = document.querySelector("#sort-price-desc");
const radioNameAsc = document.querySelector("#sort-name-asc");
const radioNameDesc = document.querySelector("#sort-name-desc");

products.forEach((product) => (product.__proto__ = Product.prototype));

products.forEach((product) => {
  product.createCard();

  catalogGrid.append(product.htmlCard);
});

radioPriceAsc.addEventListener("click", () => {
  sort(sortPriceAsc);
});

radioPriceDesc.addEventListener("click", () => {
  sort(sortPriceDesc);
});

radioNameAsc.addEventListener("click", () => {
  sort(sortNameAsc);
});

radioNameDesc.addEventListener("click", () => {
  sort(sortNameDesc);
});
