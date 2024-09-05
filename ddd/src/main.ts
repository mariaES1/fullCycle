import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/orderItem";

// Id Relation
let customer = new Customer("123", "Lorem Ipsum");
const address = new Address("Rua dois", 2, "12345633-78", "Minas Gerais")

customer.address = address;
customer.activate();

// Entity relation
const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);
const order = new Order("1", "123", [item1, item2]);