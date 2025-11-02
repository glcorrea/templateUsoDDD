import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/orderItem";

let customer = new Customer("123", "teste da silva");
const address = new Address("rua xuxu", "2", "", "São Paulo", "UF", "1234-678");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1","item 1", 100);
const item2 = new OrderItem("1","item 1", 200);
const order = new Order("1", "123", [item1, item2]);