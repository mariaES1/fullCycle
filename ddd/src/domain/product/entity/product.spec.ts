import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrow(new Error("Id is required"));
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("12345", "", 100);
        }).toThrow(new Error("Name is required"));
    });

    it("should throw error when price is empty", () => {
        expect(() => {
            const product = new Product("12345", "Product 1", -1);
        }).toThrow(new Error("Price must be greater than zero"));
    });

    it("should change name", () => {
        const product = new Product("12345", "Name 1", 10);
        product.changeName("Product 1");

        expect(product.name).toBe("Product 1");
    });

    it("should change price", () => {
        const product = new Product("12345", "Name 1", 10);
        product.changePrice(15);

        expect(product.price).toBe(15);
    });
});