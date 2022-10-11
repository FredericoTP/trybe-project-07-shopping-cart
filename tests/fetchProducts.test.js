require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('é função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('verifica se a função fetch é chamada', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('verifica se a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('verifica se a função tem o retorno esperado', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });
  it('verifica se a função retorna um erro se for chamada sem parâmetro', async () => {
    expect.assertions(1);
    const response = await fetchProducts('');
    expect(response).toThrow('You must provide an url');
  });
});
