import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const costumer = new Customer("", "João")
        }).toThrow(new Error("Id is required"));
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const costumer = new Customer("12345", "")
        }).toThrow(new Error("Name is required"));
    });

    it("should change name", () => {
        //Arrange
        const customer = new Customer("12345", "Luis");

        //Act
        customer.changeName("João");

        //Assert
        expect(customer.name).toBe("João")
    });

    it("should activate customer", () => {
        //Arrange
        const customer = new Customer("12345", "Luis");
        const address = new Address("Rua 4", 123, "123456-78", "Cidade")
        customer.address = address

        //Act
        customer.activate()

        //Assert
        expect(customer.isActive()).toBe(true)
    });

    it("should deactivate customer", () => {
        //Arrange
        const customer = new Customer("12345", "Luis");

        //Act
        customer.deactivate()

        //Assert
        expect(customer.isActive()).toBe(false)
    });

    it("should throw error when address is undefined when activate customer", () => {
        expect(() => {
            const customer = new Customer("12345", "Luis");
            customer.activate();
        }).toThrow(new Error("Address is mandatory to activate a costumer"));
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(5);
        expect(customer.rewardPoints).toBe(15);
    }) 
});