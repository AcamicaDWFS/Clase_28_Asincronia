const formatNum = (num) => num.toLocaleString("en");

const getPrice = (price) => parseFloat(price.split(",").join(""));

function createTextElement(type, text) {
  const newElement = document.createElement(type);
  newElement.innerText = text;

  return newElement;
}

function createCardElement(type, htmlClass, description, text) {
  const element = document.createElement(type);
  element.innerHTML = `${description}: <span class="${htmlClass}">${text}</span>`;

  return element;
}
