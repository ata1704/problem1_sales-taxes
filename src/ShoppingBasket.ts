import { Product, ProductCategory } from './Product';
import { Receipt } from './Receipt';
import { ReceiptItem } from './ReceiptItem';
import Utils from './Utils';

export class ShoppingBasket {
  private readonly basicTax = 10;
  private readonly importDuty = 5;

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

      const taxAmount =
        taxRate !== 0
          ? Utils.toRoundedCurrency(
              (shoppingBasketItem.price * taxRate) / 100
            ) * shoppingBasketItem.quantity
          : 0;
      salesTaxes = Utils.floatRound(salesTaxes + taxAmount);
      total = Utils.floatRound(
        total +
          taxAmount +
          shoppingBasketItem.price * shoppingBasketItem.quantity
      );
    });

    return new Receipt(receiptItems, salesTaxes, total);
  }

  getReceipt() {
    const receipt = this.checkOut();
    let itemsString: String = '';

    receipt.receiptItems.forEach((item) => {
      itemsString += `${item.quantity} ${item.name}: ${item
        .getTotalPricePerItem()
        .toFixed(2)}\n`;
    });

    return `${itemsString}Sales Taxes: ${receipt.salesTaxes.toFixed(
      2
    )}\nTotal: ${receipt.total.toFixed(2)}`;
  }
}
