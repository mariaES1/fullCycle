export default class OrderItem {
  private readonly _id: string;
  private readonly _productId: string;
  private readonly _name: string;
  private readonly _price: number;
  private _quantity: number;

  constructor(
    id: string,
    productId: string,
    name: string,
    price: number,
    quantity: number
  ) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  get id(): string {
    return this._id;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }

  updateQuantity(quantity: number): number {
    const newQuantity = (this._quantity -= quantity);

    if (this._quantity <= 0) {
      throw new Error('Quantity must greater than 0');
    }

    return newQuantity;
  }
}
