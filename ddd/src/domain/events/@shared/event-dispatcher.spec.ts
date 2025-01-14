import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  let eventDispatcher: EventDispatcher;
  let eventHandler: SendEmailWhenProductIsCreatedHandler;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
  });
  describe("When validate register", () => {
    it("event dispatcher should be defined with the event", () => {
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
    });

    it("event dispatcher should have the expexted length", () => {
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(1);
    });

    it("event dispatcher should match the expected handler", () => {
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });
  });

  describe("When validate unregister", () => {
    it("should validate if handler is previously registered", () => {
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(0);
    });
  });

  describe("When validate Unregister all", () => {
    it("should validate if handler is previously registered", () => {
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister all event handlers", () => {
      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeUndefined();
    });
  });

  describe("When validate notify", () => {
    it("should validate if handler is previously registered", () => {
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should notify all event handlers", () => {
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      const productCreatedEvent = new ProductCreatedEvent({
        name: "Product 1",
        description: "Product 1 description",
        price: 10.0,
      });

      eventDispatcher.notify(productCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });
});
