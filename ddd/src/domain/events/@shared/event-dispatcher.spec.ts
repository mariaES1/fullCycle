import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerChangeAddressEvent from "../customer/customer-change-address.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import SendNotificationWhenChangeAddressHandler from "../customer/handler/send-change-address-notification.handler";
import CustomerCreatedSecondHandler from "../customer/handler/send-customer-created-second-notification.handler";
import CustomerCreatedFirstHandler from "../customer/handler/send-custumer-created-first-notification.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  let eventDispatcher: EventDispatcher;
  let productEventHandler: SendEmailWhenProductIsCreatedHandler;
  let customerFirstHandler: CustomerCreatedFirstHandler;
  let customerSecondHandler: CustomerCreatedSecondHandler;
  let customerChangeAddressHandler: SendNotificationWhenChangeAddressHandler;

  describe("When validate Domain Events", () => {
    beforeEach(() => {
      eventDispatcher = new EventDispatcher();
      productEventHandler = new SendEmailWhenProductIsCreatedHandler();
      customerFirstHandler = new CustomerCreatedFirstHandler();
      customerSecondHandler = new CustomerCreatedSecondHandler();
      customerChangeAddressHandler =
        new SendNotificationWhenChangeAddressHandler();

      eventDispatcher.register("ProductCreatedEvent", productEventHandler);
      eventDispatcher.register("CustomerCreatedEvent", customerFirstHandler);
      eventDispatcher.register("CustomerCreatedEvent", customerSecondHandler);
      eventDispatcher.register(
        "CustomerChangeAddressEvent",
        customerChangeAddressHandler
      );
    });
    describe("When validate register", () => {
      it("event dispatcher should define the events", () => {
        const events = [
          "ProductCreatedEvent",
          "CustomerCreatedEvent",
          "CustomerChangeAddressEvent",
        ];

        events.forEach((event) => {
          expect(eventDispatcher.getEventHandlers[event]).toBeDefined();
        });
      });

      it("event dispatcher should match the expected handlers", () => {
        const expectedHandlers = {
          ProductCreatedEvent: [productEventHandler],
          CustomerCreatedEvent: [customerFirstHandler, customerSecondHandler],
          CustomerChangeAddressEvent: [customerChangeAddressHandler],
        };

        Object.entries(expectedHandlers).forEach(([eventName, handlers]) => {
          const registeredHandlers =
            eventDispatcher.getEventHandlers[eventName];
          expect(registeredHandlers).toHaveLength(handlers.length);

          handlers.forEach((handler, index) => {
            expect(registeredHandlers[index]).toMatchObject(handler);
          });
        });
      });
    });

    describe("When validate unregister", () => {
      it("should validate if handlers are previously registered", () => {
        const expectedHandlers = {
          ProductCreatedEvent: [productEventHandler],
          CustomerCreatedEvent: [customerFirstHandler, customerSecondHandler],
          CustomerChangeAddressEvent: [customerChangeAddressHandler],
        };

        Object.entries(expectedHandlers).forEach(([eventName, handlers]) => {
          const registeredHandlers =
            eventDispatcher.getEventHandlers[eventName];
          expect(registeredHandlers).toHaveLength(handlers.length);

          handlers.forEach((handler, index) => {
            expect(registeredHandlers[index]).toMatchObject(handler);
          });
        });
      });

      it("should unregister specific event handlers without affecting others", () => {
        const initialHandlers = {
          ProductCreatedEvent: [productEventHandler],
          CustomerCreatedEvent: [customerFirstHandler, customerSecondHandler],
          CustomerChangeAddressEvent: [customerChangeAddressHandler],
        };

        Object.entries(initialHandlers).forEach(([eventName, handlers]) => {
          handlers.forEach((handlerToUnregister, indexToRemove) => {
            eventDispatcher.unregister(eventName, handlerToUnregister);

            const remainingHandlers =
              eventDispatcher.getEventHandlers[eventName];
            expect(remainingHandlers).not.toContain(handlerToUnregister);
          });
        });
      });
    });

    describe("When validate Unregister all", () => {
      it("should validate if all handlers are previously registered", () => {
        const expectedHandlers = {
          ProductCreatedEvent: [productEventHandler],
          CustomerCreatedEvent: [customerFirstHandler, customerSecondHandler],
          CustomerChangeAddressEvent: [customerChangeAddressHandler],
        };

        Object.entries(expectedHandlers).forEach(([eventName, handlers]) => {
          const registeredHandlers =
            eventDispatcher.getEventHandlers[eventName];

          expect(registeredHandlers).toHaveLength(handlers.length);

          handlers.forEach((expectedHandler, index) => {
            expect(registeredHandlers[index]).toMatchObject(expectedHandler);
          });
        });
      });

      it("should unregister all event handlers", () => {
        const events = [
          "ProductCreatedEvent",
          "CustomerCreatedEvent",
          "CustomerChangeAddressEvent",
        ];

        events.forEach((event) => {
          expect(eventDispatcher.getEventHandlers[event]).toBeDefined();
        });

        eventDispatcher.unregisterAll();

        events.forEach((event) => {
          expect(eventDispatcher.getEventHandlers[event]).toBeUndefined();
        });
      });
    });

    describe("When validate notify", () => {
      let address: Address;
      let customer: Customer;

      beforeEach(() => {
        address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer = new Customer("123", "Customer 1");
        customer.changeAddress(address);
      });
      it("should validate if handler is previously registered", () => {
        const expectedHandlers = {
          ProductCreatedEvent: [productEventHandler],
          CustomerCreatedEvent: [customerFirstHandler, customerSecondHandler],
          CustomerChangeAddressEvent: [customerChangeAddressHandler],
        };

        Object.entries(expectedHandlers).forEach(([eventName, handlers]) => {
          const registeredHandlers =
            eventDispatcher.getEventHandlers[eventName];

          expect(registeredHandlers).toHaveLength(handlers.length);

          handlers.forEach((expectedHandler, index) => {
            expect(registeredHandlers[index]).toMatchObject(expectedHandler);
          });
        });
      });

      it("should notify all event handlers", () => {
        const spyEventHandler = jest.spyOn(productEventHandler, "handle");

        const productCreatedEvent = new ProductCreatedEvent({
          name: "Product 1",
          description: "Product 1 description",
          price: 10.0,
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
      });

      it("should notify all customer created event handlers", () => {
        const spyEventFirstHandler = jest.spyOn(customerFirstHandler, "handle");
        const spyEventSecondHandler = jest.spyOn(
          customerSecondHandler,
          "handle"
        );

        const customerFirtsEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerFirtsEvent);
        expect(spyEventFirstHandler).toHaveBeenCalled();
        expect(spyEventSecondHandler).toHaveBeenCalled();
      });

      it("should notify all customer change address event handlers", () => {
        const spyEventChangeAddressHandler = jest.spyOn(
          customerChangeAddressHandler,
          "handle"
        );

        const newAddress = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer.changeAddress(newAddress);

        const customerFirtsEvent = new CustomerChangeAddressEvent(customer);

        eventDispatcher.notify(customerFirtsEvent);
        expect(spyEventChangeAddressHandler).toHaveBeenCalled();
      });
    });
  });
});
