const getSavedCartItems = (param) => {
  const storageString = localStorage.getItem(param);
  
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
