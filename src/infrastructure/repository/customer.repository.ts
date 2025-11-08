import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";


export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      zipcode: entity.address.zipCode,
      city: entity.address.city,
      state: entity.address.state,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        complement: entity.address.complement,
        zipcode: entity.address.zipCode,
        city: entity.address.city,
        state: entity.address.state,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Cliente não encontrado");
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.complement,
      customerModel.city,
      customerModel.state,
      customerModel.zipcode
    );
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModels) => {
      let customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.complement,
        customerModels.city,
        customerModels.state,
        customerModels.zipcode
      );
      customer.changeAddress(address);
      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}
