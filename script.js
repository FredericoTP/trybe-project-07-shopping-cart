// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const sectionItens = document.querySelector('.items');
const listCartItens = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const buttonEmptyCart = document.querySelector('.empty-cart');
const loading = document.querySelector('.loading');

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

const storage = () => {
  const list = document.getElementsByTagName('li');
  const array = [];
  for (let index = 0; index < list.length; index += 1) {
    array.push(list[index].innerText);
  }
  saveCartItems(array);
};

const cartTotalPrice = (param) => {
  if (totalPrice.innerText === '') {
    totalPrice.innerText = param;
  } else {
    let price = parseFloat(totalPrice.innerText);
    price += param;
    totalPrice.innerText = price;
  }
};

const cartTotalPriceMenos = (param) => {
  let price = parseFloat(totalPrice.innerText);
  price -= param;
  totalPrice.innerText = price;
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', (element) => {
    cartTotalPriceMenos(price);
    element.target.remove();
    storage();
  });
  cartTotalPrice(price);
  return li;
};

const addCarrinho = (product) => {
  fetchItem(product).then((data) => {
    const { id, title, price } = data;
    const object = { id, title, price };
    listCartItens.appendChild(createCartItemElement(object));
    storage();
  });
};

const pegarId = (param) => {
  param.addEventListener('click', (element) => {
    const a = element.target.parentNode;
    const b = getIdFromProductItem(a).toString();
    addCarrinho(b);
  });
};

fetchProducts('computador').then((data) => {
  const { results } = data;
  results.forEach((element) => {
    const { id, title, thumbnail } = element;
    const object = { id, title, thumbnail };
    sectionItens.appendChild(createProductItemElement(object));
  });
  const itensList = document.querySelectorAll('.item__add');
  itensList.forEach((item) => pegarId(item));
  loading.parentNode.removeChild(loading);
});

const inicializar = () => {
  const items = getSavedCartItems('cartItems');
  if (items) {
    const toObject = JSON.parse(items);
    for (let index = 0; index < toObject.length; index += 1) {
      const li = document.createElement('li');
      li.innerText = toObject[index];
      li.className = 'cart__item';
      listCartItens.appendChild(li);
      li.addEventListener('click', (element) => {
        element.target.remove();
        storage();
      });
    }
  }
};

buttonEmptyCart.addEventListener('click', () => {
  listCartItens.innerHTML = '';
  totalPrice.innerHTML = '';
  localStorage.setItem('cartItems', []);
});

window.onload = () => {
  inicializar();
};