import { Product } from './Product';
import Utils from './Utils';

export class ReceiptItem extends Product {
  constructor(
    name: string,
    quantity: number,
    price: number,
    public taxRate: number
  ) {
    super(name, quantity, price);
  }

  getTotalPricePerItem() {
    return Utils.floatRound(
      this.price * this.quantity + this.getTaxAmountPerItem()
    );
  }

  private getTaxAmountPerItem() {
    return (
      Utils.toRoundedCurrency((this.price * this.taxRate) / 100) * this.quantity
    );
  }
}
