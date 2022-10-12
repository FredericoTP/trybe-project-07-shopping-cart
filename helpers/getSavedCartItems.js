const getSavedCartItems = (param) => {
  const storageString = localStorage.getItem(param);

  return storageString;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
