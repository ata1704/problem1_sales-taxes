import { Product } from './Product';

export class ShoppingBasket {
  readonly basicTax = 10;
  readonly importDuty = 5;

  constructor(public shoppingBasket: Product[] = []) {}

  addShoppingItem(shoppingItem: Product) {
    this.shoppingBasket.push(shoppingItem);
  }
}
