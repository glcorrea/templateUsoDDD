import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangeEvent from "../customer-address-changed.event";



export default class SendMessageWhenCustomerAddressIsChangedHandler 
implements EventHandlerInterface<CustomerAddressChangeEvent>{

    handle(event: CustomerAddressChangeEvent): void {
        const {id, name, address} = event.eventData;
        console.log(`Customer Address is changed: ${id}, ${name}, ${address}`);
    }
    
}