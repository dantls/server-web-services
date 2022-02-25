import { getCustomRepository, Repository } from "typeorm";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { Order } from "entities/Order";
import { OrderTypes } from "entities/OrderTypes";
import { OrderTypesRepository } from "../repositories/OrderTypesRepository";

interface IServicesCreateDTO{
  order: string;
  ordertype: string;
}

class AddOrderTypeOrderService {
  private ordersRepository: Repository<Order>
  private orderTypesRepository: Repository<OrderTypes>


  constructor(){
    this.ordersRepository = getCustomRepository(OrdersRepository);
    this.orderTypesRepository = getCustomRepository(OrderTypesRepository);
    
  }

  async execute({
    order,
    ordertype
   }: IServicesCreateDTO){
      
    const orderAlreadyExists = await this.ordersRepository.findOne({
      where: {
        description: order
      }
    })
   
    if(!orderAlreadyExists){
      throw new Error('Order is not Found')
    }

    const orderTypesAlreadyExists = await this.orderTypesRepository.findOne({
      where: {
        description: ordertype
      }
    })

    if(!orderTypesAlreadyExists){
      throw new Error('OrderType is not Found')
    }

    orderAlreadyExists.id_type = orderTypesAlreadyExists.id;


    await this.ordersRepository.save(orderAlreadyExists);


    return orderAlreadyExists;

  }

}

export default AddOrderTypeOrderService 