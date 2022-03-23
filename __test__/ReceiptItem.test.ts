import { ReceiptItem } from '../src/ReceiptItem';

describe('ReceiptItem testing', () => {
  it('should return the total price with taxes of an item', () => {
    const receiptItem = new ReceiptItem('book', 2, 12.49, 15);
    expect(receiptItem.getTotalPricePerItem()).toBe('28.73');
  });
});
