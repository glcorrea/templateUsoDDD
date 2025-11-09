import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/orderItem";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepository from "./order.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 123", 1, "", "São Paulo", "SP", "1234-345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2 );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.id).toEqual(order.id);
    expect(orderModel.customer_id).toEqual(customer.id);
    expect(orderModel.total).toEqual(20);
    expect(orderModel.items.length).toBe(1);
    expect(orderModel.items[0].product_id).toEqual(product.id);
    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("Should update an existing Order", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 123", 1, "", "São Paulo", "SP", "1234-345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2 );
    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const product2 = new Product("456", "New Product", 50);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem("i456", product2.id, product2.name, product2.price, 5 );
    const order2 = new Order("123", "123", [orderItem2]);

    await orderRepository.update(order2);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
 
    expect(orderModel.total).toEqual(250);
    expect(orderModel.items.length).toBe(1);
    expect(orderModel.items[0].id).toEqual("i456");
    expect(orderModel.items[0].product_id).toEqual("456");
  })


  it("should find order by id", async () => {
    
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 123", 1, "", "São Paulo", "SP", "1234-345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2 );
    
    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);  
    
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    const foundOrder = await orderRepository.find("123");

    expect(foundOrder.id).toEqual("123");
    expect(foundOrder.customerId).toEqual(customer.id);
    expect(foundOrder.items.length).toBe(1);
    expect(foundOrder.items[0].id).toEqual("1");
        
  });

  it("should find all orders", async () => {
    
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 123", 1, "", "São Paulo", "SP", "1234-345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2 );
    const order = new Order("123", "123", [orderItem]);

    const orderItem2 = new OrderItem("2", product.id, product.name, product.price, 4 );
    const order2 = new Order("456", "123", [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);  
    await orderRepository.create(order2);  

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toHaveLength(2);
    expect(foundOrders).toContainEqual(order);
    expect(foundOrders).toContainEqual(order2);
 
        
  });

  
   


});
