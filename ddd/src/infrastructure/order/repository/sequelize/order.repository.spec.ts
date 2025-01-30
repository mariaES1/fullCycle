import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import OrderRepository from "./order.repository";
import Order from "../../../../domain/checkout/entity/order";

describe("Order repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  describe("When validate repository methods", () => {
    let customerRepository: CustomerRepository;
    let address: Address;
    let customer: Customer;
    let productRepository: ProductRepository;
    let product: Product;
    let orderItem: OrderItem;
    let orderRepository: OrderRepository;
    let order: Order;

    beforeEach(async () => {
      customerRepository = new CustomerRepository();
      address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer = new Customer("123", "Customer 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);

      productRepository = new ProductRepository();
      product = new Product("123", "Product 1", 10);
      await productRepository.create(product);

      orderItem = new OrderItem(
        "1",
        product.id,
        product.name,
        product.price,
        2
      );
      order = new Order("123", "123", [orderItem]);

      orderRepository = new OrderRepository();
      await orderRepository.create(order);
    });

    afterEach(async () => {
      await OrderModel.destroy({ where: {} });
      await OrderItemModel.destroy({ where: {} });
    });

    it("should validate order creation", async () => {
      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
      });

      expect(orderModel.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            product_id: product.id,
            order_id: "123",
          },
        ],
      });
    });

    it("should update an order including an item", async () => {
      const newProduct = new Product("1234", "Product 2", 15);
      await productRepository.create(newProduct);

      const newItem = new OrderItem(
        "2",
        newProduct.id,
        newProduct.name,
        newProduct.price,
        1
      );
      order.includeItem(newItem);

      await orderRepository.update(order);

      const updatedOrder = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
      });

      expect(updatedOrder.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            product_id: product.id,
            order_id: "123",
          },
          {
            id: newItem.id,
            name: newItem.name,
            price: newItem.price,
            quantity: newItem.quantity,
            product_id: newProduct.id,
            order_id: "123",
          },
        ],
      });
    });

    it("should update an order excluding an item", async () => {
      expect(order.items[0].quantity).toBe(2);

      order.excludeItem(orderItem);

      await orderRepository.update(order);

      const updatedOrder = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
      });

      expect(updatedOrder.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: order.total(),
        items: [
          {
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: 1,
            product_id: product.id,
            order_id: "123",
          },
        ],
      });
    });

    it("should find an order by id", async () => {
      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"],
      });

      const foundOrder = await orderRepository.find(order.id);

      expect(foundOrder.id).toBe(orderModel.id);
      expect(foundOrder.items).toHaveLength(orderModel.items.length);
    });

    it("should find all orders", async () => {
      const newProduct = new Product("1234", "Product 2", 15);
      await productRepository.create(newProduct);

      const newItem = new OrderItem(
        "2",
        newProduct.id,
        newProduct.name,
        newProduct.price,
        1
      );
      const newOrder = new Order("789", customer.id, [newItem]);

      await orderRepository.create(newOrder);

      const foundOrders = await orderRepository.findAll();
      const orders = [order, newOrder];

      expect(foundOrders).toEqual(orders);
    });
  });
});
