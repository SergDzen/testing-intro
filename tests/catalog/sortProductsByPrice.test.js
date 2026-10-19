const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test ("'asc' сортирует все товары как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, 'asc').map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test ("без направления сортирует все товары как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products).map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test ("'asc' сортирует товары [1, 3, 4] как [3, 4, 1]", () => {
    const productsToSort = [products[0], products[2], products[3]];
    expect(sortProductsByPrice(productsToSort, 'asc').map((product) => product.id)).toEqual([3, 4, 1]);
  });
  test ("'desc' сортирует все товары как [1, 2, 4, 5, 6, 3]", () => {
    expect(sortProductsByPrice(products, 'desc').map((product) => product.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test ("'desc' сортирует товары [3, 1, 4] как [1, 4, 3]", () => {
    const productsToSort = [products[2], products[0], products[3]];
    expect(sortProductsByPrice(productsToSort, 'desc').map((product) => product.id)).toEqual([1, 4, 3]);
  });
  test ("'desc' сортирует товары [5, 2, 6] как [2, 5, 6]", () => {
    const productsToSort = [products[4], products[1], products[5]];
    expect(sortProductsByPrice(productsToSort, 'desc').map((product) => product.id)).toEqual([2, 5, 6]);
  });
  test ("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const productsToSort = [products[0], products[2], products[3]];
    sortProductsByPrice(productsToSort, 'asc');
    expect(productsToSort.map((product) => product.id)).toEqual([1, 3, 4]);
  });
  test ("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const productsToSort = [products[0], products[2], products[3]];
    sortProductsByPrice(productsToSort, 'desc');
    expect(productsToSort.map((product) => product.id)).toEqual([1, 3, 4]);
  });
  test ("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const productsToSort = [...products];
    sortProductsByPrice(productsToSort);
    expect(productsToSort.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
