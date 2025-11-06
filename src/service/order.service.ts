import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import { v4 as uuidv4 } from "uuid";

export default class OrderService{

    static placeOrder(customer: Customer, items: OrderItem[]): Order{
        
        if(items.length === 0){
            throw new Error("A Ordem precisa ter pelo menos um item");
        }
        const order = new Order(uuidv4(), customer.id, items);
        customer.addRewardPoints(order.total()/2);
        return order;
    }
    
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

}