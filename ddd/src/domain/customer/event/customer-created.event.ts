import EventInterface from "@src/domain/@shared/interfaces/event.interface";
import Customer from "../entity/customer";


export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
