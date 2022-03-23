export default class Utils {
  static roundUpToNearestFactor(factor: number, value: number) {
    return Math.ceil((100 / factor) * value) / (100 / factor);
  }

  static toRoundedCurrency(roundedPrice: number) {
    const factor = 5;
    return Utils.roundUpToNearestFactor(factor, roundedPrice);
  }

  static floatRound(value: number) {
    return Math.round(value * 100) / 100;
  }
}
