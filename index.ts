import { Product, ProductCategory } from './src/Product';
import { ShoppingBasket } from './src/ShoppingBasket';

// Input 1
const shoppingBasket1 = new ShoppingBasket();
shoppingBasket1.addShoppingItem(
  new Product('book', 1, 12.49, ProductCategory.Book, false)
);
shoppingBasket1.addShoppingItem(
  new Product('music CD', 1, 14.99, ProductCategory.Other, false)
);
shoppingBasket1.addShoppingItem(
  new Product('chocolate bar', 1, 0.85, ProductCategory.Food, false)
);

// Input 2
const shoppingBasket2 = new ShoppingBasket();
shoppingBasket2.addShoppingItem(
  new Product('imported box of chocolates', 1, 10.0, ProductCategory.Food, true)
);
shoppingBasket2.addShoppingItem(
  new Product(
    'imported bottle of perfume',
    1,
    47.5,
    ProductCategory.Other,
    true
  )
);

// Input 3
const shoppingBasket3 = new ShoppingBasket();
shoppingBasket3.addShoppingItem(
  new Product(
    'imported bottle of perfume',
    1,
    27.99,
    ProductCategory.Other,
    true
  )
);
shoppingBasket3.addShoppingItem(
  new Product('bottle of perfume', 1, 18.99, ProductCategory.Other, false)
);
shoppingBasket3.addShoppingItem(
  new Product(
    'packet of headache pills',
    1,
    9.75,
    ProductCategory.MedicalProduct,
    false
  )
);
shoppingBasket3.addShoppingItem(
  new Product(
    'imported box of chocolates',
    1,
    11.25,
    ProductCategory.Food,
    true
  )
);

// Output 1
console.log('Output 1:');
console.log(shoppingBasket1.getReceipt());

// Output 2
console.log('\nOutput 2:');
console.log(shoppingBasket2.getReceipt());

// Output 1
console.log('\nOutput 3:');
console.log(shoppingBasket3.getReceipt());
