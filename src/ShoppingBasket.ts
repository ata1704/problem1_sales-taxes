import { Product, ProductCategory } from './Product';
import { Receipt } from './Receipt';
import { ReceiptItem } from './ReceiptItem';

export class ShoppingBasket {
  readonly basicTax = 10;
  readonly importDuty = 5;

  constructor(public shoppingBasket: Product[] = []) {}

  addShoppingItem(shoppingItem: Product) {
    this.shoppingBasket.push(shoppingItem);
  }

  checkOut(): Receipt {
    const receiptItems: ReceiptItem[] = [];
    let salesTaxes: number = 0;
    let total: number = 0;

    this.shoppingBasket.forEach((shoppingBasketItem) => {
      let taxRate = 0;

      if (
        ![
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

      // TODO: Implement a better solution with rounding up to the nearest 0.05 per item.
      const taxAmount =
        taxRate !== 0
          ? ((shoppingBasketItem.price * taxRate) / 100) *
            shoppingBasketItem.quantity
          : 0;

      salesTaxes += taxAmount;
      total +=
        taxAmount + shoppingBasketItem.price * shoppingBasketItem.quantity;
    });

    return new Receipt(receiptItems, salesTaxes, total);
  }

  getReceipt() {
    const receipt = this.checkOut();
    let itemsString: String = '';

    receipt.receiptItems.forEach((item) => {
      itemsString += `${item.quantity} ${
        item.name
      }: ${item.getTotalPricePerItem()}\n`;
    });

    return `${itemsString}Sales Taxes: ${receipt.salesTaxes}\nTotal: ${receipt.total}`;
  }
}
