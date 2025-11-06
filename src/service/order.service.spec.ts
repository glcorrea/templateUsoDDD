import Customer from "../entity/customer";
import Order from "../entity/order"
import OrderItem from "../entity/orderItem"
import OrderService from "./order.service";

describe   ("Order service unit tests", () => {
    
    it ("should place an order", () => {
        const customer = new Customer("c1","Customer 1");
        const item1 = new OrderItem("I1", "p1", "ITEM 1", 10, 1);
        
        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);

    })
    
    it("should get of all orders", () => {
        const item1 = new OrderItem("I1", "p1", "ITEM 1", 100, 1);
        const item2 = new OrderItem("I2", "p1", "ITEM 2", 200, 2);

        const order = new Order("o1","c1", [item1]);
        const order2 = new Order("o2","c1", [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(500);


    })
})