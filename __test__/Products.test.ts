import { Product, ProductCategory } from '../src/Product';

describe('Products testing', () => {
  it('should round down if the third decimal is smaller than 5', () => {
    const product = new Product('book', 1, 18.994, ProductCategory.Food, false);
    expect(product.price).toBe(18.99);
  });
  it('should round up if the third decimal is bigger or equal 5', () => {
    const product = new Product('book', 1, 18.998, ProductCategory.Food, false);
    expect(product.price).toBe(19.0);
  });
  it('should still work if the price is set after instantiation', () => {
    const product = new Product('book', 1, 18.99, ProductCategory.Food, false);
    product.price = 18.998;
    expect(product.price).toBe(19.0);
  });
});
