import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerAddressChangeEvent from "../customer/customer-address-changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import SendConsoleLog1Handler from "../customer/handler/send-console-log1.handler";
import SendConsoleLog2Handler from "../customer/handler/send-console-log2.handler";
import SendMessageWhenCustomerAddressIsChangedHandler from "../customer/handler/send-message-when-customer-address-is-changed.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispacher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);


    })

    it("Should unregistry an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    })

    it("Should unregistry all event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
        

    })

    it("Should notify all event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        // quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        // criar o Spy
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    })

    it("should register two customer created event handlers", async () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const eventName = "CustomerCreatedEvent";

        eventDispatcher.register(eventName, eventHandler1);
        eventDispatcher.register(eventName, eventHandler2);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(2);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers[eventName][1]).toMatchObject(eventHandler2);

        
    })


    it("Should notify all customer created event handler", async () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const eventName = "CustomerCreatedEvent";

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register(eventName, eventHandler1);
        eventDispatcher.register(eventName, eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Jose da Silva",
        })

        eventDispatcher.notify(customerCreatedEvent);
        
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

        
    })

    it("Should notify when customer address is changed event handler", async () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendMessageWhenCustomerAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const consoleSpy = jest.spyOn(console, "log");
        const eventName = "CustomerAddressChangeEvent";
               
        eventDispatcher.register(eventName, eventHandler);
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);

        const customer = new Customer("1", "John");
        const address = new Address("Rua 123", 1, "", "São Paulo", "SP", "1234-345")
        customer.Address = address

        const newAddress = new Address("Rua 456", 1, "", "São Paulo", "SP", "6789-000")


        const customerAddressChangeEvent = new CustomerAddressChangeEvent({
            id: customer.id,
            name: customer.name,
            address: newAddress.toString(),
        })

        eventDispatcher.notify(customerAddressChangeEvent);
        
        expect(spyEventHandler).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("Customer Address is changed: 1, John, Rua 456, 1, , São Paulo , SP , 6789-000");
      
        
    })
  

})