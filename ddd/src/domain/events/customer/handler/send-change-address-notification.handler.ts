import EventHandlerInterface from "../../@shared/interfaces/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendNotificationWhenChangeAddressHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${
        event.eventData.name
      } alterado para: ${JSON.stringify(event.eventData.address)}`
    );
  }
}
