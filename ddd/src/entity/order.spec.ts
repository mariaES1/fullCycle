import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit test", () =>{
    it("should throw error when id is empty", () => {
        expect(() => {
            const order = new Order("", "12345", []);
        }).toThrow(new Error("Id is required"));
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            const order = new Order("12345", "", []);
        }).toThrow(new Error("CustomerId is required"));
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            const order = new Order("12345", "12345", []);
        }).toThrow(new Error("Items quantity must be greater than zero"));
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("i1", "Item 1", 50);
        const item2 = new OrderItem("i2", "Item 2", 40);
        const order = new Order("o1", "c1", [item1]);

        let total = order.total();

        expect(total).toBe(50);

        const order2 = new Order("o2", "c2", [item1, item2]);
        total = order2.total();

        expect(total).toBe(90);

    });
});