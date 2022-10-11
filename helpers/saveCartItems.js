const saveCartItems = (item) => {
  const object = item;
  localStorage.setItem('cartItems', JSON.stringify(object));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
