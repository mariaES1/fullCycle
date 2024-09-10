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
        const item1 = new OrderItem("i1", "p1", "Item 1", 50, 4);
        const item2 = new OrderItem("i2", "p2",  "Item 2", 40, 2);
        const order = new Order("o1", "c1", [item1]);

        let total = order.total();

        expect(total).toBe(200);

        const order2 = new Order("o2", "c2", [item1, item2]);
        total = order2.total();

        expect(total).toBe(280);

    });

    it("should throw error when item quantity is less or equal zero", () => {
        expect(() => {
            const item1 = new OrderItem("i1", "p1", "Item 1", 50, 0);
            const order = new Order("12345", "12345", [item1]);
        }).toThrow(new Error("Quantity must be greater than zero"));
    });
});