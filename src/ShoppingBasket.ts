import { Product, ProductCategory } from './Product';
import { ReceiptItem } from './ReceiptItem';

export class ShoppingBasket {
  readonly basicTax = 10;
  readonly importDuty = 5;

  constructor(public shoppingBasket: Product[] = []) {}

  addShoppingItem(shoppingItem: Product) {
    this.shoppingBasket.push(shoppingItem);
  }

  checkOut() {
    const receiptItems: ReceiptItem[] = [];
    let salesTaxes: number;
    let total: number;

    this.shoppingBasket.forEach((shoppingBasketItem) => {
      let taxRate = 0;

      if (
        [
          ProductCategory.Book,
          ProductCategory.Food,
          ProductCategory.MedicalProduct,
        ].includes(shoppingBasketItem.category)
      )
        taxRate += this.basicTax;

      if (shoppingBasketItem.isImported) taxRate += this.importDuty;

      receiptItems.push(
        new ReceiptItem(
          shoppingBasketItem.name,
          shoppingBasketItem.quantity,
          shoppingBasketItem.price,
          taxRate
        )
      );
    });
  }
}
