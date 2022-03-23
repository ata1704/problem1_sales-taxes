import { ShoppingBasket } from '../src/ShoppingBasket';
import { Product, ProductCategory } from '../src/Product';

describe('ShoppingBasket checker', () => {
  let shoppingBasket: ShoppingBasket;
  beforeEach(() => {
    shoppingBasket = new ShoppingBasket();
  });

  it('exists', () => {
    expect(shoppingBasket).toBeDefined();
  });

  it('must not apply basic tax to books', () => {
    const price = 12.49;
    shoppingBasket.addShoppingItem(
      new Product('book', 1, price, ProductCategory.Book, false)
    );
    const receipt = shoppingBasket.checkOut();
    expect(receipt.total).toBe(price);
  });

  it('must not apply basic tax to food', () => {
    const price = 0.85;
    shoppingBasket.addShoppingItem(
      new Product('chocolate bar', 1, price, ProductCategory.Food, false)
    );
    const receipt = shoppingBasket.checkOut();
    expect(receipt.total).toBe(price);
  });

  it('must not apply basic tax to medical products', () => {
    const price = 9.75;
    shoppingBasket.addShoppingItem(
      new Product(
        'packet of headache pills',
        1,
        price,
        ProductCategory.MedicalProduct,
        false
      )
    );
    const receipt = shoppingBasket.checkOut();
    expect(receipt.total).toBe(price);
  });

  it('should apply basic tax to other products than books, food or medical products', () => {
    shoppingBasket.addShoppingItem(
      new Product('music CD', 1, 14.99, ProductCategory.Other, false)
    );
    const receipt = shoppingBasket.checkOut();
    expect(receipt.total).toBe(16.49);
  });

  it('should apply import duty on imported products', () => {
    shoppingBasket.addShoppingItem(
      new Product(
        'imported box of chocolates',
        1,
        10.0,
        ProductCategory.Food,
        true
      )
    );
    const receipt = shoppingBasket.checkOut();
    expect(receipt.total).toBe(10.5);
  });

  it('should total the price of multiple items with various quantities including taxes', () => {
    shoppingBasket.addShoppingItem(
      new Product('book', 1, 12.49, ProductCategory.Book, false)
    );
    shoppingBasket.addShoppingItem(
      new Product('chocolate bar', 5, 0.85, ProductCategory.Food, true)
    );
    shoppingBasket.addShoppingItem(
      new Product(
        'packet of headache pills',
        1,
        9.75,
        ProductCategory.MedicalProduct,
        false
      )
    );
    shoppingBasket.addShoppingItem(
      new Product('music CD ', 2, 14.99, ProductCategory.Other, false)
    );
    shoppingBasket.addShoppingItem(
      new Product(
        'imported bottle of perfume',
        1,
        27.99,
        ProductCategory.Other,
        true
      )
    );
    const receipt = shoppingBasket.checkOut();
    expect(receipt.total).toBe(91.91);
  });
});
