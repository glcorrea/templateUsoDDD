import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItem from "../../domain/entity/orderItem";



export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
      })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
      await OrderModel.update({
        total: entity.total(), customer_id: entity.customerId},
        {where: {id: entity.id}
      });

      await OrderItemModel.destroy({where: {order_id: entity.id}});

      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));

      await OrderItemModel.bulkCreate(items);
  }

  async find(id: string): Promise<Order> {
      const orderModel = await OrderModel.findOne({ where: { id },
        include: [
          {model: OrderItemModel, 
            include: [{model: ProductModel}]},
          {model: CustomerModel}],
        rejectOnEmpty: true, 
      });
      
      const items: OrderItem[] = orderModel.items.map((item) => {
        const ordemItem = new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity,       
        );
        return ordemItem;
      })

      const order = new Order(orderModel.id, orderModel.customer_id, items)
      return order;
  }


  async findAll(): Promise<Order[]> {
      const orderModels = await OrderModel.findAll({
          include: [{model: OrderItemModel}]
      });

      return orderModels.map((orderModel) => {
        const items = orderModel.items.map(itemModel => 
          new OrderItem( 
            itemModel.id,
            itemModel.product_id,
            itemModel.name,
            itemModel.price,
            itemModel.quantity
          )
        );

        return new Order(
          orderModel.id,
          orderModel.customer_id,
          items
        );
      });
  }

  




}