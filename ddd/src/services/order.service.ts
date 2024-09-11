import Order from "../entity/order";

export default class OrderService {
    static total(order: Order[]): number {
        return order.reduce((acc, order) => acc + order.total(), 0)
    }
}