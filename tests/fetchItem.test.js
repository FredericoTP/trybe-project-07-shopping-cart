require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('é função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('verifica se a função fetch é chamada', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('verifica se a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('verifica se a função tem o retorno esperado', async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });
  it('verifica se a função retorna um erro se for chamada sem parâmetro', () => {
    expect.assertions(1);
    expect(fetchItem()).rejects.toThrow('You must provide an url');
  });
});
