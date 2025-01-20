import Customer from "../../entity/customer";
import EventInterface from "../@shared/interfaces/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
