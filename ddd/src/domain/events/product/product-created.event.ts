import EventInterface from "../@shared/interfaces/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOcurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
