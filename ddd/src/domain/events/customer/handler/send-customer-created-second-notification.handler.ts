import EventHandlerInterface from "../../@shared/interfaces/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class CustomerCreatedSecondHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
