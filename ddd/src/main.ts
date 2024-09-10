import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/orderItem";
import Product from "./entity/product";

// Id Relation
let customer = new Customer("123", "Lorem Ipsum");
const address = new Address("Rua dois", 2, "12345633-78", "Minas Gerais")

customer.address = address;
customer.activate();

// Entity relation
const product1 = new Product("1", "Product 1", 10);
const product2 = new Product("2", "Product 2", 15);
const item1 = new OrderItem("1", "1", "Item 1", 10, 2);
const item2 = new OrderItem("2", "2", "Item 2", 20, 4);
const order = new Order("1", "123", [item1, item2]);