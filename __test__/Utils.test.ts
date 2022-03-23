import Utils from '../src/Utils';

describe('Utils testing', () => {
  it('should round up to nearest 0.05', () => {
    expect(Utils.toRoundedCurrency(2.31)).toBe(2.35);
  });
});
