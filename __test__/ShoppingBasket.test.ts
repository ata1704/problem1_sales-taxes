import { ShoppingBasket } from '../src/ShoppingBasket';
import { Product, ProductCategory } from '../src/Product';

describe('ShoppingBasket testing', () => {
  it('should return the correct total', () => {
    const shoppingBasket = new ShoppingBasket();
    shoppingBasket.addShoppingItem(
      new Product('book', 1, 12.49, ProductCategory.Book, false)
    );
    shoppingBasket.addShoppingItem(
      new Product('music CD', 1, 14.99, ProductCategory.Other, false)
    );
    shoppingBasket.addShoppingItem(
      new Product('book', 1, 0.85, ProductCategory.Food, false)
    );

    expect(shoppingBasket.checkOut().total).toBe(29.83);
  });
});
