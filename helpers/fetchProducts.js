const fetchProducts = async (item) => {
  if (item === undefined) {
    throw new Error('You must provide an url');
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const response = await fetch(url);
  const result = await response.json();
  
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
