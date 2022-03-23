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

  // TODO: Implement a better solution with rounding up to the nearest 0.05 per item.
  getTotalPricePerItem() {
    return (
      ((this.price * (this.taxRate + 100)) / 100) *
      this.quantity
    ).toFixed(2);
  }
}
