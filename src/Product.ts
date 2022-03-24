import Utils from './Utils';

export enum ProductCategory {
  Book,
  Food,
  MedicalProduct,
  Other,
}

export class Product {
  private _price: number;
  constructor(
    public name: string,
    public quantity: number,
    price: number,
    public category: ProductCategory = ProductCategory.Other,
    public isImported: boolean = false
  ) {
    this._price = Utils.floatRound(price);
  }

  public get price() {
    return this._price;
  }

  public set price(value: number) {
    this._price = Utils.floatRound(value);
  }
}
