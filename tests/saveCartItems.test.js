const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('é função', () => {
    expect(typeof saveCartItems).toBe('function');
  });
  it('verifica se localStorage.setItem é chamado', () => {
    saveCartItems('alou');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('verifica se localStorage.setItem é chamado com dois parâmetros', () => {
    saveCartItems('alou');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify('alou'));
  });
});
