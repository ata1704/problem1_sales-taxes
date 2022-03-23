import { Product } from './Product';

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
    return this.price * this.quantity + this.getTaxAmountPerItem();
  }

  // TODO: Implement a better solution with rounding up to the nearest 0.05 per item.
  getTaxAmountPerItem() {
    return ((this.price * this.taxRate) / 100) * this.quantity;
  }
}
