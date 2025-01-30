import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/orderItem";
import OrderRepositoryInterface from "../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "../database/sequelize/model/order-item.model";
import OrderModel from "../database/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );

    const currentItems = await OrderItemModel.findAll({
      where: {
        order_id: entity.id,
      },
    });

    const itemsToDelete = currentItems.filter(
      (currentItem) => !entity.items.some((item) => item.id === currentItem.id)
    );

    await Promise.all(
      itemsToDelete.map((item) =>
        OrderItemModel.destroy({
          where: {
            id: item.id,
            order_id: entity.id,
          },
        })
      )
    );

    await Promise.all(
      entity.items.map((item) =>
        OrderItemModel.upsert({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        })
      )
    );
  }

  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });

    const items = order.items.map((item) => {
      return new OrderItem(
        item.id,
        item.product_id,
        item.name,
        item.price,
        item.quantity
      );
    });

    return new Order(order.id, order.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: ["items"] });
    return ordersModel.map((orderModel) => {
      const items = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity
        );
      });

      return new Order(orderModel.id, orderModel.customer_id, items);
    });
  }
}
