export enum ProductCategory {
  Book,
  Food,
  MedicalProduct,
  Other,
}

export class Product {
  constructor(
    public name: string,
    public quantity: number,
    public price: number,
    public category: ProductCategory = ProductCategory.Other,
    public isImported: boolean = false
  ) {}
}
