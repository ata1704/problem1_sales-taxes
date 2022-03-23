import { ReceiptItem } from './ReceiptItem';

export class Receipt {
  constructor(
    public receiptItems: ReceiptItem[],
    public salesTaxes: number,
    public total: number
  ) {}
}
