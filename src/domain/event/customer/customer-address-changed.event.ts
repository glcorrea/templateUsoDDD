import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangeEvent implements EventInterface{
    dataTimeOcurred: Date;
    eventData: {
        id: string;
        name: string;
        address: string;
    }

    constructor(eventData: {id: string, name: string, address: string}) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
  
}