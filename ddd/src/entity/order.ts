import OrderItem from "./orderItem";

export default class Order {
    _id: string;
    _customer: string;
    _items: OrderItem[];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customer = customerId;
        this._items = items;
    }

    
}