const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('é função', () => {
    expect(typeof getSavedCartItems).toBe('function');
  });
  it('verifica se localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('verifica se localStorage.getItem é chamado com o parâmetro "cartItems"', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
