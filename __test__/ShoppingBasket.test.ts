import { ShoppingBasket } from '../src/ShoppingBasket';
import { Product, ProductCategory } from '../src/Product';

describe('checkOut testing', () => {
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

describe('Receipt output testing', () => {
  let shoppingBasket: ShoppingBasket;
  beforeEach(() => {
    shoppingBasket = new ShoppingBasket();
  });

  it('should correctly output given input example 1', () => {
    shoppingBasket.addShoppingItem(
      new Product('book', 1, 12.49, ProductCategory.Book, false)
    );
    shoppingBasket.addShoppingItem(
      new Product('music CD', 1, 14.99, ProductCategory.Other, false)
    );
    shoppingBasket.addShoppingItem(
      new Product('chocolate bar', 1, 0.85, ProductCategory.Food, false)
    );
    expect(shoppingBasket.getReceipt()).toBe(
      '1 book: 12.49\n' +
        '1 music CD: 16.49\n' +
        '1 chocolate bar: 0.85\n' +
        'Sales Taxes: 1.50\n' +
        'Total: 29.83'
    );
  });

  it('should correctly output given input example 2', () => {
    shoppingBasket.addShoppingItem(
      new Product(
        'imported box of chocolates',
        1,
        10.0,
        ProductCategory.Food,
        true
      )
    );
    shoppingBasket.addShoppingItem(
      new Product(
        'imported bottle of perfume',
        1,
        47.5,
        ProductCategory.Other,
        true
      )
    );
    expect(shoppingBasket.getReceipt()).toBe(
      '1 imported box of chocolates: 10.50\n' +
        '1 imported bottle of perfume: 54.65\n' +
        'Sales Taxes: 7.65\n' +
        'Total: 65.15'
    );
  });

  it('should correctly output given input example 3', () => {
    shoppingBasket.addShoppingItem(
      new Product(
        'imported bottle of perfume',
        1,
        27.99,
        ProductCategory.Other,
        true
      )
    );
    shoppingBasket.addShoppingItem(
      new Product('bottle of perfume', 1, 18.99, ProductCategory.Other, false)
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
      new Product(
        'imported box of chocolates',
        1,
        11.25,
        ProductCategory.Food,
        true
      )
    );
    expect(shoppingBasket.getReceipt()).toBe(
      '1 imported bottle of perfume: 32.19\n' +
        '1 bottle of perfume: 20.89\n' +
        '1 packet of headache pills: 9.75\n' +
        '1 imported box of chocolates: 11.85\n' +
        'Sales Taxes: 6.70\n' +
        'Total: 74.68'
    );
  });
});
